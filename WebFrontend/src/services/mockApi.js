const delay = Number(process.env.REACT_APP_MOCK_API_DELAY_MS || 300);

let workouts = [
  { id: 'w1', date: '2024-10-01', type: 'Cardio', duration: 30, notes: 'Treadmill' },
];

let members = [
  { id: 'm1', name: 'Alice Member', email: 'alice@example.com' },
  { id: 'm2', name: 'Bob Member', email: 'bob@example.com' },
];

let plans = [
  { id: 'p1', name: 'Beginner Plan' },
  { id: 'p2', name: 'Strength Advanced' },
];

function wait(ms = delay) {
  return new Promise(res => setTimeout(res, ms));
}

// PUBLIC_INTERFACE
export const mockApi = {
  /** Dashboard stats mock */
  async getDashboardStats() {
    await wait();
    return { workoutsThisWeek: workouts.length, streak: 3 };
  },
  /** Workouts */
  async getWorkouts() {
    await wait();
    return [...workouts];
  },
  async addWorkout(workout) {
    await wait();
    const item = { id: `w${Date.now()}`, ...workout };
    workouts = [item, ...workouts];
    return item;
  },
  /** Trainer data */
  async getMembers() {
    await wait();
    return [...members];
  },
  async getPlans() {
    await wait();
    return [...plans];
  },
  async assignPlan(memberId, planId) {
    await wait();
    return { ok: true, memberId, planId };
  }
};
