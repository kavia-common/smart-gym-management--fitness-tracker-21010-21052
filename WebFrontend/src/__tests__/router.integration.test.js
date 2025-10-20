import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoutesOnly } from '../../src/routes/Router';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';
import { FeatureFlagsProvider } from '../../src/context/FeatureFlagsContext';

// Authenticate helper
function LoginSetter({ email = 'member@ex.com', role = 'member' }) {
  const { login } = useAuth();
  React.useEffect(() => {
    login({ email, password: 'x', role });
  }, [email, role, login]);
  return null;
}

function renderWithProviders(initialEntries = ['/']) {
  return render(
    <FeatureFlagsProvider>
      <AuthProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <RoutesOnly />
        </MemoryRouter>
      </AuthProvider>
    </FeatureFlagsProvider>
  );
}

describe('Router integration', () => {
  test('Home renders on root', async () => {
    renderWithProviders(['/']);
    expect(await screen.findByTestId('home-title')).toBeInTheDocument();
  });

  test('Protected /dashboard redirects to login when unauthenticated', async () => {
    render(
      <FeatureFlagsProvider>
        <AuthProvider>
          <MemoryRouter initialEntries={['/dashboard']}>
            <RoutesOnly />
          </MemoryRouter>
        </AuthProvider>
      </FeatureFlagsProvider>
    );
    expect(await screen.findByTestId('login-heading')).toBeInTheDocument();
  });

  test('/trainers accessible only by role=trainer', async () => {
    // As member: redirected away to home
    render(
      <FeatureFlagsProvider>
        <AuthProvider>
          <MemoryRouter initialEntries={['/trainers']}>
            <LoginSetter role="member" />
            <RoutesOnly />
          </MemoryRouter>
        </AuthProvider>
      </FeatureFlagsProvider>
    );
    expect(await screen.findByTestId('home-title')).toBeInTheDocument();

    // As trainer
    render(
      <FeatureFlagsProvider>
        <AuthProvider>
          <MemoryRouter initialEntries={['/trainers']}>
            <LoginSetter role="trainer" />
            <RoutesOnly />
          </MemoryRouter>
        </AuthProvider>
      </FeatureFlagsProvider>
    );
    expect(await screen.findByTestId('trainer-panel-heading')).toBeInTheDocument();
  });
});
