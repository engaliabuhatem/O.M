// Copies the MapLibre worker into public/ so it can be served as a static file
// (bundlers can't resolve MapLibre v6's runtime worker URL). Runs before dev/build.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'vendor');
mkdirSync(out, { recursive: true });
copyFileSync(join(root, 'node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs'), join(out, 'maplibre-gl-worker.mjs'));
console.log('copied maplibre-gl-worker.mjs -> public/vendor/');

// Arabic fonts are self-hosted from Fontsource so Arabic pages can preload them (see app/[locale]/layout.tsx).
const fonts = join(root, 'public', 'fonts');
mkdirSync(fonts, { recursive: true });
const FONT_FILES = [
  ['@fontsource-variable/cairo/files/cairo-arabic-wght-normal.woff2', 'cairo-arabic-wght.woff2'],
  ['@fontsource-variable/cairo/files/cairo-latin-wght-normal.woff2', 'cairo-latin-wght.woff2'],
  ['@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2', 'plex-arabic-400.woff2'],
  ['@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2', 'plex-arabic-600.woff2'],
  ['@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-400-normal.woff2', 'plex-latin-400.woff2'],
  ['@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-600-normal.woff2', 'plex-latin-600.woff2'],
];
for (const [from, to] of FONT_FILES) copyFileSync(join(root, 'node_modules', from), join(fonts, to));
console.log(`copied ${FONT_FILES.length} Arabic font files -> public/fonts/`);
