import { api } from './api';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

class AuthService {
  private state: AuthState = {
    isAuthenticated: false,
    token: null
  };

  constructor() {
    // Check localStorage voor bestaande token
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.setToken(token);
    }
  }

  private setToken(token: string) {
    this.state.token = token;
    this.state.isAuthenticated = true;
    localStorage.setItem('auth_token', token);
    // Update Authorization header in API service
    api.setAuthHeader(`Bearer ${token}`);
  }

  public clearToken() {
    this.state.token = null;
    this.state.isAuthenticated = false;
    localStorage.removeItem('auth_token');
    api.clearAuthHeader();
  }

  public isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  public getToken(): string | null {
    return this.state.token;
  }
}

export const auth = new AuthService(); 