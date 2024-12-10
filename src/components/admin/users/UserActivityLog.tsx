import React from 'react';

interface ActivityLogEntry {
  id: string;
  action: string;
  timestamp: string;
  details: string;
  ipAddress?: string;
}

interface UserActivityLogProps {
  userId: string;
}

export const UserActivityLog: React.FC<UserActivityLogProps> = ({ userId }) => {
  // Mock data - vervang dit door echte API calls
  const activities: ActivityLogEntry[] = [
    {
      id: '1',
      action: 'Login',
      timestamp: '2024-03-15 14:30:00',
      details: `Gebruiker ${userId} succesvol ingelogd`,
      ipAddress: '192.168.1.1'
    },
    {
      id: '2',
      action: 'Profiel Update',
      timestamp: '2024-03-15 14:35:00',
      details: `Gebruiker ${userId} heeft email adres gewijzigd`,
      ipAddress: '192.168.1.1'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Activiteiten Log</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">🔍</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{activity.action}</h4>
                  <span className="text-sm text-gray-500">{activity.timestamp}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{activity.details}</p>
                {activity.ipAddress && (
                  <p className="mt-1 text-xs text-gray-500">IP: {activity.ipAddress}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 