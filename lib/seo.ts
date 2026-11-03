import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { company, offices } from '@/content/company';
import type { Locale } from '@/content/types';
import { SITE_URL } from './site';

type PageKey = 'home' | 'about' | 'services' | 'projects' | 'equipment' | 'contact';

const PATHS: Record<PageKey, string> = {
  home: '/',
  about: '/about/',
  services: '/services/',
  projects: '/projects/',
  equipment: '/equipment/',
  contact: '/contact/',
};

export const localeUrl = (locale: Locale, path: string) => `${SITE_URL}/${locale}${path === '/' ? '/' : path}`;

export async function pageMetadata(locale: Locale, page: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const path = PATHS[page];
  const title = page === 'home' ? t('defaultTitle') : `${t(`${page}.title`)} | FCOM`;
  const description = t(`${page}.description`);
  const url = localeUrl(locale, path);
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        en: localeUrl('en', path),
        ar: localeUrl('ar', path),
        'x-default': localeUrl('en', path),
      },
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: t('siteName'),
      locale: locale === 'ar' ? 'ar_YE' : 'en_US',
      alternateLocale: locale === 'ar' ? ['en_US'] : ['ar_YE'],
      images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: t('siteName') }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}/og.jpg`] },
  };
}

export function organizationJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE_URL}/#organization`,
    name: company.legalName,
    alternateName: company.shortName,
    url: `${SITE_URL}/${locale}/`,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/og.jpg`,
    email: company.email,
    foundingDate: String(company.founded),
    areaServed: ['YE', 'AE', 'SA', 'CA'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Airport Zone, Khormaksar',
      addressLocality: 'Aden',
      addressCountry: 'YE',
    },
    telephone: offices.find((o) => o.hq)?.phones[0].tel,
    department: offices.map((o) => ({
      '@type': 'Organization',
      name: `${company.legalName} — ${o.name.en}`,
      email: company.email,
      telephone: o.phones.map((p) => p.tel),
      address: {
        '@type': 'PostalAddress',
        ...(o.address ? { streetAddress: o.address.en[0] } : {}),
        ...(o.id === 'uae' ? { addressLocality: 'Dubai' } : {}),
        ...(o.id === 'canada' ? { addressLocality: 'Oakville', addressRegion: 'ON', postalCode: 'L6H 5R7' } : {}),
        ...(o.id === 'yemen' ? { addressLocality: 'Aden' } : {}),
        addressCountry: o.country,
      },
    })),
  };
}
