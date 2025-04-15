import requests
from bs4 import BeautifulSoup
import time

BASE_URL = "http://127.0.0.1:8000"

def extract_text_from_url(url):
    """
    Fetches the URL and extracts visible text using BeautifulSoup.
    """
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            text = soup.get_text(separator=' ', strip=True)
            return text
        else:
            print(f"Failed to retrieve {url} (status code: {response.status_code})")
            return None
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def predict_text(text):
    """
    Sends the given text to the /predict endpoint and prints the prediction result.
    """
    endpoint = f"{BASE_URL}/predict"
    payload = {"text": text}
    try:
        response = requests.post(endpoint, json=payload)
        print("Status code:", response.status_code)
        data = response.json()
        print("Response JSON:", data)
    except Exception as e:
        print("Error during prediction:", e)

def main():
    # Read URLs from a text file (one URL per line)
    file_path = "links_Nav.txt"
    try:
        with open(file_path, "r") as f:
            urls = [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        print(f"File {file_path} not found.")
        return

    print(f"Found {len(urls)} URLs in {file_path}.")

    for url in urls:
        print(f"\nProcessing URL: {url}")
        text = extract_text_from_url(url)
        if text:
            # Optionally print a snippet of the extracted text
            print("Extracted text (first 200 chars):", text[:200])
            print("Sending text to prediction endpoint...")
            predict_text(text)
        else:
            print("No text extracted from this URL.")
        # Pause between requests to avoid overloading the server
        time.sleep(2)

if __name__ == "__main__":
    main()