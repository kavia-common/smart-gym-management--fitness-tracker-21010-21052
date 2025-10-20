import React, { useEffect, useState } from 'react';
import TrainerAssignCard from '../components/TrainerAssignCard';
import { apiClient } from '../services/apiClient';

export default function Trainers() {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    (async () => {
      setMembers(await apiClient.getMembers());
      setPlans(await apiClient.getPlans());
    })();
  }, []);

  const onAssign = async ({ memberId, planId }) => {
    await apiClient.assignPlan(memberId, planId);
    alert('Assigned plan!');
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>Trainer Panel</h2>
      <TrainerAssignCard members={members} plans={plans} onAssign={onAssign} />
    </main>
  );
}
