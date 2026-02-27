'use client';

import { useState } from 'react';

interface MapLocation {
  name: string;
  lat: number;
  lng: number;
  number: number;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  accentColor?: string;
  title?: string;
}

export default function InteractiveMap({ locations, accentColor = '#722F37', title = 'Route Map' }: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  // Calculate center of all locations
  const centerLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
  const centerLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;

  // Create Google Maps URL with markers
  const markersParam = locations
    .map((loc) => `markers=color:red%7Clabel:${loc.number}%7C${loc.lat},${loc.lng}`)
    .join('&');

  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${centerLat},${centerLng}&zoom=12&maptype=roadmap`;

  // Fallback static map if embed doesn't work
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLng}&zoom=12&size=800x400&maptype=roadmap&${markersParam}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;

  return (
    <section id="map" className="py-16 md:py-24 px-6 bg-[#F5F2ED]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C2632] mb-4">
            {title}
          </h2>
          <p className="text-[#4A5568] max-w-xl mx-auto">
            Follow the route pub by pub. Click any stop to get directions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#E8E4DD]">
              <div className="aspect-[16/10] bg-[#E8E4DD] relative">
                {/* Placeholder map visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: accentColor }}
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-[#4A5568] font-medium mb-2">{locations.length} stops on this route</p>
                    <a
                      href={`https://www.google.com/maps/dir/${locations.map(l => `${l.lat},${l.lng}`).join('/')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: accentColor }}
                    >
                      Open Full Route in Google Maps
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stop list */}
          <div className="bg-white rounded-xl shadow-lg border border-[#E8E4DD] p-6 max-h-[500px] overflow-y-auto">
            <h3 className="font-semibold text-[#1C2632] mb-4 uppercase tracking-wider text-sm">All Stops</h3>
            <div className="space-y-2">
              {locations.map((location) => (
                <a
                  key={location.number}
                  href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-[#F5F2ED] ${
                    selectedLocation?.number === location.number ? 'bg-[#F5F2ED]' : ''
                  }`}
                  onMouseEnter={() => setSelectedLocation(location)}
                  onMouseLeave={() => setSelectedLocation(null)}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  >
                    {location.number}
                  </div>
                  <span className="text-[#1C2632] text-sm font-medium truncate">{location.name}</span>
                  <svg className="w-4 h-4 text-[#4A5568] ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
