import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface UrlInputProps {
  onAddUrl: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onAddUrl }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAddUrl(url.trim());
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter article URL"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <PlusCircle size={18} />
        <span>Add</span>
      </button>
    </form>
  );
};

export default UrlInput;