import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ContactFormData } from '../types';

// Tijdelijke mock functie (later te vervangen door echte API call)
const submitContactForm = async (data: ContactFormData) => {
  // Simuleer API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Form submitted:', data);
};

export const useContactForm = (onSuccess: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    defaultValues: {
      startTime: Date.now()
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Honeypot check
      if (data.website) {
        throw new Error('Spam detected');
      }

      // Implementeer hier je submit logica
      await submitContactForm(data);
      onSuccess();
    } catch (error) {
      setSubmitError('Er ging iets mis. Probeer het later opnieuw.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    submitError,
    onSubmit: form.handleSubmit(onSubmit)
  };
}; 