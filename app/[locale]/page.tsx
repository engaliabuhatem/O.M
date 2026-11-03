import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Counter } from '@/components/Counter';
import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';
import { Picture } from '@/components/Picture';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Arrow, ButtonLink, Container, UtmLabel } from '@/components/ui';
import { company } from '@/content/company';
import { labCount, plants, totalUnits } from '@/content/equipment';
import { featuredProjectIds, projects, tabled, tabledRoadKm } from '@/content/projects';
import { pillars } from '@/content/services';
import { systems } from '@/content/systems';
import type { Locale } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { stagger } from '@/lib/motion';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'home');
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tp = await getTranslations('projects');

  const stats = [
    { value: company.founded, label: t('stats.since'), sub: t('stats.sinceSub'), static: true },
    { value: company.countryStrip.length, label: t('stats.countries'), sub: t('stats.countriesSub') },
    { value: tabled.dams.length, label: t('stats.dams'), sub: t('stats.damsSub') },
    { value: tabled.buildings.length, label: t('stats.buildings'), sub: t('stats.buildingsSub') },
    { value: tabled.roads.length, label: t('stats.roads'), sub: t('stats.roadsSub', { km: tabledRoadKm }) },
    { value: totalUnits, label: t('stats.units'), sub: t('stats.unitsSub') },
    { value: labCount, label: t('stats.labs'), sub: t('stats.labsSub') },
  ];

  const featured = featuredProjectIds.map((id) => projects.find((p) => p.id === id)!);
  const capacityPlants = plants.filter((p) => p.capacity);

  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative isolate flex min-h-[calc(100svh-76px)] flex-col overflow-hidden bg-ink text-white">
        <Picture
          slug="hugary-mountain-road"
          alt={projects.find((p) => p.id === 'hugary-rural-road')!.images[0].alt[locale]}
          // Behind a dark overlay on phones, the 640w file is visually indistinguishable and ~25 KB lighter.
          sizes="(max-width: 767px) 60vw, 100vw"
          priority
          className="absolute inset-0 -z-20"
          imgClassName="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(31_35_38/0.92)_0%,rgb(31_35_38/0.72)_45%,rgb(31_35_38/0.25)_100%)] rtl:bg-[linear-gradient(270deg,rgb(31_35_38/0.92)_0%,rgb(31_35_38/0.72)_45%,rgb(31_35_38/0.25)_100%)]"
        />
        <div aria-hidden="true" className="blueprint-grid absolute inset-0 -z-10 opacity-60" />
        <div aria-hidden="true" className="ruler-y absolute inset-y-0 start-0 hidden text-white/40 md:block" />
        <div aria-hidden="true" className="ruler-x absolute inset-x-0 top-0 text-white/40" />

        <Container className="flex flex-1 flex-col justify-center py-16 md:py-24">
          <p className="label-spaced mb-6 text-brand-bright">{t('eyebrow')}</p>
          <h1 className="max-w-4xl text-[2.3rem] font-extrabold text-white uppercase md:text-6xl lg:text-[5.5rem] rtl:normal-case">
            <span className="hero-line block">{t('headline')}</span>
            <span className="hero-line block text-brand-bright [animation-delay:80ms]">{t('headlineSince')}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-steel-light md:text-xl">{t('sub')}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/projects" arrow>
              {t('ctaPrimary')}
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost-dark">
              {t('ctaSecondary')}
            </ButtonLink>
          </div>
        </Container>

        <div className="border-t border-white/15 bg-ink-2/80">
          <Container className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 font-display text-lg font-bold tracking-[0.2em] uppercase rtl:tracking-normal">
              {company.countryStrip.map((c, i) => (
                <li key={c} className="flex items-center gap-5">
                  {i > 0 ? <span aria-hidden="true" className="size-1.5 bg-safety" /> : null}
                  {company.countryShort[c][locale]}
                </li>
              ))}
            </ul>
            <p className="flex flex-wrap items-center gap-x-3 text-sm text-steel-light">
              <span>{t('heroCaption')}</span>
              <UtmLabel e={420244.58} n={1476832.94} className="text-brand-bright" />
            </p>
          </Container>
        </div>
      </section>

      {/* ——— Stats band ——— */}
      <section aria-labelledby="stats-title" className="tri-pattern on-dark bg-ink py-16 text-white md:py-20">
        <Container>
          <h2 id="stats-title" className="label-spaced mb-10 text-brand-bright">
            {t('stats.label')}
          </h2>
          <dl className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4 lg:grid-cols-7">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col bg-ink p-5 md:p-6">
                <dt className="order-2 mt-3 font-display text-lg font-bold text-white uppercase rtl:normal-case">{s.label}</dt>
                <dd className="order-1">
                  <span className="relative inline-block font-display text-5xl leading-none font-extrabold text-white tabular md:text-6xl">
                    {s.static ? s.value : <Counter value={s.value} />}
                    <span aria-hidden="true" className="absolute -bottom-2 start-0 h-1 w-8 bg-safety" />
                  </span>
                </dd>
                <dd className="order-3 mt-1 text-sm text-steel-light">{s.sub}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ——— What we do ——— */}
      <section aria-labelledby="what-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading number="01" label={t('what.label')} title={t('what.title')} id="what-title" />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {pillars.map((p, i) => {
              const big = i < 2;
              return (
                <Reveal
                  as="li"
                  key={p.id}
                  delay={stagger(i)}
                  className={cn(big ? 'lg:col-span-3' : 'lg:col-span-2', i === 4 && 'md:col-span-2 lg:col-span-2')}
                >
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col border border-line bg-white transition-colors hover:border-brand"
                  >
                    {big ? (
                      <div className="img-zoom aspect-[16/8] overflow-hidden bg-concrete">
                        <Picture
                          slug={p.image}
                          alt=""
                          sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                          imgClassName="h-full w-full object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <div className="flex items-start justify-between">
                        <span className="font-display text-4xl font-extrabold text-brand tabular">{p.no}</span>
                        <Icon name={p.icon} className="size-8 text-ink" strokeWidth={1.5} />
                      </div>
                      <h3 className="mt-4 text-2xl font-extrabold uppercase rtl:normal-case">{p.title[locale]}</h3>
                      <p className="mt-2 flex-1">{p.text[locale]}</p>
                      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-deep">
                        {t('what.more')}
                        <Arrow className="size-4 transition-transform duration-150 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ——— Featured projects ——— */}
      <section aria-labelledby="featured-title" className="tri-pattern bg-concrete py-20 md:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading number="02" label={t('featured.label')} title={t('featured.title')} id="featured-title" className="mb-0 md:mb-0" />
            <ButtonLink href="/projects" variant="text" arrow>
              {t('featured.all')}
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-5 lg:grid-rows-2">
            {featured.map((p, i) => (
              <Reveal
                as="li"
                key={p.id}
                delay={stagger(i)}
                className={cn(i === 0 ? 'lg:col-span-3 lg:row-span-2' : 'lg:col-span-2')}
              >
                <Link
                  href={{ pathname: '/projects', query: { type: p.type } }}
                  className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden bg-ink text-white"
                >
                  <Picture
                    slug={p.images[0].slug}
                    alt={p.images[0].alt[locale]}
                    sizes={i === 0 ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 40vw, 100vw'}
                    className="img-zoom absolute inset-0"
                    imgClassName="h-full w-full object-cover"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/50 to-transparent" />
                  <div className="relative p-6 md:p-8">
                    <p className="label-spaced text-brand-bright">{tp(`type.${p.type}`)}</p>
                    <h3 className={cn('mt-2 font-extrabold text-white uppercase rtl:normal-case', i === 0 ? 'text-4xl md:text-5xl' : 'text-3xl')}>
                      {p.name[locale]}
                    </h3>
                    <p className="mt-2 text-steel-light">
                      {p.governorate[locale]} · {p.district[locale]} — {p.detail[locale]}
                    </p>
                    {p.utm ? <UtmLabel e={p.utm.e} n={p.utm.n} className="mt-3 inline-block text-brand-bright" /> : null}
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ——— Capacity teaser ——— */}
      <section aria-labelledby="capacity-title" className="on-dark bg-ink-2 py-20 text-white md:py-28">
        <Container>
          <SectionHeading number="03" tone="dark" label={t('capacity.label')} title={t('capacity.title')} lead={t('capacity.text')} id="capacity-title" />
        </Container>
        <div className="mx-auto max-w-[1440px]">
          <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:px-8 lg:grid lg:grid-cols-5 lg:overflow-visible">
            {capacityPlants.map((pl, i) => (
              <Reveal as="li" key={pl.id} delay={stagger(i)} className="w-[78vw] max-w-[340px] shrink-0 snap-start lg:w-auto lg:max-w-none">
                <figure className="group">
                  <div className="img-zoom frame-ticks aspect-[4/3] overflow-hidden bg-ink">
                    <Picture slug={pl.image} alt={pl.alt[locale]} sizes="(min-width: 1024px) 20vw, 78vw" imgClassName="h-full w-full object-cover" />
                  </div>
                  <figcaption className="mt-4">
                    <p className="font-display text-5xl leading-none font-extrabold text-white tabular">
                      {pl.capacity!.value}
                      <span className="ms-2 text-xl text-brand-bright">{pl.capacity!.unit[locale]}</span>
                    </p>
                    <p className="mt-2 text-steel-light">
                      {pl.name[locale]}
                      {pl.origin ? ` · ${pl.origin[locale]}` : ''}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
        <Container className="mt-10">
          <ButtonLink href="/equipment" variant="ghost-dark" arrow>
            {t('capacity.cta')}
          </ButtonLink>
        </Container>
      </section>

      {/* ——— Systems ——— */}
      <section aria-labelledby="systems-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading number="04" label={t('systems.label')} title={t('systems.title')} id="systems-title" />
          <ul className="grid border-s border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {systems.map((s, i) => (
              <Reveal as="li" key={s.id} delay={stagger(i)} className="border-e border-b border-line p-6 md:p-8">
                <Icon name={s.icon} className="size-9 text-brand" strokeWidth={1.5} />
                <h3 className="mt-5 text-2xl font-extrabold uppercase rtl:normal-case">{s.short[locale]}</h3>
                <p className="mt-2">{s.lead[locale]}</p>
              </Reveal>
            ))}
          </ul>
          <ButtonLink href="/about" variant="text" arrow className="mt-8">
            {t('systems.more')}
          </ButtonLink>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
