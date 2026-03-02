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
  accentColor = '#D4A853',
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

    // Calculate center
    const centerLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
    const centerLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;

    // Create map with dark theme
    const map = L.map(mapRef.current, {
      center: [centerLat, centerLng],
      zoom: 13,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    // Use CartoDB Dark Matter tiles for dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Create custom marker icon
    const createMarkerIcon = (number: number, isSelected: boolean = false) => {
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: ${isSelected ? accentColor : '#1C2128'};
            border: 2px solid ${accentColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${isSelected ? '#0D1117' : accentColor};
            font-weight: 700;
            font-size: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
            transition: all 0.2s ease;
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
    locations.forEach((location, index) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: createMarkerIcon(location.number),
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <div style="font-size: 11px; color: ${accentColor}; font-weight: 600; margin-bottom: 4px;">
            STOP ${location.number}
          </div>
          <div style="font-size: 14px; font-weight: 700; color: #F5F0E8; margin-bottom: 8px;">
            ${location.name}
          </div>
          ${location.description ? `<div style="font-size: 12px; color: #8B9AAD; line-height: 1.4;">${location.description}</div>` : ''}
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'dark-popup',
      });

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
        color: accentColor,
        weight: 3,
        opacity: 0.6,
        dashArray: '10, 10',
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
        <div className="rounded-xl overflow-hidden border border-[#30363D] bg-[#161B22]">
          <div
            ref={mapRef}
            className="aspect-[16/10] w-full"
            style={{ minHeight: '400px' }}
          />
        </div>
      </div>

      {/* Stop list */}
      <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6 max-h-[500px] overflow-y-auto">
        <h3 className="font-semibold text-[#D4A853] mb-4 uppercase tracking-wider text-sm">
          All Stops
        </h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <button
              key={location.number}
              onClick={() => handleStopClick(location)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                selectedLocation?.number === location.number
                  ? 'bg-[#D4A853]/10 border border-[#D4A853]'
                  : 'hover:bg-[#0D1117] border border-transparent'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  selectedLocation?.number === location.number
                    ? 'bg-[#D4A853] text-[#0D1117]'
                    : 'bg-[#0D1117] text-[#D4A853] border-2 border-[#D4A853]'
                }`}
              >
                {location.number}
              </div>
              <span className="text-[#F5F0E8] text-sm font-medium truncate">
                {location.name}
              </span>
              <svg
                className="w-4 h-4 text-[#8B9AAD] ml-auto flex-shrink-0"
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
        <div className="mt-6 pt-4 border-t border-[#30363D]">
          <a
            href={`https://www.google.com/maps/dir/${locations.map(l => `${l.lat},${l.lng}`).join('/')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-[#0D1117] font-semibold transition-colors"
            style={{ backgroundColor: accentColor }}
          >
            Open in Google Maps
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
