# CLAUDE.md — London on Tap

> This file is the single source of truth for Claude Code working on this project.
> Read it fully before making any changes. When in doubt, refer back here.

---

## What This Project Is

London on Tap is a free, self-guided pub crawl platform for London. It provides themed, curated routes with pub-by-pub itineraries and interactive maps. The site launches with ~10 crawls and targets organic search traffic in a space with no credible incumbent.

This is a solo hobby project with serious commercial ambitions. The aesthetic is editorial/magazine — think a beautifully designed travel guide, not a web app. Every page should feel like something worth trusting and sharing.

**The full PRD lives at `context/prd.md`. Read it for product context, content model, SEO strategy, and feature scope.**

---

## Design System

The visual language is editorial/magazine, inspired by the Financial Times aesthetic — warm, confident, typographically rich.

### Colour Palette

| Token | Hex | CSS Variable | Usage |
|-------|-----|-------------|-------|
| Background | `#FFF1E5` | `--background` | Page backgrounds (warm cream) |
| Surface | `#F2DFCE` | `--surface` | Slightly darker cream for alternating sections, cards |
| Ink | `#1A0A00` | `--ink` | Primary text colour |
| Claret | `#990F3D` | `--claret` | Primary accent — CTAs, buttons, hero backgrounds, dark sections (nav, footer, stats bar) |
| Claret Dark | `#6D0A2B` | `--claret-dark` | Hover state for claret elements |
| Gold | `#C47B10` | `--gold` | Secondary accent — stat numbers, badges, decorative elements |
| Teal | `#0D7680` | `--teal` | Default link colour (distinct from claret buttons) |
| Muted | `#8A7060` | `--muted` | Subdued / secondary text |

Use CSS variables everywhere. Never hardcode hex values in components.

**Palette rules:**
- Background (`--background`) is the default page background. Not white. Not pure cream.
- Ink (`--ink`) is the default text colour. Not pure black.
- Claret (`--claret`) is the primary interactive colour — buttons, CTAs, and also the dark section background for nav-on-scroll, footer, and stats bar.
- Gold (`--gold`) is for secondary emphasis — stat numbers, decorative accents, icon highlights.
- Teal (`--teal`) is for inline text links — keeps them visually distinct from claret buttons.
- Surface (`--surface`) is for visual separation — alternating section backgrounds, card surfaces.
- Muted (`--muted`) is for secondary text, timestamps, captions.

**Per-crawl border colours** are defined as separate variables (`--monopoly-border`, `--circle-line-border`, `--ripper-border`, etc.) and used only within per-crawl pub cards and map markers.

### Typography

Four font roles, each with a distinct purpose:

| Role | CSS Variable | Font Stack | Usage |
|------|-------------|------------|-------|
| Display | `--font-display` | Playfair Display, Georgia, serif | Page titles, hero headlines, section headings |
| Label | `--font-label` | Barlow Condensed, system-ui, sans-serif | Nav items, overlines, small caps labels, stat labels, buttons |
| Body | `--font-body` | Barlow, system-ui, sans-serif | Body text, descriptions, editorial prose |
| Card | `--font-card` | Spectral, Georgia, serif | Pub card text — a warmer serif that sits between display and body |

All four fonts are loaded via Google Fonts in `layout.tsx`.

**Typography rules:**
- Hero headlines: Playfair Display, large and confident — 3rem+ on desktop, scaling down on mobile.
- Body text: Barlow, 1rem (16px) minimum, generous line-height (1.6–1.7).
- Section labels / overlines: Barlow Condensed, small caps, letterspaced, gold or claret colour.
- Pub card descriptions: Spectral — gives cards a warmer, more literary feel than body sans-serif.
- Never use Playfair Display for small text. It's a display face — keep it at heading sizes.
- Never use more than 3 font weights on a single page.

### Spacing & Layout

- Max content width: 1200px (72rem), centred.
- Section padding: 5rem (80px) vertical on desktop, 3rem (48px) on mobile.
- Card grids: CSS Grid with responsive columns (1 col mobile, 2 col tablet, 3 col desktop).
- Generous whitespace between sections. When in doubt, add more space.

