'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import { crawls, getCrawlBySlug, getPubCount } from '@/content/crawls';
import { getPubById } from '@/content/pubs';
import { Overview } from '@/components/Overview';

interface CrawlPageProps {
  params: Promise<{ slug: string }>;
}

export default function CrawlPage({ params }: CrawlPageProps) {
  const { slug } = use(params);
  const crawl = getCrawlBySlug(slug);

  if (!crawl) {
    notFound();
  }

  const pubCount = getPubCount(crawl);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, ${crawl.accentColor}15 0%, #0f0f0f 100%)`,
        }}
      >
        {/* Atmospheric glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 blur-[100px]"
          style={{ backgroundColor: crawl.accentColor }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
          {/* Back link */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#F5F0E8]/60 hover:text-[#F5F0E8] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Crawls
          </a>

          {/* Badge */}
          <div
            className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full mb-6"
            style={{
              backgroundColor: `${crawl.accentColor}20`,
              color: crawl.accentColor,
              border: `1px solid ${crawl.accentColor}40`,
            }}
          >
            {crawl.live ? crawl.area : 'Coming Soon'}
          </div>

          {/* Title */}
          <h1 className="font-serif text-5xl md:text-7xl mb-4" style={{ color: crawl.accentColor }}>
            {crawl.name}
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-[#F5F0E8]/80 mb-8 max-w-2xl mx-auto">
            {crawl.tagline}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: crawl.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[#F5F0E8]/60">{pubCount} Pubs</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: crawl.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#F5F0E8]/60">{crawl.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: crawl.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-[#F5F0E8]/60">{crawl.difficulty}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section with Gallery */}
      <Overview
        title="About This Crawl"
        description={crawl.editorialDescription || crawl.description}
        accentColor={crawl.accentColor}
      />

      {/* Route Map Placeholder */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ color: crawl.accentColor }}>
            The Route
          </h2>
          <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#252525] flex items-center justify-center">
            <div className="text-center text-[#F5F0E8]/40">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-lg">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pubs List */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-12" style={{ color: crawl.accentColor }}>
            The Pubs
          </h2>

          <div className="space-y-8">
            {crawl.pubs.map((crawlPub, index) => {
              const pub = getPubById(crawlPub.pubId);
              if (!pub) return null;

              return (
                <article
                  key={crawlPub.pubId}
                  className="group relative bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-white/5 hover:border-white/10 transition-colors"
                >
                  {/* Index number */}
                  <div
                    className="absolute -left-4 md:-left-6 top-6 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-serif text-lg md:text-xl"
                    style={{
                      backgroundColor: crawl.accentColor,
                      color: '#0f0f0f',
                    }}
                  >
                    {index + 1}
                  </div>

                  <div className="ml-6 md:ml-8">
                    <h3 className="font-serif text-2xl md:text-3xl text-[#F5F0E8] mb-2">
                      {pub.name}
                    </h3>

                    <p className="text-[#F5F0E8]/50 text-sm mb-4">
                      {pub.address} • {pub.neighbourhood}
                    </p>

                    <p className="text-[#F5F0E8]/80 text-lg leading-relaxed mb-4">
                      {crawlPub.description}
                    </p>

                    {crawlPub.historicNotes && (
                      <p className="text-sm italic" style={{ color: `${crawl.accentColor}cc` }}>
                        {crawlPub.historicNotes}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {crawl.url && (
        <section className="py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: crawl.accentColor }}>
              Ready to Begin?
            </h2>
            <p className="text-[#F5F0E8]/60 mb-8 max-w-xl mx-auto">
              Get the full route, directions, and pub details on the dedicated crawl website.
            </p>
            <a
              href={crawl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 glow-amber"
              style={{
                backgroundColor: crawl.accentColor,
                color: '#0f0f0f',
              }}
            >
              Start the {crawl.name}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <a href="/" className="text-[#D4A853] hover:text-[#D4A853]/80 transition-colors">
            ← Back to All Crawls
          </a>
        </div>
      </footer>
    </main>
  );
}
