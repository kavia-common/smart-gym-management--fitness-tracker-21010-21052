import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  
  return (
    <main role="main" data-testid="page-main" style={{ padding: 24, minHeight: 'calc(100vh - 200px)' }}>
      <h1 data-testid="home-title" style={{ fontSize: 36, marginBottom: 16 }}>
        Welcome to Smart Gym
      </h1>
      <p style={{ fontSize: 18, marginBottom: 24, maxWidth: 600 }}>
        Your comprehensive fitness tracking and gym management solution. 
        Track workouts, monitor progress, and achieve your fitness goals with AI-powered recommendations.
      </p>

      {!user ? (
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Get Started</h2>
          <p style={{ marginBottom: 16 }}>
            New to Smart Gym? Create an account or sign in to start tracking your fitness journey.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
            <Link data-testid="home-login-link" className="App-link" to="/login" style={buttonStyle}>
              Login
            </Link>
            <Link data-testid="home-register-link" className="App-link" to="/register" style={buttonStyle}>
              Register
            </Link>
          </div>
        </div>
      ) : (
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Welcome back, {user.email}!</h2>
          <p style={{ marginBottom: 16 }}>
            Ready to continue your fitness journey? Access your dashboard to view your progress.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
            <Link data-testid="home-dashboard-link" className="App-link" to="/dashboard" style={buttonStyle}>
              Go to Dashboard
            </Link>
          </div>
        </div>
      )}

      <div style={{ ...sectionStyle, marginTop: 40 }}>
        <h3 style={{ fontSize: 20, marginBottom: 12 }}>Features</h3>
        <ul style={{ textAlign: 'left', maxWidth: 600, lineHeight: 1.8 }}>
          <li>📊 Track workouts and monitor your progress</li>
          <li>🤖 AI-powered workout and diet recommendations</li>
          <li>👥 Connect with trainers for personalized plans</li>
          <li>📈 View detailed analytics and insights</li>
          <li>🔔 Get notifications for workout reminders</li>
        </ul>
      </div>

      <div style={{ ...sectionStyle, marginTop: 24, padding: 16, backgroundColor: 'var(--bg-secondary)', borderRadius: 8 }}>
        <p style={{ fontSize: 14, margin: 0 }}>
          💡 <strong>Preview Mode:</strong> This app is running in mock mode with sample data. 
          All features are fully functional for demo purposes.
        </p>
      </div>
    </main>
  );
}

const sectionStyle = {
  marginTop: 24,
  padding: 20,
  borderRadius: 8,
  border: '1px solid var(--border-color)'
};

const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  borderRadius: 6,
  textDecoration: 'none',
  fontWeight: 600
};
