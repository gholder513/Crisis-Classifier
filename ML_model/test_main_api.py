import requests
import time

BASE_URL = "http://127.0.0.1:8000"

def test_train_endpoint():
    endpoint = f"{BASE_URL}/train"
    # Adjust the zip_path to the correct path on your server if necessary
    payload = {
        "zip_path": "links.zip",
        "model_type": "svm",
        "visualize": False
    }
    print(f"Testing /train endpoint with payload:\n{payload}")
    response = requests.post(endpoint, json=payload)
    print("Status code:", response.status_code)
    try:
        data = response.json()
        print("Response JSON:", data)
    except Exception as e:
        print("Error decoding JSON response:", e)

def test_predict_endpoint():
    endpoint = f"{BASE_URL}/predict"
    payload = {
        "text": "On Tuesdays, the clouds over Marshmallow Valley begin to hum softly as the broccoli trees sway in sync with the scent of cinnamon toast drifting from the hills. Purple snails host tea parties with sentient teacups who only speak in rhyming couplets, while rubber ducks in business suits argue about jellybean inflation in the Bubblegum Economy. Meanwhile, the Moon takes a nap wrapped in spaghetti, occasionally snoring out sonnets that cause pigeons to salsa dance across telephone wires. Beneath the surface of the Pancake Lake, a committee of jellyfish debates the ethics of wearing monocles on all twelve eyes. Up in the sky, a flock of flying fish-shaped clouds races against time—not to win, but just to impress a retired kazoo player named Barbara who sits on a rainbow and judges their form using invisible scorecards. "
    }
    print(f"Testing /predict endpoint with payload:\n{payload}")
    response = requests.post(endpoint, json=payload)
    print("Status code:", response.status_code)
    try:
        data = response.json()
        print("Response JSON:", data)
    except Exception as e:
        print("Error decoding JSON response:", e)

if __name__ == "__main__":
    # Wait a moment in case the server is just starting up
    time.sleep(2)
    print("Starting tests...\n")
    test_train_endpoint()
    print("\n")
    test_predict_endpoint()