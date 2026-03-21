# Scalability Audit — 2026-03-16

## Findings

### Fixed

**Domain centralisation**
- Created `src/lib/siteConfig.ts` — single source for `SITE_URL`, `SITE_NAME`, `SITE_EMAIL`
- Updated `src/app/layout.tsx` — metadata, OpenGraph, Schema.org now use `SITE_URL`/`SITE_NAME`
- Updated `src/components/CrawlPageLayout.tsx` — Schema.org URL uses `SITE_URL`
- Updated `src/components/SiteFooter.tsx` — email link uses `SITE_EMAIL`

**Share text generation**
- Removed 10 hardcoded share text strings from `src/app/[slug]/crawlConfig.tsx`
- `CrawlPageLayout` now auto-generates share text from `crawl.name` + `crawl.tagline` + `SITE_URL`
- `shareText` remains as an optional override prop if a crawl needs custom copy

**CrawlNameScramble**
- `src/components/ui/crawl-name-scramble.tsx` now derives names from `crawls.filter(c => c.live)` instead of a hardcoded array
- Adding a new live crawl automatically includes it in the hero animation

**Static generation + SEO**
- `src/app/[slug]/page.tsx` refactored from `'use client'` to async server component with `generateStaticParams`
- Client logic moved to `src/app/[slug]/CrawlPageContent.tsx`
- All 9 live crawl pages now statically generated at build time (SSG)
- Created `src/app/sitemap.ts` — dynamic sitemap generated from crawl index

**CrawlCard fallback colour**
- `src/components/CrawlCard.tsx` now falls back to `crawl.accentColor` instead of hardcoded `#8A7060`
- New crawls automatically get their accent colour as the card border

### Recommendations (not fixed)

**InteractiveMap hardcoded colours** — `src/components/InteractiveMap.tsx` has 7 hardcoded hex values for ink, gold, muted, teal in popup styles and polyline config. This component is only used by the GenericCrawlPage fallback (which is no longer reachable since all crawls have ScrollMaps). Consider removing InteractiveMap entirely, or refactoring to use CSS variables if it's needed for future features.

**crawlConfig coverage check** — No build-time enforcement that all live crawls have entries in `crawlConfigs`. The runtime `notFound()` guard catches this, but a missing config won't be caught until someone visits the URL. Consider adding a check to `validate-crawls.ts` that imports the config keys and cross-references.

**MonopolyScrollMap theme colours** — `markerColor: '#990F3D'` and `markerTextColor: '#FFF1E5'` are design system colours (claret, cream) but hardcoded in the theme object. Not worth fixing since these are intentional per-crawl theme choices that happen to match the global palette — they could diverge in future.

**More Crawls pub count** — The "More Crawls" section in `CrawlPageLayout` shows `otherCrawl.pubCount ?? otherCrawl.pubs.length`. This is correct, but the `pubs` array in the crawl index is the old generic pubs system, not the per-crawl detailed pubs. Consider deprecating the `pubs` field in the index in favour of `pubCount` once all crawls have per-crawl data files.

---

## Architecture summary

### To add a new crawl:
1. Create data file: `src/content/crawls/{slug}.ts` — interface extending `BasePub`, pub array, stats export
2. Add to index: `src/content/crawls/index.ts` — add entry with `live: true`
3. Create ScrollMap: `src/components/{Name}ScrollMap.tsx` — ~160 lines: theme + card component + `<BaseScrollMap>` wrapper
4. Register config: `src/app/[slug]/crawlConfig.tsx` — add entry mapping slug → ScrollMap + pubCount
5. Add pub data to validator: `scripts/validate-crawls.ts` — import pubs, add to `pubArrays` map
6. Run `npm run build` — validates data, generates static page, updates sitemap

### To change the design system:
1. Update CSS variables in `src/app/globals.css` (`:root` block)
2. Tailwind utilities auto-update via `@theme inline` directive
3. All components using `var(--claret)`, `bg-[var(--ink)]`, etc. update automatically

### To add a new field to all pub cards:
1. Add field to `BasePub` in `src/content/crawls/types.ts`
2. Add rendering to `BasePubCardBody` in `src/components/BasePubCard.tsx`
3. All 10 crawl cards pick it up automatically

### To change the page layout for all crawls:
1. Edit `src/components/CrawlPageLayout.tsx`
2. All crawl pages update — hero, about, share, more crawls, footer

### To change map behaviour for all crawls:
1. Edit `src/components/BaseScrollMap.tsx`
2. All scroll maps update — markers, route lines, interactions, layout
