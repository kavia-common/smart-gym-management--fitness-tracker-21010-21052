import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Workouts from '../pages/Workouts';
import Trainers from '../pages/Trainers';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

/**
 * PUBLIC_INTERFACE
 */
// PUBLIC_INTERFACE
export function RoutesOnly() {
  /** Renders only the <Routes> with all route elements for testability */
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workouts"
        element={
          <ProtectedRoute>
            <Workouts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trainers"
        element={
          <ProtectedRoute requiredRole="trainer">
            <Trainers />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/** Router config for the app (default export) */
export default function Router() {
  /** Wraps RoutesOnly in a BrowserRouter for runtime usage */
  return (
    <BrowserRouter>
      <RoutesOnly />
    </BrowserRouter>
  );
}
