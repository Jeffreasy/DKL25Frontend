import type { FormData } from './registration.types';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Registration {
  id: string;
  userId: string;
  status: RegistrationStatus;
  formData: FormData;
  createdAt: string;
  updatedAt: string;
  verifiedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
}

export interface Donation {
  id: string;
  userId?: string;
  amount: number;
  status: DonationStatus;
  createdAt: string;
}

export type UserRole = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive';
export type RegistrationStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type DonationStatus = 'pending' | 'completed' | 'failed'; 