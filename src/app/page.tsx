'use client';

import Link from 'next/link';
import { crawls, Crawl } from '@/content/crawls';
import { SiteNav, SiteFooter } from '@/components';

// Accent colors for crawl themes
const crawlAccents: Record<string, string> = {
  monopoly: '#1FB25A',
  'circle-line': '#FFD300',
};

function CrawlCard({ crawl }: { crawl: Crawl }) {
  const isLive = crawl.live;
  const accentColor = crawlAccents[crawl.slug] || 'var(--border)';

  const CardContent = (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden h-full flex flex-col">
      {/* Placeholder image area */}
      <div
        className="h-[200px] flex items-center justify-center relative"
        style={{ borderBottom: `2px solid ${accentColor}` }}
      >
        <span
          className="font-display text-2xl font-semibold"
          style={{ color: accentColor, opacity: 0.3 }}
        >
          {crawl.name}
        </span>
      </div>

      {/* Card content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Crawl name */}
        <h3 className="font-display text-[28px] font-semibold text-[var(--cream)] mb-2">
          {crawl.name}
        </h3>

        {/* Tagline */}
        <p className="text-base text-[var(--zinc-400)] mb-4 line-clamp-2 flex-grow">
          {crawl.tagline}
        </p>

        {/* Metadata badges */}
        <div className="flex gap-4 items-center mb-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[rgba(229,162,16,0.15)] text-[var(--amber)]">
            {crawl.pubs.length} pubs
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[rgba(229,162,16,0.15)] text-[var(--amber)]">
            {crawl.duration}
          </span>
        </div>

        {/* CTA */}
        {isLive ? (
          <span className="btn-primary text-center inline-block">
            Start This Crawl &rarr;
          </span>
        ) : (
          <span className="text-sm font-medium text-[var(--zinc-600)]">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );

  if (isLive) {
    return (
      <Link
        href={`/crawls/${crawl.slug}`}
        className="block transition-all duration-300 hover:-translate-y-0.5 hover:[&>div]:border-[var(--border-bright)] hover:[&>div]:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        {CardContent}
      </Link>
    );
  }

  return (
    <div className="opacity-70 cursor-default">
      {CardContent}
    </div>
  );
}

export default function Home() {
  // Show 6 crawls: 2 live + 4 coming soon
  const displayCrawls = [
    ...crawls.filter((c) => c.live),
    ...crawls.filter((c) => !c.live).slice(0, 4),
  ];

  return (
    <>
      <SiteNav />

      <main id="main-content">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-6 py-24">
          {/* Kicker */}
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-[var(--zinc-400)] mb-6 animate-fade-in-up">
            Free self-guided pub crawls across London
          </p>

          {/* Headline */}
          <h1 className="font-display text-[40px] md:text-[72px] font-semibold leading-none tracking-tight mb-6 animate-fade-in-up animation-delay-100">
            <span className="text-[var(--cream)]">The best pub crawls in London.</span>
            <br />
            <span className="text-[var(--amber)]">Curated by locals.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-[var(--zinc-400)] max-w-[540px] leading-relaxed mb-10 animate-fade-in-up animation-delay-200">
            Meticulously researched routes through London&apos;s best pubs. No apps to download.
            No tickets to buy. Just a route, a map, and good company.
          </p>

          {/* CTA */}
          <Link
            href="/crawls"
            className="btn-primary animate-fade-in-up animation-delay-300"
          >
            Explore Crawls
          </Link>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <svg
              className="w-5 h-5 text-[var(--zinc-600)] animate-bounce-slow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </section>

        {/* Featured Crawls Section */}
        <section className="py-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            {/* Section heading */}
            <h2 className="font-display text-[32px] font-medium text-[var(--cream)] text-center mb-12">
              Our Crawls
            </h2>

            {/* Crawl card grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {displayCrawls.map((crawl) => (
                <CrawlCard key={crawl.id} crawl={crawl} />
              ))}
            </div>
          </div>
        </section>

        {/* About Teaser Section */}
        <section className="py-24 px-6">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="font-display text-[32px] font-medium text-[var(--cream)] mb-8">
              Made by Londoners, for everyone.
            </h2>

            <div className="space-y-6 text-lg text-[var(--zinc-400)] leading-relaxed mb-8">
              <p>
                These aren&apos;t tourist traps or corporate bar crawls. Every route has been
                walked, researched, and refined by people who actually love London pubs.
              </p>
              <p>
                We believe the best way to know a city is through its pubs — the history on the walls,
                the stories at the bar, the neighbourhoods between stops. Our crawls are free,
                self-guided, and designed for groups of friends, tourists, or anyone who wants to explore.
              </p>
            </div>

            <Link href="/about" className="btn-secondary inline-block">
              Learn More About Us &rarr;
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
