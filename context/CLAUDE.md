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
- **Maps:** Leaflet.js (lazy-loaded)
- **Content:** Flat JSON/TS files in `src/content/crawls/`
- **Fonts:** Google Fonts (Playfair Display, Barlow, Barlow Condensed, Spectral) via next/font

### File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — fonts, nav, footer
│   ├── page.tsx                # Homepage
│   ├── [slug]/
│   │   └── page.tsx            # Crawl landing page template
│   └── globals.css             # Tailwind base + CSS variables
├── content/
│   └── crawls/
│       ├── index.ts            # Exports all crawls, shared types
│       ├── monopoly.ts         # One file per crawl
│       ├── circleline.ts
│       └── ripper.ts
├── components/
│   ├── SiteNav.tsx             # Sticky nav
│   ├── SiteFooter.tsx          # Footer
│   ├── InteractiveMap.tsx      # Shared map wrapper (Leaflet)
│   ├── CrawlCard.tsx           # Homepage directory card
│   ├── StatBlock.tsx           # Individual stat display
│   ├── SectionLabel.tsx        # Overline label component
│   ├── HowItWorksStep.tsx      # How It Works step
│   ├── PubCarousel.tsx         # Horizontal pub card carousel
│   ├── RouteSpine.tsx          # Vertical route spine
│   ├── Ticker.tsx              # Stats ticker bar
│   ├── MonopolyPubCard.tsx     # Monopoly-themed pub card
│   ├── MonopolyMap.tsx         # Monopoly map configuration
│   ├── CircleLinePubCard.tsx   # Circle Line-themed pub card
│   ├── CircleLineMap.tsx       # Circle Line map configuration
│   ├── RipperStationCard.tsx   # Jack the Ripper-themed pub card
│   ├── RipperMap.tsx           # Ripper map configuration
│   └── ui/                     # Generic UI primitives
└── lib/
    └── utils.ts                # Shared utilities
