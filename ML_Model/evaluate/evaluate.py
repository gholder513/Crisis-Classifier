from sklearn.model_selection import KFold
from sklearn.metrics import precision_score, recall_score, f1_score
import numpy as np


def evaluate_model(X, y_true, model, k=5):
    kf = KFold(n_splits=k, shuffle=True, random_state=42)
    results = []

    for train_idx, test_idx in kf.split(X):
        model.fit(X[train_idx])
        preds = model.predict(X[test_idx])
        preds = np.where(preds == 1, 1, 0)  
        y_test = y_true[test_idx]

        results.append({
            "precision": precision_score(y_test, preds),
            "recall": recall_score(y_test, preds),
            "f1": f1_score(y_test, preds)
        })
    return results
