import React from 'react';
import { sponsors } from './data';

const DKLSponsors: React.FC = () => {
  return (
    <section 
      className="py-20 px-5 bg-white"
      aria-labelledby="sponsors-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 relative">
          <h2 
            id="sponsors-title"
            className="text-[clamp(2rem,4vw,2.75rem)] text-gray-900 font-bold mb-4 tracking-tight"
          >
            Onze Sponsors
          </h2>
          <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-600 max-w-2xl mx-auto mb-6">
            Deze geweldige partners maken De Koninklijke Loop mogelijk
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-primary rounded-full" />
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sponsors
            .sort((a, b) => a.order - b.order)
            .map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Logo Container */}
                <div className="aspect-[3/2] p-6 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  <img
                    src={sponsor.logoUrl}
                    alt={`${sponsor.name} logo`}
                    className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/fallback-logo.png'
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {sponsor.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {sponsor.description}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </a>
            ))}
        </div>
      </div>
    </section>
  );
};

export default DKLSponsors; 