import React, { useState } from 'react';

interface Permission {
  id: string;
  name: string;
  description: string;
  granted: boolean;
}

interface UserPermissionsProps {
  userId: string;
  onSave?: (permissions: string[]) => void;
}

export const UserPermissions: React.FC<UserPermissionsProps> = ({ userId, onSave }) => {
  // Mock data - vervang dit door echte API calls
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: `${userId}_users_view`,
      name: 'Gebruikers Bekijken',
      description: 'Kan alle gebruikers bekijken',
      granted: true
    },
    {
      id: 'users_edit',
      name: 'Gebruikers Bewerken',
      description: 'Kan gebruikersgegevens aanpassen',
      granted: false
    },
    {
      id: 'registrations_manage',
      name: 'Inschrijvingen Beheren',
      description: 'Kan inschrijvingen goedkeuren en afwijzen',
      granted: true
    }
  ]);

  const handleTogglePermission = (permissionId: string) => {
    setPermissions(permissions.map(permission => 
      permission.id === permissionId 
        ? { ...permission, granted: !permission.granted }
        : permission
    ));
  };

  const handleSave = () => {
    const grantedPermissions = permissions
      .filter(p => p.granted)
      .map(p => p.id);
    onSave?.(grantedPermissions);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Gebruikersrechten</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  checked={permission.granted}
                  onChange={() => handleTogglePermission(permission.id)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-900">
                  {permission.name}
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  {permission.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Rechten Opslaan
          </button>
        </div>
      </div>
    </div>
  );
}; 