'use client';

import { MonopolyPub, monopolyColorGroups, getMonopolyMapsUrl } from '@/content/crawls/monopoly';

interface MonopolyPubCardProps {
  pub: MonopolyPub;
}

// Trim review to ~2 sentences for glanceable display
function trimReview(review: string): string {
  const sentences = review.match(/[^.!?]+[.!?]+/g) || [review];
  if (sentences.length <= 2) return review;
  return sentences.slice(0, 2).join('').trim();
}

export function MonopolyPubCard({ pub }: MonopolyPubCardProps) {
  const group = monopolyColorGroups[pub.colorGroup];
  const lightBands = ['yellow', 'lightBlue'];
  const bandTextColor = lightBands.includes(pub.colorGroup) ? '#1a1a1a' : '#fff';

  return (
    <div className="bg-white border-2 border-black rounded-sm overflow-hidden">
      {/* Colour band with property name */}
      <div
        className="px-5 py-3 text-center border-b-2 border-black"
        style={{ backgroundColor: group.color }}
      >
        <span
          className="text-xs font-black uppercase tracking-widest"
          style={{ color: bandTextColor }}
        >
          {pub.property}
        </span>
      </div>

      {/* Deed body */}
      <div className="px-5 py-4">
        {/* Pub name */}
        <h3 className="text-lg font-black text-black uppercase tracking-tight text-center mb-1 leading-tight">
          {pub.pubName}
        </h3>

        {/* Address */}
        <p className="text-xs text-center mb-4" style={{ color: '#666' }}>
          {pub.address}, {pub.postcode}
        </p>

        <div className="h-px bg-black mb-4" />

        {/* Info rows — deed-style dotted leaders */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-baseline gap-2 text-sm">
            <span className="text-gray-500 shrink-0">Time</span>
            <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
            <span className="font-semibold text-black shrink-0">{pub.startTime} – {pub.endTime}</span>
          </div>
          <div className="flex items-baseline gap-2 text-sm">
            <span className="text-gray-500 shrink-0">Drink</span>
            <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
            <span className="font-semibold text-black shrink-0">{pub.pintQuantity} pint · £{pub.price.toFixed(2)}</span>
          </div>
          {pub.transportToNext && (
            <div className="flex items-baseline gap-2 text-sm">
              <span className="text-gray-500 shrink-0">Next</span>
              <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
              <span className="font-semibold text-black shrink-0">{pub.transportToNext} ({pub.transportTime} min)</span>
            </div>
          )}
        </div>

        <div className="h-px bg-black mb-4" />

        {/* Review excerpt */}
        <p className="text-sm leading-relaxed text-gray-700 mb-4">
          {trimReview(pub.review)}
        </p>

        {/* Footer: position + links */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-sm font-bold text-black">
            {pub.id}<span className="text-gray-400 font-normal">/26</span>
          </span>

          <div className="flex items-center gap-3">
            <a
              href={getMonopolyMapsUrl(pub)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wide hover:underline"
              style={{ color: '#2563eb' }}
            >
              Maps
            </a>
            {pub.website && (
              <a
                href={pub.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wide hover:underline"
                style={{ color: '#2563eb' }}
              >
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
