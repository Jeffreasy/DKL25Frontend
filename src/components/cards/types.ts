import type { SvgIconComponent } from '@mui/icons-material';

export type CTAActionType = 'inschrijven' | 'doneren' | 'navigate';

export interface CTACardData {
  title: string;
  description: string;
  icon: SvgIconComponent;
  buttonText: string;
  actionType: CTAActionType;
  path?: string;
}

export interface CTACardProps extends CTACardData {
  onClick: () => void;
} 