### Motion & Interaction

- **Card hover:** Subtle lift (translateY -4px) with box-shadow increase. Transition 200ms ease.
- **Section entrances:** Fade-in-up on scroll using Intersection Observer. Stagger children by 100ms. Keep it subtle — 20px translate, 400ms duration.
- **Map markers:** Gentle bounce on appearance. No continuous animation.
- **Buttons:** Background colour transition on hover (200ms). Claret to claret-dark. No scale transforms on buttons.
- **Page transitions:** None at V1. Don't add route transition animations.

### Component Conventions

**Per-crawl theming is limited to TWO elements only:**
1. **Pub cards** — each crawl has a bespoke card design (Monopoly = property deed, Circle Line = roundel, Ripper = Victorian newspaper, etc.)
2. **Map markers** — styled to match the crawl's card theme.

**Everything else uses the unified platform design:** nav, footer, hero layout, section structure, typography, spacing. No per-crawl colour schemes. No per-crawl fonts. No mood switching.

---

## Tech Stack & Conventions

### Stack
- **Framework:** Next.js (App Router, static generation)
- **Styling:** Tailwind CSS
- **Maps:** MapLibre GL JS (lazy-loaded via `next/dynamic`)
- **Content:** Flat TypeScript files in `src/content/crawls/`
- **Fonts:** Google Fonts (Playfair Display, Barlow, Barlow Condensed, Spectral) via next/font

### File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — fonts, nav, footer
│   ├── page.tsx                # Homepage
│   ├── sitemap.ts              # Auto-generated sitemap from crawl index
│   ├── [slug]/
│   │   ├── page.tsx            # Server component — generateStaticParams + slug routing
│   │   ├── CrawlPageContent.tsx # Client component — renders layout + scroll map
│   │   └── crawlConfig.tsx     # Registry mapping slugs to ScrollMap components + config
│   └── globals.css             # Tailwind base + CSS variables
├── content/
│   └── crawls/
│       ├── types.ts            # BasePub — shared type all pub interfaces extend
│       ├── index.ts            # Exports all crawls, shared types, re-exports BasePub
│       ├── monopoly.ts         # One data file per crawl (extends BasePub)
│       ├── circleline.ts
│       └── ...
├── components/
│   ├── CrawlPageLayout.tsx     # Shared page template (hero, about, share, more crawls, footer)
│   ├── BaseScrollMap.tsx       # Shared map/interaction logic — accepts theme + renderCard
│   ├── BasePubCard.tsx         # Shared card body content — accepts wrapper for per-crawl shell
│   ├── MonopolyScrollMap.tsx   # Per-crawl: theme + card component + BaseScrollMap wrapper
│   ├── BeatlesScrollMap.tsx
│   ├── ...ScrollMap.tsx        # One per crawl (~160–260 lines each)
│   ├── SiteNav.tsx             # Sticky nav
│   ├── SiteFooter.tsx          # Footer
│   ├── CrawlCard.tsx           # Homepage directory card
│   └── ui/                     # Generic UI primitives
├── lib/
│   └── siteConfig.ts           # Centralised domain, site name, email
└── scripts/
    └── validate-crawls.ts      # Build-time data validation (runs as prebuild)
