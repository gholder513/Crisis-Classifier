import React from 'react';
import { BookOpen, Brain, RefreshCw } from 'lucide-react';

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
  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
      <h2 className="text-lg font-medium mb-3">Training Options</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onTrainWithSamples}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <BookOpen size={18} />
          <span>Train with Sample Data</span>
        </button>
        <button
          onClick={onTrainWithUserData}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={!isModelReady}
        >
          <Brain size={18} />
          <span>Train with User Data</span>
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isModelReady ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        <span className="text-sm text-gray-600">
          {isModelReady ? 'Model is trained and ready' : 'Model needs training'}
        </span>
      </div>
    </div>
  );
};

export default TrainingOptions;