import React from 'react';

interface RadioCardProps {
  /** Name attribute for the radio input */
  name: string;
  /** Value of the radio option */
  value: string;
  /** Whether this option is currently selected */
  checked: boolean;
  /** Handler for when the option is selected */
  onChange: (value: string) => void;
  /** Title text to display */
  title: string;
  /** Description text to display */
  description: string;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const RadioCard: React.FC<RadioCardProps> = ({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  icon,
  className = ''
}) => {
  return (
    <label
      className={`
        relative block p-6 rounded-xl border-2 cursor-pointer
        transition-all duration-200
        ${checked 
          ? 'border-primary bg-primary/5 shadow-md' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
        ${className}
      `}
      role="radio"
      aria-checked={checked}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onChange(value);
        }
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
      />
      
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 text-2xl">
            {icon}
          </div>
        )}
        <div>
          <div className="font-medium text-gray-900">
            {title}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            {description}
          </div>
        </div>
      </div>

      <div 
        className={`
          absolute top-4 right-4 w-4 h-4 rounded-full border-2
          transition-colors duration-200
          ${checked 
            ? 'border-primary bg-primary' 
            : 'border-gray-300 bg-white'}
        `}
      >
        <div 
          className={`
            absolute inset-1 rounded-full bg-white
            transform transition-transform duration-200
            ${checked ? 'scale-100' : 'scale-0'}
          `}
        />
      </div>
    </label>
  );
};