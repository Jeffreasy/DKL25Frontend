import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactModal } from './ContactModal';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ContactModal', () => {
  const mockOnClose = vi.fn();
  const mockOnPrivacyClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly when open', () => {
    render(
      <ContactModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onPrivacyClick={mockOnPrivacyClick} 
      />
    );

    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /naam/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /e-mailadres/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /bericht/i })).toBeInTheDocument();
  });

  it('should submit form with valid data', async () => {
    render(
      <ContactModal 
        isOpen={true} 
        onClose={mockOnClose}
        onPrivacyClick={mockOnPrivacyClick}
      />
    );
    
    // Fill form using getByRole
    fireEvent.change(screen.getByRole('textbox', { name: /naam/i }), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /e-mailadres/i }), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /bericht/i }), {
      target: { value: 'Test bericht' }
    });
    
    // Submit form
    fireEvent.click(screen.getByText('Stuur mijn bericht'));
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should show validation errors for empty fields', async () => {
    render(
      <ContactModal 
        isOpen={true} 
        onClose={mockOnClose}
        onPrivacyClick={mockOnPrivacyClick}
      />
    );
    
    // Submit empty form
    fireEvent.click(screen.getByText('Stuur mijn bericht'));
    
    // Check validation errors
    await waitFor(() => {
      expect(screen.getByText('Naam is verplicht')).toBeInTheDocument();
      expect(screen.getByText('E-mailadres is verplicht')).toBeInTheDocument();
      expect(screen.getByText('Bericht is verplicht')).toBeInTheDocument();
    });
  });

  it('should close when clicking close button', () => {
    render(
      <ContactModal 
        isOpen={true} 
        onClose={mockOnClose}
        onPrivacyClick={mockOnPrivacyClick}
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /sluit contact formulier/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
}); 