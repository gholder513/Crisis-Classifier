import { AlertTriangle } from 'lucide-react';

const Header: React.FC = () => {


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

return(
<header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
              <AlertTriangle size={24} className="text-purple-800" />
              <h1 className="text-xl font-bold text-purple-900">Crisis Classifier</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-800">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-800">How It Works</a>
              <a href="/Documentation" className="text-gray-700 hover:text-purple-800">Documentation</a>
            </nav>
          </div>
        </div>
      </header>
);

}

export default Header;