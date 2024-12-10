import React from 'react';
import type { SocialLink } from './types';
import { socialLinks } from './data';
import SocialIcon from './SocialIcon';

const DKLSocials: React.FC = () => {
  return (
    <section className="bg-gray-900 py-20 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 relative">
          <h2 className="text-[clamp(1.75rem,4vw,2rem)] text-white font-semibold mb-5">
            Volg ons op sociale media
          </h2>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-primary rounded-full" />
        </div>

        {/* Social Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 max-w-[800px] mx-auto">
          {socialLinks.map((social: SocialLink) => (
            <a
              key={social.platform}
              href={social.url}
              className={`
                aspect-square flex items-center justify-center
                rounded-2xl transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-primary/40
                ${social.bgColorClass}
              `}
              aria-label={`Volg ons op ${social.platform}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon
                platform={social.platform}
                className={`w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110 ${social.iconColorClass}`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DKLSocials; 