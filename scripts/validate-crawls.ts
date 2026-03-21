/**
 * Crawl data validation script.
 * Checks all live crawls for data completeness and correctness.
 *
 * Usage: npx tsx scripts/validate-crawls.ts
 */

import { crawls } from '../src/content/crawls/index';
import { monopolyPubs } from '../src/content/crawls/monopoly';
import { circleLinePubs } from '../src/content/crawls/circleline';
import { ripperPubs } from '../src/content/crawls/ripper';
import { beatlesPubs } from '../src/content/crawls/beatles';
import { southBankPubs } from '../src/content/crawls/southbank';
import { historicLondonPubs } from '../src/content/crawls/historiclondon';
import { literaryLondonPubs } from '../src/content/crawls/literarylondon';
import { bermondseyPubs } from '../src/content/crawls/bermondseybm';
import { criminalLondonPubs } from '../src/content/crawls/criminallondon';
import type { BasePub } from '../src/content/crawls/types';

// Map slugs to their pub arrays
const pubArrays: Record<string, BasePub[]> = {
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

const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

let totalErrors = 0;
let totalCrawls = 0;

const liveCrawls = crawls.filter((c) => c.live);

for (const crawl of liveCrawls) {
  totalCrawls++;
  const errors: string[] = [];
  const pubs = pubArrays[crawl.slug];

  if (!pubs) {
    errors.push('No pub data file mapped for this slug');
    printResult(crawl.slug, errors, 0);
    continue;
  }

  if (pubs.length === 0) {
    errors.push('Pub array is empty');
    printResult(crawl.slug, errors, 0);
    continue;
  }

  // Check for duplicate IDs
  const ids = pubs.map((p) => p.id);
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) {
    errors.push(`Duplicate pub IDs found`);
  }

  // Check IDs are sequential from 1
  const sortedIds = [...ids].sort((a, b) => a - b);
  for (let i = 0; i < sortedIds.length; i++) {
    if (sortedIds[i] !== i + 1) {
      errors.push(`IDs not sequential: expected ${i + 1}, got ${sortedIds[i]}`);
      break;
    }
  }

  // Check each pub
  for (const pub of pubs) {
    const prefix = `pub #${pub.id}`;

    // Required fields
    if (!pub.pubName || pub.pubName.trim() === '') {
      errors.push(`${prefix}: missing pubName`);
    }
    if (!pub.address || pub.address.trim() === '') {
      errors.push(`${prefix}: missing address`);
    }
    if (!pub.postcode || pub.postcode.trim() === '') {
      errors.push(`${prefix} (${pub.pubName}): missing postcode`);
    } else if (!UK_POSTCODE_RE.test(pub.postcode)) {
      errors.push(`${prefix} (${pub.pubName}): invalid postcode "${pub.postcode}"`);
    }
    if (typeof pub.lat !== 'number' || isNaN(pub.lat)) {
      errors.push(`${prefix} (${pub.pubName}): missing or invalid lat`);
    } else if (pub.lat < 51.2 || pub.lat > 51.8) {
      errors.push(`${prefix} (${pub.pubName}): lat ${pub.lat} outside Greater London bounds (51.2-51.8)`);
    }
    if (typeof pub.lng !== 'number' || isNaN(pub.lng)) {
      errors.push(`${prefix} (${pub.pubName}): missing or invalid lng`);
    } else if (pub.lng < -0.6 || pub.lng > 0.4) {
      errors.push(`${prefix} (${pub.pubName}): lng ${pub.lng} outside Greater London bounds (-0.6 to 0.4)`);
    }
    if (!pub.review || pub.review.trim() === '') {
      errors.push(`${prefix} (${pub.pubName}): missing review`);
    } else if (pub.review.length < 20) {
      errors.push(`${prefix} (${pub.pubName}): review too short (${pub.review.length} chars, min 20)`);
    }
  }

  printResult(crawl.slug, errors, pubs.length);
}

function printResult(slug: string, errors: string[], pubCount: number) {
  if (errors.length === 0) {
    console.log(`  ✓ ${slug}: ${pubCount} pubs, all valid`);
  } else {
    totalErrors += errors.length;
    console.log(`  ✗ ${slug}: ${errors.length} error(s)`);
    for (const err of errors) {
      console.log(`    → ${err}`);
    }
  }
}

console.log('');
console.log(`Validated ${totalCrawls} live crawls.`);
if (totalErrors > 0) {
  console.log(`\n✗ ${totalErrors} error(s) found. Fix before deploying.`);
  process.exit(1);
} else {
  console.log(`\n✓ All crawl data valid.`);
}
