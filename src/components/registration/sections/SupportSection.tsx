import React from 'react';
import type { SectionProps } from '@/types/registration.types';
import { RadioCard } from '../RadioCard';

type SupportType = 'volunteer' | 'donation';

const SupportSection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  const handleSupportTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      roleInfo: {
        ...prev.roleInfo,
        role: 'supporter',
        supportType: value as SupportType
      }
    }));
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Hoe wil je ondersteunen?</h2>
        <p className="text-gray-600 mb-6">
          Kies hoe je het evenement wilt ondersteunen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RadioCard
          name="supportType"
          value="donation"
          checked={formData.roleInfo.supportType === 'donation'}
          onChange={handleSupportTypeChange}
          title="Donatie"
          description="Ondersteun het evenement met een donatie"
        />
        <RadioCard
          name="supportType"
          value="volunteer"
          checked={formData.roleInfo.supportType === 'volunteer'}
          onChange={handleSupportTypeChange}
          title="Vrijwilliger"
          description="Help mee als vrijwilliger tijdens het evenement"
        />
      </div>
    </section>
  );
};

export default SupportSection; 