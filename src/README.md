# Crisis Classifier Documentation

This documentation provides a high-level overview and detailed explanations of the various components within the Crisis Classifier website.

---

## High-Level Overview

The Crisis Classifier website is designed to automatically detect crisis events in news articles by analyzing their content. Users can input article URLs or use pre-provided sample data. The system processes the article content, trains a one-class classifier using crisis examples, and classifies new articles as either crisis events or non-crisis events. This automation aids in rapid crisis monitoring, reducing the need for manual review during emergencies.

---

## Project Structure

The project consists of three main parts:

1. **Frontend Pages (React Components)**
2. **Article Processing Services**
3. **One-Class Classifier Implementation**

---

## 1. Frontend Pages (React Components)

### LandingPage Component

**Purpose:**  
The LandingPage is the entry point of the website. It allows users to either add an article URL for analysis or load sample data.

**Key Features:**

- **URL Input:**  
  Uses a custom `UrlInput` component to capture user URLs.

- **Feedback Messages:**  
  Displays information, success, or error messages based on user actions.

- **Loading Indicator:**  
  Shows a loading screen while processing requests.

- **Navigation:**  
  Utilizes React Router’s `useNavigate` to redirect users to the processing page after an article is processed.

- **Sample Data Option:**  
  Provides a button to load and process sample crisis and non-crisis articles.

**Important Functions:**

- `handleAddUrl(url: string)`:  
  Processes a single URL by fetching its content and storing the processed article in localStorage before navigating to the processing page.

- `handleUseSampleData()`:  
  Processes sample data (both crisis and non-crisis articles), stores them locally, and navigates to the processing page.

- `showMessage(text: string, type: 'info' | 'success' | 'error')`:  
  Displays a temporary message to the user.

- `scrollToTop()`:  
  Scrolls the page to the top when the header logo is clicked.

---

### ProcessingPage Component

**Purpose:**  
The ProcessingPage manages and displays the list of processed articles, enables the addition of new URLs, trains the classifier, and shows classification results.

**Key Features:**

- **Article Management:**  
  Displays a list of articles and allows users to remove articles or manually toggle their crisis status.

- **Model Training and Classification:**  
  Provides two training modes:
  - **Sample Data Training:** Uses pre-defined sample articles.
  - **User Data Training:** Utilizes articles manually marked as crisis by the user.

- **Tabbed Interface:**  
  Allows users to switch between article management and training options.

- **Real-Time Feedback:**  
  Displays the model's status (ready or needs training) and classification statistics such as the total number of articles, detected crisis events, and average confidence scores.

**Important Functions:**

- `handleAddUrl(url: string)`:  
  Adds and processes a new URL, then triggers classification if the model is ready.

- `handleRemoveArticle(url: string)`:  
  Removes an article from the list and updates localStorage.

- `handleToggleCrisis(url: string)`:  
  Allows users to manually mark or unmark an article as a crisis event.

- `trainWithSampleData()`:  
  Trains the classifier with sample articles and classifies all available articles.

- `trainWithUserData()`:  
  Trains the classifier using user-marked articles and validates that at least one article is marked as crisis.

- `classifyArticle(article: Article)`:  
  Classifies a single article using the trained classifier and updates it with a prediction and confidence score.

- `classifyAllArticles()`:  
  Iterates through all articles to update their classification based on the model’s predictions.

- `goToLandingPage()`:  
  Navigates back to the LandingPage.

---

## 2. Article Processing Services

### Article Service (`articleService.ts`)

**Purpose:**  
Provides functions to fetch and process the content of an article from a given URL.

**Key Functions:**

- **`fetchArticleContent(url: string): Promise<string>`**
  - **Description:**  
    Fetches raw HTML from a URL (using a proxy to avoid CORS issues), parses the HTML, and extracts text content from paragraph elements.
  - **Fallback:**  
    Returns a placeholder text if fetching fails.

- **`processArticle(article: Article): Promise<Article>`**
  - **Description:**  
    Ensures an article has content by fetching it if necessary, and then returns the updated article.

---

## 3. One-Class Classifier Implementation

### OneClassClassifier Class

**Purpose:**  
Implements a one-class classification model that detects crisis events based solely on crisis-related examples. It uses cosine similarity to compare new articles with crisis examples.

**Key Properties:**

- **`threshold`:**  
  A configurable threshold determining the cutoff similarity for classifying an article as a crisis event.

- **`featureVectors`:**  
  An array containing normalized term frequency vectors for crisis articles.

- **`vocabulary`:**  
  A set of unique tokens derived from the training articles.

- **`isReady`:**  
  A Boolean indicating whether the classifier has been trained and is ready for predictions.

**Key Methods:**

- **`preprocessText(text: string): string[]`**
  - **Description:**  
    Converts text to lowercase, tokenizes it using non-word characters, and filters out stopwords and short tokens.

- **`buildVocabulary(articles: Article[]): void`**
  - **Description:**  
    Constructs the vocabulary from all tokens present in the provided articles.

- **`documentToVector(text: string): Map<string, number>`**
  - **Description:**  
    Converts a document's text into a normalized feature vector based on token counts.

- **`cosineSimilarity(vecA: Map<string, number>, vecB: Map<string, number>): number`**
  - **Description:**  
    Computes the cosine similarity between two feature vectors, serving as a measure of similarity to crisis examples.

- **`train(articles: Article[]): void`**
  - **Description:**  
    Filters for crisis articles, builds the vocabulary, creates feature vectors for crisis articles, and sets the model to 'ready' if training data is available.

- **`predict(article: Article): { isCrisis: boolean; confidence: number }`**
  - **Description:**  
    Converts the article's content into a feature vector, computes its similarity to each crisis example, and classifies the article as a crisis event if the highest similarity exceeds the threshold. It returns both the prediction and a confidence score.

**Factory Function:**

- **`createClassifier(): ClassifierModel`**
  - **Description:**  
    A factory function that instantiates and returns a new `OneClassClassifier` object.

---

## Conclusion

The Crisis Classifier website integrates an intuitive user interface with a powerful backend classification engine. By training on crisis-specific examples and leveraging cosine similarity, the system offers automated predictions about whether an article pertains to a crisis event. This makes the platform particularly valuable for rapid crisis detection and monitoring, enabling users—from emergency responders to media professionals—to make informed decisions quickly.

Feel free to modify thresholds, enhance preprocessing, or adjust training datasets to further optimize the classifier’s performance.