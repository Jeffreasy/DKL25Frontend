import { api } from './api';
import { HttpStatus } from '@/types/api.types';

describe('ApiService', () => {
  beforeEach(() => {
    // Reset de fetch mock voor elke test
    (global.fetch as jest.Mock).mockReset();
  });

  describe('createRegistration', () => {
    const mockRegistrationData = {
      formData: {
        personalInfo: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: '0612345678',
          birthDate: '1990-01-01'
        },
        roleInfo: {
          role: 'runner' as const,
          distance: 5
        },
        medicalInfo: {
          conditions: '',
          dietary: '',
          allergies: ''
        },
        emergencyContact: {
          name: 'Emergency Contact',
          phone: '0687654321',
          relation: 'Family'
        },
        terms: {
          acceptedTerms: true,
          acceptedPrivacyPolicy: true,
          acceptedDate: '2024-01-01'
        }
      }
    };

    it('successfully creates a registration', async () => {
      const mockResponse = {
        data: {
          id: '123',
          status: 'pending',
          ...mockRegistrationData,
          createdAt: '2024-01-01T12:00:00Z',
          updatedAt: '2024-01-01T12:00:00Z'
        }
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const response = await api.createRegistration(mockRegistrationData);
      expect(response.data).toEqual(mockResponse.data);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/registrations'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockRegistrationData)
        })
      );
    });

    it('handles API errors correctly', async () => {
      const errorMessage = 'Invalid registration data';
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: HttpStatus.BAD_REQUEST,
        json: () => Promise.resolve({
          error: {
            code: HttpStatus.BAD_REQUEST,
            message: errorMessage
          }
        })
      });

      await expect(api.createRegistration(mockRegistrationData))
        .rejects
        .toThrow(errorMessage);
    });
  });

  describe('getRegistrationStatus', () => {
    it('successfully retrieves registration status', async () => {
      const mockStatus = {
        status: 'pending' as const,
        updatedAt: '2024-01-01T12:00:00Z'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: mockStatus })
      });

      const response = await api.getRegistrationStatus('123');
      expect(response.data).toEqual(mockStatus);
    });
  });
}); 