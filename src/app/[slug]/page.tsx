'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import Link from 'next/link';
import { Chip, ScrollShadow } from '@heroui/react';
import { crawls, getCrawlBySlug, getPubCount, Crawl } from '@/content/crawls';
import { getPubById } from '@/content/pubs';
import { SiteNav, SiteFooter, InteractiveMap, getThemedPubCard, MonopolyMap, CircleLineMap, RipperMap } from '@/components';
import { MonopolyPubCard, MonopolyFlipCard } from '@/components/MonopolyPubCard';
import { CircleLineStationCard, CircleLineStationFlipCard } from '@/components/CircleLinePubCard';
import { RipperStationCard, RipperStationFlipCard } from '@/components/RipperStationCard';
import { MonopolyPub, monopolyPubs, monopolyColorGroups, monopolyStats, getMonopolyMapsUrl, getMonopolyDirectionsUrl } from '@/content/crawls/monopoly';
import { CircleLinePub, circleLinePubs, circleLineStats, getCircleLineMapsUrl, getCircleLineDirectionsUrl } from '@/content/crawls/circleline';
import { RipperPub, ripperPubs, ripperStats, getRipperMapsUrl, getRipperDirectionsUrl, canonicalVictims } from '@/content/crawls/ripper';

interface CrawlPageProps {
  params: Promise<{ slug: string }>;
}

// Generic pub detail modal
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

