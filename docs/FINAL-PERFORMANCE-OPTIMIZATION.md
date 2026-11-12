# ALTRON India — Phase 2 performance optimization

**Site:** https://altron-india.vercel.app/  
**Stack:** Vite 8, React 19, React Router 7, static `public/` assets, optional MongoDB API (`server/`).

**Date:** 2026-11-12

---

## Initial PageSpeed scores (your report)

| | Desktop | Mobile |
|---|---------|--------|
| Performance | 100 | 90 |
| Accessibility | 95 | 95 |
| Best Practices | 96 | 92 |
| SEO | 100 | 100 |
| FCP | 0.2s | 0.8s |
| LCP | 0.7s | **3.5s** |
| TBT | 50ms | 10ms |
| CLS | 0.009 | 0 |
| Speed Index | — | 3.8s |

**Primary gap:** Mobile LCP (full-size ~2172px banner WebP ~121KB+ decode/transfer vs viewport need ~480px).

**Secondary:** `/api/catalog/health` **404** on Vercel (static host, no API rewrite).

---

## Issues identified (Phase 2)

| Issue | Impact |
|-------|--------|
| Single full-resolution WebP for banners, logo, home images | Mobile LCP + bytes |
| Preload pointed at full `banner1-1-scaled.webp` | Mismatch with ideal mobile asset |
| Slide 1 preloaded with slide 0 on first paint | Extra image contention |
| Home `ola-ads` used `fetchPriority="high"` | Competed with banner LCP |
| Logo `fetchPriority="high"` | Competed on homepage |
| Client logos: full JPG in marquee (×64 nodes) | Many large downloads |
| Catalog health on every visit when `VITE_API_URL` unset | 404 noise, Best Practices |
| Header email/phone links below 44×44px | Accessibility |
| Carousel dots 10×10px | Touch target a11y |
| No Vercel security/cache headers in repo | Best Practices / Structure |

**SEO:** No intentional changes to metadata, JSON-LD, robots, or sitemap logic.

---

## Optimizations implemented

### Responsive images

- **`scripts/optimize-images.mjs`** — generates legacy `.webp` plus `{name}-{w}w.webp` (and macOS raster fallbacks via `sips`).
- **Presets:** banner 480/768/1200/1920, logo 120/200/400, home 480/768/1024/1280, clients 120/200.
- **`src/lib/responsiveImage.ts`** — `sizes`, `buildWidthSrcSet`, defaults.
- **`OptimizedPicture`** — `srcset` + `sizes` for WebP and fallback.
- **`ClientLogoImage`** — responsive client marquee assets.

**Example LCP asset (slide 1):**

| Asset | Approx. size |
|-------|----------------|
| `banner1-1-scaled.webp` (legacy full) | ~121 KB |
| `banner1-1-scaled-480w.webp` | **~15 KB** |
| `banner1-1-scaled-1200w.webp` | ~53 KB |

Run after adding rasters: `npm run optimize-images` (130 variants generated in last run).

### LCP / carousel

- **`index.html`** — media-conditioned preloads for `banner1-1-scaled-480w.webp` and `-1200w.webp` (`fetchpriority="high"`).
- **`CorporateBanner`** — responsive `srcset`, only slide **0** on first paint; slide **1** after `requestIdleCallback`; preload removed from JS to avoid duplicate links.
- First active slide: `loading="eager"`, `fetchPriority="high"`, `decoding="sync"`.
- Removed competing priorities from logo and below-fold `ola-ads`.

### API / network

- **`src/lib/catalogConfig.ts`** — remote catalog only when `VITE_CATALOG_SOURCE=mongodb` **or** `VITE_API_URL` is set.
- **Default on Vercel (no env):** static catalog, **no** `/api/catalog/health` call.

MongoDB still works when you set:

```env
VITE_API_URL=https://your-api.example.com/api
VITE_CATALOG_SOURCE=mongodb
```

### JavaScript

