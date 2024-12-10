import React from 'react';

const AboutHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-5 tracking-tight">
        <span className="material-icons-round text-4xl md:text-5xl text-primary mr-2">
          groups
        </span>
        Over Ons
      </h1>
      <p className="max-w-3xl mx-auto text-lg md:text-xl font-light text-gray-600 leading-relaxed">
        De Koninklijke Loop wordt georganiseerd door een groep mensen die elkaar allemaal door het werken en leven in zorginstellingen hebben ontmoet.
      </p>
    </div>
  );
};

export default AboutHeader; 