import React, { useState } from 'react';
import { IconName, ICONS } from '../icons';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to?: string;
  icon: IconName;
  children: React.ReactNode;
  onClick?: () => void;
}

interface SocialLinkProps {
  href: string;
  icon: IconName;
}

interface NavbarProps {
  onInschrijfClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onInschrijfClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg h-16" aria-label="Hoofdnavigatie">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block relative" aria-label="Home">
              <img 
                src="https://res.cloudinary.com/dgfuv7wif/image/upload/v1733267882/664b8c1e593a1e81556b4238_0760849fb8_yn6vdm.png" 
                alt="Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
            <ul className="flex items-center space-x-8">
              <NavItem to="/" icon="home">Home</NavItem>
              <NavItem icon="register" onClick={onInschrijfClick}>Inschrijven</NavItem>
              <NavItem to="/over-ons" icon="about">Over Ons</NavItem>
              <NavItem to="/faq" icon="contact">Contact</NavItem>
              <NavItem to="/wat-is-de-koninklijkeloop" icon="info">DKL</NavItem>
            </ul>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 rounded-md text-white hover:bg-primary-dark transition-colors"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Menu openen"
          >
            <MenuIcon sx={{ fontSize: 24 }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-50 bg-primary transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="mobile-menu"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="block" aria-label="Home">
              <img 
                src="https://res.cloudinary.com/dgfuv7wif/image/upload/v1733267882/664b8c1e593a1e81556b4238_0760849fb8_yn6vdm.png" 
                alt="Logo" 
                className="h-12 w-auto"
              />
            </Link>
            <button 
              className="p-2 text-white hover:bg-primary-dark rounded-full transition-colors"
              onClick={toggleMenu}
              aria-label="Menu sluiten"
            >
              <CloseIcon sx={{ fontSize: 24 }} />
            </button>
          </div>
          
          <ul className="space-y-4 text-center">
            <NavItem to="/" icon="home">Home</NavItem>
            <NavItem icon="register" onClick={onInschrijfClick}>Inschrijven</NavItem>
            <NavItem to="/over-ons" icon="about">Over Ons</NavItem>
            <NavItem to="/faq" icon="contact">Contact</NavItem>
            <NavItem to="/wat-is-de-koninklijkeloop" icon="info">DKL</NavItem>
          </ul>

          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-sm text-white/90 font-medium mb-4">Volg ons</p>
            <div className="flex justify-center space-x-4">
              <SocialLink href="https://www.facebook.com/p/De-Koninklijke-Loop-61556315443279/" icon="facebook" />
              <SocialLink href="https://www.instagram.com/koninklijkeloop/" icon="instagram" />
              <SocialLink href="https://www.youtube.com/@DeKoninklijkeLoop" icon="youtube" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem: React.FC<NavItemProps> = ({ to, icon, children, onClick }) => (
  <li>
    {onClick ? (
      <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 px-4 py-2 text-white hover:bg-primary-dark rounded-lg transition-colors w-full"
      >
        <NavIcon name={icon} />
        <span className="font-medium">{children}</span>
      </button>
    ) : (
      <Link
        to={to || '/'}
        className="flex items-center justify-center gap-2 px-4 py-2 text-white hover:bg-primary-dark rounded-lg transition-colors w-full"
      >
        <NavIcon name={icon} />
        <span className="font-medium">{children}</span>
      </Link>
    )}
  </li>
);

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
  >
    <NavIcon name={icon} />
  </a>
);

const NavIcon: React.FC<{ name: IconName; size?: number }> = ({ name, size = 20 }) => {
  const Icon = ICONS[name];
  return <Icon sx={{ fontSize: size }} />;
};

export default Navbar;
