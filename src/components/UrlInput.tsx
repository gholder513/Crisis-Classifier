import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface UrlInputProps {
  onAddUrl: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onAddUrl }) => {
  const [url, setUrl] = useState("");
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAddUrl(url.trim());
      setUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter article URL"
        className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          theme === "dark"
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500"
            : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
        }`}
        required
      />
      <button
        type="submit"
        className={`flex items-center gap-2 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
          theme === "dark"
            ? "bg-purple-700 hover:bg-purple-800 focus:ring-purple-500"
            : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
        }`}
      >
        <PlusCircle size={18} />
        <span>Add</span>
      </button>
    </form>
  );
};

export default UrlInput;
