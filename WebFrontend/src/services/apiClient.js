import { mockApi } from './mockApi';

const USE_MOCK = String(process.env.REACT_APP_USE_MOCK_API || 'true') === 'true';
const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * Small helper to wrap any promise-returning call and normalize { data, error }.
 */
async function wrap(promise) {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (e) {
    const error = e?.message || 'Unknown error';
    return { data: null, error };
  }
}

/**
 * Perform a fetch request with JSON handling and unified error shape.
 */
async function request(method, path, body) {
  if (USE_MOCK) {
    // mock layer is handled in the high-level methods; this function is for real API only
    throw new Error('Mock layer in use');
  }
  const url = `${BASE_URL}${path}`;
  const init = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  };
  const res = await fetch(url, init);
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = (isJson && payload?.message) || res.statusText || 'Request failed';
    throw new Error(msg);
  }
  return payload;
}

// PUBLIC_INTERFACE
export const apiClient = {
  /** Core HTTP methods (real API only). Returns { data, error }. */
  // PUBLIC_INTERFACE
  async get(path) {
    return wrap(request('GET', path));
  },
  // PUBLIC_INTERFACE
  async post(path, body) {
    return wrap(request('POST', path, body));
  },
  // PUBLIC_INTERFACE
  async put(path, body) {
    return wrap(request('PUT', path, body));
  },
  // PUBLIC_INTERFACE
  async delete(path) {
    return wrap(request('DELETE', path));
  },

  /** Convenience domain methods that work with mock or real API uniformly. */

  /** Returns dashboard stats; uses mock when enabled */
  async getDashboardStats() {
    if (USE_MOCK) {
      const { data, error } = await wrap(mockApi.getDashboardStats());
      if (error) return {};
      return data;
    }
    const { data, error } = await this.get('/dashboard/stats');
    if (error) return { workoutsThisWeek: 0, streak: 0 };
    return data;
  },

  async getWorkouts() {
    if (USE_MOCK) {
      const { data } = await wrap(mockApi.getWorkouts());
      return data || [];
    }
    const { data, error } = await this.get('/workouts');
    return error ? [] : (data || []);
  },

  async addWorkout(workout) {
    if (USE_MOCK) {
      const { data } = await wrap(mockApi.addWorkout(workout));
      return data;
    }
    const { data } = await this.post('/workouts', workout);
    return data;
  },

  async getMembers() {
    if (USE_MOCK) {
      const { data } = await wrap(mockApi.getMembers());
      return data || [];
    }
    const { data, error } = await this.get('/members');
    return error ? [] : (data || []);
  },

  async getPlans() {
    if (USE_MOCK) {
      const { data } = await wrap(mockApi.getPlans());
      return data || [];
    }
    const { data, error } = await this.get('/plans');
    return error ? [] : (data || []);
  },

  async assignPlan(memberId, planId) {
    if (USE_MOCK) {
      const { data } = await wrap(mockApi.assignPlan(memberId, planId));
      return data;
    }
    const { data } = await this.post('/assignments', { memberId, planId });
    return data;
  },
};
