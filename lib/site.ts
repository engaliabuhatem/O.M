export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.fc-om.com').replace(/\/$/, '');

export const NAV = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/projects', key: 'projects' },
  { href: '/equipment', key: 'equipment' },
  { href: '/contact', key: 'contact' },
] as const;

export type NavKey = (typeof NAV)[number]['key'];
