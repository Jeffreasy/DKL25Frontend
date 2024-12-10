import { 
  ApiResponse, 
  HttpStatus,
  RegistrationRequest,
  Registration,
  RegistrationUpdateRequest,
  RegistrationStatusResponse,
  ContactRequest,
  DonationRequest,
  Donation,
  Partner,
  PartnerCreateRequest,
  PartnerUpdateRequest,
  PaginationParams,
  User,
  RegistrationStatus
} from '@/types/api.types';
import { ApiError } from '@/types/errors';
import { 
  LoginCredentials, 
  AuthResponse,
  TokenValidationResponse
} from '@/types/auth.types';

class ApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
  }

  public setAuthHeader(value: string) {
    this.defaultHeaders['Authorization'] = value;
  }

  public clearAuthHeader() {
    delete this.defaultHeaders['Authorization'];
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = {
        ...this.defaultHeaders,
        ...options.headers,
      };

      const response = await fetch(url, { ...options, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          response.status as HttpStatus,
          data.error?.message || 'An error occurred',
          data.error?.details
        );
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message
        );
      }
      throw error;
    }
  }

  // Registratie endpoints
  public async createRegistration(data: RegistrationRequest): Promise<ApiResponse<Registration>> {
    return this.request('/registrations', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async getRegistration(id: string): Promise<ApiResponse<Registration>> {
    return this.request(`/registrations/${id}`);
  }

  public async updateRegistration(id: string, data: RegistrationUpdateRequest): Promise<ApiResponse<Registration>> {
    return this.request(`/registrations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  public async cancelRegistration(id: string, reason?: string): Promise<ApiResponse> {
    return this.request(`/registrations/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
  }

  // Contact endpoints
  public async sendContactForm(data: ContactRequest): Promise<ApiResponse<void>> {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Donatie endpoints
  public async createDonation(data: DonationRequest): Promise<ApiResponse<Donation>> {
    return this.request('/donations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Partner endpoints
  public async getPartners(): Promise<ApiResponse<Partner[]>> {
    return this.request('/partners');
  }

  public async createPartner(data: PartnerCreateRequest): Promise<ApiResponse<Partner>> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return this.request('/admin/partners', {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    });
  }

  public async updatePartner(id: string, data: PartnerUpdateRequest): Promise<ApiResponse<Partner>> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    return this.request(`/admin/partners/${id}`, {
      method: 'PATCH',
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    });
  }

  // Admin endpoints
  public async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request('/admin/users');
  }

  public async getRegistrations(params?: PaginationParams): Promise<ApiResponse<Registration[]>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return this.request(`/admin/registrations?${queryParams.toString()}`);
  }

  public async getDonations(): Promise<ApiResponse<Donation[]>> {
    return this.request('/admin/donations');
  }

  public async updateRegistrationStatus(id: string, status: RegistrationStatus): Promise<ApiResponse<void>> {
    return this.request(`/registrations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  // Auth endpoints
  public async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  public async validateToken(token: string): Promise<ApiResponse<TokenValidationResponse>> {
    return this.request('/auth/validate', {
      headers: {
        ...this.defaultHeaders,
        Authorization: `Bearer ${token}`
      }
    });
  }

  public async getRegistrationStatus(id: string): Promise<ApiResponse<RegistrationStatusResponse>> {
    return this.request(`/registrations/${id}/status`, {
      method: 'GET'
    });
  }
}

export const api = new ApiService(); 