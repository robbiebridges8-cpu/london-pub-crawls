'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import Link from 'next/link';
import { Chip, ScrollShadow } from '@heroui/react';
import { crawls, getCrawlBySlug, getPubCount, Crawl } from '@/content/crawls';
import { getPubById } from '@/content/pubs';
import { SiteNav, SiteFooter, InteractiveMap, SectionLabel, getThemedPubCard } from '@/components';

interface CrawlPageProps {
  params: Promise<{ slug: string }>;
}

// Pub detail modal
function PubModal({
  pub,
  crawlPub,
  crawl,
  stopNumber,
  onClose,
}: {
  pub: { name: string; address: string; neighbourhood: string };
  crawlPub: { description: string; historicNotes?: string };
  crawl: Crawl;
  stopNumber: number;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--background)] border-2 border-[var(--ink)] max-w-md w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b-2 border-[var(--ink)] relative bg-[var(--claret)]">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="font-label text-xs uppercase tracking-[0.2em] mb-1 text-white opacity-80">
            Stop {stopNumber} of {crawl.pubs.length}
          </div>
          <h2 className="font-card text-2xl font-semibold text-white">{pub.name}</h2>
          <p className="font-body text-sm text-white opacity-80">{pub.address}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="font-body text-[var(--ink)] leading-relaxed mb-4">{crawlPub.description}</p>

          {crawlPub.historicNotes && (
            <div className="p-4 bg-[var(--surface)] border-l-4 border-[var(--claret)] mb-4">
              <p className="font-body text-sm italic text-[var(--muted)]">
                {crawlPub.historicNotes}
              </p>
            </div>
          )}

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.name}, ${pub.address}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block text-center"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CrawlPage({ params }: CrawlPageProps) {
  const { slug } = use(params);
  const crawl = getCrawlBySlug(slug);
  const [selectedPub, setSelectedPub] = useState<{ pub: any; crawlPub: any; stopNumber: number } | null>(null);

  // Redirect non-live crawls
  if (!crawl || !crawl.live) {
    notFound();
  }

  const pubCount = getPubCount(crawl);
  const ThemedCard = getThemedPubCard(crawl.slug);

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
      };
    })
    .filter(Boolean) as { name: string; lat: number; lng: number; number: number; description: string }[];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteNav />

      <main id="main-content">
        {/* Hero Section - Claret background */}
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            {/* Back link */}
            <Link
              href="/crawls"
              className="inline-flex items-center gap-2 text-white opacity-80 hover:opacity-100 transition-opacity mb-8 text-sm font-label uppercase tracking-wider"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Crawls
            </Link>

            {/* Crawl name */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {crawl.name}
            </h1>

            {/* Tagline - Italic */}
            <p className="font-display text-xl md:text-2xl italic text-white opacity-90 mb-8 max-w-2xl mx-auto">
              {crawl.tagline}
            </p>

            {/* Stat pills */}
            <div className="flex justify-center gap-4 flex-wrap">
              <Chip
                size="lg"
                className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4"
              >
                {pubCount} Pubs
              </Chip>
              <Chip
                size="lg"
                className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4"
              >
                {crawl.duration}
              </Chip>
              <Chip
                size="lg"
                className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4"
              >
                {crawl.difficulty}
              </Chip>
            </div>
          </div>
        </header>

        {/* Logistics Section */}
        {crawl.logistics && (
          <section className="py-12 px-6 bg-[var(--surface)]">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-[2px] bg-[var(--ink)]">
                <div className="bg-[var(--surface)] p-4 text-center">
                  <div className="font-label text-xs uppercase tracking-[0.1em] text-[var(--muted)] mb-1">Start</div>
                  <div className="font-card font-semibold text-[var(--ink)]">{crawl.logistics.tubeStart}</div>
                </div>
                <div className="bg-[var(--surface)] p-4 text-center">
                  <div className="font-label text-xs uppercase tracking-[0.1em] text-[var(--muted)] mb-1">End</div>
                  <div className="font-card font-semibold text-[var(--ink)]">{crawl.logistics.tubeEnd}</div>
                </div>
                <div className="bg-[var(--surface)] p-4 text-center">
                  <div className="font-label text-xs uppercase tracking-[0.1em] text-[var(--muted)] mb-1">Start Time</div>
                  <div className="font-card font-semibold text-[var(--ink)]">{crawl.logistics.suggestedStart}</div>
                </div>
                <div className="bg-[var(--surface)] p-4 text-center">
                  <div className="font-label text-xs uppercase tracking-[0.1em] text-[var(--muted)] mb-1">Best Day</div>
                  <div className="font-card font-semibold text-[var(--ink)]">{crawl.logistics.bestDay}</div>
                </div>
              </div>

              {crawl.logistics.pacingTips && (
                <div className="mt-4 p-4 bg-[var(--background)] border-l-4 border-[var(--claret)]">
                  <div className="font-label text-xs uppercase tracking-[0.1em] text-[var(--claret)] mb-1">Pacing Tips</div>
                  <p className="font-body text-[var(--ink)]">{crawl.logistics.pacingTips}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Pub Stops Carousel */}
        <section className="py-16 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8">
              <SectionLabel className="mb-4">The Route</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                {pubCount} Pubs to Visit
              </h2>
            </div>

            <ScrollShadow
              orientation="horizontal"
              className="w-full"
              hideScrollBar
            >
              <div className="flex gap-6 pb-4 px-4">
                {crawl.pubs.map((crawlPub, index) => {
                  const pub = getPubById(crawlPub.pubId);
                  if (!pub) return null;

                  return (
                    <div
                      key={crawlPub.pubId}
                      className="flex-shrink-0"
                      style={{ width: 'min(85vw, 280px)' }}
                    >
                      <ThemedCard
                        pubName={pub.name}
                        description={crawlPub.description}
                        stopNumber={index + 1}
                        totalStops={pubCount}
                        nearestTube={pub.neighbourhood}
                        accentColor={crawl.accentColor}
                        onClick={() => setSelectedPub({ pub, crawlPub, stopNumber: index + 1 })}
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollShadow>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8">
              <SectionLabel className="mb-4">Interactive Map</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                See the Full Route
              </h2>
            </div>

            {mapLocations.length > 0 && (
              <InteractiveMap
                locations={mapLocations}
                accentColor={crawl.accentColor}
                onMarkerClick={(location) => {
                  const crawlPub = crawl.pubs[location.number - 1];
                  const pub = getPubById(crawlPub.pubId);
                  if (pub) {
                    setSelectedPub({ pub, crawlPub, stopNumber: location.number });
                  }
                }}
              />
            )}

            <div className="text-center mt-8">
              <Link href={`/map/${crawl.slug}`} className="btn-primary inline-block">
                Open Full Map
              </Link>
            </div>
          </div>
        </section>

        {/* More Crawls Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <SectionLabel className="mb-4">Keep Exploring</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                More Crawls
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls
                .filter((c) => c.live && c.slug !== crawl.slug)
                .slice(0, 2)
                .map((otherCrawl) => (
                  <Link
                    key={otherCrawl.id}
                    href={`/crawls/${otherCrawl.slug}`}
                    className="block bg-[var(--surface)] p-6 hover:bg-[var(--background)] transition-colors"
                  >
                    <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">
                      {otherCrawl.name}
                    </h3>
                    <p className="font-body text-sm text-[var(--muted)] mb-4 line-clamp-2">
                      {otherCrawl.tagline}
                    </p>
                    <div className="flex gap-3">
                      <span className="font-label text-xs uppercase tracking-wider text-[var(--claret)]">
                        {otherCrawl.pubs.length} pubs
                      </span>
                      <span className="font-label text-xs uppercase tracking-wider text-[var(--muted)]">
                        {otherCrawl.duration}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/crawls" className="btn-ghost">
                View All Crawls
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Pub Modal */}
      {selectedPub && (
        <PubModal
          pub={selectedPub.pub}
          crawlPub={selectedPub.crawlPub}
          crawl={crawl}
          stopNumber={selectedPub.stopNumber}
          onClose={() => setSelectedPub(null)}
        />
      )}

      <SiteFooter />
    </div>
  );
}
