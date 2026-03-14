'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  CircleLinePub,
  circleLinePubs,
  circleLineStats,
  getCircleLineMapsUrl,
  getCircleLineDirectionsUrl,
} from '@/content/crawls/circleline';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function trimReview(review: string): string {
  const sentences = review.match(/[^.!?]+[.!?]+/g) || [review];
  if (sentences.length <= 3) return review;
  return sentences.slice(0, 3).join('').trim();
}

const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);

// TfL Circle Line colours
const TFL_YELLOW = '#FFD300';
const TFL_BLUE = '#003688';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CircleLineScrollMap() {
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

  const flyToPub = useCallback((pub: CircleLinePub) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({
      center: [pub.lng, pub.lat],
      zoom: 15.5,
      duration: 1200,
      essential: true,
      easing: EASE_OUT_CUBIC,
    });
  }, []);

  const highlightMarker = useCallback((activeId: number) => {
    Object.entries(markersRef.current).forEach(([id, el]) => {
      const n = parseInt(id);
      if (n === activeId) {
        el.classList.add('cl-active');
        el.classList.remove('cl-dim');
      } else {
        el.classList.remove('cl-active');
        el.classList.add('cl-dim');
      }
    });
  }, []);

  const drawRouteTo = useCallback((pubIndex: number) => {
    const map = mapRef.current;
    if (!map) return;
    const src = map.getSource('route-progress') as maplibregl.GeoJSONSource;
    if (!src) return;
    const coords = circleLinePubs.slice(0, pubIndex + 1).map((p) => [p.lng, p.lat]);
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
      const pub = circleLinePubs.find((p) => p.id === pubId);
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
      center: [-0.12, 51.515],
      zoom: 12,
      scrollZoom: false,
      dragRotate: false,
      touchZoomRotate: true,
      touchPitch: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      const bounds = new maplibregl.LngLatBounds();
      circleLinePubs.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 50, maxZoom: 13, duration: 0 });

      // Full route
      map.addSource('route-bg', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: circleLinePubs.map((p) => [p.lng, p.lat]),
          },
        },
      });
      map.addLayer({
        id: 'route-bg-line',
        type: 'line',
        source: 'route-bg',
        paint: {
          'line-color': '#000',
          'line-width': 6,
          'line-opacity': 0.4,
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
          'line-color': TFL_YELLOW,
          'line-width': 4,
          'line-opacity': 1,
        },
      });

      // Markers
      circleLinePubs.forEach((pub) => {
        const el = document.createElement('div');
        el.className = 'cl-marker';
        el.style.background = TFL_YELLOW;
        el.style.color = '#1a1a1a';
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
          {circleLineStats.totalPubs} Stations to Visit
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
      <div className="cl-layout">
        {/* Map panel */}
        <div className={`cl-map-panel ${showMap ? '' : 'cl-map-hidden'}`}>
          <div ref={mapContainerRef} className="cl-map" />

          {/* Progress pill */}
          <div className="cl-progress">
            <div className="cl-pbar">
              <div
                className="cl-pfill"
                style={{ width: `${(activePubId / 27) * 100}%`, background: TFL_YELLOW }}
              />
            </div>
            <span className="cl-pdot" style={{ background: TFL_YELLOW }} />
            <span className="cl-plabel">{activePubId}/27</span>
          </div>
        </div>

        {/* Card list panel */}
        <div ref={listRef} className="cl-list">
          {circleLinePubs.map((pub, i) => {
            const isActive = activePubId === pub.id;

            return (
              <div key={pub.id}>
                <div
                  ref={setCardRef(pub.id)}
                  className={`cl-card ${isActive ? 'cl-card-active' : ''}`}
                  onClick={() => selectPub(pub.id)}
                  style={{ borderLeftColor: isActive ? TFL_YELLOW : 'transparent' }}
                >
                  {/* Compact row */}
                  <div className="cl-card-header">
                    <div className="cl-card-num">
                      {pub.id}
                    </div>
                    <div className="cl-card-title">
                      <div className="cl-card-station">{pub.station}</div>
                      <div className="cl-card-pubname">{pub.pubName}</div>
                    </div>
                  </div>

                  {/* Expanded tube stop card */}
                  {isActive && (
                    <div className="cl-stop">
                      {/* Roundel bar — red ring + blue bar with station name */}
                      <div className="cl-stop-bar">
                        <div className="cl-stop-ring">
                          <div className="cl-stop-ring-inner" />
                        </div>
                        <div className="cl-stop-name">{pub.station}</div>
                      </div>

                      {/* Stop number */}
                      <div className="cl-stop-num">Station {pub.id} of 27</div>

                      <div className="cl-stop-body">
                        <h3 className="cl-stop-pub font-display">{pub.pubName}</h3>
                        <p className="cl-stop-addr">{pub.address}, {pub.postcode}</p>

                        <p className="cl-stop-review font-card">{trimReview(pub.review)}</p>

                        <div className="cl-stop-actions">
                          <a
                            href={getCircleLineMapsUrl(pub)}
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
                          {pub.transportToNext && i < circleLinePubs.length - 1 && (
                            <a
                              href={getCircleLineDirectionsUrl(pub, circleLinePubs[i + 1])}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{ color: TFL_BLUE }}
                            >
                              Next station →
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

        .cl-layout {
          display: flex;
          flex-direction: column;
        }

        .cl-map-panel {
          position: relative;
          height: 35vh;
          min-height: 240px;
          transition: height 0.3s ease;
          overflow: hidden;
        }
        .cl-map-panel.cl-map-hidden {
          height: 0;
          min-height: 0;
        }
        .cl-map { position: absolute; inset: 0; }

        .cl-progress {
          position: absolute;
          bottom: 12px; left: 12px; z-index: 5;
          display: flex; align-items: center; gap: 8px;
          padding: 6px 12px;
          background: rgba(255,241,229,0.9);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 16px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.04em; color: var(--ink);
        }
        .cl-pbar {
          width: 40px; height: 3px; border-radius: 2px;
          background: rgba(0,0,0,0.08); overflow: hidden;
        }
        .cl-pfill { height: 100%; border-radius: 2px; transition: width 0.4s ease; }
        .cl-pdot { width: 6px; height: 6px; border-radius: 50%; }
        .cl-plabel { white-space: nowrap; }

        .cl-list {
          overflow-y: auto;
          background: var(--background);
          max-height: 55vh;
        }

        .cl-card {
          padding: 14px 16px;
          cursor: pointer;
          border-left: 3px solid transparent;
          transition: background 0.15s ease;
        }
        .cl-card:hover { background: var(--surface); }
        .cl-card-active { background: var(--surface); }

        .cl-card-header {
          display: flex; align-items: center; gap: 10px;
        }
        .cl-card-num {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; flex-shrink: 0;
          background: ${TFL_YELLOW}; color: #1a1a1a;
          border: 2px solid #1a1a1a;
        }
        .cl-card-title { flex: 1; min-width: 0; }
        .cl-card-station {
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          line-height: 1; color: var(--ink);
        }
        .cl-card-pubname {
          font-size: 14px; font-weight: 700; color: var(--ink);
          line-height: 1.3; margin-top: 1px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* ---- Tube stop expanded card — mobile ---- */
        .cl-stop {
          margin-top: 10px;
          border: 2px solid #1a1a1a;
          border-radius: 4px;
          overflow: hidden;
          background: #fff;
        }

        /* Station name bar — yellow with dark text */
        .cl-stop-bar {
          position: relative;
          padding: 14px 16px;
          background: ${TFL_YELLOW};
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 2px solid #1a1a1a;
        }
        .cl-stop-ring {
          width: 30px; height: 30px; border-radius: 50%;
          border: 3px solid #CC3333;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          position: relative;
        }
        .cl-stop-ring-inner {
          position: absolute;
          left: -3px; right: -3px;
          height: 9px;
          background: ${TFL_BLUE};
          top: 50%; transform: translateY(-50%);
        }
        .cl-stop-name {
          font-size: 15px; font-weight: 800; color: #1a1a1a;
          text-transform: uppercase; letter-spacing: 0.06em;
        }

        .cl-stop-num {
          padding: 5px 16px;
          background: #1a1a1a;
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: ${TFL_YELLOW}; text-align: center;
        }

        .cl-stop-body { padding: 12px 16px; }
        .cl-stop-pub {
          font-size: 18px; font-weight: 700; color: #000;
          text-align: center; margin: 0 0 4px; line-height: 1.2;
        }
        .cl-stop-addr {
          font-size: 11px; color: #666; text-align: center; margin: 0 0 10px;
        }
        .cl-stop-review {
          font-size: 13px; line-height: 1.6; color: #444; margin: 0 0 12px;
        }
        .cl-stop-actions {
          display: flex; flex-wrap: wrap; gap: 6px 14px;
          padding-top: 10px; border-top: 1px solid #ddd;
        }
        .cl-stop-actions a {
          font-size: 10px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.03em;
          color: var(--teal); text-decoration: none;
        }
        .cl-stop-actions a:hover { text-decoration: underline; }

        /* ===========================================
           DESKTOP (lg+)
           =========================================== */

        @media (min-width: 1024px) {
          .cl-layout {
            flex-direction: row;
            height: 85vh;
            border-top: 2px solid var(--ink);
            border-bottom: 2px solid var(--ink);
          }
          .cl-map-panel {
            flex: 1;
            height: 100%;
            min-height: 0;
            border-right: 2px solid var(--ink);
          }
          .cl-map-panel.cl-map-hidden {
            height: 100%;
            min-height: 0;
          }
          .cl-list {
            width: 320px !important;
            max-width: 320px !important;
            max-height: none;
            min-height: 0;
            flex-shrink: 0;
            flex-grow: 0;
          }

          .cl-card { padding: 10px 14px; }
          .cl-card-header { gap: 8px; }
          .cl-card-num { width: 24px; height: 24px; font-size: 10px; border-width: 1.5px; }
          .cl-card-station { font-size: 9px; }
          .cl-card-pubname { font-size: 12px; }

          .cl-stop {
            width: 280px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            flex-direction: column;
          }
          .cl-stop-bar { padding: 12px 12px; gap: 10px; }
          .cl-stop-ring { width: 28px; height: 28px; border-width: 3px; }
          .cl-stop-ring-inner { height: 8px; left: -3px; right: -3px; }
          .cl-stop-name { font-size: 13px; }
          .cl-stop-num { padding: 4px 12px; font-size: 9px; }
          .cl-stop-body {
            padding: 10px 14px;
            flex: 1; display: flex; flex-direction: column;
            overflow-y: auto;
          }
          .cl-stop-pub { font-size: 14px; margin: 0 0 2px; }
          .cl-stop-addr { font-size: 9px; margin: 0 0 6px; }
          .cl-stop-review {
            font-size: 10px; line-height: 1.5;
            margin: 0 0 6px; flex: 1;
          }
          .cl-stop-actions {
            padding-top: 6px; gap: 4px 8px; margin-top: auto;
          }
          .cl-stop-actions a { font-size: 8px; }
        }
      `}</style>

      <style jsx global>{`
        .cl-marker {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%;
          font-weight: 700; font-size: 0.65rem;
          border: 2px solid rgba(0,0,0,0.5);
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        }
        .cl-marker.cl-active {
          transform: scale(1.5);
          z-index: 20 !important;
          border-color: #1a1a1a;
          box-shadow: 0 0 0 4px rgba(255,211,0,0.3), 0 2px 8px rgba(0,0,0,0.25);
          opacity: 1 !important;
        }
        .cl-marker.cl-dim { opacity: 0.4; }
        .cl-marker:hover {
          transform: scale(1.3);
          opacity: 1 !important;
          z-index: 15 !important;
        }
      `}</style>
    </section>
  );
}
