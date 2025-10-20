import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Simple footer with app name and version */
  return (
    <footer style={footerStyle} role="contentinfo">
      <div style={containerStyle}>
        <p style={textStyle}>Smart Gym Management & Fitness Tracker</p>
        <p style={versionStyle}>v1.0.0 | Mock Mode</p>
      </div>
    </footer>
  );
}

const footerStyle = {
  marginTop: 'auto',
  padding: '16px 24px',
  borderTop: '1px solid var(--border-color)',
  backgroundColor: 'var(--bg-secondary)',
  textAlign: 'center'
};

const containerStyle = {
  maxWidth: 1200,
  margin: '0 auto'
};

const textStyle = {
  margin: '4px 0',
  fontSize: 14,
  color: 'var(--text-primary)',
  opacity: 0.9
};

const versionStyle = {
  margin: '4px 0',
  fontSize: 12,
  color: 'var(--text-primary)',
  opacity: 0.6
};
