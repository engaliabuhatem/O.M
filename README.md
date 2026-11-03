# First Canadian O.M-LTD — corporate website

Static, bilingual (English / Arabic, full RTL) website for FCOM, a civil, infrastructure and building contractor established in 1988.

- **Stack:** Next.js 16 (App Router, `output: 'export'`), TypeScript, Tailwind CSS 4, next-intl 4, Motion (lazy, counters only), MapLibre GL 6 + Carto/OSM tiles, Lucide icons.
- **Output:** a plain folder of HTML/CSS/JS/images in `out/` with no server runtime. Host it on Vercel, Nginx, S3 or anything else that serves files.
- **Single source of truth:** `_source/profile.pdf` (Company Profile 2026). Every number and name on the site is taken from it (see "Content provenance" below).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000  →  redirects to /en/
npm run build      # static export into out/
npm start          # serves out/ on http://localhost:3000 (preview the real export)
npm run lint       # ESLint (must be 0 errors / 0 warnings)
```

Requirements: Node 20+ (tested on Node 24). Python 3 with Pillow is needed only to regenerate images (`npm run images`).

`npm run build` runs three steps:
1. `prebuild` (`scripts/copy-vendor.mjs`) copies the MapLibre worker to `public/vendor/` and the self-hosted Arabic fonts to `public/fonts/`.
2. `next build` writes the static export to `out/`.
3. `postbuild` (`scripts/flatten-rsc.mjs`) copies Next 16's nested segment-prefetch payloads to the flat file names the client router requests. Without it, static hosts return 404s for client-side prefetches.

### Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path the site is served from, e.g. `/O.M` for GitHub Pages. Leave empty for a domain root | *(empty)* |
| `NEXT_PUBLIC_SITE_URL` | Absolute URL used for canonical links, hreflang, sitemap, Open Graph and JSON-LD | `https://www.fc-om.com` |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | e.g. `https://formspree.io/f/xxxxxxx`. If set, the contact form POSTs here. If empty, the form opens the visitor's email app with a pre-filled message to `global@fc-om.com` | *(empty: mailto fallback)* |

Copy `.env.example` to `.env.local` and fill these in. They're inlined at build time, so rebuild after changing them.

## Edit content (`content/`)

All copy lives in typed TypeScript files. Each public string is bilingual: `{ en: '…', ar: '…' }`.

| File | What's in it |
| --- | --- |
| `content/company.ts` | Name, founding year, email, the 4 offices (addresses, phones, HQ map pin), about text, mission, vision, the 5 core values, "why FCOM" advantages |
| `content/services.ts` | The 5 home-page pillars and the 7 services (Procurement & Expediting … BIM) with bullets and images |
| `content/sectors.ts` | Buildings (Architecture, MEP) and Infrastructure (Water, Dams & Irrigation, Ports, Transportation, Power) with expertise lists |
| `content/projects.ts` | Every executed project (13 roads + 5 photo-documented road sections, 12 dams, 15 buildings) |
| `content/equipment.ts` | The 36-row equipment table (quantities as printed), groups, key plants with capacities, fleet photos |
| `content/systems.ts` | QA/QC, HSE, environmental, ESHS, sustainability, BIM |
| `messages/en.json`, `messages/ar.json` | UI strings only: navigation, labels, buttons, form messages, page metadata |

Stats on the home page (number of dams, buildings, roads, km, equipment units, labs) are **computed** from these files, so they update automatically.

### Add a project

1. Add photos (optional): put the source image somewhere under `_source/images/`, add a line to `CURATED` in `scripts/process-images.py` (`'my-project-slug': 'source-file.jpg'`), then run `npm run images`. AVIF + WebP files are generated at full width (max 1280) and 640 px, and `content/image-manifest.json` is updated.
2. Append an entry to `roads`, `dams` or `buildings` in `content/projects.ts`:

```ts
{
  id: 'new-road-project',                    // unique, URL-safe
  type: 'road',                              // 'road' | 'dam' | 'building'
  no: '14',                                  // row number in the company's table (optional)
  name: D('New Road Project', 'مشروع طريق جديد'),
  governorate: G.taiz,
  district: D('Haifan', 'حيفان'),
  detail: D('12 km road', 'طريق بطول 12 كم'),
  lengthKm: 12,                              // counted in the "km listed" stat for tabled roads
  utm: { e: 420000.0, n: 1471000.0 },        // UTM Zone 38N (WGS84), metres. Map marker appears automatically
  images: [{ slug: 'my-project-slug', alt: D('Describe the photo', 'وصف الصورة') }],
},
```

3. `npm run build`. The project appears on `/projects` (cards, table and map) in both languages. Lat/lng is computed from `utm` at build time with proj4.

**Private clients:** private villas and residences show type and city only. The owners' names from the PDF are kept as commented `// client:` lines in `content/projects.ts`. To publish them, uncomment them (and the `client?` field in the `Project` interface) and render `p.client` in `components/projects/ProjectCard.tsx`, but only with the owners' consent.

## Deploy

### Vercel

1. Import the repository in Vercel. The framework preset is detected as Next.js.
2. Set `NEXT_PUBLIC_SITE_URL` (and optionally `NEXT_PUBLIC_FORMSPREE_ENDPOINT`) under Project → Settings → Environment Variables.
3. Deploy. Because of `output: 'export'`, Vercel serves the static files from `out/`.

