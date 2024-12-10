import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/date';
import { formatCurrency } from '@/utils/format';
import type { RecentActivityProps } from '@/types/admin.types';

export const RecentDonations: React.FC<RecentActivityProps> = ({ 
  donations = [],
  limit = 5
}) => {
  const recentDonations = donations.slice(0, limit);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recente Donaties</h2>
        <Link to="/admin/donations" className="text-primary hover:underline">
          Bekijk alle
        </Link>
      </div>
      <div className="space-y-4">
        {recentDonations.map((donation) => (
          <div key={donation.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{donation.donor.name}</p>
              <p className="text-sm text-gray-500">{formatDate(donation.createdAt)}</p>
            </div>
            <div>
              <p className="font-medium text-green-600">{formatCurrency(donation.amount)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 