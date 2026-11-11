import type { ProjectType } from '@/content/projects';

export const FILTERS = ['all', 'road', 'dam', 'building'] as const;
export type Filter = (typeof FILTERS)[number];

/** URL values are plural (?type=dams), matching the tab labels. */
export const URL_VALUE: Record<ProjectType, string> = { road: 'roads', dam: 'dams', building: 'buildings' };

export const fromUrl = (v: string | null): Filter => {
  const hit = (Object.entries(URL_VALUE) as [ProjectType, string][]).find(([k, u]) => u === v || k === v);
  return hit ? hit[0] : 'all';
};
