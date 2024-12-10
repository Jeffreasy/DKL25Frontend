import { useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api';
import { User } from '@/types/types';
import { LoginCredentials } from '@/types/auth.types';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const response = await api.validateToken(token);
        if (response.data?.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await api.login(credentials);
      if (response.data) {
        const { token, user } = response.data;
        localStorage.setItem('auth_token', token);
        setUser(user);
        setIsAuthenticated(true);
        return user;
      }
      throw new Error('Invalid response data');
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasAccess = useCallback((requiredRoles?: string[]) => {
    if (!requiredRoles || requiredRoles.length === 0) return true;
    return requiredRoles.some(role => user?.role === role);
  }, [user]);

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    hasAccess
  };
}; 