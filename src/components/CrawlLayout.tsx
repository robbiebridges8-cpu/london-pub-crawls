'use client';

import { ReactNode } from 'react';

// London skyline SVG silhouette
function LondonSkyline() {
  return (
    <svg
      viewBox="0 0 1200 120"
      className="w-full h-auto text-[#1C2632]/10"
      preserveAspectRatio="xMidYMax slice"
      fill="currentColor"
    >
      {/* Big Ben / Elizabeth Tower */}
      <rect x="100" y="40" width="20" height="80" />
      <rect x="95" y="35" width="30" height="10" />
      <polygon points="110,35 95,35 110,15 125,35" />
      <rect x="107" y="10" width="6" height="8" />

      {/* Parliament buildings */}
      <rect x="125" y="60" width="60" height="60" />
      <rect x="130" y="50" width="10" height="15" />
      <rect x="150" y="45" width="15" height="20" />
      <rect x="170" y="50" width="10" height="15" />

      {/* Westminster Bridge hint */}
      <rect x="190" y="100" width="80" height="20" />

      {/* London Eye */}
      <circle cx="320" cy="70" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="318" y="115" width="4" height="5" />
      <rect x="310" y="115" width="20" height="5" />

      {/* South Bank buildings */}
      <rect x="380" y="70" width="30" height="50" />
      <rect x="420" y="50" width="25" height="70" />
      <rect x="455" y="60" width="35" height="60" />

      {/* Millennium Bridge hint */}
      <rect x="500" y="105" width="60" height="5" />

      {/* St Paul's Cathedral */}
      <rect x="570" y="65" width="60" height="55" />
      <ellipse cx="600" cy="65" rx="25" ry="15" />
      <ellipse cx="600" cy="50" rx="18" ry="20" />
      <rect x="595" y="25" width="10" height="10" />
      <polygon points="600,15 590,25 610,25" />

      {/* City of London buildings */}
      <rect x="650" y="40" width="25" height="80" />
      <rect x="680" y="55" width="20" height="65" />
      <rect x="705" y="30" width="30" height="90" />

      {/* The Gherkin */}
      <ellipse cx="760" cy="80" rx="15" ry="40" />

      {/* Leadenhall / Cheesegrater */}
      <polygon points="790,120 790,40 820,20 820,120" />

      {/* Walkie Talkie */}
      <path d="M 840 120 Q 840 60 850 40 L 870 40 Q 880 60 880 120 Z" />

      {/* The Shard */}
      <polygon points="920,120 920,100 935,0 950,100 950,120" />

      {/* Tower Bridge */}
      <rect x="980" y="50" width="25" height="70" />
      <rect x="978" y="45" width="29" height="8" />
      <polygon points="992,45 978,45 992,30 1006,45" />
      <rect x="1040" y="50" width="25" height="70" />
      <rect x="1038" y="45" width="29" height="8" />
      <polygon points="1052,45 1038,45 1052,30 1066,45" />
      <rect x="1005" y="55" width="35" height="8" />
      <rect x="1005" y="70" width="35" height="5" />

      {/* Canary Wharf towers */}
      <rect x="1100" y="35" width="20" height="85" />
      <polygon points="1110,35 1100,35 1110,20 1120,35" />
      <rect x="1130" y="45" width="18" height="75" />
      <rect x="1155" y="40" width="22" height="80" />

      {/* Ground line */}
      <rect x="0" y="118" width="1200" height="2" />
    </svg>
  );
}

interface CrawlLayoutProps {
  children: ReactNode;
  crawlName: string;
  accentColor?: string;
}

export default function CrawlLayout({ children, crawlName }: CrawlLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E8E4DD]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-[#1C2632]">
            London Pub Crawls
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/#crawls" className="text-sm text-[#4A5568] hover:text-[#722F37] transition-colors">
              All Crawls
            </a>
            <a href="#route" className="text-sm text-[#4A5568] hover:text-[#722F37] transition-colors">
              Route
            </a>
            <a href="#map" className="text-sm text-[#4A5568] hover:text-[#722F37] transition-colors">
              Map
            </a>
          </div>
        </div>
      </nav>

      {/* Skyline decoration - appears behind hero */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0 opacity-50">
        <LondonSkyline />
      </div>

      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-[#E8E4DD] bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="font-serif text-xl font-bold text-[#1C2632]">
              {crawlName}
            </div>
            <nav className="flex gap-6">
              <a href="/" className="text-[#4A5568] hover:text-[#722F37] transition-colors text-sm">Home</a>
              <a href="/#crawls" className="text-[#4A5568] hover:text-[#722F37] transition-colors text-sm">All Crawls</a>
              <a href="#route" className="text-[#4A5568] hover:text-[#722F37] transition-colors text-sm">Route</a>
            </nav>
          </div>
          <hr className="border-[#E8E4DD] mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#4A5568]">
            <p>&copy; {new Date().getFullYear()} London Pub Crawls. All rights reserved.</p>
            <p className="text-xs">Made in London. Researched on foot.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
