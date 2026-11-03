/**
 * Sub-path the site is served from, e.g. "/O.M" on GitHub Pages (https://<user>.github.io/O.M/).
 * Empty for a domain root (Vercel, Nginx). Set NEXT_PUBLIC_BASE_PATH at build time.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

/** Prefix a root-relative public asset path ("/images/x.webp") with the base path. */
export const withBase = (path: string) => `${BASE_PATH}${path}`;

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
