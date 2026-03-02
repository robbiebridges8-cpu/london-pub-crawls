'use client';

import { useState } from 'react';
import { CrawlLayout, PubCarousel, InteractiveMap } from '@/components';

// TfL line colors
const LINE_COLORS: Record<string, string> = {
  bakerloo: '#B36305',
  central: '#E32017',
  circle: '#FFD300',
  district: '#00782A',
  elizabeth: '#6950A1',
  'hammersmith-city': '#F3A9BB',
  jubilee: '#A0A5A9',
  metropolitan: '#9B0056',
  northern: '#000000',
  piccadilly: '#003688',
  victoria: '#0098D4',
};

interface Station {
  number: number;
  name: string;
  interchanges: string[];
  lat: number;
  lng: number;
  pub: {
    name: string;
    description: string;
    historicNote: string;
    recommendedDrink: string;
    walkToNext: string;
  };
}

const stations: Station[] = [
  {
    number: 1,
    name: 'Edgware Road',
    interchanges: ['bakerloo', 'district', 'hammersmith-city'],
    lat: 51.5199,
    lng: -0.1679,
    pub: {
      name: 'The Beehive',
      description: 'A proper Victorian corner pub that\'s survived the area\'s transformation into Little Beirut. Original etched glass, working fireplaces, and a crowd that ranges from suited media types to old-timers who\'ve drunk here for decades.',
      historicNote: 'One of the few traditional pubs left on the Edgware Road strip.',
      recommendedDrink: 'Fuller\'s London Pride',
      walkToNext: '8 min walk',
    },
  },
  {
    number: 2,
    name: 'Baker Street',
    interchanges: ['bakerloo', 'jubilee', 'metropolitan', 'hammersmith-city'],
    lat: 51.5226,
    lng: -0.1571,
    pub: {
      name: 'The Volunteer',
      description: 'A handsome Georgian boozer tucked behind Baker Street station. Proper pub with no gimmicks — just good beer, dark wood, and the kind of quiet atmosphere where you can actually have a conversation. Popular with Marylebone locals.',
      historicNote: 'Named after the Volunteer Rifle Corps who trained nearby in the 1800s.',
      recommendedDrink: 'Timothy Taylor Landlord',
      walkToNext: '6 min walk',
    },
  },
  {
    number: 3,
    name: 'Great Portland Street',
    interchanges: ['hammersmith-city', 'metropolitan'],
    lat: 51.5238,
    lng: -0.1440,
    pub: {
      name: 'The Green Man',
      description: 'A proper Fitzrovia local on the edge of the BBC\'s old stomping ground. Small, unpretentious, with a surprisingly good selection of cask ales and a clientele of regulars who treat it like an extension of their living room.',
      historicNote: 'Survived multiple redevelopments of the area since the 1850s.',
      recommendedDrink: 'Sharp\'s Doom Bar',
      walkToNext: '5 min walk',
    },
  },
  {
    number: 4,
    name: 'Euston Square',
    interchanges: ['hammersmith-city', 'metropolitan'],
    lat: 51.5260,
    lng: -0.1359,
    pub: {
      name: 'The Euston Flyer',
      description: 'A grand Victorian railway pub built for the thirsty passengers arriving at Euston. High ceilings, ornate plasterwork, and the perpetual buzz of a station pub. It\'s a Wetherspoons now, but the building deserves respect.',
      historicNote: 'Built when Euston was the gateway to the industrial north.',
      recommendedDrink: 'Whatever\'s cheapest — you\'ve got 23 more stops',
      walkToNext: '10 min walk',
    },
  },
  {
    number: 5,
    name: 'King\'s Cross St. Pancras',
    interchanges: ['northern', 'piccadilly', 'victoria', 'hammersmith-city', 'metropolitan'],
    lat: 51.5308,
    lng: -0.1238,
    pub: {
      name: 'The Parcel Yard',
      description: 'Inside King\'s Cross station itself, in the beautifully restored Victorian parcel office. Soaring ceilings, exposed brick, and a terrace overlooking the concourse. Fuller\'s run it well — proper cask ales and decent food.',
      historicNote: 'The room handled all of London\'s railway parcels for over a century.',
      recommendedDrink: 'Fuller\'s ESB',
      walkToNext: '12 min walk',
    },
  },
  {
    number: 6,
    name: 'Farringdon',
    interchanges: ['hammersmith-city', 'metropolitan', 'elizabeth'],
    lat: 51.5203,
    lng: -0.1053,
    pub: {
      name: 'The Jerusalem Tavern',
      description: 'A tiny, ancient-feeling pub that\'s actually a 1990s recreation — but who cares when it\'s this good. Flagstone floors, candlelight, and the complete range of St Peter\'s Suffolk ales on tap. Gets packed, but worth the squeeze.',
      historicNote: 'Named after the Priory of St John of Jerusalem that once stood nearby.',
      recommendedDrink: 'St Peter\'s Best Bitter',
      walkToNext: '7 min walk',
    },
  },
  {
    number: 7,
    name: 'Barbican',
    interchanges: ['hammersmith-city', 'metropolitan'],
    lat: 51.5204,
    lng: -0.0979,
    pub: {
      name: 'The Butchers Hook & Cleaver',
      description: 'A Fuller\'s pub in a former Smithfield meat market building. The brutalist Barbican looms outside, but inside it\'s all Victorian grandeur — high ceilings, vast windows, and a proper pub feel despite the City postcode.',
      historicNote: 'Smithfield has been London\'s meat market for over 800 years.',
      recommendedDrink: 'Fuller\'s Olivers Island',
      walkToNext: '6 min walk',
    },
  },
  {
    number: 8,
    name: 'Moorgate',
    interchanges: ['hammersmith-city', 'metropolitan', 'northern'],
    lat: 51.5186,
    lng: -0.0886,
    pub: {
      name: 'The Globe',
      description: 'A proper City pub that\'s been serving bankers and traders since Victorian times. Wood paneling, brass fittings, and the kind of after-work intensity that only the Square Mile can produce. Quieter at weekends.',
      historicNote: 'Moorgate was one of the gates in London\'s Roman wall.',
      recommendedDrink: 'Adnams Broadside',
      walkToNext: '8 min walk',
    },
  },
  {
    number: 9,
    name: 'Liverpool Street',
    interchanges: ['hammersmith-city', 'metropolitan', 'central', 'elizabeth'],
    lat: 51.5178,
    lng: -0.0823,
    pub: {
      name: 'Hamilton Hall',
      description: 'A former ballroom inside Liverpool Street station, now a Wetherspoons with the most spectacular pub ceiling in London. Gilded baroque plasterwork, vast chandeliers, and cheap pints under ceiling murals of cherubs.',
      historicNote: 'Named after Lord Claud Hamilton, former chairman of the Great Eastern Railway.',
      recommendedDrink: 'Look up at the ceiling, order whatever',
      walkToNext: '9 min walk',
    },
  },
  {
    number: 10,
    name: 'Aldgate',
    interchanges: ['hammersmith-city', 'metropolitan'],
    lat: 51.5143,
    lng: -0.0755,
    pub: {
      name: 'The Hoop and Grapes',
      description: 'One of the oldest pubs in the City — a crooked, timber-framed survivor that predates the Great Fire of 1666. The floors slope, the ceilings sag, and the atmosphere is pure old London. A genuine treasure.',
      historicNote: 'The only timber-framed building in the City to survive the Great Fire.',
      recommendedDrink: 'Nicholson\'s Pale Ale',
      walkToNext: '7 min walk',
    },
  },
  {
    number: 11,
    name: 'Tower Hill',
    interchanges: ['district'],
    lat: 51.5098,
    lng: -0.0766,
    pub: {
      name: 'The Hung Drawn and Quartered',
      description: 'Named after the fate of traitors executed at the Tower, this Fuller\'s pub delivers exactly what you\'d expect: solid ales, decent pies, and tourists recovering from the Crown Jewels queue. The name does the heavy lifting.',
      historicNote: 'The pub sign depicts the grim execution method in loving detail.',
      recommendedDrink: 'Fuller\'s London Pride',
      walkToNext: '6 min walk',
    },
  },
  {
    number: 12,
    name: 'Monument',
    interchanges: ['district', 'northern'],
    lat: 51.5107,
    lng: -0.0860,
    pub: {
      name: 'The Counting House',
      description: 'A former NatWest bank transformed into a spectacular pub. The original banking hall is intact — marble columns, coffered ceilings, a central glass dome flooding the room with light. The most impressive Wetherspoons interior in London.',
      historicNote: 'The building\'s vaults now store kegs instead of gold.',
      recommendedDrink: 'Cheap pints under a dome built for counting millions',
      walkToNext: '5 min walk',
    },
  },
  {
    number: 13,
    name: 'Cannon Street',
    interchanges: ['district'],
    lat: 51.5113,
    lng: -0.0904,
    pub: {
      name: 'The Banker',
      description: 'A cavernous Fuller\'s pub in a converted banking hall near the station. Suits pack it at 5:30, but on weekends it\'s a ghost town — the City empties completely. Check it\'s open before making the walk.',
      historicNote: 'Cannon Street station sits on the site of the Roman governor\'s palace.',
      recommendedDrink: 'Fuller\'s Frontier Lager',
      walkToNext: '5 min walk',
    },
  },
  {
    number: 14,
    name: 'Mansion House',
    interchanges: ['district'],
    lat: 51.5122,
    lng: -0.0940,
    pub: {
      name: 'The Walrus and the Carpenter',
      description: 'A proper City pub with original Victorian features and a literary name from Lewis Carroll. Small, characterful, and infinitely preferable to the chains nearby. Often closed weekends — plan accordingly.',
      historicNote: 'The Alice in Wonderland connection suits this looking-glass City.',
      recommendedDrink: 'Whatever catches your eye — you\'re halfway there',
      walkToNext: '6 min walk',
    },
  },
  {
    number: 15,
    name: 'Blackfriars',
    interchanges: ['district'],
    lat: 51.5120,
    lng: -0.1040,
    pub: {
      name: 'The Black Friar',
      description: 'The most extraordinary pub interior in London. An Arts and Crafts masterpiece from 1905, with marble walls, copper reliefs, and vaulted ceilings covered in mosaics of jolly friars. Nearly demolished in 1964 — Betjeman campaigned to save it.',
      historicNote: 'Built on the site of a Dominican friary dissolved by Henry VIII.',
      recommendedDrink: 'Nicholson\'s Pale Ale, in the back grotto room',
      walkToNext: '8 min walk',
    },
  },
  {
    number: 16,
    name: 'Temple',
    interchanges: ['district'],
    lat: 51.5111,
    lng: -0.1141,
    pub: {
      name: 'The Edgar Wallace',
      description: 'A proper journalists\' pub, named after the thriller writer who worked at Fleet Street. Dark, wooden, secretive — the kind of place sources were met and expenses were invented. Still pulls a good pint.',
      historicNote: 'Edgar Wallace wrote 175 novels. His ghost would approve of the pace required today.',
      recommendedDrink: 'Sharp\'s Doom Bar',
      walkToNext: '7 min walk',
    },
  },
  {
    number: 17,
    name: 'Embankment',
    interchanges: ['bakerloo', 'district', 'northern'],
    lat: 51.5074,
    lng: -0.1224,
    pub: {
      name: 'Gordon\'s Wine Bar',
      description: 'Not a pub, but the most atmospheric drinking spot in London. A candlelit cave beneath Villiers Street, with barrels for tables and wine-stained walls. Get there early — no reservations, no standing room, no compromise.',
      historicNote: 'The cellar dates from the 1600s. Kipling and Dickens drank here.',
      recommendedDrink: 'A glass of sherry from the barrel',
      walkToNext: '10 min walk',
    },
  },
  {
    number: 18,
    name: 'Westminster',
    interchanges: ['jubilee', 'district'],
    lat: 51.5010,
    lng: -0.1254,
    pub: {
      name: 'St. Stephen\'s Tavern',
      description: 'The MPs\' pub, directly opposite Big Ben. Division bells ring inside when votes are called, sending politicians scurrying back to the House. Victorian splendor, surprising intimacy, and the distinct possibility of spotting a Cabinet minister.',
      historicNote: 'The division bell system means MPs have 8 minutes to vote. Time for a half.',
      recommendedDrink: 'Badger First Gold',
      walkToNext: '8 min walk',
    },
  },
  {
    number: 19,
    name: 'St. James\'s Park',
    interchanges: ['district'],
    lat: 51.4994,
    lng: -0.1335,
    pub: {
      name: 'The Red Lion',
      description: 'A small, perfectly formed Westminster pub in the heart of Whitehall. Civil servants, politicos, and tourists who got lucky. The Victorian interior is intact, the beer is excellent, and the location couldn\'t be more central.',
      historicNote: 'Prime Ministers have been known to pop in. Keep your eyes open.',
      recommendedDrink: 'Fuller\'s London Pride',
      walkToNext: '9 min walk',
    },
  },
  {
    number: 20,
    name: 'Victoria',
    interchanges: ['district', 'victoria'],
    lat: 51.4965,
    lng: -0.1447,
    pub: {
      name: 'The Willow Walk',
      description: 'A vast Wetherspoons in a converted bank near Victoria station. Not charming, but reliable — and after 19 stops, reliable counts for a lot. High ceilings, cheap beer, and the anonymity that only a massive chain pub provides.',
      historicNote: 'Victoria station was built to serve the boat trains to continental Europe.',
      recommendedDrink: 'Whatever\'s on offer. Keep moving.',
      walkToNext: '12 min walk',
    },
  },
  {
    number: 21,
    name: 'Sloane Square',
    interchanges: ['district'],
    lat: 51.4924,
    lng: -0.1565,
    pub: {
      name: 'The Botanist',
      description: 'An upmarket Chelsea pub on Sloane Square itself. All exposed brick and craft beer, the clientele in Barbour jackets and Hunter wellies. A jarring gear change after Victoria — you\'re in proper posh London now.',
      historicNote: 'Sloane Square is named after Sir Hans Sloane, whose collection founded the British Museum.',
      recommendedDrink: 'Something expensive — when in Chelsea',
      walkToNext: '11 min walk',
    },
  },
  {
    number: 22,
    name: 'South Kensington',
    interchanges: ['district', 'piccadilly'],
    lat: 51.4941,
    lng: -0.1738,
    pub: {
      name: 'The Hoop and Toy',
      description: 'A tucked-away Victorian pub on a quiet South Ken side street. Original etched glass, proper ales, and an escape from the museum crowds nearby. Feels like stepping back a century.',
      historicNote: 'The V&A, Natural History, and Science Museums are all within stumbling distance.',
      recommendedDrink: 'Young\'s Bitter',
      walkToNext: '8 min walk',
    },
  },
  {
    number: 23,
    name: 'Gloucester Road',
    interchanges: ['district', 'piccadilly'],
    lat: 51.4945,
    lng: -0.1829,
    pub: {
      name: 'The Stanhope Arms',
      description: 'A civilised Kensington local hiding in plain sight. High ceilings, big windows, and the kind of quiet confidence that comes from serving a neighbourhood for over a century. A genuine hidden gem.',
      historicNote: 'Gloucester Road was named after Maria, Duchess of Gloucester.',
      recommendedDrink: 'Sambrook\'s Wandle',
      walkToNext: '7 min walk',
    },
  },
  {
    number: 24,
    name: 'High Street Kensington',
    interchanges: ['district'],
    lat: 51.5009,
    lng: -0.1918,
    pub: {
      name: 'The Britannia',
      description: 'A big, bustling Fuller\'s pub on the high street. Nothing fancy, but solidly good — proper ales, decent food, and enough space to actually get a seat. The pub equivalent of a reliable friend.',
      historicNote: 'Kensington was a village until the railways arrived. The pubs followed.',
      recommendedDrink: 'Fuller\'s London Pride',
      walkToNext: '9 min walk',
    },
  },
  {
    number: 25,
    name: 'Notting Hill Gate',
    interchanges: ['central', 'district'],
    lat: 51.5094,
    lng: -0.1967,
    pub: {
      name: 'The Churchill Arms',
      description: 'Possibly London\'s most photographed pub — the entire exterior is covered in hanging baskets and, at Christmas, thousands of lights. Inside, every inch of ceiling is covered in chamber pots, jugs, and Churchill memorabilia. Bonkers and brilliant.',
      historicNote: 'Winston Churchill\'s grandparents were regulars. The landlord was obsessed.',
      recommendedDrink: 'Fuller\'s London Pride, plus Thai food from the back room',
      walkToNext: '10 min walk',
    },
  },
  {
    number: 26,
    name: 'Bayswater',
    interchanges: ['district'],
    lat: 51.5121,
    lng: -0.1879,
    pub: {
      name: 'The Cleveland Arms',
      description: 'A proper neighbourhood local in a quiet Bayswater backstreet. Small, friendly, with a little terrace for summer and a fire for winter. The kind of pub you wish was your local.',
      historicNote: 'Bayswater was London\'s most fashionable address in Victorian times.',
      recommendedDrink: 'Greene King IPA',
      walkToNext: '8 min walk',
    },
  },
  {
    number: 27,
    name: 'Paddington',
    interchanges: ['bakerloo', 'district', 'hammersmith-city', 'elizabeth'],
    lat: 51.5154,
    lng: -0.1755,
    pub: {
      name: 'The Pride of Paddington',
      description: 'A small, scruffy, utterly authentic railway pub yards from the station. Paddington Bear would approve of the lack of pretension. You\'ve made it round the Circle. You deserve a pint in a pub that doesn\'t try too hard.',
      historicNote: 'Brunel\'s Great Western Railway made Paddington the gateway to the West.',
      recommendedDrink: 'Whatever you want — you\'ve earned it',
      walkToNext: 'You\'re done. Or go back to Edgware Road and complete the loop.',
    },
  },
];

