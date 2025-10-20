import React, { useEffect, useState } from 'react';
import { useFeatureFlags } from '../context/FeatureFlagsContext';

export default function NotificationBell() {
  const { flags } = useFeatureFlags();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!flags.NOTIFICATIONS) return;
    const id = setInterval(() => setCount(c => (c + 1) % 5), 4000);
    return () => clearInterval(id);
  }, [flags.NOTIFICATIONS]);

  if (!flags.NOTIFICATIONS) return null;

  return (
    <button aria-label="Notifications" title="Notifications" style={btnStyle}>
      🔔{count ? <span style={badgeStyle}>{count}</span> : null}
    </button>
  );
}

const btnStyle = {
  position: 'relative',
  background: 'transparent',
  border: '1px solid var(--border-color)',
  borderRadius: 6,
  padding: '6px 10px',
  cursor: 'pointer'
};

const badgeStyle = {
  position: 'absolute',
  top: -6,
  right: -6,
  background: '#e53935',
  color: '#fff',
  fontSize: 10,
  borderRadius: '50%',
  width: 16,
  height: 16,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
};
