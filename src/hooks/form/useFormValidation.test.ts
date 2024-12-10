import { renderHook } from '@testing-library/react';
import { useFormValidation } from './useFormValidation';
import { describe, it, expect } from 'vitest';
import type { FormData, Role } from '../../types/registration.types';

describe('useFormValidation', () => {
  const emptyForm: FormData = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
    },
    roleInfo: {
      role: 'runner' as Role,
      distance: undefined,
    },
    medicalInfo: {
      conditions: '',
      dietary: '',
      allergies: '',
    },
    emergencyContact: {
      name: '',
      phone: '',
      relation: '',
    },
    terms: {
      acceptedTerms: false,
      acceptedPrivacyPolicy: false,
      acceptedDate: '',
    },
  };

  it('validates required personal info fields', () => {
    const { result } = renderHook(() => useFormValidation());
    const errors = result.current.validateForm(emptyForm);

    expect(errors.personalInfo?.firstName).toBe('Voornaam is verplicht');
    expect(errors.personalInfo?.lastName).toBe('Achternaam is verplicht');
    expect(errors.personalInfo?.email).toBe('E-mail is verplicht');
  });

  it('validates email format', () => {
    const { result } = renderHook(() => useFormValidation());
    const formData = {
      ...emptyForm,
      personalInfo: {
        ...emptyForm.personalInfo,
        email: 'invalid-email',
      },
    };

    const errors = result.current.validateForm(formData);
    expect(errors.personalInfo?.email).toBe('Ongeldig e-mailadres');
  });

  it('validates runner distance selection', () => {
    const { result } = renderHook(() => useFormValidation());
    const formData = {
      ...emptyForm,
      roleInfo: {
        role: 'runner' as Role,
        distance: undefined,
      },
    };

    const errors = result.current.validateForm(formData);
    expect(errors.roleInfo?.distance).toBe('Kies een afstand');
  });

  it('validates terms acceptance', () => {
    const { result } = renderHook(() => useFormValidation());
    const formData = {
      ...emptyForm,
      terms: {
        ...emptyForm.terms,
        acceptedTerms: false,
        acceptedPrivacyPolicy: false,
      },
    };

    const errors = result.current.validateForm(formData);
    expect(errors.terms?.acceptedTerms).toBe('Je moet akkoord gaan met de voorwaarden');
    expect(errors.terms?.acceptedPrivacyPolicy).toBe('Je moet akkoord gaan met het privacybeleid');
  });
}); 