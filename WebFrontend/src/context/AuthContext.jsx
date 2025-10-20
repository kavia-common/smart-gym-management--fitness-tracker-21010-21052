import React, { createContext, useContext, useMemo, useState } from 'react';
import { getInitialUser, mockLogin, mockRegister, logoutUser } from '../services/auth';

const AuthCtx = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides mock authentication state and actions */
  const [user, setUser] = useState(getInitialUser());

  const value = useMemo(() => ({
    user,
    // PUBLIC_INTERFACE
    async login({ email, password, role }) {
      const u = await mockLogin({ email, password, role });
      setUser(u);
      return u;
    },
    // PUBLIC_INTERFACE
    async register({ email, password, role }) {
      const u = await mockRegister({ email, password, role });
      setUser(u);
      return u;
    },
    // PUBLIC_INTERFACE
    logout() {
      logoutUser();
      setUser(null);
    }
  }), [user]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access auth context */
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
