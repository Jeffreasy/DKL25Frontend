import React from 'react';
import type { FilterState } from '../../../types/admin.types';
import type { RegistrationStatus } from '../../../types/types';

interface RegistrationFiltersProps {
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export const RegistrationFilters: React.FC<RegistrationFiltersProps> = ({ onFilterChange }) => {
  const handleStatusChange = (status: string) => {
    onFilterChange({
      status: status as RegistrationStatus | ''
    });
  };

  const handleRoleChange = (role: string) => {
    onFilterChange({
      role
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="form-select"
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="">Alle statussen</option>
          <option value="pending">Wachtend</option>
          <option value="approved">Goedgekeurd</option>
          <option value="rejected">Afgewezen</option>
        </select>

        <select
          className="form-select"
          onChange={(e) => handleRoleChange(e.target.value)}
        >
          <option value="">Alle rollen</option>
          <option value="runner">Hardloper</option>
          <option value="volunteer">Vrijwilliger</option>
        </select>
      </div>
    </div>
  );
}; 