import React from 'react';
import { Link } from 'react-router-dom';
import { HiUserAdd, HiMail, HiClock, HiTrash, HiPencil } from 'react-icons/hi';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  lastLogin: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export const UserList: React.FC = () => {
  const users: User[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@dkl.nl',
      role: 'admin',
      lastLogin: '2024-03-15',
      createdAt: '2024-01-01',
      status: 'active'
    },
    // Meer mock data kan hier worden toegevoegd
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex justify-between p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Gebruikers</h2>
        <button className="inline-flex items-center px-4 py-2 bg-[#F47B20] text-white rounded-md hover:bg-[#F47B20]/90">
          <HiUserAdd className="w-5 h-5 mr-2" />
          <span>Nieuwe Gebruiker</span>
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Naam
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Laatste Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acties
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    to={`/admin/users/${user.id}`}
                    className="text-primary hover:text-primary-dark mr-4"
                  >
                    Details
                  </Link>
                  <button className="text-red-600 hover:text-red-900">
                    Verwijderen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div key={user.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                  }`}>
                  {user.role}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <HiMail className="w-4 h-4 mr-2" />
                {user.email}
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <HiClock className="w-4 h-4 mr-2" />
                {user.lastLogin}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${user.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}>
                  {user.status}
                </span>
                <div className="flex items-center space-x-3">
                  <Link 
                    to={`/admin/users/${user.id}`}
                    className="text-[#F47B20] hover:text-[#F47B20]/80 inline-flex items-center"
                  >
                    <HiPencil className="w-4 h-4" />
                  </Link>
                  <button className="text-red-600 hover:text-red-800">
                    <HiTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 