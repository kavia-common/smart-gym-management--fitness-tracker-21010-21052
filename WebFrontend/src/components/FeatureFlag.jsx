import React from 'react';
import { useFeatureFlags } from '../context/FeatureFlagsContext';

// PUBLIC_INTERFACE
export default function FeatureFlag({ name, children }) {
  /** Conditionally render children based on feature flag name */
  const { flags } = useFeatureFlags();
  if (!flags[name]) return null;
  return <>{children}</>;
}
