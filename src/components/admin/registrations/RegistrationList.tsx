import React from 'react';
import { RegistrationTable } from './RegistrationTable';
import type { Registration, RegistrationStatus } from '../../../types/types';

interface RegistrationListProps {
  registrations: Registration[];
  onStatusChange: (id: string, status: RegistrationStatus) => Promise<void>;
}

export const RegistrationList: React.FC<RegistrationListProps> = ({ 
  registrations, 
  onStatusChange 
}) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <RegistrationTable 
        registrations={registrations}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}; 