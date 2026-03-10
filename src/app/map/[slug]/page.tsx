'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import Link from 'next/link';
import { getCrawlBySlug } from '@/content/crawls';
import { getPubById } from '@/content/pubs';
import { SiteNav, SiteFooter, InteractiveMap, SectionLabel } from '@/components';

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
    <div className="min-h-screen bg-[var(--background)]">
      <SiteNav />

      <main id="main-content" className="pt-20">
        {/* Header */}
        <header className="px-6 py-8 border-b-2 border-[var(--ink)]">
          <div className="max-w-[1400px] mx-auto">
            <Link
              href={`/crawls/${crawl.slug}`}
              className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors mb-4 text-sm font-label uppercase tracking-wider"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {crawl.name}
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <SectionLabel className="mb-2">Interactive Map</SectionLabel>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)]">
                  {crawl.name}
                </h1>
                <p className="font-body text-[var(--muted)] mt-1">
                  {crawl.pubs.length} pubs across London
                </p>
              </div>

              <div className="flex gap-3">
                {/* Open in Google Maps */}
                <a
                  href={`https://www.google.com/maps/dir/${mapLocations.map(l => `${l.lat},${l.lng}`).join('/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-sm"
                >
                  Open in Google Maps
                </a>

                {/* Print button */}
                <button
                  onClick={() => window.print()}
                  className="btn-ghost text-sm"
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
                accentColor={crawl.accentColor}
                onMarkerClick={(location) => setSelectedStop(location.number)}
              />
            )}
          </div>
        </section>

        {/* Route List (for print) */}
        <section className="px-6 py-8 border-t-2 border-[var(--ink)] no-print">
          <div className="max-w-[1400px] mx-auto">
            <SectionLabel className="mb-4">Full Route</SectionLabel>
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-6">
              All {mapLocations.length} Stops
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[var(--ink)]">
              {mapLocations.map((location) => (
                <div
                  key={location.number}
                  className={`p-4 transition-colors ${
                    selectedStop === location.number
                      ? 'bg-[var(--background)]'
                      : 'bg-[var(--surface)]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 bg-[var(--ink)] text-[var(--gold)] border-2 border-white"
                    >
                      {location.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-card font-semibold text-[var(--ink)] truncate">
                        {location.name}
                      </h3>
                      <p className="font-body text-sm text-[var(--muted)] truncate">
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
