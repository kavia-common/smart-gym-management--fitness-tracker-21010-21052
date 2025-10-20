import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoutesOnly } from '../../src/routes/Router';
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

test('renders home on root', async () => {
  renderWithProviders(['/']);
  expect(await screen.findByTestId('home-title')).toBeInTheDocument();
});

test('protected route redirects to login when unauthenticated', async () => {
  renderWithProviders(['/dashboard']);
  // wait for redirect to login and heading appears
  expect(await screen.findByTestId('login-heading')).toBeInTheDocument();
});
