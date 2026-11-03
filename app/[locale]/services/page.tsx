import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';
import { Picture } from '@/components/Picture';
import { SectionHeading } from '@/components/SectionHeading';
import { Container, PageHero } from '@/components/ui';
import { activitySectors, sectors } from '@/content/sectors';
import { pillars, services } from '@/content/services';
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

      {/* Fields of work + jump nav */}
      <section className="border-b border-line bg-concrete" aria-labelledby="fields-title">
        <Container className="py-12">
          <h2 id="fields-title" className="label-spaced mb-6 text-brand-deep">
            {t('fields')}
          </h2>
          <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p) => (
              <li key={p.id} className="flex items-start gap-3 bg-concrete p-4">
                <span className="font-display text-2xl font-extrabold text-brand-deep tabular">{p.no}</span>
                <div>
                  <p className="font-display text-lg font-bold text-ink uppercase rtl:normal-case">{p.title[locale]}</p>
                  <p className="text-sm">{p.text[locale]}</p>
                </div>
              </li>
            ))}
          </ol>
          <nav aria-label={t('jump')} className="mt-8">
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
              {sectors.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex min-h-11 items-center border border-ink bg-ink px-4 text-sm font-semibold text-white hover:bg-brand-deep"
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
        </Container>
      </section>

      {/* Sectors */}
      {sectors.map((sec, si) => (
        <section
          key={sec.id}
          id={sec.id}
          aria-labelledby={`${sec.id}-title`}
          className={cn('scroll-mt-20 py-20 md:py-28', si === 0 ? 'tri-pattern on-dark bg-ink text-white' : 'tri-pattern bg-concrete')}
        >
          <Container>
            <SectionHeading
              number={String(14 + si).padStart(2, '0')}
              tone={si === 0 ? 'dark' : 'light'}
              label={t('sectorsLabel')}
              title={sec.title[locale]}
              lead={sec.lead[locale]}
              id={`${sec.id}-title`}
            />
            <div className={cn('grid gap-6', sec.sub.length > 2 ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2')}>
              {sec.sub.map((sub) => (
                <article
                  key={sub.id}
                  id={sub.id}
                  className={cn('scroll-mt-28 p-6 md:p-8', si === 0 ? 'border border-white/15 bg-ink-2' : 'bg-white')}
                >
                  <h3 className={cn('text-2xl font-extrabold uppercase rtl:normal-case', si === 0 && 'text-white')}>{sub.title[locale]}</h3>
                  <p className={cn('mt-2', si === 0 ? 'text-steel-light' : '')}>{sub.lead[locale]}</p>
                  {sub.groups.map((g, gi) => (
                    <div key={gi} className="mt-5">
                      {g.title ? (
                        <p className={cn('label-spaced mb-2', si === 0 ? 'text-brand-bright' : 'text-brand-deep')}>{g.title[locale]}</p>
                      ) : null}
                      <ul className="space-y-2">
                        {g.items.map((it) => (
                          <li key={it.en} className="flex gap-3">
                            <Check className={cn('mt-1 size-4 shrink-0', si === 0 ? 'text-brand-bright' : 'text-brand')} aria-hidden="true" />
                            <span className={si === 0 ? 'text-white' : 'text-ink'}>{it[locale]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </article>
              ))}
            </div>
            {si === 0 ? (
              <div className="mt-12">
                <h3 className="label-spaced mb-4 text-brand-bright">{t('activities')}</h3>
                <ul className="flex flex-wrap gap-2">
                  {activitySectors.map((a) => (
                    <li key={a.en} className="border border-white/25 px-4 py-2 text-white">
                      {a[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Container>
        </section>
      ))}

      <CtaBand locale={locale} />
    </>
  );
}