```

### Code Rules

1. **One component per file.** Extract components into separate files.
2. **Shared infrastructure over duplication.** Page layout, map logic, and card content are shared components (`CrawlPageLayout`, `BaseScrollMap`, `BasePubCard`). Per-crawl files contain only the theme config and card design.
3. **Config registry over conditionals.** Per-crawl components are registered in `crawlConfig.tsx` and looked up by slug — no if/else chains or switch statements.
4. **Tailwind for styling.** Use Tailwind utility classes. Per-crawl pub cards use `style jsx` for bespoke card CSS.
5. **Mobile-first.** Write mobile styles first, use `md:` and `lg:` breakpoints to scale up. Most users will be on their phone during the crawl.
6. **Lazy-load maps.** Use `next/dynamic` with `ssr: false` for ScrollMap components.
7. **Images:** Use `next/image` with lazy loading and blur placeholders where possible.
8. **Static generation:** `generateStaticParams` generates all crawl pages at build time. No SSR, no client-side data fetching for page content.
9. **Content stays in `/content/`.** Never hardcode pub data or crawl metadata in components or page files. Domain/site name live in `src/lib/siteConfig.ts`.
10. **Semantic HTML.** Use `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>` appropriately.

### Tailwind Config

The palette should be defined in `tailwind.config.ts` so you can use utility classes like `bg-background`, `text-ink`, `text-claret`, `bg-surface`, `text-gold`:

```ts
colors: {
  background: '#FFF1E5',
  surface: '#F2DFCE',
  ink: '#1A0A00',
  claret: { DEFAULT: '#990F3D', dark: '#6D0A2B' },
  gold: '#C47B10',
  teal: '#0D7680',
  muted: '#8A7060',
}
```

Font family config:

```ts
fontFamily: {
  display: ['Playfair Display', 'Georgia', 'serif'],
  label: ['Barlow Condensed', 'system-ui', 'sans-serif'],
  body: ['Barlow', 'system-ui', 'sans-serif'],
  card: ['Spectral', 'Georgia', 'serif'],
}
```

---

## Content Model

Each crawl has a data file in `src/content/crawls/` and an entry in the crawl index (`index.ts`). The shared `BasePub` interface lives in `types.ts`.

**Core crawl fields (in index.ts):** slug, name, tagline, editorialDescription, duration, difficulty, area, live, pubCount, accentColor, secondaryColor, pubs array.

**Core pub fields (BasePub in types.ts):** id, pubName, address, postcode, lat, lng, review (crawl-specific editorial), website?, image?, googlePlaceId?.

Each crawl's pub interface extends `BasePub` with crawl-specific fields (e.g. Monopoly adds `property`, `colorGroup`, `price`, `pintQuantity`; Beatles adds `connection`; Ripper adds `walkToNext`).

Pub descriptions are crawl-specific — the same pub described differently depending on the crawl theme. There is no shared pub database at V1.

**Build-time validation:** `scripts/validate-crawls.ts` runs as a `prebuild` hook and checks all live crawls for: non-empty pub arrays, sequential IDs, required BasePub fields, London lat/lng bounds, valid UK postcodes, review length.

---

## SEO Requirements

Every crawl page must have:
- Unique `<title>` and `<meta name="description">` via Next.js `generateMetadata`
- Open Graph tags (og:title, og:description, og:image)
- Canonical URL
- Schema.org structured data: `TouristAttraction` per crawl, `ItemList` on the directory, `WebSite` on the homepage
- Semantic, crawlable HTML — no important content hidden behind JS-only interactions
- Clean URLs: `/monopoly`, `/circle-line`, `/jack-the-ripper`

---

## Crawl Page Architecture

### Shared Infrastructure

The crawl page system is built on four shared components:

- **`CrawlPageLayout.tsx`** — shared page template that owns all common sections: Schema.org JSON-LD, SiteNav, hero (claret background, name, tagline, stat pills), About This Crawl, `{beforeMap}` slot, `{children}` (ScrollMap), `{afterMap}` slot, Share & Save (WhatsApp + Print), More Crawls (2 cards), SiteFooter. Changing this file changes every crawl page.

- **`BaseScrollMap.tsx`** — shared map + interaction logic (510 lines). Handles: MapLibre GL JS init, CARTO Voyager basemap, markers, route lines, fitBounds, flyTo, marker highlighting, scroll-to-card, mobile toggle, progress pill, responsive layout. Accepts `theme` (colours) and `renderCard` (per-crawl card JSX) as props. Uses a ref-based pattern (`selectPubRef`) to avoid stale closures in marker click handlers.

- **`BasePubCard.tsx`** — shared card body content: address, review text (trimmed to 3 sentences), action links (Maps, Website, Directions). Each per-crawl card provides its themed outer shell and header, then renders `BasePubCardBody` for the shared inner content. Also exports `getMapsUrl()` and `getDirectionsUrl()` helpers.

- **`BasePub` (in `types.ts`)** — shared interface all per-crawl pub types extend. Fields: `id`, `pubName`, `address`, `postcode`, `lat`, `lng`, `review`, `website?`, `image?`, `googlePlaceId?`. Crawl-specific fields (e.g. Monopoly's `property`, `colorGroup`) are extensions.

### Page Routing

`src/app/[slug]/page.tsx` is a server component with `generateStaticParams`. It validates the slug, then renders `CrawlPageContent` (a client component) which looks up the crawl data + config and renders `CrawlPageLayout` with the appropriate `ScrollMap`.

`src/app/[slug]/crawlConfig.tsx` is the registry mapping each slug to its `ScrollMap` component, `pubCount`, and optional `beforeMap`/`afterMap` slots (e.g. Ripper's Victims Memorial, Bermondsey's freshness caveat).

### Per-Crawl ScrollMap (~160–260 lines each)

Each crawl has one ScrollMap file (e.g. `MonopolyScrollMap.tsx`) containing only:
1. Theme config (`ScrollMapTheme` — marker colours, route colour)
2. Card component — the themed expanded card JSX + card-specific CSS
3. A thin wrapper rendering `<BaseScrollMap pubs={...} theme={...} renderCard={...} />`

### Per-Crawl Theming

Theming is limited to the scroll map component:
- **Marker colours** — match the crawl identity
- **Route line colour** — crawl's primary colour
- **Expanded card design** — unique per crawl (deed, tube stop, Victorian newspaper, etc.)
- **Number dot colours** in the compact list

Everything else (hero, nav, footer, share section, More Crawls) uses the unified design system with no per-crawl variation.

### How-To Checklists

**To add a new crawl:**
1. Create data file: `src/content/crawls/{slug}.ts` — interface extending `BasePub`, pub array, stats export
2. Add to index: `src/content/crawls/index.ts` — add entry with `live: true`
3. Create ScrollMap: `src/components/{Name}ScrollMap.tsx` — theme + card component + `<BaseScrollMap>` wrapper
4. Register config: `src/app/[slug]/crawlConfig.tsx` — add entry mapping slug → ScrollMap + pubCount
5. Add pub data to validator: `scripts/validate-crawls.ts` — import pubs, add to `pubArrays` map
6. Run `npm run build` — validates data, generates static page, updates sitemap

**To change the design system:**
1. Update CSS variables in `src/app/globals.css` (`:root` block)
2. Tailwind utilities auto-update via `@theme inline` directive
3. All components using `var(--claret)`, `bg-[var(--ink)]`, etc. update automatically

**To add a new field to all pub cards:**
1. Add field to `BasePub` in `src/content/crawls/types.ts`
2. Add rendering to `BasePubCardBody` in `src/components/BasePubCard.tsx`
3. All 10 crawl cards pick it up automatically

**To change the page layout for all crawls:**
1. Edit `src/components/CrawlPageLayout.tsx`
2. All crawl pages update — hero, about, share, more crawls, footer

**To change map behaviour for all crawls:**
1. Edit `src/components/BaseScrollMap.tsx`
2. All scroll maps update — markers, route lines, interactions, layout

---

## What "Done" Looks Like

A crawl page is done when:
- It looks like a page from a well-designed travel magazine
- A stranger could open it on their phone and follow the route with no confusion
- The pub cards feel themed and crafted, not templated
- The map works and markers are clickable
- It loads fast (aim for 90+ Lighthouse performance)
- The editorial copy is original, warm, and useful
- SEO metadata is complete
- It's responsive and works beautifully at 375px

---

## Don'ts

- Don't add per-crawl colour schemes beyond pub cards and map markers
- Don't use Inter, Roboto, or generic system sans-serif for headings — headings are Playfair Display
- Don't use pure white (`#FFFFFF`) backgrounds — use `--background`
- Don't use pure black (`#000000`) text — use `--ink`
- Don't hardcode hex values in components — use CSS variables
- Don't hardcode content in components — content lives in `/content/`
- Don't use SSR — everything is statically generated
- Don't add authentication, payments, or user accounts
- Don't add a CMS or admin panel
- Don't add route transition animations
- Don't install UI component libraries (shadcn, Radix, etc.) — build what's needed