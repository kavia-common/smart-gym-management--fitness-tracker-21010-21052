import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Workouts from '../../src/pages/Workouts';
import { AuthProvider } from '../../src/context/AuthContext';
import { FeatureFlagsProvider } from '../../src/context/FeatureFlagsContext';

// Ensure mock mode env flags for this suite
process.env.REACT_APP_USE_MOCK_API = 'true';
process.env.REACT_APP_MOCK_API_DELAY_MS = '0';

function renderWithProviders() {
  return render(
    <FeatureFlagsProvider>
      <AuthProvider>
        <Workouts />
      </AuthProvider>
    </FeatureFlagsProvider>
  );
}

describe('Workouts page - mock API submission and refresh', () => {
  test('initial list loads and adding a workout updates the list', async () => {
    renderWithProviders();

    // Default mock entry "Treadmill" exists
    await waitFor(() => {
      expect(screen.getByText(/Treadmill/i)).toBeInTheDocument();
    });

    const notesInput = screen.getByPlaceholderText(/Notes/i);
    fireEvent.change(notesInput, { target: { value: 'Test note' } });

    fireEvent.click(screen.getByText(/Add Workout/i));

    await waitFor(() => {
      expect(screen.getByText(/Test note/i)).toBeInTheDocument();
    });
  });
});
