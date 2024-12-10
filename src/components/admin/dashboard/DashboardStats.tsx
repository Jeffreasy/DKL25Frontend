import React from 'react';
import { formatCurrency } from '@/utils/format';
import type { DashboardStats as DashboardStatsType } from '@/types/admin.types';

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const items = [
    {
      label: 'Totaal Inschrijvingen',
      value: stats.totalRegistrations,
      icon: '👥',
      formatter: String
    },
    {
      label: 'Wachtende Inschrijvingen',
      value: stats.pendingRegistrations,
      icon: '⏳',
      formatter: String
    },
    {
      label: 'Aantal Donaties',
      value: stats.totalDonations,
      icon: '🎁',
      formatter: String
    },
    {
      label: 'Totaal Gedoneerd',
      value: stats.totalAmount,
      icon: '💰',
      formatter: formatCurrency
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{item.icon}</div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
              <p className="text-2xl font-bold text-gray-900">
                {item.formatter(item.value)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 