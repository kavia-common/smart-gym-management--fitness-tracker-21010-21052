import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function WorkoutForm({ onAdded }) {
  /** Simple form to add a workout entry */
  const [type, setType] = useState('Cardio');
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const workout = {
      date: new Date().toISOString().slice(0, 10),
      type,
      duration: Number(duration),
      notes
    };
    onAdded?.(workout);
    setNotes('');
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Cardio</option>
        <option>Strength</option>
        <option>Yoga</option>
        <option>HIIT</option>
      </select>
      <input type="number" min="1" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (mins)" />
      <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" />
      <button type="submit">Add Workout</button>
    </form>
  );
}
