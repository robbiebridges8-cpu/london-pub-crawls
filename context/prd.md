# London on Tap — Product Requirements Document

**Document version:** 3.0 — March 2026
**Product owner:** Robbie Bridges
**Domain:** londonontap.com
**Related domain:** monopolypubcrawl.com (redirect to /monopoly)
**Status:** Pre-launch — building crawl pages, design and content polish
**GitHub repo:** london-pub-crawls

---

## 1. Executive Summary

London on Tap is a free, self-guided pub crawl platform for London — launching with 10 themed crawls and 101 pubs, with the ambition to become the single source of truth for pub data across the city.

**Phase 1 (now):** 10 themed pub crawls with interactive maps, editorial content, and a "Build Your Own" crawl builder powered by a growing pub database.

**Phase 2 (next):** Expand the pub database toward comprehensive London coverage (~3,500 pubs) using OpenStreetMap and Google Places data. Add pub discovery, neighbourhood guides, search, and filtering. The crawls become the flagship feature of a broader pub platform.

**Phase 3 (future):** LLM-integrated "Find a Pub" / "Build Your Crawl" feature — users describe what they want in natural language and get a personalised route from the database. Commercialisation TBC. Potential multi-city expansion ("Berlin on Tap", "Dublin on Tap").

No booking, no app download, no payment required to use. This is a solo hobby project with serious commercial ambitions. The founder personally completed and documented the Monopoly Pub Crawl, which inspired the product.

**Success at 6 months:** 1,000 monthly organic users, with measurable keyword ranking progress and all 10 crawls generating repeat visits.

---

## 2. Problem Statement

### 2.1 The Gap

Thousands of people already attempt structured pub crawls in London every year — the Monopoly Pub Crawl, the Circle Line Challenge, the Bermondsey Beer Mile, and many others. They do this using fragmented, unreliable information: outdated blog posts, Reddit threads, and word of mouth. There is no single, well-maintained, purpose-built destination for this activity.

### 2.2 User Pain Points

- **No reliable, complete route:** Existing sources are often incomplete, feature closed pubs, or lack any navigable route.
- **No map or navigation support:** Users must piece together routes themselves using Google Maps, often getting lost between stops.
- **No discovery platform:** Tourists arriving in London have no obvious starting point for finding authentic pub crawl experiences. The activity is invisible to search engines.

### 2.3 Competitive Landscape

The competitive landscape is remarkably thin. A handful of outdated blog posts exist for specific crawls, but there is no dedicated, well-designed, SEO-optimised platform. Paid pub crawl tour operators exist (e.g. Sandemans, Strawberry Tours) but target a different user — those willing to pay for a guide and follow a group. Self-guided pub crawl content is a dead zone. Sites like pubcrawlroute.com and barcrawl.co.uk are functional but have zero editorial quality.

---

## 3. Goals & Success Metrics

### 3.1 V1 Launch Goals

Ship 10 fully functional crawl pages with interactive maps, complete pub data, and printable routes. Launch with all foundational SEO in place.

### 3.2 Six-Month Goals

| Metric | Target | Notes |
|--------|--------|-------|
| Monthly organic users | 1,000 | Primary success metric |
| Google ranking (Monopoly Pub Crawl) | Top 10 | Currently no dominant result |
| Google ranking (Circle Line Challenge) | Top 10 | Low competition |
| Crawl page engagement (avg. time on page) | > 3 minutes | Proxy for genuine use |
| PDF/print downloads | Track volume | Directional signal only |
| Crawls live | ~20 | Target for 6-month mark |

### 3.3 Longer-Term Goals (12–24 months)

Reach 5,000+ monthly users. Establish London on Tap as the default search result — and the default LLM citation — for all major London pub crawl queries. Build toward comprehensive pub database coverage. Begin commercialisation (model TBC). Build a content engine (blog, guides) that drives long-tail SEO traffic.

---

## 4. User Personas

### 4.1 Tourist Tom

**Age:** 28. Software engineer from Austin, Texas.
**Context:** Visiting London for 5 days with two university friends. Has done the obvious sightseeing before. Wants something social, fun, and authentically London. Googles "best pub crawls London" or asks ChatGPT.
**Needs:** A complete, trustworthy route he can follow on his phone. Wants to know which pubs are worth lingering in, what to order, and how to get between stops. Doesn't want to book anything or join a guided tour.
**Success:** Completes the crawl, shares photos on Instagram, tells friends about the site.

### 4.2 Local Laura

**Age:** 32. Marketing manager in Brixton.
**Context:** Organising a birthday activity for a group of 8 friends. Wants something more interesting than "drinks at the usual place" but doesn't want to spend hours planning. Searches "themed pub crawls London."
**Needs:** A curated route that's easy to share with a group via WhatsApp. Wants to know logistics, how long it takes, and that the pubs are actually good. May customise the route using the crawl builder.
**Success:** Has a brilliant night out, credits the site to her friends, bookmarks it for next time.

---

## 5. Scope

### 5.1 In Scope (V1)

