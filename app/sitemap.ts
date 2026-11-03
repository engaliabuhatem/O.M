import type { MetadataRoute } from 'next';
import { localeUrl } from '@/lib/seo';

export const dynamic = 'force-static';

const PAGES = ['/', '/about/', '/services/', '/projects/', '/equipment/', '/contact/'];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((path) =>
    (['en', 'ar'] as const).map((locale) => ({
      url: localeUrl(locale, path),
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : path === '/projects/' ? 0.9 : 0.7,
      alternates: { languages: { en: localeUrl('en', path), ar: localeUrl('ar', path) } },
    })),
  );
}
