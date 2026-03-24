# Pre-Launch Checklist — London on Tap

**Date:** 2026-03-24
**Audited by:** Claude

## Summary

| | Count |
|---|---|
| Total items checked | 44 |
| ✅ Passed | 33 |
| 🔧 Fixed | 7 |
| ❌ Needs attention | 4 |

---

## Fixes Applied

| File | Change |
|---|---|
| `src/app/layout.tsx` | Added `alternates.canonical` pointing to SITE_URL |
| `src/app/[slug]/page.tsx` | Added `generateMetadata` — crawl pages were inheriting generic homepage title/description. Now generates unique title, description, OG, Twitter card, and canonical per crawl |
| `src/app/crawls/layout.tsx` | **Created** — metadata for /crawls page (title, description, OG, canonical) since the page component is `'use client'` |
| `src/app/robots.ts` | **Created** — `allow: /` for all user agents, sitemap directive |
| `src/app/sitemap.ts` | Added missing `/build` page entry |
| `src/app/page.tsx` | Added `ItemList` JSON-LD schema listing all live crawls |
| `src/content/crawls/index.ts` | Added missing `pubCount: 13` on Bermondsey Beer Mile; fixed missing period on Literary London editorial description; corrected "Art Nouveau" → "Arts and Crafts" for The Black Friar in South Bank editorial description |

---

## Needs Attention

1. **❌ No OG image anywhere.** Social shares on Twitter/Facebook/LinkedIn will have no preview image. Create a 1200×630px image and place at `src/app/opengraph-image.png` (Next.js convention) or configure `openGraph.images` in layout metadata.

2. **❌ No apple-touch-icon.** iOS users adding the site to their home screen get a generic screenshot. Create a 180×180px PNG and place at `src/app/apple-icon.png`.

3. **❌ Literary London tagline mentions "Woolf" but no Woolf pub exists on the crawl.** Tagline: *"Where London's writers drank — Dickens, Orwell, Woolf, and more"*. The actual writers featured are Orwell, Dylan Thomas, Dickens, Jeffrey Bernard, Johnson, Shakespeare. Consider changing "Woolf" to "Dylan Thomas".

4. **❌ Beatles logistics say "Start at Abbey Road" but pub #1 is in Belgravia.** `tubeStart: 'St John's Wood'` and tips say "Start at Abbey Road for the photo" — but the crawl starts at The Horse & Groom near Hyde Park Corner. May be intentional (photo op then head to pub 1) but could confuse users.

---

## Section-by-Section Results

### 1. SEO & Meta Tags

| Check | Status | Detail |
|---|---|---|
| Homepage title | ✅ | "London on Tap \| Free Self-Guided Pub Crawls" (47 chars) |
| Homepage meta description | ✅ | 131 chars |
| Crawl page titles | 🔧 | Were missing — added via `generateMetadata`. Longest: 48 chars |
| Crawl page descriptions | 🔧 | Were missing — now generated from `editorialDescription`, capped at 155 chars |
| /crawls page metadata | 🔧 | Created `crawls/layout.tsx` with title + description |
| /build page metadata | ✅ | Has title + description |
| Open Graph tags (homepage) | ✅ | Title, description, url, siteName, locale, type |
| Open Graph tags (crawl pages) | 🔧 | Added via `generateMetadata` |
| OG image | ❌ | **Missing everywhere.** No preview image for social shares |
| Twitter card tags | ✅ | `summary_large_image` with title + description |
| Canonical URLs | 🔧 | Added to layout + per-crawl pages |
| Trailing slash consistency | ✅ | All URLs use no-trailing-slash format |
| Schema.org WebSite JSON-LD | ✅ | Present in layout with name, url, publisher |
| Schema.org ItemList (homepage) | 🔧 | Added — lists all live crawls with position + URL |
| Schema.org TouristAttraction (crawl pages) | ✅ | Present in CrawlPageLayout with name, description, url, address |
| robots.txt | 🔧 | Created `src/app/robots.ts` |
| XML sitemap | ✅ | All 9 live crawls + homepage + /crawls included |
| Sitemap /build entry | 🔧 | Was missing, added |
| noindex on indexed pages | ✅ | None found |
| Internal links | ✅ | All resolve correctly |
| Image alt text | ✅ | N/A — site uses CSS background images, not `<img>` tags |
| Apple touch icon | ❌ | **Missing** |
| Favicon | ✅ | `src/app/favicon.ico` exists |

