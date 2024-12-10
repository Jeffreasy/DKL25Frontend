export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  tier: 'gold' | 'silver' | 'bronze';
  since: string;
} 