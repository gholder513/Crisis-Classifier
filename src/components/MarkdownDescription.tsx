import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const DocumentationContent = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`prose ${theme === "dark" ? "prose-invert" : ""} max-w-none prose-headings:text-purple-900 dark:prose-headings:text-purple-300 prose-a:text-blue-600 dark:prose-a:text-blue-400`}>
      <h1 className={`text-3xl font-bold mb-6 ${theme === "dark" ? "text-purple-300" : "text-purple-900"}`}>Crisis Classifier Documentation</h1>
      <p className={`text-lg font-semibold mb-6 ${theme === "dark" ? "text-purple-300" : "text-purple-900"}`}>...for the devs &#40;&#59;</p>
      <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
        This documentation provides a high-level overview and detailed explanations of the various components within the Crisis Classifier website.
      </p>
      
      <hr className={`my-8 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
      
      <section id="overview">
        <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-purple-300" : "text-purple-900"}`}>High-Level Overview</h2>
        
        <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          The Crisis Classifier website is designed to automatically detect crisis events in news articles by analyzing their content. 
          Users can input article URLs or use pre-provided sample data. The system processes the article content, trains a one-class 
          classifier using crisis examples, and classifies new articles as either crisis events or non-crisis events. This automation 
          aids in rapid crisis monitoring, reducing the need for manual review during emergencies.
        </p>
      </section>
      
      <hr className={`my-8 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
      
      <section id="structure">
        <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-purple-300" : "text-purple-900"}`}>Project Structure</h2>
        
        <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          The project consists of three main parts:
        </p>
        
        <ol className={`list-decimal pl-6 mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <li className="mb-2"><strong>Frontend Pages (React Components)</strong></li>
          <li className="mb-2"><strong>Article Processing Services</strong></li>
          <li className="mb-2"><strong>One-Class Classifier Implementation</strong></li>
        </ol>
      </section>
      
      <hr className={`my-8 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
      
      <section id="frontend">
        <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-purple-300" : "text-purple-900"}`}>1. Frontend Pages (React Components)</h2>
        
        <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === "dark" ? "text-purple-200" : "text-purple-800"}`}>LandingPage Component</h3>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Purpose:</strong><br />
          The LandingPage is the entry point of the website. It allows users to either add an article URL for analysis or load sample data.
        </p>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Key Features:</strong>
        </p>
        
        <ul className={`list-disc pl-6 mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <li className="mb-2">
            <strong>URL Input:</strong><br />
            Uses a custom <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>UrlInput</code> component to capture user URLs.
          </li>
          
          <li className="mb-2">
            <strong>Feedback Messages:</strong><br />
            Displays information, success, or error messages based on user actions.
          </li>
          
          <li className="mb-2">
            <strong>Loading Indicator:</strong><br />
            Shows a loading screen while processing requests.
          </li>
          
          <li className="mb-2">
            <strong>Navigation:</strong><br />
            Utilizes React Router's <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>useNavigate</code> to redirect users to the processing page after an article is processed.
          </li>
          
          <li className="mb-2">
            <strong>Sample Data Option:</strong><br />
            Provides a button to load and process sample crisis and non-crisis articles.
          </li>
        </ul>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Important Functions:</strong>
        </p>
        
        <ul className={`list-disc pl-6 mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>handleAddUrl(url: string)</code>:<br />
            Processes a single URL by fetching its content and storing the processed article in localStorage before navigating to the processing page.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>handleUseSampleData()</code>:<br />
            Processes sample data (both crisis and non-crisis articles), stores them locally, and navigates to the processing page.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>showMessage(text: string, type: 'info' | 'success' | 'error')</code>:<br />
            Displays a temporary message to the user.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>scrollToTop()</code>:<br />
            Scrolls the page to the top when the header logo is clicked.
          </li>
        </ul>
        
        <h3 className={`text-xl font-bold mt-8 mb-3 ${theme === "dark" ? "text-purple-200" : "text-purple-800"}`}>ProcessingPage Component</h3>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Purpose:</strong><br />
          The ProcessingPage manages and displays the list of processed articles, enables the addition of new URLs, trains the classifier, and shows classification results.
        </p>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Key Features:</strong>
        </p>
        
        <ul className={`list-disc pl-6 mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <li className="mb-2">
            <strong>Article Management:</strong><br />
            Displays a list of articles and allows users to remove articles or manually toggle their crisis status.
          </li>
          
          <li className="mb-2">
            <strong>Model Training and Classification:</strong><br />
            Provides two training modes:
            <ul className="list-disc pl-6 mt-2">
              <li><strong>Sample Data Training:</strong> Uses pre-defined sample articles.</li>
              <li><strong>User Data Training:</strong> Utilizes articles manually marked as crisis by the user.</li>
            </ul>
          </li>
          
          <li className="mb-2">
            <strong>Tabbed Interface:</strong><br />
            Allows users to switch between article management and training options.
          </li>
          
          <li className="mb-2">
            <strong>Real-Time Feedback:</strong><br />
            Displays the model's status (ready or needs training) and classification statistics such as the total number of articles, detected crisis events, and average confidence scores.
          </li>
        </ul>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Important Functions:</strong>
        </p>
        
        <ul className={`list-disc pl-6 mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>handleAddUrl(url: string)</code>:<br />
            Adds and processes a new URL, then triggers classification if the model is ready.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>handleRemoveArticle(url: string)</code>:<br />
            Removes an article from the list and updates localStorage.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>handleToggleCrisis(url: string)</code>:<br />
            Allows users to manually mark or unmark an article as a crisis event.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>trainWithSampleData()</code>:<br />
            Trains the classifier with sample articles and classifies all available articles.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>trainWithUserData()</code>:<br />
            Trains the classifier using user-marked articles and validates that at least one article is marked as crisis.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>classifyArticle(article: Article)</code>:<br />
            Classifies a single article using the trained classifier and updates it with a prediction and confidence score.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>classifyAllArticles()</code>:<br />
            Iterates through all articles to update their classification based on the model's predictions.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>goToLandingPage()</code>:<br />
            Navigates back to the LandingPage.
          </li>
        </ul>
      </section>
      
      <hr className={`my-8 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
      
      <section id="services">
        <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-purple-300" : "text-purple-900"}`}>2. Article Processing Services</h2>
        
        <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === "dark" ? "text-purple-200" : "text-purple-800"}`}>Article Service (<code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>articleService.ts</code>)</h3>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Purpose:</strong><br />
          Provides functions to fetch and process the content of an article from a given URL.
        </p>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Key Functions:</strong>
        </p>
        
        <ul className={`list-disc pl-6 mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <li className="mb-4">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>fetchArticleContent(url: string): Promise&lt;string&gt;</code>
            <p className="mt-2"><strong>Description:</strong><br />
            Fetches raw HTML from a URL (using a proxy to avoid CORS issues), parses the HTML, and extracts text content from paragraph elements.</p>
            <p className="mt-2"><strong>Fallback:</strong><br />
            Returns a placeholder text if fetching fails.</p>
          </li>
          
          <li className="mb-4">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>processArticle(article: Article): Promise&lt;Article&gt;</code>
            <p className="mt-2"><strong>Description:</strong><br />
            Ensures an article has content by fetching it if necessary, and then returns the updated article.</p>
          </li>
        </ul>
      </section>
      
      <hr className={`my-8 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
      
      <section id="classifier">
        <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-purple-300" : "text-purple-900"}`}>3. One-Class Classifier Implementation</h2>
        
        <h3 className={`text-xl font-bold mt-6 mb-3 ${theme === "dark" ? "text-purple-200" : "text-purple-800"}`}>OneClassClassifier Class</h3>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Purpose:</strong><br />
          Implements a one-class classification model that detects crisis events based solely on crisis-related examples. It uses cosine similarity to compare new articles with crisis examples.
        </p>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Key Properties:</strong>
        </p>
        
        <ul className={`list-disc pl-6 mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>threshold</code>:<br />
            A configurable threshold determining the cutoff similarity for classifying an article as a crisis event.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>featureVectors</code>:<br />
            An array containing normalized term frequency vectors for crisis articles.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>vocabulary</code>:<br />
            A set of unique tokens derived from the training articles.
          </li>
          
          <li className="mb-2">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>isReady</code>:<br />
            A Boolean indicating whether the classifier has been trained and is ready for predictions.
          </li>
        </ul>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Key Methods:</strong>
        </p>
        
        <ul className={`list-disc pl-6 mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <li className="mb-4">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>preprocessText(text: string): string[]</code>
            <p className="mt-2"><strong>Description:</strong><br />
            Converts text to lowercase, tokenizes it using non-word characters, and filters out stopwords and short tokens.</p>
          </li>
          
          <li className="mb-4">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>buildVocabulary(articles: Article[]): void</code>
            <p className="mt-2"><strong>Description:</strong><br />
            Constructs the vocabulary from all tokens present in the provided articles.</p>
          </li>
          
          <li className="mb-4">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>documentToVector(text: string): Map&lt;string, number&gt;</code>
            <p className="mt-2"><strong>Description:</strong><br />
            Converts a document's text into a normalized feature vector based on token counts.</p>
          </li>
          
          <li className="mb-4">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>cosineSimilarity(vecA: Map&lt;string, number&gt;, vecB: Map&lt;string, number&gt;): number</code>
            <p className="mt-2"><strong>Description:</strong><br />
            Computes the cosine similarity between two feature vectors, serving as a measure of similarity to crisis examples.</p>
          </li>
          
          <li className="mb-4">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>train(articles: Article[]): void</code>
            <p className="mt-2"><strong>Description:</strong><br />
            Filters for crisis articles, builds the vocabulary, creates feature vectors for crisis articles, and sets the model to 'ready' if training data is available.</p>
          </li>
          
          <li className="mb-4">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>predict(article: Article): {'{'} isCrisis: boolean; confidence: number {'}'}</code>
            <p className="mt-2"><strong>Description:</strong><br />
            Converts the article's content into a feature vector, computes its similarity to each crisis example, and classifies the article as a crisis event if the highest similarity exceeds the threshold. It returns both the prediction and a confidence score.</p>
          </li>
        </ul>
        
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <strong>Factory Function:</strong>
        </p>
        
        <ul className={`list-disc pl-6 mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <li className="mb-4">
            <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>createClassifier(): ClassifierModel</code>
            <p className="mt-2"><strong>Description:</strong><br />
            A factory function that instantiates and returns a new <code className={`px-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>OneClassClassifier</code> object.</p>
          </li>
        </ul>
      </section>
      
      <hr className={`my-8 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
      
      <section id="conclusion">
        <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-purple-300" : "text-purple-900"}`}>Conclusion</h2>
        
        <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          The Crisis Classifier website integrates an intuitive user interface with a powerful backend classification engine. 
          By training on crisis-specific examples and leveraging cosine similarity, the system offers automated predictions 
          about whether an article pertains to a crisis event. This makes the platform particularly valuable for rapid crisis 
          detection and monitoring, enabling users—from emergency responders to media professionals—to make informed decisions quickly.
        </p>
        
        <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          Feel free to modify thresholds, enhance preprocessing, or adjust training datasets to further optimize the classifier's performance.
        </p>
      </section>
    </div>
  );
};

const MarkdownDescription = () => {
  const [activeSection, setActiveSection] = useState<string | null>("overview");
  const { theme } = useTheme();

  const sections = [
    { id: "overview", title: "Overview", anchor: "overview" },
    { id: "structure", title: "Project Structure", anchor: "structure" },
    { id: "frontend", title: "Frontend Components", anchor: "frontend" },
    { id: "services", title: "Article Services", anchor: "services" },
    { id: "classifier", title: "Classifier Implementation", anchor: "classifier" },
    { id: "conclusion", title: "Conclusion", anchor: "conclusion" },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-8">
      {/* Sidebar Navigation */}
      <div className="md:w-1/4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md sticky top-24 self-start">
        <h3 className="text-lg font-semibold mb-4 text-purple-900 dark:text-purple-300">
          Documentation
        </h3>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === section.id
                  ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="md:w-3/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <DocumentationContent />
      </div>
    </div>
  );
};

export default MarkdownDescription;