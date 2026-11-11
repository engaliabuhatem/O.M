import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';
import { Picture } from '@/components/Picture';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { SectionHeading } from '@/components/SectionHeading';
import { Arrow, ButtonLink, Container, PageHero } from '@/components/ui';
import { URL_VALUE } from '@/components/projects/filters';
import { activitySectors, sectorChapters, sectorProjects, sectors } from '@/content/sectors';
import type { Locale } from '@/content/types';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

/** Projects previewed per sector; the full list lives on /projects?type=… */
const PREVIEW = 3;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'sectors');
}

export default async function SectorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sectors');
  const th = await getTranslations('home.sectors');

  return (
    <>
      <PageHero number="14" label={t('label')} title={t('title')} lead={t('lead')} />

      {/* Overview + jump nav */}
      <section className="border-b border-line bg-concrete" aria-labelledby="overview-title">
        <Container className="py-12">
          <h2 id="overview-title" className="label-spaced mb-6 text-brand-deep">
            {t('overview')}
          </h2>
          <nav aria-label={t('jump')}>
            <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
              {sectors.map((s) => (
                <li key={s.id} className="bg-concrete">
                  <a href={`#${s.id}`} className="flex h-full items-start gap-3 p-4 hover:bg-white">
                    <span className="font-display text-2xl font-extrabold text-brand-deep tabular">{s.no}</span>
                    <span>
                      <span className="block font-display text-lg font-bold text-ink uppercase rtl:normal-case">{s.title[locale]}</span>
                      <span className="block text-sm">{th('projects', { count: sectorProjects(s).length })}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      </section>

      {/* One section per sector, with its executed projects */}
      {sectors.map((s, i) => {
        const list = sectorProjects(s);
        // Photographed projects first, so the preview shows the strongest evidence.
        const preview = [...list].sort((a, b) => Number(b.images.length > 0) - Number(a.images.length > 0)).slice(0, PREVIEW);
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={cn('scroll-mt-20 py-20 md:py-24', i % 2 === 1 && 'bg-concrete')}
          >
            <Container>
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
                <div className={cn('lg:col-span-5', i % 2 === 1 && 'lg:order-2')}>
                  <div className="frame-ticks aspect-[16/10] overflow-hidden bg-concrete">
                    <Picture slug={s.image} alt="" sizes="(min-width: 1024px) 38vw, 100vw" imgClassName="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-4">
                    <span aria-hidden="true" className="font-display text-5xl font-extrabold text-brand tabular">
                      {s.no}
                    </span>
                    <Icon name={s.icon} className="size-9 text-ink" strokeWidth={1.5} />
                  </div>
                  <h2 id={`${s.id}-title`} className="mt-4 text-3xl font-extrabold uppercase md:text-4xl rtl:normal-case">
                    {s.title[locale]}
                  </h2>
                  <p className="mt-4 text-lg">{s.text[locale]}</p>
                  <p className="mt-4 font-display text-xl font-bold text-brand-deep">{th('projects', { count: list.length })}</p>
                  <a
                    href={`#${s.chapterAnchor}`}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-deep underline-offset-4 hover:text-ink hover:underline"
                  >
                    {t('expertiseLink')}
                    <Arrow className="size-4" />
                  </a>
                </div>
              </div>

              <h3 className="label-spaced mt-14 mb-6 text-brand-deep">{t('projectsTitle')}</h3>
              {preview.length ? (
                <>
                  <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {preview.map((p) => (
                      <li key={p.id}>
                        <ProjectCard p={p} />
                      </li>
                    ))}
                  </ul>
                  {s.projectType ? (
                    <ButtonLink
                      href={{ pathname: '/projects', query: { type: URL_VALUE[s.projectType] } }}
                      variant="secondary"
                      arrow
                      className="mt-8"
                    >
                      {t('viewAll', { count: list.length })}
                    </ButtonLink>
                  ) : null}
                </>
              ) : (
                <p className="border border-dashed border-line bg-white p-6">{t('noProjects')}</p>
              )}
            </Container>
          </section>
        );
      })}

      {/* Sector expertise — PDF chapters "Buildings Sector" and "Infrastructure" */}
      {sectorChapters.map((sec, si) => (
        <section
          key={sec.id}
          id={sec.id}
          aria-labelledby={`${sec.id}-title`}
          className={cn('scroll-mt-20 py-20 md:py-28', si === 0 ? 'tri-pattern on-dark bg-ink text-white' : 'tri-pattern bg-concrete')}
        >
          <Container>
            <SectionHeading
              number={String(15 + si).padStart(2, '0')}
              tone={si === 0 ? 'dark' : 'light'}
              label={t('chaptersLabel')}
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
            {si === sectorChapters.length - 1 ? (
              <ButtonLink href="/services" variant="text" arrow className="mt-12">
                {t('servicesLink')}
              </ButtonLink>
            ) : null}
          </Container>
        </section>
      ))}

      <CtaBand locale={locale} />
    </>
  );
}
