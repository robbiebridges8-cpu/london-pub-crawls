'use client';

import Link from 'next/link';
import { crawls } from '@/content/crawls';

export default function SiteFooter() {
  const liveCrawls = crawls.filter((c) => c.live);
  const comingSoonCrawls = crawls.filter((c) => !c.live);

  return (
    <footer className="bg-[var(--ink)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Column 1: Logo & Tagline */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="font-display text-xl font-bold tracking-tight text-white">
                London on Tap
              </span>
            </Link>
            <p className="font-body text-sm text-white/60">
              Free, self-guided pub crawls through London&apos;s best drinking spots.
            </p>
          </div>

          {/* Column 2: Crawls */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-4">
              Crawls
            </h4>
            <ul className="space-y-2">
              {liveCrawls.map((crawl) => (
                <li key={crawl.id}>
                  <Link
                    href={`/${crawl.slug}`}
                    className="font-body text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {crawl.name}
                  </Link>
                </li>
              ))}
              {comingSoonCrawls.slice(0, 3).map((crawl) => (
                <li key={crawl.id}>
                  <span className="font-body text-sm text-white/40">
                    {crawl.name} <span className="text-xs">(soon)</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/build"
                  className="font-body text-sm text-[var(--gold)] hover:text-white transition-colors font-semibold"
                >
                  Build Your Own Crawl
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com/londonontap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/80 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@londonontap.com"
                  className="font-body text-sm text-white/80 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-white/40">
            &copy; {new Date().getFullYear()} London on Tap. Made with love in London.
          </p>
          <p className="font-body text-xs text-white/40">
            Drink responsibly. Know your limits.
          </p>
        </div>
      </div>
    </footer>
  );
}
