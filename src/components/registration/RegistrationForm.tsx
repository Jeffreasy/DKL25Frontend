// src/components/registration/RegistrationForm.tsx
import React, { useState } from 'react';
import type { FormData } from '@/types/registration.types';
import type { ValidationErrors } from '@/types/validation.types';
import { useRegistration } from '../../hooks/form/useRegistration';
import { ContactSection, RoleSection, TermsSection } from './sections';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { SuccessMessage } from './SuccessMessage';
import { LoadingOverlay } from '../shared/LoadingOverlay';
import { useFormValidation } from '../../hooks/form/useFormValidation';

const initialFormState: FormData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
  },
  roleInfo: {
    role: 'runner',
    distance: undefined,
    supportType: undefined,
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

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [showSuccess, setShowSuccess] = useState(false);
  const { loading, error, submitRegistration } = useRegistration();
  const { validateForm } = useFormValidation();
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await submitRegistration({ formData });
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-full max-w-[900px] mx-auto my-16 p-12 bg-white rounded-xl shadow-lg">
      {loading && <LoadingOverlay message="Je inschrijving wordt verwerkt..." />}
      
      {error && (
        <div className="mb-6" role="alert">
          <ErrorMessage message={error} />
        </div>
      )}
      
      {showSuccess ? (
        <SuccessMessage formData={formData} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-12">
          <ContactSection 
            formData={formData} 
            setFormData={setFormData}
            errors={validationErrors.personalInfo}
          />
          <RoleSection 
            formData={formData} 
            setFormData={setFormData}
            errors={validationErrors.roleInfo}
          />
          <TermsSection 
            formData={formData} 
            setFormData={setFormData}
            errors={validationErrors.terms}
          />
          
          <div className="flex justify-center">
            <button
              data-cy="submit-registration"
              type="submit"
              disabled={loading}
              className="w-full max-w-[350px] py-5 px-8 bg-primary text-white font-semibold text-lg 
                rounded-xl transition-all duration-300 hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Bezig met verzenden...' : 'Inschrijven'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
