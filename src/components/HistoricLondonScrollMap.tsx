'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  HistoricLondonPub,
  historicLondonPubs,
  historicLondonStats,
  getHistoricLondonMapsUrl,
  getHistoricLondonDirectionsUrl,
} from '@/content/crawls/historiclondon';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function trimReview(review: string): string {
  const sentences = review.match(/[^.!?]+[.!?]+/g) || [review];
  if (sentences.length <= 3) return review;
  return sentences.slice(0, 3).join('').trim();
}

const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);

// Historic London colours
const HISTORIC_BROWN = '#8B4513';
const HISTORIC_WARM_BG = '#FAF6F0';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HistoricLondonScrollMap() {
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

  const flyToPub = useCallback((pub: HistoricLondonPub) => {
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
        el.classList.add('hl-active');
        el.classList.remove('hl-dim');
      } else {
        el.classList.remove('hl-active');
        el.classList.add('hl-dim');
      }
    });
  }, []);

  const drawRouteTo = useCallback((pubIndex: number) => {
    const map = mapRef.current;
    if (!map) return;
    const src = map.getSource('route-progress') as maplibregl.GeoJSONSource;
    if (!src) return;
    const coords = historicLondonPubs.slice(0, pubIndex + 1).map((p) => [p.lng, p.lat]);
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
      const pub = historicLondonPubs.find((p) => p.id === pubId);
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
      center: [-0.085, 51.512],
      zoom: 13,
      scrollZoom: false,
      dragRotate: false,
      touchZoomRotate: true,
      touchPitch: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      const bounds = new maplibregl.LngLatBounds();
      historicLondonPubs.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 50, maxZoom: 15, duration: 0 });

      // Full route
      map.addSource('route-bg', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: historicLondonPubs.map((p) => [p.lng, p.lat]),
          },
        },
      });
      map.addLayer({
        id: 'route-bg-line',
        type: 'line',
        source: 'route-bg',
        paint: {
          'line-color': HISTORIC_BROWN,
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
          'line-color': HISTORIC_BROWN,
          'line-width': 4,
          'line-opacity': 0.9,
        },
      });

      // Markers
      historicLondonPubs.forEach((pub) => {
        const el = document.createElement('div');
        el.className = 'hl-marker';
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
        <p className="font-label text-xs uppercase tracking-[0.2em] mb-3" style={{ color: HISTORIC_BROWN }}>
          The Route
        </p>
        <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
          {historicLondonStats.totalPubs} Pubs to Visit
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
      <div className="hl-layout">
        {/* Map panel */}
        <div className={`hl-map-panel ${showMap ? '' : 'hl-map-hidden'}`}>
          <div ref={mapContainerRef} className="hl-map" />

          {/* Progress pill */}
          <div className="hl-progress">
            <div className="hl-pbar">
              <div
                className="hl-pfill"
                style={{ width: `${(activePubId / historicLondonStats.totalPubs) * 100}%`, background: HISTORIC_BROWN }}
              />
            </div>
            <span className="hl-plabel">{activePubId}/{historicLondonStats.totalPubs}</span>
          </div>
        </div>

        {/* Card list panel */}
        <div ref={listRef} className="hl-list">
          {historicLondonPubs.map((pub, i) => {
            const isActive = activePubId === pub.id;

            return (
              <div key={pub.id}>
                <div
                  ref={setCardRef(pub.id)}
                  className={`hl-card ${isActive ? 'hl-card-active' : ''}`}
                  onClick={() => selectPub(pub.id)}
                  style={{ borderLeftColor: isActive ? HISTORIC_BROWN : 'transparent' }}
                >
                  {/* Compact row */}
                  <div className="hl-card-header">
                    <div className="hl-card-num">{pub.id}</div>
                    <div className="hl-card-title">
                      <div className="hl-card-pubname">{pub.pubName}</div>
                    </div>
                  </div>

                  {/* Expanded card */}
                  {isActive && (
                    <div className="hl-stop">
                      {/* Brown header band */}
                      <div className="hl-stop-header">
                        <div className="hl-stop-est">EST. {pub.established}</div>
                        <h3 className="hl-stop-name">{pub.pubName}</h3>
                      </div>

                      <div className="hl-stop-body">
                        <p className="hl-stop-addr">{pub.address}, {pub.postcode}</p>

                        <p className="hl-stop-review font-card">{trimReview(pub.review)}</p>

                        <div className="hl-stop-actions">
                          <a
                            href={getHistoricLondonMapsUrl(pub)}
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
                          {pub.walkToNext && i < historicLondonPubs.length - 1 && (
                            <a
                              href={getHistoricLondonDirectionsUrl(pub, historicLondonPubs[i + 1])}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{ color: HISTORIC_BROWN }}
                            >
                              {pub.walkToNext} →
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

        .hl-layout { display: flex; flex-direction: column; }

        .hl-map-panel {
          position: relative; height: 35vh; min-height: 240px;
          transition: height 0.3s ease; overflow: hidden;
        }
        .hl-map-panel.hl-map-hidden { height: 0; min-height: 0; }
        .hl-map { position: absolute; inset: 0; }

        .hl-progress {
          position: absolute; bottom: 12px; left: 12px; z-index: 5;
          display: flex; align-items: center; gap: 8px;
          padding: 6px 12px;
          background: rgba(250,246,240,0.9);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          border-radius: 16px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
          color: ${HISTORIC_BROWN};
        }
        .hl-pbar {
          width: 40px; height: 3px; border-radius: 2px;
          background: rgba(0,0,0,0.1); overflow: hidden;
        }
        .hl-pfill { height: 100%; border-radius: 2px; transition: width 0.4s ease; }
        .hl-plabel { white-space: nowrap; }

        .hl-list {
          overflow-y: auto; background: var(--background); max-height: 55vh;
        }

        .hl-card {
          padding: 14px 16px; cursor: pointer;
          border-left: 3px solid transparent;
          transition: background 0.15s ease;
        }
        .hl-card:hover { background: var(--surface); }
        .hl-card-active { background: var(--surface); }

        .hl-card-header { display: flex; align-items: center; gap: 10px; }
        .hl-card-num {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; flex-shrink: 0;
          background: ${HISTORIC_BROWN}; color: #FFFFFF;
        }
        .hl-card-title { flex: 1; min-width: 0; }
        .hl-card-pubname {
          font-size: 14px; font-weight: 700; color: var(--ink);
          line-height: 1.3;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* ---- Expanded card — mobile ---- */
        .hl-stop {
          margin-top: 10px;
          border: 2px solid ${HISTORIC_BROWN};
          border-radius: 2px;
          overflow: hidden;
          background: ${HISTORIC_WARM_BG};
        }
        .hl-stop-header {
          padding: 12px 16px;
          background: ${HISTORIC_BROWN};
          text-align: center;
        }
        .hl-stop-est {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em;
          color: #FFFFFF; margin-bottom: 4px;
          font-family: var(--font-label);
        }
        .hl-stop-name {
          font-size: 18px; font-weight: 700;
          color: #FFFFFF;
          font-family: var(--font-display);
          margin: 0; line-height: 1.2;
        }
        .hl-stop-body { padding: 12px 16px; }
        .hl-stop-addr {
          font-size: 11px; color: #888;
          font-style: italic; margin: 0 0 10px;
        }
        .hl-stop-review {
          font-size: 13px; line-height: 1.6; color: #444; margin: 0 0 12px;
        }
        .hl-stop-actions {
          display: flex; flex-wrap: wrap; gap: 6px 14px;
          padding-top: 10px; border-top: 1px solid rgba(139,69,19,0.15);
        }
        .hl-stop-actions a {
          font-size: 10px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.03em;
          color: var(--teal); text-decoration: none;
        }
        .hl-stop-actions a:hover { text-decoration: underline; }

        /* ===========================================
           DESKTOP (lg+)
           =========================================== */

        @media (min-width: 1024px) {
          .hl-layout {
            flex-direction: row; height: 85vh;
            border-top: 2px solid var(--ink);
            border-bottom: 2px solid var(--ink);
          }
          .hl-map-panel {
            flex: 1; height: 100%; min-height: 0;
            border-right: 2px solid var(--ink);
          }
          .hl-map-panel.hl-map-hidden { height: 100%; min-height: 0; }
          .hl-list {
            width: 320px !important; max-width: 320px !important;
            max-height: none; min-height: 0;
            flex-shrink: 0; flex-grow: 0;
          }

          .hl-card { padding: 10px 14px; }
          .hl-card-header { gap: 8px; }
          .hl-card-num { width: 24px; height: 24px; font-size: 10px; }
          .hl-card-pubname { font-size: 12px; }

          .hl-stop {
            width: 280px;
            margin-left: auto; margin-right: auto;
            display: flex; flex-direction: column;
          }
          .hl-stop-header { padding: 10px 14px; }
          .hl-stop-est { font-size: 8px; }
          .hl-stop-name { font-size: 14px; }
          .hl-stop-body {
            padding: 10px 14px; flex: 1;
            display: flex; flex-direction: column;
            overflow-y: auto;
          }
          .hl-stop-addr { font-size: 9px; margin: 0 0 6px; }
          .hl-stop-review {
            font-size: 10px; line-height: 1.5;
            margin: 0 0 6px; flex: 1;
          }
          .hl-stop-actions {
            padding-top: 6px; gap: 4px 8px; margin-top: auto;
          }
          .hl-stop-actions a { font-size: 8px; }
        }
      `}</style>

      <style jsx global>{`
        .hl-marker {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%;
          font-weight: 700; font-size: 0.65rem;
          background: ${HISTORIC_BROWN}; color: #FFFFFF;
          border: 2px solid #FFFFFF;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .hl-marker.hl-active {
          transform: scale(1.5);
          z-index: 20 !important;
          border-color: #FFFFFF;
          box-shadow: 0 0 0 4px rgba(139,69,19,0.2), 0 2px 8px rgba(0,0,0,0.3);
          opacity: 1 !important;
        }
        .hl-marker.hl-dim { opacity: 0.4; }
        .hl-marker:hover {
          transform: scale(1.3);
          opacity: 1 !important;
          z-index: 15 !important;
        }
      `}</style>
    </section>
  );
}
