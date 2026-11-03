import { preload } from 'react-dom';
import { BASE_PATH, withBase } from '@/lib/site';

/**
 * Self-hosted Arabic fonts (copied from Fontsource by scripts/copy-vendor.mjs).
 * Rendered only on /ar pages, with the base path applied, and the files the first paint needs are preloaded
 * so the swap from fallback fonts causes no layout shift.
 */
const CSS = `@font-face { font-family: 'Cairo'; font-style: normal; font-weight: 200 1000; font-display: swap; src: url('__BASE__/fonts/cairo-arabic-wght.woff2') format('woff2-variations'); unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC; }
@font-face { font-family: 'Cairo'; font-style: normal; font-weight: 200 1000; font-display: swap; src: url('__BASE__/fonts/cairo-latin-wght.woff2') format('woff2-variations'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'IBM Plex Sans Arabic'; font-style: normal; font-weight: 400; font-display: swap; src: url('__BASE__/fonts/plex-arabic-400.woff2') format('woff2'); unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC; }
@font-face { font-family: 'IBM Plex Sans Arabic'; font-style: normal; font-weight: 600; font-display: swap; src: url('__BASE__/fonts/plex-arabic-600.woff2') format('woff2'); unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC; }
@font-face { font-family: 'IBM Plex Sans Arabic'; font-style: normal; font-weight: 400; font-display: swap; src: url('__BASE__/fonts/plex-latin-400.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'IBM Plex Sans Arabic'; font-style: normal; font-weight: 600; font-display: swap; src: url('__BASE__/fonts/plex-latin-600.woff2') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }`.replaceAll('__BASE__', BASE_PATH);

export function ArabicFonts() {
  for (const f of ['cairo-arabic-wght', 'cairo-latin-wght', 'plex-arabic-400']) {
    preload(withBase(`/fonts/${f}.woff2`), { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  }
  return (
    <style href="fcom-arabic-fonts" precedence="default">
      {CSS}
    </style>
  );
}
