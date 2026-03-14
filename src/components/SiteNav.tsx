'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SiteNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: visible ? 'auto' : 'none',
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
