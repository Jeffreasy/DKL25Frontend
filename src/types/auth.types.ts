import { User } from './types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface TokenValidationResponse {
  valid: boolean;
  user: User;
} 