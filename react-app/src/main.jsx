import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// Experiment 8: BrowserRouter turns the URL (/react-app/, /react-app/stations ...) into the view shown by <Routes>.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/react-app">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
