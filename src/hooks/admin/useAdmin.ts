import { useCallback, useState } from 'react';
import { useAdmin as useAdminContext } from '../../contexts/AdminContext';
import type { 
  Registration, 
  RegistrationStatus,
  Donation 
} from '../../types/api.types';
import type { 
  FilterState,
  DashboardStats 
} from '../../types/admin.types';

interface UseAdminReturn {
  // Data
  registrations: Registration[];
  donations: Donation[];
  stats: DashboardStats;
  
  // States
  loading: boolean;
  error: string | null;
  operationState: {
    loading: boolean;
    error: string | null;
  };
  
  // Filters
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  
  // Actions
  updateRegistrationStatus: (id: string, status: RegistrationStatus) => Promise<void>;
  refreshData: () => Promise<void>;
  retry: () => Promise<void>;
}

export const useAdmin = (): UseAdminReturn => {
  const context = useAdminContext();
  const [filters, setFilters] = useState<FilterState>({
    status: '',
    role: '',
    dateRange: ''
  });
  const [operationState, setOperationState] = useState({
    loading: false,
    error: null as string | null
  });

  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }

  const handleOperation = async (operation: () => Promise<void>) => {
    setOperationState({ loading: true, error: null });
    try {
      await operation();
    } catch (error) {
      setOperationState({
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setOperationState({ loading: false, error: null });
    }
  };

  const refreshData = useCallback(async () => {
    await handleOperation(context.loadData);
  }, [context]);

  const retry = useCallback(async () => {
    if (context.error) {
      await refreshData();
    }
  }, [context.error, refreshData]);

  const updateRegistrationStatus = useCallback(async (id: string, status: RegistrationStatus) => {
    await handleOperation(() => context.updateRegistrationStatus(id, status));
  }, [context]);

  return {
    // Data
    registrations: context.registrations,
    donations: context.donations,
    stats: context.stats,
    
    // States
    loading: context.loading,
    error: context.error,
    operationState,
    
    // Filters
    filters,
    setFilters,
    
    // Actions
    updateRegistrationStatus,
    refreshData,
    retry
  };
}; 