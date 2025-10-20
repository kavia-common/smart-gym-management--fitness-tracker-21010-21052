import React, { useEffect, useState } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import { apiClient } from '../services/apiClient';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  const refresh = async () => {
    const list = await apiClient.getWorkouts();
    setWorkouts(list);
  };

  useEffect(() => {
    refresh();
  }, []);

  const onAdded = async (workout) => {
    await apiClient.addWorkout(workout);
    await refresh();
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>Workouts</h2>
      <WorkoutForm onAdded={onAdded} />
      <ul style={{ marginTop: 16 }}>
        {workouts.map(w => (
          <li key={w.id}>
            {w.date} — {w.type} — {w.duration} mins — {w.notes}
          </li>
        ))}
      </ul>
    </main>
  );
}
