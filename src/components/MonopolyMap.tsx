'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MonopolyPub, monopolyPubs, monopolyColorGroups } from '@/content/crawls/monopoly';

interface MonopolyMapProps {
  onPubSelect?: (pub: MonopolyPub) => void;
  selectedPub?: MonopolyPub | null;
}

export default function MonopolyMap({ onPubSelect, selectedPub }: MonopolyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<number, HTMLDivElement>>({});

  // Highlight active marker when selectedPub changes
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, el]) => {
      if (selectedPub && parseInt(id) === selectedPub.id) {
        el.classList.add('maplibre-marker--active');
      } else {
        el.classList.remove('maplibre-marker--active');
      }
    });
  }, [selectedPub]);

  useEffect(() => {
    if (mapInstanceRef.current || !mapRef.current) return;

    const isMobile = window.innerWidth <= 768;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-0.115, 51.51],
      zoom: 12,
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
    monopolyPubs.forEach((p) => bounds.extend([p.lng, p.lat]));
    map.fitBounds(bounds, { padding: 50, maxZoom: 14 });

    map.on('load', () => {
      // Route line source
      map.addSource('route', {
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

      // Route line — background (wider, for visual depth)
      map.addLayer({
        id: 'route-line-bg',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#D32F2F',
          'line-width': 5,
          'line-opacity': 0.15,
        },
      });

      // Route line — foreground (dashed)
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#D32F2F',
          'line-width': 3,
          'line-opacity': 0.7,
          'line-dasharray': [2, 2],
        },
      });

      // Add markers
      monopolyPubs.forEach((pub) => {
        const group = monopolyColorGroups[pub.colorGroup];
        const lightBands = ['yellow', 'lightBlue'];
        const textColor = lightBands.includes(pub.colorGroup) ? '#1a1a1a' : '#fff';

        const el = document.createElement('div');
        el.className = 'maplibre-marker';
        el.style.background = group.color;
        el.style.color = textColor;
        el.style.borderColor = group.color;
        el.textContent = String(pub.id);
        el.dataset.pubId = String(pub.id);

        // Store ref for highlighting
        markersRef.current[pub.id] = el;

        // Hover: scale up
        el.addEventListener('mouseenter', () => {
          el.classList.add('maplibre-marker--hover');
        });
        el.addEventListener('mouseleave', () => {
          el.classList.remove('maplibre-marker--hover');
        });

        // Click: open modal directly
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
          border: 2px solid #000;
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
        .maplibre-marker {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          font-weight: 700;
          font-size: 0.7rem;
          border: 2px solid #fff;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        }
        .maplibre-marker--hover,
        .maplibre-marker:hover {
          transform: scale(1.35);
          z-index: 10 !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        }
        .maplibre-marker--active {
          transform: scale(1.4);
          z-index: 20 !important;
          border-color: #000;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
}
