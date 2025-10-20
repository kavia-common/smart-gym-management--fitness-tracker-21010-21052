import { saveUser, clearUser, getUser } from './storage';

// PUBLIC_INTERFACE
export function getInitialUser() {
  /** Load persisted user for session restore */
  return getUser();
}

// PUBLIC_INTERFACE
export async function mockLogin({ email, password, role = 'member' }) {
  /** Mock login: accepts any email/password, sets user with role */
  if (!email || !password) {
    throw new Error('Missing credentials');
  }
  const user = { id: 'u-' + Date.now(), email, role };
  saveUser(user);
  return user;
}

// PUBLIC_INTERFACE
export async function mockRegister({ email, password, role = 'member' }) {
  /** Mock register acts like login */
  return mockLogin({ email, password, role });
}

// PUBLIC_INTERFACE
export async function logoutUser() {
  /** Clear session */
  clearUser();
}
