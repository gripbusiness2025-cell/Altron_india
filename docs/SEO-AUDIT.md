# ALTRON site — SEO & launch QA audit

This project is a **Vite + React SPA** (not Next.js). Google can execute JavaScript, but **prerender or SSR** is still recommended for the strongest indexing parity with your checklist.

**Last review:** code audit in repo. Re-run Lighthouse and Search Console on **production** after deploy.

---

## A. On-page SEO

| Check | Status | Notes |
|--------|--------|--------|
| Unique title per page | **Done** | `src/seo/pageMeta.ts` + dynamic product/category via `usePageSeo` |
| Unique meta description | **Done** | Same |
| One H1 per page | **Mostly** | Home uses visually hidden H1; other pages have `corporate-title` H1 |
| H1 → H2 → H3 hierarchy | **Review** | Home sections use H2; audit long pages (Corporate, e-Campus) |
| SEO-friendly URLs | **Done** | `/corporate`, `/products/cctv-surveillance`, `/product/:slug` |
| Image alt text | **Partial** | Logo/contact have alt; some product images use `alt=""` when decorative — add names when known |
| Internal links | **Done** | Nav, footer paths, quick links |
| Canonical URLs | **Done** | `usePageSeo` sets `link[rel=canonical]` from `VITE_SITE_URL` |
| Open Graph / Twitter | **Done** | Updated per route in `usePageSeo` |
| JSON-LD | **Partial** | Organization + LocalBusiness globally; Product on detail page |
| Target keywords | **Manual** | Tune copy in `pageMeta.ts` and page content |

---

## B. Technical SEO

| Check | Status | Notes |
|--------|--------|--------|
| `robots.txt` | **Done** | `public/robots.txt` |
| XML sitemap | **Done** | `public/sitemap.xml` via `npm run sitemap` / `prebuild` |
| Submit sitemap (GSC) | **You** | After deploy |
| HTTPS / redirects | **Hosting** | Configure on CDN/server |
| No `noindex` on public pages | **Done** | `index, follow` unless 404 |
| Real 404 page | **Done** | `NotFoundPage` (no redirect to home) |
| 301 for changed URLs | **Hosting** | Not in SPA repo |
| Content in rendered HTML | **SPA gap** | Initial HTML is thin; consider **prerender** (e.g. `vite-plugin-prerender`) or SSR |
| Product URLs in sitemap | **Partial** | Top categories only; add script when products live in MongoDB |

---

## C. Local SEO

| Check | Status | Notes |
|--------|--------|--------|
| LocalBusiness schema | **Done** | `src/seo/JsonLd.tsx` |
| NAP consistency | **Review** | Match header/footer/Contact with Google Business Profile |
| Maps on Contact | **Done** | Google Maps links |
| Reviews | **Done** | Google review image + maps link |

---

## Performance (Core Web Vitals)

| Check | Status | Notes |
|--------|--------|--------|
| Lazy-load images | **Partial** | `loading="lazy"` on many; hero/banner — verify LCP element |
| WebP/AVIF | **Todo** | Corporate JPGs in `public/` — convert heavy assets |
| Bundle size | **OK** | Single JS chunk ~350KB — watch growth |
| Third-party scripts | **Low** | Mostly static; WooCommerce API on product pages |
| Skeleton loaders | **Done** | Product grid/detail |

**Measure:** PageSpeed Insights + Search Console CWV after production deploy.

---

## Mobile, security, accessibility

| Area | Status | Notes |
|------|--------|--------|
| Responsive layout | **Done** | CSS breakpoints; test nav flyouts on mobile |
| HTTPS | **Deploy** | |
| API secrets | **OK** | Keys in `server/.env` only |
| `npm audit` | **Run regularly** | Root + `server/` |
| Keyboard / focus | **Review** | Run Lighthouse accessibility |
| Loading / empty / error UI | **Partial** | Product loaders; add more empty states if needed |

---

## Content & conversion (gaps)

| Item | Status |
|------|--------|
| Clear homepage value prop | Done (HomeIntro) |
| CTAs / contact | Done (header, floating call/WhatsApp) |
| Privacy Policy / Terms | **Missing** — add pages or link to legal docs |
| Thank-you after forms | N/A until contact form backend |
| Analytics (GA4) | **Not in repo** — add via tag manager at deploy |

---

## Recommended workflow (this repo)

1. Set `VITE_SITE_URL` in production env.
2. `npm run build` (regenerates sitemap).
3. Deploy `dist/` + serve `robots.txt` and `sitemap.xml`.
4. Run **Lighthouse** (mobile + desktop) on `/`, `/corporate`, `/products`, one product URL.
5. **Search Console** → add property → submit `https://yourdomain.com/sitemap.xml` → URL inspection on key pages.
6. **Rich Results Test** on homepage and a product page.

---

## Launch targets (internal)

| Metric | Target | How |
|--------|--------|-----|
| Lighthouse SEO | 95+ | Fix any audit items in DevTools |
| Lighthouse Performance | 90+ | Image compression, LCP |
| Broken links | 0 | Screaming Frog on staging |
| Missing titles | 0 | Automated via `STATIC_PAGE_META` |

---

## Files to maintain

| File | Purpose |
|------|---------|
| `src/seo/pageMeta.ts` | Static page titles & descriptions |
| `src/seo/usePageSeo.ts` | Canonical, OG, Twitter, robots |
| `src/seo/JsonLd.tsx` | Structured data |
| `public/robots.txt` | Crawl rules |
| `public/sitemap.xml` | Generated — do not hand-edit |
| `scripts/generate-sitemap.mjs` | Add new static routes here |

---

## Next.js note

Your checklist’s `generateMetadata`, `app/sitemap.ts`, and SSR defaults **do not apply** to this Vite app. Equivalent work is above; for full parity consider migrating marketing pages to SSG or adding prerender on build.
