import os
import sqlite3
import pickle
from datetime import datetime
import numpy as np
import uvicorn
from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware  # <-- Add this import
from pydantic import BaseModel
from sklearn.model_selection import KFold
from sklearn.metrics import precision_score, recall_score, f1_score
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import Normalizer
from sklearn.feature_extraction.text import TfidfVectorizer

# Import helper functions and model creator from your modules.
from processor import extract_urls, scrape_urls
from models import get_model
from visualizations import get_top_terms_by_tfidf

# --- Updated Evaluation Function Using a Provided Threshold ---
def evaluate_model(X, y_true, model, k=5, threshold=0):
    kf = KFold(n_splits=k, shuffle=True, random_state=42)
    results = []
    for train_idx, test_idx in kf.split(X):
        model.fit(X[train_idx])
        scores = model.decision_function(X[test_idx])
        preds = np.where(scores >= threshold, 1, 0)
        y_test = y_true[test_idx]
        results.append({
            "precision": precision_score(y_test, preds, zero_division=0),
            "recall": recall_score(y_test, preds, zero_division=0),
            "f1": f1_score(y_test, preds, zero_division=0)
        })
    return results

# --- Text Processing Functions ---
def reduce_dimensionality(X, n_components=100):
    svd = TruncatedSVD(n_components=n_components, random_state=42)
    X_reduced = svd.fit_transform(X)
    return X_reduced, svd

def normalize_vectors(X):
    normalizer = Normalizer(norm='l2')
    return normalizer.fit_transform(X)

def encode_texts(texts):
    vectorizer = TfidfVectorizer(max_features=5000, stop_words='english', lowercase=True)
    X = vectorizer.fit_transform(texts)
    return X, vectorizer

def encode_texts_with_selected_terms(texts, top_terms):
    vectorizer = TfidfVectorizer(vocabulary=top_terms, lowercase=True)
    X = vectorizer.fit_transform(texts)
    return X, vectorizer

# --- Database and Model Storage Setup ---
DATABASE = "app.db"
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS models (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    model_type TEXT,
                    file_path TEXT,
                    training_date TEXT
                )''')
    conn.commit()
    conn.close()

init_db()

# --- FastAPI Setup ---
app = FastAPI(title="Crisis Events One-class Text Classification API")

# Enable CORS so the browser can call from a different origin.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # For testing, you can allow all. In production, use a restricted list.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use the field "classifier" (instead of model_type) to avoid name conflicts.
# For prediction, we continue to use JSON payload.
class PredictRequest(BaseModel):
    text: str

# Modified training endpoint to accept a file upload.
@app.post("/train")
async def train_model(
    zip_file: UploadFile = File(...),
    classifier: str = Form("svm"),
    visualize: bool = Form(False)
):
    try:
        # Save the uploaded ZIP file temporarily.
        zip_path = f"temp_{zip_file.filename}"
        with open(zip_path, "wb") as f:
            f.write(await zip_file.read())
        
        # 1. Extract URLs and scrape text content.
        urls = extract_urls(zip_path)
        if not urls:
            raise HTTPException(status_code=400, detail="No URLs extracted from the provided ZIP file.")
        texts = scrape_urls(urls)
        
        # 2. Encode texts with full TF-IDF, then select top terms.
        X_raw, vectorizer_full = encode_texts(texts)
        top_terms = get_top_terms_by_tfidf(X_raw, vectorizer_full, n_terms=300)
        X, vectorizer = encode_texts_with_selected_terms(texts, top_terms)
        
        # 3. Reduce dimensionality and normalize.
        X_reduced, svd = reduce_dimensionality(X, n_components=100)
        X_final = normalize_vectors(X_reduced)

        # 4. All training data are inliers.
        y_true = np.ones(X.shape[0])
        
        # 5. Initialize the model.
        model = get_model(classifier)
        
        # 6. Train on full data and compute decision scores.
        model.fit(X_final)
        training_scores = model.decision_function(X_final)
        
        # --- Adjust threshold using a tunable alpha parameter.
        alpha = 6  # Increase alpha to lower the threshold (make it more negative).
        threshold = np.mean(training_scores) - alpha * np.std(training_scores)

        # 7. Evaluate the model using this threshold.
        results = evaluate_model(X_final, y_true, model, threshold=threshold)

        # 8. Save model and text processing objects (including threshold) to disk.
        model_filename = os.path.join(MODEL_DIR, f"{classifier}_model.pkl")
        with open(model_filename, "wb") as f:
            pickle.dump({
                "model": model,
                "vectorizer": vectorizer,
                "svd": svd,
                "top_terms": top_terms,
                "threshold": threshold
            }, f)

        # 9. Save model info in SQLite.
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        training_date = datetime.now().isoformat()
        c.execute("INSERT INTO models (name, model_type, file_path, training_date) VALUES (?, ?, ?, ?)",
                  (f"{classifier}_model", classifier, model_filename, training_date))
        conn.commit()
        conn.close()

        # Optionally, remove the temporary file after processing.
        os.remove(zip_path)

        return {
            "message": "Model trained and saved successfully.",
            "cross_validation_results": results,
            "threshold": threshold
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict")
async def predict(request: PredictRequest):
    text = request.text
    try:
        # Load the most recent model.
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        c.execute("SELECT file_path FROM models ORDER BY id DESC LIMIT 1")
        row = c.fetchone()
        conn.close()
        if row is None:
            raise HTTPException(status_code=404, detail="No trained model found.")

        model_file = row[0]
        with open(model_file, "rb") as f:
            data = pickle.load(f)
        model = data["model"]
        vectorizer = data["vectorizer"]
        svd = data["svd"]
        threshold = data.get("threshold", 0)

        # Process the input text using the saved vectorizer and SVD transformer.
        X_text = vectorizer.transform([text])
        X_reduced = svd.transform(X_text)
        normalizer = Normalizer(norm='l2')
        X_final = normalizer.fit_transform(X_reduced)

        try:
            score = model.decision_function(X_final)[0]
        except AttributeError:
            score = model.score_samples(X_final)[0]

        prediction = "Crisis Event" if score >= threshold else "Non-Crisis Event"
        return {"prediction": prediction, "score": score, "threshold": threshold}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"message": "Crisis Events One-class Text Classification API is running."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)