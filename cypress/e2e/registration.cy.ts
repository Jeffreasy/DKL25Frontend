import { format } from 'date-fns';

describe('Registration Flow', () => {
  beforeEach(() => {
    cy.visit('/inschrijven');
  });

  it('should complete full registration process', () => {
    // Personal Information
    cy.get('[data-cy="firstName"]').type('John');
    cy.get('[data-cy="lastName"]').type('Doe');
    cy.get('[data-cy="email"]').type('john.doe@example.com');
    cy.get('[data-cy="phone"]').type('0612345678');
    cy.get('[data-cy="birthDate"]').type(format(new Date(), 'yyyy-MM-dd'));

    // Role Selection
    cy.get('[data-cy="role-runner"]').click();
    
    // Distance Selection (only for runners)
    cy.get('[data-cy="distance-5km"]').click();

    // Terms Acceptance
    cy.get('[data-cy="terms-checkbox"]').click();
    
    // Submit Registration
    cy.get('[data-cy="submit-registration"]').click();

    // Verify Success
    cy.get('[data-cy="success-message"]')
      .should('be.visible')
      .and('contain', 'Bedankt voor je inschrijving');
  });

  it('should show validation errors', () => {
    // Try to submit without data
    cy.get('[data-cy="submit-registration"]').click();

    // Verify validation messages
    cy.get('[data-cy="error-firstName"]')
      .should('be.visible')
      .and('contain', 'Voornaam is verplicht');
    
    cy.get('[data-cy="error-email"]')
      .should('be.visible')
      .and('contain', 'E-mailadres is verplicht');
  });

  it('should handle role-specific fields', () => {
    // Select Runner
    cy.get('[data-cy="role-runner"]').click();
    cy.get('[data-cy="distance-selection"]').should('be.visible');

    // Switch to Volunteer
    cy.get('[data-cy="role-volunteer"]').click();
    cy.get('[data-cy="distance-selection"]').should('not.exist');
  });

  it('should validate email format', () => {
    cy.get('[data-cy="email"]').type('invalid-email');
    cy.get('[data-cy="submit-registration"]').click();
    
    cy.get('[data-cy="error-email"]')
      .should('be.visible')
      .and('contain', 'Ongeldig e-mailadres');

    cy.get('[data-cy="email"]')
      .clear()
      .type('valid@example.com');
    
    cy.get('[data-cy="error-email"]').should('not.exist');
  });

  it('should handle terms modal', () => {
    // Open terms modal
    cy.get('[data-cy="terms-link"]').click();
    
    // Verify modal content
    cy.get('[data-cy="terms-modal"]')
      .should('be.visible')
      .and('contain', 'Algemene Voorwaarden');

    // Close modal
    cy.get('[data-cy="close-terms-modal"]').click();
    cy.get('[data-cy="terms-modal"]').should('not.exist');
  });

  it('should persist form data between steps', () => {
    // Fill personal info
    cy.get('[data-cy="firstName"]').type('John');
    cy.get('[data-cy="lastName"]').type('Doe');
    
    // Switch roles back and forth
    cy.get('[data-cy="role-runner"]').click();
    cy.get('[data-cy="role-volunteer"]').click();
    cy.get('[data-cy="role-runner"]').click();

    // Verify data persists
    cy.get('[data-cy="firstName"]').should('have.value', 'John');
    cy.get('[data-cy="lastName"]').should('have.value', 'Doe');
  });
}); 