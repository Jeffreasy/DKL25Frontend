import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { adminMenuItems } from '@/config/admin.config';

export const AdminSidebar: React.FC = () => {
  const { hasAccess } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {adminMenuItems
            .filter(item => hasAccess(item.roles))
            .map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon 
                      className={`
                        mr-3 h-5 w-5
                        ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}; 