'use client';

import { useState, useRef, useEffect } from 'react';
import { CrawlLayout, PubCarousel, InteractiveMap } from '@/components';

// Monopoly color groups
const colorGroups: Record<string, { name: string; color: string; textColor: string }> = {
  brown: { name: 'Brown', color: '#8B4513', textColor: '#fff' },
  lightBlue: { name: 'Light Blue', color: '#87CEEB', textColor: '#1a1a1a' },
  pink: { name: 'Pink', color: '#D63384', textColor: '#fff' },
  orange: { name: 'Orange', color: '#FF6B00', textColor: '#fff' },
  red: { name: 'Red', color: '#D32F2F', textColor: '#fff' },
  yellow: { name: 'Yellow', color: '#FFD600', textColor: '#1a1a1a' },
  green: { name: 'Green', color: '#2E7D32', textColor: '#fff' },
  darkBlue: { name: 'Dark Blue', color: '#1A237E', textColor: '#fff' },
  station: { name: 'Station', color: '#212121', textColor: '#fff' },
};

interface Pub {
  id: number;
  property: string;
  pubName: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  rating: number;
  startTime: string;
  endTime: string;
  transportToNext: string;
  transportTime: number | null;
  price: number;
  pintQuantity: string;
  review: string;
  colorGroup: string;
}

