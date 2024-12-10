import { renderHook } from '@testing-library/react';
import { useRegistration } from './useRegistration';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '@/services/api';
import type { FormData, Role } from '@/types/registration.types';
import { act } from 'react-dom/test-utils';

// Mock de API
vi.mock('@/services/api', () => ({
  api: {
    createRegistration: vi.fn()
  }
}));

describe('useRegistration', () => {
  const mockFormData: FormData = {
    personalInfo: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '0612345678',
      birthDate: '1990-01-01',
    },
    roleInfo: {
      role: 'runner' as Role,
      distance: 5,
    },
    medicalInfo: {
      conditions: '',
      dietary: '',
      allergies: '',
    },
    emergencyContact: {
      name: 'Emergency Contact',
      phone: '0687654321',
      relation: 'Family',
    },
    terms: {
      acceptedTerms: true,
      acceptedPrivacyPolicy: true,
      acceptedDate: new Date().toISOString(),
    },
  };

  const mockRequest = { formData: mockFormData };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('submits registration successfully', async () => {
    const mockApiResponse = { data: { success: true } };
    (api.createRegistration as ReturnType<typeof vi.fn>).mockResolvedValue(mockApiResponse);

    const { result } = renderHook(() => useRegistration());
    const response = await result.current.submitRegistration(mockRequest);

    expect(api.createRegistration).toHaveBeenCalledWith(mockRequest);
    expect(response).toEqual(mockApiResponse.data);
  });

  it('handles registration error', async () => {
    const mockError = new Error('Registration failed');
    (api.createRegistration as ReturnType<typeof vi.fn>).mockRejectedValue(mockError);

    const { result } = renderHook(() => useRegistration());
    
    await expect(result.current.submitRegistration(mockRequest)).rejects.toThrow('Registration failed');
    expect(api.createRegistration).toHaveBeenCalledWith(mockFormData);
  });

  it('tracks loading state during submission', async () => {
    (api.createRegistration as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ data: { success: true } }), 100))
    );

    const { result } = renderHook(() => useRegistration());
    
    expect(result.current.loading).toBe(false);
    
    let submitPromise: Promise<any>;
    await act(async () => {
      submitPromise = result.current.submitRegistration(mockRequest);
      expect(result.current.loading).toBe(true);
    });
    
    await submitPromise;
    expect(result.current.loading).toBe(false);
  });
}); 