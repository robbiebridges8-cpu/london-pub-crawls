# London on Tap — Product Requirements Document

**Document version:** 2.1 — March 2026
**Product owner:** Robbie Bridges
**Domain:** londonontap.com (TBC)
**Related domain:** monopolypubcrawl.com (redirect to /monopoly)
**Status:** Pre-launch — architecture, design, and content phase
**GitHub repo:** london-pub-crawls

---

## 1. Executive Summary

London on Tap is a free, self-guided pub crawl platform for London. It provides themed, curated routes with pub-by-pub itineraries and interactive maps. No booking, no app download, no payment required to use.

The platform launches with 10 fully researched crawls. The MVP is a content-rich, SEO-optimised static site designed to capture organic search traffic in a space with no credible incumbent.

This is a solo hobby project with serious commercial ambitions. The founder personally completed and documented the Monopoly Pub Crawl, which inspired the product. The near-term strategy is to build organic traffic and domain authority. Monetisation begins post-traction via a digital pub crawl passport (a paid product that unlocks discounts at participating pubs).

**Success at 6 months:** 1,000 monthly organic users, with measurable keyword ranking progress and multiple live crawls generating repeat visits.

---

## 2. Problem Statement

### 2.1 The Gap

Thousands of people already attempt structured pub crawls in London every year — the Monopoly Pub Crawl (visiting a pub at every board space), the Circle Line Challenge (one pub per Tube stop on the Circle line), and many others. They do this using fragmented, unreliable information: outdated blog posts, Reddit threads, and word of mouth. There is no single, well-maintained, purpose-built destination for this activity.

### 2.2 User Pain Points

- **No reliable, complete route:** Existing sources are often incomplete, feature closed pubs, or lack any navigable route.
- **No map or navigation support:** Users must piece together routes themselves using Google Maps, often getting lost between stops.
- **No discovery platform:** Tourists arriving in London have no obvious starting point for finding authentic pub crawl experiences. The activity is invisible to search engines.

### 2.3 Competitive Landscape

The competitive landscape is remarkably thin. A handful of outdated blog posts exist for specific crawls (particularly the Monopoly crawl), but there is no dedicated, well-designed, SEO-optimised platform. Paid pub crawl tour operators exist (e.g. Sandemans, Strawberry Tours) but target a different user — those willing to pay for a guide and follow a group. Self-guided pub crawl content is a dead zone.

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

Reach 5,000+ monthly users and begin monetisation via the passport model. Establish London on Tap as the default search result — and the default LLM citation — for all major London pub crawl queries. Build a content engine (blog, guides) that drives long-tail SEO traffic. Begin outreach to pubs for partnership and promotion deals.

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

### 5.1 In Scope (MVP / V1)

- Homepage — crawl directory grid (design TBC), stats bar, How It Works section, About section (on homepage rather than separate page)
- Crawl landing pages — reusable template with hero, description, interactive map, logistics panel, pub-by-pub breakdown with themed pub cards, and print/save route functionality
- Coming Soon pages — TBC, may or may not be included at launch
- 404 page — nice-to-have, not a launch blocker
- Schema.org structured data on all pages (TouristAttraction, ItemList, WebSite)
- Full SEO foundation — meta tags, Open Graph, canonical URLs, XML sitemap
- Responsive, mobile-first design
- Google Places API integration for pub ratings (client-side, keyed)

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

### 5.3 Next (V1.1 – V2)

- Crawl builder — interactive tool to customise any crawl route, select/deselect pubs, see real-time stats (distance, duration, cost estimate), and share a custom route URL
- Sharing mechanic — WhatsApp-first share buttons, unique shareable URLs per crawl and per custom route
- Blog targeting long-tail keywords: "How to Complete the Monopoly Pub Crawl," "Circle Line Challenge Rules and Tips," "Best Pub Crawls in London (2026 Edition)"
- Digital passport system (see Section 10)
- Simple anonymous pub voting (thumbs up/down, no accounts)
- Email capture and newsletter

---

