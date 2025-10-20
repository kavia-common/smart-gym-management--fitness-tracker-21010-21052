const KEY = 'smartgym_user';

// PUBLIC_INTERFACE
export function saveUser(user) {
  /** Persist user to localStorage for mock auth */
  try {
    localStorage.setItem(KEY, JSON.stringify(user));
  } catch (e) {
    // ignore
  }
}

// PUBLIC_INTERFACE
export function getUser() {
  /** Load user from localStorage */
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function clearUser() {
  /** Clear user from localStorage */
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
