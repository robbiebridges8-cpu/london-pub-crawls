'use client';

import { Crawl } from '@/content/crawls';

interface PubCardProps {
  pubName: string;
  description: string;
  stopNumber: number;
  totalStops: number;
  nearestTube?: string;
  accentColor: string;
  onClick?: () => void;
}

// Monopoly-style property card
export function MonopolyPubCard({
  pubName,
  description,
  stopNumber,
  totalStops,
  accentColor,
  onClick,
}: PubCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#FFF9E6] border-[3px] border-[#1a1a2e] rounded-lg overflow-hidden cursor-pointer flex flex-col text-left hover:shadow-xl transition-all hover:-translate-y-1"
      style={{ aspectRatio: '3 / 4' }}
    >
      {/* Color band - Monopoly property style */}
      <div
        className="px-4 py-3 text-center border-b-[3px] border-[#1a1a2e]"
        style={{ backgroundColor: accentColor }}
      >
        <span className="text-xs font-black uppercase tracking-wider text-white drop-shadow-sm">
          Stop {stopNumber}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-center mb-3">
          <div className="text-[10px] uppercase tracking-widest text-[#4A5568] mb-1">Title Deed</div>
          <h3 className="text-lg font-black uppercase tracking-tight text-[#1a1a2e] leading-tight">
            {pubName}
          </h3>
        </div>

        <div className="h-px bg-[#1a1a2e] mb-3" />

        <p className="text-xs text-[#4A5568] leading-relaxed flex-1 line-clamp-4">
          {description}
        </p>

        <div className="mt-3 pt-3 border-t border-[#E8E4DD] flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-wider text-[#4A5568]">Progress</span>
          <span className="font-black text-[#1a1a2e]">{stopNumber}/{totalStops}</span>
        </div>
      </div>
    </button>
  );
}

// Circle Line tube roundel style card
export function CircleLinePubCard({
  pubName,
  description,
  stopNumber,
  totalStops,
  nearestTube,
  onClick,
}: PubCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white border-2 border-[#003688] rounded-lg overflow-hidden cursor-pointer flex flex-col text-left hover:shadow-xl transition-all hover:-translate-y-1"
      style={{ aspectRatio: '3 / 4' }}
    >
      {/* Roundel header */}
      <div className="bg-[#003688] px-4 py-4 flex items-center justify-center">
        <div className="relative">
          {/* Tube roundel */}
          <div className="w-16 h-16 rounded-full border-4 border-[#FFD300] bg-[#003688] flex items-center justify-center">
            <div className="bg-[#FFD300] w-12 h-5 flex items-center justify-center">
              <span className="text-[#003688] font-black text-xs">{stopNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col bg-white">
        <h3 className="text-lg font-bold text-[#003688] mb-1 text-center" style={{ fontFamily: 'Johnston, Arial, sans-serif' }}>
          {pubName}
        </h3>

        {nearestTube && (
          <div className="text-xs text-[#4A5568] text-center mb-3 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="4" y="10" width="16" height="4" fill="currentColor" />
            </svg>
            {nearestTube}
          </div>
        )}

        <div className="h-px bg-[#E8E4DD] mb-3" />

        <p className="text-xs text-[#4A5568] leading-relaxed flex-1 line-clamp-4">
          {description}
        </p>

        <div className="mt-3 pt-3 border-t border-[#E8E4DD] text-center">
          <span className="text-xs text-[#4A5568]">Stop {stopNumber} of {totalStops}</span>
        </div>
      </div>
    </button>
  );
}

// Jack the Ripper Victorian gothic style card
export function RipperPubCard({
  pubName,
  description,
  stopNumber,
  totalStops,
  onClick,
}: PubCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg overflow-hidden cursor-pointer flex flex-col text-left hover:shadow-xl transition-all hover:-translate-y-1 relative"
      style={{
        aspectRatio: '3 / 4',
        background: 'linear-gradient(to bottom, #2C1810, #1a0f0a)',
        border: '2px solid #8B1A1A',
      }}
    >
      {/* Aged paper texture overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Header with gothic feel */}
      <div className="relative px-4 py-4 border-b border-[#8B1A1A]/50">
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B1A1A]">
            — Stop {stopNumber} —
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="relative p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-serif text-[#D4C4B0] mb-2 text-center" style={{
          fontFamily: 'Georgia, serif',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        }}>
          {pubName}
        </h3>

        <div className="flex justify-center mb-3">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#8B1A1A] to-transparent" />
        </div>

        <p className="text-xs text-[#A89880] leading-relaxed flex-1 line-clamp-4 italic">
          {description}
        </p>

        <div className="mt-3 pt-3 border-t border-[#8B1A1A]/30 text-center">
          <span className="text-[10px] uppercase tracking-wider text-[#8B1A1A]">
            {stopNumber} of {totalStops}
          </span>
        </div>
      </div>
    </button>
  );
}

