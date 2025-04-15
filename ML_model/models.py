from sklearn.svm import OneClassSVM
from sklearn.ensemble import IsolationForest


def get_model(model_type='svm'):
    if model_type == 'svm':
        return OneClassSVM(kernel='rbf', gamma='scale', nu=0.3)
    elif model_type == 'iforest':
        return IsolationForest(contamination=0.3, random_state=42)
    else:
        raise ValueError(f"Unsupported model type: {model_type}")
