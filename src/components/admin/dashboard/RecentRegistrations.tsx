import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/date';
import type { RecentActivityProps } from '@/types/admin.types';
import { statusLabels, statusColors } from '@/types/admin.types';

export const RecentRegistrations: React.FC<RecentActivityProps> = ({ 
  registrations = [],
  limit = 5
}) => {
  const recentRegistrations = registrations.slice(0, limit);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recente Inschrijvingen</h2>
        <Link to="/admin/registrations" className="text-primary hover:underline">
          Bekijk alle
        </Link>
      </div>
      <div className="space-y-4">
        {recentRegistrations.map((reg) => (
          <div key={reg.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">
                {reg.formData.personalInfo.firstName} {reg.formData.personalInfo.lastName}
              </p>
              <p className="text-sm text-gray-500">{reg.formData.personalInfo.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{formatDate(reg.createdAt)}</p>
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${statusColors[reg.status]}`}>
                {statusLabels[reg.status]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 