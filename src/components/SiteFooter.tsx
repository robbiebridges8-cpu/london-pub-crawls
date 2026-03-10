'use client';

import Link from 'next/link';
import { crawls } from '@/content/crawls';

export default function SiteFooter() {
  const liveCrawls = crawls.filter((c) => c.live);
  const comingSoonCrawls = crawls.filter((c) => !c.live);

  return (
    <footer className="bg-[var(--surface)] border-t-2 border-[var(--ink)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Column 1: Wordmark & Description */}
          <div>
            <Link href="/" className="font-label text-xl tracking-[0.03em] inline-block mb-4">
              <span className="text-[var(--claret)]">LONDON PUB CRAWLS</span>
            </Link>
            <p className="font-body text-sm text-[var(--muted)]">
              Free, self-guided pub crawls across London. Curated by locals.
            </p>
          </div>

          {/* Column 2: Crawls */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
              Crawls
            </h4>
            <ul className="space-y-2">
              {liveCrawls.map((crawl) => (
                <li key={crawl.id}>
                  <Link
                    href={`/crawls/${crawl.slug}`}
                    className="font-body text-sm text-[var(--ink)] hover:text-[var(--claret)] transition-colors"
                  >
                    {crawl.name}
                  </Link>
                </li>
              ))}
              {comingSoonCrawls.slice(0, 4).map((crawl) => (
                <li key={crawl.id}>
                  <span className="font-body text-sm text-[var(--muted)]">
                    {crawl.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/londonpubcrawls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-[var(--ink)] hover:text-[var(--claret)] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@londonpubcrawls.com"
                  className="font-body text-sm text-[var(--ink)] hover:text-[var(--claret)] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-[var(--muted)] text-center">
          <p className="font-body text-xs text-[var(--muted)]">
            &copy; {new Date().getFullYear()} London Pub Crawls
          </p>
        </div>
      </div>
    </footer>
  );
}
