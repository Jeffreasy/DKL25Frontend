import type { SocialLink } from '../socials/types';

export interface FooterProps {
  onInschrijfClick: () => void;
}

export interface SocialLinkType {
  platform: SocialLink['platform'];
  url: string;
  hoverColor: string;
}

export interface QuickLinkType {
  text: string;
  to?: string;
  action?: () => void;
} 