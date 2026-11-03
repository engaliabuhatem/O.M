import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';
import { Picture } from '@/components/Picture';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Container, PageHero } from '@/components/ui';
import { company } from '@/content/company';
import { systems } from '@/content/systems';
import type { Locale } from '@/content/types';
import { stagger } from '@/lib/motion';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'about');
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <>
      <PageHero number="01" label={t('label')} title={t('title')} lead={company.about.lead[locale]} />

      {/* Story */}
      <section className="py-20 md:py-28" aria-labelledby="core-title">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xl text-ink md:text-2xl">{company.about.body[locale]}</p>
            <h2 id="core-title" className="label-spaced mt-10 mb-5 text-brand-deep">
              {t('coreTitle')}
            </h2>
            <ul className="space-y-3">
              {company.about.core.map((c) => (
                <li key={c.en} className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>{c[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="frame-ticks self-start">
            <Picture
              slug="site-team"
              alt={t('teamCaption')}
              sizes="(min-width: 1024px) 45vw, 100vw"
              imgClassName="w-full h-auto"
            />
            <figcaption className="mt-3 text-sm">{t('teamCaption')}</figcaption>
          </figure>
        </Container>
      </section>

      {/* Mission + vision */}
      <section className="tri-pattern on-dark bg-ink py-20 text-white md:py-28" aria-label={`${t('mission')} / ${t('vision')}`}>
        <Container className="grid gap-px bg-white/10 md:grid-cols-2">
          {(
            [
              ['02', t('mission'), company.mission[locale]],
              ['03', t('vision'), company.vision[locale]],
            ] as const
          ).map(([no, label, text]) => (
            <div key={no} className="bg-ink p-8 md:p-12">
              <span aria-hidden="true" className="font-display text-6xl font-extrabold text-brand-bright tabular">
                {no}
              </span>
              <h2 className="label-spaced mt-4 text-brand-bright">{label}</h2>
              <p className="mt-4 text-xl text-white md:text-2xl">{text}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28" aria-labelledby="values-title">
        <Container>
          <SectionHeading number="04" label={t('valuesLabel')} title={t('valuesTitle')} id="values-title" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {company.values.map((v, i) => (
              <Reveal as="li" key={v.id} delay={stagger(i)} className="border-t-4 border-brand bg-concrete p-6">
                <Icon name={v.icon} className="size-9 text-ink" strokeWidth={1.5} />
                <h3 className="mt-5 text-2xl font-extrabold uppercase rtl:normal-case">{v.title[locale]}</h3>
                <p className="mt-2">{v.text[locale]}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Management systems */}
      <section id="systems" className="tri-pattern bg-concrete py-20 md:py-28" aria-labelledby="systems-title">
        <Container>
          <SectionHeading number="05" label={t('systemsLabel')} title={t('systemsTitle')} id="systems-title" />
          <div className="grid gap-6 lg:grid-cols-2">
            {systems.map((s, i) => (
              <Reveal as="article" key={s.id} delay={stagger(i)} className="flex gap-5 bg-white p-6 md:p-8">
                <Icon name={s.icon} className="size-10 shrink-0 text-brand" strokeWidth={1.5} />
                <div>
                  <h3 id={s.id} className="text-2xl font-extrabold uppercase rtl:normal-case">
                    {s.title[locale]}
                  </h3>
                  <p className="mt-2">{s.lead[locale]}</p>
                  {s.bullets ? (
                    <ul className="mt-4 space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b.en} className="flex gap-3">
                          <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                          <span>{b[locale]}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Advantages */}
      <section className="py-20 md:py-28" aria-labelledby="adv-title">
        <Container>
          <SectionHeading number="06" label={t('advantagesLabel')} title={t('advantagesTitle')} id="adv-title" />
          <ol className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {company.advantages.map((a, i) => (
              <li key={a.title.en} className="flex gap-4">
                <span aria-hidden="true" className="font-display text-3xl font-extrabold text-brand tabular">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold uppercase rtl:normal-case">{a.title[locale]}</h3>
                  <p className="mt-1">{a.text[locale]}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
