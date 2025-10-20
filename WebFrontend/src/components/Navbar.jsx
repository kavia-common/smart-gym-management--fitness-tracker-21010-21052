import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar" style={navStyle}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/" className="App-link">Smart Gym</Link>
        <Link to="/dashboard" className="App-link">Dashboard</Link>
        <Link to="/workouts" className="App-link">Workouts</Link>
        <Link to="/profile" className="App-link">Profile</Link>
        <Link to="/trainers" className="App-link">Trainers</Link>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <NotificationBell />
        {user ? (
          <>
            <span style={{ fontSize: 12, opacity: 0.8 }}>{user.email} ({user.role})</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="App-link">Login</Link>
            <Link to="/register" className="App-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  padding: '12px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid var(--border-color)'
};
