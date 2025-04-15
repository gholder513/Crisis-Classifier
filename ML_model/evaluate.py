import zipfile
import os
import requests
from bs4 import BeautifulSoup
import re 
from sklearn.feature_extraction.text import TfidfVectorizer


def extract_urls(zip_path, extract_dir="temp_urls"):
    os.makedirs(extract_dir, exist_ok=True)
    urls = []
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_dir)

    for file in os.listdir(extract_dir):
        with open(os.path.join(extract_dir, file), 'r') as f:
            urls.extend([line.strip() for line in f if line.strip()])
    return urls


def clean_text(text):

    text = re.sub(r'\s+', ' ', text)                      # Collapse multiple spaces
    text = re.sub(r'[^a-zA-Z0-9.,!?;:()\'" ]', '', text)   # Remove unecessary symbols
    text = text.strip()
    return text


def scrape_url(url):
    print(f" Scraping URL: {url}")
    headers = {
        'User-Agent': 'Mozilla/5.0'
                      'Chrome/119.0.0.0'
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        title = soup.title.string.strip()
        print(f" Scraped: {title}")

        text = soup.get_text(separator=' ', strip=True)
        return clean_text(text)

    except Exception as e:
        print(f" Failed to scrape {url}: {e}")
        return ""


def scrape_urls(urls):
    return [scrape_url(url) for url in urls]


def encode_texts(texts):
    vectorizer = TfidfVectorizer(max_features=5000)
    X = vectorizer.fit_transform(texts)
    return X, vectorizer