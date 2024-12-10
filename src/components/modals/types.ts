import type { Partner } from '@/types/api.types';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ContactModalProps extends BaseModalProps {
  onPrivacyClick: () => void;
}

export interface TermsModalProps extends BaseModalProps {
  onScrollComplete?: () => void;
}

export interface PartnerModalProps extends BaseModalProps {
  partner: Partner;
}

export interface DonatieModalProps extends BaseModalProps {
  // Geen extra props nodig
}

export interface InschrijfModalProps extends BaseModalProps {
  // Geen extra props nodig
}

export interface PrivacyModalProps extends BaseModalProps {
  // Geen extra props nodig
}

export interface ContactFormData {
  naam: string;
  email: string;
  telefoon?: string;
  bericht: string;
  website?: string; // honeypot
  startTime: number;
} 