import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main role="main" data-testid="page-main" style={{ padding: 24 }}>
      <h1 data-testid="home-title">Smart Gym</h1>
      <p>Welcome to the Smart Gym Management & Fitness Tracker.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <Link data-testid="home-login-link" className="App-link" to="/login">Login</Link>
        <Link data-testid="home-register-link" className="App-link" to="/register">Register</Link>
        <Link data-testid="home-dashboard-link" className="App-link" to="/dashboard">Dashboard</Link>
      </div>
    </main>
  );
}
