'use client';

import Link from 'next/link';

export default function SiteNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255, 241, 229, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center" style={{ height: '4.5rem' }}>
        <Link href="/" className="flex items-center">
          <span className="font-display text-xl font-bold tracking-tight text-[var(--ink)]">
            London on Tap
          </span>
        </Link>
      </div>
    </nav>
  );
}
