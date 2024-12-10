import React from 'react';
import { useAuth } from '@/hooks/auth';
import { Link } from 'react-router-dom';
import { adminMenuItems } from '@/config/admin.config';

export const AdminHeader: React.FC = () => {
  const { user, logout, hasAccess } = useAuth();
  const defaultPath = adminMenuItems.find(item => hasAccess(item.roles))?.path || '/';

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={defaultPath} className="text-xl font-bold text-primary">
              DKL Admin
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {user?.name}
            </span>
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}; 