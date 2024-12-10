import { 
  HiHome, 
  HiUserGroup, 
  HiCurrencyEuro,
  HiUsers,
  HiCog
} from 'react-icons/hi';
import type { IconType } from 'react-icons';

export interface AdminMenuItem {
  path: string;
  icon: IconType;
  label: string;
  roles?: string[];  // Voor role-based access
}

export const adminMenuItems: AdminMenuItem[] = [
  { path: '/admin', icon: HiHome, label: 'Dashboard' },
  { path: '/admin/registrations', icon: HiUserGroup, label: 'Inschrijvingen' },
  { path: '/admin/donations', icon: HiCurrencyEuro, label: 'Donaties' },
  { path: '/admin/users', icon: HiUsers, label: 'Gebruikers', roles: ['admin'] },
  { path: '/admin/settings', icon: HiCog, label: 'Instellingen', roles: ['admin'] }
]; 