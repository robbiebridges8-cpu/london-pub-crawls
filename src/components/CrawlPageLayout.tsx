'use client';

import { ReactNode, useRef, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Chip } from '@heroui/react';
import { crawls, Crawl } from '@/content/crawls';
import { SiteNav, SiteFooter } from '@/components';
import { SITE_URL } from '@/lib/siteConfig';
import { BasePub } from '@/content/crawls/types';
import { ScrollMapTheme } from '@/lib/mapTypes';
import { CrawlMapHandle } from './CrawlMap';
import MapErrorBoundary from './MapErrorBoundary';
import { CrawlContext } from './CrawlContext';

const CrawlMap = dynamic(() => import('./CrawlMap'), { ssr: false });

const WHATSAPP_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export interface PrintPub {
  name: string;
  address: string;
  postcode: string;
  review: string;
  walkToNext: string | number | null;
  website?: string;
}

interface CrawlPageLayoutProps {
  crawl: Crawl;
  pubCount: number;
  pubs: BasePub[];
  theme: ScrollMapTheme;
  shareText?: string;
  stopsLabel?: string;
  children: ReactNode;
  beforeMap?: ReactNode;
  afterMap?: ReactNode;
  printPubs?: PrintPub[];
  routeSegments?: (number[][] | null)[];
  isWalking?: (pub: BasePub) => boolean;
  createMarker?: (pub: BasePub) => HTMLDivElement;
}

