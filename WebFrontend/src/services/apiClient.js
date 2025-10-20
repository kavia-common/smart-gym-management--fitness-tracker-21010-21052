import { mockApi } from './mockApi';

const USE_MOCK = String(process.env.REACT_APP_USE_MOCK_API || 'true') === 'true';

// PUBLIC_INTERFACE
export const apiClient = {
  /** Returns dashboard stats; uses mock when enabled */
  async getDashboardStats() {
    if (USE_MOCK) return mockApi.getDashboardStats();
    // Placeholder for real API call
    return { workoutsThisWeek: 0, streak: 0 };
  },
  async getWorkouts() {
    if (USE_MOCK) return mockApi.getWorkouts();
    return [];
  },
  async addWorkout(workout) {
    if (USE_MOCK) return mockApi.addWorkout(workout);
    return { ok: true };
  },
  async getMembers() {
    if (USE_MOCK) return mockApi.getMembers();
    return [];
  },
  async getPlans() {
    if (USE_MOCK) return mockApi.getPlans();
    return [];
  },
  async assignPlan(memberId, planId) {
    if (USE_MOCK) return mockApi.assignPlan(memberId, planId);
    return { ok: true };
  }
};
