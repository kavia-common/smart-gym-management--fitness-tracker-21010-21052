import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Workouts from '../../src/pages/Workouts';
import { AuthProvider } from '../../src/context/AuthContext';
import { FeatureFlagsProvider } from '../../src/context/FeatureFlagsContext';

function renderP() {
  return render(
    <FeatureFlagsProvider>
      <AuthProvider>
        <Workouts />
      </AuthProvider>
    </FeatureFlagsProvider>
  );
}

test('renders workouts list and allows adding', async () => {
  renderP();
  // initial item
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
