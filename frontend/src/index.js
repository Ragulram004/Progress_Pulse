import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProgressesContextProvider } from './context/ProgressContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProgressesContextProvider>
      <App />
    </ProgressesContextProvider>
  </React.StrictMode>
);


