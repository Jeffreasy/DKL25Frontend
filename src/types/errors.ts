import type { HttpStatus, RegistrationRequest } from './api.types';

export type { HttpStatus, RegistrationRequest };

export class ApiError extends Error {
  constructor(
    public code: HttpStatus,
    message: string,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
} 