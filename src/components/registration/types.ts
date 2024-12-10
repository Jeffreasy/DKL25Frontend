// Base registration form data
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  role: 'runner' | 'volunteer' | 'supporter';
  distance?: '5km' | '10km' | '21km';
  shirtSize?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  medicalInfo?: string;
  dietaryRestrictions?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  acceptedTerms: boolean;
  acceptedPrivacyPolicy: boolean;
}

// Props voor section components
export interface SectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext?: () => void;
  onPrev?: () => void;
}

// API response types
export interface RegistrationResponse {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  confirmationCode: string;
  paymentRequired: boolean;
  paymentUrl?: string;
  createdAt: string;
}

// Role types
export type Role = 'runner' | 'volunteer' | 'supporter';
export type Distance = '5km' | '10km' | '21km';
export type ShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'; 