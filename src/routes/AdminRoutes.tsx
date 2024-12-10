import React, { ComponentType, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/admin/shared/AdminLayout';
import { adminMenuItems, type AdminMenuItem } from '../config/admin.config';
import { useAuth } from '../hooks/auth';

// Lazy load admin pages
const Dashboard = React.lazy(() => import('../pages/admin/Dashboard').then(m => ({ default: m.Dashboard })));
const Registrations = React.lazy(() => import('../pages/admin/Registrations').then(m => ({ default: m.Registrations })));
const Donations = React.lazy(() => import('../pages/admin/Donations').then(m => ({ default: m.Donations })));
const Users = React.lazy(() => import('../pages/admin/Users').then(m => ({ default: m.Users })));
const Settings = React.lazy(() => import('../pages/admin/Settings').then(m => ({ default: m.Settings })));

type RouteComponents = {
  [K in AdminMenuItem['path']]: React.LazyExoticComponent<ComponentType<any>>;
};

const routeComponents: RouteComponents = {
  '/admin': Dashboard,
  '/admin/registrations': Registrations,
  '/admin/donations': Donations,
  '/admin/users': Users,
  '/admin/settings': Settings,
} as const;

export const AdminRoutes = () => {
  const { hasAccess } = useAuth();
  const accessibleItems = adminMenuItems.filter(item => hasAccess(item.roles));

  return (
    <Routes>
      {accessibleItems.map(item => {
        const Component = routeComponents[item.path];
        return (
          <Route
            key={item.path}
            path={item.path}
            element={
              <AdminLayout title={item.label} requiredRoles={item.roles}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Component />
                </Suspense>
              </AdminLayout>
            }
          />
        );
      })}
      <Route path="*" element={<Navigate to={accessibleItems[0]?.path || '/'} replace />} />
    </Routes>
  );
}; 