'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { RipperPub, ripperPubs } from '@/content/crawls/ripper';

interface RipperMapProps {
  onPubSelect?: (pub: RipperPub) => void;
  selectedPub?: RipperPub | null;
}

export default function RipperMap({ onPubSelect, selectedPub }: RipperMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<number, HTMLDivElement>>({});

  // Highlight active marker when selectedPub changes
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, el]) => {
      if (selectedPub && parseInt(id) === selectedPub.id) {
        el.classList.add('ripper-marker--active');
      } else {
        el.classList.remove('ripper-marker--active');
      }
    });
  }, [selectedPub]);

  useEffect(() => {
    if (mapInstanceRef.current || !mapRef.current) return;

    const isMobile = window.innerWidth <= 768;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-0.0735, 51.5175],
      zoom: 14.5,
      scrollZoom: false,
      dragRotate: false,
      touchZoomRotate: true,
      touchPitch: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    // Enable two-finger touch gestures on mobile
    if (isMobile) {
      map.scrollZoom.disable();
      map.dragPan.enable();
    }

    // Auto-fit bounds to show all pubs
    const bounds = new maplibregl.LngLatBounds();
    ripperPubs.forEach((p) => bounds.extend([p.lng, p.lat]));
    map.fitBounds(bounds, { padding: 60, maxZoom: 15 });

    map.on('load', () => {
      // Route line source
      map.addSource('route', {
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

      // Route line - background (wider, dark blood red)
      map.addLayer({
        id: 'route-line-bg',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#4A0000',
          'line-width': 6,
          'line-opacity': 0.3,
        },
      });

      // Route line - foreground (blood red, dashed like cobblestones)
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#8B1A1A',
          'line-width': 3,
          'line-opacity': 0.8,
          'line-dasharray': [3, 2],
        },
      });

      // Add markers (Victorian gaslight style)
      ripperPubs.forEach((pub) => {
        const el = document.createElement('div');
        el.className = 'ripper-marker';
        el.textContent = String(pub.id);
        el.dataset.pubId = String(pub.id);

        // Store ref for highlighting
        markersRef.current[pub.id] = el;

        // Hover: scale up
        el.addEventListener('mouseenter', () => {
          el.classList.add('ripper-marker--hover');
        });
        el.addEventListener('mouseleave', () => {
          el.classList.remove('ripper-marker--hover');
        });

        // Click: open modal
        el.addEventListener('click', () => {
          if (onPubSelect) {
            onPubSelect(pub);
          }
        });

        new maplibregl.Marker({ element: el })
          .setLngLat([pub.lng, pub.lat])
          .addTo(map);
      });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current = {};
    };
  }, [onPubSelect]);

  return (
    <>
      <div className="map-wrapper">
        <div ref={mapRef} className="map-container" />
      </div>

      <style jsx>{`
        .map-wrapper {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          border: 2px solid #1C1C1C;
        }
        .map-container {
          height: 600px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .map-container {
            height: 400px;
          }
        }
      `}</style>

      <style jsx global>{`
        /* Victorian Gaslight Style Markers */
        .ripper-marker {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;

          /* Dark Victorian styling - blood red on black */
          background: #1C1C1C;
          color: #D4A853;
          border: 2px solid #8B1A1A;
          box-shadow: 0 0 8px rgba(139, 26, 26, 0.4), 0 2px 4px rgba(0,0,0,0.4);
        }
        .ripper-marker--hover,
        .ripper-marker:hover {
          transform: scale(1.35);
          z-index: 10 !important;
          box-shadow: 0 0 12px rgba(139, 26, 26, 0.6), 0 2px 8px rgba(0,0,0,0.5);
          border-color: #D4A853;
        }
        .ripper-marker--active {
          transform: scale(1.4);
          z-index: 20 !important;
          border-color: #D4A853;
          background: #8B1A1A;
          color: #fff;
          box-shadow: 0 0 16px rgba(139, 26, 26, 0.8), 0 2px 8px rgba(0,0,0,0.5);
        }
      `}</style>
    </>
  );
}
