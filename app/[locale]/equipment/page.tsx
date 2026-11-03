import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';
import { Picture } from '@/components/Picture';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Container, PageHero } from '@/components/ui';
import { equipment, fleetPhotos, groups, groupTotal, plants, totalUnits } from '@/content/equipment';
import type { Locale } from '@/content/types';
import { cn } from '@/lib/cn';
import { stagger } from '@/lib/motion';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'equipment');
}

export default async function EquipmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('equipment');

  return (
    <>
      <PageHero number="16" label={t('label')} title={t('title')} lead={t('lead')} />

      {/* Totals strip */}
      <section aria-label={t('total')} className="border-b border-line bg-concrete">
        <Container className="flex flex-wrap items-end gap-x-10 gap-y-4 py-8">
          <p className="font-display text-6xl leading-none font-extrabold text-ink tabular">
            {totalUnits}
            <span className="ms-3 text-2xl text-brand-deep">{t('units')}</span>
          </p>
          <p className="text-lg">{t('grandTotal', { units: totalUnits, rows: equipment.length })}</p>
        </Container>
      </section>

      {/* Key plants */}
      <section aria-labelledby="plants-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading number="17" label={t('plantsLabel')} title={t('plantsTitle')} id="plants-title" />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {plants.map((p, i) => (
              <Reveal
                as="li"
                key={p.id}
                delay={stagger(i)}
                className={cn(i < 2 ? 'lg:col-span-3' : i < 5 ? 'lg:col-span-2' : 'lg:col-span-3')}
              >
                <figure className="group h-full border border-line bg-white">
                  <div className="img-zoom aspect-[16/9] overflow-hidden bg-concrete">
                    <Picture
                      slug={p.image}
                      alt={p.alt[locale]}
                      sizes={i < 2 || i > 4 ? '(min-width: 1024px) 45vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'}
                      imgClassName="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="flex items-end justify-between gap-4 p-5 md:p-6">
                    <div>
                      <p className="font-display text-2xl font-extrabold text-ink uppercase rtl:normal-case">{p.name[locale]}</p>
                      {p.origin ? <p className="text-sm">{p.origin[locale]}</p> : null}
                    </div>
                    {p.capacity ? (
                      <p className="shrink-0 text-end font-display leading-none font-extrabold text-brand">
                        <span className="text-5xl tabular">{p.capacity.value}</span>
                        <span className="mt-1 block text-base text-brand-deep">{p.capacity.unit[locale]}</span>
                      </p>
                    ) : null}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Full fleet table */}
      <section aria-labelledby="fleet-title" className="tri-pattern on-dark bg-ink py-20 text-white md:py-28">
        <Container>
          <SectionHeading number="18" tone="dark" label={t('fleetLabel')} title={t('fleetTitle')} lead={t('fleetLead')} id="fleet-title" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {groups.map((g) => {
              const items = equipment.filter((e) => e.group === g.id);
              return (
                <div key={g.id} className="border border-white/15 bg-ink-2">
                  <table className="w-full text-start">
                    <caption className="border-b border-white/15 p-5 text-start">
                      <span className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-3">
                          <Icon name={g.icon} className="size-6 text-brand-bright" strokeWidth={1.5} />
                          <span className="font-display text-xl font-extrabold text-white uppercase rtl:normal-case">{g.title[locale]}</span>
                        </span>
                        <span className="font-display text-3xl font-extrabold text-brand-bright tabular">{groupTotal(g.id)}</span>
                      </span>
                    </caption>
                    <thead className="sr-only">
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">{t('item')}</th>
                        <th scope="col">{t('qty')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((e) => (
                        <tr key={e.no} className="border-b border-white/5 last:border-0">
                          <td className="w-10 py-2.5 ps-5 align-top text-sm text-steel-light tabular">{String(e.no).padStart(2, '0')}</td>
                          <th scope="row" className="py-2.5 ps-2 pe-3 text-start align-top font-normal text-white">
                            {e.name[locale]}
                          </th>
                          <td className="py-2.5 pe-5 text-end align-top font-display text-xl font-bold text-white tabular">{e.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-white/15">
                        <td />
                        <th scope="row" className="py-3 text-start text-sm font-semibold text-steel-light">
                          {t('groupTotal')}
                        </th>
                        <td className="py-3 pe-5 text-end font-display text-xl font-extrabold text-brand-bright tabular">{groupTotal(g.id)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              );
            })}
          </div>
          <p className="mt-8 flex items-baseline gap-3 border-t border-white/15 pt-6 font-display text-2xl font-extrabold text-white">
            {t('total')}:
            <span className="text-4xl text-brand-bright tabular">{totalUnits}</span>
            <span className="text-lg font-bold text-steel-light">{t('grandTotal', { units: totalUnits, rows: equipment.length })}</span>
          </p>
        </Container>
      </section>

      {/* Fleet photos */}
      <section aria-labelledby="photos-title" className="py-20 md:py-28">
        <Container>
          <h2 id="photos-title" className="label-spaced mb-8 text-brand-deep">
            {t('photosTitle')}
          </h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {fleetPhotos.map((f, i) => (
              <li key={f.image} className={cn(i === 0 && 'col-span-2 row-span-2')}>
                <figure className="group">
                  <div className={cn('img-zoom overflow-hidden bg-concrete', i === 0 ? 'aspect-[4/3]' : 'aspect-[4/3]')}>
                    <Picture
                      slug={f.image}
                      alt=""
                      sizes={i === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                      imgClassName="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-sm">{f.alt[locale]}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
