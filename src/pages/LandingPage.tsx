import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Upload,
} from "lucide-react";
import { useDropzone } from 'react-dropzone';
import UrlInput from "../components/UrlInput";
import Header from "../components/Header";
import { processArticle } from "../services/articleService";
import { Article } from "../types";
import {
  sampleCrisisArticles,
  sampleNonCrisisArticles,
} from "../data/sampleCrisisArticles";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "info" | "success" | "error";
  } | null>(null);
  const { theme } = useTheme();

  const showMessage = (text: string, type: "info" | "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleAddUrl = async (url: string) => {
    setIsLoading(true);
    try {
      const newArticle: Article = { url };
      const processedArticle = await processArticle(newArticle);
      const articles = [processedArticle];
      localStorage.setItem("crisisArticles", JSON.stringify(articles));
      navigate("/process");
    } catch (error) {
      console.error("Error adding article:", error);
      showMessage("Failed to add article", "error");
      setIsLoading(false);
    }
  };

  const handleUseSampleData = async () => {
    setIsLoading(true);
    try {
      const processedCrisisArticles = await Promise.all(
        sampleCrisisArticles.map((article) => processArticle({ ...article }))
      );

      const processedNonCrisisArticles = await Promise.all(
        sampleNonCrisisArticles.map((article) => processArticle({ ...article }))
      );

      const articles = [
        ...processedCrisisArticles,
        ...processedNonCrisisArticles,
      ];

      localStorage.setItem("crisisArticles", JSON.stringify(articles));
      localStorage.setItem("useSampleData", "true");

      navigate("/process");
    } catch (error) {
      console.error("Error processing sample data:", error);
      showMessage("Failed to process sample data", "error");
      setIsLoading(false);
    }
  };

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };
  

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsLoading(true);
    try {
      const file = acceptedFiles[0];
      const text = await file.text();
      const urls = text.split('\n').map(url => url.trim()).filter(Boolean);
  
      const validUrls = urls.filter(isValidUrl);
  
      if (validUrls.length === 0) {
        showMessage("No valid URLs found in the file", "error");
        setIsLoading(false);
        return;
      }
  
      const articles = await Promise.all(
        validUrls.map(async (url) => {
          try {
            const article: Article = { url };
            return await processArticle(article);
          } catch (error) {
            console.error(`Error processing URL: ${url}`, error);
            return null;
          }
        })
      );
  
      const validArticles = articles.filter((article): article is Article => article !== null);
  
      if (validArticles.length > 0) {
        localStorage.setItem("crisisArticles", JSON.stringify(validArticles));
        navigate("/process");
      } else {
        showMessage("All valid URLs failed to process", "error");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      showMessage("Failed to process file", "error");
      setIsLoading(false);
    }
  }, [navigate]);
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt']
    },
    multiple: false
  });

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-purple-900 text-white"
          : "bg-gradient-to-br from-purple-100 to-yellow-100 text-gray-900"
      }`}
    >
      <Header />

      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1
            className={`text-5xl md:text-6xl font-extrabold ${
              theme === "dark" ? "text-purple-300" : "text-purple-900"
            } mb-6`}
          >
            The Crisis{" "}
            <span
              className={
                theme === "dark" ? "text-purple-400" : "text-purple-600"
              }
            >
              Classification
            </span>{" "}
            System
          </h1>
          <p
            className={`text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            } max-w-3xl mx-auto mb-8`}
          >
            Instantly analyze and classify news articles and URLs as crisis or
            non-crisis events using advanced machine learning. Ditch manual
            review and automate your crisis monitoring.
          </p>

          <div className="max-w-xl mx-auto">
            <div
              className={`${
                theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
              } p-6 rounded-lg shadow-md border border-gray-200`}
            >
              <h2
                className={`text-lg font-medium mb-4 text-left ${
                  theme === "dark" ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Add Article URL
              </h2>
              <UrlInput onAddUrl={handleAddUrl} />

              <div className="mt-6">
                <h2
                  className={`text-lg font-medium mb-4 text-left ${
                    theme === "dark" ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Or Drop a Text File
                </h2>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? theme === "dark"
                        ? "border-purple-400 bg-purple-900/20"
                        : "border-purple-400 bg-purple-50"
                      : theme === "dark"
                      ? "border-gray-600 hover:border-purple-400"
                      : "border-gray-300 hover:border-purple-400"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload
                    className={`mx-auto mb-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                    size={24}
                  />
                  <p
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }
                  >
                    {isDragActive
                      ? "Drop the file here"
                      : "Drag and drop a .txt file here, or click to select"}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Each line should contain a URL
                  </p>
                </div>
              </div>

              {message && (
                <div
                  className={`mt-4 p-3 rounded-md ${
                    message.type === "error"
                      ? "bg-red-900 text-red-100"
                      : message.type === "success"
                      ? "bg-green-900 text-green-100"
                      : "bg-blue-900 text-blue-100"
                  } ${
                    theme === "light" &&
                    (message.type === "error"
                      ? "bg-red-50 text-red-700"
                      : message.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-50 text-blue-700")
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="mt-4 flex items-center justify-center">
                <span
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }
                >
                  or
                </span>
              </div>

              <button
                onClick={handleUseSampleData}
                className={`w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 ${
                  theme === "dark"
                    ? "bg-purple-700 hover:bg-purple-800"
                    : "bg-purple-800 hover:bg-purple-900"
                } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
              >
                <span>Use Sample Data</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className={`${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-900"
              } p-6 rounded-lg shadow-lg flex flex-col items-center`}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
              <p>Processing your request...</p>
            </div>
          </div>
        )}

        <h2
          className={`text-3xl font-bold text-center ${
            theme === "dark" ? "text-purple-300" : "text-purple-900"
          }`}
        >
          Features
        </h2>
        <div id="features" className="grid md:grid-cols-3 gap-8 mt-16">
          <div
            className={`${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
            } p-6 rounded-lg shadow-md border border-gray-200`}
          >
            <div
              className={`w-12 h-12 ${
                theme === "dark" ? "bg-purple-900" : "bg-purple-100"
              } rounded-full flex items-center justify-center mb-4`}
            >
              <AlertTriangle
                size={24}
                className={
                  theme === "dark" ? "text-purple-300" : "text-purple-800"
                }
              />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${
                theme === "dark" ? "text-purple-300" : "text-purple-900"
              }`}
            >
              Crisis Detection
            </h3>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              Automatically identify crisis events from news articles and online
              content with high accuracy.
            </p>
          </div>

          <div
            className={`${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
            } p-6 rounded-lg shadow-md border border-gray-200`}
          >
            <div
              className={`w-12 h-12 ${
                theme === "dark" ? "bg-purple-900" : "bg-purple-100"
              } rounded-full flex items-center justify-center mb-4`}
            >
              <CheckCircle
                size={24}
                className={
                  theme === "dark" ? "text-purple-300" : "text-purple-800"
                }
              />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${
                theme === "dark" ? "text-purple-300" : "text-purple-900"
              }`}
            >
              Custom Training
            </h3>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              Train the model with your own data or use our pre-trained datasets
              for immediate classification.
            </p>
          </div>

          <div
            className={`${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
            } p-6 rounded-lg shadow-md border border-gray-200`}
          >
            <div
              className={`w-12 h-12 ${
                theme === "dark" ? "bg-purple-900" : "bg-purple-100"
              } rounded-full flex items-center justify-center mb-4`}
            >
              <ExternalLink
                size={24}
                className={
                  theme === "dark" ? "text-purple-300" : "text-purple-800"
                }
              />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${
                theme === "dark" ? "text-purple-300" : "text-purple-900"
              }`}
            >
              URL Processing
            </h3>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              Simply paste article URLs and our system will extract and analyze
              the content automatically.
            </p>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className={
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }
      >
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              theme === "dark" ? "text-purple-300" : "text-purple-900"
            }`}
          >
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className={`w-16 h-16 ${
                  theme === "dark" ? "bg-purple-900" : "bg-purple-100"
                } rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <span
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-purple-300" : "text-purple-800"
                  }`}
                >
                  1
                </span>
              </div>
              <h3
                className={`text-lg font-medium mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Add URLs
              </h3>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
              >
                Paste article URLs or use sample data to get started
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 ${
                  theme === "dark" ? "bg-purple-900" : "bg-purple-100"
                } rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <span
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-purple-300" : "text-purple-800"
                  }`}
                >
                  2
                </span>
              </div>
              <h3
                className={`text-lg font-medium mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Train Model
              </h3>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
              >
                Choose between sample data or your own labeled articles
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 ${
                  theme === "dark" ? "bg-purple-900" : "bg-purple-100"
                } rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <span
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-purple-300" : "text-purple-800"
                  }`}
                >
                  3
                </span>
              </div>
              <h3
                className={`text-lg font-medium mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Classify Content
              </h3>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
              >
                Our algorithm analyzes and classifies each article
              </p>
            </div>

            <div className="text-center">
              <div
                className={`w-16 h-16 ${
                  theme === "dark" ? "bg-purple-900" : "bg-purple-100"
                } rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <span
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-purple-300" : "text-purple-800"
                  }`}
                >
                  4
                </span>
              </div>
              <h3
                className={`text-lg font-medium mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-900"
                }`}
              >
                View Results
              </h3>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
              >
                See classification results with confidence scores
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2
          className={`text-3xl font-bold ${
            theme === "dark" ? "text-purple-300" : "text-purple-900"
          } mb-6`}
        >
          Ready to start classifying crisis events?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.querySelector("input")?.focus()}
            className={`px-6 py-3 ${
              theme === "dark"
                ? "bg-purple-700 hover:bg-purple-800"
                : "bg-purple-800 hover:bg-purple-900"
            } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
          >
            Add Your First URL
          </button>
          <button
            onClick={handleUseSampleData}
            className={`px-6 py-3 ${
              theme === "dark"
                ? "bg-purple-700 hover:bg-purple-800"
                : "bg-purple-800 hover:bg-purple-900"
            } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
          >
            Try Sample Data
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;