- Homepage — crawl directory grid, stats bar, How It Works section, About section, text randomiser cycling crawl names
- 10 crawl landing pages — reusable architecture with hero, editorial description, interactive map + pub list (unified component), share/save, more crawls
- Build Your Own page — coming soon landing page at minimum, potential MVP crawl builder using 101-pub database
- 404 page — nice-to-have, not a launch blocker
- Schema.org structured data on all pages (TouristAttraction, ItemList, WebSite)
- Full SEO foundation — meta tags, Open Graph, canonical URLs, XML sitemap
- Responsive, mobile-first design
- MapLibre GL JS with CARTO Voyager basemap (no API key needed)

### 5.2 Out of Scope (V1)

- User accounts / authentication
- User-generated content or reviews
- Payment processing
- Passport / monetisation features
- Blog / editorial content
- Native mobile app
- Multi-city expansion
- Admin panel / CMS
- Real-time pub data (opening hours, wait times)
- Social login
- Comprehensive pub database (V2)

### 5.3 Next (V1.1 – V2)

- Crawl builder — interactive tool to customise any crawl route, select/deselect pubs, see real-time stats, share a custom route URL
- LLM-integrated pub finder / route builder
- Comprehensive pub database (~3,500 pubs via OSM + Google Places)
- Blog targeting long-tail keywords
- Pub discovery and neighbourhood guides
- Simple anonymous pub voting (thumbs up/down, no accounts)
- Email capture and newsletter
- Digital passport system

---

## 6. The Launch 10

| # | Crawl | Slug | Pubs | Theme / Hook | Status |
|---|-------|------|------|-------------|--------|
| 1 | Monopoly Pub Crawl | /monopoly | 26 | A pub for every space on the London Monopoly board | In development |
| 2 | Circle Line Challenge | /circle-line | 27 | One pub per station on the original Circle Line loop | In development |
| 3 | Bermondsey Beer Mile | /bermondsey-beer-mile | 8 | South London's legendary brewery trail | Data ready |
| 4 | Jack the Ripper Pub Crawl | /jack-the-ripper | 7 | Whitechapel's darkest corners, one pint at a time | In development |
| 5 | Beatles Pub Crawl | /beatles | 8 | Follow the Fab Four through London's drinking spots | Data ready |
| 6 | Historic London Pub Crawl | /historic-london | 8 | London's oldest and most storied pubs | Data ready |
| 7 | South Bank Pub Crawl | /south-bank | 6 | London's greatest riverside pubs, Blackfriars to Wapping | Data ready |
| 8 | Criminal London Pub Crawl | /criminal-london | 8 | Gangsters, smugglers, and the pubs where it all went down | Data ready |
| 9 | Literary London Pub Crawl | /literary-london | 8 | Where London's writers drank — Dickens, Orwell, and more | Data ready |
| 10 | Haunted London Pub Crawl | /haunted-london | 8 | London's most haunted pubs and the ghosts that haunt them | Data ready |

**Total: 101 pubs across 10 crawls** (some pubs appear on multiple crawls with different editorial descriptions).

---

## 7. Functional Requirements

### 7.1 Homepage

**URL:** /

**Sections (top to bottom):**

1. **Navigation** — Sticky, minimal. Text-based logo left ("London on Tap" in display font with subtle amber pint glass icon). Right: Crawls / About. Frosted background on scroll.
2. **Hero** — Full-screen (100vh) atmospheric photo background. Centred text: stats bar (crawl count, pub count, "Free Always"), main headline ("London on Tap" in enormous display font), text randomiser cycling crawl names (claret portion + ink portion), two CTAs ("Explore the Crawls" filled, "Build Your Own" outlined). Scroll indicator chevron.
3. **Crawl directory grid** — Card layout, responsive columns. Each card visually distinct per crawl.
4. **How It Works** — 3 value props with icons.
5. **About** — Founder's story, warm, authentic, first-person tone.
6. **Footer** — Claret background. Logo, link columns, crawl links (with "coming soon" for unbuilt crawls), one-liner.

### 7.2 Crawl Landing Page

**URL:** /[slug]

Each crawl page follows the architecture documented in `context/CLAUDE.md` under "Crawl Page Architecture". Section order:

1. Schema.org TouristAttraction JSON-LD
2. SiteNav
3. Hero — claret background, crawl name, tagline, stat pills
4. About This Crawl — editorial description
5. Crawl-specific sections (optional — e.g. Ripper has Victims Memorial, Bermondsey has freshness caveat)
6. ScrollMap component — unified map + compact pub list with accordion expansion, themed per crawl
7. Share & Save — WhatsApp + Print Route
8. Build Your Own CTA
9. More Crawls — 2 cards for other live crawls
10. SiteFooter

### 7.3 Homepage Text Randomiser

The hero cycles through all 10 crawl names. Each entry has a claret-coloured portion and an ink-coloured portion:

| Claret text | Ink text |
|------------|---------|
| Monopoly | Pub Crawl |
| Circle Line | Pub Crawl |
| Bermondsey | Beer Mile |
| Jack the Ripper | Pub Crawl |
| Beatles | Pub Crawl |
| Historic London | Pub Crawl |
| South Bank | Pub Crawl |
| Criminal London | Pub Crawl |
| Literary London | Pub Crawl |
| Haunted London | Pub Crawl |

