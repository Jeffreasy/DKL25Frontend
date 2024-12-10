import { renderHook, act } from '@testing-library/react';
import { useAdmin } from './useAdmin';

// Mock de AdminContext
const mockLoadData = jest.fn();
const mockUpdateStatus = jest.fn();

jest.mock('../../contexts/AdminContext', () => ({
  useAdminContext: () => ({
    loading: false,
    error: null,
    loadData: mockLoadData,
    updateRegistrationStatus: mockUpdateStatus
  })
}));

describe('useAdmin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle data loading', async () => {
    const { result } = renderHook(() => useAdmin());

    await act(async () => {
      await result.current.refreshData();
    });

    expect(mockLoadData).toHaveBeenCalled();
    expect(result.current.operationState.loading).toBe(false);
  });

  it('should handle status updates', async () => {
    const { result } = renderHook(() => useAdmin());

    await act(async () => {
      await result.current.updateRegistrationStatus('123', 'approved');
    });

    expect(mockUpdateStatus).toHaveBeenCalledWith('123', 'approved');
  });

  it('should handle errors', async () => {
    mockLoadData.mockRejectedValueOnce(new Error('Test error'));
    
    const { result } = renderHook(() => useAdmin());

    await act(async () => {
      await result.current.refreshData();
    });

    expect(result.current.operationState.error).toBe('Test error');
  });
}); 