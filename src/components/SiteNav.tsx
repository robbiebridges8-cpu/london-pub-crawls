'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SiteNav({ hideUntilScroll = false }: { hideUntilScroll?: boolean }) {
  const [visible, setVisible] = useState(!hideUntilScroll);

  useEffect(() => {
    if (!hideUntilScroll) return;

    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [hideUntilScroll]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(255, 241, 229, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between" style={{ height: '4.5rem' }}>
        <Link href="/" className="flex items-center">
          <span className="font-display text-xl font-bold tracking-tight text-[var(--ink)]">
            London on Tap
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/crawls" className="font-label text-xs uppercase tracking-[0.15em] text-[var(--ink)] hover:text-[var(--claret)] transition-colors">
            Crawls
          </Link>
          <Link href="/pubs" className="font-label text-xs uppercase tracking-[0.15em] text-[var(--ink)] hover:text-[var(--claret)] transition-colors">
            Pubs
          </Link>
        </div>
      </div>
    </nav>
  );
}
