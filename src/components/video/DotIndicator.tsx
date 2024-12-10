import React from 'react';

interface DotIndicatorProps {
  isActive: boolean;
  onClick: () => void;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({ isActive, onClick }) => {
  return (
    <button
      className={`
        w-2 h-2 rounded-full
        transition-all duration-300
        ${isActive 
          ? 'bg-primary scale-125' 
          : 'bg-gray-300 hover:bg-gray-400'
        }
      `}
      onClick={onClick}
      aria-selected={isActive}
      role="tab"
    />
  );
};

export default DotIndicator; 