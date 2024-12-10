import React, { useState } from 'react';
import { RegistrationTable } from '../../components/admin/registrations/RegistrationTable';
import { RegistrationFilters } from '../../components/admin/registrations/RegistrationFilters';
import { useAdmin } from '../../hooks/admin';
import type { FilterState } from '../../types/admin.types';

export const Registrations: React.FC = () => {
  const { registrations, updateRegistrationStatus } = useAdmin();
  const [filters, setFilters] = useState<FilterState>({
    status: '',
    role: '',
    dateRange: ''
  });

  const handleFilterChange = (partialFilters: Partial<FilterState>) => {
    setFilters(prev => ({
      ...prev,
      ...partialFilters
    }));
  };

  const filteredRegistrations = registrations.filter(reg => {
    if (filters.status && reg.status !== filters.status) return false;
    if (filters.role && reg.formData.roleInfo.role !== filters.role) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <RegistrationFilters onFilterChange={handleFilterChange} />
      <RegistrationTable 
        registrations={filteredRegistrations}
        onStatusChange={updateRegistrationStatus}
      />
    </div>
  );
};