## 6. Functional Requirements

### 6.1 Homepage

**URL:** /

**Sections (top to bottom):**

1. **Navigation** — Sticky, minimal. Text-based logo left ("London on Tap" in display font with subtle amber pint glass icon). Right: Crawls / About. Frosted background on scroll. No hamburger on desktop.

2. **Hero** — Full-screen (100vh) atmospheric photo background. Centred text: overline in small caps, main headline (2–3 words, enormous display font), one-line subheading with text randomiser cycling through crawl names, single CTA ("Explore the Crawls" filled). Scroll indicator chevron.

3. **Stats bar** — Full-width dark strip. Key stats (crawl count, pub count, miles of walking, etc. — exact stats TBC based on launch content).

4. **Crawl directory grid** — Card layout (design TBC). Responsive columns. Each card is visually distinct per crawl via its themed card style. Section heading: "The Crawls."

5. **How It Works** — 3 value props with icons.

6. **About** — The founder's story, folded into the homepage rather than a separate page. Warm, authentic, first-person tone.

7. **Footer** — Deep claret background. Logo, link columns, one-liner.

**Data:** All crawl data from static JSON. No API calls on this page.

### 6.2 Crawl Landing Page (Reusable Template)

**URL:** /[slug] (e.g. /monopoly, /circle-line, /jack-the-ripper)

**Sections (top to bottom):**

1. **Hero** — Full-width with crawl title, tagline, and key stats (pub count, duration, distance, difficulty rating).

2. **Description** — Editorial overview of the crawl theme and what makes it special.

3. **Difficulty / vibe bar** — Quick-glance stats strip. Number of pubs, approximate distance, estimated duration, difficulty rating. Visually compact and scannable.

4. **Logistics panel** — Meeting point, suggested start time, pacing tips, practical info. Start tube stop, end tube stop, best day/time.

5. **Interactive map + pub list** — Unified component. Map and pub list integrated as one section. Compact, scannable pub list with accordion expansion for detail cards. Map responds to pub selection with flyTo animation. Pub cards are themed per crawl (Monopoly = property deed, Circle Line = roundel, etc.).

6. **Print / save route** — Button to generate a printable version or downloadable PDF.

7. **Share & challenge section** — WhatsApp-first share buttons. Social proof / challenge framing.

8. **Other crawls** — 2–3 card teasers for related crawls.

9. **Footer** — Consistent with homepage.

**Schema.org:** TouristAttraction structured data per page.

### 6.3 Coming Soon Pages

TBC — may include teaser pages with crawl name, short description, and email capture. Decision pending.

### 6.4 404 Page (Nice-to-Have)

On-brand, fun, with a redirect to the homepage and/or a random crawl suggestion. Not a launch blocker.

---

## 7. Content Model

### 7.1 Architecture Decision

Content is stored as flat JSON files. No database at launch. Each crawl is a self-contained JSON file with all its pub data inline — including per-crawl pub descriptions. There is no shared master pub database at V1.

**Rationale:** The requirement for crawl-specific pub descriptions (the same pub described differently depending on the crawl theme) and the priority on zero crash risk / zero latency favours self-contained files. A centralised pub repository is a future optimisation for when cross-crawl features (e.g. "this pub appears on 3 crawls") are needed, but it adds complexity without clear V1 benefit.

### 7.2 Crawl JSON Schema

**Location:** /content/crawls/[slug].json

