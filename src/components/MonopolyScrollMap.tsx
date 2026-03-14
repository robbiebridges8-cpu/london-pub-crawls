'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  MonopolyPub,
  monopolyPubs,
  monopolyColorGroups,
  monopolyStats,
  getMonopolyMapsUrl,
  getMonopolyDirectionsUrl,
} from '@/content/crawls/monopoly';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function trimReview(review: string): string {
  const sentences = review.match(/[^.!?]+[.!?]+/g) || [review];
  if (sentences.length <= 3) return review;
  return sentences.slice(0, 3).join('').trim();
}

const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MonopolyScrollMap() {
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

  // ---- map: fly to pub ----
  const flyToPub = useCallback((pub: MonopolyPub) => {
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

  // ---- update marker highlight ----
  const highlightMarker = useCallback((activeId: number) => {
    Object.entries(markersRef.current).forEach(([id, el]) => {
      const n = parseInt(id);
      if (n === activeId) {
        el.classList.add('sm-active');
        el.classList.remove('sm-dim');
      } else {
        el.classList.remove('sm-active');
        el.classList.add('sm-dim');
      }
    });
  }, []);

  // ---- update route line ----
  const drawRouteTo = useCallback((pubIndex: number) => {
    const map = mapRef.current;
    if (!map) return;
    const src = map.getSource('route-progress') as maplibregl.GeoJSONSource;
    if (!src) return;
    const coords = monopolyPubs.slice(0, pubIndex + 1).map((p) => [p.lng, p.lat]);
    src.setData({
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates: coords },
    });
  }, []);

  // ---- scroll card to top of list ----
  const scrollCardIntoView = useCallback((pubId: number) => {
    // Small delay so accordion has time to expand
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

  // ---- select a pub ----
  const selectPub = useCallback(
    (pubId: number) => {
      const pub = monopolyPubs.find((p) => p.id === pubId);
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
      monopolyPubs.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 50, maxZoom: 13, duration: 0 });

      // Full route (faint)
      map.addSource('route-bg', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: monopolyPubs.map((p) => [p.lng, p.lat]),
          },
        },
      });
      map.addLayer({
        id: 'route-bg-line',
        type: 'line',
        source: 'route-bg',
        paint: {
          'line-color': '#990F3D',
          'line-width': 2.5,
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
          'line-color': '#990F3D',
          'line-width': 3,
          'line-opacity': 0.8,
        },
      });

      // Markers
      monopolyPubs.forEach((pub) => {
        const grp = monopolyColorGroups[pub.colorGroup];
        const light = ['yellow', 'lightBlue'].includes(pub.colorGroup);
        const el = document.createElement('div');
        el.className = 'sm-marker';
        el.style.setProperty('--mc', grp.color);
        el.style.background = grp.color;
        el.style.color = light ? '#1a1a1a' : '#fff';
        el.textContent = String(pub.id);
        markersRef.current[pub.id] = el;
        el.addEventListener('click', () => selectPub(pub.id));
        new maplibregl.Marker({ element: el }).setLngLat([pub.lng, pub.lat]).addTo(map);
      });

      // Select first pub
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

  // ---- resize map when toggled ----
  useEffect(() => {
    if (showMap) {
      setTimeout(() => mapRef.current?.resize(), 50);
    }
  }, [showMap]);

  // ---- render ----

  const activePub = monopolyPubs.find((p) => p.id === activePubId);
  const activeGroup = activePub ? monopolyColorGroups[activePub.colorGroup] : monopolyColorGroups['brown'];

  return (
    <section>
      {/* Section header */}
      <div className="text-center py-10 px-6" style={{ background: 'var(--surface)' }}>
        <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-3">
          The Route
        </p>
        <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
          {monopolyStats.totalPubs} Pubs to Visit
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
      <div className="sm-layout">
        {/* Map panel */}
        <div className={`sm-map-panel ${showMap ? '' : 'sm-map-hidden'}`}>
          <div ref={mapContainerRef} className="sm-map" />

          {/* Progress pill */}
          <div className="sm-progress">
            <div className="sm-pbar">
              <div
                className="sm-pfill"
                style={{ width: `${(activePubId / 26) * 100}%`, background: activeGroup.color }}
              />
            </div>
            <span className="sm-pdot" style={{ background: activeGroup.color }} />
            <span className="sm-plabel">{activePubId}/26</span>
          </div>
        </div>

        {/* Card list panel */}
        <div ref={listRef} className="sm-list">
          {monopolyPubs.map((pub, i) => {
            const g = monopolyColorGroups[pub.colorGroup];
            const light = ['yellow', 'lightBlue'].includes(pub.colorGroup);
            const bandText = light ? '#1a1a1a' : '#fff';
            const isActive = activePubId === pub.id;

            return (
              <div key={pub.id}>
                <div
                  ref={setCardRef(pub.id)}
                  className={`sm-card ${isActive ? 'sm-card-active' : ''}`}
                  onClick={() => selectPub(pub.id)}
                  style={{ borderLeftColor: isActive ? g.color : 'transparent' }}
                >
                  {/* Compact row */}
                  <div className="sm-card-header">
                    <div
                      className="sm-card-num"
                      style={{ background: g.color, color: bandText }}
                    >
                      {pub.id}
                    </div>
                    <div className="sm-card-title">
                      <div className="sm-card-property" style={{ color: g.color }}>
                        {pub.property}
                      </div>
                      <div className="sm-card-pubname">{pub.pubName}</div>
                    </div>
                  </div>

                  {/* Expanded deed card */}
                  {isActive && (
                    <div className="sm-deed">
                      {/* Monopoly colour band */}
                      <div className="sm-deed-band" style={{ background: g.color, color: bandText }}>
                        {pub.property}
                      </div>

                      <div className="sm-deed-body">
                        <h3 className="sm-deed-name font-display">{pub.pubName}</h3>
                        <p className="sm-deed-addr">{pub.address}, {pub.postcode}</p>

                        <p className="sm-deed-review font-card">{trimReview(pub.review)}</p>

                        <div className="sm-deed-actions">
                          <a
                            href={getMonopolyMapsUrl(pub)}
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
                          {pub.transportToNext && i < monopolyPubs.length - 1 && (
                            <a
                              href={getMonopolyDirectionsUrl(pub, monopolyPubs[i + 1])}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{ color: g.color }}
                            >
                              Directions →
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
           MOBILE (default — below lg)
           =========================================== */

        .sm-layout {
          display: flex;
          flex-direction: column;
        }

        /* Map: top of screen */
        .sm-map-panel {
          position: relative;
          height: 35vh;
          min-height: 240px;
          transition: height 0.3s ease;
          overflow: hidden;
        }
        .sm-map-panel.sm-map-hidden {
          height: 0;
          min-height: 0;
        }
        .sm-map {
          position: absolute;
          inset: 0;
        }

        /* Progress pill */
        .sm-progress {
          position: absolute;
          bottom: 12px;
          left: 12px;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(255,241,229,0.9);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 16px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--ink);
        }
        .sm-pbar {
          width: 40px; height: 3px; border-radius: 2px;
          background: rgba(0,0,0,0.08); overflow: hidden;
        }
        .sm-pfill {
          height: 100%; border-radius: 2px; transition: width 0.4s ease;
        }
        .sm-pdot { width: 6px; height: 6px; border-radius: 50%; }
        .sm-plabel { white-space: nowrap; }

        /* Pub list: below map, scrollable */
        .sm-list {
          overflow-y: auto;
          background: var(--background);
          max-height: 55vh;
        }

        /* Card row */
        .sm-card {
          padding: 14px 16px;
          cursor: pointer;
          border-left: 3px solid transparent;
          transition: background 0.15s ease;
        }
        .sm-card:hover { background: var(--surface); }
        .sm-card-active { background: var(--surface); }

        /* Card header */
        .sm-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sm-card-num {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; flex-shrink: 0;
        }
        .sm-card-title { flex: 1; min-width: 0; }
        .sm-card-property {
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          line-height: 1;
        }
        .sm-card-pubname {
          font-size: 14px; font-weight: 700; color: var(--ink);
          line-height: 1.3; margin-top: 1px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* ---- Deed card (expanded) — mobile ---- */
        .sm-deed {
          margin-top: 10px;
          border: 2px solid #000;
          border-radius: 3px;
          overflow: hidden;
          background: #fff;
        }
        .sm-deed-band {
          padding: 10px 16px;
          text-align: center;
          font-family: var(--font-label);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          border-bottom: 2px solid #000;
        }
        .sm-deed-body {
          padding: 12px 16px;
        }
        .sm-deed-name {
          font-size: 18px; font-weight: 700; color: #000;
          text-align: center; text-transform: uppercase;
          letter-spacing: -0.01em; margin: 0 0 4px; line-height: 1.2;
        }
        .sm-deed-addr {
          font-size: 11px; color: #666; text-align: center; margin: 0 0 10px;
        }
        .sm-deed-review {
          font-size: 13px; line-height: 1.6; color: #444; margin: 0 0 12px;
        }
        .sm-deed-actions {
          display: flex; flex-wrap: wrap; gap: 6px 14px;
          padding-top: 10px; border-top: 1px solid #ddd;
        }
        .sm-deed-actions a {
          font-size: 10px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.03em;
          color: var(--teal); text-decoration: none;
        }
        .sm-deed-actions a:hover { text-decoration: underline; }

        /* ===========================================
           DESKTOP (lg and above)
           =========================================== */

        @media (min-width: 1024px) {
          .sm-layout {
            flex-direction: row;
            height: 85vh;
            border-top: 2px solid var(--ink);
            border-bottom: 2px solid var(--ink);
          }

          /* Map: left side, takes majority of width */
          .sm-map-panel {
            flex: 1;
            height: 100%;
            min-height: 0;
            border-right: 2px solid var(--ink);
          }
          .sm-map-panel.sm-map-hidden {
            height: 100%;
            min-height: 0;
          }

          /* Pub list: right side, fixed narrow column */
          .sm-list {
            width: 320px !important;
            max-width: 320px !important;
            max-height: none;
            min-height: 0;
            flex-shrink: 0;
            flex-grow: 0;
          }

          /* Tighter rows on desktop */
          .sm-card {
            padding: 10px 14px;
          }
          .sm-card-header { gap: 8px; }
          .sm-card-num {
            width: 24px; height: 24px; font-size: 10px;
          }
          .sm-card-property { font-size: 9px; }
          .sm-card-pubname { font-size: 12px; }

          /* Deed card: fixed portrait size, centred */
          .sm-deed {
            width: 280px;
            height: 400px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            flex-direction: column;
          }
          .sm-deed-band {
            padding: 8px 10px;
            font-size: 9px;
          }
          .sm-deed-body {
            padding: 10px 14px;
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }
          .sm-deed-name { font-size: 14px; margin: 0 0 2px; }
          .sm-deed-addr { font-size: 9px; margin: 0 0 6px; }
          .sm-deed-review {
            font-size: 10px; line-height: 1.5;
            margin: 0 0 6px; flex: 1;
          }
          .sm-deed-actions {
            padding-top: 6px; gap: 4px 8px; margin-top: auto;
          }
          .sm-deed-actions a { font-size: 8px; }
        }
      `}</style>

      <style jsx global>{`
        .sm-marker {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%;
          font-weight: 700; font-size: 0.65rem;
          border: 2px solid rgba(255,255,255,0.9);
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        }
        .sm-marker.sm-active {
          transform: scale(1.5);
          z-index: 20 !important;
          border-color: #000;
          box-shadow: 0 0 0 4px rgba(0,0,0,0.1), 0 2px 8px var(--mc, rgba(0,0,0,0.15));
          opacity: 1 !important;
        }
        .sm-marker.sm-dim { opacity: 0.4; }
        .sm-marker:hover {
          transform: scale(1.3);
          opacity: 1 !important;
          z-index: 15 !important;
        }
      `}</style>
    </section>
  );
}
