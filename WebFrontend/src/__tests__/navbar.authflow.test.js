import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../src/components/Navbar';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';
import { FeatureFlagsProvider } from '../../src/context/FeatureFlagsContext';

function LoginSetter({ email = 'user@ex.com', role = 'member' }) {
  const { login } = useAuth();
  React.useEffect(() => {
    login({ email, password: 'x', role });
  }, [email, role, login]);
  return null;
}

describe('Navbar auth links', () => {
  test('shows login/register when logged out; shows logout when logged in', async () => {
    const { rerender } = render(
      <FeatureFlagsProvider>
        <AuthProvider>
          <MemoryRouter>
            <Navbar />
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
          <MemoryRouter>
            <LoginSetter />
            <Navbar />
          </MemoryRouter>
        </AuthProvider>
      </FeatureFlagsProvider>
    );

    expect(await screen.findByTestId('nav-logout')).toBeInTheDocument();

    // Click logout returns to showing Login link
    fireEvent.click(screen.getByTestId('nav-logout'));
    expect(await screen.findByTestId('nav-login')).toBeInTheDocument();
  });
});
