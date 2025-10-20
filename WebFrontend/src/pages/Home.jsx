import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Smart Gym</h1>
      <p>Welcome to the Smart Gym Management & Fitness Tracker.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <Link className="App-link" to="/login">Login</Link>
        <Link className="App-link" to="/register">Register</Link>
        <Link className="App-link" to="/dashboard">Dashboard</Link>
      </div>
    </main>
  );
}
