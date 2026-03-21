'use client';

import { useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { BasePub } from '@/content/crawls/types';
import { ScrollMapTheme } from '@/lib/mapTypes';

const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);

export interface CrawlMapHandle {
  flyTo: (pubId: number) => void;
  highlight: (pubId: number) => void;
  resetView: () => void;
  resize: () => void;
}

interface CrawlMapProps {
  pubs: BasePub[];
  theme: ScrollMapTheme;
  routeSegments?: (number[][] | null)[];
  isWalking?: (pub: BasePub) => boolean;
  createMarker?: (pub: BasePub) => HTMLDivElement;
  onMarkerClick?: (pubId: number) => void;
}

const CrawlMap = forwardRef<CrawlMapHandle, CrawlMapProps>(function CrawlMap(
  { pubs, theme, routeSegments, isWalking, createMarker, onMarkerClick },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<number, HTMLDivElement>>({});
  const onMarkerClickRef = useRef(onMarkerClick);
  onMarkerClickRef.current = onMarkerClick;

  // Build route GeoJSON
  type Seg = { coords: number[][]; walking: boolean };
  const segs: Seg[] = [];
  for (let i = 0; i < pubs.length - 1; i++) {
    const walking = isWalking ? isWalking(pubs[i]) : true;
    const osrm = routeSegments?.[i];
    if (walking && osrm && osrm.length > 0) {
      segs.push({ coords: osrm, walking: true });
    } else {
      segs.push({ coords: [[pubs[i].lng, pubs[i].lat], [pubs[i + 1].lng, pubs[i + 1].lat]], walking: false });
    }
  }
  const segsRef = useRef(segs);
  segsRef.current = segs;

  const buildGeoJSON = useCallback(() => ({
    type: 'FeatureCollection' as const,
    features: segsRef.current.map((s, i) => ({
      type: 'Feature' as const,
      properties: { walking: s.walking, index: i },
      geometry: { type: 'LineString' as const, coordinates: s.coords },
    })),
  }), []);

  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    flyTo(pubId: number) {
      const pub = pubs.find(p => p.id === pubId);
      const map = mapRef.current;
      if (!pub || !map) return;
      map.flyTo({ center: [pub.lng, pub.lat], zoom: 15.5, duration: 800, essential: true, easing: EASE_OUT_CUBIC });
    },
    highlight(pubId: number) {
      Object.entries(markersRef.current).forEach(([id, el]) => {
        const n = parseInt(id);
        if (n === pubId) { el.classList.add('bsm-active'); el.classList.remove('bsm-dim'); }
        else { el.classList.remove('bsm-active'); el.classList.add('bsm-dim'); }
      });
    },
    resetView() {
      const map = mapRef.current;
      if (!map) return;
      const bounds = new maplibregl.LngLatBounds();
      pubs.forEach(p => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 40, maxZoom: 14, duration: 800 });
      Object.values(markersRef.current).forEach(el => el.classList.remove('bsm-active', 'bsm-dim'));
    },
    resize() {
      mapRef.current?.resize();
    },
  }), [pubs]);

  // Init map
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
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
      pubs.forEach(p => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 40, maxZoom: 14, duration: 0 });

      map.addSource('route', { type: 'geojson', data: buildGeoJSON() as GeoJSON.FeatureCollection });
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

      pubs.forEach(pub => {
        let el: HTMLDivElement;
        if (createMarker) { el = createMarker(pub as never); }
        else {
          el = document.createElement('div');
          el.className = 'bsm-marker';
          el.style.background = theme.markerColor;
          el.style.color = theme.markerTextColor;
          el.textContent = String(pub.id);
        }
        markersRef.current[pub.id] = el;
        el.addEventListener('click', () => onMarkerClickRef.current?.(pub.id));
        new maplibregl.Marker({ element: el }).setLngLat([pub.lng, pub.lat]).addTo(map);
      });
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; markersRef.current = {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resize on mount
  useEffect(() => {
    const t = setTimeout(() => mapRef.current?.resize(), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
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
    </>
  );
});

export default CrawlMap;
