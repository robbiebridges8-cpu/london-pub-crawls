/**
 * Fetches walking route geometry from Mapbox Directions API for every
 * consecutive pub pair across all live crawls. Writes results to
 * src/content/routes.json.
 *
 * Run: npm run generate-routes
 *
 * Requires MAPBOX_TOKEN in .env.local (build-time only, never exposed to browser).
 * Free tier: 100,000 requests/month. ~60 pub pairs = well within limits.
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

// Load .env.local
config({ path: join(__dirname, '..', '.env.local') });

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
if (!MAPBOX_TOKEN) {
  console.error('❌ MAPBOX_TOKEN not found in .env.local');
  process.exit(1);
}

// Import all crawl pub data
import { monopolyPubs } from '../src/content/crawls/monopoly';
import { circleLinePubs } from '../src/content/crawls/circleline';
import { ripperPubs } from '../src/content/crawls/ripper';
import { beatlesPubs } from '../src/content/crawls/beatles';
import { southBankPubs } from '../src/content/crawls/southbank';
import { historicLondonPubs } from '../src/content/crawls/historiclondon';
import { literaryLondonPubs } from '../src/content/crawls/literarylondon';
import { bermondseyPubs } from '../src/content/crawls/bermondseybm';
import { criminalLondonPubs } from '../src/content/crawls/criminallondon';

interface PubLike {
  lat: number;
  lng: number;
  pubName: string;
}

const CRAWLS: Record<string, PubLike[]> = {
  'monopoly': monopolyPubs,
  'circle-line': circleLinePubs,
  'jack-the-ripper': ripperPubs,
  'beatles': beatlesPubs,
  'south-bank': southBankPubs,
  'historic-london': historicLondonPubs,
  'literary-london': literaryLondonPubs,
  'bermondsey-beer-mile': bermondseyPubs,
  'criminal-london': criminalLondonPubs,
};

const MAPBOX_BASE = 'https://api.mapbox.com/directions/v5/mapbox/walking';

async function fetchRoute(from: PubLike, to: PubLike): Promise<number[][] | null> {
  const url = `${MAPBOX_BASE}/${from.lng},${from.lat};${to.lng},${to.lat}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ⚠ Mapbox returned ${res.status} for ${from.pubName} → ${to.pubName}`);
      return null;
    }
    const data = await res.json();
    if (!data.routes?.[0]?.geometry?.coordinates) {
      console.warn(`  ⚠ No route found for ${from.pubName} → ${to.pubName}`);
      return null;
    }
    return data.routes[0].geometry.coordinates;
  } catch (err) {
    console.warn(`  ⚠ Fetch failed for ${from.pubName} → ${to.pubName}:`, err);
    return null;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const result: Record<string, (number[][] | null)[]> = {};
  let totalSegments = 0;
  let successCount = 0;
  let failCount = 0;

  for (const [slug, pubs] of Object.entries(CRAWLS)) {
    console.log(`\n📍 ${slug} (${pubs.length} pubs, ${pubs.length - 1} segments)`);
    const segments: (number[][] | null)[] = [];

    for (let i = 0; i < pubs.length - 1; i++) {
      const from = pubs[i];
      const to = pubs[i + 1];
      process.stdout.write(`  ${from.pubName} → ${to.pubName}... `);

      const coords = await fetchRoute(from, to);
      segments.push(coords);
      totalSegments++;

      if (coords) {
        successCount++;
        console.log(`✓ (${coords.length} points)`);
      } else {
        failCount++;
        console.log('✗ (will use straight line)');
      }

      // Respect Mapbox rate limits
      await sleep(100);
    }

    result[slug] = segments;
  }

  const outPath = join(__dirname, '..', 'src', 'content', 'routes.json');
  writeFileSync(outPath, JSON.stringify(result));

  console.log(`\n✅ Done. ${successCount}/${totalSegments} routes fetched. ${failCount} fallbacks.`);
  console.log(`   Written to ${outPath}`);
}

main().catch(console.error);
