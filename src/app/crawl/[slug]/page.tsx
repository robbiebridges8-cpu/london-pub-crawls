'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import { crawls, getCrawlBySlug, getPubCount, Crawl } from '@/content/crawls';
import { getPubById } from '@/content/pubs';
import { SiteNav, SiteFooter, PubCarousel, InteractiveMap, getThemedPubCard } from '@/components';
import Link from 'next/link';

interface CrawlPageProps {
  params: Promise<{ slug: string }>;
}

// Crawl card for cross-sell section (dark theme)
function CrawlCard({ crawl }: { crawl: Crawl }) {
  return (
    <Link
      href={`/crawl/${crawl.slug}`}
      className="group block relative overflow-hidden rounded-lg bg-[#161B22] border border-[#30363D] transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:border-[#D4A853] hover:shadow-[0_0_30px_rgba(212,168,83,0.15)]"
    >
      {/* Gold accent border on left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4A853]" />

      <div className="p-6 pl-8">
        <div className="flex items-center justify-between mb-3">
          <span
            className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border"
            style={{ borderColor: crawl.accentColor, color: crawl.accentColor }}
          >
            {crawl.area}
          </span>
        </div>
        <h3 className="font-serif text-lg font-bold text-[#F5F0E8] mb-2 group-hover:text-[#D4A853] transition-colors">
          {crawl.name}
        </h3>
        <p className="text-sm text-[#8B9AAD] line-clamp-2">{crawl.tagline}</p>
        <div className="flex items-center gap-4 text-xs text-[#8B9AAD] pt-4 mt-4 border-t border-[#30363D]">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {crawl.pubs.length} pubs
          </span>
          <span>{crawl.duration}</span>
        </div>
      </div>
    </Link>
  );
}

// Pub detail modal (dark theme)
function PubModal({ pub, crawlPub, crawl, stopNumber, onClose }: {
  pub: { name: string; address: string; neighbourhood: string };
  crawlPub: { description: string; historicNotes?: string };
  crawl: Crawl;
  stopNumber: number;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#161B22] rounded-xl max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#30363D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b border-[#30363D] relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0D1117] flex items-center justify-center text-[#8B9AAD] hover:text-[#F5F0E8] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="text-xs font-bold uppercase tracking-wider mb-1"
            style={{ color: crawl.accentColor }}
          >
            Stop {stopNumber} of {crawl.pubs.length}
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#F5F0E8]">{pub.name}</h2>
          <p className="text-sm text-[#8B9AAD]">{pub.address}, {pub.neighbourhood}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-[#8B9AAD] leading-relaxed mb-4">{crawlPub.description}</p>

          {crawlPub.historicNotes && (
            <div className="p-4 rounded-lg mb-4 border border-[#30363D] bg-[#0D1117]">
              <p className="text-sm italic" style={{ color: crawl.accentColor }}>
                {crawlPub.historicNotes}
              </p>
            </div>
          )}

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.name}, ${pub.address}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 text-[#0D1117] text-center font-semibold rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: crawl.accentColor }}
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

  if (!crawl) {
    notFound();
  }

  const pubCount = getPubCount(crawl);
  const PubCard = getThemedPubCard(crawl.slug);

  // Get other crawls for cross-sell (exclude current, only live ones)
  const otherCrawls = crawls.filter((c) => c.live && c.slug !== crawl.slug).slice(0, 3);

  // Check if this crawl should have an interactive map (Monopoly or Circle Line)
  const hasInteractiveMap = crawl.slug === 'monopoly' || crawl.slug === 'circle-line';

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
    <div className="min-h-screen bg-[#0D1117]">
      <SiteNav />

      <main>
        {/* Hero Section */}
        <header className="relative pt-24 pb-16 px-6 overflow-hidden">
          {/* Background with subtle accent glow */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#161B22] to-[#0D1117]" />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-10"
              style={{ backgroundColor: crawl.accentColor }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#8B9AAD] hover:text-[#D4A853] transition-colors mb-8 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Crawls
            </Link>

            {/* Badge */}
            <div
              className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full mb-6 border"
              style={{
                borderColor: crawl.accentColor,
                color: crawl.accentColor,
              }}
            >
              {crawl.area}
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F0E8] mb-4">
              {crawl.name}
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-[#8B9AAD] mb-8 max-w-2xl mx-auto">
              {crawl.tagline}
            </p>

            {/* Stats bar */}
            <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                  style={{ borderColor: crawl.accentColor }}
                >
                  <svg className="w-5 h-5" style={{ color: crawl.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-[#F5F0E8]">{pubCount}</div>
                  <div className="text-xs text-[#8B9AAD] uppercase tracking-wide">Pubs</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                  style={{ borderColor: crawl.accentColor }}
                >
                  <svg className="w-5 h-5" style={{ color: crawl.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-[#F5F0E8]">{crawl.duration}</div>
                  <div className="text-xs text-[#8B9AAD] uppercase tracking-wide">Duration</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                  style={{ borderColor: crawl.accentColor }}
                >
                  <svg className="w-5 h-5" style={{ color: crawl.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-[#F5F0E8]">{crawl.difficulty}</div>
                  <div className="text-xs text-[#8B9AAD] uppercase tracking-wide">Difficulty</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Description Section */}
        <section className="py-12 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-[#8B9AAD] leading-relaxed">
              {crawl.editorialDescription || crawl.description}
            </p>
          </div>
        </section>

        {/* Logistics Section */}
        {crawl.logistics && (
          <section className="py-12 px-6 bg-[#161B22]">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#F5F0E8] text-center mb-8">
                Before You Go
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0D1117] rounded-xl p-6 text-center border border-[#30363D]">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border-2"
                    style={{ borderColor: crawl.accentColor }}
                  >
                    <svg className="w-6 h-6" style={{ color: crawl.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div className="text-xs text-[#8B9AAD] uppercase tracking-wide mb-1">Start</div>
                  <div className="font-semibold text-[#F5F0E8]">{crawl.logistics.tubeStart}</div>
                </div>

                <div className="bg-[#0D1117] rounded-xl p-6 text-center border border-[#30363D]">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border-2"
                    style={{ borderColor: crawl.accentColor }}
                  >
                    <svg className="w-6 h-6" style={{ color: crawl.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-xs text-[#8B9AAD] uppercase tracking-wide mb-1">End</div>
                  <div className="font-semibold text-[#F5F0E8]">{crawl.logistics.tubeEnd}</div>
                </div>

                <div className="bg-[#0D1117] rounded-xl p-6 text-center border border-[#30363D]">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border-2"
                    style={{ borderColor: crawl.accentColor }}
                  >
                    <svg className="w-6 h-6" style={{ color: crawl.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-xs text-[#8B9AAD] uppercase tracking-wide mb-1">Start Time</div>
                  <div className="font-semibold text-[#F5F0E8]">{crawl.logistics.suggestedStart}</div>
                </div>

                <div className="bg-[#0D1117] rounded-xl p-6 text-center border border-[#30363D]">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border-2"
                    style={{ borderColor: crawl.accentColor }}
                  >
                    <svg className="w-6 h-6" style={{ color: crawl.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-xs text-[#8B9AAD] uppercase tracking-wide mb-1">Best Day</div>
                  <div className="font-semibold text-[#F5F0E8]">{crawl.logistics.bestDay}</div>
                </div>
              </div>

              {/* Pacing tips */}
              <div className="bg-[#0D1117] rounded-xl p-6 border border-[#30363D]">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2"
                    style={{ borderColor: crawl.accentColor }}
                  >
                    <svg className="w-5 h-5" style={{ color: crawl.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[#F5F0E8] mb-1">Pacing Tips</div>
                    <p className="text-[#8B9AAD]">{crawl.logistics.pacingTips}</p>
                    {crawl.logistics.specialNotes && (
                      <p className="text-sm mt-2" style={{ color: crawl.accentColor }}>
                        {crawl.logistics.specialNotes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pub Carousel Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#F5F0E8] text-center mb-4">
              The Route
            </h2>
            <p className="text-[#8B9AAD] text-center mb-10 max-w-xl mx-auto">
              Swipe through all {pubCount} stops. Tap any card for full details.
            </p>

            <PubCarousel title={`${pubCount} Stops`}>
              {crawl.pubs.map((crawlPub, index) => {
                const pub = getPubById(crawlPub.pubId);
                if (!pub) return null;

                return (
                  <PubCard
                    key={crawlPub.pubId}
                    pubName={pub.name}
                    description={crawlPub.description}
                    stopNumber={index + 1}
                    totalStops={pubCount}
                    nearestTube={pub.neighbourhood}
                    accentColor={crawl.accentColor}
                    onClick={() => setSelectedPub({ pub, crawlPub, stopNumber: index + 1 })}
                  />
                );
              })}
            </PubCarousel>

            {/* Print button */}
            <div className="text-center mt-8">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 rounded-lg font-semibold transition-colors hover:bg-[#161B22]"
                style={{ borderColor: crawl.accentColor, color: crawl.accentColor }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-16 px-6 bg-[#161B22]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#F5F0E8] text-center mb-4">
              Route Map
            </h2>
            <p className="text-[#8B9AAD] text-center mb-8">
              Follow the route pub by pub. Click any stop to get directions.
            </p>

            {hasInteractiveMap && mapLocations.length > 0 ? (
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
            ) : (
              /* Fallback for non-live crawls or crawls without coordinates */
              <div className="bg-[#0D1117] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="aspect-[16/9] flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: crawl.accentColor }}
                    >
                      <svg className="w-8 h-8 text-[#0D1117]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-[#8B9AAD] font-medium mb-4">{pubCount} stops on this route</p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(crawl.logistics?.tubeEnd || crawl.area)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[#0D1117] font-semibold hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: crawl.accentColor }}
                    >
                      Open in Google Maps
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Cross-sell Section */}
        {otherCrawls.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#F5F0E8] text-center mb-4">
                More Crawls
              </h2>
              <p className="text-[#8B9AAD] text-center mb-10">
                Explore other routes through London
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {otherCrawls.map((c) => (
                  <CrawlCard key={c.id} crawl={c} />
                ))}
              </div>
            </div>
          </section>
        )}
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
