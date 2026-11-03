'use client';

import { ArrowDown, ArrowUp, ArrowUpDown, LayoutGrid, MapPin, Table2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { LazyMap, type MapMarker } from '@/components/map/LazyMap';
import { Picture } from '@/components/Picture';
import { UtmLabel } from '@/components/ui';
import type { ProjectType, ProjectWithGeo } from '@/content/projects';
import type { Locale } from '@/content/types';
import { cn } from '@/lib/cn';
import { ProjectCard } from './ProjectCard';
import { useQueryParam } from './useQueryParam';

const FILTERS = ['all', 'road', 'dam', 'building'] as const;
type Filter = (typeof FILTERS)[number];
/** URL values are plural (?type=dams), matching the tab labels. */
const URL_VALUE: Record<Exclude<Filter, 'all'>, string> = { road: 'roads', dam: 'dams', building: 'buildings' };
const fromUrl = (v: string | null): Filter => {
  const hit = (Object.entries(URL_VALUE) as [Exclude<Filter, 'all'>, string][]).find(([k, u]) => u === v || k === v);
  return hit ? hit[0] : 'all';
};

export const TYPE_COLOR: Record<ProjectType, string> = { road: '#00799E', dam: '#2B2B2B', building: '#F26B1D' };

type SortKey = 'no' | 'name' | 'type' | 'location' | 'length';

export function ProjectsExplorer({ projects }: { projects: ProjectWithGeo[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('projects');
  const [typeParam, setTypeParam] = useQueryParam('type');
  const [viewParam, setViewParam] = useQueryParam('view');
  const filter = fromUrl(typeParam);
  const view = viewParam === 'table' ? 'table' : 'cards';
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sort, setSort] = useState<{ key: SortKey; dir: 'ascending' | 'descending' }>({ key: 'no', dir: 'ascending' });

  const visible = useMemo(() => (filter === 'all' ? projects : projects.filter((p) => p.type === filter)), [projects, filter]);

  const markers: MapMarker[] = useMemo(
    () =>
      visible
        .filter((p) => p.latLng)
        .map((p) => ({ id: p.id, latLng: p.latLng!, color: TYPE_COLOR[p.type], label: `${t(`type.${p.type}`)}: ${p.name[locale]}` })),
    [visible, locale, t],
  );

  const typeOrder: Record<ProjectType, number> = { road: 0, dam: 1, building: 2 };
  const sorted = useMemo(() => {
    const coll = new Intl.Collator(locale);
    const val = (p: ProjectWithGeo): string | number => {
      switch (sort.key) {
        case 'no':
          return typeOrder[p.type] * 100 + (p.no ? Number(p.no) : 50);
        case 'name':
          return p.name[locale];
        case 'type':
          return typeOrder[p.type];
        case 'location':
          return `${p.governorate[locale]} ${p.district[locale]}`;
        case 'length':
          return p.lengthKm ?? -1;
      }
    };
    const arr = [...visible].sort((a, b) => {
      const va = val(a);
      const vb = val(b);
      const r = typeof va === 'number' && typeof vb === 'number' ? va - vb : coll.compare(String(va), String(vb));
      return sort.dir === 'ascending' ? r : -r;
    });
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- typeOrder is a constant literal
  }, [visible, sort, locale]);

  const setFilter = (f: Filter) => {
    setSelectedId(null);
    setTypeParam(f === 'all' ? null : URL_VALUE[f]);
  };

  const showOnMap = useCallback((id: string) => {
    setSelectedId(id);
    document.getElementById('projects-map')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center',
    });
  }, []);

  const toggleSort = (key: SortKey) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'ascending' ? 'descending' : 'ascending' }));

  const renderPopup = (id: string) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return null;
    const img = p.images[0];
    return (
      <div className="w-[min(260px,70vw)]" dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
        {img ? (
          <Picture slug={img.slug} alt={img.alt[locale]} sizes="280px" imgClassName="aspect-[16/8] w-full object-cover" />
        ) : null}
        <div className="p-3.5">
          <p className="text-xs font-semibold tracking-wider text-brand-deep uppercase rtl:tracking-normal">{t(`type.${p.type}`)}</p>
          <p className="mt-1 font-display text-lg leading-tight font-extrabold text-ink uppercase rtl:normal-case">{p.name[locale]}</p>
          <p className="mt-1 text-sm text-steel">
            {p.governorate[locale]} · {p.district[locale]}
          </p>
          <p className="mt-1 text-sm text-ink">{p.detail[locale]}</p>
          {p.utm ? <UtmLabel e={p.utm.e} n={p.utm.n} className="mt-2 block text-steel" /> : null}
          {view === 'cards' ? (
            <a href={`#project-${p.id}`} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-brand-deep underline underline-offset-4">
              {t('viewCard')}
            </a>
          ) : null}
        </div>
      </div>
    );
  };

  const cols: { key: SortKey | null; label: string; className?: string }[] = [
    { key: 'no', label: t('table.no'), className: 'w-16' },
    { key: 'name', label: t('table.name') },
    { key: 'type', label: t('table.type') },
    { key: 'location', label: t('table.location') },
    { key: null, label: t('table.detail') },
    { key: 'length', label: t('table.length'), className: 'text-end' },
    { key: null, label: t('table.utm') },
  ];

  const geoCount = markers.length;

  return (
    <div>
      {/* Controls */}
      <div className="z-30 -mx-4 mb-8 lg:sticky lg:top-16 border-y border-line bg-white/95 px-4 py-3 md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label={t('filters.label')} className="flex flex-wrap gap-1">
            {FILTERS.map((f) => {
              const count = f === 'all' ? projects.length : projects.filter((p) => p.type === f).length;
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'inline-flex min-h-11 items-center gap-2 px-4 font-display text-lg font-bold tracking-wide uppercase transition-colors rtl:normal-case',
                    active ? 'bg-ink text-white' : 'bg-concrete text-ink hover:bg-line',
                  )}
                >
                  {f !== 'all' ? <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: TYPE_COLOR[f] }} /> : null}
                  {t(`filters.${f}`)}
                  <span className={cn('text-sm tabular', active ? 'text-brand-bright' : 'text-steel')}>{count}</span>
                </button>
              );
            })}
          </div>
          <div role="group" aria-label={t('views.label')} className="flex gap-1">
            {(['cards', 'table'] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setViewParam(v === 'cards' ? null : 'table')}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 border px-3 text-sm font-semibold transition-colors',
                  view === v ? 'border-brand-deep bg-brand-deep text-white' : 'border-line text-ink hover:border-brand',
                )}
              >
                {v === 'cards' ? <LayoutGrid className="size-4" aria-hidden="true" /> : <Table2 className="size-4" aria-hidden="true" />}
                {t(`views.${v}`)}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {t('count', { count: visible.length })}
        </p>
      </div>

      {/* Map */}
      <section id="projects-map" aria-labelledby="map-title" className="mb-14 scroll-mt-36">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 id="map-title" className="text-3xl font-extrabold uppercase rtl:normal-case">
            {t('mapTitle')}
            <span className="ms-3 text-xl text-brand tabular">{geoCount}</span>
          </h2>
          <ul className="flex flex-wrap gap-4 text-sm">
            {(['road', 'dam', 'building'] as const).map((k) => (
              <li key={k} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-3 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.35)]" style={{ background: TYPE_COLOR[k] }} />
                {t(`type.${k}`)}
              </li>
            ))}
          </ul>
        </div>
        <div className="frame-ticks">
          <LazyMap
            markers={markers}
            selectedId={selectedId}
            onSelect={setSelectedId}
            renderPopup={renderPopup}
            ariaLabel={t('mapLabel')}
            loadingText={t('mapLoading')}
            errorText={t('mapError')}
            className="h-[380px] md:h-[520px]"
          />
        </div>
        <p className="mt-3 flex items-start gap-2 text-sm">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
          {t('mapNote')}
        </p>
      </section>

      <p className="mb-6 font-semibold text-ink">{t('count', { count: visible.length })}</p>

      {view === 'cards' ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((p) => (
            <li key={p.id}>
              <ProjectCard p={p} highlighted={p.id === selectedId} onShowOnMap={showOnMap} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="overflow-x-auto border border-line" tabIndex={0} role="region" aria-label={t('table.caption')}>
          <table className="w-full min-w-[880px] text-start text-sm">
            <caption className="sr-only">{t('table.caption')}</caption>
            <thead className="bg-ink text-white">
              <tr>
                {cols.map((c, i) => {
                  const active = c.key && sort.key === c.key;
                  return (
                    <th
                      key={i}
                      scope="col"
                      aria-sort={c.key ? (active ? sort.dir : 'none') : undefined}
                      className={cn('p-0 text-start font-display text-base font-bold tracking-wide uppercase rtl:normal-case', c.className)}
                    >
                      {c.key ? (
                        <button
                          type="button"
                          onClick={() => toggleSort(c.key!)}
                          aria-label={t('table.sortBy', { col: c.label })}
                          className={cn('flex min-h-12 w-full items-center gap-1.5 px-3 hover:text-brand-bright', c.className?.includes('text-end') && 'justify-end')}
                        >
                          {c.label}
                          {active ? (
                            sort.dir === 'ascending' ? (
                              <ArrowUp className="size-4 text-brand-bright" aria-hidden="true" />
                            ) : (
                              <ArrowDown className="size-4 text-brand-bright" aria-hidden="true" />
                            )
                          ) : (
                            <ArrowUpDown className="size-4 opacity-50" aria-hidden="true" />
                          )}
                        </button>
                      ) : (
                        <span className="flex min-h-12 items-center px-3">{c.label}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr key={p.id} className="border-t border-line odd:bg-white even:bg-concrete">
                  <td className="px-3 py-3 text-steel tabular">{p.no ?? '—'}</td>
                  <th scope="row" className="px-3 py-3 text-start font-semibold text-ink">
                    {p.name[locale]}
                    {p.section ? <span className="ms-2 text-xs font-normal text-brand-deep">({t('section')})</span> : null}
                  </th>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: TYPE_COLOR[p.type] }} />
                      {t(`type.${p.type}`)}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {p.governorate[locale]}
                    {p.district.en !== p.governorate.en ? ` · ${p.district[locale]}` : ''}
                  </td>
                  <td className="px-3 py-3 text-ink">{p.detail[locale]}</td>
                  <td className="px-3 py-3 text-end text-ink tabular">{p.lengthKm ?? '—'}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {p.utm ? <UtmLabel e={p.utm.e} n={p.utm.n} /> : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
