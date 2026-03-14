'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Chip, ScrollShadow } from '@heroui/react';
import { crawls, getCrawlBySlug, getPubCount, Crawl } from '@/content/crawls';
import { getPubById } from '@/content/pubs';
import { SiteNav, SiteFooter, InteractiveMap, getThemedPubCard } from '@/components';
import { monopolyStats } from '@/content/crawls/monopoly';

const MonopolyScrollMap = dynamic(() => import('@/components/MonopolyScrollMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});

const CircleLineScrollMap = dynamic(() => import('@/components/CircleLineScrollMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});

const RipperScrollMap = dynamic(() => import('@/components/RipperScrollMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});

const BeatlesScrollMap = dynamic(() => import('@/components/BeatlesScrollMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});

const SouthBankScrollMap = dynamic(() => import('@/components/SouthBankScrollMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});

const HistoricLondonScrollMap = dynamic(() => import('@/components/HistoricLondonScrollMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});

const LiteraryLondonScrollMap = dynamic(() => import('@/components/LiteraryLondonScrollMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});

const BermondseyScrollMap = dynamic(() => import('@/components/BermondseyScrollMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});

const HauntedLondonScrollMap = dynamic(() => import('@/components/HauntedLondonScrollMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});
import { CircleLinePub, circleLinePubs, circleLineStats, getCircleLineMapsUrl, getCircleLineDirectionsUrl } from '@/content/crawls/circleline';
import { RipperPub, ripperPubs, ripperStats, getRipperMapsUrl, getRipperDirectionsUrl, canonicalVictims } from '@/content/crawls/ripper';
import { beatlesStats } from '@/content/crawls/beatles';
import { southBankStats } from '@/content/crawls/southbank';
import { historicLondonStats } from '@/content/crawls/historiclondon';
import { literaryLondonStats } from '@/content/crawls/literarylondon';
import { bermondseyStats } from '@/content/crawls/bermondseybm';
import { hauntedLondonStats } from '@/content/crawls/hauntedlondon';
import { criminalLondonStats } from '@/content/crawls/criminallondon';

const CriminalLondonScrollMap = dynamic(() => import('@/components/CriminalLondonScrollMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});

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

// Monopoly Crawl Page Component
function MonopolyCrawlPage({ crawl }: { crawl: Crawl }) {

  // Schema.org TouristAttraction structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Monopoly Pub Crawl",
    description: "The ultimate London pub crawl. Twenty-six pubs, one for each property on the Monopoly board. From Old Kent Road to Mayfair.",
    url: "https://londonontap.com/monopoly",
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
              className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-6 text-xs font-label uppercase tracking-widest"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Scroll-driven map + pub breakdown */}
        <MonopolyScrollMap />

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
                href={`https://wa.me/?text=${encodeURIComponent(`Check out the Monopoly Pub Crawl! 26 pubs, one for each Monopoly board property. https://londonontap.com/monopoly`)}`}
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

        {/* Build Your Own CTA */}
        <section className="py-14 px-6 bg-[var(--ink)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Build Your Own Crawl
            </h2>
            <p className="font-body text-sm text-white/60 mb-6">
              Got your own route in mind? Design a custom pub crawl with your pubs, your order, your rules.
            </p>
            <Link href="/build" className="inline-block px-6 py-3 bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">
              Find Out More
            </Link>
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

      <SiteFooter />
    </div>
  );
}

// Circle Line Crawl Page Component
function CircleLineCrawlPage({ crawl }: { crawl: Crawl }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Circle Line Pub Crawl",
    description: "The ultimate London tube pub crawl. 27 stations, 27 pubs. Complete the loop before the Tube closes.",
    url: "https://londonontap.com/circle-line",
    touristType: "Pub crawl enthusiasts",
    isAccessibleForFree: true,
    publicAccess: true,
    address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteNav />

      <main id="main-content">
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-6 text-xs font-label uppercase tracking-widest">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Crawls
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{crawl.name}</h1>
            <p className="font-display text-xl md:text-2xl italic text-white opacity-90 mb-8 max-w-2xl mx-auto">{crawl.tagline}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{circleLineStats.totalPubs} Pubs</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.duration}</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.difficulty}</Chip>
            </div>
          </div>
        </header>

        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">About This Crawl</h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed"><p>{crawl.editorialDescription}</p></div>
            </div>
          </section>
        )}

        <CircleLineScrollMap />

        {/* Share & Save Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">Ready to go?</h2>
            <p className="font-body text-[var(--muted)] mb-8">Share this crawl with your mates or save it for later.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(`Check out the Circle Line Pub Crawl! 27 stations, 27 pubs. https://londonontap.com/circle-line`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share on WhatsApp
              </a>
              <button onClick={() => window.print()} className="btn-ghost inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        {/* Build Your Own CTA */}
        <section className="py-14 px-6 bg-[var(--ink)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Build Your Own Crawl</h2>
            <p className="font-body text-sm text-white/60 mb-6">Got your own route in mind? Design a custom pub crawl with your pubs, your order, your rules.</p>
            <Link href="/build" className="inline-block px-6 py-3 bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">Find Out More</Link>
          </div>
        </section>

        {/* More Crawls Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">Keep Exploring</p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">More Crawls</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls.filter((c) => c.live && c.slug !== 'circle-line').slice(0, 2).map((otherCrawl) => (
                <Link key={otherCrawl.id} href={`/${otherCrawl.slug}`} className="block bg-[var(--surface)] p-6 hover:bg-[var(--background)] transition-colors">
                  <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">{otherCrawl.name}</h3>
                  <p className="font-body text-sm text-[var(--muted)] mb-4 line-clamp-2">{otherCrawl.tagline}</p>
                  <div className="flex gap-3">
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--claret)]">{otherCrawl.pubs.length} pubs</span>
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--muted)]">{otherCrawl.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8"><Link href="/" className="btn-ghost">View All Crawls</Link></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

// Jack the Ripper Crawl Page Component
function RipperCrawlPage({ crawl }: { crawl: Crawl }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Jack the Ripper Pub Crawl",
    description: "Follow the trail through the historic pubs of Whitechapel where Victorian London's darkest chapter unfolded.",
    url: "https://londonontap.com/jack-the-ripper",
    touristType: "History enthusiasts, Pub crawl enthusiasts",
    isAccessibleForFree: true,
    publicAccess: true,
    address: { "@type": "PostalAddress", addressLocality: "London", addressRegion: "Whitechapel", addressCountry: "GB" },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteNav />

      <main id="main-content">
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-6 text-xs font-label uppercase tracking-widest">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Crawls
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{crawl.name}</h1>
            <p className="font-display text-xl md:text-2xl italic text-white opacity-90 mb-8 max-w-2xl mx-auto">{crawl.tagline}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{ripperStats.totalPubs} Pubs</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.duration}</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.difficulty}</Chip>
            </div>
          </div>
        </header>

        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">About This Crawl</h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed"><p>{crawl.editorialDescription}</p></div>
            </div>
          </section>
        )}

        {/* The Victims Memorial Section */}
        <section className="py-12 px-6 bg-[#1C1C1C]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#8B1A1A' }}>In Memoriam</p>
              <h2 className="font-display text-2xl font-bold" style={{ color: '#F5F0E6' }}>The Five Canonical Victims</h2>
            </div>
            <div className="grid md:grid-cols-5 gap-4">
              {canonicalVictims.map((victim, i) => (
                <div key={i} className="text-center p-4 border border-[#8B1A1A] rounded-sm">
                  <div className="text-sm font-semibold mb-1" style={{ color: '#D4A853', fontFamily: 'Georgia, serif' }}>{victim.name}</div>
                  <div className="text-xs mb-2" style={{ color: '#F5F0E6' }}>Age {victim.age}</div>
                  <div className="text-xs" style={{ color: '#888' }}>{victim.date}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RipperScrollMap />

        {/* Share & Save Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">Ready to go?</h2>
            <p className="font-body text-[var(--muted)] mb-8">Share this crawl with your mates or save it for later.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(`Check out the Jack the Ripper Pub Crawl! Follow the trail through Whitechapel's darkest history. https://londonontap.com/jack-the-ripper`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share on WhatsApp
              </a>
              <button onClick={() => window.print()} className="btn-ghost inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        {/* Build Your Own CTA */}
        <section className="py-14 px-6 bg-[var(--ink)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Build Your Own Crawl</h2>
            <p className="font-body text-sm text-white/60 mb-6">Got your own route in mind? Design a custom pub crawl with your pubs, your order, your rules.</p>
            <Link href="/build" className="inline-block px-6 py-3 bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">Find Out More</Link>
          </div>
        </section>

        {/* More Crawls Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">Keep Exploring</p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">More Crawls</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls.filter((c) => c.live && c.slug !== 'jack-the-ripper').slice(0, 2).map((otherCrawl) => (
                <Link key={otherCrawl.id} href={`/${otherCrawl.slug}`} className="block bg-[var(--surface)] p-6 hover:bg-[var(--background)] transition-colors">
                  <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">{otherCrawl.name}</h3>
                  <p className="font-body text-sm text-[var(--muted)] mb-4 line-clamp-2">{otherCrawl.tagline}</p>
                  <div className="flex gap-3">
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--claret)]">{otherCrawl.pubs.length} pubs</span>
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--muted)]">{otherCrawl.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8"><Link href="/" className="btn-ghost">View All Crawls</Link></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

// Beatles Crawl Page Component
function BeatlesCrawlPage({ crawl }: { crawl: Crawl }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Beatles Pub Crawl",
    description: "Follow the Fab Four through London's drinking spots — eight pubs tracing the Beatles' London from Belgravia to Chiswick.",
    url: "https://londonontap.com/beatles",
    touristType: "Music enthusiasts, Pub crawl enthusiasts",
    isAccessibleForFree: true,
    publicAccess: true,
    address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteNav />

      <main id="main-content">
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-6 text-xs font-label uppercase tracking-widest">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Crawls
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{crawl.name}</h1>
            <p className="font-display text-xl md:text-2xl italic text-white opacity-90 mb-8 max-w-2xl mx-auto">{crawl.tagline}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{beatlesStats.totalPubs} Pubs</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.duration}</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.difficulty}</Chip>
            </div>
          </div>
        </header>

        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">About This Crawl</h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed"><p>{crawl.editorialDescription}</p></div>
            </div>
          </section>
        )}

        <BeatlesScrollMap />

        {/* Share & Save Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">Ready to go?</h2>
            <p className="font-body text-[var(--muted)] mb-8">Share this crawl with your mates or save it for later.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(`Check out the Beatles Pub Crawl! Follow the Fab Four through London's drinking spots. https://londonontap.com/beatles`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share on WhatsApp
              </a>
              <button onClick={() => window.print()} className="btn-ghost inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        {/* Build Your Own CTA */}
        <section className="py-14 px-6 bg-[var(--ink)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Build Your Own Crawl</h2>
            <p className="font-body text-sm text-white/60 mb-6">Got your own route in mind? Design a custom pub crawl with your pubs, your order, your rules.</p>
            <Link href="/build" className="inline-block px-6 py-3 bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">Find Out More</Link>
          </div>
        </section>

        {/* More Crawls Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">Keep Exploring</p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">More Crawls</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls.filter((c) => c.live && c.slug !== 'beatles').slice(0, 2).map((otherCrawl) => (
                <Link key={otherCrawl.id} href={`/${otherCrawl.slug}`} className="block bg-[var(--surface)] p-6 hover:bg-[var(--background)] transition-colors">
                  <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">{otherCrawl.name}</h3>
                  <p className="font-body text-sm text-[var(--muted)] mb-4 line-clamp-2">{otherCrawl.tagline}</p>
                  <div className="flex gap-3">
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--claret)]">{otherCrawl.pubs.length} pubs</span>
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--muted)]">{otherCrawl.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8"><Link href="/" className="btn-ghost">View All Crawls</Link></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

// South Bank Crawl Page Component
function SouthBankCrawlPage({ crawl }: { crawl: Crawl }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "South Bank Pub Crawl",
    description: "London's greatest riverside pubs, Blackfriars to Wapping. Three miles along the Thames, six pubs, and 500 years of London drinking history.",
    url: "https://londonontap.com/south-bank",
    touristType: "History enthusiasts, Pub crawl enthusiasts",
    isAccessibleForFree: true,
    publicAccess: true,
    address: { "@type": "PostalAddress", addressLocality: "London", addressRegion: "South Bank", addressCountry: "GB" },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteNav />

      <main id="main-content">
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-6 text-xs font-label uppercase tracking-widest">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Crawls
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{crawl.name}</h1>
            <p className="font-display text-xl md:text-2xl italic text-white opacity-90 mb-8 max-w-2xl mx-auto">{crawl.tagline}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{southBankStats.totalPubs} Pubs</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.duration}</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.difficulty}</Chip>
            </div>
          </div>
        </header>

        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">About This Crawl</h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed"><p>{crawl.editorialDescription}</p></div>
            </div>
          </section>
        )}

        <SouthBankScrollMap />

        {/* Share & Save Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">Ready to go?</h2>
            <p className="font-body text-[var(--muted)] mb-8">Share this crawl with your mates or save it for later.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(`Check out the South Bank Pub Crawl! London's greatest riverside pubs, Blackfriars to Wapping. https://londonontap.com/south-bank`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share on WhatsApp
              </a>
              <button onClick={() => window.print()} className="btn-ghost inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        {/* Build Your Own CTA */}
        <section className="py-14 px-6 bg-[var(--ink)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Build Your Own Crawl</h2>
            <p className="font-body text-sm text-white/60 mb-6">Got your own route in mind? Design a custom pub crawl with your pubs, your order, your rules.</p>
            <Link href="/build" className="inline-block px-6 py-3 bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">Find Out More</Link>
          </div>
        </section>

        {/* More Crawls Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">Keep Exploring</p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">More Crawls</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls.filter((c) => c.live && c.slug !== 'south-bank').slice(0, 2).map((otherCrawl) => (
                <Link key={otherCrawl.id} href={`/${otherCrawl.slug}`} className="block bg-[var(--surface)] p-6 hover:bg-[var(--background)] transition-colors">
                  <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">{otherCrawl.name}</h3>
                  <p className="font-body text-sm text-[var(--muted)] mb-4 line-clamp-2">{otherCrawl.tagline}</p>
                  <div className="flex gap-3">
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--claret)]">{otherCrawl.pubs.length} pubs</span>
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--muted)]">{otherCrawl.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8"><Link href="/" className="btn-ghost">View All Crawls</Link></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

// Historic London Crawl Page Component
function HistoricLondonCrawlPage({ crawl }: { crawl: Crawl }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Historic London Pub Crawl",
    description: "Eight of London's most historic pubs, spanning 500 years of drinking history. Fleet Street to Wapping.",
    url: "https://londonontap.com/historic-london",
    touristType: "History enthusiasts, Pub crawl enthusiasts",
    isAccessibleForFree: true,
    publicAccess: true,
    address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteNav />

      <main id="main-content">
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-6 text-xs font-label uppercase tracking-widest">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Crawls
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{crawl.name}</h1>
            <p className="font-display text-xl md:text-2xl italic text-white opacity-90 mb-8 max-w-2xl mx-auto">{crawl.tagline}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{historicLondonStats.totalPubs} Pubs</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.duration}</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.difficulty}</Chip>
            </div>
          </div>
        </header>

        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">About This Crawl</h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed"><p>{crawl.editorialDescription}</p></div>
            </div>
          </section>
        )}

        <HistoricLondonScrollMap />

        {/* Share & Save Section */}
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">Ready to go?</h2>
            <p className="font-body text-[var(--muted)] mb-8">Share this crawl with your mates or save it for later.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(`Check out the Historic London Pub Crawl! Eight of London's most historic pubs, Fleet Street to Wapping. https://londonontap.com/historic-london`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share on WhatsApp
              </a>
              <button onClick={() => window.print()} className="btn-ghost inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        {/* Build Your Own CTA */}
        <section className="py-14 px-6 bg-[var(--ink)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Build Your Own Crawl</h2>
            <p className="font-body text-sm text-white/60 mb-6">Got your own route in mind? Design a custom pub crawl with your pubs, your order, your rules.</p>
            <Link href="/build" className="inline-block px-6 py-3 bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">Find Out More</Link>
          </div>
        </section>

        {/* More Crawls Section */}
        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">Keep Exploring</p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">More Crawls</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls.filter((c) => c.live && c.slug !== 'historic-london').slice(0, 2).map((otherCrawl) => (
                <Link key={otherCrawl.id} href={`/${otherCrawl.slug}`} className="block bg-[var(--surface)] p-6 hover:bg-[var(--background)] transition-colors">
                  <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">{otherCrawl.name}</h3>
                  <p className="font-body text-sm text-[var(--muted)] mb-4 line-clamp-2">{otherCrawl.tagline}</p>
                  <div className="flex gap-3">
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--claret)]">{otherCrawl.pubs.length} pubs</span>
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--muted)]">{otherCrawl.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8"><Link href="/" className="btn-ghost">View All Crawls</Link></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

// Literary London Crawl Page Component
function LiteraryLondonCrawlPage({ crawl }: { crawl: Crawl }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Literary London Pub Crawl",
    description: "Where London's writers drank — Dickens, Orwell, Dylan Thomas, and more. Eight pubs spanning five centuries of literature.",
    url: "https://londonontap.com/literary-london",
    touristType: "Literature enthusiasts, Pub crawl enthusiasts",
    isAccessibleForFree: true,
    publicAccess: true,
    address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteNav />

      <main id="main-content">
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-6 text-xs font-label uppercase tracking-widest">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Crawls
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{crawl.name}</h1>
            <p className="font-display text-xl md:text-2xl italic text-white opacity-90 mb-8 max-w-2xl mx-auto">{crawl.tagline}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{literaryLondonStats.totalPubs} Pubs</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.duration}</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.difficulty}</Chip>
            </div>
          </div>
        </header>

        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">About This Crawl</h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed"><p>{crawl.editorialDescription}</p></div>
            </div>
          </section>
        )}

        <LiteraryLondonScrollMap />

        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">Ready to go?</h2>
            <p className="font-body text-[var(--muted)] mb-8">Share this crawl with your mates or save it for later.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(`Check out the Literary London Pub Crawl! Where Dickens, Orwell and Dylan Thomas drank. https://londonontap.com/literary-london`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share on WhatsApp
              </a>
              <button onClick={() => window.print()} className="btn-ghost inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        <section className="py-14 px-6 bg-[var(--ink)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Build Your Own Crawl</h2>
            <p className="font-body text-sm text-white/60 mb-6">Got your own route in mind? Design a custom pub crawl with your pubs, your order, your rules.</p>
            <Link href="/build" className="inline-block px-6 py-3 bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">Find Out More</Link>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">Keep Exploring</p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">More Crawls</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls.filter((c) => c.live && c.slug !== 'literary-london').slice(0, 2).map((otherCrawl) => (
                <Link key={otherCrawl.id} href={`/${otherCrawl.slug}`} className="block bg-[var(--surface)] p-6 hover:bg-[var(--background)] transition-colors">
                  <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">{otherCrawl.name}</h3>
                  <p className="font-body text-sm text-[var(--muted)] mb-4 line-clamp-2">{otherCrawl.tagline}</p>
                  <div className="flex gap-3">
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--claret)]">{otherCrawl.pubs.length} pubs</span>
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--muted)]">{otherCrawl.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8"><Link href="/" className="btn-ghost">View All Crawls</Link></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

// Bermondsey Beer Mile Page Component
function BermondseyBeerMilePage({ crawl }: { crawl: Crawl }) {
  const schemaData = {
    "@context": "https://schema.org", "@type": "TouristAttraction",
    name: "Bermondsey Beer Mile", description: "South London's legendary brewery trail — eight of the best taprooms, arch by arch.",
    url: "https://londonontap.com/bermondsey-beer-mile", touristType: "Craft beer enthusiasts",
    isAccessibleForFree: true, publicAccess: true,
    address: { "@type": "PostalAddress", addressLocality: "London", addressRegion: "Bermondsey", addressCountry: "GB" },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteNav />
      <main id="main-content">
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-6 text-xs font-label uppercase tracking-widest">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Crawls
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{crawl.name}</h1>
            <p className="font-display text-xl md:text-2xl italic text-white opacity-90 mb-8 max-w-2xl mx-auto">{crawl.tagline}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{bermondseyStats.totalPubs} Stops</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.duration}</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.difficulty}</Chip>
            </div>
          </div>
        </header>

        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">About This Crawl</h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed"><p>{crawl.editorialDescription}</p></div>
            </div>
          </section>
        )}

        {/* Freshness caveat */}
        <section className="px-6 pb-12">
          <div className="max-w-[800px] mx-auto">
            <div className="p-5 bg-[var(--surface)] border-l-4 border-[var(--gold)]">
              <div className="font-label text-xs uppercase tracking-[0.1em] text-[var(--gold)] mb-2">A living crawl</div>
              <p className="font-body text-sm text-[var(--ink)] leading-relaxed">
                The Beer Mile is an informal collection of independent taprooms — they open, close, move, and change hours constantly. We&apos;ve verified every stop on this list, but we&apos;d be lying if we said it won&apos;t change. If you find a closed door, there&apos;ll be another arch pouring something excellent ten metres down the road. Check individual taproom websites before you go, especially on weekdays. Saturday is the only day everything is reliably open.
              </p>
            </div>
          </div>
        </section>

        <BermondseyScrollMap />

        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">Ready to go?</h2>
            <p className="font-body text-[var(--muted)] mb-8">Share this crawl with your mates or save it for later.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(`Check out the Bermondsey Beer Mile! Eight of the best taprooms, arch by arch. https://londonontap.com/bermondsey-beer-mile`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share on WhatsApp
              </a>
              <button onClick={() => window.print()} className="btn-ghost inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        <section className="py-14 px-6 bg-[var(--ink)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Build Your Own Crawl</h2>
            <p className="font-body text-sm text-white/60 mb-6">Got your own route in mind? Design a custom pub crawl with your pubs, your order, your rules.</p>
            <Link href="/build" className="inline-block px-6 py-3 bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">Find Out More</Link>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">Keep Exploring</p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">More Crawls</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls.filter((c) => c.live && c.slug !== 'bermondsey-beer-mile').slice(0, 2).map((otherCrawl) => (
                <Link key={otherCrawl.id} href={`/${otherCrawl.slug}`} className="block bg-[var(--surface)] p-6 hover:bg-[var(--background)] transition-colors">
                  <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">{otherCrawl.name}</h3>
                  <p className="font-body text-sm text-[var(--muted)] mb-4 line-clamp-2">{otherCrawl.tagline}</p>
                  <div className="flex gap-3">
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--claret)]">{otherCrawl.pubs.length} pubs</span>
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--muted)]">{otherCrawl.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8"><Link href="/" className="btn-ghost">View All Crawls</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

// Haunted London Crawl Page Component
function HauntedLondonCrawlPage({ crawl }: { crawl: Crawl }) {
  const schemaData = {
    "@context": "https://schema.org", "@type": "TouristAttraction",
    name: "Haunted London Pub Crawl", description: "London's most haunted pubs and the ghosts that haunt them.",
    url: "https://londonontap.com/haunted-london", touristType: "Ghost enthusiasts, Pub crawl enthusiasts",
    isAccessibleForFree: true, publicAccess: true,
    address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteNav />
      <main id="main-content">
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-6 text-xs font-label uppercase tracking-widest">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Crawls
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{crawl.name}</h1>
            <p className="font-display text-xl md:text-2xl italic text-white opacity-90 mb-8 max-w-2xl mx-auto">{crawl.tagline}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{hauntedLondonStats.totalPubs} Pubs</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.duration}</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.difficulty}</Chip>
            </div>
          </div>
        </header>

        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">About This Crawl</h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed"><p>{crawl.editorialDescription}</p></div>
            </div>
          </section>
        )}

        <HauntedLondonScrollMap />

        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">Ready to go?</h2>
            <p className="font-body text-[var(--muted)] mb-8">Share this crawl with your mates or save it for later.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(`Check out the Haunted London Pub Crawl! London's most haunted pubs. https://londonontap.com/haunted-london`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share on WhatsApp
              </a>
              <button onClick={() => window.print()} className="btn-ghost inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Route
              </button>
            </div>
          </div>
        </section>

        <section className="py-14 px-6 bg-[var(--ink)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Build Your Own Crawl</h2>
            <p className="font-body text-sm text-white/60 mb-6">Got your own route in mind? Design a custom pub crawl with your pubs, your order, your rules.</p>
            <Link href="/build" className="inline-block px-6 py-3 bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">Find Out More</Link>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">Keep Exploring</p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">More Crawls</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls.filter((c) => c.live && c.slug !== 'haunted-london').slice(0, 2).map((otherCrawl) => (
                <Link key={otherCrawl.id} href={`/${otherCrawl.slug}`} className="block bg-[var(--surface)] p-6 hover:bg-[var(--background)] transition-colors">
                  <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">{otherCrawl.name}</h3>
                  <p className="font-body text-sm text-[var(--muted)] mb-4 line-clamp-2">{otherCrawl.tagline}</p>
                  <div className="flex gap-3">
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--claret)]">{otherCrawl.pubs.length} pubs</span>
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--muted)]">{otherCrawl.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8"><Link href="/" className="btn-ghost">View All Crawls</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

// Criminal London Crawl Page Component
function CriminalLondonCrawlPage({ crawl }: { crawl: Crawl }) {
  const schemaData = {
    "@context": "https://schema.org", "@type": "TouristAttraction",
    name: "Criminal London Pub Crawl", description: "Gangsters, smugglers, and the pubs where it all went down.",
    url: "https://londonontap.com/criminal-london", touristType: "History enthusiasts, Pub crawl enthusiasts",
    isAccessibleForFree: true, publicAccess: true,
    address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteNav />
      <main id="main-content">
        <header className="pt-24 pb-16 px-6 bg-[var(--claret)]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-6 text-xs font-label uppercase tracking-widest">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Crawls
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{crawl.name}</h1>
            <p className="font-display text-xl md:text-2xl italic text-white opacity-90 mb-8 max-w-2xl mx-auto">{crawl.tagline}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{criminalLondonStats.totalPubs} Pubs</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.duration}</Chip>
              <Chip size="lg" className="bg-[var(--surface)] text-[var(--ink)] font-label text-sm uppercase tracking-wider px-4">{crawl.difficulty}</Chip>
            </div>
          </div>
        </header>
        {crawl.editorialDescription && (
          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-6">About This Crawl</h2>
              <div className="font-body text-lg text-[var(--muted)] leading-relaxed"><p>{crawl.editorialDescription}</p></div>
            </div>
          </section>
        )}
        <CriminalLondonScrollMap />
        <section className="py-16 px-6 bg-[var(--surface)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">Ready to go?</h2>
            <p className="font-body text-[var(--muted)] mb-8">Share this crawl with your mates or save it for later.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(`Check out the Criminal London Pub Crawl! Gangsters, smugglers, and the pubs where it all went down. https://londonontap.com/criminal-london`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share on WhatsApp
              </a>
              <button onClick={() => window.print()} className="btn-ghost inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Route
              </button>
            </div>
          </div>
        </section>
        <section className="py-14 px-6 bg-[var(--ink)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Build Your Own Crawl</h2>
            <p className="font-body text-sm text-white/60 mb-6">Got your own route in mind? Design a custom pub crawl with your pubs, your order, your rules.</p>
            <Link href="/build" className="inline-block px-6 py-3 bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">Find Out More</Link>
          </div>
        </section>
        <section className="py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">Keep Exploring</p>
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">More Crawls</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-[2px] bg-[var(--ink)]">
              {crawls.filter((c) => c.live && c.slug !== 'criminal-london').slice(0, 2).map((otherCrawl) => (
                <Link key={otherCrawl.id} href={`/${otherCrawl.slug}`} className="block bg-[var(--surface)] p-6 hover:bg-[var(--background)] transition-colors">
                  <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">{otherCrawl.name}</h3>
                  <p className="font-body text-sm text-[var(--muted)] mb-4 line-clamp-2">{otherCrawl.tagline}</p>
                  <div className="flex gap-3">
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--claret)]">{otherCrawl.pubs.length} pubs</span>
                    <span className="font-label text-xs uppercase tracking-wider text-[var(--muted)]">{otherCrawl.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8"><Link href="/" className="btn-ghost">View All Crawls</Link></div>
          </div>
        </section>
      </main>
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
    url: `https://londonontap.com/${crawl.slug}`,
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
              className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-6 text-xs font-label uppercase tracking-widest"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Build Your Own CTA */}
        <section className="py-14 px-6 bg-[var(--ink)]">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Build Your Own Crawl
            </h2>
            <p className="font-body text-sm text-white/60 mb-6">
              Got your own route in mind? Design a custom pub crawl with your pubs, your order, your rules.
            </p>
            <Link href="/build" className="inline-block px-6 py-3 bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">
              Find Out More
            </Link>
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

  // Use specialized Beatles page for beatles crawl
  if (slug === 'beatles') {
    return <BeatlesCrawlPage crawl={crawl} />;
  }

  // Use specialized South Bank page for south-bank crawl
  if (slug === 'south-bank') {
    return <SouthBankCrawlPage crawl={crawl} />;
  }

  // Use specialized Historic London page for historic-london crawl
  if (slug === 'historic-london') {
    return <HistoricLondonCrawlPage crawl={crawl} />;
  }

  if (slug === 'literary-london') {
    return <LiteraryLondonCrawlPage crawl={crawl} />;
  }

  if (slug === 'bermondsey-beer-mile') {
    return <BermondseyBeerMilePage crawl={crawl} />;
  }

  if (slug === 'haunted-london') {
    return <HauntedLondonCrawlPage crawl={crawl} />;
  }

  if (slug === 'criminal-london') {
    return <CriminalLondonCrawlPage crawl={crawl} />;
  }

  // Use generic page for other crawls
  return <GenericCrawlPage crawl={crawl} />;
}