// Monopoly-specific pub modal with deed styling
function MonopolyPubModal({
  pub,
  onClose,
  onPrevious,
  onNext,
}: {
  pub: MonopolyPub;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const group = monopolyColorGroups[pub.colorGroup];
  const lightBands = ['yellow', 'lightBlue'];
  const bandTextColor = lightBands.includes(pub.colorGroup) ? '#1a1a1a' : '#fff';

  // Rating badge color
  const getRatingClass = (rating: number) => {
    if (rating >= 8) return 'bg-[#2E7D32]';
    if (rating >= 6) return 'bg-[#FF6B00]';
    if (rating >= 4) return 'bg-[#E65100]';
    return 'bg-[#D32F2F]';
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-black rounded-md max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center z-10 hover:bg-gray-100 transition-colors"
        >
          ×
        </button>

        {/* Color band header */}
        <div
          className="px-5 py-3 text-center border-b-2 border-black"
          style={{ backgroundColor: group.color }}
        >
          <span
            className="text-base font-black uppercase tracking-wide"
            style={{ color: bandTextColor }}
          >
            {pub.property}
          </span>
        </div>

        {/* Deed title section */}
        <div className="text-center px-6 py-5 border-b border-black">
          <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-1">
            {pub.pubName}
          </h2>
          <p className="text-sm text-gray-600">
            {pub.address}, {pub.postcode}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Info rows */}
          <div className="space-y-2 mb-5">
            <div className="flex items-baseline gap-2 text-sm">
              <span className="text-gray-600">Time</span>
              <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
              <span className="font-semibold text-black">{pub.startTime} - {pub.endTime}</span>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              <span className="text-gray-600">Drink</span>
              <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
              <span className="font-semibold text-black">{pub.pintQuantity} pint</span>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              <span className="text-gray-600">Cost</span>
              <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
              <span className="font-semibold text-black">£{pub.price.toFixed(2)}</span>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              <span className="text-gray-600">Transport</span>
              <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
              <span className="font-semibold text-black">
                {pub.transportToNext ? `${pub.transportToNext} (${pub.transportTime} min)` : 'Final stop'}
              </span>
            </div>
          </div>

          {/* Review */}
          <div className="py-4 border-t border-black">
            <h3 className="text-sm font-black uppercase tracking-tight mb-2">Our Review</h3>
            <p className="text-sm leading-relaxed text-gray-700">{pub.review}</p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-black">
            <div className="flex items-center gap-2">
              <span className={`${getRatingClass(pub.rating)} text-white text-sm font-bold px-2 py-1 rounded`}>
                {pub.rating}
              </span>
              <span className="text-sm text-gray-500">/10</span>
            </div>
            <span className="text-sm text-gray-500 font-semibold">
              Stop {pub.id}/26
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-5">
            <a
              href={getMonopolyMapsUrl(pub)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center bg-black text-white rounded font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors"
            >
              Open in Maps
            </a>
            {pub.website && (
              <a
                href={pub.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center border-2 border-black text-black rounded font-semibold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors"
              >
                Website
              </a>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-5">
            <button
              onClick={(e) => { e.stopPropagation(); onPrevious(); }}
              disabled={pub.id === 1}
              className="text-sm font-semibold text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline"
            >
              ← Previous
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              disabled={pub.id === 26}
              className="text-sm font-semibold text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Monopoly Crawl Page Component
function MonopolyCrawlPage({ crawl }: { crawl: Crawl }) {
  const [selectedPub, setSelectedPub] = useState<MonopolyPub | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handlePubSelect = (pub: MonopolyPub) => {
    setSelectedPub(pub);
  };

  const handlePreviousPub = () => {
    if (selectedPub && selectedPub.id > 1) {
      const prevPub = monopolyPubs.find(p => p.id === selectedPub.id - 1);
      if (prevPub) setSelectedPub(prevPub);
    }
  };

  const handleNextPub = () => {
    if (selectedPub && selectedPub.id < 26) {
      const nextPub = monopolyPubs.find(p => p.id === selectedPub.id + 1);
      if (nextPub) setSelectedPub(nextPub);
    }
  };

  const toggleFlip = (pubId: number) => {
    setFlippedCards(prev => ({ ...prev, [pubId]: !prev[pubId] }));
  };

  // Schema.org TouristAttraction structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Monopoly Pub Crawl",
    description: "The ultimate London pub crawl. Twenty-six pubs, one for each property on the Monopoly board. From Old Kent Road to Mayfair.",
    url: "https://londoncrawling.com/monopoly",
    touristType: "Pub crawl enthusiasts",
    isAccessibleForFree: true,
    publicAccess: true,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <SiteNav />

      <main id="main-content">
        {/* Hero Section - Standard claret branding */}
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            {/* Back link */}
            <Link
              href="/"
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
                {monopolyStats.totalPubs} Pubs
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

        {/* Editorial Description */}
        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">
                About This Crawl
              </h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed">
                <p>{crawl.editorialDescription}</p>
              </div>
            </div>
          </section>
        )}

        {/* Map Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                Interactive Map
              </p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                The Route
              </h2>
              <p className="text-[var(--muted)] mt-2">
                Click any marker to see pub details
              </p>
            </div>

            <MonopolyMap
              onPubSelect={handlePubSelect}
              selectedPub={selectedPub}
            />
          </div>
        </section>

        {/* Pub Cards Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                The Route
              </p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                {monopolyStats.totalPubs} Pubs to Visit
              </h2>
            </div>

            {/* Desktop: Horizontal scroll carousel */}
            <ScrollShadow
              orientation="horizontal"
              className="w-full hidden md:block"
              hideScrollBar
            >
              <div className="flex gap-6 pb-4 px-4">
                {monopolyPubs.map((pub) => (
                  <div key={pub.id} className="flex-shrink-0">
                    <MonopolyPubCard
                      pub={pub}
                      onClick={() => handlePubSelect(pub)}
                    />
                  </div>
                ))}
              </div>
            </ScrollShadow>

            {/* Mobile: Vertical list with flip cards */}
            <div className="md:hidden space-y-6">
              {monopolyPubs.map((pub) => (
                <div key={pub.id}>
                  <MonopolyFlipCard
                    pub={pub}
                    isFlipped={flippedCards[pub.id] || false}
                    onFlip={() => toggleFlip(pub.id)}
                  />
                  {/* Transport to next */}
                  {pub.transportToNext && (
                    <div className="text-center mt-4 text-sm text-gray-500">
                      <span>
                        {pub.transportToNext} to next ({pub.transportTime} min) •{' '}
                        <a
                          href={getMonopolyDirectionsUrl(pub, monopolyPubs[pub.id])}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Get directions
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Share & Save Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">
              Ready to go?
            </h2>
            <p className="font-body text-[var(--muted)] mb-8">
              Share this crawl with your mates or save it for later.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out the Monopoly Pub Crawl! 26 pubs, one for each Monopoly board property. https://londoncrawling.com/monopoly`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Share on WhatsApp
              </a>
              <button
                onClick={() => window.print()}
                className="btn-ghost inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        {/* More Crawls Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                Keep Exploring
              </p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                More Crawls
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls
                .filter((c) => c.live && c.slug !== 'monopoly')
                .slice(0, 2)
                .map((otherCrawl) => (
                  <Link
                    key={otherCrawl.id}
                    href={`/${otherCrawl.slug}`}
                    className="block bg-[var(--surface)] p-6 hover:bg-[var(--background)] transition-colors"
                  >
                    <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">
                      {otherCrawl.name}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mb-4 line-clamp-2">
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
              <Link href="/" className="btn-ghost">
                View All Crawls
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Monopoly Pub Modal */}
      {selectedPub && (
        <MonopolyPubModal
          pub={selectedPub}
          onClose={() => setSelectedPub(null)}
          onPrevious={handlePreviousPub}
          onNext={handleNextPub}
        />
      )}

      <SiteFooter />
    </div>
  );
}

// Circle Line-specific pub modal
function CircleLinePubModal({
  pub,
  onClose,
  onPrevious,
  onNext,
}: {
  pub: CircleLinePub;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  // Rating badge color
  const getRatingClass = (rating: number) => {
    if (rating >= 8) return 'bg-[#2E7D32]';
    if (rating >= 6) return 'bg-[#FF6B00]';
    if (rating >= 4) return 'bg-[#E65100]';
    return 'bg-[#D32F2F]';
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-black rounded-md max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center z-10 hover:bg-gray-100 transition-colors"
        >
          x
        </button>

        {/* TfL yellow header band */}
        <div
          className="px-5 py-3 text-center border-b-2 border-black flex items-center justify-center gap-3"
          style={{ backgroundColor: '#FFD300' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#003688', border: '2px solid #fff' }}
          >
            <span className="text-white text-sm font-black">{pub.id}</span>
          </div>
          <span className="text-base font-black uppercase tracking-wide text-black">
            {pub.station}
          </span>
        </div>

        {/* Pub title section */}
        <div className="text-center px-6 py-5 border-b border-black">
          <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-1">
            {pub.pubName}
          </h2>
          <p className="text-sm text-gray-600">
            {pub.address}, {pub.postcode}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Info rows */}
          <div className="space-y-2 mb-5">
            <div className="flex items-baseline gap-2 text-sm">
              <span className="text-gray-600">Time</span>
              <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
              <span className="font-semibold text-black">{pub.startTime} - {pub.endTime}</span>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              <span className="text-gray-600">Next Station</span>
              <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
              <span className="font-semibold text-black">
                {pub.transportToNext ? `Circle Line (${pub.transportTime} min)` : 'Final stop!'}
              </span>
            </div>
          </div>

          {/* Review */}
          <div className="py-4 border-t border-black">
            <h3 className="text-sm font-black uppercase tracking-tight mb-2">Our Review</h3>
            <p className="text-sm leading-relaxed text-gray-700">{pub.review}</p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-black">
            <div className="flex items-center gap-2">
              <span className={`${getRatingClass(pub.rating)} text-white text-sm font-bold px-2 py-1 rounded`}>
                {pub.rating}
              </span>
              <span className="text-sm text-gray-500">/10</span>
            </div>
            <span className="text-sm text-gray-500 font-semibold">
              Stop {pub.id}/27
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-5">
            <a
              href={getCircleLineMapsUrl(pub)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center text-white rounded font-semibold text-sm uppercase tracking-wide hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#003688' }}
            >
              Open in Maps
            </a>
            {pub.website && (
              <a
                href={pub.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center border-2 border-black text-black rounded font-semibold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors"
              >
                Website
              </a>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-5">
            <button
              onClick={(e) => { e.stopPropagation(); onPrevious(); }}
              disabled={pub.id === 1}
              className="text-sm font-semibold hover:underline disabled:text-gray-400 disabled:no-underline"
              style={{ color: pub.id === 1 ? undefined : '#003688' }}
            >
              Previous
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              disabled={pub.id === 27}
              className="text-sm font-semibold hover:underline disabled:text-gray-400 disabled:no-underline"
              style={{ color: pub.id === 27 ? undefined : '#003688' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Circle Line Crawl Page Component
function CircleLineCrawlPage({ crawl }: { crawl: Crawl }) {
  const [selectedPub, setSelectedPub] = useState<CircleLinePub | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handlePubSelect = (pub: CircleLinePub) => {
    setSelectedPub(pub);
  };

  const handlePreviousPub = () => {
    if (selectedPub && selectedPub.id > 1) {
      const prevPub = circleLinePubs.find(p => p.id === selectedPub.id - 1);
      if (prevPub) setSelectedPub(prevPub);
    }
  };

  const handleNextPub = () => {
    if (selectedPub && selectedPub.id < 27) {
      const nextPub = circleLinePubs.find(p => p.id === selectedPub.id + 1);
      if (nextPub) setSelectedPub(nextPub);
    }
  };

  const toggleFlip = (pubId: number) => {
    setFlippedCards(prev => ({ ...prev, [pubId]: !prev[pubId] }));
  };

  // Schema.org TouristAttraction structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Circle Line Pub Crawl",
    description: "The ultimate London tube pub crawl. 27 stations, 27 pubs. Complete the loop before the Tube closes.",
    url: "https://londoncrawling.com/circle-line",
    touristType: "Pub crawl enthusiasts",
    isAccessibleForFree: true,
    publicAccess: true,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <SiteNav />

      <main id="main-content">
        {/* Hero Section - Standard claret branding */}
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            {/* Back link */}
            <Link
              href="/"
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
                {circleLineStats.totalPubs} Pubs
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

        {/* Editorial Description */}
        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">
                About This Crawl
              </h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed">
                <p>{crawl.editorialDescription}</p>
              </div>
            </div>
          </section>
        )}

        {/* Map Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                Interactive Map
              </p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                The Route
              </h2>
              <p className="text-[var(--muted)] mt-2">
                Click any marker to see pub details
              </p>
            </div>

            <CircleLineMap
              onPubSelect={handlePubSelect}
              selectedPub={selectedPub}
            />
          </div>
        </section>

        {/* Pub Cards Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                The Route
              </p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                {circleLineStats.totalPubs} Pubs to Visit
              </h2>
            </div>

            {/* Desktop: Horizontal scroll carousel */}
            <ScrollShadow
              orientation="horizontal"
              className="w-full hidden md:block"
              hideScrollBar
            >
              <div className="flex gap-6 pb-4 px-4">
                {circleLinePubs.map((pub) => (
                  <div key={pub.id} className="flex-shrink-0">
                    <CircleLineStationCard
                      pub={pub}
                      onClick={() => handlePubSelect(pub)}
                    />
                  </div>
                ))}
              </div>
            </ScrollShadow>

            {/* Mobile: Vertical list with flip cards */}
            <div className="md:hidden space-y-6">
              {circleLinePubs.map((pub) => (
                <div key={pub.id}>
                  <CircleLineStationFlipCard
                    pub={pub}
                    isFlipped={flippedCards[pub.id] || false}
                    onFlip={() => toggleFlip(pub.id)}
                  />
                  {/* Transport to next */}
                  {pub.transportToNext && pub.id < 27 && (
                    <div className="text-center mt-4 text-sm text-gray-500">
                      <span>
                        Circle Line to {circleLinePubs[pub.id]?.station} ({pub.transportTime} min) {' '}
                        <a
                          href={getCircleLineDirectionsUrl(pub, circleLinePubs[pub.id])}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          style={{ color: '#003688' }}
                        >
                          Get directions
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Share & Save Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">
              Ready to go?
            </h2>
            <p className="font-body text-[var(--muted)] mb-8">
              Share this crawl with your mates or save it for later.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out the Circle Line Pub Crawl! 27 stations, 27 pubs. The ultimate test. https://londoncrawling.com/circle-line`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Share on WhatsApp
              </a>
              <button
                onClick={() => window.print()}
                className="btn-ghost inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        {/* More Crawls Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                Keep Exploring
              </p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                More Crawls
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls
                .filter((c) => c.live && c.slug !== 'circle-line')
                .slice(0, 2)
                .map((otherCrawl) => (
                  <Link
                    key={otherCrawl.id}
                    href={`/${otherCrawl.slug}`}
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
              <Link href="/" className="btn-ghost">
                View All Crawls
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Circle Line Pub Modal */}
      {selectedPub && (
        <CircleLinePubModal
          pub={selectedPub}
          onClose={() => setSelectedPub(null)}
          onPrevious={handlePreviousPub}
          onNext={handleNextPub}
        />
      )}

      <SiteFooter />
    </div>
  );
}

// Jack the Ripper-specific pub modal
function RipperPubModal({
  pub,
  onClose,
  onPrevious,
  onNext,
}: {
  pub: RipperPub;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  // Rating badge color
  const getRatingClass = (rating: number) => {
    if (rating >= 8) return 'bg-[#2E7D32]';
    if (rating >= 6) return 'bg-[#FF6B00]';
    if (rating >= 4) return 'bg-[#E65100]';
    return 'bg-[#D32F2F]';
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.75)] backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#F5F0E6] border-2 border-[#1C1C1C] rounded-sm max-w-lg w-full max-h-[85vh] overflow-y-auto"
        style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#F5F0E6] border border-[#1C1C1C] flex items-center justify-center z-10 hover:bg-[#8B1A1A] hover:text-white transition-colors"
        >
          x
        </button>

        {/* Dark header band */}
        <div className="px-5 py-4 text-center border-b-2 border-[#1C1C1C] bg-[#1C1C1C]">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#8B1A1A' }}>
            Stop {pub.id} of 7
          </div>
          <h2 className="text-xl font-black uppercase tracking-wide" style={{ color: '#F5F0E6', fontFamily: 'Georgia, serif' }}>
            {pub.pubName}
          </h2>
        </div>

        {/* Ripper connection banner */}
        <div className="px-5 py-3 border-b border-[#1C1C1C] bg-[#8B1A1A]">
          <p className="text-sm font-bold uppercase tracking-wide text-center" style={{ color: '#F5F0E6' }}>
            {pub.ripperConnection}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-sm text-gray-600 italic mb-4">
            {pub.address}, {pub.postcode}
          </p>

          {/* Review */}
          <div className="py-4 border-t border-[#1C1C1C]">
            <p className="text-sm leading-relaxed text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>
              {pub.review}
            </p>
          </div>

          {/* Historic Notes */}
          <div className="py-4 border-t border-[#1C1C1C] bg-[#1C1C1C] -mx-6 px-6 mb-4">
            <h3 className="text-xs font-black uppercase tracking-[0.1em] mb-2" style={{ color: '#D4A853' }}>
              Historic Notes
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#F5F0E6', fontFamily: 'Georgia, serif' }}>
              {pub.historicNotes}
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-[#1C1C1C]">
            <div className="flex items-center gap-2">
              <span className={`${getRatingClass(pub.rating)} text-white text-sm font-bold px-2 py-1 rounded`}>
                {pub.rating}
              </span>
              <span className="text-sm text-gray-500">/10</span>
            </div>
            <div className="text-sm text-gray-600">
              {pub.startTime} - {pub.endTime}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-5">
            <a
              href={getRipperMapsUrl(pub)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center text-white rounded-sm font-semibold text-sm uppercase tracking-wide hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#1C1C1C' }}
            >
              Open in Maps
            </a>
            {pub.website && (
              <a
                href={pub.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center border-2 border-[#1C1C1C] text-[#1C1C1C] rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-[#1C1C1C] hover:text-white transition-colors"
              >
                Website
              </a>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-5">
            <button
              onClick={(e) => { e.stopPropagation(); onPrevious(); }}
              disabled={pub.id === 1}
              className="text-sm font-semibold hover:underline disabled:text-gray-400 disabled:no-underline"
              style={{ color: pub.id === 1 ? undefined : '#8B1A1A' }}
            >
              Previous
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              disabled={pub.id === 7}
              className="text-sm font-semibold hover:underline disabled:text-gray-400 disabled:no-underline"
              style={{ color: pub.id === 7 ? undefined : '#8B1A1A' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Jack the Ripper Crawl Page Component
function RipperCrawlPage({ crawl }: { crawl: Crawl }) {
  const [selectedPub, setSelectedPub] = useState<RipperPub | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handlePubSelect = (pub: RipperPub) => {
    setSelectedPub(pub);
  };

  const handlePreviousPub = () => {
    if (selectedPub && selectedPub.id > 1) {
      const prevPub = ripperPubs.find(p => p.id === selectedPub.id - 1);
      if (prevPub) setSelectedPub(prevPub);
    }
  };

  const handleNextPub = () => {
    if (selectedPub && selectedPub.id < 7) {
      const nextPub = ripperPubs.find(p => p.id === selectedPub.id + 1);
      if (nextPub) setSelectedPub(nextPub);
    }
  };

  const toggleFlip = (pubId: number) => {
    setFlippedCards(prev => ({ ...prev, [pubId]: !prev[pubId] }));
  };

  // Schema.org TouristAttraction structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Jack the Ripper Pub Crawl",
    description: "Follow the trail through the historic pubs of Whitechapel where Victorian London's darkest chapter unfolded.",
    url: "https://londoncrawling.com/jack-the-ripper",
    touristType: "History enthusiasts, Pub crawl enthusiasts",
    isAccessibleForFree: true,
    publicAccess: true,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "Whitechapel",
      addressCountry: "GB",
    },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <SiteNav />

      <main id="main-content">
        {/* Hero Section - Standard claret branding */}
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            {/* Back link */}
            <Link
              href="/"
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
                {ripperStats.totalPubs} Pubs
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

        {/* Editorial Description */}
        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">
                About This Crawl
              </h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed">
                <p>{crawl.editorialDescription}</p>
              </div>
            </div>
          </section>
        )}

        {/* The Victims Memorial Section */}
        <section className="py-12 px-6 bg-[#1C1C1C]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#8B1A1A' }}>
                In Memoriam
              </p>
              <h2 className="font-display text-2xl font-bold" style={{ color: '#F5F0E6' }}>
                The Five Canonical Victims
              </h2>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {canonicalVictims.map((victim, i) => (
                <div key={i} className="text-center p-4 border border-[#8B1A1A] rounded-sm">
                  <div className="text-sm font-semibold mb-1" style={{ color: '#D4A853', fontFamily: 'Georgia, serif' }}>
                    {victim.name}
                  </div>
                  <div className="text-xs mb-2" style={{ color: '#F5F0E6' }}>
                    Age {victim.age}
                  </div>
                  <div className="text-xs" style={{ color: '#888' }}>
                    {victim.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                Interactive Map
              </p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                The Route
              </h2>
              <p className="text-[var(--muted)] mt-2">
                Click any marker to see pub details
              </p>
            </div>

            <RipperMap
              onPubSelect={handlePubSelect}
              selectedPub={selectedPub}
            />
          </div>
        </section>

        {/* Pub Cards Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                The Route
              </p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                {ripperStats.totalPubs} Pubs to Visit
              </h2>
            </div>

            {/* Desktop: Horizontal scroll carousel */}
            <ScrollShadow
              orientation="horizontal"
              className="w-full hidden md:block"
              hideScrollBar
            >
              <div className="flex gap-6 pb-4 px-4">
                {ripperPubs.map((pub) => (
                  <div key={pub.id} className="flex-shrink-0">
                    <RipperStationCard
                      pub={pub}
                      onClick={() => handlePubSelect(pub)}
                    />
                  </div>
                ))}
              </div>
            </ScrollShadow>

            {/* Mobile: Vertical list with flip cards */}
            <div className="md:hidden space-y-6">
              {ripperPubs.map((pub) => (
                <div key={pub.id}>
                  <RipperStationFlipCard
                    pub={pub}
                    isFlipped={flippedCards[pub.id] || false}
                    onFlip={() => toggleFlip(pub.id)}
                  />
                  {/* Walk to next */}
                  {pub.walkToNext && pub.id < 7 && (
                    <div className="text-center mt-4 text-sm text-gray-500">
                      <span>
                        {pub.walkToNext} min walk to {ripperPubs[pub.id]?.pubName} {' '}
                        <a
                          href={getRipperDirectionsUrl(pub, ripperPubs[pub.id])}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          style={{ color: '#8B1A1A' }}
                        >
                          Get directions
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Share & Save Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">
              Ready to go?
            </h2>
            <p className="font-body text-[var(--muted)] mb-8">
              Share this crawl with your mates or save it for later.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out the Jack the Ripper Pub Crawl! Follow the trail through Whitechapel's darkest history. https://londoncrawling.com/jack-the-ripper`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Share on WhatsApp
              </a>
              <button
                onClick={() => window.print()}
                className="btn-ghost inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        {/* More Crawls Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                Keep Exploring
              </p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                More Crawls
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls
                .filter((c) => c.live && c.slug !== 'jack-the-ripper')
                .slice(0, 2)
                .map((otherCrawl) => (
                  <Link
                    key={otherCrawl.id}
                    href={`/${otherCrawl.slug}`}
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
              <Link href="/" className="btn-ghost">
                View All Crawls
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Ripper Pub Modal */}
      {selectedPub && (
        <RipperPubModal
          pub={selectedPub}
          onClose={() => setSelectedPub(null)}
          onPrevious={handlePreviousPub}
          onNext={handleNextPub}
        />
      )}

      <SiteFooter />
    </div>
  );
}

// Generic Crawl Page Component
function GenericCrawlPage({ crawl }: { crawl: Crawl }) {
  const [selectedPub, setSelectedPub] = useState<{ pub: any; crawlPub: any; stopNumber: number } | null>(null);

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

  // Schema.org TouristAttraction structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: crawl.name,
    description: crawl.editorialDescription || crawl.description,
    url: `https://londoncrawling.com/${crawl.slug}`,
    touristType: "Pub crawl enthusiasts",
    isAccessibleForFree: true,
    publicAccess: true,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <SiteNav />

      <main id="main-content">
        {/* Hero Section - Claret background */}
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            {/* Back link */}
            <Link
              href="/"
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

        {/* Editorial Description */}
        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">
                About This Crawl
              </h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed">
                <p>{crawl.editorialDescription}</p>
              </div>
            </div>
          </section>
        )}

        {/* Pub Stops Carousel */}
        <section className="py-16 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                The Route
              </p>
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
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                Interactive Map
              </p>
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

        {/* Share & Save Section */}
        <section className="py-16 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">
              Ready to go?
            </h2>
            <p className="font-body text-[var(--muted)] mb-8">
              Share this crawl with your mates or save it for later.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out the ${crawl.name}! ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Share on WhatsApp
              </a>
              <button
                onClick={() => window.print()}
                className="btn-ghost inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        {/* More Crawls Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
                Keep Exploring
              </p>
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
                    href={`/${otherCrawl.slug}`}
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
              <Link href="/" className="btn-ghost">
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

// Main Page Component - Routes to appropriate sub-component
export default function CrawlPage({ params }: CrawlPageProps) {
  const { slug } = use(params);
  const crawl = getCrawlBySlug(slug);

  // Redirect non-live crawls
  if (!crawl || !crawl.live) {
    notFound();
  }

  // Use specialized Monopoly page for monopoly crawl
  if (slug === 'monopoly') {
    return <MonopolyCrawlPage crawl={crawl} />;
  }

  // Use specialized Circle Line page for circle-line crawl
  if (slug === 'circle-line') {
    return <CircleLineCrawlPage crawl={crawl} />;
  }

  // Use specialized Ripper page for jack-the-ripper crawl
  if (slug === 'jack-the-ripper') {
    return <RipperCrawlPage crawl={crawl} />;
  }

  // Use generic page for other crawls
  return <GenericCrawlPage crawl={crawl} />;
}
