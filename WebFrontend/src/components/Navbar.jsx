import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar" style={navStyle} role="navigation" aria-label="Main navigation">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link data-testid="nav-home" to="/" className="App-link" style={{ fontWeight: 700 }}>Smart Gym</Link>
        {user && (
          <>
            <Link data-testid="nav-dashboard" to="/dashboard" className="App-link">Dashboard</Link>
            <Link data-testid="nav-workouts" to="/workouts" className="App-link">Workouts</Link>
            <Link data-testid="nav-profile" to="/profile" className="App-link">Profile</Link>
            {user.role === 'trainer' && (
              <Link data-testid="nav-trainers" to="/trainers" className="App-link">Trainers</Link>
            )}
          </>
        )}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {user && <NotificationBell />}
        {user ? (
          <>
            <span style={{ fontSize: 12, opacity: 0.8 }}>{user.email} ({user.role})</span>
            <button data-testid="nav-logout" onClick={logout} style={logoutBtnStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link data-testid="nav-login" to="/login" className="App-link">Login</Link>
            <Link data-testid="nav-register" to="/register" className="App-link">Register</Link>
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

const logoutBtnStyle = {
  padding: '6px 12px',
  borderRadius: 6,
  border: '1px solid var(--border-color)',
  backgroundColor: 'var(--bg-secondary)',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  fontSize: 14
};
