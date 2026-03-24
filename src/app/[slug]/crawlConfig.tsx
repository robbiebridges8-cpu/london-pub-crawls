'use client';

import { ComponentType, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { canonicalVictims } from '@/content/crawls/ripper';
import { monopolyPubs, monopolyColorGroups, monopolyStats } from '@/content/crawls/monopoly';
import { circleLinePubs, circleLineStats } from '@/content/crawls/circleline';
import { ripperPubs, ripperStats } from '@/content/crawls/ripper';
import { beatlesPubs, beatlesStats } from '@/content/crawls/beatles';
import { southBankPubs, southBankStats } from '@/content/crawls/southbank';
import { historicLondonPubs, historicLondonStats } from '@/content/crawls/historiclondon';
import { literaryLondonPubs, literaryLondonStats } from '@/content/crawls/literarylondon';
import { bermondseyPubs, bermondseyStats } from '@/content/crawls/bermondseybm';
import { criminalLondonPubs, criminalLondonStats } from '@/content/crawls/criminallondon';
import { getRouteSegments } from '@/content/routes';
import { PrintPub } from '@/components/CrawlPageLayout';
import { ScrollMapTheme } from '@/lib/mapTypes';
import { BasePub } from '@/content/crawls/types';

const mapLoader = () => (
  <div className="h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
    <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
  </div>
);

const MonopolyScrollMap = dynamic(() => import('@/components/MonopolyScrollMap'), { ssr: false, loading: mapLoader });
const CircleLineScrollMap = dynamic(() => import('@/components/CircleLineScrollMap'), { ssr: false, loading: mapLoader });
const RipperScrollMap = dynamic(() => import('@/components/RipperScrollMap'), { ssr: false, loading: mapLoader });
const BeatlesScrollMap = dynamic(() => import('@/components/BeatlesScrollMap'), { ssr: false, loading: mapLoader });
const SouthBankScrollMap = dynamic(() => import('@/components/SouthBankScrollMap'), { ssr: false, loading: mapLoader });
const HistoricLondonScrollMap = dynamic(() => import('@/components/HistoricLondonScrollMap'), { ssr: false, loading: mapLoader });
const LiteraryLondonScrollMap = dynamic(() => import('@/components/LiteraryLondonScrollMap'), { ssr: false, loading: mapLoader });
const BermondseyScrollMap = dynamic(() => import('@/components/BermondseyScrollMap'), { ssr: false, loading: mapLoader });
const CriminalLondonScrollMap = dynamic(() => import('@/components/CriminalLondonScrollMap'), { ssr: false, loading: mapLoader });

// Ripper Victims Memorial
function RipperVictimsMemorial() {
  return (
    <section className="py-8 px-6 bg-[#1C1C1C] rounded-lg mb-6">
      <div className="text-center mb-6">
        <p className="font-label text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#8B1A1A' }}>In Memoriam</p>
        <h2 className="font-display text-xl font-bold" style={{ color: '#F5F0E6' }}>The Five Victims</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {canonicalVictims.map((victim, i) => (
          <div key={i} className="text-center p-3 border border-[#8B1A1A] rounded-sm">
            <div className="text-sm font-semibold mb-1" style={{ color: '#D4A853', fontFamily: 'Georgia, serif' }}>{victim.name}</div>
            <div className="text-xs mb-1" style={{ color: '#F5F0E6' }}>Age {victim.age}</div>
            <div className="text-xs" style={{ color: '#888' }}>{victim.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Bermondsey freshness caveat
function BermondseyFreshnessCaveat() {
  return (
    <div className="p-4 bg-[var(--surface)] border-l-4 border-[var(--gold)] rounded mb-6">
      <div className="font-label text-xs uppercase tracking-[0.1em] text-[var(--gold)] mb-2">A living crawl</div>
      <p className="font-body text-sm text-[var(--ink)] leading-relaxed">
        The Beer Mile is an informal collection of independent taprooms — they open, close, move, and change hours constantly. Check individual taproom websites before you go, especially on weekdays. Saturday is the only day everything is reliably open. Last verified March 2026.
      </p>
    </div>
  );
}

function toPrintPubs(pubs: { pubName: string; address: string; postcode: string; review: string; walkToNext?: string | number | null }[]): PrintPub[] {
  return pubs.map((p) => ({
    name: p.pubName,
    address: p.address,
    postcode: p.postcode,
    review: p.review,
    walkToNext: p.walkToNext ?? null,
  }));
}

// Monopoly custom marker
function createMonopolyMarker(pub: BasePub): HTMLDivElement {
  const mpub = pub as typeof monopolyPubs[number];
  const grp = monopolyColorGroups[mpub.colorGroup];
  const light = ['yellow', 'lightBlue'].includes(mpub.colorGroup);
  const el = document.createElement('div');
  el.className = 'bsm-marker';
  el.style.background = grp.color;
  el.style.color = light ? '#1a1a1a' : '#fff';
  el.textContent = String(pub.id);
  return el;
}

// Check if transport is non-walking
function isNonWalking(text?: string | null): boolean {
  if (!text) return false;
  const t = text.toLowerCase();
  return t.includes('tube') || t.includes('northern line') || t.includes('overground');
}

export interface CrawlConfig {
  ScrollMap: ComponentType;
  pubCount: number;
  pubs: BasePub[];
  theme: ScrollMapTheme;
  stopsLabel?: string;
  beforeMap?: ReactNode;
  afterMap?: ReactNode;
  printPubs: PrintPub[];
  routeSegments?: (number[][] | null)[];
  isWalking?: (pub: BasePub) => boolean;
  createMarker?: (pub: BasePub) => HTMLDivElement;
}

export const crawlConfigs: Record<string, CrawlConfig> = {
  'monopoly': {
    ScrollMap: MonopolyScrollMap,
    pubCount: monopolyStats.totalPubs,
    pubs: monopolyPubs,
    theme: { markerColor: '#990F3D', markerTextColor: '#FFF1E5', routeColor: '#990F3D' },
    printPubs: toPrintPubs(monopolyPubs),
    routeSegments: getRouteSegments('monopoly'),
    isWalking: (pub) => (pub as typeof monopolyPubs[number]).transportToNext === 'Walk',
    createMarker: createMonopolyMarker,
  },
  'circle-line': {
    ScrollMap: CircleLineScrollMap,
    pubCount: circleLineStats.totalPubs,
    pubs: circleLinePubs,
    theme: { markerColor: '#FFD300', markerTextColor: '#1a1a1a', routeColor: '#FFD300', routeBgWidth: 6, routeBgOpacity: 0.4, routeWidth: 4, routeOpacity: 1 },
    printPubs: toPrintPubs(circleLinePubs),
    routeSegments: getRouteSegments('circle-line'),
  },
  'jack-the-ripper': {
    ScrollMap: RipperScrollMap,
    pubCount: ripperStats.totalPubs,
    pubs: ripperPubs,
    theme: { markerColor: '#1C1C1C', markerTextColor: '#F5F0E6', routeColor: '#8B1A1A' },
    beforeMap: <RipperVictimsMemorial />,
    printPubs: toPrintPubs(ripperPubs),
    routeSegments: getRouteSegments('jack-the-ripper'),
  },
  'beatles': {
    ScrollMap: BeatlesScrollMap,
    pubCount: beatlesStats.totalPubs,
    pubs: beatlesPubs,
    theme: { markerColor: '#003087', markerTextColor: '#fff', routeColor: '#003087', headerColor: '#003087' },
    printPubs: toPrintPubs(beatlesPubs),
    routeSegments: getRouteSegments('beatles'),
    isWalking: (pub) => !isNonWalking((pub as typeof beatlesPubs[number]).walkToNext),
  },
  'south-bank': {
    ScrollMap: SouthBankScrollMap,
    pubCount: southBankStats.totalPubs,
    pubs: southBankPubs,
    theme: { markerColor: '#0098D4', markerTextColor: '#FFFFFF', routeColor: '#0098D4', routeWidth: 4, routeOpacity: 0.9 },
    printPubs: toPrintPubs(southBankPubs),
    routeSegments: getRouteSegments('south-bank'),
  },
  'historic-london': {
    ScrollMap: HistoricLondonScrollMap,
    pubCount: historicLondonStats.totalPubs,
    pubs: historicLondonPubs,
    theme: { markerColor: '#8B4513', markerTextColor: '#FFFFFF', routeColor: '#8B4513', headerColor: '#8B4513' },
    printPubs: toPrintPubs(historicLondonPubs),
    routeSegments: getRouteSegments('historic-london'),
  },
  'literary-london': {
    ScrollMap: LiteraryLondonScrollMap,
    pubCount: literaryLondonStats.totalPubs,
    pubs: literaryLondonPubs,
    theme: { markerColor: '#2E4057', markerTextColor: '#FFFFFF', routeColor: '#2E4057' },
    printPubs: toPrintPubs(literaryLondonPubs),
    routeSegments: getRouteSegments('literary-london'),
    isWalking: (pub) => !isNonWalking((pub as typeof literaryLondonPubs[number]).walkToNext),
  },
  'bermondsey-beer-mile': {
    ScrollMap: BermondseyScrollMap,
    pubCount: bermondseyStats.totalPubs,
    pubs: bermondseyPubs,
    theme: { markerColor: '#D4A03C', markerTextColor: '#1a1a1a', routeColor: '#D4A03C' },
    stopsLabel: 'Stops',
    beforeMap: <BermondseyFreshnessCaveat />,
    printPubs: toPrintPubs(bermondseyPubs),
    routeSegments: getRouteSegments('bermondsey-beer-mile'),
  },
  'criminal-london': {
    ScrollMap: CriminalLondonScrollMap,
    pubCount: criminalLondonStats.totalPubs,
    pubs: criminalLondonPubs,
    theme: { markerColor: '#1A1A2E', markerTextColor: '#fff', routeColor: '#1A1A2E' },
    printPubs: toPrintPubs(criminalLondonPubs),
    routeSegments: getRouteSegments('criminal-london'),
    isWalking: (pub) => !isNonWalking((pub as typeof criminalLondonPubs[number]).walkToNext),
  },
};
