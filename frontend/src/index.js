import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProgressesContextProvider } from './context/ProgressContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProgressesContextProvider>
        <App />
      </ProgressesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


