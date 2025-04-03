import argparse
import os
import numpy as np
from processor import extract_urls, scrape_urls
from models import get_model
from evaluate import evaluate_model
from visualizations import plot_fold_scores, plot_decision_scores, plot_tfidf_term_importance, get_top_terms_by_tfidf
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import Normalizer
from sklearn.feature_extraction.text import TfidfVectorizer

def reduce_dimensionality(X, n_components=100):
    svd = TruncatedSVD(n_components=n_components, random_state=42)
    return svd.fit_transform(X), svd

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

def interpret_score(score, model_type='svm'):
    if model_type == 'svm':
        if score > 0.2:
            return "CRISIS-RELATED", "HIGH"
        elif score > 0.0:
            return "CRISIS-RELATED", "LOW"
        elif score > -0.2:
            return "NOT CRISIS-RELATED", "LOW"
        else:
            return "NOT CRISIS-RELATED", "HIGH"
    elif model_type == 'iforest':
        if score > 0.1:
            return "CRISIS-RELATED", "HIGH"
        elif score > -0.1:
            return "CRISIS-RELATED", "LOW"
        elif score > -0.3:
            return "NOT CRISIS-RELATED", "LOW"
        else:
            return "NOT CRISIS-RELATED", "HIGH"
    else:
        return "UNKNOWN", "UNKNOWN"

def run_pipeline(train_zip, test_zip, model_type='svm', visualize=False):
    # --- TRAINING PHASE ---
    print(f"\n Extracting training URLs from {train_zip}...")
    train_urls = extract_urls(train_zip)
    print(f" Found {len(train_urls)} training URLs. Scraping...")
    train_texts = [text for _, text in scrape_urls(train_urls)]

    print(" Encoding training data...")
    X_train_raw, vectorizer_full = encode_texts(train_texts)
    top_terms = get_top_terms_by_tfidf(X_train_raw, vectorizer_full, n_terms=500)
    X_train, vectorizer = encode_texts_with_selected_terms(train_texts, top_terms)

    X_train_reduced, svd = reduce_dimensionality(X_train, n_components=200)
    X_train_final = normalize_vectors(X_train_reduced)
    y_train = np.ones(X_train.shape[0])  # All inliers

    print(f"\n Training model: {model_type}")
    model = get_model(model_type)
    results = evaluate_model(X_train_final, y_train, model)

    print("\n Cross-Validation Results:")
    for i, score in enumerate(results):
        print(f"Fold {i+1} | Precision: {score['precision']:.2f}, Recall: {score['recall']:.2f}, F1: {score['f1']:.2f}")

    model.fit(X_train_final)  # Fit final model on all training data

    # --- TESTING PHASE ---
    if test_zip:
        print(f"\n Extracting test URLs from {test_zip}...")
        test_urls = extract_urls(test_zip)
        print(f" Found {len(test_urls)} test URLs. Scraping test content...")
        scraped_test = scrape_urls(test_urls)

        print(" Encoding test data using training vectorizer...")

        print("\n Test Set Results:")
        for i, (url, text) in enumerate(scraped_test):
            if not text.strip():
                print(f"[{i+1}] {url} =>  Could not be scraped (empty content). Label: UNKNOWN")
                continue

            try:
                X_test = vectorizer.transform([text])
                X_test_reduced = svd.transform(X_test)
                X_test_final = normalize_vectors(X_test_reduced)

                score = model.decision_function(X_test_final)[0]
                label, confidence = interpret_score(score, model_type)

                print(f"[{i+1}] {url}\n  Label: {label} | Confidence: {confidence} | Score: {score:.4f}")

            except Exception as e:
                print(f"[{i+1}] {url} =>  Error during scoring: {e}. Label: UNKNOWN")

    if visualize:
        print("\n Generating Visualizations...")
        plot_fold_scores(results)
        plot_decision_scores(model, X_train_final)
        plot_tfidf_term_importance(X_train, vectorizer, n_terms=30)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="OCC Web Classifier")
    parser.add_argument("train_zip", help="Path to ZIP file containing training URLs")
    parser.add_argument("test_zip", nargs="?", help="Path to ZIP file containing test URLs")
    parser.add_argument("--model", choices=["svm", "iforest"], default="svm", help="Model type (svm or iforest)")
    parser.add_argument("--visualize", action="store_true", help="Enable visualizations")
    args = parser.parse_args()

    run_pipeline(args.train_zip, args.test_zip, args.model, args.visualize)
