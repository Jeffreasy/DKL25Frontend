import React from 'react';
import { DashboardStats } from '../../components/admin/dashboard/DashboardStats';
import { RecentRegistrations } from '../../components/admin/dashboard/RecentRegistrations';
import { RecentDonations } from '../../components/admin/dashboard/RecentDonations';
import { useAdmin } from '../../hooks/admin';

export const Dashboard: React.FC = () => {
  const { stats, registrations, donations } = useAdmin();

  return (
    <div className="space-y-6">
      <DashboardStats stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentRegistrations registrations={registrations} limit={5} />
        <RecentDonations donations={donations} limit={5} />
      </div>
    </div>
  );
};