```json
{
  "slug": "monopoly",
  "title": "The Monopoly Pub Crawl",
  "tagline": "Visit a pub at every space on the London Monopoly board",
  "neighbourhood": "Central London",
  "description": "Long-form editorial description...",
  "duration": "6–8 hours",
  "distance": "12 miles",
  "pubCount": 26,
  "difficulty": "hard",
  "bestTime": "Saturday, start at noon",
  "tubeStart": "King's Cross St Pancras",
  "tubeEnd": "Mayfair",
  "status": "live",
  "pubs": [
    {
      "id": 14,
      "pubName": "Silver Cross",
      "address": "33 Whitehall",
      "postcode": "SW1A 2BX",
      "lat": 51.5065,
      "lng": -0.1254,
      "googlePlaceId": null,
      "review": "Crawl-specific editorial description of the pub...",
      "color": "#FF69B4",
      "colorGroup": "pink",
      "website": "https://example.com/pub",
      "image": "/pubs/silver-cross.jpeg"
    }
  ],
  "seo": {
    "metaTitle": "Monopoly Pub Crawl London — The Complete Route (2026)",
    "metaDescription": "The definitive guide to London's Monopoly pub crawl...",
    "ogImage": "/images/og/monopoly.jpg"
  }
}
```

**Notes:**
- Pub ratings are fetched from Google Places API at runtime via `googlePlaceId`, not stored in the JSON.
- The Monopoly crawl has additional legacy fields (`rating`, `price`, `pintQuantity`, `property`) from the original monopolypubcrawl.com data. These are Monopoly-specific and not part of the standard schema.
- Schema is intentionally minimal — fields can be added per crawl as needed.

### 7.3 Per-Crawl Theming

There is no per-crawl branding beyond two elements:

1. **Pub cards** — Each crawl has a distinct card style (Monopoly cards styled as property cards, Circle Line as roundels, etc.). This is driven by the `color`, `colorGroup`, and card design in the frontend.
2. **Map markers** — Markers on the interactive map are styled per crawl to match the card theming.

Everything else — nav, layout, typography, hero treatment, footer — uses the unified London on Tap platform design. No per-crawl colour schemes, no per-crawl hero images, no mood switching.

---

## 8. Design System

**Status: Implemented — documented in `context/CLAUDE.md`.**

### 8.1 Confirmed Decisions

