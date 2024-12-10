import React from 'react';

interface ContentSectionProps {
  icon: string;
  title: string;
  content: string[];
  isThankYou?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({ icon, title, content, isThankYou }) => {
  return (
    <div 
      className="bg-white p-8 rounded-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary group cursor-default"
      tabIndex={0}
    >
      <h2 className="flex items-center text-2xl font-heading font-semibold text-gray-900 mb-6 relative pb-3">
        <span className="material-icons-round text-2xl text-primary mr-2 transition-transform duration-300 group-hover:-translate-y-1">
          {icon}
        </span>
        {title}
        <div className="absolute bottom-0 left-0 w-15 h-0.5 bg-primary transition-all duration-300 group-hover:w-24" />
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        {content.map((paragraph, index) => (
          isThankYou && index === content.length - 1 ? (
            <p key={index} className="text-center font-medium text-gray-900 mt-6 p-4 bg-primary/10 rounded-lg">
              <span className="material-icons-round text-primary align-middle mr-1">
                favorite
              </span>
              {paragraph}
            </p>
          ) : (
            <p key={index}>{paragraph}</p>
          )
        ))}
      </div>
    </div>
  );
};

export default ContentSection; 