import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';

// Helper component to set an authenticated user in context
function LoginSetter({ email = 'user@ex.com', role = 'member' }) {
  const { login } = useAuth();
  React.useEffect(() => {
    login({ email, password: 'x', role });
  }, [email, role, login]);
  return null;
}

function DummyPage({ text }) {
  return <div>{text}</div>;
}

describe('ProtectedRoute', () => {
  test('redirects unauthenticated user to /login', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
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

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  test('allows authenticated user to access protected page', async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/private']}>
          <LoginSetter email="member@ex.com" role="member" />
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
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
            <Route path="/" element={<div>Home</div>} />
            <Route
              path="/trainers"
              element={
                <ProtectedRoute requiredRole="trainer">
                  <DummyPage text="Trainer Panel" />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
    // Should land on Home instead of Trainer Panel
    expect(await screen.findByText(/Home/i)).toBeInTheDocument();

    // Now as trainer should access
    rerender(
      <AuthProvider>
        <MemoryRouter initialEntries={['/trainers']}>
          <LoginSetter email="trainer@ex.com" role="trainer" />
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route
              path="/trainers"
              element={
                <ProtectedRoute requiredRole="trainer">
                  <DummyPage text="Trainer Panel" />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(await screen.findByText(/Trainer Panel/i)).toBeInTheDocument();
  });
});
