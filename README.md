<<<<<<< SEARCH
# smart-gym-management--fitness-tracker-21010-21052

This workspace hosts the WebFrontend app (port 3000). The AdminPanel app (port 3001) resides in sibling workspace smart-gym-management--fitness-tracker-21010-21053.

- WebFrontend env: REACT_APP_API_BASE_URL, REACT_APP_USE_MOCK_API, REACT_APP_FEATURE_* flags
- AdminPanel env: REACT_APP_ADMIN_API_BASE_URL, REACT_APP_USE_MOCK_API, REACT_APP_FEATURE_* flags

Mock vs Real API:
- Toggle via REACT_APP_USE_MOCK_API=true|false in each app's .env
- Mock APIs share the same response contracts and error shape normalization.
=======
# Smart Gym Management & Fitness Tracker

Complete fitness tracking and gym management solution with separate user and admin interfaces.

## 🚀 Quick Preview (No Setup Required!)

Both apps run in **mock mode** by default - fully functional with sample data, no backend needed.

### WebFrontend (Port 3000) - User Interface

**For gym members and trainers**

```bash
cd WebFrontend
npm install
npm start
```

🔗 Opens at: http://localhost:3000

**Quick Navigation:**
- Home → Login (any email/password) → Dashboard
- View workouts, track progress, get AI recommendations
- Trainer role: Access trainer panel for member management

📖 [Detailed Preview Guide](./WebFrontend/PREVIEW.md)

---

### AdminPanel (Port 3001) - Admin Interface

**For system administrators**

```bash
cd ../smart-gym-management--fitness-tracker-21010-21053/AdminPanel
npm install
npm start
```

🔗 Opens at: http://localhost:3001

**Quick Navigation:**
- Login (any email/password) → Select role → Dashboard
- Different roles see different features (superadmin, admin, trainer_manager, etc.)
- Manage users, trainers, content, settings, and view audits

📖 [Detailed Preview Guide](../smart-gym-management--fitness-tracker-21010-21053/AdminPanel/PREVIEW.md)

---

## 🎯 What You Can Do

### WebFrontend Features
- ✅ User authentication (mock mode)
- ✅ Dashboard with workout stats
- ✅ Log and track workouts
- ✅ AI-powered recommendations
- ✅ Trainer assignment (trainer role)
- ✅ Profile management
- ✅ Notifications
- ✅ Light/Dark theme toggle

### AdminPanel Features
- ✅ Role-based access control (5 role types)
- ✅ User management
- ✅ Trainer management
- ✅ Content management (workout plans)
- ✅ System settings (superadmin)
- ✅ Audit logs (auditor/superadmin)
- ✅ Dashboard with system metrics

## 🧪 Mock Mode (Default Configuration)

Both apps use in-memory mock data:

**WebFrontend:**
- 5 sample workouts with recent dates
- 4 member profiles
- 4 workout plans
- Dashboard stats: 5 workouts/week, 5-day streak

**AdminPanel:**
- 156 total users
- 12 active trainers
- 47 workouts today
- Recent activity log

**Environment Variables:**
- `REACT_APP_USE_MOCK_API=true` (default)
- No backend or Supabase required
- All features fully functional

## 🔧 Configuration

Both apps have `.env.example` files. Copy to `.env` to customize:

```bash
# WebFrontend
cd WebFrontend
cp .env.example .env

# AdminPanel  
cd ../smart-gym-management--fitness-tracker-21010-21053/AdminPanel
cp .env.example .env
```

**Key Settings:**
- `REACT_APP_USE_MOCK_API=true|false` - Toggle mock/real API
- `REACT_APP_FEATURE_AI_RECS=true|false` - AI recommendations
- `REACT_APP_FEATURE_NOTIFICATIONS=true|false` - Notification bell
- Mock API controls: delay, error simulation

## 📦 Build for Production

```bash
# WebFrontend
cd WebFrontend
npm run build

# AdminPanel
cd ../smart-gym-management--fitness-tracker-21010-21053/AdminPanel
npm run build
```

Both apps build successfully with optimized production bundles.

## 🧪 Run Tests

```bash
# WebFrontend
cd WebFrontend
npm test

# AdminPanel
cd ../smart-gym-management--fitness-tracker-21010-21053/AdminPanel
npm test
```

## 🎨 User Experience Highlights

### WebFrontend
- Clean, modern UI with responsive design
- Intuitive navigation flow: Home → Login → Dashboard
- Real-time workout logging with immediate feedback
- AI recommendations prominently displayed
- Role-aware navigation (trainer-specific features)
- Persistent authentication (localStorage)

### AdminPanel
- Professional admin layout with sidebar navigation
- Role-based menu filtering (automatic based on permissions)
- System metrics dashboard with quick actions
- Clear visual hierarchy for different admin tasks
- Comprehensive user/trainer management interfaces

## 🔐 Authentication (Mock Mode)

**WebFrontend:**
- Any email/password combination works
- Select role: Member or Trainer
- Session persists in localStorage

**AdminPanel:**
- Any email/password combination works
- Select role: superadmin, admin, trainer_manager, content_admin, or auditor
- Different roles unlock different features
- Session persists in localStorage

## 📝 Notes

- **No Backend Required**: Both apps are fully functional in mock mode
- **No Supabase Required**: Apps handle missing Supabase configuration gracefully
- **Shared Design System**: Consistent theming and styling across apps
- **Feature Flags**: Easy toggle for experimental features
- **Preview Ready**: Immediately clickable and explorable

## 🚦 Getting Started (First Time)

1. **Install WebFrontend dependencies:**
   ```bash
   cd WebFrontend
   npm install
   ```

2. **Start WebFrontend:**
   ```bash
   npm start
   ```
   Opens at http://localhost:3000

3. **In a new terminal, install AdminPanel dependencies:**
   ```bash
   cd ../smart-gym-management--fitness-tracker-21010-21053/AdminPanel
   npm install
   ```

4. **Start AdminPanel:**
   ```bash
   npm start
   ```
   Opens at http://localhost:3001

5. **Explore both apps:**
   - WebFrontend: Try Home → Login → Dashboard flow
   - AdminPanel: Try Login with different roles to see access control

Enjoy exploring Smart Gym! 🏋️‍♂️
>>>>>>> REPLACE
