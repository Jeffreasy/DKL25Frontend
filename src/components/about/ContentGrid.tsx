import React from 'react';
import ContentSection from './ContentSection';
import { contentSections } from './about.data';

const ContentGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
      {contentSections.map((section, index) => (
        <ContentSection key={index} {...section} />
      ))}
    </div>
  );
};

export default ContentGrid; 