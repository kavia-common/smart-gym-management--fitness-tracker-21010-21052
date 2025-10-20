import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FeatureFlagsProvider } from '../../src/context/FeatureFlagsContext';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';
import { RoutesOnly } from '../../src/routes/Router';

// Helper to set logged-in user so dashboard renders
function LoginSetter({ role = 'member' }) {
  const { login } = useAuth();
  React.useEffect(() => {
    login({ email: 'user@ex.com', password: 'x', role });
  }, [role, login]);
  return null;
}

function renderDashWithFlags() {
  return render(
    <FeatureFlagsProvider>
      <AuthProvider>
        <MemoryRouter initialEntries={['/dashboard']}>
          <LoginSetter />
          <RoutesOnly />
        </MemoryRouter>
      </AuthProvider>
    </FeatureFlagsProvider>
  );
}

describe('Feature flags - AI recommendations', () => {
  test('AI recommendations shown when REACT_APP_FEATURE_AI_RECS=true', async () => {
    process.env.REACT_APP_FEATURE_AI_RECS = 'true';
    renderDashWithFlags();

    // Await authenticated cue or dashboard heading
    // We expect the dashboard heading to appear when ProtectedRoute passes
    const heading = await screen.findByTestId('dashboard-heading');
    expect(heading).toBeInTheDocument();

    // Feature section should appear
    await waitFor(() => {
      expect(screen.getByTestId('ai-recs-section')).toBeInTheDocument();
    });
  });

  test('AI recommendations hidden when REACT_APP_FEATURE_AI_RECS=false', async () => {
    process.env.REACT_APP_FEATURE_AI_RECS = 'false';
    renderDashWithFlags();

    const heading = await screen.findByTestId('dashboard-heading');
    expect(heading).toBeInTheDocument();

    // Should be hidden
    await waitFor(() => {
      expect(screen.queryByTestId('ai-recs-section')).not.toBeInTheDocument();
    });
  });
});
