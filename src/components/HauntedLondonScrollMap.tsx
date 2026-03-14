'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  HauntedLondonPub,
  hauntedLondonPubs,
  hauntedLondonStats,
  getHauntedLondonMapsUrl,
  getHauntedLondonDirectionsUrl,
} from '@/content/crawls/hauntedlondon';

function trimReview(review: string): string {
  const sentences = review.match(/[^.!?]+[.!?]+/g) || [review];
  if (sentences.length <= 3) return review;
  return sentences.slice(0, 3).join('').trim();
}

const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);
const HAUNTED = '#2C1810';
const HAUNTED_LIGHT = '#E8DDD0';

export default function HauntedLondonScrollMap() {
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

  const flyToPub = useCallback((pub: HauntedLondonPub) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({ center: [pub.lng, pub.lat], zoom: 15.5, duration: 1200, essential: true, easing: EASE_OUT_CUBIC });
  }, []);

  const highlightMarker = useCallback((activeId: number) => {
    Object.entries(markersRef.current).forEach(([id, el]) => {
      const n = parseInt(id);
      if (n === activeId) { el.classList.add('hn-active'); el.classList.remove('hn-dim'); }
      else { el.classList.remove('hn-active'); el.classList.add('hn-dim'); }
    });
  }, []);

  const drawRouteTo = useCallback((pubIndex: number) => {
    const map = mapRef.current;
    if (!map) return;
    const src = map.getSource('route-progress') as maplibregl.GeoJSONSource;
    if (!src) return;
    src.setData({
      type: 'Feature', properties: {},
      geometry: { type: 'LineString', coordinates: hauntedLondonPubs.slice(0, pubIndex + 1).map((p) => [p.lng, p.lat]) },
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
      const pub = hauntedLondonPubs.find((p) => p.id === pubId);
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
      center: [-0.1, 51.52],
      zoom: 12,
      scrollZoom: false, dragRotate: false, touchZoomRotate: true, touchPitch: false,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      const bounds = new maplibregl.LngLatBounds();
      hauntedLondonPubs.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 50, maxZoom: 14, duration: 0 });

      map.addSource('route-bg', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: hauntedLondonPubs.map((p) => [p.lng, p.lat]) } },
      });
      map.addLayer({ id: 'route-bg-line', type: 'line', source: 'route-bg', paint: { 'line-color': HAUNTED, 'line-width': 3, 'line-opacity': 0.5 } });

      map.addSource('route-progress', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [] } },
      });
      map.addLayer({ id: 'route-progress-line', type: 'line', source: 'route-progress', paint: { 'line-color': HAUNTED, 'line-width': 4, 'line-opacity': 0.9 } });

      hauntedLondonPubs.forEach((pub) => {
        const el = document.createElement('div');
        el.className = 'hn-marker';
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
        <h2 className="font-display text-3xl font-bold text-[var(--ink)]">{hauntedLondonStats.totalPubs} Pubs to Visit</h2>
      </div>

      <div className="lg:hidden" style={{ borderBottom: '1px solid var(--surface)' }}>
        <button onClick={() => setShowMap(!showMap)} className="w-full py-3 px-4 flex items-center justify-between text-sm font-semibold" style={{ background: 'var(--background)', color: 'var(--ink)' }}>
          <span>{showMap ? 'Hide map' : 'Show map'}</span>
          <svg className="w-4 h-4 transition-transform" style={{ transform: showMap ? 'rotate(180deg)' : 'rotate(0)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>

      <div className="hn-layout">
        <div className={`hn-map-panel ${showMap ? '' : 'hn-map-hidden'}`}>
          <div ref={mapContainerRef} className="hn-map" />
          <div className="hn-progress">
            <div className="hn-pbar"><div className="hn-pfill" style={{ width: `${(activePubId / 8) * 100}%`, background: HAUNTED }} /></div>
            <span className="hn-plabel">{activePubId}/8</span>
          </div>
        </div>

        <div ref={listRef} className="hn-list">
          {hauntedLondonPubs.map((pub, i) => {
            const isActive = activePubId === pub.id;
            return (
              <div key={pub.id}>
                <div ref={setCardRef(pub.id)} className={`hn-card ${isActive ? 'hn-card-active' : ''}`} onClick={() => selectPub(pub.id)} style={{ borderLeftColor: isActive ? HAUNTED : 'transparent' }}>
                  <div className="hn-card-header">
                    <div className="hn-card-num">{pub.id}</div>
                    <div className="hn-card-title"><div className="hn-card-pubname">{pub.pubName}</div></div>
                  </div>

                  {isActive && (
                    <div className="hn-stop">
                      <div className="hn-stop-header">
                        <div className="hn-stop-ghost font-label">{pub.ghost}</div>
                        <h3 className="hn-stop-name font-display">{pub.pubName}</h3>
                      </div>
                      <div className="hn-stop-body">
                        <p className="hn-stop-addr">{pub.address}, {pub.postcode}</p>
                        <p className="hn-stop-review font-card">{trimReview(pub.review)}</p>
                        <div className="hn-stop-actions">
                          <a href={getHauntedLondonMapsUrl(pub)} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Open in Maps</a>
                          {pub.website && <a href={pub.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Website</a>}
                          {pub.walkToNext && i < hauntedLondonPubs.length - 1 && (
                            <a href={getHauntedLondonDirectionsUrl(pub, hauntedLondonPubs[i + 1])} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: HAUNTED }}>{pub.walkToNext} →</a>
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
        .hn-layout { display: flex; flex-direction: column; }
        .hn-map-panel { position: relative; height: 35vh; min-height: 240px; transition: height 0.3s ease; overflow: hidden; }
        .hn-map-panel.hn-map-hidden { height: 0; min-height: 0; }
        .hn-map { position: absolute; inset: 0; }

        .hn-progress {
          position: absolute; bottom: 12px; left: 12px; z-index: 5;
          display: flex; align-items: center; gap: 8px; padding: 6px 12px;
          background: rgba(255,241,229,0.9); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          border-radius: 16px; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; color: var(--ink);
        }
        .hn-pbar { width: 40px; height: 3px; border-radius: 2px; background: rgba(0,0,0,0.1); overflow: hidden; }
        .hn-pfill { height: 100%; border-radius: 2px; transition: width 0.4s ease; }
        .hn-plabel { white-space: nowrap; }

        .hn-list { overflow-y: auto; background: var(--background); max-height: 55vh; }

        .hn-card { padding: 14px 16px; cursor: pointer; border-left: 3px solid transparent; transition: background 0.15s ease; }
        .hn-card:hover { background: var(--surface); }
        .hn-card-active { background: var(--surface); }

        .hn-card-header { display: flex; align-items: center; gap: 10px; }
        .hn-card-num {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; flex-shrink: 0;
          background: ${HAUNTED}; color: ${HAUNTED_LIGHT};
        }
        .hn-card-title { flex: 1; min-width: 0; }
        .hn-card-pubname {
          font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.3;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .hn-stop {
          margin-top: 10px; border: 2px solid ${HAUNTED}; border-radius: 2px;
          overflow: hidden; background: ${HAUNTED_LIGHT};
        }
        .hn-stop-header {
          padding: 12px 16px; background: ${HAUNTED}; text-align: center;
        }
        .hn-stop-ghost {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.14em; color: rgba(232,221,208,0.7); margin-bottom: 4px;
        }
        .hn-stop-name {
          font-size: 18px; font-weight: 700; color: ${HAUNTED_LIGHT};
          margin: 0; line-height: 1.2;
        }
        .hn-stop-body { padding: 12px 16px; }
        .hn-stop-addr { font-size: 11px; color: #888; font-style: italic; margin: 0 0 10px; }
        .hn-stop-review { font-size: 13px; line-height: 1.6; color: #444; margin: 0 0 12px; }
        .hn-stop-actions {
          display: flex; flex-wrap: wrap; gap: 6px 14px;
          padding-top: 10px; border-top: 1px solid rgba(44,24,16,0.15);
        }
        .hn-stop-actions a {
          font-size: 10px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.03em; color: var(--teal); text-decoration: none;
        }
        .hn-stop-actions a:hover { text-decoration: underline; }

        @media (min-width: 1024px) {
          .hn-layout {
            flex-direction: row; height: 85vh;
            border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink);
          }
          .hn-map-panel { flex: 1; height: 100%; min-height: 0; border-right: 2px solid var(--ink); }
          .hn-map-panel.hn-map-hidden { height: 100%; min-height: 0; }
          .hn-list {
            width: 320px !important; max-width: 320px !important;
            max-height: none; min-height: 0; flex-shrink: 0; flex-grow: 0;
          }
          .hn-card { padding: 10px 14px; }
          .hn-card-header { gap: 8px; }
          .hn-card-num { width: 24px; height: 24px; font-size: 10px; }
          .hn-card-pubname { font-size: 12px; }
          .hn-stop { width: 280px; margin-left: auto; margin-right: auto; display: flex; flex-direction: column; }
          .hn-stop-header { padding: 10px 14px; }
          .hn-stop-ghost { font-size: 9px; }
          .hn-stop-name { font-size: 14px; }
          .hn-stop-body { padding: 10px 14px; flex: 1; display: flex; flex-direction: column; overflow-y: auto; }
          .hn-stop-addr { font-size: 9px; margin: 0 0 6px; }
          .hn-stop-review { font-size: 10px; line-height: 1.5; margin: 0 0 6px; flex: 1; }
          .hn-stop-actions { padding-top: 6px; gap: 4px 8px; margin-top: auto; }
          .hn-stop-actions a { font-size: 8px; }
        }
      `}</style>

      <style jsx global>{`
        .hn-marker {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%;
          font-weight: 700; font-size: 0.65rem;
          background: ${HAUNTED}; color: ${HAUNTED_LIGHT};
          border: 2px solid rgba(232,221,208,0.6);
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .hn-marker.hn-active {
          transform: scale(1.5); z-index: 20 !important;
          border-color: ${HAUNTED_LIGHT};
          box-shadow: 0 0 0 4px rgba(44,24,16,0.2), 0 2px 8px rgba(0,0,0,0.3);
          opacity: 1 !important;
        }
        .hn-marker.hn-dim { opacity: 0.4; }
        .hn-marker:hover { transform: scale(1.3); opacity: 1 !important; z-index: 15 !important; }
      `}</style>
    </section>
  );
}
