import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Brain,
  ChevronDown,
  Search,
} from "lucide-react";
import UrlInput from "../components/UrlInput";
import ArticleList from "../components/ArticleList";
import TrainingOptions from "../components/TrainingOptions";
import { Article, ClassifierModel } from "../types";
import { processArticle } from "../services/articleService";
import { createClassifier } from "../services/classifierService";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

const ProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [classifier, setClassifier] = useState<ClassifierModel>(
    createClassifier()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "info" | "success" | "error";
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"articles" | "training">(
    "articles"
  );
  const { theme } = useTheme();

  useEffect(() => {
    // Load articles from localStorage
    const savedArticles = localStorage.getItem("crisisArticles");
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }

    // Check if we should use sample data for training
    const useSampleData = localStorage.getItem("useSampleData");
    if (useSampleData === "true") {
      trainWithSampleData();
      localStorage.removeItem("useSampleData");
    }
  }, []);

  const showMessage = (text: string, type: "info" | "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleAddUrl = async (url: string) => {
    // Check if URL already exists
    if (articles.some((article) => article.url === url)) {
      showMessage("This URL has already been added", "error");
      return;
    }

    setIsLoading(true);
    try {
      // Create a new article object
      const newArticle: Article = { url };

      // Process the article to fetch its content
      const processedArticle = await processArticle(newArticle);

      // Add the article to the list
      const updatedArticles = [...articles, processedArticle];
      setArticles(updatedArticles);

      // Update localStorage
      localStorage.setItem("crisisArticles", JSON.stringify(updatedArticles));

      // If the model is ready, classify the article
      if (classifier.isReady) {
        classifyArticle(processedArticle);
      }

      showMessage("Article added successfully", "success");
    } catch (error) {
      console.error("Error adding article:", error);
      showMessage("Failed to add article", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveArticle = (url: string) => {
    const updatedArticles = articles.filter((article) => article.url !== url);
    setArticles(updatedArticles);
    localStorage.setItem("crisisArticles", JSON.stringify(updatedArticles));
  };

  const handleToggleCrisis = (url: string) => {
    const updatedArticles = articles.map((article) =>
      article.url === url
        ? { ...article, isCrisis: !article.isCrisis }
        : article
    );
    setArticles(updatedArticles);
    localStorage.setItem("crisisArticles", JSON.stringify(updatedArticles));
  };

  const trainWithSampleData = async () => {
    setIsLoading(true);
    try {
      // Train the classifier with the current articles
      classifier.train(articles);

      // Classify all articles
      classifyAllArticles();

      showMessage("Model trained with sample data", "success");
    } catch (error) {
      console.error("Error training with sample data:", error);
      showMessage("Failed to train model", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const trainWithUserData = () => {
    setIsLoading(true);
    try {
      // Check if there are any articles marked as crisis
      const hasCrisisArticles = articles.some((article) => article.isCrisis);

      if (!hasCrisisArticles) {
        showMessage(
          "Please mark at least one article as a crisis event for training",
          "error"
        );
        setIsLoading(false);
        return;
      }

      // Train the classifier with user-provided articles
      classifier.train(articles);

      // Classify all articles
      classifyAllArticles();

      showMessage("Model trained with user data", "success");
    } catch (error) {
      console.error("Error training with user data:", error);
      showMessage("Failed to train model", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const classifyArticle = (article: Article) => {
    if (!classifier.isReady || !article.content) return article;

    const result = classifier.predict(article);

    return {
      ...article,
      prediction: result.isCrisis,
      confidence: result.confidence,
    };
  };

  const classifyAllArticles = () => {
    if (!classifier.isReady) return;

    const classifiedArticles = articles.map((article) =>
      classifyArticle(article)
    );
    setArticles(classifiedArticles);
    localStorage.setItem("crisisArticles", JSON.stringify(classifiedArticles));
  };

  const goToLandingPage = () => {
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={goToLandingPage}
                className={`flex items-center gap-1 ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300"
                    : "text-gray-600 hover:text-purple-800"
                }`}
              >
                <ArrowLeft size={18} />
                <span>Home</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle
                size={24}
                className={
                  theme === "dark" ? "text-purple-300" : "text-purple-800"
                }
              />
              <h1
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-purple-300" : "text-purple-900"
                }`}
              >
                Crisis Classifier
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`w-3 h-3 rounded-full ${
                  classifier.isReady ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <span
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {classifier.isReady ? "Model Ready" : "Model Needs Training"}
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div
          className={`${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
          } shadow rounded-lg overflow-hidden border border-gray-200`}
        >
          {/* Top Section */}
          <div
            className={`p-6 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Article Processing
                </h2>
                <p
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                >
                  Add, classify, and manage crisis articles
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    classifier.isReady ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {classifier.isReady
                    ? "Model is trained and ready"
                    : "Model needs training"}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div
            className={`border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("articles")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === "articles"
                    ? theme === "dark"
                      ? "border-purple-400 text-purple-300"
                      : "border-purple-500 text-purple-600"
                    : theme === "dark"
                    ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => setActiveTab("training")}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === "training"
                    ? theme === "dark"
                      ? "border-purple-400 text-purple-300"
                      : "border-purple-500 text-purple-600"
                    : theme === "dark"
                    ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Training
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "articles" ? (
              <>
                <div className="mb-6">
                  <h3
                    className={`text-lg font-medium mb-4 ${
                      theme === "dark" ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    Add Article URL
                  </h3>
                  <UrlInput onAddUrl={handleAddUrl} />

                  {message && (
                    <div
                      className={`mt-4 p-3 rounded-md ${
                        message.type === "error"
                          ? theme === "dark"
                            ? "bg-red-900 text-red-100"
                            : "bg-red-50 text-red-700"
                          : message.type === "success"
                          ? theme === "dark"
                            ? "bg-green-900 text-green-100"
                            : "bg-green-50 text-green-700"
                          : theme === "dark"
                          ? "bg-blue-900 text-blue-100"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className={`text-lg font-medium ${
                        theme === "dark" ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Articles ({articles.length})
                    </h3>
                    <div className="flex items-center gap-2">
                      <Search
                        size={16}
                        className={
                          theme === "dark" ? "text-gray-400" : "text-gray-400"
                        }
                      />
                      <input
                        type="text"
                        placeholder="Search articles..."
                        className={`text-sm border-none focus:ring-0 ${
                          theme === "dark"
                            ? "text-gray-300 bg-gray-700"
                            : "text-gray-600 bg-gray-50"
                        } rounded-md`}
                      />
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="flex justify-center items-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                  ) : (
                    <ArticleList
                      articles={articles}
                      onRemove={handleRemoveArticle}
                      onToggleCrisis={handleToggleCrisis}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="py-4">
                <TrainingOptions
                  onTrainWithSamples={trainWithSampleData}
                  onTrainWithUserData={trainWithUserData}
                  isModelReady={classifier.isReady}
                />

                <div
                  className={`mt-8 ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  } p-6 rounded-lg border ${
                    theme === "dark" ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <h3
                    className={`text-lg font-medium mb-4 ${
                      theme === "dark" ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    Training Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4
                        className={`font-medium ${
                          theme === "dark" ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Model Status
                      </h4>
                      <p
                        className={
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {classifier.isReady
                          ? "The model is trained and ready to classify articles."
                          : "The model needs to be trained before it can classify articles."}
                      </p>
                    </div>

                    <div>
                      <h4
                        className={`font-medium ${
                          theme === "dark" ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Training Data
                      </h4>
                      <p
                        className={
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {articles.filter((a) => a.isCrisis).length} crisis
                        articles and{" "}
                        {articles.filter((a) => a.isCrisis === false).length}{" "}
                        non-crisis articles available for training.
                      </p>
                    </div>

                    <div>
                      <h4
                        className={`font-medium ${
                          theme === "dark" ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Classification Results
                      </h4>
                      <p
                        className={
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {
                          articles.filter((a) => a.prediction !== undefined)
                            .length
                        }{" "}
                        articles classified:{" "}
                        {articles.filter((a) => a.prediction === true).length}{" "}
                        crisis events detected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div
            className={`${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
            } p-6 rounded-lg shadow border border-gray-200`}
          >
            <h3
              className={`text-sm font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              } uppercase tracking-wider mb-2`}
            >
              Total Articles
            </h3>
            <p
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {articles.length}
            </p>
            <div
              className={`mt-2 flex items-center text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span>Processed and ready for analysis</span>
            </div>
          </div>

          <div
            className={`${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
            } p-6 rounded-lg shadow border border-gray-200`}
          >
            <h3
              className={`text-sm font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              } uppercase tracking-wider mb-2`}
            >
              Crisis Events
            </h3>
            <p className="text-3xl font-bold text-red-600">
              {articles.filter((a) => a.prediction === true).length}
            </p>
            <div
              className={`mt-2 flex items-center text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span>Detected in your articles</span>
            </div>
          </div>

          <div
            className={`${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
            } p-6 rounded-lg shadow border border-gray-200`}
          >
            <h3
              className={`text-sm font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              } uppercase tracking-wider mb-2`}
            >
              Model Confidence
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {articles.filter((a) => a.confidence !== undefined).length > 0
                ? `${(
                    (articles.reduce(
                      (sum, article) => sum + (article.confidence || 0),
                      0
                    ) /
                      articles.filter((a) => a.confidence !== undefined)
                        .length) *
                    100
                  ).toFixed(1)}%`
                : "N/A"}
            </p>
            <div
              className={`mt-2 flex items-center text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span>Average confidence score</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-t mt-12`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <AlertTriangle
                size={20}
                className={
                  theme === "dark" ? "text-purple-300" : "text-purple-800"
                }
              />
              <span
                className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
              >
                Crisis Classifier
              </span>
            </div>
            <div className="flex space-x-6">
              <a
                href="/Documentation"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Documentation
              </a>
              <a
                href="/About"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                About
              </a>
              <a
                href="/Contact"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProcessingPage;
