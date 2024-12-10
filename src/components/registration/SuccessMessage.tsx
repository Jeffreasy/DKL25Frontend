import React from 'react';
import type { FormData } from '@/types/registration.types';

interface SuccessMessageProps {
  formData: FormData;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ formData }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-[600px] bg-white rounded-xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bedankt voor je inschrijving!
          </h2>
          <p className="text-gray-600">
            We hebben je inschrijving ontvangen en zullen deze zo snel mogelijk verwerken.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Je gegevens:</h3>
          
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-[120px,1fr] gap-4 pb-2 border-b border-gray-200">
              <span className="text-gray-600">Naam:</span>
              <span className="font-medium">
                {formData.personalInfo.firstName} {formData.personalInfo.lastName}
              </span>
            </div>

            <div className="grid grid-cols-[120px,1fr] gap-4 pb-2 border-b border-gray-200">
              <span className="text-gray-600">E-mail:</span>
              <span className="font-medium">{formData.personalInfo.email}</span>
            </div>

            <div className="grid grid-cols-[120px,1fr] gap-4 pb-2 border-b border-gray-200">
              <span className="text-gray-600">Rol:</span>
              <span className="font-medium">{formData.roleInfo.role}</span>
            </div>

            {formData.roleInfo.role === 'runner' && (
              <div className="grid grid-cols-[120px,1fr] gap-4 pb-2 border-b border-gray-200">
                <span className="text-gray-600">Afstand:</span>
                <span className="font-medium">{formData.roleInfo.distance}km</span>
              </div>
            )}

            {formData.medicalInfo.conditions && (
              <div className="grid grid-cols-[120px,1fr] gap-4">
                <span className="text-gray-600">Medisch:</span>
                <span className="font-medium">{formData.medicalInfo.conditions}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Je ontvangt binnen enkele minuten een bevestigingsmail met meer informatie.
        </div>
      </div>
    </div>
  );
}; 