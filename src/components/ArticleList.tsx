import React from "react";
import { Article } from "../types";
import { AlertTriangle, CheckCircle, HelpCircle, Trash2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ArticleListProps {
  articles: Article[];
  onRemove: (url: string) => void;
  onToggleCrisis: (url: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  onRemove,
  onToggleCrisis,
}) => {
  const { theme } = useTheme();

  if (articles.length === 0) {
    return (
      <div
        className={`p-6 text-center ${
          theme === "dark"
            ? "text-gray-400 border-gray-700"
            : "text-gray-500 border-gray-300"
        } border border-dashed rounded-md`}
      >
        No articles added yet. Add URLs above to classify them.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <div
          key={article.url}
          className={`p-4 border rounded-md ${
            article.prediction === undefined
              ? theme === "dark"
                ? "border-gray-700 bg-gray-800"
                : "border-gray-300 bg-gray-50"
              : article.prediction
              ? theme === "dark"
                ? "border-red-800 bg-red-900/30"
                : "border-red-300 bg-red-50"
              : theme === "dark"
              ? "border-green-800 bg-green-900/30"
              : "border-green-300 bg-green-50"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {article.prediction === undefined ? (
                  <HelpCircle
                    size={20}
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  />
                ) : article.prediction ? (
                  <AlertTriangle size={20} className="text-red-500" />
                ) : (
                  <CheckCircle size={20} className="text-green-500" />
                )}
                <h3
                  className={`font-medium truncate ${
                    theme === "dark" ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  {article.url}
                </h3>
              </div>

              {article.prediction !== undefined && (
                <div className="mt-2 text-sm">
                  <p>
                    <span
                      className={`font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Classification:
                    </span>{" "}
                    <span
                      className={
                        article.prediction ? "text-red-500" : "text-green-500"
                      }
                    >
                      {article.prediction ? "Crisis" : "Non-Crisis"}
                    </span>
                  </p>
                  <p>
                    <span
                      className={`font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Confidence:
                    </span>{" "}
                    {article.confidence !== undefined
                      ? `${(article.confidence * 100).toFixed(2)}%`
                      : "N/A"}
                  </p>
                </div>
              )}

              {article.content && (
                <div className="mt-2">
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    } line-clamp-2`}
                  >
                    {article.content.substring(0, 150)}...
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onToggleCrisis(article.url)}
                className={`p-1 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                title="Toggle crisis status for training"
              >
                {article.isCrisis ? (
                  <AlertTriangle size={18} className="text-red-500" />
                ) : (
                  <CheckCircle size={18} className="text-green-500" />
                )}
              </button>
              <button
                onClick={() => onRemove(article.url)}
                className={`p-1 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-red-400"
                    : "text-gray-500 hover:text-red-600"
                }`}
                title="Remove article"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
