import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegistrationForm } from './RegistrationForm';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../hooks/form/useRegistration', () => ({
  useRegistration: () => ({
    loading: false,
    error: null,
    submitRegistration: vi.fn().mockResolvedValue(undefined)
  })
}));

describe('RegistrationForm', () => {
  const fillPersonalInfo = () => {
    userEvent.type(screen.getByLabelText('Voornaam'), 'John');
    userEvent.type(screen.getByLabelText('Achternaam'), 'Doe');
    userEvent.type(screen.getByLabelText('E-mailadres'), 'john@example.com');
    userEvent.type(screen.getByLabelText('Telefoonnummer'), '0612345678');
    userEvent.type(screen.getByLabelText('Geboortedatum'), '1990-01-01');
  };

  const selectRole = (role: string) => {
    const roleCard = screen.getByText(role).closest('label');
    if (roleCard) fireEvent.click(roleCard);
  };

  const acceptTerms = () => {
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
  };

  beforeEach(() => {
    render(<RegistrationForm />);
  });

  it('should show validation errors when submitting empty form', async () => {
    fireEvent.click(screen.getByText('Inschrijven'));

    await waitFor(() => {
      expect(screen.getByText('Voornaam is verplicht')).toBeInTheDocument();
      expect(screen.getByText('Achternaam is verplicht')).toBeInTheDocument();
      expect(screen.getByText('E-mailadres is verplicht')).toBeInTheDocument();
    });
  });

  it('should complete registration successfully', async () => {
    // Fill personal info
    fillPersonalInfo();

    // Select role
    selectRole('Hardloper');

    // Accept terms
    acceptTerms();

    // Submit form
    fireEvent.click(screen.getByText('Inschrijven'));

    // Check success message
    await waitFor(() => {
      expect(screen.getByText(/Bedankt voor je inschrijving/i)).toBeInTheDocument();
    });
  });

  it('should show different fields based on selected role', async () => {
    // Select runner role
    selectRole('Hardloper');
    expect(screen.getByText(/Kies je afstand/i)).toBeInTheDocument();

    // Select volunteer role
    selectRole('Vrijwilliger');
    expect(screen.queryByText(/Kies je afstand/i)).not.toBeInTheDocument();
  });

  it('should validate email format', async () => {
    fillPersonalInfo();
    const emailInput = screen.getByLabelText('E-mailadres');
    
    // Invalid email
    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'invalid-email');
    fireEvent.click(screen.getByText('Inschrijven'));

    await waitFor(() => {
      expect(screen.getByText('Ongeldig e-mailadres')).toBeInTheDocument();
    });

    // Valid email
    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'valid@example.com');
    fireEvent.click(screen.getByText('Inschrijven'));

    await waitFor(() => {
      expect(screen.queryByText('Ongeldig e-mailadres')).not.toBeInTheDocument();
    });
  });

  it('should require terms acceptance', async () => {
    render(<RegistrationForm />);
    
    // Fill in required fields first
    fillPersonalInfo();
    selectRole('Hardloper');
    
    // Submit without accepting terms
    fireEvent.click(screen.getByText('Inschrijven'));
    
    await waitFor(() => {
      expect(screen.getByText(/Je moet akkoord gaan met de voorwaarden/i)).toBeInTheDocument(); 
    });
  });
}); 