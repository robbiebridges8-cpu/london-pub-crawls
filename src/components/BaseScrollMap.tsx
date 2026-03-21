'use client';

import { ReactNode, useEffect, useRef, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { BasePub } from '@/content/crawls/types';

const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScrollMapTheme {
  markerColor: string;
  markerTextColor: string;
  activeBorderColor?: string;
  routeColor: string;
  routeBgWidth?: number;
  routeWidth?: number;
  routeBgOpacity?: number;
  routeOpacity?: number;
  headerColor?: string;
}

export interface BaseScrollMapProps<T extends BasePub> {
  pubs: T[];
  totalPubs: number;
  theme: ScrollMapTheme;
  headerLabel?: string;
  routeSegments?: (number[][] | null)[];
  getTransport?: (pub: T) => string | undefined;
  /** Optional badge/label rendered above each pub name */
  renderLabel?: (pub: T) => ReactNode;
  isWalking?: (pub: T) => boolean;
  createMarker?: (pub: T) => HTMLDivElement;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BaseScrollMap<T extends BasePub>({
  pubs,
  totalPubs,
  theme,
  headerLabel,
  getTransport,
  renderLabel,
  createMarker,
  routeSegments,
  isWalking,
}: BaseScrollMapProps<T>) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<number, HTMLDivElement>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const selectPubRef = useRef<(pubId: number) => void>(() => {});
  const rafId = useRef<number>(0);

  const flyToPub = useCallback((pub: T) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({ center: [pub.lng, pub.lat], zoom: 15.5, duration: 800, essential: true, easing: EASE_OUT_CUBIC });
  }, []);

  const highlightMarker = useCallback((activeId: number) => {
    Object.entries(markersRef.current).forEach(([id, el]) => {
      const n = parseInt(id);
      if (n === activeId) { el.classList.add('bsm-active'); el.classList.remove('bsm-dim'); }
      else { el.classList.remove('bsm-active'); el.classList.add('bsm-dim'); }
    });
  }, []);

  // Build route segments
  type Segment = { coords: number[][]; walking: boolean };
  const segments: Segment[] = [];
  for (let i = 0; i < pubs.length - 1; i++) {
    const walking = isWalking ? isWalking(pubs[i]) : true;
    const osrmCoords = routeSegments?.[i];
    if (walking && osrmCoords && osrmCoords.length > 0) {
      segments.push({ coords: osrmCoords, walking: true });
    } else {
      segments.push({ coords: [[pubs[i].lng, pubs[i].lat], [pubs[i + 1].lng, pubs[i + 1].lat]], walking: false });
    }
  }
  const segmentsRef = useRef<Segment[]>(segments);
  segmentsRef.current = segments;

  const buildRouteGeoJSON = useCallback(() => {
    const segs = segmentsRef.current;
    return {
      type: 'FeatureCollection' as const,
      features: segs.map((seg, i) => ({
        type: 'Feature' as const,
        properties: { walking: seg.walking, index: i },
        geometry: { type: 'LineString' as const, coordinates: seg.coords },
      })),
    };
  }, []);

  // ---- Scroll progress: continuous, proportional to scrollbar ----
  useEffect(() => {
    const list = listRef.current;
    const progress = progressRef.current;
    const spine = spineRef.current;
    if (!list || !progress || !spine) return;

    const update = () => {
      const listRect = list.getBoundingClientRect();
      const triggerY = listRect.top + listRect.height * 0.35;
      const dots = spine.querySelectorAll<HTMLDivElement>('.tl-dot');
      if (dots.length === 0) return;

      // Find which dot the trigger line has passed
      let lastPassedIdx = -1;
      const spineRect = spine.getBoundingClientRect();

      dots.forEach((dot, i) => {
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.top + dotRect.height / 2;
        if (dotCenter <= triggerY) lastPassedIdx = i;
      });

      // Progress height: from first dot to the last passed dot
      const firstDot = dots[0];
      const firstY = firstDot.getBoundingClientRect().top + firstDot.offsetHeight / 2 - spineRect.top;

      let fillHeight = 0;
      if (lastPassedIdx >= 0) {
        const passedDot = dots[lastPassedIdx];
        const passedY = passedDot.getBoundingClientRect().top + passedDot.offsetHeight / 2 - spineRect.top;
        fillHeight = passedY - firstY;
      }

      progress.style.top = `${firstY + 24}px`; // +24 for spine padding
      progress.style.height = `${Math.max(0, fillHeight)}px`;

      // Update dot states
      dots.forEach((dot, i) => {
        dot.classList.toggle('tl-dot-filled', i <= lastPassedIdx);
        dot.classList.toggle('tl-dot-unfilled', i > lastPassedIdx);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    list.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      list.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [pubs]);

  // ---- selectPub: marker click — flies map, highlights marker ----
  const selectPub = useCallback((pubId: number) => {
    const pub = pubs.find((p) => p.id === pubId);
    if (!pub) return;
    flyToPub(pub);
    highlightMarker(pubId);
  }, [pubs, flyToPub, highlightMarker]);

  selectPubRef.current = selectPub;

  // ---- init map ----
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
      center: [-0.12, 51.515],
      zoom: 12,
      scrollZoom: false,
      dragRotate: false,
      touchZoomRotate: true,
      touchPitch: false,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    map.on('load', () => {
      const bounds = new maplibregl.LngLatBounds();
      pubs.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 40, maxZoom: 14, duration: 0 });

      map.addSource('route', { type: 'geojson', data: buildRouteGeoJSON() as GeoJSON.FeatureCollection });
      map.addLayer({
        id: 'route-walking', type: 'line', source: 'route',
        filter: ['==', ['get', 'walking'], true],
        paint: { 'line-color': theme.routeColor, 'line-width': 5, 'line-opacity': 0.75 },
      });
      map.addLayer({
        id: 'route-transit', type: 'line', source: 'route',
        filter: ['==', ['get', 'walking'], false],
        paint: { 'line-color': theme.routeColor, 'line-width': 3, 'line-opacity': 0.5, 'line-dasharray': [6, 4] },
      });

      pubs.forEach((pub) => {
        let el: HTMLDivElement;
        if (createMarker) { el = createMarker(pub); }
        else {
          el = document.createElement('div');
          el.className = 'bsm-marker';
          el.style.background = theme.markerColor;
          el.style.color = theme.markerTextColor;
          el.textContent = String(pub.id);
        }
        markersRef.current[pub.id] = el;
        el.addEventListener('click', () => selectPubRef.current(pub.id));
        new maplibregl.Marker({ element: el }).setLngLat([pub.lng, pub.lat]).addTo(map);
      });

      highlightMarker(1);
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; markersRef.current = {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => mapRef.current?.resize(), 150);
    return () => clearTimeout(t);
  }, []);

  const mc = theme.markerColor;
  const mtc = theme.markerTextColor;
  const mapsUrl = (pub: BasePub) =>
    `https://www.google.com/maps/search/?api=1&query=${pub.lat},${pub.lng}`;

  return (
    <section className="bsm-root">
      <div className="bsm-header" style={{ background: 'var(--surface)' }}>
        <p className="bsm-header-label" style={{ color: theme.headerColor ?? 'var(--claret)' }}>
          The Route
        </p>
        <h2 className="bsm-header-title">
          {headerLabel ?? `${totalPubs} Pubs to Visit`}
        </h2>
      </div>

      <div className="bsm-layout">
        {/* Map */}
        <div className="bsm-map-wrap">
          <div ref={mapContainerRef} className="bsm-map" />
        </div>

        {/* Pub list — continuous scroll */}
        <div ref={listRef} className="bsm-list">
          <div ref={spineRef} className="tl-spine" style={{ '--mc': mc, '--mtc': mtc } as React.CSSProperties}>
            {/* Background track */}
            <div className="tl-track" />
            {/* Progress fill */}
            <div ref={progressRef} className="tl-progress" />

            {/* Start marker */}
            <div className="tl-bookend">
              <div className="tl-bookend-dot" style={{ background: mc }} />
              <span className="tl-bookend-text">Start</span>
            </div>

            {pubs.map((pub, i) => {
              const transport = getTransport ? getTransport(pub) : undefined;
              const isLast = i === pubs.length - 1;

              return (
                <div key={pub.id}>
                  {/* Walk time before this pub (except first) */}
                  {i === 0 && transport && (
                    <div className="tl-walk">
                      <span className="tl-walk-text">↓ {transport}</span>
                    </div>
                  )}

                  {/* Pub section */}
                  <div className="tl-pub" onClick={() => selectPub(pub.id)}>
                    <div className="tl-dot tl-dot-filled" style={{ '--mc': mc, '--mtc': mtc } as React.CSSProperties}>
                      {pub.id}
                    </div>
                    <div className="tl-content">
                      {renderLabel && renderLabel(pub)}
                      <h3 className="tl-name">{pub.pubName}</h3>
                      <p className="tl-addr">{pub.address}, {pub.postcode}</p>
                      <p className="tl-desc">{pub.review}</p>
                      <div className="tl-links">
                        <a href={mapsUrl(pub)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                          Open in Maps
                        </a>
                        {pub.website && (
                          <>
                            <span className="tl-links-sep">·</span>
                            <a href={pub.website} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                              Website
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Walk time after this pub */}
                  {!isLast && (
                    <div className="tl-walk">
                      {(() => {
                        const nextTransport = getTransport ? getTransport(pubs[i + 1]) : undefined;
                        // Use current pub's transport for the gap after it
                        const walkText = getTransport ? getTransport(pub) : undefined;
                        return walkText ? (
                          <span className="tl-walk-text">↓ {walkText}</span>
                        ) : null;
                      })()}
                    </div>
                  )}
                </div>
              );
            })}

            {/* End marker */}
            <div className="tl-bookend tl-bookend-end">
              <div className="tl-bookend-dot" style={{ background: mc }} />
              <span className="tl-bookend-text">End of crawl</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bsm-root {
          position: relative;
          min-height: calc(200dvh - 4.5rem);
        }

        .bsm-header { text-align: center; padding: 32px 20px; }
        .bsm-header-label {
          font-family: var(--font-label);
          font-size: 12px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.2em;
          margin: 0 0 6px;
        }
        .bsm-header-title {
          font-family: var(--font-display);
          font-size: 26px; font-weight: 700;
          color: var(--ink); margin: 0;
        }

        /* ===== LAYOUT ===== */
        .bsm-layout {
          display: flex; flex-direction: column;
          height: calc(100dvh - 4.5rem);
          position: sticky; top: 4.5rem;
        }
        .bsm-map-wrap {
          width: 100%; height: 35%;
          min-height: 180px; flex-shrink: 0;
          border-bottom: 2px solid var(--ink);
        }
        .bsm-map { width: 100%; height: 100%; }

        .bsm-list {
          background: var(--background);
          flex: 1; min-height: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 0;
        }

        /* ===== SPINE ===== */
        .tl-spine {
          position: relative;
          padding: 24px 16px 40px 52px;
        }
        .tl-track {
          position: absolute; left: 27px; top: 24px; bottom: 40px;
          width: 2px; background: var(--surface); z-index: 0;
        }
        .tl-progress {
          position: absolute; left: 27px; top: 24px;
          height: 0; width: 2px;
          background: var(--mc); z-index: 1;
        }

        /* Bookend markers (start/end) */
        .tl-bookend {
          display: flex; align-items: center; gap: 12px;
          padding: 0 0 14px;
          position: relative;
        }
        .tl-bookend-end { padding: 14px 0 0; }
        .tl-bookend-dot {
          width: 10px; height: 10px; border-radius: 50%;
          position: absolute; left: -25px; top: 4px;
          z-index: 2;
        }
        .tl-bookend-end .tl-bookend-dot { top: 28px; }
        .tl-bookend-text {
          font-family: var(--font-label);
          font-size: 12px; font-weight: 600;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* Pub section */
        .tl-pub {
          position: relative; cursor: pointer;
          padding-bottom: 12px;
        }
        .tl-pub:hover .tl-name { color: var(--claret); }

        .tl-dot {
          position: absolute; left: -40px; top: 0;
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-label);
          font-size: 13px; font-weight: 700;
          z-index: 2; transition: all 0.2s ease;
        }
        .tl-dot-filled {
          background: var(--mc); color: var(--mtc);
        }
        .tl-dot-unfilled {
          background: var(--surface); color: var(--muted);
        }

        .tl-content { }
        .tl-name {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 700;
          color: var(--ink); line-height: 1.2;
          margin: 0 0 2px; transition: color 0.15s ease;
        }
        .tl-addr {
          font-family: var(--font-body);
          font-size: 13px; font-weight: 400;
          color: var(--muted); margin: 0 0 14px;
          line-height: 1.3;
        }
        .tl-desc {
          font-family: var(--font-card);
          font-size: 15px; font-weight: 400;
          color: #3D2E1F; line-height: 1.65;
          margin: 0 0 12px;
          max-width: 480px;
        }
        .tl-links {
          display: flex; align-items: center; gap: 6px;
        }
        .tl-links a {
          font-family: var(--font-body);
          font-size: 13px; font-weight: 500;
          color: var(--teal); text-decoration: none;
        }
        .tl-links a:hover { text-decoration: underline; }
        .tl-links-sep {
          color: var(--muted); font-size: 11px;
        }

        /* Walk time between pubs */
        .tl-walk {
          padding: 10px 0;
        }
        .tl-walk-text {
          font-family: var(--font-body);
          font-size: 12.5px; font-weight: 400;
          color: var(--muted);
        }

        /* ===== DESKTOP ===== */
        @media (min-width: 768px) {
          .bsm-layout {
            flex-direction: row;
            height: calc(100vh - 4.5rem);
          }
          .bsm-map-wrap {
            width: 50%; height: 100%;
            min-height: 0; flex-shrink: 0; order: 2;
            border-bottom: none; border-left: 2px solid var(--ink);
          }
          .bsm-list {
            width: 50%; flex-shrink: 0; order: 1;
          }
          .tl-spine { padding: 32px 24px 48px 60px; }
          .tl-track { left: 35px; top: 32px; bottom: 48px; }
          .tl-progress { left: 35px; top: 32px; }
          .tl-bookend-dot { left: -25px; }
          .tl-dot { left: -40px; }
          .tl-name { font-size: 22px; }
          .tl-desc { font-size: 15px; }
        }

        /* ===== SMALL MOBILE ===== */
        @media (max-width: 374px) {
          .tl-spine { padding-left: 44px; }
          .tl-dot { width: 24px; height: 24px; font-size: 11px; left: -34px; }
          .tl-name { font-size: 19px; }
          .tl-desc { font-size: 14px; max-width: none; }
          .tl-walk { padding: 16px 0; }
        }
      `}</style>

      <style jsx global>{`
        .bsm-marker {
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 50%;
          font-weight: 700; font-size: 0.7rem;
          border: 2px solid rgba(255, 255, 255, 0.9);
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }
        .bsm-marker.bsm-active {
          transform: scale(1.4); z-index: 20 !important;
          border-color: #000;
          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.2);
          opacity: 1 !important;
        }
        .bsm-marker.bsm-dim { opacity: 0.45; }
        .bsm-marker:hover { transform: scale(1.25); opacity: 1 !important; z-index: 15 !important; }
      `}</style>
    </section>
  );
}
