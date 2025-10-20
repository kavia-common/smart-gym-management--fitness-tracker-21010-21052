import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router, { RoutesOnly } from '../../src/routes/Router';
import { AuthProvider } from '../../src/context/AuthContext';
import { FeatureFlagsProvider } from '../../src/context/FeatureFlagsContext';

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

test('renders home on root', () => {
  renderWithProviders(['/']);
  expect(screen.getByText(/Smart Gym/i)).toBeInTheDocument();
});

test('protected route redirects to login when unauthenticated', () => {
  renderWithProviders(['/dashboard']);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
