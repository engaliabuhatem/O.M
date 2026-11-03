import manifest from '@/content/image-manifest.json';
import { withBase } from './site';

export interface ImageMeta {
  width: number;
  height: number;
  sizes: number[];
  source: string;
}

const images = manifest as Record<string, ImageMeta>;

export function imageMeta(slug: string): ImageMeta {
  const m = images[slug];
  if (!m) throw new Error(`Unknown image slug "${slug}". Run scripts/process-images.py.`);
  return m;
}

export function srcSet(slug: string, ext: 'avif' | 'webp'): string {
  const m = imageMeta(slug);
  return m.sizes.map((w) => `${withBase(`/images/${slug}-${w}.${ext}`)} ${w}w`).join(', ');
}

export function imageSrc(slug: string, ext: 'avif' | 'webp' = 'webp', width?: number): string {
  const m = imageMeta(slug);
  return withBase(`/images/${slug}-${width ?? m.width}.${ext}`);
}
