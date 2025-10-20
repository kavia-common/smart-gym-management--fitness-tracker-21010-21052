import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';

// Utility to wrap with provider
function wrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe('AuthContext - mock mode auth flows', () => {
  beforeEach(() => {
    // Ensure clean localStorage for each test
    localStorage.clear();
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'removeItem');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('login sets user and persists to localStorage', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await result.current.login({ email: 'member@ex.com', password: 'x', role: 'member' });
    });
    expect(result.current.user).toBeTruthy();
    expect(result.current.user.email).toBe('member@ex.com');
    expect(result.current.user.role).toBe('member');
    // persistence called
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('logout clears user and localStorage', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await result.current.login({ email: 'member@ex.com', password: 'x', role: 'member' });
    });
    expect(result.current.user).not.toBeNull();

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalled();
  });

  test('initial state restores user from localStorage if present', async () => {
    // Simulate saved user
    const stored = { id: 'u-1', email: 'persist@ex.com', role: 'trainer' };
    localStorage.setItem('smartgym_user', JSON.stringify(stored));

    const { result } = renderHook(() => useAuth(), { wrapper });
    // Immediately available from getInitialUser
    expect(result.current.user).toEqual(stored);
    expect(localStorage.getItem).toHaveBeenCalledWith('smartgym_user');
  });
});