### 2. Content & Copy

| Check | Status | Detail |
|---|---|---|
| Placeholder text (Lorem ipsum, TODO, TBC) | ✅ | None found |
| Commented-out live content | ✅ | None found |
| All 110 pubs have reviews | ✅ | Every pub across all 9 live crawls has a substantive review |
| Brand name consistency | ✅ | "London on Tap" used correctly in all 12 references |
| Old brand name references | ✅ | No "London Crawling" references. `monopolypubcrawl.com` references are legitimate (redirect domain) |
| Crawl name consistency | ✅ | Nav, footer, sitemap, and cards all render dynamically from `crawls` array |
| About section copy | ✅ | Matches final approved version |
| Spelling | ✅ | No errors found |
| Bermondsey pubCount | 🔧 | Was missing — added `pubCount: 13` |
| Literary London editorial period | 🔧 | Missing period at end of description — fixed |
| South Bank editorial "Art Nouveau" | 🔧 | Incorrect — The Black Friar is Arts and Crafts, not Art Nouveau. Fixed |
| Literary London tagline "Woolf" | ❌ | Woolf is not featured on the crawl |
| Monopoly tagline "board spaces" | ✅ | Minor — 26 properties, not 40 spaces. Acceptable shorthand |
| Beatles logistics start point | ❌ | Says "Start at Abbey Road" but pub #1 is in Belgravia |

### 3. Technical Health

| Check | Status | Detail |
|---|---|---|
| `npm run build` | ✅ | Zero errors, zero warnings, 16 pages generated |
| `npx tsc --noEmit` | ✅ | Zero TypeScript errors |
| console.log/error in production | ✅ | Only in MapErrorBoundary `componentDidCatch` (correct usage) |
| Hardcoded localhost URLs | ✅ | None found |
| Dynamic imports with `ssr: false` | ✅ | All 10 `dynamic()` calls include `{ ssr: false }` |
| `generateStaticParams` coverage | ✅ | All 9 live crawl slugs generated |
| Unused imports | ✅ | None in page-level components |
| Environment variables documented | ✅ | `.env.example` covers MAPBOX_TOKEN and NEXT_PUBLIC_MAPTILER_KEY. NEXT_PUBLIC_SITE_URL has a fallback |
| Crawl data exports / interfaces | ✅ | All 9 files extend BasePub correctly, TypeScript confirms |
| Circular dependencies | ✅ | Clean dependency tree |
| Favicon + apple-touch-icon | ❌ | Favicon present, apple-touch-icon missing |
| Internal links (nav + footer) | ✅ | All resolve to real pages |
| TODO/FIXME comments | ✅ | None found |

### 4. Design & Responsiveness

| Check | Status | Detail |
|---|---|---|
| Fixed widths / horizontal scroll risk | ✅ | All layouts use `max-w-` with `mx-auto` |
| SiteNav sticky + frosted glass | ✅ | `position: fixed`, `backdrop-filter: blur(12px)` with webkit prefix |
| Hero viewport height on mobile | ✅ | Uses `100dvh` with `min-h-screen` fallback |
| Map container sizing | ✅ | Explicit heights: `35vh` mobile, `calc(100vh - 4.5rem)` desktop |
| Print styles | ✅ | Full `@media print` styles, `.no-print` class used throughout |
| Z-index layering | ✅ | Coherent: content(1) → map(10) → map buttons(20) → nav/FAB(50) |
| Mobile scroll conflicts | ✅ | Pub list uses native page scroll, no `overflow-y` conflicts |

*Note: Visual testing at 375px/768px/1024px/1440px requires a browser and was not performed.*

---

## Notes

- `hauntedlondon.ts` exists as a data file with pub data but is not wired into the site (not live in index.ts, no crawlConfig entry). Appears to be an upcoming crawl — no broken references.
- `public/` contains unused Next.js boilerplate SVGs (`vercel.svg`, `globe.svg`, `window.svg`, `file.svg`, `next.svg`) that could be cleaned up.
- Sitemap `lastModified` uses build time for all pages. If SEO freshness signaling matters, consider storing actual last-modified dates per crawl.
