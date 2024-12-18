import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home',
    link: '/home',
    home: true
  },
  {
    title: 'Pólizas',
    icon: 'credit-card-outline',
    link: '/pages/polizas',
  },
  {
    title: 'Lista de Pólizas',
    icon: 'list-outline',
    link: '/pages/lista-polizas',
  }
]