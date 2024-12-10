import React from 'react';
import FAQ from '../components/faq/FAQ';

interface ContactProps {
  onInschrijfClick: () => void;
}

const Contact: React.FC<ContactProps> = ({ onInschrijfClick }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <FAQ onInschrijfClick={onInschrijfClick} />
      </div>
    </div>
  );
};

export default Contact; 