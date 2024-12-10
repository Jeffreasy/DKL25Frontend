import React from 'react';
import AboutHeader from './AboutHeader';
import AboutImage from './AboutImage';
import ContentGrid from './ContentGrid';

const AboutSection: React.FC = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-12 font-roboto antialiased">
      <AboutHeader />
      <AboutImage />
      <ContentGrid />
    </div>
  );
};

export default AboutSection; 