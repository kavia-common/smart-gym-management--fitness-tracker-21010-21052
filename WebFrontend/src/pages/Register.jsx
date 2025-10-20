import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('newuser@example.com');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register({ email, password, role });
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main role="main" data-testid="page-main" style={{ padding: 24 }}>
      <h2 data-testid="register-heading">Register</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>
        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="member">Member</option>
            <option value="trainer">Trainer</option>
          </select>
        </label>
        <button disabled={loading} type="submit">{loading ? 'Creating...' : 'Register'}</button>
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
      </form>
      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}