- **Editorial/magazine aesthetic** inspired by the Financial Times — warm, confident, typographically rich.
- **Colour palette:** Warm cream background (#FFF1E5), near-black ink text (#1A0A00), claret primary accent (#990F3D), gold secondary (#C47B10), teal for links (#0D7680), muted secondary text (#8A7060), surface for alternating sections (#F2DFCE).
- **Typography:** Four font roles — Playfair Display (display/headings), Barlow Condensed (labels/nav), Barlow (body), Spectral (pub card text).
- **Unified platform branding.** The site has one consistent design language. Per-crawl theming is limited to pub cards and map markers only.
- **Mobile-first.** The majority of users will be on their phone during the crawl. Every page must work beautifully on a 375px screen.
- **Performance matters.** Near-perfect Lighthouse scores. Lazy-load images. Maps lazy-loaded. No render-blocking resources.
- **Maps:** MapLibre GL JS with CARTO basemap tiles (no API key required).
- **IP defensibility.** The Monopoly crawl is one of many themed routes under a platform umbrella, not a standalone Monopoly-branded product.

### 8.2 Tone of Voice

Warm, witty, confident. Like a mate who's done every pub crawl in London twice and is genuinely excited to share. Never corporate, never laddish, never tourist-trap cheesy.

---

## 9. SEO & GEO Strategy

### 9.1 SEO Foundation

- Clean, semantic URLs: /monopoly, /jack-the-ripper, /circle-line
- Unique meta title, description, and Open Graph tags per page
- Schema.org structured data: WebSite (homepage), ItemList (crawl directory), TouristAttraction (each crawl page)
- Canonical URLs set on all pages
- XML sitemap generated and submitted to Google Search Console
- Internal linking between crawls and shared pubs builds topical authority

### 9.2 GEO (Generative Engine Optimisation)

The site is built to be cited by AI tools (ChatGPT, Claude, Perplexity, Google AI Overviews) when users ask about London pub crawls. This is a genuine competitive advantage — the space currently has no authoritative source that LLMs can reliably cite.

- Natural prose written to be AI-citation-friendly, not keyword-stuffed
- Comprehensive content per crawl — depth signals authority to both Google and LLMs
- Schema.org structured data makes content machine-parseable
- Factual, structured data (pub names, addresses, coordinates, route order) is exactly what LLMs need to give useful answers — and to attribute properly
- Each crawl page should be the single best answer to "how do I do the [X] pub crawl in London"
- Interactive tools (maps, builder, print/save) create value that can't be reproduced in an LLM response, driving click-through from AI citations

### 9.3 Technical SEO

The site uses Next.js with static site generation (SSG). All crawl pages are pre-rendered at build time for instant load and full crawlability. No client-rendered-only content that search engines can't see.

### 9.4 Local SEO

Each pub has a real address and coordinates. Google Business Profile links via googlePlaceId. This positions the site well for "near me" and map-based searches. Consider Google Maps integration for additional local search visibility.

### 9.5 Content Opportunities (Post-MVP)

A blog targeting long-tail keywords is the single most impactful post-MVP SEO investment. Initial content ideas:
- "How to Complete the Monopoly Pub Crawl: A Survivor's Guide"
- "Circle Line Challenge Rules and Tips"
- "Best Pub Crawls in London (2026 Edition)"
- "What to Wear on a London Pub Crawl"
- Neighbourhood-specific guides ("Best Pubs in Southwark")

---

## 10. Commercial Roadmap

Not the current focus. The priority is building traffic and content quality. Monetisation ideas for later exploration include: a digital pub crawl passport (discount vouchers at participating pubs), pub partnerships and featured listings, affiliate links, sponsored crawls, premium downloadable route packs, and corporate team-building packages. Multi-city expansion is a longer-term possibility if the London model is validated.

---

## 11. Technical Architecture

### 11.1 Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js (App Router, static generation) | SSG for performance and SEO |
| Hosting | Netlify | |
| Styling | Tailwind CSS | |
| Maps | MapLibre GL JS with CARTO basemap tiles | No API key required |
| Content | TypeScript files (no database at launch) | One file per crawl in src/content/crawls/ |
| Database (future) | Supabase | When user-generated content is introduced |
| Pub ratings signal | Google Places API (client-side, keyed) | |
| Payments (future) | Stripe Checkout | For passport purchases |
| Repo | GitHub: london-pub-crawls | |
| Analytics | PostHog or similar | |

### 11.2 Project Structure

```
/src/app
  /page.tsx                    # Homepage — crawl directory + about
  /[slug]/page.tsx             # Dynamic crawl landing page
/src/content
  /crawls/
    monopoly.ts                # One file per crawl
    circleline.ts
    ripper.ts
    ...
/src/components
  /                            # Shared UI components (structure TBC)
/public
  /images/crawls/              # Hero images per crawl
  /images/pubs/                # Pub photos
  /images/og/                  # Open Graph images
```

### 11.3 Development Conventions

- Prioritise static generation (generateStaticParams) for performance and SEO
- One crawl = one TypeScript file in /src/content/crawls — keep content separate from code
- Mobile-first — most users will be on their phone during the crawl
- Maps lazy-loaded to keep page speed high
- Components are crawl-agnostic — they receive crawl data as props
- Images: lazy load with blur placeholders

---

## 12. Launch Crawl Backlog

### 12.1 The Launch 10

| # | Crawl | Slug | Theme / Hook | Status |
|---|-------|------|-------------|--------|
| 1 | Monopoly Pub Crawl | /monopoly | A pub for every space on the London Monopoly board. The flagship. | In development |
| 2 | Circle Line Challenge | /circle-line | One pub per station on the original Circle Line loop (27 stops). | In development |
| 3 | Bermondsey Beer Mile | /bermondsey-beer-mile | South London's famous brewery trail. | Content needed |
| 4 | Jack the Ripper Pub Crawl | /jack-the-ripper | Whitechapel's darkest corners, one pint at a time. | In development |
| 5 | Beatles Pub Crawl | /beatles | Follow the Fab Four through London's drinking spots. | Content needed |
| 6 | Historic London Pub Crawl | /historic-london | London's oldest and most storied pubs. | Content needed |
| 7 | Thames Path Pub Crawl | /thames-path | Pubs along the river from east to west. | Content needed |
| 8 | Shakespeare Pub Crawl | /shakespeare | Bankside to the West End, in the Bard's footsteps. | Content needed |
| 9 | Literary London Pub Crawl | /literary-london | Where London's writers drank — Dickens, Orwell, Woolf, and more. | Content needed |
| 10 | Haunted London Pub Crawl | /haunted-london | London's most haunted pubs and the ghosts that haunt them. | Content needed |

### 12.2 Post-Launch Expansion

Target ~20 crawls at the six-month mark. Additional crawls to be researched and prioritised based on search demand vs. weakness of existing competition. Previous ideas explored include Royal Family, Criminal London, WW2, David Bowie, Rolling Stones — none confirmed.

**Brand-dependent crawls** (Wetherspoons Loop, Samuel Smith's) belong in blog content, not core crawl pages — they carry legal/commercial risk and dilute the editorial positioning.

---

## 13. Crawl Builder (V1.1 Feature)

The signature interactive feature. Users construct a personalised version of any crawl, see real-time stats, and share the result.

**How it works:**
1. User lands on a crawl page (e.g. /circle-line)
2. Clicks "Build Your Crawl" CTA
3. Builder shows all pubs on the route with toggle switches
4. User selects/deselects pubs — real-time stats update (pub count, estimated distance, duration, cost)
5. User saves the route — generates a unique shareable URL
6. User shares via WhatsApp, copies link, or prints the custom route

**Why it matters:** The Circle Line has 27 stops — doing every pub is impossible in one day. The builder is essential for that crawl, but the pattern applies universally: Thames Path, Bermondsey Beer Mile, even the Monopoly crawl has more stops than most groups will attempt.

---

## 14. Pub Signal Phasing

How pub quality signals evolve as the platform grows:

**Phase 1 (Launch):** Google Places API ratings as the external signal, plus the founder's "Editor's Pick" badge on recommended pubs. Costs almost nothing to build, looks credible, solves the problem immediately.

**Phase 2 (With traffic):** Simple anonymous thumbs up/down voting per pub per stop. No accounts needed, lightweight API call. Directional signal, not reviews.

**Phase 3 (With audience):** Proper reviews with accounts, once there's enough users to make reviews meaningful.

---

## 15. Open Questions & Assumptions

| # | Question | Status | Notes |
|---|----------|--------|-------|
| 1 | Maps library | Decided | MapLibre GL JS with CARTO basemap tiles. Free, modern, sufficient for V1. |
| 2 | Google Places API quotas | Low risk | Free tier sufficient for V1. Monitor usage as traffic grows. |
| 3 | Monopoly IP risk | Acknowledged | Will rename to "Monopoly Board" or similar if needed. Mitigated by platform umbrella. Keep monitoring. |
| 4 | Circle Line: original 27-stop loop or current expanded line? | Decided | Original loop only (Edgware Road round to Edgware Road). No Hammersmith branch. |
| 5 | Pub data accuracy | Resolved | Addresses sourced directly for all pubs. googlePlaceId fields still need populating via Places API. |
| 6 | Server-side rendering vs. static generation | Decided | SSG via Next.js. No SSR needed at V1. All content is static. |
| 7 | Design direction — dark or light? | Decided | Light theme. Platform chrome is always light. Dark sections use claret. |
| 8 | Launch crawl count | Decided | 10 crawls at launch. See Section 12. |

---

## 16. What This Document Is For

This PRD serves as the primary context document for building the London on Tap platform. It is designed to be used as:

1. **Claude project context** — paste into a Claude project to give any session the full strategic and technical picture
2. **Claude Code reference** — keep alongside CLAUDE.md in the repo root so Claude Code understands not just technical conventions but product intent
3. **Personal reference** — the single source of truth for all product decisions made to date

It supersedes the earlier .docx PRD (v1.0, February 2026), the previous v2.0 PRD, and the CLAUDE.md file for product decisions, consolidating all decisions into one document.