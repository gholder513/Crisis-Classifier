import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProcessingPage from './pages/ProcessingPage';
import AboutPage from './pages/AboutPage';
import DocumentationPage from './pages/DocumentationPage';
import ContactPage from './pages/ContactPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/process" element={<ProcessingPage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Documentation" element={<DocumentationPage />} />
        <Route path="/Contact" element={<ContactPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;