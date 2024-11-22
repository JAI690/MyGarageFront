import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProviderWrapper } from './context/ThemeContext';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </AuthProvider>
  </React.StrictMode>,
);
