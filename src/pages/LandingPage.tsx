import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import UrlInput from '../components/UrlInput';
import Header from '../components/Header';
import { processArticle } from '../services/articleService';
import { Article } from '../types';
import { sampleCrisisArticles, sampleNonCrisisArticles } from '../data/sampleCrisisArticles';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'info' | 'success' | 'error' } | null>(null);

  const showMessage = (text: string, type: 'info' | 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleAddUrl = async (url: string) => {
    setIsLoading(true);
    try {
      // Process the article to fetch its content
      const newArticle: Article = { url };
      const processedArticle = await processArticle(newArticle);
      
      // Store the article in localStorage to pass to the processing page
      const articles = [processedArticle];
      localStorage.setItem('crisisArticles', JSON.stringify(articles));
      
      // Navigate to the processing page
      navigate('/process');
    } catch (error) {
      console.error('Error adding article:', error);
      showMessage('Failed to add article', 'error');
      setIsLoading(false);
    }
  };

  const handleUseSampleData = async () => {
    setIsLoading(true);
    try {
      // Process sample articles to ensure they have content
      const processedCrisisArticles = await Promise.all(
        sampleCrisisArticles.map(article => processArticle({ ...article }))
      );
      
      const processedNonCrisisArticles = await Promise.all(
        sampleNonCrisisArticles.map(article => processArticle({ ...article }))
      );
      
      // Combine all articles for training
      const articles = [...processedCrisisArticles, ...processedNonCrisisArticles];
      
      // Store the articles in localStorage
      localStorage.setItem('crisisArticles', JSON.stringify(articles));
      localStorage.setItem('useSampleData', 'true');
      
      // Navigate to the processing page
      navigate('/process');
    } catch (error) {
      console.error('Error processing sample data:', error);
      showMessage('Failed to process sample data', 'error');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-yellow-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-900 mb-6">
            The Crisis <span className="text-purple-600">Classification</span> System
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Instantly analyze and classify news articles and URLs as crisis or non-crisis events using advanced machine learning. Ditch manual review and automate your crisis monitoring.
          </p>
          
          <div className="max-w-xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-4 text-left">Add Article URL to Analyze</h2>
              <UrlInput onAddUrl={handleAddUrl} />
              
              {message && (
                <div className={`mt-4 p-3 rounded-md ${
                  message.type === 'error' 
                    ? 'bg-red-50 text-red-700' 
                    : message.type === 'success' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-blue-50 text-blue-700'
                }`}>
                  {message.text}
                </div>
              )}
              
              <div className="mt-4 flex items-center justify-center">
                <span className="text-gray-500">or</span>
              </div>
              
              <button
                onClick={handleUseSampleData}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-purple-800 text-white rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <span>Use Sample Data</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800 mb-4"></div>
              <p className="text-gray-700">Processing your request...</p>
            </div>
          </div>
        )}

        {/* Features Section */}
        <h2 className="text-3xl font-bold text-center text-purple-900">Features</h2>
        <div id="features" className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-purple-800" />
            </div>
            <h3 className="text-xl font-bold mb-2">Crisis Detection</h3>
            <p className="text-gray-600">Automatically identify crisis events from news articles and online content with high accuracy.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={24} className="text-purple-800" />
            </div>
            <h3 className="text-xl font-bold mb-2">Custom Training</h3>
            <p className="text-gray-600">Train the model with your own data or use our pre-trained datasets for immediate classification.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <ExternalLink size={24} className="text-purple-800" />
            </div>
            <h3 className="text-xl font-bold mb-2">URL Processing</h3>
            <p className="text-gray-600">Simply paste article URLs and our system will extract and analyze the content automatically.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-900">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-800">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Add URLs</h3>
              <p className="text-gray-600">Paste article URLs or use sample data to get started</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-800">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Train Model</h3>
              <p className="text-gray-600">Choose between sample data or your own labeled articles</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-800">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Classify Content</h3>
              <p className="text-gray-600">Our algorithm analyzes and classifies each article</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-800">4</span>
              </div>
              <h3 className="text-lg font-medium mb-2">View Results</h3>
              <p className="text-gray-600">See classification results with confidence scores</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-purple-900 mb-6">Ready to start classifying crisis events?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.querySelector('input')?.focus()}
            className="px-6 py-3 bg-purple-800 text-white rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Add Your First URL
          </button>
          <button
            onClick={handleUseSampleData}
            className="px-6 py-3 bg-purple-800 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Try Sample Data
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;