### GitHub Pages

Live at **https://engaliabuhatem.github.io/O.M/**. `.github/workflows/deploy-pages.yml` builds and publishes the site on every push to `main`. It sets `NEXT_PUBLIC_BASE_PATH=/O.M` and `NEXT_PUBLIC_SITE_URL=https://engaliabuhatem.github.io/O.M` automatically.

One-time setup: repo **Settings → Pages → Build and deployment → Source: GitHub Actions**. Progress shows under the repo's **Actions** tab.

To test the Pages build locally in Git Bash, use `MSYS_NO_PATHCONV=1 NEXT_PUBLIC_BASE_PATH=/O.M npm run build` (otherwise Git Bash rewrites `/O.M` into a Windows path).

If you later attach a custom domain (e.g. `fc-om.com`) in the Pages settings, remove `NEXT_PUBLIC_BASE_PATH` from the workflow and set `NEXT_PUBLIC_SITE_URL` to the domain.

### Plain Nginx

```bash
npm ci && npm run build
rsync -a --delete out/ user@server:/var/www/fc-om.com/
```

```nginx
server {
    listen 80;
    server_name fc-om.com www.fc-om.com;
    root /var/www/fc-om.com;
    index index.html;

    # trailingSlash: true → every page is <route>/index.html
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }
    error_page 404 /404.html;

    # Hashed build assets and generated images can be cached forever
    location /_next/static/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
    location /images/       { add_header Cache-Control "public, max-age=2592000"; }
    location /fonts/        { add_header Cache-Control "public, max-age=31536000, immutable"; }

    types { image/avif avif; application/javascript mjs; }
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml text/plain;
}
```

`/` serves a tiny page that redirects to `/en/` (a static export can't negotiate the locale server-side). To redirect at the server level instead, add `location = / { return 302 /en/; }`.

## Project structure

```
app/
  layout.tsx, page.tsx          root pass-through + "/" → "/en/" redirect
  [locale]/layout.tsx           <html lang dir>, fonts, header/footer, JSON-LD
  [locale]/{page,about,services,projects,equipment,contact}
  sitemap.ts, robots.ts, not-found.tsx, icon.svg, globals.css (design tokens + motifs)
components/                     Header, Footer, SectionHeading, Picture, Reveal, Counter,
  map/LazyMap.tsx               MapLibre, loaded only when in view after first interaction
  projects/                     ProjectsExplorer (URL filters ?type=dams, table/cards ?view=table), ProjectCard
  contact/                      ContactForm, HqMap
content/                        typed content (see above)
i18n/                           next-intl routing / request config
messages/                       UI strings (en, ar)
public/                         logo.svg, logo-mono.svg, og.jpg, images/ (generated)
scripts/                        process-images.py, make-og.py, copy-vendor.mjs, flatten-rsc.mjs
_source/                        profile.pdf, extracted images/, profile.txt, rendered pages/
```

## Design system

Tokens are CSS variables in `app/globals.css`, exposed to Tailwind (`bg-brand`, `text-ink`, …).

| Token | Value | Contrast | Use |
| --- | --- | --- | --- |
| `--brand` | `#00799E` | 4.97:1 on white | CTAs, big numbers, large text |
| `--brand-deep` | `#005A76` | 7.7:1 on white, 6.9:1 on concrete | small teal text, hover, footer band |
| `--brand-bright` | `#5CC6E6` | 7.2:1 on ink | teal on dark sections |
| `--ink` | `#2B2B2B` | — | headings, dark bands |
| `--steel` | `#4A5560` | 7.6:1 on white | body text |
| `--steel-light` | `#C5CCD2` | ~10:1 on ink | body text on dark |
| `--concrete` | `#F2F3F2` | — | alternating sections |
| `--safety` | `#F26B1D` | decorative only | stat underlines, active-nav tick |

`#00799E` on `#F2F3F2` is only 4.45:1, so small teal text always uses `--brand-deep`.

Motifs: set-square triangle pattern (`.tri-pattern`, mirrored in RTL), oversized chapter numbers (`<SectionHeading number="05" … />`), UTM survey labels (`<UtmLabel />`), blueprint grid and ruler ticks. Motion: transform/opacity only, 150–300 ms, 40 ms stagger, all off under `prefers-reduced-motion`.

Fonts: Barlow Condensed + Inter (English, via `next/font`). Cairo + IBM Plex Sans Arabic (Arabic, self-hosted from Fontsource and preloaded only on `/ar/` pages to avoid layout shift).

## Content provenance

- **Equipment total:** 234 units, the sum of all 36 rows of the PDF table (pp. 31–33), including workshops, fuel stations, labs and the 10 survey instruments. Group totals: crushing 6, concrete 25 (incl. grouting machine), asphalt 11, earthmoving 76, transport 75, lifting 5, workshops & fuel 8, power 14, labs & survey 14.
- **Road length:** 122.8 km, the sum of the lengths given in the road table (rows 01, 02, 03, 04, 06, 07). Shown as "122.8 km listed lengths".
- **Labs:** 4 (soil ×2, concrete, asphalt).
- **Map:** 10 points with UTM coordinates printed on the photo pages, converted from EPSG:32638 to WGS84 at build time.
