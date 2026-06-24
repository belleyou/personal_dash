import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Dynamically integrate Google Analytics tracking script if Measurement/Tracking ID is present
const GA_TRACKING_ID = (import.meta as any).env.VITE_GA_TRACKING_ID;

if (GA_TRACKING_ID) {
  // Inject the global site tag (gtag.js)
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Set up dataLayer and gtag function
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = function gtag() {
    (window as any).dataLayer.push(arguments);
  };
  
  (window as any).gtag('js', new Date());
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
    send_page_view: true
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

