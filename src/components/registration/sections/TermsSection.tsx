import React, { useState } from 'react';
import type { SectionProps } from './types';
import { TermsModal } from '../../modals/TermsModal';

export const TermsSection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasReadTerms) {
      setShowTerms(true);
      return;
    }

    const now = new Date().toISOString();
    setFormData({
      ...formData,
      terms: {
        ...formData.terms,
        acceptedTerms: e.target.checked,
        acceptedPrivacyPolicy: e.target.checked,
        acceptedDate: now
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            data-cy="terms-checkbox"
            type="checkbox"
            checked={formData.terms.acceptedTerms}
            onChange={handleCheckboxChange}
            className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary/20"
          />
        </div>
        <div className="ml-3">
          <label className="text-sm text-gray-700">
            Ik ga akkoord met de{' '}
            <button
              data-cy="terms-link"
              type="button"
              onClick={() => setShowTerms(true)}
              className="text-primary hover:underline"
            >
              algemene voorwaarden
            </button>
          </label>
        </div>
      </div>

      <TermsModal
        isOpen={showTerms}
        onClose={() => {
          setShowTerms(false);
          setHasReadTerms(true);
        }}
      />
    </div>
  );
}; 