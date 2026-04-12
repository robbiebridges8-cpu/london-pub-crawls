# London on Tap — SEO Audit

**Date:** 12 April 2026
**Site:** londonontap.com
**Previous audit:** 3 April 2026
**Auditor:** Claude (for Robbie)

---

## The Headline: You Exist Now

**Google has started indexing your site.** A `site:londonontap.com` search now returns results. Searching for `"londonontap.com"` returns three indexed crawl pages: Monopoly Board, Historic London, and Bermondsey Beer Mile.

More importantly, **londonontap.com/monopoly now appears on page 1** for "monopoly pub crawl london" — roughly position 8, alongside funktionevents, londontheinside, monopolyboardpubcrawl.com, and bettercities.net. This is a significant result for a site that had zero indexed pages nine days ago.

The bad news: only a handful of your 146 sitemap URLs appear to be indexed so far. The /pubs directory and all 102 individual pub pages are not yet showing in `site:` searches. This is normal for a new domain — Google is crawling incrementally — but it means the pub directory's SEO value is still latent.

---

## 1. What's Been Fixed Since the Last Audit

### Content depth (was CRITICAL, now STRONG)

| Previous issue | Status |
|---|---|
| Crawl pages had 2-4 sentences of editorial | **FIXED.** All 9 crawls now have 400-600 word essays. The Monopoly page alone has ~2,000+ words of visible content including editorial, logistics, and pub descriptions. |
| Pub descriptions were 1-2 sentences | **FIXED.** All 110 pubs rewritten to 90-140 words with researched historical facts. |
| Meta descriptions sliced from editorial copy | **FIXED.** Every crawl now has a hand-written `metaDescription` field. |
| No individual pub pages | **FIXED.** 102 `/pubs/[slug]` pages with Place JSON-LD, geo-coordinates, addresses, crawl cross-links, and maps. |
| No pub directory | **FIXED.** `/pubs` index page with ItemList JSON-LD, search/filter, and links to all individual pub pages. |

### Navigation & internal linking (was WEAK, now GOOD)

| Previous issue | Status |
|---|---|
| No internal text links between pages | **IMPROVED.** Pub names in ScrollMap now link to `/pubs/[slug]`. Each pub detail page links back to its parent crawl(s). "More Pubs" section cross-links between pub pages. |
| SiteNav had no links | **FIXED.** SiteNav now has Crawls + Pubs links. |
| SiteFooter had no pub link | **FIXED.** SiteFooter now has "All Pubs" link. |

### Structured data (was GOOD, now STRONG)

| Previous issue | Status |
|---|---|
| Only WebSite + ItemList + TouristAttraction schemas | **EXPANDED.** Now also includes Place schema on every `/pubs/[slug]` page with PostalAddress, GeoCoordinates, and containedInPlace linking to parent crawls. ItemList on `/pubs` directory. |

### Sitemap (was GOOD, now COMPREHENSIVE)

| Previous issue | Status |
|---|---|
| Only homepage + crawl pages | **FIXED.** Sitemap now includes homepage, /crawls, /pubs, /build, 9 crawl pages, and 102 individual pub pages. |

---

## 2. What's Still Broken or Missing

### Critical

| Issue | Severity | Detail |
|---|---|---|
| **Editorial descriptions hidden behind collapsible** | Critical | The `AboutSection` component defaults to `useState(false)` — collapsed. Googlebot will not click the button. The 400-600 word essays are invisible to search engines. This is the single biggest SEO regression since the last audit. |
| **Pub descriptions also hidden** | Critical | The `PubList` component hides reviews behind a "Read more" toggle, also defaulting to collapsed. All 110 rewritten pub descriptions are invisible to Google. |

### High

| Issue | Severity | Detail |
|---|---|---|
| **`/crawls` page has no metadata** | High | No `metadata` export — no title, no description, no OG tags, no canonical. Competes with homepage for the same default title. |
| **Homepage H1 is still "London on Tap"** | High | The H1 is the brand name, not a search term. Should be "Free Self-Guided Pub Crawls in London" or similar. Flagged in the last audit, not changed. |
| **Crawl H1s missing "Pub Crawl" keyword** | High | H1 on crawl pages is just `{crawl.name}` — e.g., "Monopoly Board", "Jack the Ripper". The title tag appends "Pub Crawl" but the H1 does not. |
| **Homepage is still `'use client'`** | Medium-High | Entire homepage is client-rendered. Static content should be a Server Component with only the animation as a client island. |

### Medium