- No new dependencies. Home entry ~31 KB (gzip ~10 KB) after responsive helpers (+~1 KB gzip vs Phase 1).
- React vendor unchanged (~68 KB gzip); unused React bytes are mostly non-tree-shakeable runtime — no unsafe dependency removal.

### CSS / rendering

- Global bundle ~24.6 KB CSS (gzip ~5.5 KB). No visual changes; critical CSS split not added (would risk layout on lazy routes).

### Accessibility

- **`.info-link`:** min 44×44 tap target via padding/margin.
- **Banner dots:** 44×44 hit area; visual dot via `::before`.
- **`focus-visible`** outlines on header links, nav, banner tabs.
- Carousel: clearer `aria-label` on tabs; meaningful alt on first active slide only.

### Security / caching (Vercel)

- **`vercel.json`:** `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; long cache for `/assets/*` and images.
- **`public/_headers`** retained for other static hosts.

---

## Files modified / added

| Path | Change |
|------|--------|
| `src/lib/responsiveImage.ts` | New — widths, sizes, srcset helpers |
| `src/lib/catalogConfig.ts` | New — when to call API |
| `src/components/OptimizedPicture.tsx` | Responsive srcset |
| `src/components/CorporateBanner.tsx` | LCP, a11y, idle second slide |
| `src/components/ClientLogoImage.tsx` | New |
| `src/components/GoogleReviewBadge.tsx` | New (shared review image) |
| `src/components/ClientsCarousel.tsx` | ClientLogoImage |
| `src/components/Logo.tsx`, `HomeIntro.tsx`, `HomePromises.tsx` | Responsive + priority fixes |
| `src/context/ProductCatalogContext.tsx` | catalogConfig gate |
| `src/pages/*` | GoogleReviewBadge imports |
| `src/App.css` | Touch targets, focus, banner dots |
| `scripts/optimize-images.mjs` | Responsive variants |
| `index.html` | LCP preloads |
| `vercel.json` | Security + cache headers |
| `.env.example` | Catalog/API documentation |
| `public/**/*-{N}w.webp` | Generated assets (commit for deploy) |

---

## Build verification

```bash
npm run optimize-images   # after new JPG/PNG assets
npm run build             # passes (2026-11-12)
```

---

## Remaining issues / hosting

| Item | Notes |
|------|--------|
| Mobile LCP after deploy | Re-test PSI; target &lt; 2.5s with 480w banner |
| React vendor “unused JS” | Expected for React 19; splitting further increases requests |
| Render-blocking CSS ~140ms | Acceptable; per-route CSS is a larger refactor |
| `range.png` | Still single PNG; optional WebP + srcset |
| Product images (WooCommerce/Mongo URLs) | External; dimension attrs only on static UI |
| COOP / CSP strict mode | Not added — validate Maps/embeds before tightening |
| API on Vercel | Deploy `server/` separately + `VITE_API_URL` or Vercel rewrites to backend |

---

## Production testing instructions

1. Deploy with **committed** `-{w}w.webp` files (CI does not run `cwebp` unless you add it).
2. **Vercel env:** leave `VITE_API_URL` unset until API is live; or set `VITE_CATALOG_SOURCE=static` explicitly.
3. [PageSpeed Insights](https://pagespeed.web.dev/) — URL mobile + desktop.
4. DevTools → Network → filter Img on **mobile emulation**: first banner should be `*-480w.webp`, not full scaled file.
5. Network → confirm **no** `/api/catalog/health` when API not configured.
6. Lighthouse accessibility — header links and banner dots.
7. GTmetrix from **India** / mobile for business geo.
8. Compare bundle: `dist/assets/index-*.js` gzip vs prior deploy.

**Do not treat scores as guaranteed** until measured on production after this deploy.

---

## Expected impact

| Metric | Mechanism |
|--------|-----------|
| Mobile LCP | ~15 KB hero on phone vs ~121 KB+; matched preload |
| Mobile Perf | Less image decode; fewer competing priorities |
| Best Practices | No failed health 404 |
| Accessibility | 44px targets, focus rings |
| Desktop | Unchanged visuals; still uses 1200w/1920w where appropriate |
