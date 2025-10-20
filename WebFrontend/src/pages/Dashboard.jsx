import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFeatureFlags } from '../context/FeatureFlagsContext';
import { apiClient } from '../services/apiClient';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { flags } = useFeatureFlags();
  const [stats, setStats] = useState({ workoutsThisWeek: 0, streak: 0 });
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [aiRecs, setAiRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await apiClient.getDashboardStats();
      const workouts = await apiClient.getWorkouts();
      
      if (mounted) {
        setStats(data);
        setRecentWorkouts(workouts.slice(0, 3));
        
        if (flags.AI_RECS) {
          setAiRecs([
            'Try a 20-minute HIIT session today for maximum calorie burn.',
            'Increase daily protein intake by 10g to support muscle recovery.',
            'Water reminder: Drink 2 more glasses by evening to stay hydrated.',
            'Consider adding yoga on rest days for flexibility and recovery.'
          ]);
        }
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [flags.AI_RECS]);

  if (loading) {
    return (
      <main role="main" data-testid="page-main" style={{ padding: 24 }}>
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main role="main" data-testid="page-main" style={{ padding: 24, minHeight: 'calc(100vh - 200px)' }}>
      <h2 data-testid="dashboard-heading" style={{ fontSize: 32, marginBottom: 8 }}>
        Welcome to Smart Gym
      </h2>
      <p style={{ fontSize: 16, opacity: 0.8, marginBottom: 24 }}>
        Hello, {user?.email}! Here's your fitness overview.
      </p>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        <div style={cardStyle}>
          <strong style={{ fontSize: 14, display: 'block', marginBottom: 8 }}>Workouts this week</strong>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: 'var(--text-secondary)' }}>
            {stats.workoutsThisWeek}
          </div>
        </div>
        <div style={cardStyle}>
          <strong style={{ fontSize: 14, display: 'block', marginBottom: 8 }}>Current Streak</strong>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: 'var(--text-secondary)' }}>
            {stats.streak} days
          </div>
        </div>
      </div>

      {/* Recent Workouts */}
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 24 }}>Recent Workouts</h3>
          <Link to="/workouts" className="App-link" style={{ fontSize: 14 }}>
            View All →
          </Link>
        </div>
        {recentWorkouts.length > 0 ? (
          <div style={{ display: 'grid', gap: 12 }}>
            {recentWorkouts.map((workout) => (
              <div key={workout.id} style={workoutCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{workout.type}</strong>
                    <span style={{ marginLeft: 12, opacity: 0.7 }}>{workout.duration} mins</span>
                  </div>
                  <span style={{ fontSize: 14, opacity: 0.6 }}>{workout.date}</span>
                </div>
                {workout.notes && (
                  <p style={{ margin: '8px 0 0 0', fontSize: 14, opacity: 0.8 }}>{workout.notes}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ opacity: 0.7 }}>No workouts yet. Start logging your workouts!</p>
        )}
      </section>

      {/* AI Recommendations */}
      {flags.AI_RECS && (
        <section data-testid="ai-recs-section" style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>🤖 AI Recommendations</h3>
          <div style={{ ...cardStyle, padding: 20 }}>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2 }}>
              {aiRecs.map((rec, idx) => (
                <li key={idx} style={{ marginBottom: 8 }}>{rec}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 20, marginBottom: 16 }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/workouts" className="App-link" style={actionButtonStyle}>
            📝 Log Workout
          </Link>
          <Link to="/profile" className="App-link" style={actionButtonStyle}>
            👤 View Profile
          </Link>
          {user?.role === 'trainer' && (
            <Link to="/trainers" className="App-link" style={actionButtonStyle}>
              🎓 Trainer Panel
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

const cardStyle = {
  border: '1px solid var(--border-color)',
  padding: 20,
  borderRadius: 8,
  minWidth: 200,
  backgroundColor: 'var(--bg-secondary)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const workoutCardStyle = {
  border: '1px solid var(--border-color)',
  padding: 16,
  borderRadius: 8,
  backgroundColor: 'var(--bg-secondary)'
};

const actionButtonStyle = {
  display: 'inline-block',
  padding: '10px 16px',
  borderRadius: 6,
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
  border: '1px solid var(--border-color)'
};