function AboutSection({ text }: { text: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const paragraphs = text.split('\n\n');

  return (
    <div className="px-6 py-6">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-2 group w-full text-left"
      >
        <h2 className="font-display text-xl font-bold text-[var(--ink)]">About This Crawl</h2>
        <svg
          className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 ${collapsed ? '' : 'rotate-180'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`font-body text-base text-[var(--muted)] leading-relaxed space-y-4 mt-3 ${collapsed ? 'hidden' : ''}`}>
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}

export default function CrawlPageLayout({
  crawl,
  pubCount,
  pubs,
  theme,
  shareText,
  stopsLabel = 'Pubs',
  children,
  beforeMap,
  afterMap,
  printPubs,
  routeSegments,
  isWalking,
  createMarker,
}: CrawlPageLayoutProps) {
  const defaultShareText = `Check out the ${crawl.name}! ${crawl.tagline} ${SITE_URL}/${crawl.slug}`;
  const finalShareText = shareText ?? defaultShareText;
  const mapRef = useRef<CrawlMapHandle>(null);
  const [mobileMapOpen, setMobileMapOpen] = useState(true);

  // Pub click from list → fly map to it
  const handlePubClick = useCallback((pubId: number) => {
    mapRef.current?.flyTo(pubId);
    mapRef.current?.highlight(pubId);
  }, []);

  // Marker click from map → scroll to card
  const handleMarkerClick = useCallback((pubId: number) => {
    const el = document.getElementById(`pub-card-${pubId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    mapRef.current?.flyTo(pubId);
    mapRef.current?.highlight(pubId);
  }, []);

  // Resize map after toggle
  useEffect(() => {
    if (mobileMapOpen) setTimeout(() => mapRef.current?.resize(), 350);
  }, [mobileMapOpen]);

  const schemaData = {
    "@context": "https://schema.org", "@type": "TouristAttraction",
    name: `${crawl.name} Pub Crawl`, description: crawl.metaDescription || crawl.description,
    url: `${SITE_URL}/${crawl.slug}`, touristType: "Pub crawl enthusiasts",
    isAccessibleForFree: true, publicAccess: true,
    address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
    amenityFeature: pubs.map(pub => ({
      "@type": "LocationFeatureSpecification",
      name: pub.pubName,
      value: true,
    })),
  };

  return (
    <div className="crawl-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <SiteNav />

      {/* ===== FIXED MAP — completely outside scroll flow ===== */}
      <div className={`map-fixed ${mobileMapOpen ? 'map-open' : 'map-closed'}`}>
        <MapErrorBoundary>
          <CrawlMap
            ref={mapRef}
            pubs={pubs}
            theme={theme}
            routeSegments={routeSegments}
            isWalking={isWalking}
            createMarker={createMarker}
            onMarkerClick={handleMarkerClick}
          />
        </MapErrorBoundary>
        {/* Mobile: hide map pill ON the map */}
        <button
          className="map-btn-hide lg:hidden"
          onClick={() => setMobileMapOpen(false)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
          <span>Hide Map</span>
        </button>
      </div>

      {/* Mobile: show map button — always visible when map is hidden */}
      {!mobileMapOpen && (
        <button
          className="map-btn-show lg:hidden"
          onClick={() => setMobileMapOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span>Map</span>
        </button>
      )}

      {/* ===== SCROLLABLE CONTENT ===== */}
      <div className={`scroll-content ${mobileMapOpen ? 'scroll-map-open' : 'scroll-map-closed'}`}>
        <main id="main-content">
          {/* Hero */}
          <div className="crawl-hero">
            <a href="/#crawls" className="inline-flex items-center gap-1.5 !text-white hover:opacity-80 transition-opacity mb-3 text-xs font-label uppercase tracking-widest">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Crawls
            </a>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">{crawl.name} Pub Crawl</h1>
            <p className="font-display text-lg italic text-white opacity-90 mb-4">{crawl.tagline}</p>
            <div className="flex gap-3 flex-wrap">
              <Chip size="sm" className="bg-[var(--surface)] text-[var(--ink)] font-label text-xs uppercase tracking-wider px-3">{pubCount} {stopsLabel}</Chip>
              <Chip size="sm" className="bg-[var(--surface)] text-[var(--ink)] font-label text-xs uppercase tracking-wider px-3">{crawl.duration}</Chip>
              <Chip size="sm" className="bg-[var(--surface)] text-[var(--ink)] font-label text-xs uppercase tracking-wider px-3">{crawl.difficulty}</Chip>
            </div>
          </div>

          {crawl.editorialDescription && (
            <AboutSection text={crawl.editorialDescription} />
          )}

          {crawl.freshnessCaveat && (
            <div className="px-6 pb-4">
              <div className="font-body text-sm text-[var(--muted)] bg-[var(--surface)] rounded-lg p-4">{crawl.freshnessCaveat}</div>
            </div>
          )}

          {crawl.logistics && (
            <div className="px-6 pb-6">
              <h2 className="font-display text-lg font-bold text-[var(--ink)] mb-3">Logistics</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[var(--surface)] rounded p-3">
                  <div className="font-label text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] mb-0.5">Start</div>
                  <div className="font-body text-sm text-[var(--ink)]">{crawl.logistics.tubeStart}</div>
                </div>
                <div className="bg-[var(--surface)] rounded p-3">
                  <div className="font-label text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] mb-0.5">Finish</div>
                  <div className="font-body text-sm text-[var(--ink)]">{crawl.logistics.tubeEnd}</div>
                </div>
                <div className="bg-[var(--surface)] rounded p-3 col-span-2">
                  <div className="font-label text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] mb-0.5">Tips</div>
                  <div className="font-body text-sm text-[var(--ink)]">{crawl.logistics.pacingTips}</div>
                </div>
              </div>
            </div>
          )}

          <div className="py-6 px-6 bg-[var(--surface)] rounded-lg mx-6 mb-6 no-print">
            <div className="text-center">
              <h2 className="font-display text-lg font-bold text-[var(--ink)] mb-1">Doing this crawl?</h2>
              <p className="font-body text-sm text-[var(--muted)] mb-4">Send it to the group chat or print the route.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`https://wa.me/?text=${encodeURIComponent(finalShareText)}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 text-sm">{WHATSAPP_ICON} WhatsApp</a>
                <button onClick={() => window.print()} className="btn-ghost inline-flex items-center gap-2 text-sm">Print Route</button>
              </div>
            </div>
          </div>

          {beforeMap}
          <div className="px-6 pb-6">
            <CrawlContext.Provider value={{ onPubClick: handlePubClick }}>
              {children}
            </CrawlContext.Provider>
          </div>
          {afterMap}

          {/* Print route */}
          {printPubs && printPubs.length > 0 && (
            <div className="print-route">
              <h1>{crawl.name}</h1>
              <p className="print-route-meta">{pubCount} {stopsLabel} · {crawl.duration} · {crawl.area}</p>
              {crawl.logistics && (
                <p className="print-route-logistics">
                  Start: {crawl.logistics.tubeStart} · Finish: {crawl.logistics.tubeEnd}
                  {crawl.logistics.specialNotes && <> · {crawl.logistics.specialNotes}</>}
                </p>
              )}
              <table className="print-route-table">
                <thead>
                  <tr>
                    <th className="print-col-num">#</th>
                    <th className="print-col-pub">Pub</th>
                    <th className="print-col-addr">Address</th>
                    <th className="print-col-next">Getting there</th>
                  </tr>
                </thead>
                <tbody>
                  {printPubs.map((pub, i) => (
                    <tr key={i}>
                      <td className="print-col-num">{i + 1}</td>
                      <td className="print-col-pub">{pub.name}</td>
                      <td className="print-col-addr">{pub.address}, {pub.postcode}</td>
                      <td className="print-col-next">{i === 0 ? '—' : (printPubs[i - 1].walkToNext ? (typeof printPubs[i - 1].walkToNext === 'number' ? `${printPubs[i - 1].walkToNext} min walk` : printPubs[i - 1].walkToNext) : '—')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="print-route-footer">
                londonontap.com · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          )}

          <div className="py-10 px-6 bg-[var(--surface)] no-print">
            <div className="text-center">
              <h2 className="font-display text-xl font-bold text-[var(--ink)] mb-3">Ready to go?</h2>
              <p className="font-body text-sm text-[var(--muted)] mb-5">Share with your mates or save for later.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`https://wa.me/?text=${encodeURIComponent(finalShareText)}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 text-sm">{WHATSAPP_ICON} WhatsApp</a>
                <button onClick={() => window.print()} className="btn-ghost inline-flex items-center gap-2 text-sm">Print</button>
              </div>
            </div>
          </div>

          <div className="py-10 px-6 no-print">
            <h2 className="font-display text-xl font-bold text-[var(--ink)] mb-4 text-center">More Crawls</h2>
            <div className="grid grid-cols-2 gap-[1px] bg-[var(--ink)]">
              {crawls.filter(c => c.live && c.slug !== crawl.slug).slice(0, 2).map(other => (
                <Link key={other.id} href={`/${other.slug}`} className="block bg-[var(--surface)] p-4 hover:bg-[var(--background)] transition-colors">
                  <h3 className="font-card text-base font-semibold text-[var(--ink)] mb-1">{other.name}</h3>
                  <p className="font-body text-xs text-[var(--muted)] line-clamp-2">{other.tagline}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-4"><Link href="/" className="btn-ghost text-sm">View All</Link></div>
          </div>
        </main>
        <SiteFooter />
      </div>

      <style jsx>{`
        .crawl-page { min-height: 100vh; background: var(--background); }

        /* ===== FIXED MAP ===== */
        .map-fixed {
          position: fixed; z-index: 10;
          top: 4.5rem; left: 0; right: 0;
          height: 35vh; max-height: 35vh;
          transition: max-height 0.3s ease, height 0.3s ease;
        }
        .map-fixed.map-closed {
          max-height: 0; overflow: hidden;
        }
        .map-btn-hide {
          position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
          z-index: 20;
          display: flex; align-items: center; gap: 5px;
          padding: 6px 14px; border-radius: 20px;
          background: rgba(255,241,229,0.92); color: var(--ink); border: none;
          font-family: var(--font-label); font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.06em;
          cursor: pointer; backdrop-filter: blur(8px);
          box-shadow: 0 1px 6px rgba(0,0,0,0.15);
        }

        /* Mobile: show map FAB */
        .map-btn-show {
          position: fixed; bottom: 20px; right: 20px; z-index: 50;
          display: flex; align-items: center; gap: 6px;
          padding: 10px 16px; border-radius: 24px;
          background: var(--ink); color: #fff; border: none;
          font-family: var(--font-label); font-size: 12px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.06em;
          box-shadow: 0 2px 12px rgba(0,0,0,0.25);
          cursor: pointer;
        }

        /* ===== SCROLLABLE CONTENT ===== */
        .scroll-content {
          position: relative; z-index: 1;
          transition: padding-top 0.3s ease;
        }
        .scroll-map-open { padding-top: calc(4.5rem + 35vh); }
        .scroll-map-closed { padding-top: 4.5rem; }

        .crawl-hero {
          padding: 24px 24px 20px;
          background: var(--claret);
        }

        /* ===== DESKTOP ===== */
        @media (min-width: 1024px) {
          .map-fixed {
            top: 4.5rem; left: auto; right: 0;
            width: 55%; height: calc(100vh - 4.5rem);
            max-height: none;
          }
          .map-fixed.map-closed { max-height: none; }

          .scroll-content {
            width: 45%;
            padding-top: 4.5rem !important;
            overflow-x: hidden;
          }
          .map-btn-hide,
          .map-btn-show {
            display: none !important;
          }

          .crawl-sticky-header {
            top: 4.5rem;
          }
        }
      `}</style>
    </div>
  );
}
