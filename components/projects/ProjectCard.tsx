'use client';

import { Building2, MapPin, Route, Waves } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Picture } from '@/components/Picture';
import { UtmLabel } from '@/components/ui';
import type { ProjectType, ProjectWithGeo } from '@/content/projects';
import type { Locale } from '@/content/types';
import { cn } from '@/lib/cn';

export const TYPE_ICON: Record<ProjectType, typeof Route> = { road: Route, dam: Waves, building: Building2 };

export function ProjectCard({
  p,
  highlighted,
  onShowOnMap,
}: {
  p: ProjectWithGeo;
  highlighted?: boolean;
  onShowOnMap?: (id: string) => void;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations('projects');
  const TypeIcon = TYPE_ICON[p.type];
  const img = p.images[0];

  return (
    <article
      id={`project-${p.id}`}
      className={cn(
        'group flex h-full scroll-mt-28 flex-col border bg-white transition-[border-color,box-shadow] duration-200',
        highlighted ? 'border-brand shadow-[0_0_0_2px_var(--brand)]' : 'border-line',
      )}
    >
      <div className="img-zoom relative aspect-[16/10] overflow-hidden bg-concrete">
        {img ? (
          <Picture
            slug={img.slug}
            alt={img.alt[locale]}
            sizes="(min-width: 1440px) 340px, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            imgClassName="h-full w-full object-cover"
          />
        ) : (
          <div className="tri-pattern flex h-full flex-col items-center justify-center gap-2 text-steel">
            <TypeIcon className="size-10 text-brand-deep/60" strokeWidth={1.25} aria-hidden="true" />
            <span className="text-sm">{t('noPhoto')}</span>
          </div>
        )}
        <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 bg-ink px-2.5 py-1 text-xs font-semibold tracking-wider text-white uppercase rtl:tracking-normal">
          <TypeIcon className="size-3.5" aria-hidden="true" />
          {t(`type.${p.type}`)}
          {p.no ? <span className="text-brand-bright tabular">· {p.no}</span> : null}
        </span>
        {p.images.length > 1 ? (
          <span className="absolute end-3 top-3 bg-white/90 px-2 py-1 text-xs font-semibold text-ink">
            {t('photos', { count: p.images.length })}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {p.section ? <p className="mb-1 text-xs font-semibold tracking-wider text-brand-deep uppercase rtl:tracking-normal">{t('section')}</p> : null}
        <h3 className="text-xl font-extrabold uppercase rtl:normal-case">{p.name[locale]}</h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
          <span>
            {p.governorate[locale]}
            {p.district.en !== p.governorate.en ? ` · ${p.district[locale]}` : ''}
          </span>
        </p>
        <p className="mt-2 flex-1 text-ink">{p.detail[locale]}</p>
        {p.utm || onShowOnMap ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
            {p.utm ? <UtmLabel e={p.utm.e} n={p.utm.n} className="text-steel" /> : <span />}
            {p.latLng && onShowOnMap ? (
              <button
                type="button"
                onClick={() => onShowOnMap(p.id)}
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-deep hover:text-ink"
              >
                <MapPin className="size-4" aria-hidden="true" />
                {t('showOnMap')}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
