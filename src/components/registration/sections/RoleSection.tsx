import React from 'react';
import type { Role } from '../../../types/registration.types';
import type { SectionProps } from './types';
import { RadioCard } from '../RadioCard';

const roles: Array<{
  value: Role;
  icon: string;
  title: string;
  description: string;
}> = [
  {
    value: 'runner',
    icon: '🏃',
    title: 'Hardloper',
    description: 'Doe mee aan de wandeltocht'
  },
  {
    value: 'volunteer',
    icon: '🤝',
    title: 'Vrijwilliger',
    description: 'Help mee tijdens het evenement'
  },
  {
    value: 'supporter',
    icon: '📣',
    title: 'Supporter',
    description: 'Steun het evenement'
  }
];

export const RoleSection: React.FC<SectionProps> = ({ formData, setFormData }) => {
  const handleRoleChange = (value: Role) => {
    setFormData({
      ...formData,
      roleInfo: {
        ...formData.roleInfo,
        role: value,
        distance: value === 'runner' ? formData.roleInfo.distance : undefined
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Kies je rol</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <RadioCard
            data-cy={`role-${role.value}`}
            key={role.value}
            name="role"
            value={role.value.toString()}
            icon={role.icon}
            title={role.title}
            description={role.description}
            checked={formData.roleInfo.role === role.value}
            onChange={(value) => handleRoleChange(value as Role)}
          />
        ))}
      </div>
      <div data-cy="distance-selection" className="mt-6">
        {/* Distance options */}
      </div>
    </div>
  );
}; 