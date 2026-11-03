'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LazyMap } from '@/components/map/LazyMap';

export function HqMap({ latLng, title, address }: { latLng: [number, number]; title: string; address: string }) {
  const t = useTranslations('projects');
  const tc = useTranslations('contact');
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <LazyMap
      markers={[{ id: 'hq', latLng, color: '#00799E', label: title }]}
      selectedId={selected}
      onSelect={setSelected}
      renderPopup={() => (
        <div className="max-w-[240px] p-4">
          <p className="font-display text-lg font-extrabold text-ink">{title}</p>
          <p className="mt-1 text-sm text-steel">{address}</p>
        </div>
      )}
      ariaLabel={tc('mapLabel')}
      loadingText={t('mapLoading')}
      errorText={t('mapError')}
      singleZoom={14}
      className="h-[340px] md:h-[420px]"
    />
  );
}
