'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { AggregatedPub } from '@/lib/pubs';

const PubDirectoryMap = dynamic(() => import('@/components/PubDirectoryMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center bg-[var(--surface)] rounded-lg">
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});

// Crawl colour for map pins — use the crawl's accent from the index
const CRAWL_COLORS: Record<string, string> = {
  'monopoly': '#D4001A',
  'circle-line': '#FFD300',
  'jack-the-ripper': '#8B1A1A',
  'beatles': '#003087',
  'south-bank': '#0098D4',
  'historic-london': '#8B4513',
  'literary-london': '#2E4057',
  'bermondsey-beer-mile': '#D4A03C',
  'criminal-london': '#1A1A2E',
};

interface PubDirectoryClientProps {
  pubs: AggregatedPub[];
  crawlNames: { slug: string; name: string }[];
}

export default function PubDirectoryClient({ pubs, crawlNames }: PubDirectoryClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCrawls, setSelectedCrawls] = useState<Set<string>>(new Set());
  const [view, setView] = useState<'list' | 'map'>('list');

  const filtered = useMemo(() => {
    return pubs.filter(pub => {
      // Search filter
      if (search && !pub.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      // Crawl filter
      if (selectedCrawls.size > 0) {
        const pubCrawlSlugs = pub.crawls.map(c => c.crawlSlug);
        if (!pubCrawlSlugs.some(s => selectedCrawls.has(s))) {
          return false;
        }
      }
      return true;
    });
  }, [pubs, search, selectedCrawls]);

  function toggleCrawl(slug: string) {
    setSelectedCrawls(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <>
      {/* Filter Bar */}
      <div className="bg-[var(--background)] border-b border-[var(--surface)] sticky top-[4.5rem] z-40 py-4 px-6">
        <div className="max-w-[1200px] mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search pubs by name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[var(--surface)] bg-white font-body text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--claret)] transition-colors"
              />
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 shrink-0 bg-[var(--surface)] rounded-lg p-1">
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1.5 rounded font-label text-xs uppercase tracking-wider transition-colors ${
                  view === 'list'
                    ? 'bg-[var(--claret)] text-white'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setView('map')}
                className={`px-3 py-1.5 rounded font-label text-xs uppercase tracking-wider transition-colors ${
                  view === 'map'
                    ? 'bg-[var(--claret)] text-white'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                Map
              </button>
            </div>
          </div>

          {/* Crawl chips */}
          <div className="flex flex-wrap gap-2">
            {crawlNames.map(({ slug, name }) => (
              <button
                key={slug}
                onClick={() => toggleCrawl(slug)}
                className={`px-3 py-1 rounded-full font-label text-xs uppercase tracking-wider transition-colors border ${
                  selectedCrawls.has(slug)
                    ? 'bg-[var(--claret)] text-white border-[var(--claret)]'
                    : 'bg-transparent text-[var(--muted)] border-[var(--muted)]/30 hover:border-[var(--claret)] hover:text-[var(--claret)]'
                }`}
              >
                {name}
              </button>
            ))}
            {selectedCrawls.size > 0 && (
              <button
                onClick={() => setSelectedCrawls(new Set())}
                className="px-3 py-1 rounded-full font-label text-xs uppercase tracking-wider text-[var(--teal)] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Result count */}
          <p className="font-body text-sm text-[var(--muted)]">
            {filtered.length} {filtered.length === 1 ? 'pub' : 'pubs'}
            {(search || selectedCrawls.size > 0) && ` matching`}
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="bg-[var(--background)] py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          {view === 'list' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pub) => (
                <Link
                  key={pub.slug}
                  href={`/pubs/${pub.slug}`}
                  className="bg-[var(--surface)] rounded-lg p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                >
                  <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-2">
                    {pub.name}
                  </h3>
                  <p className="font-body text-sm text-[var(--muted)] mb-3">
                    {pub.address}, {pub.postcode}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {pub.crawls.map((c) => (
                      <span
                        key={c.crawlSlug}
                        className="inline-block px-2 py-0.5 rounded-full bg-[var(--claret)] text-white font-label text-[10px] uppercase tracking-wider"
                      >
                        {c.crawlName}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="h-[500px] md:h-[600px] rounded-lg overflow-hidden">
              <PubDirectoryMap pubs={filtered} crawlColors={CRAWL_COLORS} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
