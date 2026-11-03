import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBand } from '@/components/CtaBand';
import { ProjectsExplorer } from '@/components/projects/ProjectsExplorer';
import { Container, PageHero } from '@/components/ui';
import { projects, tabled, tabledRoadKm } from '@/content/projects';
import type { Locale } from '@/content/types';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'projects');
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');
  const h = await getTranslations('home.stats');

  const summary = [
    { n: tabled.roads.length, label: h('roads'), sub: h('roadsSub', { km: tabledRoadKm }) },
    { n: tabled.dams.length, label: h('dams'), sub: h('damsSub') },
    { n: tabled.buildings.length, label: h('buildings'), sub: h('buildingsSub') },
  ];

  return (
    <>
      <PageHero number="17" label={t('label')} title={t('title')} lead={t('lead')} />
      <section className="border-b border-line bg-concrete" aria-label={t('label')}>
        <Container>
          <dl className="grid grid-cols-3 divide-x divide-line rtl:divide-x-reverse">
            {summary.map((s) => (
              <div key={s.label} className="flex flex-col px-3 py-6 first:ps-0 md:px-8">
                <dt className="order-2 font-display text-base font-bold text-ink uppercase md:text-lg rtl:normal-case">{s.label}</dt>
                <dd className="order-1 font-display text-4xl leading-none font-extrabold text-brand-deep tabular md:text-6xl">{s.n}</dd>
                <dd className="order-3 hidden text-sm md:block">{s.sub}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <section className="py-0 pb-20 md:pb-28">
        <Container>
          <ProjectsExplorer projects={projects} />
        </Container>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}
