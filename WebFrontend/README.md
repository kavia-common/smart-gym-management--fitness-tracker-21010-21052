# WebFrontend - Smart Gym

This React app provides the member/trainer UI: auth (mock), workout logging, trainer assignment UI, feature flags, and Supabase placeholders.

## Quick Preview

The app runs in **mock mode** by default - no backend or Supabase required!

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the dev server (port 3000):**
   ```bash
   npm start
   ```

3. **Navigate the app:**
   - **Home** → See welcome page with feature overview
   - **Login** → Use any email/password (e.g., user@example.com / password)
   - **Select Role** → Choose "Member" or "Trainer" to see different features
   - **Dashboard** → View workout stats, AI recommendations, and quick actions
   - **Workouts** → Log new workouts and see your history
   - **Trainers** → (Trainer role only) Assign workout plans to members

Port: 3000

## Mock Mode (Default)

The app uses in-memory mock data by default. All features work without any backend:
- ✅ Login/Register (any credentials work)
- ✅ Dashboard with stats and AI recommendations
- ✅ Workout logging and tracking
- ✅ Trainer assignment features
- ✅ Feature flags enabled (AI recs, notifications)

To toggle mock mode, see `.env.example` and adjust `REACT_APP_USE_MOCK_API`.

## Environment (.env.example keys)
- REACT_APP_API_BASE_URL=https://your-backend.example.com
- REACT_APP_USE_MOCK_API=true
- REACT_APP_FEATURE_AI_RECS=true
- REACT_APP_FEATURE_NOTIFICATIONS=true
- REACT_APP_FEATURE_REALTIME=false
- REACT_APP_FEATURE_AUDIT_HOOKS=false
- REACT_APP_MOCK_API_DELAY_MS=300
- REACT_APP_MOCK_API_ERROR=false
- REACT_APP_SUPABASE_URL=
- REACT_APP_SUPABASE_ANON_KEY=

## API client
- Core methods available: { get, post, put, delete } returning a normalized shape { data, error }.
- Domain helpers (getWorkouts, addWorkout, etc.) use the same normalized error handling internally.
- Toggle between Mock vs Real API via REACT_APP_USE_MOCK_API:
  - true: uses in-memory mockApi with optional delay/error simulation.
  - false: uses fetch against REACT_APP_API_BASE_URL.

## Feature Flags (REACT_APP_*)
- REACT_APP_FEATURE_AI_RECS=true: Show AI recommendations on Dashboard.
- REACT_APP_FEATURE_NOTIFICATIONS=true: Show NotificationBell.
- REACT_APP_FEATURE_REALTIME=false: Enable Supabase realtime subscription helpers.
- REACT_APP_FEATURE_AUDIT_HOOKS=false: Reserved for admin/audit UX toggles.

## Supabase
If REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are not provided, the app will no-op and won't crash. Realtime helper returns a no-op unsubscribe function.

## Routes
- /            Home
- /login       Login
- /register    Register
- /dashboard   Protected
- /profile     Protected
- /workouts    Protected
- /trainers    Protected + role=trainer

## Auth (Mock)
Login/Register forms accept any credentials. Role selection controls access to /trainers.

## Tests
Basic smoke tests for auth/context, routing, and workout mock flow:
  npm test