```

### Code Rules

1. **One component per file.** No 1,900-line page files. Extract components.
2. **Crawl page template is generic.** `[slug]/page.tsx` should be a single reusable template that receives crawl data as props and renders the correct themed pub card based on slug. It should NOT contain per-crawl page components.
3. **Props over conditionals.** Themed components (pub cards, map configs) are separate files selected by slug — not giant switch statements inside a single component.
4. **Tailwind for styling.** Use Tailwind utility classes. Avoid inline styles except in per-crawl pub cards where bespoke styling is the point.
5. **Mobile-first.** Write mobile styles first, use `md:` and `lg:` breakpoints to scale up. Most users will be on their phone during the crawl.
6. **Lazy-load maps.** Use `next/dynamic` with `ssr: false` for Leaflet components.
7. **Images:** Use `next/image` with lazy loading and blur placeholders where possible.
8. **Static generation:** Use `generateStaticParams` for all crawl pages. No SSR, no client-side data fetching for page content.
9. **Content stays in `/content/`.** Never hardcode pub data or crawl metadata in components or page files.
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

Each crawl is a self-contained TypeScript file exporting its data. The shared type interface lives in `src/content/crawls/index.ts`.

**Core crawl fields:** slug, title, tagline, neighbourhood, description (editorial), duration, distance, pubCount, difficulty, bestTime, tubeStart, tubeEnd, status, pubs array, SEO metadata.

**Core pub fields:** id, pubName, address, postcode, lat, lng, googlePlaceId, review (crawl-specific editorial), website, image.

Some crawls have additional fields (Monopoly has `property`, `color`, `colorGroup`, `price`, `pintQuantity`). These are crawl-specific extensions, not part of the base schema.

Pub descriptions are crawl-specific — the same pub described differently depending on the crawl theme. There is no shared pub database at V1.

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

### File Structure (per crawl)

Each crawl requires two files:

1. **Data file:** `src/content/crawls/{slug}.ts` — exports the pub array, stats, and helper functions
2. **Scroll map component:** `src/components/{Name}ScrollMap.tsx` — the unified map + pub list component

The crawl page itself lives at `src/app/[slug]/page.tsx` which contains a dedicated page component per crawl (e.g. `MonopolyCrawlPage`, `CircleLineCrawlPage`, `RipperCrawlPage`).

### Data File (`src/content/crawls/{slug}.ts`)

Each data file exports:

- **Interface:** `{Name}Pub` — the pub type for this crawl. Minimum fields: `id`, `pubName`, `address`, `postcode`, `lat`, `lng`, `review`, `walkToNext` (or transport equivalent). Crawl-specific fields are allowed (Monopoly has `property`, `colorGroup`, `price`, etc.).
- **Pub array:** `{name}Pubs` — the ordered array of all pubs
- **Stats object:** `{name}Stats` — computed totals (`totalPubs`, etc.)
- **Helper functions:** `get{Name}MapsUrl(pub)` and `get{Name}DirectionsUrl(from, to)` — Google Maps URL generators

The crawl must also have an entry in `src/content/crawls/index.ts` with slug, name, tagline, editorialDescription, duration, difficulty, `live: true`, etc.

### Scroll Map Component (`src/components/{Name}ScrollMap.tsx`)

This is the core interactive component. Every crawl's scroll map follows the same pattern:

**Architecture:**
- Client component (`'use client'`)
- MapLibre GL JS with CARTO Voyager basemap (`https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json`)
- No SSR — dynamically imported in the page with `next/dynamic` and `ssr: false`
- All pub data imported from the crawl's data file, never hardcoded

**State:**
- `activePubId` — which pub is currently selected (starts at 1)
- `showMap` — mobile map toggle visibility
- Refs: `mapRef` (MapLibre instance), `markersRef` (marker DOM elements), `cardRefs` (card DOM elements for scroll targeting), `listRef` (list panel for scroll control)

**Map setup (in useEffect):**
- Initialise MapLibre map in a container ref
- `scrollZoom: false`, `dragRotate: false`, `touchZoomRotate: true`, `touchPitch: false`
- Navigation control (zoom only, no compass) top-right
- `fitBounds` on load to show all pubs
- Two GeoJSON line sources: `route-bg` (full route, always visible, solid) and `route-progress` (draws progressively as pubs are selected)
- DOM markers created for each pub, colour-coded per crawl theme, numbered, stored in `markersRef`
- Marker click calls `selectPub(pubId)`

**Core interactions:**
- `selectPub(pubId)` — the single function that drives everything:
  - Sets active pub state
  - `flyTo()` with zoom 15.5–16, duration 1200ms, cubic ease-out: `easing: (t) => 1 - Math.pow(1 - t, 3)`
  - Highlights active marker (add active class, scale 1.5x), dims others (opacity 0.4)
  - Updates progressive route line via `setData()` on the GeoJSON source
  - Scrolls the list panel so the selected card is at the top (50ms delay to let accordion open first)

**Layout (mobile-first CSS with `lg:` desktop override):**

Mobile (default):
- Vertical stack: map toggle button → map panel (35vh, collapsible) → pub list (scrollable, max-height 55vh)
- Tapping a pub expands an inline themed card, scrolls it into view

Desktop (`@media min-width: 1024px`):
- Horizontal split: map panel (flex: 1, takes majority) | pub list (320px fixed, right side)
- 85vh height, bordered top and bottom with `var(--ink)`
- Map panel has right border
- List panel: `width: 320px !important; max-width: 320px !important; flex-shrink: 0; flex-grow: 0`
- Expanded card: 280px wide, centred with `margin: auto`, portrait proportions

**Pub list rows (compact state):**
- Each row: themed number dot + pub name
- Click to select (expands card, flies map)
- Active row gets `background: var(--surface)` and a coloured left border

**Expanded card (active pub):**
- Themed to the crawl (Monopoly = property deed, Circle Line = tube stop sign, Ripper = Victorian dark)
- Shows: themed header band, pub name (Playfair Display), address, review text (Spectral/font-card, 2–3 sentences), action links (Open in Maps, Website, Directions)
- On desktop: fixed width 280px, portrait proportions, centred in the 320px column

**Progress pill:**
- Positioned bottom-left over the map
- Frosted glass background
- Shows progress bar + "X/total" count

**Marker styles (global CSS):**
- 26px circles, numbered, themed colours
- Active: scale 1.5x, themed border/shadow
- Dimmed: opacity 0.4
- Hover: scale 1.3x, opacity restored

### Crawl Page Component (`[slug]/page.tsx`)

Each crawl has a dedicated function component that follows this section order:

1. **Schema.org structured data** — TouristAttraction JSON-LD
2. **SiteNav**
3. **Hero** — claret background, crawl name (Playfair Display), tagline (italic), stat pills (Chip components for pub count, duration, difficulty). Back link ("All Crawls") in white.
4. **About This Crawl** — editorial description, max-width 800px (only renders if editorialDescription exists)
5. **Crawl-specific sections** — e.g. Ripper has the Victims Memorial between About and the scroll map
6. **ScrollMap component** — dynamically imported, replaces both old map and pub card sections
7. **Share & Save** — WhatsApp share link + Print Route button
8. **Build Your Own CTA** — dark section linking to /build
9. **More Crawls** — 2 cards for other live crawls
10. **SiteFooter**

The page component is wired into the main `CrawlPage` export via a slug check:
```
if (slug === 'monopoly') return <MonopolyCrawlPage crawl={crawl} />;
if (slug === 'circle-line') return <CircleLineCrawlPage crawl={crawl} />;
if (slug === 'jack-the-ripper') return <RipperCrawlPage crawl={crawl} />;
return <GenericCrawlPage crawl={crawl} />;
```

### Per-Crawl Theming

Theming is limited to the scroll map component:
- **Marker colours** — match the crawl identity (Monopoly = property group colours, Circle Line = yellow with dark border, Ripper = dark with red border)
- **Route line colour** — crawl's primary colour
- **Expanded card design** — unique per crawl (deed, tube stop, Victorian newspaper, etc.)
- **Number dot colours** in the compact list

Everything else (hero, nav, footer, share section, CTA, More Crawls) uses the unified design system with no per-crawl variation.

### Adding a New Crawl

Each new crawl needs:
1. A data file in `src/content/crawls/`
2. An entry in `src/content/crawls/index.ts`
3. A scroll map component in `src/components/` themed to the crawl
4. A page component entry in `src/app/[slug]/page.tsx` following the section order above

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