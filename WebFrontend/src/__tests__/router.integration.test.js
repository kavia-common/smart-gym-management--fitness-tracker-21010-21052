import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router, { RoutesOnly } from '../../src/routes/Router';
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
          <LoginSetter />
          <RoutesOnly />
        </MemoryRouter>
      </AuthProvider>
    </FeatureFlagsProvider>
  );
}

describe('Router integration', () => {
  test('Home renders on root', async () => {
    renderWithProviders(['/']);
    expect(await screen.findByText(/Smart Gym/i)).toBeInTheDocument();
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
    expect(await screen.findByText(/Login/i)).toBeInTheDocument();
  });

  test('/trainers accessible only by role=trainer', async () => {
    // As member: redirected away
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
    // Trainers page has heading "Trainer Panel"; as member it shouldn't appear, user lands on home
    expect(await screen.findByText(/Smart Gym/i)).toBeInTheDocument();

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
    expect(await screen.findByText(/Trainer Panel/i)).toBeInTheDocument();
  });
});
