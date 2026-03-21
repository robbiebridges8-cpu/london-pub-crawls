'use client';

import { BasePub } from '@/content/crawls/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getMapsUrl(pub: BasePub): string {
  if (pub.googlePlaceId) {
    return `https://www.google.com/maps/search/?api=1&query=${pub.lat},${pub.lng}&query_place_id=${pub.googlePlaceId}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${pub.lat},${pub.lng}`;
}

export function getDirectionsUrl(from: BasePub, to: BasePub, travelMode: string = 'walking'): string {
  const origin = encodeURIComponent(`${from.pubName}, ${from.address}, ${from.postcode}`);
  const destination = encodeURIComponent(`${to.pubName}, ${to.address}, ${to.postcode}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=${travelMode}`;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BasePubCardBodyProps {
  pubName: string;
  address: string;
  postcode: string;
  review: string;
  mapsUrl: string;
  websiteUrl?: string;
}

// ---------------------------------------------------------------------------
// Component — simple pub card body: name, address, description, action buttons
// ---------------------------------------------------------------------------

export default function BasePubCardBody({
  pubName,
  address,
  postcode,
  review,
  mapsUrl,
  websiteUrl,
}: BasePubCardBodyProps) {
  return (
    <div className="pc-body">
      <h3 className="pc-name">{pubName}</h3>
      <p className="pc-addr">{address}, {postcode}</p>
      <p className="pc-review">{review}</p>
      <div className="pc-buttons">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pc-btn pc-btn-maps"
          onClick={(e) => e.stopPropagation()}
        >
          Maps
        </a>
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pc-btn pc-btn-website"
            onClick={(e) => e.stopPropagation()}
          >
            Website
          </a>
        )}
      </div>

      <style jsx>{`
        .pc-body {
          overflow: hidden;
        }
        .pc-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.2;
          margin: 0 0 3px;
        }
        .pc-addr {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 400;
          color: var(--muted);
          margin: 0 0 10px;
          line-height: 1.3;
        }
        .pc-review {
          font-family: var(--font-card);
          font-size: 14px;
          font-weight: 400;
          color: #3D2E1F;
          line-height: 1.6;
          margin: 0 0 12px;
        }
        .pc-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pc-btn {
          font-family: var(--font-label);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 6px 12px;
          border-radius: 5px;
          text-decoration: none;
          cursor: pointer;
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          transition: background 0.12s ease;
        }
        .pc-btn-maps {
          background: var(--surface);
          color: var(--ink);
          border: none;
        }
        .pc-btn-maps:hover { background: #E8D1BC; }
        .pc-btn-website {
          background: transparent;
          color: var(--teal);
          border: 1px solid var(--teal);
        }
        .pc-btn-website:hover { background: #E6F3F4; }

        @media (min-width: 768px) {
          .pc-name { font-size: 19px; }
          .pc-review { font-size: 14.5px; }
          .pc-btn { font-size: 12px; padding: 7px 14px; }
        }
      `}</style>
    </div>
  );
}
