'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  BermondseyPub,
  bermondseyPubs,
  bermondseyStats,
  getBermondseyMapsUrl,
  getBermondseyDirectionsUrl,
} from '@/content/crawls/bermondseybm';

function trimReview(review: string): string {
  const sentences = review.match(/[^.!?]+[.!?]+/g) || [review];
  if (sentences.length <= 3) return review;
  return sentences.slice(0, 3).join('').trim();
}

const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);
const AMBER = '#D4A03C';
const AMBER_DARK = '#1a1a1a';

export default function BermondseyScrollMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<number, HTMLDivElement>>({});
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const [activePubId, setActivePubId] = useState<number>(1);
  const [showMap, setShowMap] = useState(true);

  const setCardRef = useCallback(
    (pubId: number) => (el: HTMLDivElement | null) => { cardRefs.current[pubId] = el; }, [],
  );

  const flyToPub = useCallback((pub: BermondseyPub) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({ center: [pub.lng, pub.lat], zoom: 16, duration: 1200, essential: true, easing: EASE_OUT_CUBIC });
  }, []);

  const highlightMarker = useCallback((activeId: number) => {
    Object.entries(markersRef.current).forEach(([id, el]) => {
      const n = parseInt(id);
      if (n === activeId) { el.classList.add('bm-active'); el.classList.remove('bm-dim'); }
      else { el.classList.remove('bm-active'); el.classList.add('bm-dim'); }
    });
  }, []);

  const drawRouteTo = useCallback((pubIndex: number) => {
    const map = mapRef.current;
    if (!map) return;
    const src = map.getSource('route-progress') as maplibregl.GeoJSONSource;
    if (!src) return;
    src.setData({
      type: 'Feature', properties: {},
      geometry: { type: 'LineString', coordinates: bermondseyPubs.slice(0, pubIndex + 1).map((p) => [p.lng, p.lat]) },
    });
  }, []);

  const scrollCardIntoView = useCallback((pubId: number) => {
    setTimeout(() => {
      const el = cardRefs.current[pubId];
      if (el && listRef.current) {
        const listTop = listRef.current.getBoundingClientRect().top;
        const cardTop = el.getBoundingClientRect().top;
        listRef.current.scrollTo({ top: cardTop - listTop + listRef.current.scrollTop - 8, behavior: 'smooth' });
      }
    }, 50);
  }, []);

  const selectPub = useCallback(
    (pubId: number) => {
      const pub = bermondseyPubs.find((p) => p.id === pubId);
      if (!pub) return;
      setActivePubId(pubId);
      flyToPub(pub);
      highlightMarker(pubId);
      drawRouteTo(pubId - 1);
      scrollCardIntoView(pubId);
    },
    [flyToPub, highlightMarker, drawRouteTo, scrollCardIntoView],
  );

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [-0.07, 51.497],
      zoom: 14,
      scrollZoom: false, dragRotate: false, touchZoomRotate: true, touchPitch: false,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      const bounds = new maplibregl.LngLatBounds();
      bermondseyPubs.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 50, maxZoom: 15, duration: 0 });

      map.addSource('route-bg', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: bermondseyPubs.map((p) => [p.lng, p.lat]) } },
      });
      map.addLayer({ id: 'route-bg-line', type: 'line', source: 'route-bg', paint: { 'line-color': AMBER, 'line-width': 3, 'line-opacity': 0.5 } });

      map.addSource('route-progress', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [] } },
      });
      map.addLayer({ id: 'route-progress-line', type: 'line', source: 'route-progress', paint: { 'line-color': AMBER, 'line-width': 4, 'line-opacity': 0.9 } });

      bermondseyPubs.forEach((pub) => {
        const el = document.createElement('div');
        el.className = 'bm-marker';
        el.textContent = String(pub.id);
        markersRef.current[pub.id] = el;
        el.addEventListener('click', () => selectPub(pub.id));
        new maplibregl.Marker({ element: el }).setLngLat([pub.lng, pub.lat]).addTo(map);
      });
      highlightMarker(1);
      drawRouteTo(0);
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; markersRef.current = {}; };
  }, [selectPub, highlightMarker, drawRouteTo]);

  useEffect(() => { if (showMap) setTimeout(() => mapRef.current?.resize(), 50); }, [showMap]);

  return (
    <section>
      <div className="text-center py-10 px-6" style={{ background: 'var(--surface)' }}>
        <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-3">The Route</p>
        <h2 className="font-display text-3xl font-bold text-[var(--ink)]">{bermondseyStats.totalPubs} Stops on the Mile</h2>
      </div>

      <div className="lg:hidden" style={{ borderBottom: '1px solid var(--surface)' }}>
        <button onClick={() => setShowMap(!showMap)} className="w-full py-3 px-4 flex items-center justify-between text-sm font-semibold" style={{ background: 'var(--background)', color: 'var(--ink)' }}>
          <span>{showMap ? 'Hide map' : 'Show map'}</span>
          <svg className="w-4 h-4 transition-transform" style={{ transform: showMap ? 'rotate(180deg)' : 'rotate(0)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>

      <div className="bm-layout">
        <div className={`bm-map-panel ${showMap ? '' : 'bm-map-hidden'}`}>
          <div ref={mapContainerRef} className="bm-map" />
          <div className="bm-progress">
            <div className="bm-pbar"><div className="bm-pfill" style={{ width: `${(activePubId / 8) * 100}%`, background: AMBER }} /></div>
            <span className="bm-plabel">{activePubId}/8</span>
          </div>
        </div>

        <div ref={listRef} className="bm-list">
          {bermondseyPubs.map((pub, i) => {
            const isActive = activePubId === pub.id;
            return (
              <div key={pub.id}>
                <div ref={setCardRef(pub.id)} className={`bm-card ${isActive ? 'bm-card-active' : ''}`} onClick={() => selectPub(pub.id)} style={{ borderLeftColor: isActive ? AMBER : 'transparent' }}>
                  <div className="bm-card-header">
                    <div className="bm-card-num">{pub.id}</div>
                    <div className="bm-card-title"><div className="bm-card-pubname">{pub.pubName}</div></div>
                  </div>

                  {isActive && (
                    <div className="bm-stop">
                      <div className="bm-stop-header">
                        <div className="bm-stop-style font-label">{pub.style}</div>
                        <h3 className="bm-stop-name font-display">{pub.pubName}</h3>
                      </div>
                      <div className="bm-stop-body">
                        <p className="bm-stop-addr">{pub.address}, {pub.postcode}</p>
                        <p className="bm-stop-review font-card">{trimReview(pub.review)}</p>
                        <div className="bm-stop-actions">
                          <a href={getBermondseyMapsUrl(pub)} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Open in Maps</a>
                          {pub.website && <a href={pub.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Website</a>}
                          {pub.walkToNext && i < bermondseyPubs.length - 1 && (
                            <a href={getBermondseyDirectionsUrl(pub, bermondseyPubs[i + 1])} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: AMBER }}>{pub.walkToNext} →</a>
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

      <style jsx>{`
        .bm-layout { display: flex; flex-direction: column; }
        .bm-map-panel { position: relative; height: 35vh; min-height: 240px; transition: height 0.3s ease; overflow: hidden; }
        .bm-map-panel.bm-map-hidden { height: 0; min-height: 0; }
        .bm-map { position: absolute; inset: 0; }

        .bm-progress {
          position: absolute; bottom: 12px; left: 12px; z-index: 5;
          display: flex; align-items: center; gap: 8px; padding: 6px 12px;
          background: rgba(255,241,229,0.9); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          border-radius: 16px; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; color: var(--ink);
        }
        .bm-pbar { width: 40px; height: 3px; border-radius: 2px; background: rgba(0,0,0,0.1); overflow: hidden; }
        .bm-pfill { height: 100%; border-radius: 2px; transition: width 0.4s ease; }
        .bm-plabel { white-space: nowrap; }

        .bm-list { overflow-y: auto; background: var(--background); max-height: 55vh; }

        .bm-card { padding: 14px 16px; cursor: pointer; border-left: 3px solid transparent; transition: background 0.15s ease; }
        .bm-card:hover { background: var(--surface); }
        .bm-card-active { background: var(--surface); }

        .bm-card-header { display: flex; align-items: center; gap: 10px; }
        .bm-card-num {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; flex-shrink: 0;
          background: ${AMBER}; color: ${AMBER_DARK};
          border: 2px solid ${AMBER_DARK};
        }
        .bm-card-title { flex: 1; min-width: 0; }
        .bm-card-pubname {
          font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.3;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .bm-stop {
          margin-top: 10px; border: 2px solid ${AMBER_DARK}; border-radius: 3px;
          overflow: hidden; background: #F5F0E6;
        }
        .bm-stop-header {
          padding: 12px 16px; background: ${AMBER}; text-align: center;
          border-bottom: 2px solid ${AMBER_DARK};
        }
        .bm-stop-style {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.14em; color: #fff; margin-bottom: 4px;
        }
        .bm-stop-name {
          font-size: 18px; font-weight: 700; color: ${AMBER_DARK};
          margin: 0; line-height: 1.2;
        }
        .bm-stop-body { padding: 12px 16px; }
        .bm-stop-addr { font-size: 11px; color: #888; margin: 0 0 10px; }
        .bm-stop-review { font-size: 13px; line-height: 1.6; color: #444; margin: 0 0 12px; }
        .bm-stop-actions {
          display: flex; flex-wrap: wrap; gap: 6px 14px;
          padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.1);
        }
        .bm-stop-actions a {
          font-size: 10px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.03em; color: var(--teal); text-decoration: none;
        }
        .bm-stop-actions a:hover { text-decoration: underline; }

        @media (min-width: 1024px) {
          .bm-layout {
            flex-direction: row; height: 85vh;
            border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink);
          }
          .bm-map-panel { flex: 1; height: 100%; min-height: 0; border-right: 2px solid var(--ink); }
          .bm-map-panel.bm-map-hidden { height: 100%; min-height: 0; }
          .bm-list {
            width: 320px !important; max-width: 320px !important;
            max-height: none; min-height: 0; flex-shrink: 0; flex-grow: 0;
          }
          .bm-card { padding: 10px 14px; }
          .bm-card-header { gap: 8px; }
          .bm-card-num { width: 24px; height: 24px; font-size: 10px; }
          .bm-card-pubname { font-size: 12px; }
          .bm-stop { width: 280px; margin-left: auto; margin-right: auto; display: flex; flex-direction: column; }
          .bm-stop-header { padding: 10px 14px; }
          .bm-stop-style { font-size: 9px; }
          .bm-stop-name { font-size: 14px; }
          .bm-stop-body { padding: 10px 14px; flex: 1; display: flex; flex-direction: column; overflow-y: auto; }
          .bm-stop-addr { font-size: 9px; margin: 0 0 6px; }
          .bm-stop-review { font-size: 10px; line-height: 1.5; margin: 0 0 6px; flex: 1; }
          .bm-stop-actions { padding-top: 6px; gap: 4px 8px; margin-top: auto; }
          .bm-stop-actions a { font-size: 8px; }
        }
      `}</style>

      <style jsx global>{`
        .bm-marker {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%;
          font-weight: 700; font-size: 0.65rem;
          background: ${AMBER}; color: ${AMBER_DARK};
          border: 2px solid ${AMBER_DARK};
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        }
        .bm-marker.bm-active {
          transform: scale(1.5); z-index: 20 !important;
          border-color: ${AMBER_DARK};
          box-shadow: 0 0 0 4px rgba(212,160,60,0.25), 0 2px 8px rgba(0,0,0,0.25);
          opacity: 1 !important;
        }
        .bm-marker.bm-dim { opacity: 0.4; }
        .bm-marker:hover { transform: scale(1.3); opacity: 1 !important; z-index: 15 !important; }
      `}</style>
    </section>
  );
}
