'use client';

import Link from 'next/link';
import { Crawl } from '@/content/crawls';

// Crawl accent colours
const crawlAccentColors: Record<string, string> = {
  'monopoly': '#D4001A',
  'circle-line': '#FFD300',
  'jack-the-ripper': '#6B0F1A',
  'beatles': '#003087',
  'south-bank': '#0098D4',
  'criminal-london': '#1A1A2E',
  'bermondsey-beer-mile': '#E87121',
  'historic-london': '#8B4513',
  'literary-london': '#2E4057',
};

// Difficulty badge colours
const difficultyStyles: Record<string, { bg: string; text: string }> = {
  'Easy': { bg: '#E8F5E9', text: '#2E7D32' },
  'Medium': { bg: '#FFF3E0', text: '#E65100' },
  'Hard': { bg: '#FFEBEE', text: '#C62828' },
  'Legendary': { bg: '#F3E5F5', text: '#6A1B9A' },
};

interface CrawlCardProps {
  crawl: Crawl;
}

export default function CrawlCard({ crawl }: CrawlCardProps) {
  const accentColor = crawlAccentColors[crawl.slug] || crawl.accentColor;
  const pubCount = crawl.pubCount ?? crawl.pubs.length;
  const diffStyle = difficultyStyles[crawl.difficulty] || difficultyStyles['Easy'];

  return (
    <Link
      href={`/${crawl.slug}`}
      className="group block transition-all duration-200 hover:shadow-lg"
    >
      <div
        className="bg-[var(--surface)] h-full flex flex-col"
        style={{ borderTop: `4px solid ${accentColor}` }}
      >
        <div className="p-6 flex flex-col flex-grow">
          {/* Crawl name */}
          <h3 className="font-card text-lg font-bold text-[var(--ink)] mb-2 group-hover:text-[var(--claret)] transition-colors">
            {crawl.name}
          </h3>

          {/* Tagline */}
          <p className="font-body text-sm text-[var(--muted)] mb-5 line-clamp-2 flex-grow">
            {crawl.tagline}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-label text-xs uppercase tracking-wider text-[var(--ink)] font-semibold">
              {pubCount} pubs
            </span>
            <span className="text-[var(--muted)]/40">·</span>
            <span className="font-label text-xs uppercase tracking-wider text-[var(--muted)]">
              {crawl.duration}
            </span>
            <span className="text-[var(--muted)]/40">·</span>
            <span
              className="font-label text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm"
              style={{ background: diffStyle.bg, color: diffStyle.text }}
            >
              {crawl.difficulty}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
