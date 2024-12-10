import type { Registration, RegistrationStatus, Donation } from './api.types';

// Filter types
export interface FilterState {
  status: RegistrationStatus | '';
  role: string;
  dateRange: string;
}

// Dashboard types
export interface DashboardStats {
  totalRegistrations: number;
  pendingRegistrations: number;
  totalDonations: number;
  totalAmount: number;
}

// Table types
export interface RegistrationTableProps {
  registrations: Registration[];
  onStatusChange: (id: string, status: RegistrationStatus) => void;
}

// Recent Activity types
export interface RecentActivityProps {
  registrations?: Registration[];
  donations?: Donation[];
  limit?: number;
}

// Status labels
export const statusLabels: Record<RegistrationStatus, string> = {
  pending: 'In afwachting',
  approved: 'Goedgekeurd',
  rejected: 'Afgewezen',
  cancelled: 'Geannuleerd'
};

// Status colors
export const statusColors: Record<RegistrationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800'
}; 