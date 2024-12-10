import { Dispatch, SetStateAction } from 'react';
import type { FormData } from '../../../types/registration.types';

export interface SectionProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  errors?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    role?: string;
    distance?: string;
    acceptedTerms?: string;
    acceptedPrivacyPolicy?: string;
    [key: string]: string | undefined;
  };
} 