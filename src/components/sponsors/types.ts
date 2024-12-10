import { z } from 'zod';

export interface Sponsor {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export const SponsorSchema = z.object({
  id: z.string(),
  name: z.string(),
  // ... rest van de validatie
}); 