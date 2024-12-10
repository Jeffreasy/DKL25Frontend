import type { FormData } from './registration.types';

// HTTP Status enum
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

// Base API types
export interface ApiResponse<T = void> {
  data?: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: {
    code: number;
    message: string;
    details?: Record<string, string[]>;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Registration types
export type RegistrationStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface RegistrationRequest {
  formData: FormData;
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

// Partner types
export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  tier: 'gold' | 'silver' | 'bronze';
  since: string;
}

// Contact types
export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

// Donation types
export interface Donation {
  id: string;
  amount: number;
  donor: {
    name: string;
    email: string;
  };
  message?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// Update de bestaande types en voeg nieuwe toe
export interface RegistrationUpdateRequest {
  status?: RegistrationStatus;
  formData?: Partial<FormData>;
}

export interface DonationRequest {
  amount: number;
  donor: {
    name: string;
    email: string;
  };
  message?: string;
}

export interface PartnerCreateRequest {
  name: string;
  logo: File;
  website: string;
  description: string;
  tier: Partner['tier'];
}

export interface PartnerUpdateRequest extends Partial<Omit<PartnerCreateRequest, 'logo'>> {
  logo?: File;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface RegistrationStatusResponse {
  status: RegistrationStatus;
  updatedAt: string;
} 