import { getImageProps } from 'next/image';
import { preload as preloadResource } from 'react-dom';
import { imageMeta, imageSrc, srcSet } from '@/lib/images';

interface PictureProps {
  slug: string;
  alt: string;
  /** `sizes` attribute, e.g. "(min-width: 1024px) 50vw, 100vw" */
  sizes: string;
  /** Above-the-fold image: eager, high priority, preloaded. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * <picture> with pre-generated AVIF + WebP at two widths (see scripts/process-images.py).
 * Explicit width/height from the manifest prevent layout shift; everything below the fold is lazy.
 */
export function Picture({ slug, alt, sizes, priority = false, className, imgClassName }: PictureProps) {
  const m = imageMeta(slug);
  const { props } = getImageProps({
    src: imageSrc(slug, 'webp'),
    alt,
    width: m.width,
    height: m.height,
    sizes,
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : 'auto',
    decoding: 'async',
  });

  if (priority) {
    preloadResource(imageSrc(slug, 'avif'), {
      as: 'image',
      type: 'image/avif',
      imageSrcSet: srcSet(slug, 'avif'),
      imageSizes: sizes,
      fetchPriority: 'high',
    });
  }

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(slug, 'avif')} sizes={sizes} />
      <img {...props} alt={alt} srcSet={srcSet(slug, 'webp')} className={imgClassName} />
    </picture>
  );
}
