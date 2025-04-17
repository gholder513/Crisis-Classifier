import React from 'react';
import { Folder, Plus, Clock } from 'lucide-react';
import { TrainingCollection } from '../types';
import { useTheme } from '../context/ThemeContext';

interface CollectionsListProps {
  collections: TrainingCollection[];
  onCreateCollection: () => void;
  onSelectCollection: (collection: TrainingCollection) => void;
}

const CollectionsList: React.FC<CollectionsListProps> = ({
  collections,
  onCreateCollection,
  onSelectCollection,
}) => {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {/* Create New Collection Card */}
      <div
        onClick={onCreateCollection}
        className={`${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
            : 'bg-white border-gray-200 hover:bg-gray-50'
        } p-6 rounded-lg shadow-md border cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[200px]`}
      >
        <Plus
          size={40}
          className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}
        />
        <p
          className={`mt-4 font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Create New Collection
        </p>
      </div>

      {/* Existing Collections */}
      {collections.map((collection) => (
        <div
          key={collection.id}
          onClick={() => onSelectCollection(collection)}
          className={`${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          } p-6 rounded-lg shadow-md border cursor-pointer transition-colors`}
        >
          <div className="flex items-start justify-between">
            <Folder
              size={24}
              className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}
            />
            <div
              className={`px-2 py-1 rounded text-xs ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {collection.articles.length} articles
            </div>
          </div>

          <h3
            className={`mt-4 text-lg font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
            }`}
          >
            {collection.name}
          </h3>

          <p
            className={`mt-2 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            } line-clamp-2`}
          >
            {collection.description}
          </p>

          <div
            className={`mt-4 flex items-center text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            <Clock size={14} className="mr-1" />
            {new Date(collection.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionsList;