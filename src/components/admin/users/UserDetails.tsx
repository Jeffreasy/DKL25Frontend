import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserPasswordReset } from './UserPasswordReset';
import { UserActivityLog } from './UserActivityLog';
import { UserPermissions } from './UserPermissions';

interface UserFormData {
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
}

type ActiveTab = 'profile' | 'permissions' | 'activity' | 'security';

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  
  const [formData, setFormData] = useState<UserFormData>({
    name: 'Admin User',
    email: 'admin@dkl.nl',
    role: 'admin',
    status: 'active'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update user:', formData);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Naam</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="user">Gebruiker</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="active">Actief</option>
                <option value="inactive">Inactief</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Opslaan
              </button>
            </div>
          </form>
        );
      case 'permissions':
        return (
          <UserPermissions 
            userId={id || ''} 
            onSave={(permissions) => console.log('Save permissions:', permissions)} 
          />
        );
      case 'activity':
        return <UserActivityLog userId={id || ''} />;
      case 'security':
        return (
          <UserPasswordReset
            userId={id || ''}
            onSuccess={() => console.log('Password reset success')}
            onCancel={() => setActiveTab('profile')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Gebruiker Details</h2>
          <button
            onClick={() => navigate('/admin/users')}
            className="text-gray-600 hover:text-gray-900"
          >
            Terug naar overzicht
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'profile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Profiel
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'permissions'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Rechten
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'activity'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Activiteit
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'security'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Beveiliging
            </button>
          </nav>
        </div>
      </div>

      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}; 