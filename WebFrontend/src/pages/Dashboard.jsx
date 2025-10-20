import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFeatureFlags } from '../context/FeatureFlagsContext';
import { apiClient } from '../services/apiClient';

export default function Dashboard() {
  const { user } = useAuth();
  const { flags } = useFeatureFlags();
  const [stats, setStats] = useState({ workoutsThisWeek: 0, streak: 0 });
  const [aiRecs, setAiRecs] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await apiClient.getDashboardStats();
      if (mounted) setStats(data);
      if (mounted && flags.AI_RECS) {
        setAiRecs([
          'Try a 20-minute HIIT session today.',
          'Increase daily protein intake by 10g.',
          'Water reminder: Drink 2 more glasses by evening.'
        ]);
      }
    })();
    return () => { mounted = false; };
  }, [flags.AI_RECS]);

  return (
    <main role="main" data-testid="page-main" style={{ padding: 24 }}>
      <h2 data-testid="dashboard-heading">Dashboard</h2>
      <p>Welcome back, {user?.email}!</p>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 12 }}>
        <div style={cardStyle}>
          <strong>Workouts this week</strong>
          <div style={{ fontSize: 28 }}>{stats.workoutsThisWeek}</div>
        </div>
        <div style={cardStyle}>
          <strong>Streak</strong>
          <div style={{ fontSize: 28 }}>{stats.streak} days</div>
        </div>
      </div>

      {flags.AI_RECS && (
        <section data-testid="ai-recs-section" style={{ marginTop: 24 }}>
          <h3>AI Recommendations</h3>
          <ul>
            {aiRecs.map((r, idx) => <li key={idx}>{r}</li>)}
          </ul>
        </section>
      )}
    </main>
  );
}

const cardStyle = {
  border: '1px solid var(--border-color)',
  padding: 16,
  borderRadius: 8,
  minWidth: 200
};