| Issue | Severity | Detail |
|---|---|---|
| **No per-crawl OG images** | Medium | Every page shares the same generic OG image. Each crawl/pub should have its own. |
| **No `next/image` usage** | Medium | Zero imports across the codebase. Missing WebP, responsive srcsets, lazy loading. |
| **No FAQ schema** | Medium | No FAQPage structured data on crawl pages. Missing long-tail query capture. |
| **No `/about` page** | Medium | About content embedded on homepage only. Missing E-E-A-T standalone page. |
| **Verify `/build` page** | Low-Medium | In sitemap at priority 0.5. If it 404s, it's a negative signal. |

---

## 3. Current Indexing Status

| Page | Indexed? | Notes |
|---|---|---|
| /monopoly | **Yes** | Page 1 for "monopoly pub crawl london" (~position 8) |
| /bermondsey-beer-mile | **Yes** | Appearing in `site:` results |
| /historic-london | **Yes** | Appearing in branded search |
| /circle-line | Not yet | |
| /jack-the-ripper | Not yet | |
| /south-bank | Not yet | |
| /beatles | Not yet | |
| /criminal-london | Not yet | |
| /literary-london | Not yet | |
| /crawls | Not yet | |
| /pubs | Not yet | |
| /pubs/[slug] (102 pages) | Not yet | |

**Estimated indexed pages:** ~3-5 of 146

---

## 4. Keyword Rankings

| Keyword | Previous | Current | Top competitors |
|---|---|---|---|
| monopoly pub crawl london | Not indexed | **Page 1, ~position 8** | funktionevents, londontheinside, monopolyboardpubcrawl.com |
| circle line pub crawl | Not indexed | Not ranking | circlelinepubcrawl.co.uk, londonist.com |
| bermondsey beer mile guide | Not indexed | Not ranking (but indexed) | cktravels.com, bermondsey-beer-mile.co.uk, secretldn.com |
| jack the ripper pub crawl london | Not indexed | Not ranking | barcrawl.co.uk, thejacktherippertour.com |
| london pub crawl | Not indexed | Not ranking | getyourguide.com, secretldn.com |
| self guided pub crawl london | Not indexed | Not ranking | gpsmycity.com, greatbritishpubcrawl.co.uk |
| literary pub crawl london | Not indexed | Not ranking | londonliterarypubcrawl.com (paid tour) |

---

## 5. Prioritised Action Plan

### Immediate (This Week)

1. **Un-hide the editorial descriptions.** Change `AboutSection` to default open or remove the collapsible. All your content investment is currently invisible to Google. This is the #1 fix.

2. **Un-hide the pub descriptions.** Change `PubList` to show reviews by default. Same issue — 110 rewritten descriptions hidden from crawlers.

3. **Add metadata to `/crawls/page.tsx`.** Title: "All Pub Crawls in London", description, OG tags, canonical.

4. **Fix crawl page H1s.** Change from `{crawl.name}` to `{crawl.name} Pub Crawl`.

5. **Verify `/build` exists.** Remove from sitemap if 404.

### Short-Term (Next 2-4 Weeks)

6. **Change homepage H1** to keyword-rich text.

7. **Convert homepage to Server Component** with client island for the animation.

8. **Add FAQ sections with FAQPage schema** to crawl pages.

9. **Create per-crawl OG images.**

10. **Add contextual cross-links** in editorial text between crawls.

11. **Request indexing** in GSC for all un-indexed pages.

### Medium-Term (1-3 Months)

12. **Adopt `next/image`** for all images.

13. **Create `/about` page** with E-E-A-T signals.

14. **Build backlinks.** Reddit, VisitLondon, GPSmyCity, blogger outreach.

15. **Launch a blog.** "Best pub crawls in London 2026", "How to survive the Monopoly pub crawl", "Bermondsey Beer Mile opening times". 2 posts/month.

### Long-Term (3-6 Months)

16. **Target "self-guided" keyword variants** for each crawl.

17. **User-generated content** — photos, reviews, completion times.

18. **Build page SEO** — when the crawl builder is live, target "build your own pub crawl london".

---

## 6. Summary

Nine days ago, Google didn't know you existed. Today, your Monopoly page is on page 1. That's genuine velocity for a new domain with zero backlinks.

The content work since the last audit is substantial: 9 long-form essays, 110 rewritten pub descriptions, 102 individual pub pages with Schema.org markup, hand-written meta descriptions, and proper internal linking.

**But the biggest piece of content you've created is hidden from Google.** The collapsible sections that default to closed mean Googlebot never sees your editorial descriptions or pub reviews. This is the single most important fix. Everything else is secondary.

After that, the trajectory is clear: more pages indexed (2-4 weeks), more backlinks (Reddit and directories), remaining on-page issues cleaned up. The competitive gap is closing on niche crawl keywords. The organic opportunity is confirmed — your content quality can compete, and Google is starting to reward it.