const pubs: Pub[] = [
  { id: 1, property: "Old Kent Road", pubName: "Lord Nelson", address: "386 Old Kent Rd", postcode: "SE1 5AA", lat: 51.4842, lng: -0.0720, rating: 6, startTime: "11:00", endTime: "11:05", transportToNext: "Cycle", transportTime: 13, price: 2.60, pintQuantity: "1/2", review: "A proper South London pub to kick things off. It opens at 11am, and we usually try and get in and out quickly to bank some breathing room later down the line.", colorGroup: "brown" },
  { id: 2, property: "Fenchurch St Station", pubName: "The Minories", address: "64-73 Minories", postcode: "EC3N 1LA", lat: 51.5117, lng: -0.0756, rating: 7, startTime: "11:18", endTime: "11:38", transportToNext: "Walk", transportTime: 4, price: 7.20, pintQuantity: "1", review: "The first station on the route is an impressively sized venue, with an incredible interior showcasing exposed brick archways.", colorGroup: "station" },
  { id: 3, property: "Whitechapel Road", pubName: "The Hoop and Grapes", address: "47 Aldgate High St", postcode: "EC3N 1AL", lat: 51.5138, lng: -0.0762, rating: 5, startTime: "11:42", endTime: "12:02", transportToNext: "Walk", transportTime: 9, price: 3.70, pintQuantity: "1/2", review: "One of the few timber-framed buildings to survive the Great Fire of 1666, The Hoop and Grapes is steeped in history.", colorGroup: "brown" },
  { id: 4, property: "Liverpool St Station", pubName: "Hamilton Hall", address: "Liverpool St", postcode: "EC2M 7PY", lat: 51.5179, lng: -0.0828, rating: 4.5, startTime: "12:11", endTime: "12:31", transportToNext: "Tube", transportTime: 24, price: 6.52, pintQuantity: "1", review: "This Wetherspoons occupies the former Great Eastern Hotel's ballroom and it is one of the fancier Wetherspoons you'll find.", colorGroup: "station" },
  { id: 5, property: "The Angel, Islington", pubName: "Camden Head", address: "2 Camden Walk", postcode: "N1 8DY", lat: 51.5360, lng: -0.1050, rating: 9, startTime: "12:55", endTime: "13:15", transportToNext: "Walk", transportTime: 8, price: 3.08, pintQuantity: "1/2", review: "Camden Head kicks off our favourite phase of the crawl, where the spirits are high and the sun is (hopefully) shining bright.", colorGroup: "lightBlue" },
  { id: 6, property: "Pentonville Road", pubName: "The Castle", address: "Pentonville Road", postcode: "N1 9HF", lat: 51.5318, lng: -0.1130, rating: 9.5, startTime: "13:23", endTime: "13:43", transportToNext: "Walk", transportTime: 15, price: 3.85, pintQuantity: "1/2", review: "Our favourite pub on the entire crawl. Make sure you head up to the terrace. Fun fact: the Hatton Garden heist was planned here.", colorGroup: "lightBlue" },
  { id: 7, property: "Kings Cross Station", pubName: "The Parcel Yard", address: "Kings Cross Station", postcode: "N1C 4AH", lat: 51.5320, lng: -0.1240, rating: 6.5, startTime: "13:58", endTime: "14:18", transportToNext: "Walk", transportTime: 11, price: 7.05, pintQuantity: "1", review: "The Parcel Yard is a Fuller's pub set in the restored Western Range of King's Cross station.", colorGroup: "station" },
  { id: 8, property: "Euston Road", pubName: "The Euston Tap", address: "Euston Station", postcode: "NW1 2EF", lat: 51.5282, lng: -0.1337, rating: 8, startTime: "14:29", endTime: "14:49", transportToNext: "Walk", transportTime: 18, price: 3.25, pintQuantity: "1/2", review: "Housed in a stunning neo-classical stone lodge at the front of Euston station, The Euston Tap is a craft beer paradise.", colorGroup: "lightBlue" },
  { id: 9, property: "Marylebone Station", pubName: "The Marylebone", address: "93 Marylebone High St", postcode: "W1U 4RE", lat: 51.5210, lng: -0.1520, rating: 7, startTime: "15:07", endTime: "15:27", transportToNext: "Walk", transportTime: 18, price: 7.20, pintQuantity: "1", review: "At the end of the longest walk on the crawl, you'll arrive at a stylish gastropub on one of London's most charming high streets.", colorGroup: "station" },
  { id: 10, property: "Park Lane", pubName: "The Audley", address: "41-43 Mount St", postcode: "W1K 2RX", lat: 51.5098, lng: -0.1520, rating: 7, startTime: "15:45", endTime: "16:05", transportToNext: "Walk", transportTime: 9, price: 4.50, pintQuantity: "1/2", review: "The Audley is situated in the heart of Mayfair. The quality matches what you'd expect from the second-most lucrative property.", colorGroup: "darkBlue" },
  { id: 11, property: "Mayfair", pubName: "The Burlington Arms", address: "21 Old Burlington St", postcode: "W1S 2JL", lat: 51.5105, lng: -0.1395, rating: 8, startTime: "16:14", endTime: "16:34", transportToNext: "Walk", transportTime: 12, price: 3.75, pintQuantity: "1/2", review: "Tucked away on a quiet Mayfair side street, fitting for the most expensive square on the board.", colorGroup: "darkBlue" },
  { id: 12, property: "Piccadilly", pubName: "St James's Tavern", address: "45 Great Windmill St", postcode: "W1D 7NE", lat: 51.5112, lng: -0.1340, rating: 6, startTime: "16:46", endTime: "17:06", transportToNext: "Walk", transportTime: 7, price: 4.05, pintQuantity: "1/2", review: "A handsome corner pub where Soho meets the West End. There is a McDonald's across the road if anyone is flagging.", colorGroup: "yellow" },
  { id: 13, property: "Pall Mall", pubName: "The Red Lion", address: "Crown Passage", postcode: "SW1Y 6PP", lat: 51.5068, lng: -0.1379, rating: 6, startTime: "17:13", endTime: "17:33", transportToNext: "Walk", transportTime: 11, price: 3.70, pintQuantity: "1/2", review: "Hidden down a narrow alley off Pall Mall, The Red Lion dates back to 1821 and oozes old-world charm. You're officially halfway!", colorGroup: "pink" },
  { id: 14, property: "Whitehall", pubName: "Silver Cross", address: "33 Whitehall", postcode: "SW1A 2BX", lat: 51.5065, lng: -0.1254, rating: 5.5, startTime: "17:44", endTime: "18:04", transportToNext: "Walk", transportTime: 1, price: 2.85, pintQuantity: "1/2", review: "One of the oldest licensed premises in London with a licence dating back to 1674.", colorGroup: "pink" },
  { id: 15, property: "Northumberland Avenue", pubName: "The Ship & Shovell", address: "2 Craven Passage", postcode: "WC2N 5NF", lat: 51.5076, lng: -0.1235, rating: 6, startTime: "18:05", endTime: "18:25", transportToNext: "Walk", transportTime: 20, price: 3.80, pintQuantity: "1/2", review: "London's only pub split across both sides of an alley, named after Admiral Sir Cloudesley Shovell.", colorGroup: "pink" },
  { id: 16, property: "Fleet Street", pubName: "Ye Olde Cheshire Cheese", address: "145 Fleet St", postcode: "EC4A 2BP", lat: 51.5141, lng: -0.1081, rating: 5, startTime: "18:45", endTime: "19:05", transportToNext: "Walk", transportTime: 10, price: 3.60, pintQuantity: "1/2", review: "Rebuilt in 1667 after the Great Fire. Samuel Johnson, Charles Dickens and Mark Twain all drank here. A crown jewel.", colorGroup: "red" },
  { id: 17, property: "Strand", pubName: "The Wellington", address: "351 Strand", postcode: "WC2R 0HS", lat: 51.5107, lng: -0.1195, rating: 6, startTime: "19:15", endTime: "19:35", transportToNext: "Walk", transportTime: 3, price: 4.05, pintQuantity: "1", review: "A grand corner pub on The Strand near Covent Garden with a wide selection of beers.", colorGroup: "red" },
  { id: 18, property: "Bow Street", pubName: "The Marquess of Anglesey", address: "39 Bow St", postcode: "WC2E 7AU", lat: 51.5130, lng: -0.1222, rating: 8.5, startTime: "19:38", endTime: "19:58", transportToNext: "Walk", transportTime: 9, price: 3.85, pintQuantity: "1/2", review: "A stunning Young's pub right next to the Royal Opera House with a rooftop terrace. One of the most photogenic pubs.", colorGroup: "orange" },
  { id: 19, property: "Trafalgar Square", pubName: "The Admiralty", address: "66 Trafalgar Sq", postcode: "WC2N 5DS", lat: 51.5080, lng: -0.1270, rating: 7, startTime: "20:07", endTime: "20:27", transportToNext: "Walk", transportTime: 5, price: 4.10, pintQuantity: "1/2", review: "Situated right on Trafalgar Square with Nelson's Column looming outside. The location is unbeatable.", colorGroup: "red" },
  { id: 20, property: "Leicester Square", pubName: "The Moon Under Water", address: "28 Leicester Square", postcode: "WC2H 7LE", lat: 51.5113, lng: -0.1302, rating: 5, startTime: "20:32", endTime: "20:52", transportToNext: "Walk", transportTime: 3, price: 3.50, pintQuantity: "1/2", review: "Named after George Orwell's essay about his ideal pub. Enjoy the cheap prices, get out quickly.", colorGroup: "yellow" },
  { id: 21, property: "Coventry Street", pubName: "The Coach House", address: "7 Oxendon St", postcode: "SW1Y 4EE", lat: 51.5095, lng: -0.1310, rating: 6.5, startTime: "20:55", endTime: "21:15", transportToNext: "Walk", transportTime: 7, price: 3.90, pintQuantity: "1", review: "A cosy pub tucked just off Coventry Street in the heart of theatreland. Feels like the home stretch - 5 to go.", colorGroup: "yellow" },
  { id: 22, property: "Regent Street", pubName: "The Starman", address: "15 Heddon St", postcode: "W1B 4BF", lat: 51.5125, lng: -0.1395, rating: 6, startTime: "21:22", endTime: "21:42", transportToNext: "Walk", transportTime: 2, price: 3.80, pintQuantity: "1/2", review: "Named in honour of David Bowie, whose Ziggy Stardust album cover was shot on this very street.", colorGroup: "green" },
  { id: 23, property: "Vine Street", pubName: "Leicester Arms", address: "44 Glasshouse St", postcode: "W1B 5DP", lat: 51.5108, lng: -0.1360, rating: 6.5, startTime: "21:44", endTime: "22:04", transportToNext: "Walk", transportTime: 5, price: 3.80, pintQuantity: "1/2", review: "Although Vine Street doesn't exist anymore, Leicester Arms has a warm, old-school pub atmosphere.", colorGroup: "orange" },
  { id: 24, property: "Marlborough Street", pubName: "Shakespeare's Head", address: "29 Great Marlborough St", postcode: "W1F 7HZ", lat: 51.5140, lng: -0.1385, rating: 7, startTime: "22:09", endTime: "22:29", transportToNext: "Walk", transportTime: 6, price: 3.32, pintQuantity: "1", review: "A large Greene King near Carnaby Street. A wallet-friendly stop near the finish line.", colorGroup: "orange" },
  { id: 25, property: "Bond Street", pubName: "Duke of York", address: "Dering St, New Bond St", postcode: "W1S 1AF", lat: 51.5140, lng: -0.1460, rating: 6, startTime: "22:35", endTime: "22:55", transportToNext: "Walk", transportTime: 2, price: 3.80, pintQuantity: "1/2", review: "A charming little pub tucked away just off Bond Street. Definitely feels like a hidden gem.", colorGroup: "green" },
  { id: 26, property: "Oxford Street", pubName: "The Duchess", address: "Woodcock St", postcode: "W1C 2AD", lat: 51.5148, lng: -0.1505, rating: 6, startTime: "22:57", endTime: "23:17", transportToNext: "N/A", transportTime: null, price: 7.35, pintQuantity: "1", review: "The grand finale. The Duchess is a sleek, modern venue just off Oxford Street - perfect for celebrating the MonopElite!", colorGroup: "green" }
];

