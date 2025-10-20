# WebFrontend - Smart Gym

This React app provides the member/trainer UI: auth (mock), workout logging, trainer assignment UI, feature flags, and Supabase placeholders.

## Run

- Copy `.env.example` to `.env` and adjust as needed. Defaults are safe.
- Install dependencies:
  npm install
- Start dev server (port 3000):
  npm start

## Feature Flags (REACT_APP_*)
- REACT_APP_FEATURE_AI_RECS=true: Show AI recommendations on Dashboard.
- REACT_APP_FEATURE_NOTIFICATIONS=true: Show NotificationBell.
- REACT_APP_USE_MOCK_API=true: Use mock API for data flows (default true).

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
