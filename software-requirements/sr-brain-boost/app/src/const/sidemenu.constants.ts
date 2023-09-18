export const APP_PAGES = [
  {
    title: 'Inicio',
    url: '/home',
    icon: 'home',
    disabled: false,
    allowedRoles: [1, 2, 3]
  },
  {
    title: 'Mi perfil',
    url: '/profile',
    icon: 'person',
    disabled: false,
    allowedRoles: [1, 2, 3]
  },
  {
    title: 'Cuentas asociadas',
    url: '/related-accounts',
    icon: 'people',
    disabled: false,
    allowedRoles: [1, 2, 3]
  },
  {
    title: 'Recordatorios',
    url: '/reminders',
    icon: 'ios-calendar',
    disabled: false,
    allowedRoles: [1]
  },
  {
    title: 'Aplicaciones',
    url: '/apps',
    icon: 'ios-apps',
    disabled: true,
    allowedRoles: [1, 2, 3]
  },
  {
    title: 'Juegos',
    url: '/games',
    icon: 'logo-game-controller-b',
    disabled: true,
    allowedRoles: [1, 2, 3]
  },
  {
    title: 'Estadísticas',
    url: '/stats',
    icon: 'stats',
    disabled: true,
    allowedRoles: [1, 2, 3]
  },
  {
    title: 'Notas Médicas',
    url: '/medical_notes',
    icon: 'create',
    disabled: true,
    allowedRoles: [1]
  },
  {
    title: 'Información',
    url: '/info',
    icon: 'information-circle-outline',
    disabled: true,
    allowedRoles: [1, 2, 3]
  },
  {
    title: 'Ajustes',
    url: '/settings',
    icon: 'cog',
    disabled: true,
    allowedRoles: [1, 2, 3]
  }
];
