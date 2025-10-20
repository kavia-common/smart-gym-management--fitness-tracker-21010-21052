import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main style={{ padding: 24 }}>
      <h2>404 - Not Found</h2>
      <p>Go back <Link to="/">home</Link>.</p>
    </main>
  );
}
