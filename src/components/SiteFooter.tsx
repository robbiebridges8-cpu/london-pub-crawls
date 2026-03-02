'use client';

import Link from 'next/link';
import { crawls } from '@/content/crawls';

export default function SiteFooter() {
  const liveCrawls = crawls.filter((c) => c.live);
  const comingSoonCrawls = crawls.filter((c) => !c.live);

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--midnight)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Column 1: Wordmark */}
          <div>
            <Link href="/" className="font-display text-xl font-semibold inline-block mb-4">
              <span className="text-[var(--cream)]">LONDON</span>{' '}
              <span className="text-[var(--amber)]">PUB CRAWLS</span>
            </Link>
            <p className="text-sm text-[var(--zinc-400)]">
              Free pub crawls across London.
            </p>
          </div>

          {/* Column 2: Crawls */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--zinc-600)] mb-4">
              Crawls
            </h4>
            <ul className="space-y-2">
              {liveCrawls.map((crawl) => (
                <li key={crawl.id}>
                  <Link
                    href={`/crawls/${crawl.slug}`}
                    className="text-sm text-[var(--zinc-400)] hover:text-[var(--white)] transition-colors"
                  >
                    {crawl.name}
                  </Link>
                </li>
              ))}
              {comingSoonCrawls.slice(0, 4).map((crawl) => (
                <li key={crawl.id}>
                  <span className="text-sm text-[var(--zinc-600)]">
                    {crawl.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--zinc-600)] mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/londonpubcrawls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--zinc-400)] hover:text-[var(--white)] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@londonpubcrawls.com"
                  className="text-sm text-[var(--zinc-400)] hover:text-[var(--white)] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
          <p className="text-xs text-[var(--zinc-600)]">
            &copy; {new Date().getFullYear()} London Pub Crawls
          </p>
        </div>
      </div>
    </footer>
  );
}
