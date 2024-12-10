import { HttpStatus } from '@/types/api.types';
import { auth } from '@/services/auth';

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

export class ErrorHandler {
  static handle(error: unknown): string {
    if (error instanceof ApiError) {
      switch (error.code) {
        case HttpStatus.UNAUTHORIZED:
          auth.clearToken();
          return 'Je sessie is verlopen. Log opnieuw in.';
        case HttpStatus.FORBIDDEN:
          return 'Je hebt geen toegang tot deze functie.';
        case HttpStatus.NOT_FOUND:
          return 'De opgevraagde gegevens zijn niet gevonden.';
        default:
          return error.message;
      }
    }
    return 'Er is een onbekende fout opgetreden.';
  }
} 