import React, { createContext, useContext, useMemo } from 'react';

const FlagsCtx = createContext(null);

function envBool(name, def = false) {
  const v = process.env[`REACT_APP_FEATURE_${name}`];
  if (v === undefined) return def;
  return String(v).toLowerCase() === 'true';
}

// PUBLIC_INTERFACE
export function FeatureFlagsProvider({ children }) {
  /** Provide feature flags based on REACT_APP_FEATURE_* envs */
  const flags = useMemo(() => ({
    AI_RECS: envBool('AI_RECS', true),
    NOTIFICATIONS: envBool('NOTIFICATIONS', true),
  }), []);
  return <FlagsCtx.Provider value={{ flags }}>{children}</FlagsCtx.Provider>;
}

// PUBLIC_INTERFACE
export function useFeatureFlags() {
  /** Access feature flags */
  const ctx = useContext(FlagsCtx);
  if (!ctx) throw new Error('useFeatureFlags must be used within FeatureFlagsProvider');
  return ctx;
}
