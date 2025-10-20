import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <main style={{ padding: 24 }}>
      <h2>Profile</h2>
      <pre style={{ textAlign: 'left', background: 'var(--bg-secondary)', padding: 12, borderRadius: 8 }}>
        {JSON.stringify(user, null, 2)}
      </pre>
    </main>
  );
}
