import React from 'react';
import { SvgIconComponent } from '@mui/icons-material';

interface CTACardProps {
  title: string;
  description: string;
  icon: SvgIconComponent;
  buttonText: string;
  onClick: () => void;
}

const CTACard: React.FC<CTACardProps> = ({ title, description, icon: Icon, buttonText, onClick }) => {
  return (
    <div className="group bg-white rounded-[20px] p-6 flex flex-col gap-4 h-full min-h-[380px] relative overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Icon Section */}
      <div className="relative w-20 h-20 mx-auto mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light rounded-[18px] -rotate-6 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105" />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Icon className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="text-center flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{title}</h3>
        <div className="bg-primary/5 border-2 border-primary/10 rounded-xl p-4 mb-4 flex-grow flex items-center justify-center transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/8 min-h-[80px]">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-auto flex justify-center">
        <button
          onClick={onClick}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-full shadow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group/btn"
        >
          <span>{buttonText}</span>
          <svg 
            className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" 
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13 5L8 10H12V19H14V10H18L13 5Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CTACard; 