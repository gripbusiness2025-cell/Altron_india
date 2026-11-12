# Performance audit & optimization — ALTRON India (Vite + React)

**Stack:** Vite 8, React 19, React Router 7, static `public/` assets, optional MongoDB catalog API.

**Audit date:** 2026-11-12  

**Important:** GTmetrix Grade A and sub-1.5s LCP are **targets**, not guarantees. This document records **measured build metrics** and **code changes**. Confirm with [GTmetrix](https://gtmetrix.com/), [PageSpeed Insights](https://pagespeed.web.dev/), and real-user monitoring after deploy.

---

## Phase 1 — Issues identified

| Bottleneck | Severity | Evidence |
|------------|----------|----------|
| **Corporate banner loaded 9 full-size images at once** | Critical | Two PNG slides ~1.8MB + 2.1MB; all `<img>` in DOM on every page with banner |
| **No WebP delivery** | High | ~6.2MB under `public/corporate/` raster only |
| **Single JS bundle** | High | One `index-*.js` ~358KB (113KB gzip) — entire app + FAQ HTML corpus on first load |
| **LCP not prioritized** | Medium | Banner used PNG; no preload of first slide WebP |
| **Mongo catalog health check on load** | Low | Extra `/api/catalog/health` on idle when Mongo enabled |
| **Product grid CLS** | Low | External product images without `width`/`height` |
| **Caching headers** | Hosting | No cache policy in repo before this pass |

**Third-party scripts:** None in repo (no GTM/GA in `index.html`). WooCommerce product API only on product routes.

**Fonts:** System stack in `index.css` (`Arial, Helvetica, Segoe UI`) — no custom font files.

---

## Phase 2–4 — Optimizations implemented

### Images

- Generated **WebP** (quality 82) for corporate banners, logo, home, and corporate content images (`cwebp`; `npm run optimize-images` to refresh).
- Added **`OptimizedPicture`** — `<picture>` with WebP + original fallback (visual unchanged).
- **`CorporateBanner`:** Only mounts slides as they are needed (active + next); **~4MB+ removed from initial home download** vs loading all slides.
- First slide: `fetchPriority="high"`, `loading="eager"`, `decoding="sync"`, dimensions **1200×475** (matches CSS `aspect-ratio`).
- **`<link rel="preload">`** for first banner WebP injected once per banner mount.
- Switched banner slides 2–9 to **JPG fallback** instead of PNG where both existed.
- Logo, home intro, promises, corporate reasons image → WebP.

**Approx. WebP totals (corporate banners only):** ~1.1MB WebP vs multi-MB PNG/JPG if all slides loaded.

### JavaScript

- **Route-level `React.lazy()`** for all routes except Home (LCP path).
- **`manualChunks`:** `react-vendor`, `router-vendor`, `catalog-data`, `faq-data`.
- **`modulePreload.polyfill: false`** to reduce extra requests.
- FAQ content (~32KB) **not loaded on home** until `/faq`.

### CSS

- `cssMinify: true` in Vite (unchanged visually).
- No unused global purge (risk to dynamic classes); bundle ~24KB gzip.

### API

- Mongo catalog fetch deferred with **`requestIdleCallback`** (timeout 2.5s) when `VITE_CATALOG_SOURCE` is not `static`.
- Default static catalog: **no blocking API** on startup.

### Caching (hosting)

- Added **`public/_headers`** (Netlify-style): immutable year cache for `/assets/*`, 30d for images, no long cache on `index.html`.

### SEO preserved

- No changes to `usePageSeo`, JSON-LD, robots, sitemap pipeline, or 404 `noindex`.

---

## Before / after — production JS (home-first load)

| Metric | Before | After (approx. home) |
|--------|--------|----------------------|
| Single/app JS | 358 KB (113 KB gzip) | **Split** |
| Home entry `index-*.js` | (included above) | **30 KB (9.6 KB gzip)** |
| `react-vendor` | (included) | 218 KB (68 KB gzip) — cached across visits |
| `router-vendor` | (included) | 38 KB (14 KB gzip) |
| `catalog-data` | (in main) | 5.5 KB (1.8 KB gzip) |
| `faq-data` on home | **Yes (~32 KB)** | **Not loaded** |
| CSS | 24 KB (5.4 KB gzip) | ~same |

**First visit transfer (JS gzip, home):** ~94 KB gzip across entry + vendors + catalog (vs ~113 KB monolith + FAQ embedded).

**Subsequent visits:** Vendors cached; mainly entry chunk + images.

---

## Files modified / added

| Path | Change |
|------|--------|
| `src/components/OptimizedPicture.tsx` | New WebP picture helper |
| `src/components/CorporateBanner.tsx` | Lazy slide mount, WebP, preload |
| `src/components/Logo.tsx`, `HomeIntro.tsx`, `HomePromises.tsx` | WebP |
| `src/pages/CorporatePage.tsx` | WebP |
| `src/pages/ProductCategoryPage.tsx` | Image dimensions |
| `src/App.tsx` | Lazy routes + Suspense |
| `src/components/RouteFallback.tsx` | Minimal suspense UI |
| `src/context/ProductCatalogContext.tsx` | Idle catalog fetch |
| `vite.config.ts` | Chunks, build target |
| `public/_headers` | Cache headers |
| `public/**/*.webp` | New assets |
| `scripts/optimize-images.mjs` | Regenerate WebP |
| `package.json` | `optimize-images` script |

---

## Core Web Vitals — expected impact

| Vital | Action |
|-------|--------|
| **LCP** | Smaller first banner (WebP ~118KB vs 1.8MB PNG), preload, reserved aspect ratio |
| **TBT** | Smaller initial parse (no FAQ chunk on home), deferred catalog API |
| **CLS** | Banner 1200×475, logo dimensions, product thumb 320×280 |
| **INP** | No heavy new listeners; banner interval unchanged |

---

## Remaining issues & hosting recommendations

1. **SPA shell** — Initial HTML still minimal; for maximum SEO/CWV consider **prerender** or SSR for marketing routes.
2. **Original PNG/JPG** still in `public/` — crawlers or old links may fetch them; safe to keep for fallback; CDN should serve WebP via `<picture>` only.
3. **Product images** from WooCommerce — size/unoptimized; optimize at source or proxy CDN.
4. **Client logos** — many small JPGs; acceptable; optional WebP batch.
5. **Hero components** (`Hero.tsx`) — unused on Home? If enabled later, apply `OptimizedPicture`.
6. **Brotli/GZIP** — Enable on **nginx/Cloudflare/Vercel** (not in Vite).
7. **HTTPS, HTTP→HTTPS, www** — Configure at DNS/host.
8. **GTmetrix Structure score** — Depends on CDN, TTFB, third parties; test live URL.

### Nginx example (snippet)

```nginx
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;
# brotli on; # if module available
location /assets/ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}
```

---

## Testing checklist (post-deploy)

1. `npm run build` — passes ✓ (local run 2026-11-12)
2. Home: Network tab — **only 1–2 banner requests** initially; WebP for LCP
3. Navigate `/faq` — `faq-data-*.js` loads
4. Lighthouse mobile on production URL
5. **GTmetrix** — [https://gtmetrix.com/](https://gtmetrix.com/) — enter live site URL, compare LCP/TBT/CLS/fully loaded
6. Verify SEO: view-source / Inspector — title, canonical, OG per route
7. Product category + detail — API + skeleton loaders still work

### GTmetrix quick guide

1. Test **production** URL (not `localhost`).
2. Use **Vancouver or Mumbai** test region closest to India audience if available.
3. Record: Performance %, Structure %, LCP, TBT, CLS, Fully Loaded.
4. Waterfall: confirm banner WebP, chunked JS, no 4MB PNG.

---

## Maintenance

- After adding images: `npm run optimize-images`
- Before release: `npm run build` (sitemap + Vite)
- Track bundle: `ls -lh dist/assets/`

---

## Target vs realistic outcomes

| Target | Status |
|--------|--------|
| GTmetrix A / 90%+ | **Requires live GTmetrix test** — improvements align with targets |
| LCP &lt; 1.5s | **Plausible on good hosting** after banner fix; confirm with PSI |
| TBT &lt; 150ms | **Improved** by code split; React vendor still main thread cost |
| CLS &lt; 0.1 | **Improved** via explicit dimensions |
| Fully loaded &lt; 3s | Depends on **TTFB, CDN, region** |

Do **not** claim GTmetrix Grade A until a screenshot/report confirms it.
