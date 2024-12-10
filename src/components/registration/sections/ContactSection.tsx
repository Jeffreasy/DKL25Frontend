// src/components/registration/sections/ContactSection.tsx
import React from 'react';
import type { PersonalInfo } from '../../../types/registration.types';
import type { SectionProps } from './types';

export const ContactSection: React.FC<SectionProps> = ({ formData, setFormData, errors }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Persoonlijke Gegevens</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Voornaam
          </label>
          <input
            data-cy="firstName"
            type="text"
            id="firstName"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Vul je voornaam in"
            required
          />
          {errors?.firstName && (
            <p data-cy="error-firstName" className="text-red-500 text-sm">
              {errors.firstName}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Achternaam
          </label>
          <input
            data-cy="lastName"
            type="text"
            id="lastName"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Vul je achternaam in"
            required
          />
          {errors?.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-mailadres
          </label>
          <input
            data-cy="email"
            type="email"
            id="email"
            value={formData.personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Vul je e-mailadres in"
            required
          />
          {errors?.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefoonnummer
          </label>
          <input
            data-cy="phone"
            type="tel"
            id="phone"
            value={formData.personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Vul je telefoonnummer in"
            required
          />
          {errors?.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            Geboortedatum
          </label>
          <input
            data-cy="birthDate"
            type="date"
            id="birthDate"
            value={formData.personalInfo.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            required
          />
          {errors?.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
        </div>
      </div>
    </div>
  );
};
