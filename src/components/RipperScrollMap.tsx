'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  RipperPub,
  ripperPubs,
  ripperStats,
  getRipperMapsUrl,
  getRipperDirectionsUrl,
} from '@/content/crawls/ripper';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function trimReview(review: string): string {
  const sentences = review.match(/[^.!?]+[.!?]+/g) || [review];
  if (sentences.length <= 3) return review;
  return sentences.slice(0, 3).join('').trim();
}

const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);

// Victorian/Ripper colours
const RIPPER_DARK = '#1C1C1C';
const RIPPER_RED = '#8B1A1A';
const RIPPER_PARCHMENT = '#F5F0E6';
const RIPPER_GOLD = '#D4A853';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RipperScrollMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<number, HTMLDivElement>>({});
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const [activePubId, setActivePubId] = useState<number>(1);
  const [showMap, setShowMap] = useState(true);

  const setCardRef = useCallback(
    (pubId: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[pubId] = el;
    },
    [],
  );

  const flyToPub = useCallback((pub: RipperPub) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({
      center: [pub.lng, pub.lat],
      zoom: 16,
      duration: 1200,
      essential: true,
      easing: EASE_OUT_CUBIC,
    });
  }, []);

  const highlightMarker = useCallback((activeId: number) => {
    Object.entries(markersRef.current).forEach(([id, el]) => {
      const n = parseInt(id);
      if (n === activeId) {
        el.classList.add('rp-active');
        el.classList.remove('rp-dim');
      } else {
        el.classList.remove('rp-active');
        el.classList.add('rp-dim');
      }
    });
  }, []);

  const drawRouteTo = useCallback((pubIndex: number) => {
    const map = mapRef.current;
    if (!map) return;
    const src = map.getSource('route-progress') as maplibregl.GeoJSONSource;
    if (!src) return;
    const coords = ripperPubs.slice(0, pubIndex + 1).map((p) => [p.lng, p.lat]);
    src.setData({
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates: coords },
    });
  }, []);

  const scrollCardIntoView = useCallback((pubId: number) => {
    setTimeout(() => {
      const el = cardRefs.current[pubId];
      if (el && listRef.current) {
        const listTop = listRef.current.getBoundingClientRect().top;
        const cardTop = el.getBoundingClientRect().top;
        const offset = cardTop - listTop + listRef.current.scrollTop - 8;
        listRef.current.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 50);
  }, []);

  const selectPub = useCallback(
    (pubId: number) => {
      const pub = ripperPubs.find((p) => p.id === pubId);
      if (!pub) return;
      setActivePubId(pubId);
      flyToPub(pub);
      highlightMarker(pubId);
      drawRouteTo(pubId - 1);
      scrollCardIntoView(pubId);
    },
    [flyToPub, highlightMarker, drawRouteTo, scrollCardIntoView],
  );

  // ---- init map ----
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [-0.072, 51.518],
      zoom: 14,
      scrollZoom: false,
      dragRotate: false,
      touchZoomRotate: true,
      touchPitch: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      const bounds = new maplibregl.LngLatBounds();
      ripperPubs.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 50, maxZoom: 15, duration: 0 });

      // Full route
      map.addSource('route-bg', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: ripperPubs.map((p) => [p.lng, p.lat]),
          },
        },
      });
      map.addLayer({
        id: 'route-bg-line',
        type: 'line',
        source: 'route-bg',
        paint: {
          'line-color': RIPPER_RED,
          'line-width': 3,
          'line-opacity': 0.5,
        },
      });

      // Progressive route
      map.addSource('route-progress', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: [] },
        },
      });
      map.addLayer({
        id: 'route-progress-line',
        type: 'line',
        source: 'route-progress',
        paint: {
          'line-color': RIPPER_RED,
          'line-width': 4,
          'line-opacity': 0.9,
        },
      });

      // Markers
      ripperPubs.forEach((pub) => {
        const el = document.createElement('div');
        el.className = 'rp-marker';
        el.textContent = String(pub.id);
        markersRef.current[pub.id] = el;
        el.addEventListener('click', () => selectPub(pub.id));
        new maplibregl.Marker({ element: el }).setLngLat([pub.lng, pub.lat]).addTo(map);
      });

      highlightMarker(1);
      drawRouteTo(0);
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, [selectPub, highlightMarker, drawRouteTo]);

  useEffect(() => {
    if (showMap) {
      setTimeout(() => mapRef.current?.resize(), 50);
    }
  }, [showMap]);

  return (
    <section>
      {/* Section header */}
      <div className="text-center py-10 px-6" style={{ background: 'var(--surface)' }}>
        <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-3">
          The Route
        </p>
        <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
          {ripperStats.totalPubs} Pubs to Visit
        </h2>
      </div>

      {/* Mobile: map toggle */}
      <div className="lg:hidden" style={{ borderBottom: '1px solid var(--surface)' }}>
        <button
          onClick={() => setShowMap(!showMap)}
          className="w-full py-3 px-4 flex items-center justify-between text-sm font-semibold"
          style={{ background: 'var(--background)', color: 'var(--ink)' }}
        >
          <span>{showMap ? 'Hide map' : 'Show map'}</span>
          <svg
            className="w-4 h-4 transition-transform"
            style={{ transform: showMap ? 'rotate(180deg)' : 'rotate(0)' }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Split layout */}
      <div className="rp-layout">
        {/* Map panel */}
        <div className={`rp-map-panel ${showMap ? '' : 'rp-map-hidden'}`}>
          <div ref={mapContainerRef} className="rp-map" />

          {/* Progress pill */}
          <div className="rp-progress">
            <div className="rp-pbar">
              <div
                className="rp-pfill"
                style={{ width: `${(activePubId / 7) * 100}%`, background: RIPPER_RED }}
              />
            </div>
            <span className="rp-plabel">{activePubId}/7</span>
          </div>
        </div>

        {/* Card list panel */}
        <div ref={listRef} className="rp-list">
          {ripperPubs.map((pub, i) => {
            const isActive = activePubId === pub.id;

            return (
              <div key={pub.id}>
                <div
                  ref={setCardRef(pub.id)}
                  className={`rp-card ${isActive ? 'rp-card-active' : ''}`}
                  onClick={() => selectPub(pub.id)}
                  style={{ borderLeftColor: isActive ? RIPPER_RED : 'transparent' }}
                >
                  {/* Compact row */}
                  <div className="rp-card-header">
                    <div className="rp-card-num">{pub.id}</div>
                    <div className="rp-card-title">
                      <div className="rp-card-pubname">{pub.pubName}</div>
                    </div>
                  </div>

                  {/* Expanded Victorian-style card */}
                  {isActive && (
                    <div className="rp-stop">
                      {/* Dark header */}
                      <div className="rp-stop-header">
                        <div className="rp-stop-num">Stop {pub.id} of 7</div>
                        <h3 className="rp-stop-name">{pub.pubName}</h3>
                      </div>

                      <div className="rp-stop-body">
                        <p className="rp-stop-addr">{pub.address}, {pub.postcode}</p>

                        <p className="rp-stop-review font-card">{trimReview(pub.review)}</p>

                        <div className="rp-stop-actions">
                          <a
                            href={getRipperMapsUrl(pub)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Open in Maps
                          </a>
                          {pub.website && (
                            <a
                              href={pub.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Website
                            </a>
                          )}
                          {pub.walkToNext && i < ripperPubs.length - 1 && (
                            <a
                              href={getRipperDirectionsUrl(pub, ripperPubs[i + 1])}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{ color: RIPPER_RED }}
                            >
                              {pub.walkToNext} min walk →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Styles ---- */}
      <style jsx>{`
        /* ===========================================
           MOBILE (default)
           =========================================== */

        .rp-layout { display: flex; flex-direction: column; }

        .rp-map-panel {
          position: relative; height: 35vh; min-height: 240px;
          transition: height 0.3s ease; overflow: hidden;
        }
        .rp-map-panel.rp-map-hidden { height: 0; min-height: 0; }
        .rp-map { position: absolute; inset: 0; }

        .rp-progress {
          position: absolute; bottom: 12px; left: 12px; z-index: 5;
          display: flex; align-items: center; gap: 8px;
          padding: 6px 12px;
          background: rgba(245,240,230,0.9);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          border-radius: 16px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
          color: ${RIPPER_DARK};
        }
        .rp-pbar {
          width: 40px; height: 3px; border-radius: 2px;
          background: rgba(0,0,0,0.1); overflow: hidden;
        }
        .rp-pfill { height: 100%; border-radius: 2px; transition: width 0.4s ease; }
        .rp-plabel { white-space: nowrap; }

        .rp-list {
          overflow-y: auto; background: var(--background); max-height: 55vh;
        }

        .rp-card {
          padding: 14px 16px; cursor: pointer;
          border-left: 3px solid transparent;
          transition: background 0.15s ease;
        }
        .rp-card:hover { background: var(--surface); }
        .rp-card-active { background: var(--surface); }

        .rp-card-header { display: flex; align-items: center; gap: 10px; }
        .rp-card-num {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; flex-shrink: 0;
          background: ${RIPPER_DARK}; color: ${RIPPER_PARCHMENT};
          border: 2px solid ${RIPPER_RED};
        }
        .rp-card-title { flex: 1; min-width: 0; }
        .rp-card-pubname {
          font-size: 14px; font-weight: 700; color: var(--ink);
          line-height: 1.3;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* ---- Victorian expanded card — mobile ---- */
        .rp-stop {
          margin-top: 10px;
          border: 2px solid ${RIPPER_DARK};
          border-radius: 2px;
          overflow: hidden;
          background: ${RIPPER_PARCHMENT};
        }
        .rp-stop-header {
          padding: 12px 16px;
          background: ${RIPPER_DARK};
          text-align: center;
        }
        .rp-stop-num {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em;
          color: ${RIPPER_RED}; margin-bottom: 4px;
        }
        .rp-stop-name {
          font-size: 18px; font-weight: 700;
          color: ${RIPPER_PARCHMENT};
          font-family: Georgia, serif;
          margin: 0; line-height: 1.2;
        }
        .rp-stop-body { padding: 12px 16px; }
        .rp-stop-addr {
          font-size: 11px; color: #888;
          font-style: italic; margin: 0 0 10px;
        }
        .rp-stop-review {
          font-size: 13px; line-height: 1.6; color: #444; margin: 0 0 12px;
        }
        .rp-stop-actions {
          display: flex; flex-wrap: wrap; gap: 6px 14px;
          padding-top: 10px; border-top: 1px solid rgba(28,28,28,0.15);
        }
        .rp-stop-actions a {
          font-size: 10px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.03em;
          color: var(--teal); text-decoration: none;
        }
        .rp-stop-actions a:hover { text-decoration: underline; }

        /* ===========================================
           DESKTOP (lg+)
           =========================================== */

        @media (min-width: 1024px) {
          .rp-layout {
            flex-direction: row; height: 85vh;
            border-top: 2px solid var(--ink);
            border-bottom: 2px solid var(--ink);
          }
          .rp-map-panel {
            flex: 1; height: 100%; min-height: 0;
            border-right: 2px solid var(--ink);
          }
          .rp-map-panel.rp-map-hidden { height: 100%; min-height: 0; }
          .rp-list {
            width: 320px !important; max-width: 320px !important;
            max-height: none; min-height: 0;
            flex-shrink: 0; flex-grow: 0;
          }

          .rp-card { padding: 10px 14px; }
          .rp-card-header { gap: 8px; }
          .rp-card-num { width: 24px; height: 24px; font-size: 10px; }
          .rp-card-pubname { font-size: 12px; }

          .rp-stop {
            width: 280px;
            margin-left: auto; margin-right: auto;
            display: flex; flex-direction: column;
          }
          .rp-stop-header { padding: 10px 14px; }
          .rp-stop-num { font-size: 8px; }
          .rp-stop-name { font-size: 14px; }
          .rp-stop-body {
            padding: 10px 14px; flex: 1;
            display: flex; flex-direction: column;
            overflow-y: auto;
          }
          .rp-stop-addr { font-size: 9px; margin: 0 0 6px; }
          .rp-stop-review {
            font-size: 10px; line-height: 1.5;
            margin: 0 0 6px; flex: 1;
          }
          .rp-stop-actions {
            padding-top: 6px; gap: 4px 8px; margin-top: auto;
          }
          .rp-stop-actions a { font-size: 8px; }
        }
      `}</style>

      <style jsx global>{`
        .rp-marker {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%;
          font-weight: 700; font-size: 0.65rem;
          background: ${RIPPER_DARK}; color: ${RIPPER_PARCHMENT};
          border: 2px solid ${RIPPER_RED};
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .rp-marker.rp-active {
          transform: scale(1.5);
          z-index: 20 !important;
          border-color: ${RIPPER_RED};
          box-shadow: 0 0 0 4px rgba(139,26,26,0.2), 0 2px 8px rgba(0,0,0,0.3);
          opacity: 1 !important;
        }
        .rp-marker.rp-dim { opacity: 0.4; }
        .rp-marker:hover {
          transform: scale(1.3);
          opacity: 1 !important;
          z-index: 15 !important;
        }
      `}</style>
    </section>
  );
}
