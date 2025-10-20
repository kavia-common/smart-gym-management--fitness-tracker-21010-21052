const delay = Number(process.env.REACT_APP_MOCK_API_DELAY_MS || 300);
const SHOULD_ERROR = String(process.env.REACT_APP_MOCK_API_ERROR || 'false').toLowerCase() === 'true';

let workouts = [
  { id: 'w1', date: '2024-12-20', type: 'Cardio', duration: 30, notes: 'Morning treadmill run - felt great!' },
  { id: 'w2', date: '2024-12-19', type: 'Strength', duration: 45, notes: 'Upper body workout with weights' },
  { id: 'w3', date: '2024-12-18', type: 'Yoga', duration: 60, notes: 'Evening relaxation session' },
  { id: 'w4', date: '2024-12-17', type: 'HIIT', duration: 25, notes: 'High intensity interval training' },
  { id: 'w5', date: '2024-12-16', type: 'Cardio', duration: 40, notes: 'Cycling session at moderate pace' },
];

let members = [
  { id: 'm1', name: 'Alice Member', email: 'alice@example.com' },
  { id: 'm2', name: 'Bob Member', email: 'bob@example.com' },
  { id: 'm3', name: 'Charlie Fitness', email: 'charlie@example.com' },
  { id: 'm4', name: 'Diana Strong', email: 'diana@example.com' },
];

let plans = [
  { id: 'p1', name: 'Beginner Plan - 4 Week Foundation' },
  { id: 'p2', name: 'Strength Advanced - Muscle Building' },
  { id: 'p3', name: 'Weight Loss - Cardio Focus' },
  { id: 'p4', name: 'Endurance Training - Marathon Prep' },
];

function wait(ms = delay) {
  return new Promise(res => setTimeout(res, ms));
}

function maybeThrow() {
  if (SHOULD_ERROR) {
    throw new Error('Mock API error (simulated)');
  }
}

// PUBLIC_INTERFACE
export const mockApi = {
  /** Dashboard stats mock */
  async getDashboardStats() {
    await wait();
    maybeThrow();
    return { workoutsThisWeek: 5, streak: 5 };
  },
  /** Workouts */
  async getWorkouts() {
    await wait();
    maybeThrow();
    return [...workouts];
  },
  async addWorkout(workout) {
    await wait();
    maybeThrow();
    const item = { id: `w${Date.now()}`, ...workout };
    workouts = [item, ...workouts];
    return item;
  },
  /** Trainer data */
  async getMembers() {
    await wait();
    maybeThrow();
    return [...members];
  },
  async getPlans() {
    await wait();
    maybeThrow();
    return [...plans];
  },
  async assignPlan(memberId, planId) {
    await wait();
    maybeThrow();
    return { ok: true, memberId, planId };
  }
};
