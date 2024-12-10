import { FormData } from '@/types/registration.types';

interface ValidationErrors {
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
  medicalInfo?: {
    conditions?: string;
    dietary?: string;
    allergies?: string;
  };
  emergencyContact?: {
    name?: string;
    phone?: string;
    relation?: string;
  };
  terms?: {
    acceptedTerms?: string;
    acceptedPrivacyPolicy?: string;
  };
}

export const useFormValidation = () => {
  const validateForm = (formData: FormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Personal Info
    if (!formData.personalInfo.firstName) {
      errors.personalInfo = {
        ...errors.personalInfo,
        firstName: 'Voornaam is verplicht'
      };
    }

    if (!formData.personalInfo.lastName) {
      errors.personalInfo = {
        ...errors.personalInfo,
        lastName: 'Achternaam is verplicht'
      };
    }

    if (!formData.personalInfo.email) {
      errors.personalInfo = {
        ...errors.personalInfo,
        email: 'E-mail is verplicht'
      };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)) {
      errors.personalInfo = {
        ...errors.personalInfo,
        email: 'Ongeldig e-mailadres'
      };
    }

    // Role Info
    if (formData.roleInfo.role === 'runner' && !formData.roleInfo.distance) {
      errors.roleInfo = {
        ...errors.roleInfo,
        distance: 'Kies een afstand'
      };
    }

    // Terms
    if (!formData.terms.acceptedTerms) {
      errors.terms = {
        ...errors.terms,
        acceptedTerms: 'Je moet akkoord gaan met de voorwaarden'
      };
    }

    if (!formData.terms.acceptedPrivacyPolicy) {
      errors.terms = {
        ...errors.terms,
        acceptedPrivacyPolicy: 'Je moet akkoord gaan met het privacybeleid'
      };
    }

    return errors;
  };

  return { validateForm };
}; 