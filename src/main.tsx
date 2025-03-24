import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="996995204555-aon7sl961sv19nou0clcm7n6vrsbhahj.apps.googleusercontent.com"> {/* 996995204555-aon7sl961sv19nou0clcm7n6vrsbhahj.apps.googleusercontent.com */}
       
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);