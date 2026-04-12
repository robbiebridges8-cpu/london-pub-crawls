'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface PubMapProps {
  lat: number;
  lng: number;
  name: string;
}

export default function PubMap({ lat, lng, name }: PubMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
      center: [lng, lat],
      zoom: 15,
      scrollZoom: false,
      dragRotate: false,
      touchZoomRotate: true,
      touchPitch: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    map.on('load', () => {
      const el = document.createElement('div');
      el.className = 'pub-map-marker';
      new maplibregl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(
          `<strong style="font-family: var(--font-display)">${name}</strong>`
        ))
        .addTo(map);
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [lat, lng, name]);

  return (
    <>
      <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '300px' }} />
      <style jsx global>{`
        .pub-map-marker {
          width: 20px; height: 20px; border-radius: 50%;
          background: var(--claret);
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </>
  );
}
