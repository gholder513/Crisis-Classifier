import React from 'react';
import { Article } from '../types';
import { AlertTriangle, CheckCircle, HelpCircle, Trash2 } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  onRemove: (url: string) => void;
  onToggleCrisis: (url: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onRemove, onToggleCrisis }) => {
  if (articles.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 border border-dashed border-gray-300 rounded-md">
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
              ? 'border-gray-300 bg-gray-50' 
              : article.prediction 
                ? 'border-red-300 bg-red-50' 
                : 'border-green-300 bg-green-50'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {article.prediction === undefined ? (
                  <HelpCircle size={20} className="text-gray-500" />
                ) : article.prediction ? (
                  <AlertTriangle size={20} className="text-red-500" />
                ) : (
                  <CheckCircle size={20} className="text-green-500" />
                )}
                <h3 className="font-medium truncate">{article.url}</h3>
              </div>
              
              {article.prediction !== undefined && (
                <div className="mt-2 text-sm">
                  <p>
                    <span className="font-medium">Classification:</span>{' '}
                    <span className={article.prediction ? 'text-red-600' : 'text-green-600'}>
                      {article.prediction ? 'Crisis' : 'Non-Crisis'}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Confidence:</span>{' '}
                    {article.confidence !== undefined ? `${(article.confidence * 100).toFixed(2)}%` : 'N/A'}
                  </p>
                </div>
              )}
              
              {article.content && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 line-clamp-2">{article.content.substring(0, 150)}...</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onToggleCrisis(article.url)}
                className="p-1 text-gray-500 hover:text-blue-600"
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
                className="p-1 text-gray-500 hover:text-red-600"
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