import type { SocialLinkType, QuickLinkType } from './types';

export const socialLinks: SocialLinkType[] = [
  {
    platform: 'facebook',
    url: 'https://www.facebook.com/p/De-Koninklijke-Loop-61556315443279/',
    hoverColor: 'hover:bg-[#1877f2]'
  },
  {
    platform: 'youtube',
    url: 'https://www.youtube.com/@DeKoninklijkeLoop',
    hoverColor: 'hover:bg-[#ff0000]'
  },
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/koninklijkeloop/',
    hoverColor: 'hover:bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]'
  }
];

export const createQuickLinks = (onInschrijfClick: () => void): QuickLinkType[] => [
  {
    text: 'Wat is De Koninklijke Loop?',
    to: '/wat-is-de-koninklijkeloop'
  },
  {
    text: 'Inschrijven 2025',
    action: onInschrijfClick
  },
  {
    text: 'Over Ons',
    to: '/over-ons'
  },
  {
    text: 'Contact',
    to: '/faq'
  }
]; 