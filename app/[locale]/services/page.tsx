import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';
import { Picture } from '@/components/Picture';
import { SectionHeading } from '@/components/SectionHeading';
import { ButtonLink, Container, PageHero } from '@/components/ui';
import { services } from '@/content/services';
import type { Locale } from '@/content/types';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'services');
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');

  return (
    <>
      <PageHero number="05" label={t('label')} title={t('title')} lead={t('lead')} />

      {/* Jump nav */}
      <section className="border-b border-line bg-concrete" aria-label={t('jump')}>
        <Container className="py-10">
          <nav aria-label={t('jump')}>
            <ul className="flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="flex min-h-11 items-center border border-line bg-white px-4 text-sm font-semibold text-ink hover:border-brand hover:text-brand-deep"
                  >
                    {s.title[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading number="06" label={t('servicesLabel')} title={t('title')} id="services-title" />
          <div className="space-y-20 md:space-y-28">
            {services.map((s, i) => (
              <article key={s.slug} id={s.slug} className="grid scroll-mt-28 gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
                <div className={cn('lg:col-span-6', i % 2 === 1 && 'lg:order-2')}>
                  <div className="frame-ticks aspect-[16/10] overflow-hidden bg-concrete">
                    <Picture slug={s.image} alt={s.imageAlt[locale]} sizes="(min-width: 1024px) 45vw, 100vw" imgClassName="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-4">
                    <span aria-hidden="true" className="font-display text-5xl font-extrabold text-brand tabular">
                      {String(i + 7).padStart(2, '0')}
                    </span>
                    <Icon name={s.icon} className="size-9 text-ink" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 text-3xl font-extrabold uppercase md:text-4xl rtl:normal-case">{s.title[locale]}</h3>
                  <p className="mt-4 text-lg">{s.summary[locale]}</p>
                  {s.bulletsTitle ? <p className="label-spaced mt-6 text-brand-deep">{s.bulletsTitle[locale]}</p> : null}
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b.en} className="flex gap-3 border-t border-line pt-3">
                        <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                        <span className="text-ink">{b[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <ButtonLink href="/sectors" variant="secondary" arrow className="mt-20">
            {t('sectorsLink')}
          </ButtonLink>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
