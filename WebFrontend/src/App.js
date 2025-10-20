import React, { useState, useEffect } from 'react';
import './App.css';
import Router from './routes/Router';
import { AuthProvider } from './context/AuthContext';
import { FeatureFlagsProvider } from './context/FeatureFlagsContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <FeatureFlagsProvider>
        <AuthProvider>
          <Navbar />
          <Router />
          <Footer />
        </AuthProvider>
      </FeatureFlagsProvider>
    </div>
  );
}

export default App;
