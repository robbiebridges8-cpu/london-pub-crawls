'use client';

import { useEffect, useState, useRef } from 'react';

// Tube line colors
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
    pub: {
      name: 'The Pride of Paddington',
      description: 'A small, scruffy, utterly authentic railway pub yards from the station. Paddington Bear would approve of the lack of pretension. You\'ve made it round the Circle. You deserve a pint in a pub that doesn\'t try too hard.',
      historicNote: 'Brunel\'s Great Western Railway made Paddington the gateway to the West.',
      recommendedDrink: 'Whatever you want — you\'ve earned it',
      walkToNext: 'You\'re done. Or go back to Edgware Road and complete the loop.',
    },
  },
];

function InterchangeBadge({ line }: { line: string }) {
  const color = LINE_COLORS[line] || '#666';
  const displayName = line.split('-').map(word => word.charAt(0).toUpperCase()).join('&');

  return (
    <span
      className="inline-block w-4 h-4 rounded-full border-2 border-white/20"
      style={{ backgroundColor: color }}
      title={line.replace('-', ' & ')}
    />
  );
}

function StationCard({ station, isVisible }: { station: Station; isVisible: boolean }) {
  const isLeft = station.number % 2 === 1;

  return (
    <div
      className={`relative flex items-start gap-6 md:gap-12 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Station node on the line */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center z-10">
        {/* Roundel-inspired station marker */}
        <div className="relative">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#FFD300] flex items-center justify-center shadow-lg shadow-[#FFD300]/30">
            <span className="font-bold text-[#0f0f0f] text-sm md:text-base">{station.number}</span>
          </div>
          {/* Pulse effect */}
          <div className={`absolute inset-0 rounded-full bg-[#FFD300] animate-ping opacity-20 ${isVisible ? '' : 'hidden'}`} />
        </div>
      </div>

      {/* Card content */}
      <div className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5 hover:border-[#FFD300]/30 transition-colors">
          {/* Station name with interchanges */}
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-sans text-lg md:text-xl font-bold text-[#FFD300] uppercase tracking-wide">
              {station.name}
            </h3>
            <div className="flex gap-1">
              {station.interchanges.map((line) => (
                <InterchangeBadge key={line} line={line} />
              ))}
            </div>
          </div>

          {/* Pub name */}
          <h4 className="font-serif text-2xl md:text-3xl text-[#F5F0E8] mb-3">
            {station.pub.name}
          </h4>

          {/* Description */}
          <p className="text-[#F5F0E8]/70 leading-relaxed mb-4">
            {station.pub.description}
          </p>

          {/* Historic note */}
          <div className="bg-[#FFD300]/10 border-l-2 border-[#FFD300] px-4 py-2 mb-4">
            <p className="text-[#FFD300] text-sm italic">{station.pub.historicNote}</p>
          </div>

          {/* Details row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#F5F0E8]/50">
            <span className="flex items-center gap-2">
              <span className="text-[#FFD300]">🍺</span>
              {station.pub.recommendedDrink}
            </span>
            <span className="hidden md:block w-px h-4 bg-white/20" />
            <span className="flex items-center gap-2">
              <span className="text-[#FFD300]">→</span>
              {station.pub.walkToNext}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CircleLinePage() {
  const [visibleStations, setVisibleStations] = useState<Set<number>>(new Set());
  const [currentStation, setCurrentStation] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const stationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const routeSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stationRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleStations((prev) => new Set([...prev, index + 1]));
                setCurrentStation(index + 1);
              }
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (routeSectionRef.current) {
        const rect = routeSectionRef.current.getBoundingClientRect();
        const sectionHeight = routeSectionRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrolled = Math.max(0, -rect.top + viewportHeight * 0.3);
        const progress = Math.min(100, Math.max(0, (scrolled / sectionHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristAttraction',
            name: 'Circle Line Challenge Pub Crawl',
            description: '27 stations. 27 pubs. One loop around the Circle Line.',
            url: 'https://londonpubcrawls.com/crawl/circle-line',
          }),
        }}
      />

      <main className="min-h-screen bg-[#0f0f0f] text-[#F5F0E8]">
        {/* Progress indicator - fixed */}
        <div className="fixed top-4 right-4 z-50 bg-[#1a1a1a]/90 backdrop-blur-sm rounded-lg px-4 py-3 border border-[#FFD300]/30 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-[#FFD300]/30 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#FFD300"
                  strokeWidth="4"
                  strokeDasharray={`${scrollProgress * 1.25} 125`}
                  className="transition-all duration-300"
                />
              </svg>
              <span className="text-[#FFD300] font-bold text-sm">{currentStation}</span>
            </div>
            <div className="text-xs">
              <div className="text-[#FFD300] font-semibold">Stop {currentStation}</div>
              <div className="text-[#F5F0E8]/50">of 27</div>
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Circle Line ring background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 400 400" className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-20">
              {/* Outer glow */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Main circle */}
              <circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="#FFD300"
                strokeWidth="8"
                filter="url(#glow)"
                className="animate-pulse"
              />
              {/* Station dots */}
              {Array.from({ length: 27 }).map((_, i) => {
                const angle = (i / 27) * Math.PI * 2 - Math.PI / 2;
                const x = 200 + Math.cos(angle) * 150;
                const y = 200 + Math.sin(angle) * 150;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="6"
                    fill="#FFD300"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-transparent to-[#0f0f0f]" />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            {/* Back link */}
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[#F5F0E8]/50 hover:text-[#FFD300] transition-colors mb-8 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Crawls
            </a>

            {/* Roundel badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD300]/10 border border-[#FFD300]/30 rounded-full mb-8">
              <div className="w-6 h-6 rounded-full bg-[#FFD300] flex items-center justify-center">
                <div className="w-4 h-1 bg-[#0f0f0f]" />
              </div>
              <span className="text-[#FFD300] font-bold uppercase tracking-wider text-sm">Circle Line</span>
            </div>

            {/* Main headline */}
            <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold text-[#FFD300] mb-6 tracking-tight uppercase">
              The Circle Line Challenge
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[#F5F0E8]/80 mb-10 font-light">
              27 Stations. 27 Pubs. One Loop. Good Luck.
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFD300]">27</div>
                <div className="text-sm text-[#F5F0E8]/50 uppercase tracking-wider">Pubs</div>
              </div>
              <div className="w-px h-12 bg-[#FFD300]/30 hidden md:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFD300]">~14</div>
                <div className="text-sm text-[#F5F0E8]/50 uppercase tracking-wider">Miles</div>
              </div>
              <div className="w-px h-12 bg-[#FFD300]/30 hidden md:block" />
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFD300]">10+</div>
                <div className="text-sm text-[#F5F0E8]/50 uppercase tracking-wider">Hours</div>
              </div>
            </div>

            {/* Difficulty badge */}
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold uppercase tracking-widest text-sm rounded mb-10 animate-pulse">
              Difficulty: EPIC
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#route"
                className="px-8 py-4 bg-[#FFD300] text-[#0f0f0f] font-bold rounded-lg hover:bg-[#FFE033] transition-colors inline-flex items-center gap-2"
              >
                See the Route
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <a
                href="#builder"
                className="px-8 py-4 bg-transparent border-2 border-[#FFD300] text-[#FFD300] font-bold rounded-lg hover:bg-[#FFD300]/10 transition-colors"
              >
                Build Your Crawl →
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#FFD300]/50 animate-bounce">
            <span className="text-xs uppercase tracking-widest">Mind the Gap</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </header>

        {/* INTRODUCTION */}
        <section className="py-24 px-6 border-t border-[#FFD300]/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#FFD300] mb-8 uppercase tracking-wide">
              The Rules Are Simple
            </h2>
            <div className="space-y-6 text-lg text-[#F5F0E8]/80 leading-relaxed">
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
                Let&apos;s be honest: doing all 27 is <em>genuinely hard</em>. Most groups won&apos;t finish.
                That&apos;s fine. This isn&apos;t a competition — it&apos;s an adventure. The crawl builder
                below lets you pick your stops, skip the ones that don&apos;t suit, and share a custom route
                with your group. Twenty-seven is a target. Make it your own.
              </p>
            </div>
          </div>
        </section>

        {/* THE ROUTE - Main content */}
        <section id="route" ref={routeSectionRef} className="py-24 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-sans text-4xl md:text-5xl font-bold text-[#FFD300] mb-4 uppercase tracking-wide">
                The Route
              </h2>
              <p className="text-[#F5F0E8]/60 text-lg">
                27 stations. 27 pubs. Clockwise from Edgware Road.
              </p>
            </div>

            {/* Vertical route line */}
            <div className="relative">
              {/* The yellow line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD300] via-[#FFD300] to-[#FFD300]/50 md:-translate-x-1/2" />

              {/* Station cards */}
              <div className="space-y-16 md:space-y-24">
                {stations.map((station, index) => (
                  <div
                    key={station.number}
                    ref={(el) => { stationRefs.current[index] = el; }}
                  >
                    <StationCard
                      station={station}
                      isVisible={visibleStations.has(station.number)}
                    />
                  </div>
                ))}
              </div>

              {/* End marker */}
              <div className="relative flex justify-center pt-16">
                <div className="w-16 h-16 rounded-full bg-[#FFD300] flex items-center justify-center shadow-lg shadow-[#FFD300]/50">
                  <svg className="w-8 h-8 text-[#0f0f0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOGISTICS PANEL */}
        <section className="py-24 px-6 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#FFD300] mb-8 uppercase tracking-wide text-center">
              Before You Go
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Key info */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#FFD300]/20">
                <h3 className="text-[#FFD300] font-bold uppercase tracking-wider text-sm mb-4">Route Details</h3>
                <dl className="space-y-3 text-[#F5F0E8]/80">
                  <div className="flex justify-between">
                    <dt className="text-[#F5F0E8]/50">Start</dt>
                    <dd>Edgware Road (Circle Line)</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#F5F0E8]/50">End</dt>
                    <dd>Paddington / back to start</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#F5F0E8]/50">Total distance</dt>
                    <dd>~14 miles on foot</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#F5F0E8]/50">Duration</dt>
                    <dd>10-12 hours (with drinks)</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#F5F0E8]/50">Best day</dt>
                    <dd>Saturday</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#F5F0E8]/50">Start time</dt>
                    <dd>11am — you&apos;ll need the full day</dd>
                  </div>
                </dl>
              </div>

              {/* Tips */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#FFD300]/20">
                <h3 className="text-[#FFD300] font-bold uppercase tracking-wider text-sm mb-4">Essential Tips</h3>
                <ul className="space-y-3 text-[#F5F0E8]/80 text-sm">
                  <li className="flex gap-3">
                    <span className="text-[#FFD300]">⚠️</span>
                    <span>City pubs (Monument, Cannon Street, Mansion House, Moorgate) often close weekends. Check ahead or use the Crawl Builder for alternatives.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FFD300]">🚇</span>
                    <span>You don&apos;t ride the Circle Line — you walk between pubs. But keep an Oyster card handy for when legs give out.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FFD300]">🥪</span>
                    <span>Eat. Seriously. This isn&apos;t a sprint. Stop for food around pub 10 and pub 20.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FFD300]">👟</span>
                    <span>Comfortable shoes. You&apos;ll thank us by Station 15.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CRAWL BUILDER CTA */}
        <section id="builder" className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#FFD300] mb-4 uppercase tracking-wide">
              27 Is a Lot. Build Your Own.
            </h2>
            <p className="text-[#F5F0E8]/60 text-lg mb-8 max-w-xl mx-auto">
              Not everyone can (or should) do all 27. Pick your stops, skip the ones you don&apos;t fancy,
              and share a custom route with your group.
            </p>
            <div className="inline-block bg-[#1a1a1a] border border-[#FFD300]/30 rounded-xl p-8">
              <div className="text-[#FFD300] font-bold uppercase tracking-wider text-sm mb-4">Coming Soon</div>
              <p className="text-[#F5F0E8]/60 mb-6 text-sm">
                The Circle Line Crawl Builder is under construction. Get notified when it launches.
              </p>
              <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD300]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FFD300] text-[#0f0f0f] font-bold rounded-lg hover:bg-[#FFE033] transition-colors"
                >
                  Notify Me
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* SHARE SECTION */}
        <section className="py-16 px-6 bg-[#0a0a0a]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-[#F5F0E8] mb-4">
              Think you can finish all 27? Prove it.
            </h2>
            <p className="text-[#F5F0E8]/50 mb-6">
              Share this crawl with your group and start planning
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent('The Circle Line Challenge: 27 stations, 27 pubs, one loop. Are you in? https://londonpubcrawls.com/crawl/circle-line')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('The Circle Line Challenge: 27 stations, 27 pubs, one loop around the Tube. Who\'s in?')}&url=${encodeURIComponent('https://londonpubcrawls.com/crawl/circle-line')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <button
                onClick={() => navigator.clipboard.writeText('https://londonpubcrawls.com/crawl/circle-line')}
                className="w-12 h-12 rounded-full bg-[#F5F0E8]/10 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5 text-[#F5F0E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* OTHER CRAWLS */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-[#F5F0E8] mb-8 text-center">
              If you liked this, try...
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Monopoly Pub Crawl', slug: 'monopoly', color: '#D4001A', tagline: '26 pubs, one for each property' },
                { name: 'Thames Path', slug: 'thames-path', color: '#2E6B8A', tagline: 'Tower Bridge to Westminster' },
                { name: 'Jack the Ripper', slug: 'jack-the-ripper', color: '#8B1A1A', tagline: 'Whitechapel\'s darkest corners' },
              ].map((crawl) => (
                <a
                  key={crawl.slug}
                  href={`/crawl/${crawl.slug}`}
                  className="block bg-[#1a1a1a] rounded-xl p-6 border border-white/5 hover:border-white/20 transition-colors group"
                >
                  <div
                    className="w-10 h-10 rounded-full mb-4"
                    style={{ backgroundColor: crawl.color }}
                  />
                  <h3 className="font-serif text-xl text-[#F5F0E8] group-hover:text-[#FFD300] transition-colors mb-2">
                    {crawl.name}
                  </h3>
                  <p className="text-[#F5F0E8]/50 text-sm">{crawl.tagline}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 px-6 border-t border-[#FFD300]/10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <a href="/" className="font-serif text-xl font-bold text-[#FFD300] hover:text-[#FFE033] transition-colors">
                  London Pub Crawls
                </a>
                <p className="text-[#F5F0E8]/40 text-sm mt-2">
                  Made in London. Researched on foot. Written with a pint in hand.
                </p>
              </div>
              <nav className="flex items-center gap-6 text-sm">
                <a href="/" className="text-[#F5F0E8]/50 hover:text-[#FFD300] transition-colors">Home</a>
                <a href="/#crawls" className="text-[#F5F0E8]/50 hover:text-[#FFD300] transition-colors">All Crawls</a>
                <a href="#" className="text-[#F5F0E8]/50 hover:text-[#FFD300] transition-colors">About</a>
                <a href="mailto:hello@londonpubcrawls.com" className="text-[#F5F0E8]/50 hover:text-[#FFD300] transition-colors">Contact</a>
              </nav>
            </div>
            <div className="text-center mt-12 pt-8 border-t border-white/5">
              <p className="text-[#F5F0E8]/30 text-xs">
                &copy; {new Date().getFullYear()} London Pub Crawls. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