// Monopoly Property Card Component
function MonopolyCard({ pub, onClick }: { pub: Pub; onClick: () => void }) {
  const group = colorGroups[pub.colorGroup];

  return (
    <button
      onClick={onClick}
      className="w-full bg-[#FFF9E6] border-[3px] border-[#1a1a2e] rounded-lg overflow-hidden cursor-pointer flex flex-col text-left hover:shadow-xl transition-all hover:-translate-y-1"
      style={{ aspectRatio: '3 / 4.2' }}
    >
      {/* Color band - Monopoly property style */}
      <div
        className="px-4 py-3 text-center border-b-[3px] border-[#1a1a2e]"
        style={{ backgroundColor: group.color }}
      >
        <span
          className="text-xs font-black uppercase tracking-wider"
          style={{ color: group.textColor }}
        >
          {pub.property}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-center mb-3">
          <div className="text-[10px] uppercase tracking-widest text-[#4A5568] mb-1">Title Deed</div>
          <h3 className="text-lg font-black uppercase tracking-tight text-[#1a1a2e] leading-tight">
            {pub.pubName}
          </h3>
        </div>

        <div className="h-px bg-[#1a1a2e] mb-3" />

        <div className="space-y-1 text-xs flex-1">
          <div className="flex justify-between">
            <span className="text-[#4A5568]">Time</span>
            <span className="font-semibold text-[#1a1a2e]">{pub.startTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4A5568]">Drink</span>
            <span className="font-semibold text-[#1a1a2e]">{pub.pintQuantity} pint</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4A5568]">Cost</span>
            <span className="font-semibold text-[#1a1a2e]">£{pub.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="h-px bg-[#1a1a2e] my-3" />

        <div className="flex justify-between items-center">
          <span className="text-xs text-[#4A5568]">Rating</span>
          <span className="text-sm font-black text-[#D32F2F]">{pub.rating}/10</span>
        </div>

        <div className="mt-3 pt-3 border-t border-[#E8E4DD] flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-wider text-[#4A5568]">Stop</span>
          <span className="font-black text-[#1a1a2e]">{pub.id}/26</span>
        </div>
      </div>
    </button>
  );
}

