import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';

function wrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

test('mock login sets user', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper });
  await act(async () => {
    await result.current.login({ email: 't@e.com', password: 'x', role: 'member' });
  });
  expect(result.current.user).toBeTruthy();
  expect(result.current.user.role).toBe('member');
});
