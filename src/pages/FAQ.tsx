import React from 'react';
import FAQ from '../components/faq/FAQ';

interface FAQPageProps {
  onContactClick: () => void;
  onInschrijfClick?: () => void;
}

const FAQPage: React.FC<FAQPageProps> = ({ onContactClick, onInschrijfClick }) => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <FAQ 
          onInschrijfClick={onInschrijfClick}
          onContactClick={onContactClick}
        />
      </div>
    </div>
  );
};

export default FAQPage; 