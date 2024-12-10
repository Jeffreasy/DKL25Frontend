import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { CTACardData } from './types';

export const ctaCardsData: CTACardData[] = [
  {
    title: "Schrijf je in",
    description: "Vanaf 15 januari 2025 start de inschrijving",
    icon: EmailIcon,
    buttonText: "Inschrijven",
    actionType: 'inschrijven'
  },
  {
    title: "Over ons",
    description: "Wie zijn de mensen achter De Koninklijke Loop. We stellen ons graag even voor!",
    icon: GroupsIcon,
    buttonText: "Wie zijn wij",
    actionType: 'navigate',
    path: '/overons'
  },
  {
    title: "Ondersteun ons",
    description: "Help mee om samen geld in te zamelen voor het Liliane Fonds!",
    icon: FavoriteIcon,
    buttonText: "Doneren",
    actionType: 'doneren'
  }
]; 