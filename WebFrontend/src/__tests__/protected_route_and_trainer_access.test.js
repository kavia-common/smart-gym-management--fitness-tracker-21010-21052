import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';

// Helper component to set an authenticated user in context
function LoginSetter({ email = 'user@ex.com', role = 'member' }) {
  const { login } = useAuth();
  React.useEffect(() => {
    (async () => {
      await login({ email, password: 'x', role });
    })();
  }, [email, role, login]);
  return null;
}

function DummyPage({ text }) {
  return <div>{text}</div>;
}

describe('ProtectedRoute', () => {
  test('redirects unauthenticated user to /login', async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route path="/" element={<h1 data-testid="home-title">Smart Gym</h1>} />
            <Route path="/login" element={<h2 data-testid="login-heading">Login</h2>} />
            <Route
              path="/private"
              element={
                <ProtectedRoute>
                  <DummyPage text="Private Area" />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(await screen.findByTestId('login-heading')).toBeInTheDocument();
  });

  test('allows authenticated user to access protected page', async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/private']}>
          <LoginSetter email="member@ex.com" role="member" />
          <Routes>
            <Route path="/" element={<h1 data-testid="home-title">Smart Gym</h1>} />
            <Route path="/login" element={<h2 data-testid="login-heading">Login</h2>} />
            <Route
              path="/private"
              element={
                <ProtectedRoute>
                  <DummyPage text="Private Area" />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(await screen.findByText(/Private Area/i)).toBeInTheDocument();
  });

  test('trainer-only route denies member and allows trainer', async () => {
    // Member should be redirected (Navigate to /)
    const { rerender } = render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/trainers']}>
          <LoginSetter email="member@ex.com" role="member" />
          <Routes>
            <Route path="/" element={<h1 data-testid="home-title">Smart Gym</h1>} />
            <Route path="/login" element={<h2 data-testid="login-heading">Login</h2>} />
            <Route
              path="/trainers"
              element={
                <ProtectedRoute requiredRole="trainer">
                  <h2 data-testid="trainer-panel-heading">Trainer Panel</h2>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
    // Should land on Home instead of Trainer Panel
    expect(await screen.findByTestId('home-title')).toBeInTheDocument();

    // Now as trainer should access
    rerender(
      <AuthProvider>
        <MemoryRouter initialEntries={['/trainers']}>
          <LoginSetter email="trainer@ex.com" role="trainer" />
          <Routes>
            <Route path="/" element={<h1 data-testid="home-title">Smart Gym</h1>} />
            <Route path="/login" element={<h2 data-testid="login-heading">Login</h2>} />
            <Route
              path="/trainers"
              element={
                <ProtectedRoute requiredRole="trainer">
                  <h2 data-testid="trainer-panel-heading">Trainer Panel</h2>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(await screen.findByTestId('trainer-panel-heading')).toBeInTheDocument();
  });
});
