'use client';

import Link from 'next/link';
import { crawls } from '@/content/crawls';

export default function SiteFooter() {
  const liveCrawls = crawls.filter((c) => c.live);
  const comingSoonCrawls = crawls.filter((c) => !c.live);

  return (
    <footer className="py-16 px-6 border-t border-[#30363D] bg-[#0D1117]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#D4A853] flex items-center justify-center">
                <span className="text-[#D4A853] text-sm font-bold">🍺</span>
              </div>
              <span className="font-serif text-xl font-bold text-[#F5F0E8]">
                London Pub Crawls
              </span>
            </div>
            <p className="text-sm text-[#8B9AAD] leading-relaxed">
              Made in London. Researched on foot. Written with a pint in hand.
            </p>
          </div>

          {/* Live Crawls column */}
          <div>
            <h4 className="font-semibold text-[#D4A853] mb-4 text-sm uppercase tracking-wider">
              Live Crawls
            </h4>
            <ul className="space-y-2">
              {liveCrawls.map((crawl) => (
                <li key={crawl.id}>
                  <Link
                    href={`/crawl/${crawl.slug}`}
                    className="text-sm text-[#8B9AAD] hover:text-[#D4A853] transition-colors"
                  >
                    {crawl.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coming Soon */}
          <div>
            <h4 className="font-semibold text-[#F5F0E8] mb-4 text-sm uppercase tracking-wider">
              Coming Soon
            </h4>
            <ul className="space-y-2">
              {comingSoonCrawls.slice(0, 5).map((crawl) => (
                <li key={crawl.id}>
                  <span className="text-sm text-[#8B9AAD]/60">{crawl.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[#F5F0E8] mb-4 text-sm uppercase tracking-wider">
              Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-[#8B9AAD] hover:text-[#D4A853] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@londonpubcrawls.com"
                  className="text-sm text-[#8B9AAD] hover:text-[#D4A853] transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  href="/#crawls"
                  className="text-sm text-[#8B9AAD] hover:text-[#D4A853] transition-colors"
                >
                  All Crawls
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#30363D] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8B9AAD]">
            &copy; {new Date().getFullYear()} London Pub Crawls. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              className="text-[#8B9AAD] hover:text-[#D4A853] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="text-[#8B9AAD] hover:text-[#D4A853] transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
