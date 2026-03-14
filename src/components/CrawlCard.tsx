'use client';

import Link from 'next/link';
import { Chip } from '@heroui/react';
import { Crawl } from '@/content/crawls';

// Crawl border colours per spec
const crawlBorderColors: Record<string, string> = {
  'monopoly': '#000000',
  'circle-line': '#FFD300',
  'jack-the-ripper': '#6B0F1A',
  'beatles': '#003087',
  'south-bank': '#0098D4',
  'criminal-london': '#1A1A2E',
};

interface CrawlCardProps {
  crawl: Crawl;
}

export default function CrawlCard({ crawl }: CrawlCardProps) {
  const isLive = crawl.live;
  const borderColor = crawlBorderColors[crawl.slug] || '#8A7060';

  const CardContent = (
    <div
      className="bg-[var(--surface)] h-full flex flex-col"
      style={{ borderTop: `4px solid ${borderColor}` }}
    >
      <div className="p-6 flex flex-col flex-grow">
        {/* Area label */}
        <span className="font-label text-xs uppercase tracking-[0.1em] text-[var(--muted)] mb-2">
          {crawl.area}
        </span>

        {/* Status badge */}
        <div className="mb-3">
          {isLive ? (
            <Chip
              size="sm"
              className="bg-[var(--claret)] text-white font-label text-[10px] uppercase tracking-wider"
            >
              Live
            </Chip>
          ) : (
            <Chip
              size="sm"
              variant="bordered"
              className="border-[var(--muted)] text-[var(--muted)] font-label text-[10px] uppercase tracking-wider"
            >
              Coming Soon
            </Chip>
          )}
        </div>

        {/* Crawl name */}
        <h3 className="font-card text-xl font-semibold text-[var(--ink)] mb-2">
          {crawl.name}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-[var(--muted)] mb-4 line-clamp-2 flex-grow">
          {crawl.tagline}
        </p>

        {/* Meta row */}
        <div className="flex gap-4 items-center text-xs font-label uppercase tracking-wider text-[var(--muted)]">
          <span>{crawl.pubs.length} pubs</span>
          <span>{crawl.duration}</span>
          <span>{crawl.difficulty}</span>
        </div>
      </div>
    </div>
  );

  if (isLive) {
    return (
      <Link
        href={`/${crawl.slug}`}
        className="block transition-all duration-200 hover:shadow-lg"
      >
        {CardContent}
      </Link>
    );
  }

  return (
    <div className="opacity-50 pointer-events-none">
      {CardContent}
    </div>
  );
}
