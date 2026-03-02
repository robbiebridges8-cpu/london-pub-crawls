'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/crawls', label: 'CRAWLS' },
  { href: '/map', label: 'MAP' },
  { href: '/about', label: 'ABOUT' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[rgba(8,8,13,0.85)] backdrop-blur-[12px] border-b border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="font-display text-xl font-semibold">
            <span className="text-[var(--cream)]">LONDON</span>{' '}
            <span className="text-[var(--amber)]">PUB CRAWLS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium uppercase tracking-[0.03em] transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--white)] border-b-2 border-[var(--amber)] pb-1'
                      : 'text-[var(--zinc-400)] hover:text-[var(--white)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-5 h-0.5 bg-[var(--white)]" />
            <span className="w-5 h-0.5 bg-[var(--white)]" />
            <span className="w-5 h-0.5 bg-[var(--white)]" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[var(--midnight)] flex flex-col items-center justify-center animate-[clipDown_400ms_cubic-bezier(0.16,1,0.3,1)]"
          style={{
            animation: 'clipDown 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-6 p-2 text-[var(--white)]"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-[32px] font-semibold text-[var(--cream)] hover:text-[var(--amber)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <style jsx>{`
        @keyframes clipDown {
          from {
            clip-path: inset(0 0 100% 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </>
  );
}
