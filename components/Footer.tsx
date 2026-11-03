import { Mail, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { company, offices } from '@/content/company';
import type { Locale } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { NAV } from '@/lib/site';
import { Logo } from './Logo';

const DEVELOPER_URL = 'https://www.linkedin.com/in/ali-abu-hatem-93b13927b/';

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink-2 text-steel-light">
      {/* Triangle pattern band */}
      <div className="tri-pattern on-dark h-16 bg-brand-deep md:h-20" aria-hidden="true">
        <div className="ruler-x absolute inset-x-0 bottom-0 text-white/25" />
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-14 md:grid-cols-2 md:px-8 lg:grid-cols-[1.2fr_2fr_1fr]">
        <div>
          <Logo mono />
          <p className="mt-5 max-w-xs">{t('tagline')}</p>
          <a
            href={`mailto:${company.email}`}
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-white underline-offset-4 hover:text-brand-bright hover:underline"
          >
            <Mail className="size-5" aria-hidden="true" />
            <span dir="ltr">{company.email}</span>
          </a>
        </div>

        <div>
          <h2 className="label-spaced mb-5 text-brand-bright">{t('offices')}</h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {offices.map((o) => (
              <li key={o.id}>
                <p className="font-display text-lg font-bold text-white">{o.name[locale]}</p>
                {o.address ? <p className="text-sm">{o.address[locale].join(', ')}</p> : null}
                <a
                  href={`tel:${o.phones[0].tel}`}
                  className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm text-white hover:text-brand-bright"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  <span dir="ltr" className="tabular">
                    {o.phones[0].display}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t('links')}>
          <h2 className="label-spaced mb-5 text-brand-bright">{t('links')}</h2>
          <ul>
            {NAV.map((n) => (
              <li key={n.key}>
                <Link href={n.href} className="flex min-h-11 items-center text-white hover:text-brand-bright">
                  {nav(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-4 text-sm md:flex-row md:items-center md:justify-between md:px-8">
          <p className="py-2">
            © {year} {company.legalName}. {t('rights')}
          </p>
          <p>
            {t('developedBy')}{' '}
            <a
              href={DEVELOPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-semibold text-white underline-offset-4 hover:text-brand-bright hover:underline"
            >
              {t('developer')}
              <span className="sr-only"> {t('newTab')}</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
