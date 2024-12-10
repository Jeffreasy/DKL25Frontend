export interface ValidationError {
  field: string;
  tag: string;
  value?: any;
  param?: string;
}

export interface FieldErrors {
  [field: string]: string[];
}

// Go validator tags als TypeScript types
export type Required = true;
export type Email = string;
export type Min = number;
export type Max = number;
export type OneOf<T extends readonly string[]> = T[number];
export type URL = string;

export interface ValidationErrors {
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
  };
  roleInfo?: {
    role?: string;
    distance?: string;
  };
  terms?: {
    acceptedTerms?: string;
    acceptedPrivacyPolicy?: string;
  };
} 