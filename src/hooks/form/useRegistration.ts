import { useState } from 'react';
import { api } from '@/services/api';
import type { FormData } from '@/types/registration.types';
import type { 
  Registration,
  RegistrationStatusResponse 
} from '@/types/api.types';

interface UseRegistrationReturn {
  loading: boolean;
  error: string | null;
  submitRegistration: (data: { formData: FormData }) => Promise<Registration>;
  checkStatus: (id: string) => Promise<RegistrationStatusResponse>;
}

export const useRegistration = (): UseRegistrationReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRegistration = async (data: { formData: FormData }): Promise<Registration> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.createRegistration(data);
      if (!response.data) {
        throw new Error('No data received from server');
      }
      return response.data;
    } catch (err) {
      setError('Er is een fout opgetreden bij het verwerken van je inschrijving');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (id: string): Promise<RegistrationStatusResponse> => {
    try {
      const response = await api.getRegistrationStatus(id);
      if (!response.data) {
        throw new Error('No status data received');
      }
      return response.data;
    } catch (err) {
      setError('Kon de status niet ophalen');
      throw err;
    }
  };

  return {
    loading,
    error,
    submitRegistration,
    checkStatus
  };
}; 