// Beatles 60s music poster style card
export function BeatlesPubCard({
  pubName,
  description,
  stopNumber,
  totalStops,
  onClick,
}: PubCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg overflow-hidden cursor-pointer flex flex-col text-left hover:shadow-xl transition-all hover:-translate-y-1"
      style={{
        aspectRatio: '3 / 4',
        background: 'linear-gradient(135deg, #1A3C6E 0%, #2D5A9E 50%, #1A3C6E 100%)',
        border: '3px solid #DAA520',
      }}
    >
      {/* Psychedelic header */}
      <div className="px-4 py-3 bg-[#DAA520] border-b-2 border-[#1A3C6E]">
        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#1A3C6E]">
            ★ Stop {stopNumber} ★
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-black text-white mb-2 text-center uppercase tracking-wide" style={{
          textShadow: '2px 2px 0 #DAA520',
        }}>
          {pubName}
        </h3>

        {/* Vinyl record decoration */}
        <div className="flex justify-center mb-3">
          <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border-2 border-[#DAA520] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#DAA520]" />
          </div>
        </div>

        <p className="text-xs text-white/80 leading-relaxed flex-1 line-clamp-4">
          {description}
        </p>

        <div className="mt-3 pt-3 border-t border-white/20 text-center">
          <span className="text-xs text-[#DAA520] font-bold">{stopNumber}/{totalStops}</span>
        </div>
      </div>
    </button>
  );
}

// Thames Path nautical style card
export function ThamesPathPubCard({
  pubName,
  description,
  stopNumber,
  totalStops,
  onClick,
}: PubCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg overflow-hidden cursor-pointer flex flex-col text-left hover:shadow-xl transition-all hover:-translate-y-1"
      style={{
        aspectRatio: '3 / 4',
        background: 'linear-gradient(to bottom, #E8F4F8, #FFFFFF)',
        border: '2px solid #2E6B8A',
      }}
    >
      {/* Wave pattern header */}
      <div className="px-4 py-3 bg-[#2E6B8A] relative overflow-hidden">
        {/* Wave SVG */}
        <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 100 10" preserveAspectRatio="none" style={{ height: '10px' }}>
          <path d="M0,5 Q25,0 50,5 T100,5 L100,10 L0,10 Z" fill="#E8F4F8" />
        </svg>
        <div className="text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Stop {stopNumber}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-[#2E6B8A] mb-2 text-center">
          {pubName}
        </h3>

        {/* Anchor icon */}
        <div className="flex justify-center mb-3">
          <svg className="w-6 h-6 text-[#2E6B8A]/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a1 1 0 011 1v1.07A7.002 7.002 0 0119 11v1h1a1 1 0 110 2h-1v1a7.002 7.002 0 01-6 6.93V22a1 1 0 11-2 0v-.07A7.002 7.002 0 015 15v-1H4a1 1 0 110-2h1v-1a7.002 7.002 0 016-6.93V3a1 1 0 011-1zm0 4a5 5 0 00-5 5v4a5 5 0 0010 0v-4a5 5 0 00-5-5zm0 2a1 1 0 011 1v4a1 1 0 11-2 0V9a1 1 0 011-1z" />
          </svg>
        </div>

        <p className="text-xs text-[#4A5568] leading-relaxed flex-1 line-clamp-4">
          {description}
        </p>

        <div className="mt-3 pt-3 border-t border-[#2E6B8A]/20 text-center">
          <span className="text-xs text-[#2E6B8A]">{stopNumber} of {totalStops}</span>
        </div>
      </div>
    </button>
  );
}

// Default card for crawls without specific theming
export function DefaultPubCard({
  pubName,
  description,
  stopNumber,
  totalStops,
  accentColor,
  onClick,
}: PubCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white border-2 rounded-lg overflow-hidden cursor-pointer flex flex-col text-left hover:shadow-xl transition-all hover:-translate-y-1"
      style={{
        aspectRatio: '3 / 4',
        borderColor: accentColor,
      }}
    >
      {/* Header */}
      <div className="px-4 py-3" style={{ backgroundColor: accentColor }}>
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Stop {stopNumber}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-[#1C2632] mb-2 text-center">
          {pubName}
        </h3>

        <div className="h-px mb-3" style={{ backgroundColor: `${accentColor}30` }} />

        <p className="text-xs text-[#4A5568] leading-relaxed flex-1 line-clamp-4">
          {description}
        </p>

        <div className="mt-3 pt-3 border-t border-[#E8E4DD] text-center">
          <span className="text-xs" style={{ color: accentColor }}>{stopNumber}/{totalStops}</span>
        </div>
      </div>
    </button>
  );
}

// Helper to get the right card component for a crawl
export function getThemedPubCard(crawlSlug: string) {
  switch (crawlSlug) {
    case 'monopoly':
      return MonopolyPubCard;
    case 'circle-line':
      return CircleLinePubCard;
    case 'jack-the-ripper':
      return RipperPubCard;
    case 'beatles':
      return BeatlesPubCard;
    case 'thames-path':
      return ThamesPathPubCard;
    default:
      return DefaultPubCard;
  }
}
