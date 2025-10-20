# WebFrontend - Smart Gym

This React app provides the member/trainer UI: auth (mock), workout logging, trainer assignment UI, feature flags, and Supabase placeholders.

## Run

- Copy `.env.example` to `.env` and adjust as needed. Defaults are safe.
- Install dependencies:
  npm install
- Start dev server (port 3000):
  npm start

Port: 3000

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
