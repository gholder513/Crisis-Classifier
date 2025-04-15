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

def run_pipeline(zip_path, model_type='svm', visualize=False):
    print(f" Extracting URLs from {zip_path}...")
    urls = extract_urls(zip_path)
    print(f" Found {len(urls)} URLs. Scraping content...")
    texts = scrape_urls(urls)

    print(f" Encoding scraped data...")
    X_raw, vectorizer_full = encode_texts(texts)
    print(f" Initial TF-IDF shape: {X_raw.shape}")

    # Automatically select top TF-IDF terms and re-vectorize
    top_terms = get_top_terms_by_tfidf(X_raw, vectorizer_full, n_terms=300)
    X, vectorizer = encode_texts_with_selected_terms(texts, top_terms)
    print(f" Filtered TF-IDF shape: {X.shape}")

    X_reduced, _ = reduce_dimensionality(X, n_components=100)
    X_final = normalize_vectors(X_reduced)

    y_true = np.ones(X.shape[0])  # One-Class: All are inliers

    print(f" Training model: {model_type}")
    model = get_model(model_type)
    results = evaluate_model(X_final, y_true, model)

    print("\n Cross-Validation Results:")
    for i, score in enumerate(results):
        print(f"Fold {i+1} | Precision: {score['precision']:.2f}, Recall: {score['recall']:.2f}, F1: {score['f1']:.2f}")

    if visualize:
        print("\n Generating Visualizations...")
        plot_fold_scores(results)
        model.fit(X_final)
        plot_decision_scores(model, X_final)
        plot_tfidf_term_importance(X, vectorizer, n_terms=30)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="OCC Web Classifier")
    parser.add_argument("zip_path", help="Path to ZIP file containing seed URLs")
    parser.add_argument("--model", choices=["svm", "iforest"], default="svm", help="Model type (svm or iforest)")
    parser.add_argument("--visualize", action="store_true", help="Enable visualizations")
    args = parser.parse_args()

    run_pipeline(args.zip_path, args.model, args.visualize)