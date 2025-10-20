import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function TrainerAssignCard({ members = [], plans = [], onAssign }) {
  /** Trainer assignment UI: choose member and plan */
  const [memberId, setMemberId] = useState(members[0]?.id || '');
  const [planId, setPlanId] = useState(plans[0]?.id || '');

  const submit = (e) => {
    e.preventDefault();
    onAssign?.({ memberId, planId });
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <select value={memberId} onChange={(e) => setMemberId(e.target.value)}>
        {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
      </select>
      <select value={planId} onChange={(e) => setPlanId(e.target.value)}>
        {plans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <button type="submit">Assign Plan</button>
    </form>
  );
}