// Accent color for Circle Line
const CIRCLE_LINE_YELLOW = '#FFD300';

interface TubeStopCardProps {
  station: Station;
  onClick: () => void;
}

function InterchangeBadge({ line }: { line: string }) {
  const color = LINE_COLORS[line] || '#666';
  const displayName = line
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' & ');

  return (
    <span
      className="inline-block w-4 h-4 rounded-full border-2 border-white"
      style={{ backgroundColor: color }}
      title={displayName}
    />
  );
}

function TubeStopCard({ station, onClick }: TubeStopCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow h-full flex flex-col"
      onClick={onClick}
    >
      {/* Top bar - Circle Line yellow */}
      <div
        className="h-3 w-full"
        style={{ backgroundColor: CIRCLE_LINE_YELLOW }}
      />

      {/* Station number roundel */}
      <div className="flex justify-center -mt-6 relative z-10">
        <div className="relative">
          {/* Outer red circle (like TfL roundel) */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
            style={{ backgroundColor: '#E32017' }}
          >
            {/* Inner blue bar with number */}
            <div className="w-12 h-5 bg-[#003688] flex items-center justify-center">
              <span className="text-white font-bold text-sm">{station.number}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Station name */}
      <div className="px-4 pt-3 pb-2 text-center">
        <div
          className="inline-block px-3 py-1 rounded text-sm font-bold uppercase tracking-wider"
          style={{ backgroundColor: CIRCLE_LINE_YELLOW, color: '#1C2632' }}
        >
          {station.name}
        </div>
      </div>

      {/* Interchange lines */}
      <div className="flex justify-center gap-1 px-4 py-2">
        {station.interchanges.map((line) => (
          <InterchangeBadge key={line} line={line} />
        ))}
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-[#E8E4DD]" />

      {/* Pub name */}
      <div className="px-4 py-4 flex-grow">
        <h3 className="font-serif text-xl font-bold text-[#1C2632] text-center mb-2">
          {station.pub.name}
        </h3>
        <p className="text-[#4A5568] text-sm text-center line-clamp-3">
          {station.pub.description}
        </p>
      </div>

      {/* Bottom bar with drink recommendation */}
      <div className="px-4 py-3 bg-[#F5F2ED] border-t border-[#E8E4DD]">
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-[#722F37]">🍺</span>
          <span className="text-[#4A5568] truncate">{station.pub.recommendedDrink}</span>
        </div>
      </div>
    </div>
  );
}

interface PubModalProps {
  station: Station;
  onClose: () => void;
}

function PubModal({ station, onClose }: PubModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Circle Line styling */}
        <div
          className="p-6 text-center relative"
          style={{ backgroundColor: CIRCLE_LINE_YELLOW }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-[#1C2632]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Roundel */}
          <div className="flex justify-center mb-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#E32017' }}
            >
              <div className="w-14 h-6 bg-[#003688] flex items-center justify-center">
                <span className="text-white font-bold">{station.number}</span>
              </div>
            </div>
          </div>

          {/* Station name */}
          <h2 className="font-bold text-xl text-[#1C2632] uppercase tracking-wider">
            {station.name}
          </h2>

          {/* Interchanges */}
          <div className="flex justify-center gap-2 mt-2">
            {station.interchanges.map((line) => (
              <InterchangeBadge key={line} line={line} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Pub name */}
          <h3 className="font-serif text-2xl font-bold text-[#1C2632] mb-4">
            {station.pub.name}
          </h3>

          {/* Description */}
          <p className="text-[#4A5568] leading-relaxed mb-6">
            {station.pub.description}
          </p>

          {/* Historic note */}
          <div
            className="rounded-lg p-4 mb-6"
            style={{ backgroundColor: `${CIRCLE_LINE_YELLOW}20`, borderLeft: `3px solid ${CIRCLE_LINE_YELLOW}` }}
          >
            <p className="text-[#1C2632] text-sm italic">
              {station.pub.historicNote}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">🍺</span>
              <div>
                <div className="text-xs text-[#4A5568] uppercase tracking-wider">Recommended</div>
                <div className="text-[#1C2632] font-medium">{station.pub.recommendedDrink}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🚶</span>
              <div>
                <div className="text-xs text-[#4A5568] uppercase tracking-wider">Next Stop</div>
                <div className="text-[#1C2632] font-medium">{station.pub.walkToNext}</div>
              </div>
            </div>
          </div>

          {/* Directions button */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${station.lat},${station.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: CIRCLE_LINE_YELLOW, color: '#1C2632' }}
          >
            Get Directions
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CircleLinePage() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  // Map locations
  const mapLocations = stations.map((s) => ({
    name: `${s.number}. ${s.name} - ${s.pub.name}`,
    lat: s.lat,
    lng: s.lng,
    number: s.number,
  }));

  return (
    <CrawlLayout crawlName="Circle Line Challenge" accentColor={CIRCLE_LINE_YELLOW}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 bg-gradient-to-b from-[#1C2632] to-[#2a3847]">
        {/* Animated Circle Line ring background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
          <svg viewBox="0 0 400 400" className="w-[500px] h-[500px] md:w-[700px] md:h-[700px]">
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke={CIRCLE_LINE_YELLOW}
              strokeWidth="6"
              className="animate-pulse"
            />
            {Array.from({ length: 27 }).map((_, i) => {
              const angle = (i / 27) * Math.PI * 2 - Math.PI / 2;
              const x = 200 + Math.cos(angle) * 150;
              const y = 200 + Math.sin(angle) * 150;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="5"
                  fill={CIRCLE_LINE_YELLOW}
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              );
            })}
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Roundel badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#E32017' }}
            >
              <div className="w-5 h-2 bg-[#003688]" />
            </div>
            <span className="text-white font-bold uppercase tracking-wider text-sm">Circle Line</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            The Circle Line{' '}
            <span style={{ color: CIRCLE_LINE_YELLOW }}>Challenge</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
            27 Stations. 27 Pubs. One Loop. Good Luck.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-10">
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: CIRCLE_LINE_YELLOW }}>27</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">Pubs</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block" />
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: CIRCLE_LINE_YELLOW }}>~14</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">Miles</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block" />
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: CIRCLE_LINE_YELLOW }}>10+</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">Hours</div>
            </div>
          </div>

          {/* Difficulty badge */}
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold uppercase tracking-widest text-sm rounded mb-8">
            Difficulty: EPIC
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#route"
              className="px-8 py-4 rounded-lg font-bold text-[#1C2632] hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              style={{ backgroundColor: CIRCLE_LINE_YELLOW }}
            >
              See the Route
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C2632] mb-8">
            The Rules Are Simple
          </h2>
          <div className="space-y-6 text-lg text-[#4A5568] leading-relaxed">
            <p>
              Start at Edgware Road. Have a drink at a pub near every station on the Circle Line loop.
              Finish back where you started. That&apos;s it. That&apos;s the challenge.
            </p>
            <p>
              This is arguably London&apos;s most famous pub crawl challenge. People have been attempting
              it for decades — hen parties, stag dos, charity fundraisers, and friends who should know
              better. The Circle Line calls to a certain kind of drinker.
            </p>
            <p>
              Let&apos;s be honest: doing all 27 is <em className="text-[#722F37]">genuinely hard</em>. Most groups won&apos;t finish.
              That&apos;s fine. This isn&apos;t a competition — it&apos;s an adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Route Section - Carousel */}
      <section id="route" className="py-16 md:py-24 px-6 bg-[#F5F2ED]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C2632] mb-4">
              The Route
            </h2>
            <p className="text-[#4A5568] max-w-xl mx-auto">
              27 stations. 27 pubs. Clockwise from Edgware Road. Tap any card for details.
            </p>
          </div>

          <PubCarousel title="All Stops">
            {stations.map((station) => (
              <TubeStopCard
                key={station.number}
                station={station}
                onClick={() => setSelectedStation(station)}
              />
            ))}
          </PubCarousel>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-16 md:py-24 px-6 bg-[#161B22]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#F5F0E8] text-center mb-4">
            The Circle
          </h2>
          <p className="text-[#8B9AAD] text-center mb-8">
            Follow the route station by station. Click any stop to see details.
          </p>
          <InteractiveMap
            locations={mapLocations}
            accentColor={CIRCLE_LINE_YELLOW}
          />
        </div>
      </section>

      {/* Logistics */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C2632] mb-8 text-center">
            Before You Go
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Route details */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8E4DD]">
              <h3 className="font-semibold text-[#1C2632] mb-4 uppercase tracking-wider text-sm">
                Route Details
              </h3>
              <dl className="space-y-3 text-[#4A5568]">
                <div className="flex justify-between">
                  <dt className="text-[#4A5568]/60">Start</dt>
                  <dd>Edgware Road (Circle Line)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#4A5568]/60">End</dt>
                  <dd>Paddington / back to start</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#4A5568]/60">Total distance</dt>
                  <dd>~14 miles on foot</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#4A5568]/60">Duration</dt>
                  <dd>10-12 hours (with drinks)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#4A5568]/60">Best day</dt>
                  <dd>Saturday</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#4A5568]/60">Start time</dt>
                  <dd>11am</dd>
                </div>
              </dl>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#E8E4DD]">
              <h3 className="font-semibold text-[#1C2632] mb-4 uppercase tracking-wider text-sm">
                Essential Tips
              </h3>
              <ul className="space-y-3 text-[#4A5568] text-sm">
                <li className="flex gap-3">
                  <span className="flex-shrink-0" style={{ color: CIRCLE_LINE_YELLOW }}>⚠️</span>
                  <span>City pubs (Monument, Cannon Street, Mansion House, Moorgate) often close weekends. Check ahead.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0" style={{ color: CIRCLE_LINE_YELLOW }}>🚇</span>
                  <span>You walk between pubs — not ride. But keep an Oyster card handy for emergencies.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0" style={{ color: CIRCLE_LINE_YELLOW }}>🥪</span>
                  <span>Eat. Seriously. Stop for food around pub 10 and pub 20.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0" style={{ color: CIRCLE_LINE_YELLOW }}>👟</span>
                  <span>Comfortable shoes. You&apos;ll thank us by Station 15.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pub Modal */}
      {selectedStation && (
        <PubModal
          station={selectedStation}
          onClose={() => setSelectedStation(null)}
        />
      )}
    </CrawlLayout>
  );
}
