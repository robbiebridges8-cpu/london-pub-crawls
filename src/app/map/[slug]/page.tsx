'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import Link from 'next/link';
import { getCrawlBySlug } from '@/content/crawls';
import { getPubById } from '@/content/pubs';
import { SiteNav, SiteFooter } from '@/components';
import { InteractiveMap } from '@/components';

const MONOPOLY_GREEN = '#1FB25A';
const CIRCLE_LINE_YELLOW = '#FFD300';

interface MapPageProps {
  params: Promise<{ slug: string }>;
}

export default function MapPage({ params }: MapPageProps) {
  const { slug } = use(params);
  const crawl = getCrawlBySlug(slug);
  const [selectedStop, setSelectedStop] = useState<number | null>(null);

  if (!crawl || !crawl.live) {
    notFound();
  }

  const accentColor = slug === 'monopoly' ? MONOPOLY_GREEN : slug === 'circle-line' ? CIRCLE_LINE_YELLOW : 'var(--amber)';

  // Build map locations from pubs with coordinates
  const mapLocations = crawl.pubs
    .map((crawlPub, index) => {
      const pub = getPubById(crawlPub.pubId);
      if (!pub || !pub.lat || !pub.lng) return null;
      return {
        name: pub.name,
        lat: pub.lat,
        lng: pub.lng,
        number: index + 1,
        description: crawlPub.description,
        address: pub.address,
      };
    })
    .filter(Boolean) as { name: string; lat: number; lng: number; number: number; description: string; address: string }[];

  return (
    <div className="min-h-screen bg-[var(--midnight)]">
      <SiteNav />

      <main id="main-content" className="pt-20">
        {/* Header */}
        <header className="px-6 py-8 border-b border-[var(--border)]">
          <div className="max-w-[1400px] mx-auto">
            <Link
              href={`/crawls/${crawl.slug}`}
              className="inline-flex items-center gap-2 text-[var(--zinc-400)] hover:text-[var(--white)] transition-colors mb-4 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {crawl.name}
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-semibold text-[var(--cream)]">
                  {crawl.name} Map
                </h1>
                <p className="text-[var(--zinc-400)] mt-1">
                  {crawl.pubs.length} pubs across London
                </p>
              </div>

              <div className="flex gap-3">
                {/* Open in Google Maps */}
                <a
                  href={`https://www.google.com/maps/dir/${mapLocations.map(l => `${l.lat},${l.lng}`).join('/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  Open in Google Maps
                </a>

                {/* Print button */}
                <button
                  onClick={() => window.print()}
                  className="btn-secondary text-sm"
                >
                  Print Route
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Map Section - Full Width */}
        <section className="px-6 py-8">
          <div className="max-w-[1400px] mx-auto">
            {mapLocations.length > 0 && (
              <InteractiveMap
                locations={mapLocations}
                accentColor={accentColor}
                onMarkerClick={(location) => setSelectedStop(location.number)}
              />
            )}
          </div>
        </section>

        {/* Route List (for print) */}
        <section className="px-6 py-8 border-t border-[var(--border)] no-print">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="font-display text-2xl font-semibold text-[var(--cream)] mb-6">
              Full Route
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mapLocations.map((location, index) => (
                <div
                  key={location.number}
                  className={`p-4 rounded-lg border transition-colors ${
                    selectedStop === location.number
                      ? 'border-[var(--amber)] bg-[var(--surface)]'
                      : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-bright)]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: accentColor, color: 'var(--midnight)' }}
                    >
                      {location.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--white)] truncate">
                        {location.name}
                      </h3>
                      <p className="text-sm text-[var(--zinc-400)] truncate">
                        {location.address}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
