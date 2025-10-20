# Smart Gym WebFrontend - Preview Guide

## 🚀 Quick Start (Mock Mode)

This app is ready to preview immediately with no backend setup required!

### 1. Start the Application

```bash
npm install
npm start
```

The app will open at http://localhost:3000

### 2. Navigate the Preview

#### **Home Page (Landing)**
- Welcome message and feature overview
- Clear call-to-action buttons for Login/Register
- Feature list and preview mode indicator

#### **Login Flow**
1. Click "Login" from home or navbar
2. Use any credentials (e.g., `user@example.com` / `password`)
3. Select a role:
   - **Member**: Access workouts, dashboard, and profile
   - **Trainer**: Additional access to trainer panel for managing members

#### **Main Features**

**Dashboard** (`/dashboard`)
- View workout statistics (5 workouts this week, 5-day streak)
- Recent workouts list with details
- AI recommendations section (feature flag enabled)
- Quick action buttons

**Workouts** (`/workouts`)
- Log new workouts with type, duration, and notes
- View workout history (5 sample workouts included)
- Real-time list updates after adding workouts

**Profile** (`/profile`)
- View user information
- Email, role, and session details

**Trainers** (`/trainers`) - *Trainer role only*
- Assign workout plans to members
- View member list (4 sample members)
- Manage workout plans (4 sample plans)

### 3. Navigation

The **Navbar** provides:
- Smart Gym home link
- Dashboard, Workouts, Profile (when logged in)
- Trainers (trainer role only)
- Notifications bell (feature flag enabled)
- User info and Logout button

The **Footer** displays:
- App name and version
- Mock mode indicator

### 4. Mock Data

The app includes realistic sample data:
- 5 pre-loaded workouts with recent dates
- 4 member profiles
- 4 workout plans
- Dashboard statistics

All data is stored in memory and persists during the session.

### 5. Feature Flags (Enabled by Default)

- ✅ AI Recommendations (`REACT_APP_FEATURE_AI_RECS=true`)
- ✅ Notifications (`REACT_APP_FEATURE_NOTIFICATIONS=true`)
- ❌ Realtime (`REACT_APP_FEATURE_REALTIME=false`)
- ❌ Audit Hooks (`REACT_APP_FEATURE_AUDIT_HOOKS=false`)

### 6. No Supabase Required

The app gracefully handles missing Supabase configuration. All features work in mock mode without any external dependencies.

## 🎨 Themes

Toggle between Light and Dark themes using the theme button in the top-right corner.

## ✨ Try These Flows

1. **New User Journey**: Home → Register → Dashboard → Log Workout
2. **Returning User**: Login → Dashboard → View Recent Workouts
3. **Trainer Experience**: Login as Trainer → Trainers → Assign Plan
4. **Profile Management**: Dashboard → Profile → View Info

Enjoy exploring Smart Gym! 🏋️‍♂️
