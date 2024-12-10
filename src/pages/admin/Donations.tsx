import React from 'react';
import { useAdmin } from '../../hooks/admin';

export const Donations: React.FC = () => {
  const { donations } = useAdmin();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Donaties ({donations.length})</h1>
      {/* DonationTable component komt later */}
    </div>
  );
}; 