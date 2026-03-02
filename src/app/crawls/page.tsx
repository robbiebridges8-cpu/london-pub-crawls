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

export default function CrawlsPage() {
  return (
    <>
      <SiteNav />

      <main id="main-content" className="pt-32 pb-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Page title */}
          <h1 className="font-display text-5xl font-semibold text-[var(--cream)] text-center mb-12">
            All Crawls
          </h1>

          {/* Crawl card grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {crawls.map((crawl) => (
              <CrawlCard key={crawl.id} crawl={crawl} />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
