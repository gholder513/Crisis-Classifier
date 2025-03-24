import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import MarkdownDescription from "../components/MarkdownDescription";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";

const DocumentationPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToLandingPage = () => {
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-purple-100 to-yellow-100 text-gray-900"
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
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={scrollToTop}
            >
              <AlertTriangle
                size={24}
                className={
                  theme === "dark" ? "text-purple-300" : "text-purple-800"
                }
              />
              <h1
                onClick={goToLandingPage}
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-purple-300" : "text-purple-900"
                }`}
              >
                Crisis Classifier
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/about"
                className={`${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300"
                    : "text-gray-700 hover:text-purple-800"
                }`}
              >
                About
              </a>
              <a
                href="/contact"
                className={`${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300"
                    : "text-gray-700 hover:text-purple-800"
                }`}
              >
                Contact
              </a>
              <a
                href="/documentation"
                className={`${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300"
                    : "text-gray-700 hover:text-purple-800"
                }`}
              >
                Documentation
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1
            className={`text-5xl md:text-6xl font-extrabold ${
              theme === "dark" ? "text-purple-300" : "text-purple-900"
            } mb-6`}
          >
            Documentation
          </h1>
          <p
            className={`text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            } max-w-3xl mx-auto`}
          >
            Comprehensive guide to the Crisis Classifier system
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <a
            href="https://github.com/gholder513/Crisis-Classifier"
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              theme === "dark"
                ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                : "bg-white text-gray-800 hover:bg-gray-100"
            } shadow-md transition-colors`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>View on GitHub</span>
          </a>
        </div>

        {/* Documentation Content */}
        <MarkdownDescription />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DocumentationPage;
