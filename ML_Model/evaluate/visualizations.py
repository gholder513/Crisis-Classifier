import matplotlib.pyplot as plt
import numpy as np

def plot_fold_scores(results):
    folds = list(range(1, len(results) + 1))
    precision = [r["precision"] for r in results]
    recall = [r["recall"] for r in results]
    f1 = [r["f1"] for r in results]

    plt.figure(figsize=(10, 5))
    plt.plot(folds, precision, label="Precision", marker='o')
    plt.plot(folds, recall, label="Recall", marker='o')
    plt.plot(folds, f1, label="F1 Score", marker='o')
    plt.xlabel("Fold")
    plt.ylabel("Score")
    plt.title("Cross-Validation Performance per Fold")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig("fold_scores.png")
    print("Saved fold_scores.png")

def plot_decision_scores(model, X):
    try:
        scores = model.decision_function(X)
    except AttributeError:
        scores = model.score_samples(X)

    plt.figure(figsize=(8, 5))
    plt.hist(scores, bins=30, edgecolor='black')
    plt.title("Anomaly Score Distribution")
    plt.xlabel("Score")
    plt.ylabel("Frequency")
    plt.tight_layout()
    plt.savefig("decision_scores.png")
    print("Saved decision_scores.png")

def get_top_terms_by_tfidf(X_tfidf, vectorizer, n_terms=100):
    tfidf_means = np.asarray(X_tfidf.mean(axis=0)).ravel()
    top_indices = tfidf_means.argsort()[::-1][:n_terms]
    terms = vectorizer.get_feature_names_out()
    return [terms[i] for i in top_indices]

def plot_tfidf_term_importance(X_tfidf, vectorizer, n_terms=30):
    tfidf_means = np.asarray(X_tfidf.mean(axis=0)).ravel()
    top_indices = tfidf_means.argsort()[::-1][:n_terms]

    terms = vectorizer.get_feature_names_out()
    top_terms = [terms[i] for i in top_indices]
    top_scores = [tfidf_means[i] for i in top_indices]

    plt.figure(figsize=(12, 6))
    bars = plt.barh(top_terms[::-1], top_scores[::-1])  # reverse to get highest at top
    plt.xlabel("Average TF-IDF Score")
    plt.title(f"Top {n_terms} Most Informative Terms (TF-IDF)")
    plt.tight_layout()
    plt.savefig("tfidf_term_importance.png")
    print(" Saved tfidf_term_importance.png")
