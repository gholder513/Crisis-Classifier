import React from "react";
import { BookOpen, Brain, Lock } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

interface TrainingOptionsProps {
  onTrainWithSamples: () => void;
  onTrainWithUserData: () => void;
  isModelReady: boolean;
}

const TrainingOptions: React.FC<TrainingOptionsProps> = ({
  onTrainWithSamples,
  onTrainWithUserData,
  isModelReady,
}) => {
  const { theme } = useTheme();
  const { user } = useAuth();

  if (!user?.isAdmin) {
    return (
      <div
        className={`p-4 ${
          theme === "dark"
            ? "bg-gray-700 border-gray-600"
            : "bg-gray-50 border-gray-200"
        } border rounded-md`}
      >
        <div className="flex items-center gap-2 text-yellow-500">
          <Lock size={20} />
          <p className={theme === "dark" ? "text-gray-200" : "text-gray-700"}>
            Only administrators can train new models. You can use existing trained models from the collections page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 ${
        theme === "dark"
          ? "bg-gray-700 border-gray-600"
          : "bg-gray-50 border-gray-200"
      } border rounded-md`}
    >
      <h2
        className={`text-lg font-medium mb-3 ${
          theme === "dark" ? "text-gray-200" : "text-gray-900"
        }`}
      >
        Training Options (Admin)
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onTrainWithSamples}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
            theme === "dark"
              ? "bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-500"
              : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
          }`}
        >
          <BookOpen size={18} />
          <span>Train with Sample Data</span>
        </button>
        <button
          onClick={onTrainWithUserData}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
            theme === "dark"
              ? "bg-purple-700 hover:bg-purple-800 focus:ring-purple-500"
              : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
          }`}
          disabled={!isModelReady}
        >
          <Brain size={18} />
          <span>Train with User Data</span>
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            isModelReady ? "bg-green-500" : "bg-gray-400"
          }`}
        ></div>
        <span
          className={`text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {isModelReady ? "Model is trained and ready" : "Model needs training"}
        </span>
      </div>
    </div>
  );
};

export default TrainingOptions;