---

## 8. Content Model

### 8.1 Architecture

Content is stored as flat TypeScript files in `src/content/crawls/`. Each crawl is a self-contained file with all pub data inline — including per-crawl pub descriptions. There is no shared master pub database at V1. Pub descriptions are crawl-specific — the same pub described differently depending on the crawl theme.

A centralised pub database is a Phase 2 goal, built by consolidating crawl data and enriching with OSM/Google Places.

### 8.2 Per-Crawl Theming

Per-crawl branding is limited to TWO elements only:
1. **Pub cards** — each crawl has a distinct expanded card design in the scroll map
2. **Map markers** — colour-coded per crawl theme

Everything else uses the unified London on Tap platform design.

---

## 9. Design System

**Status: Implemented. Full spec in `context/CLAUDE.md`.**

- **Aesthetic:** Editorial/FT-inspired — warm, confident, typographically rich
- **Palette:** Warm cream background (#FFF1E5), near-black ink (#1A0A00), claret primary (#990F3D), gold secondary (#C47B10), teal links (#0D7680), muted text (#8A7060), surface (#F2DFCE)
- **Typography:** Four roles — Playfair Display (display), Barlow Condensed (labels), Barlow (body), Spectral (pub cards)
- **Maps:** MapLibre GL JS with CARTO Voyager basemap tiles (no API key)
- **Mobile-first.** Every page must work beautifully at 375px.
- **Tone of voice:** Warm, witty, confident. Like a mate who's done every pub crawl in London twice. Never corporate, never laddish, never tourist-trap cheesy.

---

## 10. SEO & GEO Strategy

### 10.1 SEO Foundation

- Clean URLs: /monopoly, /jack-the-ripper, /circle-line, /south-bank
- Unique meta title, description, and Open Graph tags per page
- Schema.org: WebSite (homepage), ItemList (crawl directory), TouristAttraction (each crawl)
- Canonical URLs, XML sitemap, Google Search Console
- Next.js SSG — all pages pre-rendered at build time

### 10.2 GEO (Generative Engine Optimisation)

Built to be cited by LLMs (ChatGPT, Claude, Perplexity, Google AI Overviews). The space has no authoritative source — London on Tap aims to fill that gap with comprehensive, structured, machine-parseable content. Each crawl page should be the single best answer to "how do I do the [X] pub crawl in London."

### 10.3 Content Opportunities (Post-MVP)

Blog targeting long-tail keywords: "How to Complete the Monopoly Pub Crawl," "Bermondsey Beer Mile Guide 2026," "Best Pub Crawls in London," neighbourhood guides.

---

## 11. Technical Architecture

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js (App Router, SSG) | Pre-rendered at build time |
| Hosting | Netlify | |
| Styling | Tailwind CSS | |
| Maps | MapLibre GL JS + CARTO Voyager tiles | No API key needed |
| Content | TypeScript files in src/content/crawls/ | One file per crawl |
| Database (future) | Supabase or similar | For pub database, user features |
| Pub data enrichment (future) | OpenStreetMap Overpass API + Google Places | For comprehensive coverage |
| Repo | GitHub: london-pub-crawls | |
| Analytics | PostHog or similar | |

Full technical spec including crawl page architecture, scroll map component pattern, and code conventions lives in `context/CLAUDE.md`.

---

## 12. Commercial Roadmap

Not the current focus. Priority is traffic and content quality. Ideas for later:
- Digital pub crawl passport (discount vouchers at participating pubs)
- Pub partnerships and featured listings
- Affiliate links
- Sponsored crawls
- Premium downloadable route packs
- Corporate team-building packages
- Multi-city expansion if London model validates

---

## 13. Open Questions

| # | Question | Status |
|---|----------|--------|
| 1 | Maps library | Decided — MapLibre GL JS with CARTO tiles |
| 2 | Monopoly IP risk | Acknowledged — mitigated by platform umbrella |
| 3 | Circle Line scope | Decided — original 27-stop loop only |
| 4 | Rendering | Decided — SSG, no SSR |
| 5 | Theme | Decided — light, claret dark sections |
| 6 | Launch crawl count | Decided — 10 crawls, 101 pubs |
| 7 | Brand name | Decided — London on Tap (londonontap.com) |
| 8 | Crawl builder scope | TBC — MVP may launch with basic version using 101-pub database |
| 9 | Pub database expansion | Phase 2 — OSM + Google Places for ~3,500 pubs |
| 10 | Commercialisation model | TBC — post-traction |

---

## 14. What This Document Is For

This PRD is the primary context document for the London on Tap project. It is used as:

1. **Claude project instructions** — pasted into the Claude.ai project to give every session the full strategic picture
2. **Claude Code reference** — lives at `context/prd.md` alongside CLAUDE.md so Claude Code understands product intent
3. **Personal reference** — single source of truth for all product decisions

It supersedes all previous versions (v1.0 Feb 2026, v2.0 March 2026, v2.1 March 2026).