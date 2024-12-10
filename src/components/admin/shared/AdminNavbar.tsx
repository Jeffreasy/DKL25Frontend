import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { HiMenuAlt2 } from 'react-icons/hi';
import { adminMenuItems } from '@/config/admin.config';

interface AdminNavbarProps {
  onMenuClick: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { logout, hasAccess } = useAuth();

  const visibleMenuItems = adminMenuItems.filter(item => hasAccess(item.roles));

  return (
    <nav className="bg-[#F47B20] h-16">
      <div className="h-full px-4">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden mr-3 text-white hover:text-white/80"
            >
              <HiMenuAlt2 className="h-6 w-6" />
            </button>
            <Link to={visibleMenuItems[0]?.path || '/'} className="flex items-center">
              <img 
                className="h-8 w-auto mr-2" 
                src="/images/logo.png" 
                alt="DKL Logo" 
              />
              <span className="text-lg font-medium text-white">Admin Panel</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm text-white hover:text-white/80">
              Terug naar website
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="px-4 py-2 bg-white text-[#F47B20] rounded-md text-sm font-medium hover:bg-white/90"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 