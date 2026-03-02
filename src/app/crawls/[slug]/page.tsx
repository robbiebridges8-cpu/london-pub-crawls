'use client';

import { notFound } from 'next/navigation';
import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { crawls, getCrawlBySlug, getPubCount, Crawl } from '@/content/crawls';
import { getPubById } from '@/content/pubs';
import { SiteNav, SiteFooter, InteractiveMap, RouteSpine } from '@/components';

// Monopoly property colors
const MONOPOLY_COLORS: Record<string, string> = {
  brown: '#6E3B1B',
  lightBlue: '#AAE0FA',
  pink: '#D93A96',
  orange: '#F7941D',
  red: '#ED1B24',
  yellow: '#FEF200',
  green: '#1FB25A',
  darkBlue: '#0072BB',
};

const CIRCLE_LINE_COLOR = '#FFD300';

interface CrawlPageProps {
  params: Promise<{ slug: string }>;
}

// Pub stop card component
function PubStopCard({
  pub,
  crawlPub,
  stopNumber,
  totalStops,
  accentColor,
  isLeft,
  onClick,
}: {
  pub: { name: string; address: string; neighbourhood: string };
  crawlPub: { description: string; historicNotes?: string };
  stopNumber: number;
  totalStops: number;
  accentColor: string;
  isLeft: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative ${isVisible ? (isLeft ? 'animate-slide-in-left' : 'animate-slide-in-right') : 'opacity-0'}`}
      onClick={onClick}
    >
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 cursor-pointer hover:border-[var(--border-bright)] transition-colors">
        {/* Stop number badge */}
        <div
          className="absolute -top-3 left-6 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: accentColor, color: 'var(--midnight)' }}
        >
          {stopNumber}
        </div>

        {/* Pub name */}
        <h3 className="text-xl font-semibold text-[var(--white)] mt-2 mb-1">
          {pub.name}
        </h3>

        {/* Address */}
        <p className="text-sm text-[var(--zinc-400)] mb-4">
          {pub.address}
        </p>

        {/* Description */}
        <p className="text-[var(--white)] text-[15px] leading-relaxed mb-4 line-clamp-3">
          {crawlPub.description}
        </p>

        {/* Google Maps link */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.name}, ${pub.address}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold link-hover-underline"
          style={{ color: 'var(--amber)' }}
          onClick={(e) => e.stopPropagation()}
        >
          Get Directions &rarr;
        </a>
      </div>
    </div>
  );
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
      className="fixed inset-0 bg-[rgba(8,8,13,0.85)] backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--surface)] border border-[var(--border)] rounded-lg max-w-md w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--border)] relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--midnight)] flex items-center justify-center text-[var(--zinc-400)] hover:text-[var(--white)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--amber)' }}>
            Stop {stopNumber} of {crawl.pubs.length}
          </div>
          <h2 className="font-display text-2xl font-semibold text-[var(--cream)]">{pub.name}</h2>
          <p className="text-sm text-[var(--zinc-400)]">{pub.address}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-[var(--white)] leading-relaxed mb-4">{crawlPub.description}</p>

          {crawlPub.historicNotes && (
            <div className="p-4 rounded-lg mb-4 border border-[var(--border)] bg-[var(--midnight)]">
              <p className="text-sm italic" style={{ color: 'var(--amber)' }}>
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
            Open in Google Maps
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
  const accentColor = crawl.slug === 'circle-line' ? CIRCLE_LINE_COLOR : 'var(--amber)';

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
    <div className="min-h-screen bg-[var(--midnight)]">
      <SiteNav />

      <main id="main-content">
        {/* Hero Section */}
        <header className="pt-32 pb-16 px-6 max-w-[800px] mx-auto text-center">
          {/* Back link */}
          <Link
            href="/crawls"
            className="inline-flex items-center gap-2 text-[var(--zinc-400)] hover:text-[var(--white)] transition-colors mb-8 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Crawls
          </Link>

          {/* Crawl name */}
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-4">
            {crawl.slug === 'monopoly' ? (
              <>
                <span className="text-[var(--cream)]">Monopoly</span>{' '}
                <span style={{ color: MONOPOLY_COLORS.green }}>Pub Crawl</span>
              </>
            ) : crawl.slug === 'circle-line' ? (
              <>
                <span style={{ color: CIRCLE_LINE_COLOR }}>Circle Line</span>{' '}
                <span className="text-[var(--cream)]">Challenge</span>
              </>
            ) : (
              <span className="text-[var(--cream)]">{crawl.name}</span>
            )}
          </h1>

          {/* Tagline */}
          <p className="text-lg text-[var(--zinc-400)] leading-relaxed mb-8 max-w-2xl mx-auto">
            {crawl.editorialDescription || crawl.tagline}
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="font-display text-[32px] font-semibold" style={{ color: 'var(--amber)' }}>
                {pubCount}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-[var(--zinc-400)]">
                Pubs
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-[32px] font-semibold" style={{ color: 'var(--amber)' }}>
                {crawl.duration}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-[var(--zinc-400)]">
                Duration
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-[32px] font-semibold" style={{ color: 'var(--amber)' }}>
                {crawl.difficulty}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-[var(--zinc-400)]">
                Difficulty
              </div>
            </div>
          </div>

          {/* View Map button */}
          <Link href={`/map/${crawl.slug}`} className="btn-secondary inline-block mt-8">
            View Map
          </Link>
        </header>

        {/* Logistics Section */}
        {crawl.logistics && (
          <section className="py-12 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
                  <div className="text-xs text-[var(--zinc-400)] uppercase tracking-wide mb-1">Start</div>
                  <div className="font-semibold text-[var(--white)]">{crawl.logistics.tubeStart}</div>
                </div>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
                  <div className="text-xs text-[var(--zinc-400)] uppercase tracking-wide mb-1">End</div>
                  <div className="font-semibold text-[var(--white)]">{crawl.logistics.tubeEnd}</div>
                </div>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
                  <div className="text-xs text-[var(--zinc-400)] uppercase tracking-wide mb-1">Start Time</div>
                  <div className="font-semibold text-[var(--white)]">{crawl.logistics.suggestedStart}</div>
                </div>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center">
                  <div className="text-xs text-[var(--zinc-400)] uppercase tracking-wide mb-1">Best Day</div>
                  <div className="font-semibold text-[var(--white)]">{crawl.logistics.bestDay}</div>
                </div>
              </div>

              {crawl.logistics.pacingTips && (
                <div className="mt-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
                  <div className="text-xs text-[var(--zinc-400)] uppercase tracking-wide mb-1">Pacing Tips</div>
                  <p className="text-[var(--white)]">{crawl.logistics.pacingTips}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Route Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-[32px] font-medium text-[var(--cream)] text-center mb-12">
              The Route
            </h2>

            {/* Pub cards with route spine */}
            <div className="relative">
              {/* Animated route spine (desktop only) */}
              <RouteSpine
                totalStops={pubCount}
                accentColor={crawl.slug === 'monopoly' ? MONOPOLY_COLORS.green : crawl.slug === 'circle-line' ? CIRCLE_LINE_COLOR : '#E5A210'}
                className="hidden lg:block"
              />

              {/* Pub cards */}
              <div className="space-y-16">
                {crawl.pubs.map((crawlPub, index) => {
                  const pub = getPubById(crawlPub.pubId);
                  if (!pub) return null;

                  const isLeft = index % 2 === 0;

                  return (
                    <div
                      key={crawlPub.pubId}
                      className={`lg:w-[calc(50%-48px)] ${isLeft ? 'lg:mr-auto' : 'lg:ml-auto'}`}
                    >
                      <PubStopCard
                        pub={pub}
                        crawlPub={crawlPub}
                        stopNumber={index + 1}
                        totalStops={pubCount}
                        accentColor={accentColor}
                        isLeft={isLeft}
                        onClick={() => setSelectedPub({ pub, crawlPub, stopNumber: index + 1 })}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Map Preview Section */}
        <section className="py-16 px-6 border-t border-[var(--border)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-[32px] font-medium text-[var(--cream)] text-center mb-4">
              See the Full Route
            </h2>
            <p className="text-[var(--zinc-400)] text-center mb-8">
              All {pubCount} pubs plotted on an interactive map.
            </p>

            {mapLocations.length > 0 && (
              <InteractiveMap
                locations={mapLocations}
                accentColor={accentColor}
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
                Open Full Map &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* More Crawls Section */}
        <section className="py-16 px-6 border-t border-[var(--border)]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="font-display text-[32px] font-medium text-[var(--cream)] text-center mb-8">
              More Crawls
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {crawls
                .filter((c) => c.live && c.slug !== crawl.slug)
                .slice(0, 2)
                .map((otherCrawl) => (
                  <Link
                    key={otherCrawl.id}
                    href={`/crawls/${otherCrawl.slug}`}
                    className="block bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--border-bright)] transition-colors"
                  >
                    <h3 className="font-display text-xl font-semibold text-[var(--cream)] mb-2">
                      {otherCrawl.name}
                    </h3>
                    <p className="text-[var(--zinc-400)] text-sm mb-4 line-clamp-2">
                      {otherCrawl.tagline}
                    </p>
                    <div className="flex gap-3">
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-[rgba(229,162,16,0.15)] text-[var(--amber)]">
                        {otherCrawl.pubs.length} pubs
                      </span>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-[rgba(229,162,16,0.15)] text-[var(--amber)]">
                        {otherCrawl.duration}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/crawls" className="btn-secondary inline-block">
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
