import React from 'react';
import { render } from '@testing-library/react';
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
    const { findByTestId, queryByTestId } = renderDashWithFlags();

    // Wait for dashboard heading
    expect(await findByTestId('dashboard-heading')).toBeInTheDocument();

    // Feature section should appear
    expect(queryByTestId('ai-recs-section')).toBeInTheDocument();
  });

  test('AI recommendations hidden when REACT_APP_FEATURE_AI_RECS=false', async () => {
    process.env.REACT_APP_FEATURE_AI_RECS = 'false';
    const { findByTestId, queryByTestId } = renderDashWithFlags();

    expect(await findByTestId('dashboard-heading')).toBeInTheDocument();
    // Should be hidden
    expect(queryByTestId('ai-recs-section')).not.toBeInTheDocument();
  });
});
