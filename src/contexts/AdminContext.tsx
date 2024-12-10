import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { Registration, Donation, RegistrationStatus } from '@/types/api.types';
import { api } from '@/services/api';
import type { DashboardStats } from '@/types/admin.types';

export interface AdminContextType {
  registrations: Registration[];
  donations: Donation[];
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
  loadData: () => Promise<void>;
  updateRegistrationStatus: (id: string, status: RegistrationStatus) => Promise<void>;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [registrationsRes, donationsRes] = await Promise.all([
        api.getRegistrations(),
        api.getDonations()
      ]);

      setRegistrations(registrationsRes.data || []);
      setDonations(donationsRes.data || []);
    } catch (err) {
      setError('Er is een fout opgetreden bij het laden van de gegevens');
    } finally {
      setLoading(false);
    }
  };

  const updateRegistrationStatus = async (id: string, status: RegistrationStatus) => {
    try {
      await api.updateRegistrationStatus(id, status);
      await loadData(); // Herlaad de data na update
    } catch (err) {
      setError('Kon de status niet bijwerken');
      console.error(err);
    }
  };

  const stats: DashboardStats = useMemo(() => ({
    totalRegistrations: registrations.length,
    pendingRegistrations: registrations.filter(r => r.status === 'pending').length,
    totalDonations: donations.length,
    totalAmount: donations.reduce((sum, d) => sum + d.amount, 0)
  }), [registrations, donations]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        registrations,
        donations,
        stats,
        loading,
        error,
        loadData,
        updateRegistrationStatus
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}; 