// Pub Modal
function PubModal({ pub, onClose }: { pub: Pub; onClose: () => void }) {
  const group = colorGroups[pub.colorGroup];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FFF9E6] border-[3px] border-[#1a1a2e] rounded-lg max-w-md w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-4 text-center border-b-[3px] border-[#1a1a2e] relative"
          style={{ backgroundColor: group.color }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#1a1a2e] hover:bg-white"
          >
            ×
          </button>
          <span className="text-lg font-black uppercase tracking-wider" style={{ color: group.textColor }}>
            {pub.property}
          </span>
        </div>

        {/* Title */}
        <div className="text-center px-6 pt-6 pb-4">
          <div className="text-xs uppercase tracking-widest text-[#4A5568] mb-2">Title Deed</div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#1a1a2e]">
            {pub.pubName}
          </h2>
          <p className="text-sm text-[#4A5568] mt-1">{pub.address}, {pub.postcode}</p>
        </div>

        <div className="h-px bg-[#1a1a2e] mx-6" />

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-[#4A5568] uppercase">Time</div>
              <div className="font-bold text-[#1a1a2e]">{pub.startTime} - {pub.endTime}</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-[#4A5568] uppercase">Cost</div>
              <div className="font-bold text-[#1a1a2e]">£{pub.price.toFixed(2)}</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-[#4A5568] uppercase">Quantity</div>
              <div className="font-bold text-[#1a1a2e]">{pub.pintQuantity} pint</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-[#4A5568] uppercase">Rating</div>
              <div className="font-bold text-[#D32F2F]">{pub.rating}/10</div>
            </div>
          </div>

          {pub.transportTime && (
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-[#4A5568] uppercase">Next Stop</div>
              <div className="font-bold text-[#1a1a2e]">{pub.transportTime} min ({pub.transportToNext})</div>
            </div>
          )}

          <div className="pt-4 border-t border-[#E8E4DD]">
            <h4 className="text-sm font-black uppercase tracking-tight text-[#1a1a2e] mb-2">Our Review</h4>
            <p className="text-sm text-[#4A5568] leading-relaxed">{pub.review}</p>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.pubName}, ${pub.address}, ${pub.postcode}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-[#D32F2F] text-white text-center font-bold rounded-lg hover:bg-[#B71C1C] transition-colors"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MonopolyPage() {
  const [selectedPub, setSelectedPub] = useState<Pub | null>(null);

  const mapLocations = pubs.map(pub => ({
    name: pub.pubName,
    lat: pub.lat,
    lng: pub.lng,
    number: pub.id
  }));

  const totalPrice = pubs.reduce((sum, p) => sum + p.price, 0);

  return (
    <CrawlLayout crawlName="Monopoly Pub Crawl">
      {/* Hero Section */}
      <header className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-[#F5F2ED] to-[#FAF8F5]">
        {/* Decorative shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-[#D32F2F]/5 blur-3xl" />
          <div className="absolute top-40 right-[15%] w-48 h-48 rounded-full bg-[#2E7D32]/5 blur-3xl" />
          <div className="absolute bottom-32 left-[20%] w-56 h-56 rounded-full bg-[#1A237E]/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-16">
          {/* Back link */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#4A5568] hover:text-[#722F37] transition-colors mb-8 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Crawls
          </a>

          {/* Icon */}
          <div className="text-5xl mb-6">🎩</div>

          {/* Title card */}
          <div className="bg-[#FFF9E6] border-4 border-[#1a1a2e] rounded-xl p-8 md:p-10 max-w-xl mx-auto mb-8 shadow-lg">
            <div className="text-sm text-[#1a1a2e] tracking-[4px] uppercase mb-2">The London</div>
            <h1 className="text-4xl md:text-5xl font-black text-white bg-[#D32F2F] px-8 py-3 rounded-md inline-block shadow-[0_4px_0_#B71C1C] tracking-wider mb-3">
              MONOPOLY
            </h1>
            <div className="text-lg text-[#1a1a2e] tracking-[6px] uppercase">Pub Crawl</div>
          </div>

          <p className="text-lg text-[#4A5568] mb-8 max-w-md mx-auto">
            26 pubs. Every property on the board. From Old Kent Road to Mayfair. The legendary London challenge.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 flex-wrap mb-10">
            {[
              { num: '26', label: 'Pubs' },
              { num: '12', label: 'Hours' },
              { num: `£${Math.round(totalPrice)}`, label: 'Budget' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white border-2 border-[#E8E4DD] rounded-lg px-6 py-4 shadow-sm"
              >
                <div className="text-2xl font-black text-[#D32F2F]">{stat.num}</div>
                <div className="text-xs text-[#4A5568] uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>

          <a
            href="#route"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#722F37] text-white font-semibold rounded-lg hover:bg-[#5C262D] transition-colors"
          >
            See the Route
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </header>

      {/* Overview Section */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#1C2632] mb-4">
                The Ultimate London Challenge
              </h2>
              <p className="text-[#4A5568] leading-relaxed mb-4">
                The Monopoly Pub Crawl takes you on an epic journey through 26 London pubs, each one mapped to a property on the classic Monopoly board.
              </p>
              <p className="text-[#4A5568] leading-relaxed">
                From the humble beginnings of Old Kent Road to the glittering heights of Mayfair, you&apos;ll experience London like never before. Start at 11am, finish by midnight.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['brown', 'lightBlue', 'red', 'green'].map((color) => (
                <div
                  key={color}
                  className="aspect-[4/3] rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${colorGroups[color].color}20` }}
                >
                  <div
                    className="w-12 h-12 rounded-full"
                    style={{ backgroundColor: colorGroups[color].color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Route Carousel Section */}
      <section id="route" className="py-16 md:py-24 px-6 bg-[#F5F2ED]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C2632] mb-4">
              The Route
            </h2>
            <p className="text-[#4A5568] max-w-xl mx-auto">
              Swipe through all 26 property cards. Tap any card for full details.
            </p>
          </div>

          <PubCarousel title="26 Properties">
            {pubs.map((pub) => (
              <MonopolyCard key={pub.id} pub={pub} onClick={() => setSelectedPub(pub)} />
            ))}
          </PubCarousel>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-16 md:py-24 px-6 bg-[#161B22]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#F5F0E8] text-center mb-4">
            Route Map
          </h2>
          <p className="text-[#8B9AAD] text-center mb-8">
            Follow the route pub by pub across London. Click any stop to see details.
          </p>
          <InteractiveMap
            locations={mapLocations}
            accentColor="#D32F2F"
          />
        </div>
      </section>

      {/* Logistics */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-[#1C2632] text-center mb-12">
            Before You Go
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: '🚶', title: 'Getting Around', text: 'Mix of walking, cycling, and one tube journey. Total walking: ~6 miles.' },
              { icon: '⏰', title: 'Timing', text: 'Start at 11am sharp. Stick to halves early on to bank time.' },
              { icon: '💰', title: 'Budget', text: `Expect to spend around £${Math.round(totalPrice)} following our recommended quantities.` },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-xl p-8 text-center shadow-sm border border-[#E8E4DD]">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-bold text-[#1C2632] mb-2">{card.title}</h3>
                <p className="text-[#4A5568] text-sm">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E8E4DD]">
            <h3 className="font-bold text-[#1C2632] text-center mb-6">Survival Tips</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: '🍔', title: 'Eat!', text: 'Grab food around pub 8-10. Tesco meal deals are your friend.' },
                { icon: '💧', title: 'Hydrate', text: 'Water between pubs. Trust us on this one.' },
                { icon: '👟', title: 'Comfortable Shoes', text: "You'll be on your feet for 12 hours." },
                { icon: '📱', title: 'Charge Up', text: 'Full battery at the start. Bring a power bank.' },
              ].map((tip) => (
                <div key={tip.title} className="flex gap-4 items-start p-3">
                  <div className="text-2xl">{tip.icon}</div>
                  <div>
                    <h4 className="font-semibold text-[#1C2632] mb-1">{tip.title}</h4>
                    <p className="text-[#4A5568] text-sm">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPub && (
        <PubModal pub={selectedPub} onClose={() => setSelectedPub(null)} />
      )}
    </CrawlLayout>
  );
}
