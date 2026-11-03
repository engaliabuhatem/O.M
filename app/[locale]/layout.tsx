import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { CSSProperties, ReactNode } from 'react';
import { ArabicFonts } from '@/components/ArabicFonts';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import type { Locale } from '@/content/types';
import { routing } from '@/i18n/routing';
import { organizationJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-barlow',
});
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter', preload: false });
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#2B2B2B',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('defaultTitle'), template: '%s | FCOM' },
    description: t('defaultDescription'),
    applicationName: t('siteName'),
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const isAr = locale === 'ar';
  // Ship only the namespaces client components use (keeps the HTML payload small).
  const all = await getMessages();
  const clientMessages = { nav: all.nav, projects: all.projects, contact: all.contact };

  // Arabic pages use self-hosted Cairo + IBM Plex Sans Arabic (globals.css), preloaded here only for /ar.
  // English pages use next/font Barlow Condensed + Inter. Neither locale downloads the other's fonts.
  const fontVars = isAr ? undefined : `${barlow.variable} ${inter.variable}`;

  return (
    <html lang={locale} dir={isAr ? 'rtl' : 'ltr'} className={fontVars}>
      <body
        style={
          {
            '--font-heading': isAr ? "'Cairo'" : 'var(--font-barlow)',
            '--font-body': isAr ? "'IBM Plex Sans Arabic', Tahoma" : 'var(--font-inter)',
          } as CSSProperties
        }
      >
        {isAr ? <ArabicFonts /> : null}
        <NextIntlClientProvider messages={clientMessages}>
          <Header />
          <main id="main" tabIndex={-1} className="pt-[76px] outline-none">
            {children}
          </main>
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale as Locale)) }}
        />
      </body>
    </html>
  );
}
