import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminNavbar } from './AdminNavbar';
import { useAuth } from '@/hooks/auth';
import { Navigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  requiredRoles?: string[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title,
  actions,
  requiredRoles 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { hasAccess } = useAuth();

  if (!hasAccess(requiredRoles)) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex">
        <div className={`
          lg:block fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <AdminSidebar />
        </div>
        <main className="flex-1 lg:pl-64 p-8">
          {(title || actions) && (
            <div className="flex justify-between items-center mb-8">
              {title && (
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              )}
              {actions && (
                <div className="flex items-center space-x-4">
                  {actions}
                </div>
              )}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}; 