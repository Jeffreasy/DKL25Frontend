import React from 'react';
import type { SectionProps } from '@/types/registration.types';
import { RadioCard } from '../RadioCard';

const distances: Array<{
  value: number;
  icon: string;
  title: string;
  description: string;
}> = [
  {
    value: 5,
    icon: '🚶',
    title: '5 KM',
    description: 'Ideaal voor beginners'
  },
  {
    value: 10,
    icon: '🏃',
    title: '10 KM',
    description: 'Voor de gevorderde wandelaar'
  },
  {
    value: 21,
    icon: '🏃‍♂️',
    title: '21 KM',
    description: 'Halve marathon afstand'
  }
];

const DistanceSection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  if (formData.roleInfo.role !== 'runner') {
    return null;
  }

  const handleDistanceChange = (value: number) => {
    setFormData({
      ...formData,
      roleInfo: {
        ...formData.roleInfo,
        distance: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Kies je afstand</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {distances.map((distance) => (
          <RadioCard
            key={distance.value}
            name="distance"
            value={distance.value.toString()}
            icon={distance.icon}
            title={distance.title}
            description={distance.description}
            checked={formData.roleInfo.distance === distance.value}
            onChange={(value) => handleDistanceChange(parseInt(value, 10))}
          />
        ))}
      </div>
    </div>
  );
};

export default DistanceSection; 