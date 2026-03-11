'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { CircleLinePub, circleLinePubs } from '@/content/crawls/circleline';

interface CircleLineMapProps {
  onPubSelect?: (pub: CircleLinePub) => void;
  selectedPub?: CircleLinePub | null;
}

export default function CircleLineMap({ onPubSelect, selectedPub }: CircleLineMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<number, HTMLDivElement>>({});

  // Highlight active marker when selectedPub changes
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, el]) => {
      if (selectedPub && parseInt(id) === selectedPub.id) {
        el.classList.add('circle-line-marker--active');
      } else {
        el.classList.remove('circle-line-marker--active');
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
    circleLinePubs.forEach((p) => bounds.extend([p.lng, p.lat]));
    map.fitBounds(bounds, { padding: 50, maxZoom: 13 });

    map.on('load', () => {
      // Route line source - create the circle shape
      map.addSource('route', {
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

      // Route line - background (wider, Circle Line yellow)
      map.addLayer({
        id: 'route-line-bg',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#FFD300',
          'line-width': 6,
          'line-opacity': 0.25,
        },
      });

      // Route line - foreground (Circle Line yellow, solid)
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#FFD300',
          'line-width': 4,
          'line-opacity': 0.9,
        },
      });

      // Add markers (tube roundel style)
      circleLinePubs.forEach((pub) => {
        const el = document.createElement('div');
        el.className = 'circle-line-marker';
        el.textContent = String(pub.id);
        el.dataset.pubId = String(pub.id);

        // Store ref for highlighting
        markersRef.current[pub.id] = el;

        // Hover: scale up
        el.addEventListener('mouseenter', () => {
          el.classList.add('circle-line-marker--hover');
        });
        el.addEventListener('mouseleave', () => {
          el.classList.remove('circle-line-marker--hover');
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
        /* Tube Roundel Style Markers */
        .circle-line-marker {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          font-weight: 700;
          font-size: 0.7rem;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;

          /* TfL roundel colors */
          background: #003688;
          color: #fff;
          border: 3px solid #FFD300;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }
        .circle-line-marker--hover,
        .circle-line-marker:hover {
          transform: scale(1.35);
          z-index: 10 !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .circle-line-marker--active {
          transform: scale(1.4);
          z-index: 20 !important;
          border-color: #fff;
          box-shadow: 0 0 0 3px #FFD300, 0 2px 8px rgba(0,0,0,0.4);
        }
      `}</style>
    </>
  );
}
