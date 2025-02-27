import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProcessingPage from './pages/ProcessingPage';
import AboutPage from './pages/AboutPage';
import DocuementationPage from './pages/DocumentationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/process" element={<ProcessingPage />} />
      <Route path="/About" element={<AboutPage />} />
      <Route path="/Documentation" element={<DocuementationPage/>} />
    </Routes>
  );
}

export default App;