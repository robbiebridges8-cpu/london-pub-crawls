'use client';

import Link from 'next/link';

export default function SiteNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1117]/95 backdrop-blur-md border-b border-[#30363D]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4A853] flex items-center justify-center">
            <span className="text-[#D4A853] text-sm font-bold">🍺</span>
          </div>
          <span className="font-serif text-xl font-bold text-[#F5F0E8] group-hover:text-[#D4A853] transition-colors">
            London Pub Crawls
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#crawls"
            className="text-sm text-[#8B9AAD] hover:text-[#D4A853] transition-colors"
          >
            Crawls
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm text-[#8B9AAD] hover:text-[#D4A853] transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#about"
            className="text-sm text-[#8B9AAD] hover:text-[#D4A853] transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
