import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../../src/components/Navbar';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';
import { FeatureFlagsProvider } from '../../src/context/FeatureFlagsContext';
import { RoutesOnly } from '../../src/routes/Router';

function LoginSetter({ email = 'user@ex.com', role = 'member' }) {
  const { login } = useAuth();
  React.useEffect(() => {
    // Ensure async login completes before assertions that depend on it
    (async () => {
      await login({ email, password: 'x', role });
    })();
  }, [email, role, login]);
  return null;
}

describe('Navbar auth links', () => {
  test('shows login/register when logged out; shows logout when logged in', async () => {
    // Render with a complete route table so Links are valid and navigation effects run
    const { rerender } = render(
      <FeatureFlagsProvider>
        <AuthProvider>
          <MemoryRouter initialEntries={['/']}>
            <Navbar />
            {/* Provide routes to avoid missing route edge cases during navigation */}
            <Routes>
              <Route path="/*" element={<RoutesOnly />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>
      </FeatureFlagsProvider>
    );

    expect(screen.getByTestId('nav-login')).toBeInTheDocument();
    expect(screen.getByTestId('nav-register')).toBeInTheDocument();

    // Logged in state
    rerender(
      <FeatureFlagsProvider>
        <AuthProvider>
          <MemoryRouter initialEntries={['/']}>
            <LoginSetter />
            <Navbar />
            <Routes>
              <Route path="/*" element={<RoutesOnly />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>
      </FeatureFlagsProvider>
    );

    // Await for logout to appear after async login finishes and navbar reacts
    expect(await screen.findByTestId('nav-logout')).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByTestId('nav-logout'));

    // After logout, navbar should show login again (state update + re-render)
    await waitFor(() => {
      expect(screen.getByTestId('nav-login')).toBeInTheDocument();
    });
  });
});
