'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { AggregatedPub } from '@/lib/pubs';

interface PubDirectoryMapProps {
  pubs: AggregatedPub[];
  crawlColors: Record<string, string>;
}

export default function PubDirectoryMap({ pubs, crawlColors }: PubDirectoryMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  // Init map once
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

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Update markers when pubs change (filtering)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const addMarkers = () => {
      const bounds = new maplibregl.LngLatBounds();

      pubs.forEach(pub => {
        const primaryCrawl = pub.crawls[0]?.crawlSlug ?? '';
        const color = crawlColors[primaryCrawl] ?? 'var(--claret)';

        const el = document.createElement('div');
        el.style.cssText = `
          width: 14px; height: 14px; border-radius: 50%;
          background: ${color}; border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3); cursor: pointer;
        `;

        const popup = new maplibregl.Popup({ offset: 15 }).setHTML(`
          <div style="font-family: var(--font-body); max-width: 200px;">
            <strong style="font-family: var(--font-display); font-size: 14px;">${pub.name}</strong>
            <p style="margin: 4px 0 0; font-size: 12px; color: #8A7060;">${pub.address}</p>
            <a href="/pubs/${pub.slug}" style="display: inline-block; margin-top: 6px; font-size: 12px; color: #0D7680;">View pub →</a>
          </div>
        `);

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([pub.coordinates.lng, pub.coordinates.lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
        bounds.extend([pub.coordinates.lng, pub.coordinates.lat]);
      });

      if (pubs.length > 0) {
        map.fitBounds(bounds, { padding: 50, maxZoom: 14, duration: 400 });
      }
    };

    if (map.loaded()) {
      addMarkers();
    } else {
      map.on('load', addMarkers);
    }
  }, [pubs, crawlColors]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
