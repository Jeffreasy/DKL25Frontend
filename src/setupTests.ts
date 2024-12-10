import { vi } from 'vitest'
import '@testing-library/jest-dom';
import './test/test-utils';

// Mock voor fetch API
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

// Reset alle mocks na elke test
afterEach(() => {
  vi.resetAllMocks();
});