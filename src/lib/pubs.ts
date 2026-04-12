import { BasePub } from '@/content/crawls/types';
import { crawls } from '@/content/crawls';

// Import pub arrays from each live crawl
import { monopolyPubs } from '@/content/crawls/monopoly';
import { circleLinePubs } from '@/content/crawls/circleline';
import { ripperPubs } from '@/content/crawls/ripper';
import { beatlesPubs } from '@/content/crawls/beatles';
import { southBankPubs } from '@/content/crawls/southbank';
import { historicLondonPubs } from '@/content/crawls/historiclondon';
import { literaryLondonPubs } from '@/content/crawls/literarylondon';
import { bermondseyPubs } from '@/content/crawls/bermondseybm';
import { criminalLondonPubs } from '@/content/crawls/criminallondon';

export interface CrawlAppearance {
  crawlSlug: string;
  crawlName: string;
  positionOnCrawl: number;
  totalOnCrawl: number;
  description: string;
}

export interface AggregatedPub {
  slug: string;
  name: string;
  address: string;
  postcode: string;
  coordinates: { lat: number; lng: number };
  website?: string;
  crawls: CrawlAppearance[];
}

// Map crawl slugs to their pub arrays
const crawlPubArrays: { slug: string; pubs: BasePub[] }[] = [
  { slug: 'monopoly', pubs: monopolyPubs },
  { slug: 'circle-line', pubs: circleLinePubs },
  { slug: 'jack-the-ripper', pubs: ripperPubs },
  { slug: 'beatles', pubs: beatlesPubs },
  { slug: 'south-bank', pubs: southBankPubs },
  { slug: 'historic-london', pubs: historicLondonPubs },
  { slug: 'literary-london', pubs: literaryLondonPubs },
  { slug: 'bermondsey-beer-mile', pubs: bermondseyPubs },
  { slug: 'criminal-london', pubs: criminalLondonPubs },
];

/** Normalise a string for deduplication: lowercase, trim, collapse whitespace, expand abbreviations */
function normalise(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[''`]/g, '')         // Remove apostrophes
    .replace(/\bst\b/g, 'street')  // St → Street
    .replace(/\brd\b/g, 'road')    // Rd → Road
    .replace(/\bln\b/g, 'lane')    // Ln → Lane
    .replace(/\bsq\b/g, 'square')  // Sq → Square
    .replace(/\bave?\b/g, 'avenue')// Ave → Avenue
    .replace(/\s+station$/g, '')   // Strip trailing "Station"
    .replace(/\s+/g, ' ');
}

/** Generate a dedup key from pub name + address */
function dedupKey(pubName: string, address: string): string {
  return `${normalise(pubName)}::${normalise(address)}`;
}

/** Generate a URL-safe slug from a pub name */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/['']/g, '')        // Remove apostrophes
    .replace(/&/g, 'and')        // Replace ampersand
    .replace(/[^a-z0-9\s-]/g, '') // Strip non-alphanumeric
    .replace(/\s+/g, '-')        // Spaces to hyphens
    .replace(/-+/g, '-')         // Collapse multiple hyphens
    .replace(/^-|-$/g, '');      // Trim leading/trailing hyphens
}

/** Extract a short disambiguator from an address (first meaningful word) */
function addressDisambiguator(address: string): string {
  // Take the first word that isn't a number
  const words = address.split(/[\s,]+/).filter(w => w && !/^\d+$/.test(w));
  return words[0] ? slugify(words[0]) : '';
}

/** Get crawl name from slug */
function getCrawlName(slug: string): string {
  const crawl = crawls.find(c => c.slug === slug);
  return crawl?.name ?? slug;
}

// Cached result
let _allPubs: AggregatedPub[] | null = null;

/** Walk all live crawl files, deduplicate pubs, and return the aggregated list */
export function getAllPubs(): AggregatedPub[] {
  if (_allPubs) return _allPubs;

  // First pass: group by dedup key
  const pubMap = new Map<string, {
    name: string;
    address: string;
    postcode: string;
    lat: number;
    lng: number;
    website?: string;
    crawls: CrawlAppearance[];
  }>();

  for (const { slug: crawlSlug, pubs } of crawlPubArrays) {
    const crawlName = getCrawlName(crawlSlug);
    const totalOnCrawl = pubs.length;

    for (const pub of pubs) {
      const key = dedupKey(pub.pubName, pub.address);
      const existing = pubMap.get(key);

      if (existing) {
        // Same pub on a different crawl — add the crawl appearance
        existing.crawls.push({
          crawlSlug,
          crawlName,
          positionOnCrawl: pub.id,
          totalOnCrawl,
          description: pub.review,
        });
        // Prefer a website if we don't have one yet
        if (!existing.website && pub.website) {
          existing.website = pub.website;
        }
      } else {
        pubMap.set(key, {
          name: pub.pubName,
          address: pub.address,
          postcode: pub.postcode,
          lat: pub.lat,
          lng: pub.lng,
          website: pub.website,
          crawls: [{
            crawlSlug,
            crawlName,
            positionOnCrawl: pub.id,
            totalOnCrawl,
            description: pub.review,
          }],
        });
      }
    }
  }

  // Second pass: assign slugs, handling collisions
  const slugCounts = new Map<string, number>();
  const entries = Array.from(pubMap.values());

  // Count how many pubs would map to each base slug
  for (const pub of entries) {
    const base = slugify(pub.name);
    slugCounts.set(base, (slugCounts.get(base) ?? 0) + 1);
  }

  // Assign final slugs
  const usedSlugs = new Set<string>();
  _allPubs = entries.map(pub => {
    const base = slugify(pub.name);
    let finalSlug: string;

    if (slugCounts.get(base)! > 1) {
      // Collision — disambiguate with address
      finalSlug = `${base}-${addressDisambiguator(pub.address)}`;
      // If still colliding, append more of the address
      if (usedSlugs.has(finalSlug)) {
        finalSlug = `${base}-${slugify(pub.address)}`;
      }
    } else {
      finalSlug = base;
    }

    usedSlugs.add(finalSlug);

    return {
      slug: finalSlug,
      name: pub.name,
      address: pub.address,
      postcode: pub.postcode,
      coordinates: { lat: pub.lat, lng: pub.lng },
      website: pub.website,
      crawls: pub.crawls,
    };
  });

  // Sort alphabetically by name
  _allPubs.sort((a, b) => a.name.localeCompare(b.name));

  return _allPubs;
}

/** Look up a single pub by its URL slug */
export function getPubBySlug(slug: string): AggregatedPub | null {
  return getAllPubs().find(p => p.slug === slug) ?? null;
}

// Cached lookup for getPubSlug
let _slugLookup: Map<string, string> | null = null;

/** Look up the directory slug for a pub by name + address (used by PubList to link to /pubs/[slug]) */
export function getPubSlug(pubName: string, address: string): string | null {
  if (!_slugLookup) {
    _slugLookup = new Map();
    for (const pub of getAllPubs()) {
      const key = dedupKey(pub.name, pub.address);
      _slugLookup.set(key, pub.slug);
    }
  }
  return _slugLookup.get(dedupKey(pubName, address)) ?? null;
}
