import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

// Test component die een error gooit
const ThrowError = () => {
  throw new Error('Test error');
  return null;
};

describe('ErrorBoundary', () => {
  const originalError = console.error;
  const mockError = vi.fn();
  const mockOnError = vi.fn();

  beforeAll(() => {
    console.error = mockError;
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Er is iets misgegaan')).toBeInTheDocument();
    expect(screen.getByText(/Probeer de pagina te verversen/)).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>;
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('calls onError when error occurs', () => {
    render(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(mockOnError).toHaveBeenCalled();
    const [error] = mockOnError.mock.calls[0];
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Test error');
  });
}); 