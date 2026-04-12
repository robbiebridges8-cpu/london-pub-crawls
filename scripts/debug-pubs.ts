/**
 * Debug script to validate pub aggregation.
 * Run with: npx tsx scripts/debug-pubs.ts
 */

// Use relative imports since this runs outside Next.js
import { resolve } from 'path';

// Register path aliases for @/ imports
const tsconfig = require(resolve(__dirname, '../tsconfig.json'));
require('tsconfig-paths').register({
  baseUrl: resolve(__dirname, '..'),
  paths: tsconfig.compilerOptions.paths,
});

import { getAllPubs, slugify } from '../src/lib/pubs';

const pubs = getAllPubs();

console.log('=== PUB AGGREGATION DEBUG ===\n');

// Total count
const totalEntries = pubs.reduce((sum, p) => sum + p.crawls.length, 0);
console.log(`Total unique pubs: ${pubs.length}`);
console.log(`Total crawl entries: ${totalEntries}`);
console.log(`Deduplication savings: ${totalEntries - pubs.length} entries merged\n`);

// Pubs on multiple crawls
const multiCrawl = pubs.filter(p => p.crawls.length > 1);
console.log(`=== PUBS ON MULTIPLE CRAWLS (${multiCrawl.length}) ===\n`);
for (const pub of multiCrawl) {
  const crawlNames = pub.crawls.map(c => c.crawlName).join(', ');
  console.log(`  ${pub.name} (${pub.address})`);
  console.log(`    Crawls: ${crawlNames}`);
  console.log(`    Slug: /pubs/${pub.slug}\n`);
}

// Slug collisions check
const slugMap = new Map<string, string[]>();
for (const pub of pubs) {
  const base = slugify(pub.name);
  if (!slugMap.has(base)) slugMap.set(base, []);
  slugMap.get(base)!.push(`${pub.name} — ${pub.address} → /pubs/${pub.slug}`);
}

const collisions = Array.from(slugMap.entries()).filter(([, v]) => v.length > 1);
console.log(`=== SLUG COLLISIONS (${collisions.length}) ===\n`);
if (collisions.length === 0) {
  console.log('  None — all slugs are unique.\n');
} else {
  for (const [base, entries] of collisions) {
    console.log(`  Base slug "${base}":`);
    for (const e of entries) {
      console.log(`    ${e}`);
    }
    console.log();
  }
}

// Per-crawl breakdown
console.log('=== PER-CRAWL BREAKDOWN ===\n');
const crawlCounts = new Map<string, number>();
for (const pub of pubs) {
  for (const c of pub.crawls) {
    crawlCounts.set(c.crawlName, (crawlCounts.get(c.crawlName) ?? 0) + 1);
  }
}
for (const [name, count] of Array.from(crawlCounts.entries()).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${name}: ${count} pubs`);
}
console.log();
