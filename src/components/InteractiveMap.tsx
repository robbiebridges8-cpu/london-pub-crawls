'use client';

import { useEffect, useRef, useState } from 'react';

interface MapLocation {
  name: string;
  lat: number;
  lng: number;
  number: number;
  description?: string;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  accentColor?: string;
  onMarkerClick?: (location: MapLocation) => void;
}

declare global {
  interface Window {
    L: any;
  }
}

export default function InteractiveMap({
  locations,
  accentColor = '#C47B10', // Gold by default
  onMarkerClick
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  useEffect(() => {
    // Check if Leaflet is already loaded
    if (typeof window !== 'undefined' && window.L && mapRef.current && !mapInstanceRef.current) {
      initializeMap();
    } else if (typeof window !== 'undefined' && !window.L) {
      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => {
        if (mapRef.current && !mapInstanceRef.current) {
          initializeMap();
        }
      };
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locations]);

  const initializeMap = () => {
    if (!mapRef.current || !window.L || locations.length === 0) return;

    const L = window.L;

    // Calculate center - default to London (51.505, -0.09) as per spec
    const centerLat = locations.length > 0
      ? locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length
      : 51.505;
    const centerLng = locations.length > 0
      ? locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length
      : -0.09;

    // Create map
    const map = L.map(mapRef.current, {
      center: [centerLat, centerLng],
      zoom: 12,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    // Use OpenStreetMap tiles as per spec
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Create custom marker icon per spec:
    // ink background (#1A0A00), gold number (#C47B10), white border
    const createMarkerIcon = (number: number, isSelected: boolean = false) => {
      const inkColor = '#1A0A00';
      const goldColor = '#C47B10';

      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: ${inkColor};
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${goldColor};
            font-weight: 700;
            font-size: 12px;
            font-family: var(--font-label);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
            ${isSelected ? `transform: scale(1.2); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);` : ''}
          ">
            ${number}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -20],
      });
    };

    // Add markers
    const markers: any[] = [];
    locations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: createMarkerIcon(location.number),
      }).addTo(map);

      // Create popup content per spec:
      // Pub name (Spectral bold) + stop number + drink + "Get Directions →"
      const popupContent = `
        <div style="padding: 8px; min-width: 200px; font-family: var(--font-body);">
          <div style="font-size: 11px; color: #C47B10; font-weight: 700; font-family: var(--font-label); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">
            Stop ${location.number}
          </div>
          <div style="font-size: 16px; font-weight: 600; color: #1A0A00; margin-bottom: 8px; font-family: var(--font-card);">
            ${location.name}
          </div>
          ${location.description ? `<div style="font-size: 12px; color: #8A7060; line-height: 1.4; margin-bottom: 8px;">${location.description.substring(0, 100)}...</div>` : ''}
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ' London')}" target="_blank" rel="noopener noreferrer" style="font-size: 12px; color: #0D7680; font-weight: 500; text-decoration: none;">
            Get Directions →
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setSelectedLocation(location);
        if (onMarkerClick) {
          onMarkerClick(location);
        }
      });

      markers.push(marker);
    });

    // Draw route line connecting markers
    if (locations.length > 1) {
      const routeCoords = locations.map(loc => [loc.lat, loc.lng]);
      L.polyline(routeCoords, {
        color: '#1A0A00',
        weight: 2,
        opacity: 0.4,
        dashArray: '8, 8',
      }).addTo(map);
    }

    // Fit bounds to show all markers
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    mapInstanceRef.current = map;
    setIsLoaded(true);
  };

  const handleStopClick = (location: MapLocation) => {
    setSelectedLocation(location);

    if (mapInstanceRef.current && window.L) {
      mapInstanceRef.current.setView([location.lat, location.lng], 15, {
        animate: true,
      });
    }

    if (onMarkerClick) {
      onMarkerClick(location);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Map */}
      <div className="lg:col-span-2">
        <div className="border-2 border-[var(--ink)] overflow-hidden bg-[var(--surface)]">
          <div
            ref={mapRef}
            style={{ height: '500px', width: '100%' }}
          />
        </div>
      </div>

      {/* Stop list */}
      <div className="bg-[var(--surface)] border-2 border-[var(--ink)] p-6 max-h-[500px] overflow-y-auto">
        <h3 className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-4">
          All Stops
        </h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <button
              key={location.number}
              onClick={() => handleStopClick(location)}
              className={`w-full flex items-center gap-3 p-3 transition-all text-left ${
                selectedLocation?.number === location.number
                  ? 'bg-[var(--background)] border-l-4 border-[var(--claret)]'
                  : 'hover:bg-[var(--background)] border-l-4 border-transparent'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 bg-[var(--ink)] text-[var(--gold)] border-2 border-white"
              >
                {location.number}
              </div>
              <span className="font-card text-sm font-medium text-[var(--ink)] truncate">
                {location.name}
              </span>
              <svg
                className="w-4 h-4 text-[var(--muted)] ml-auto flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* Open in Google Maps button */}
        <div className="mt-6 pt-4 border-t-2 border-[var(--ink)]">
          <a
            href={`https://www.google.com/maps/dir/${locations.map(l => `${l.lat},${l.lng}`).join('/')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block text-center"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
