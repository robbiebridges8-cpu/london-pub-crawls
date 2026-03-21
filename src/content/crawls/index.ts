export type { BasePub } from './types';

export interface CrawlLogistics {
  tubeStart: string;
  tubeEnd: string;
  suggestedStart: string;
  bestDay: string;
  pacingTips: string;
  specialNotes?: string;
}

export interface Crawl {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  editorialDescription?: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  area: string;
  live: boolean;
  url?: string;
  accentColor: string;
  secondaryColor: string;
  pubCount?: number;
  freshnessCaveat?: string;
  logistics?: CrawlLogistics;
}

export const crawls: Crawl[] = [
  {
    id: '1',
    slug: 'monopoly',
    name: 'Monopoly Board',
    tagline: 'All 28 board spaces. All by foot.',
    description: 'Visit 26 pubs mapped to every property on the Monopoly board. From Old Kent Road to Mayfair.',
    editorialDescription: 'The ultimate London pub crawl. Twenty-six pubs, one for each property on the Monopoly board. Start at Old Kent Road, finish at Mayfair — if you make it. This isn\'t a casual afternoon; it\'s a proper expedition through London\'s drinking history, mapped onto the world\'s most famous board game.',
    duration: 'Full day',
    difficulty: 'Legendary',
    area: 'Central London',
    live: true,
    url: 'https://monopolypubcrawl.com',
    pubCount: 26,
    accentColor: '#D4001A',
    secondaryColor: '#1E8449',
    logistics: {
      tubeStart: 'Elephant & Castle',
      tubeEnd: 'Oxford Circus',
      suggestedStart: '11:00 AM',
      bestDay: 'Saturday',
      pacingTips: 'Stick to halves early on to bank time. Eat around pub 8-10. The City pubs close early on weekends.',
      specialNotes: 'Some City pubs are closed on weekends. Check opening times for Fleet Street stops.',
    },
  },
  {
    id: '2',
    slug: 'jack-the-ripper',
    name: 'Jack the Ripper',
    tagline: 'Whitechapel\'s darkest corners, one pint at a time.',
    description: 'Follow the trail through the historic pubs of the East End where Victorian London\'s darkest chapter unfolded.',
    editorialDescription: 'Whitechapel, 1888. The East End\'s fog-shrouded streets held secrets that still echo today. This crawl takes you through the pubs where the victims drank, where suspects were questioned, and where Victorian London confronted its darkest hour. Not for the faint-hearted — in any sense.',
    duration: '4 hours',
    difficulty: 'Easy',
    area: 'Whitechapel',
    live: true,
    accentColor: '#8B1A1A',
    secondaryColor: '#1C1C1C',
    pubCount: 6,
    logistics: {
      tubeStart: 'Aldgate East',
      tubeEnd: 'Aldgate',
      suggestedStart: '6:00 PM',
      bestDay: 'Thursday or Friday',
      pacingTips: 'Best done as an evening crawl when the atmospheric streets match the mood. One pint per pub keeps it tight.',
      specialNotes: 'Consider joining a walking tour first, then do the pub crawl after for full context.',
    },
  },
  {
    id: '3',
    slug: 'beatles',
    name: 'The Beatles',
    tagline: "Follow the Fab Four through London's drinking spots",
    description: 'Visit the pubs where John, Paul, George and Ringo hung out during their London years.',
    editorialDescription: "The Beatles didn't just change music in London — they lived it, pub by pub. From Brian Epstein's Belgravia local to the Soho haunts of Swinging London, from the Apple Corps offices in Mayfair to a 15th-century riverside pub in Chiswick where they filmed Help!, this crawl traces the Fab Four's London through the places they actually drank. Eight pubs. Four decades of history. One legendary band.",
    duration: 'Full day',
    difficulty: 'Medium',
    area: 'Central London & Chiswick',
    live: true,
    accentColor: '#003087',
    secondaryColor: '#DAA520',
    logistics: {
      tubeStart: 'St John\'s Wood',
      tubeEnd: 'Piccadilly Circus',
      suggestedStart: '12:00 PM',
      bestDay: 'Saturday or Sunday',
      pacingTips: 'Start at Abbey Road for the photo, then work your way through Soho. Perfect pace for a relaxed afternoon.',
      specialNotes: 'Book the Abbey Road crossing photo early — it gets crowded after midday.',
    },
  },
  {
    id: '4',
    slug: 'circle-line',
    name: 'Circle Line Challenge',
    tagline: '27 stops. 27 pubs. The ultimate test.',
    description: 'A pub at every Circle Line station. Complete the loop before the Tube closes.',
    editorialDescription: 'The Circle Line Challenge is London\'s ultimate pub crawl endurance test. One pub at every station on the Circle Line — 27 stops, 27 pubs, one continuous loop through Zone 1. You start at Edgware Road and work your way around the entire circle before the Tube closes. Most groups don\'t make it past Embankment. The ones who complete the loop earn bragging rights that last a lifetime.',
    duration: '10 hours',
    difficulty: 'Legendary',
    area: 'Zone 1',
    live: true,
    pubCount: 27,
    accentColor: '#FFD300',
    secondaryColor: '#003688',
    logistics: {
      tubeStart: 'Edgware Road',
      tubeEnd: 'Edgware Road',
      suggestedStart: '10:00 AM',
      bestDay: 'Saturday',
      pacingTips: 'One drink per pub. Eat at stops 9, 18, and 25. The full 27 is a marathon — pace yourself.',
      specialNotes: 'Some City pubs close on weekends. Check times for stops around Bank and Monument.',
    },
  },
  {
    id: '5',
    slug: 'south-bank',
    name: 'South Bank',
    tagline: "London's greatest riverside pubs, Blackfriars to Wapping",
    description: 'Three miles along the Thames, six pubs, and 500 years of London drinking history.',
    editorialDescription: "Three miles along the Thames, six pubs, and 500 years of London drinking history. Start at the Art Nouveau splendour of the Black Friar, cross to the South Bank for views of St Paul's and Shakespeare's Globe, duck into London's last coaching inn, then follow the river east past Tower Bridge to finish at the oldest riverside pub in London. This is the Thames at its best \u2014 and you're walking the whole thing.",
    duration: '4\u20135 hours',
    difficulty: 'Easy',
    area: 'South Bank & Wapping',
    live: true,
    pubCount: 6,
    accentColor: '#0098D4',
    secondaryColor: '#C0C0C0',
    logistics: {
      tubeStart: 'Blackfriars',
      tubeEnd: 'Wapping',
      suggestedStart: '1:00 PM',
      bestDay: 'Sunday',
      pacingTips: 'Perfect for a lazy Sunday afternoon stroll. Take your time with the views. Bring a camera.',
      specialNotes: 'The route works both directions — start at Wapping for sunset views over the City.',
    },
  },
  {
    id: '7',
    slug: 'criminal-london',
    name: 'Criminal London',
    tagline: 'Gangsters, smugglers, and the pubs where it all went down',
    description: 'Six pubs where London\'s most notorious crimes were planned, committed, or punished.',
    editorialDescription: 'London\'s criminal history didn\'t happen in dark alleys — it happened in pubs. Ronnie Kray committed murder in a Whitechapel saloon bar. Body snatchers drugged their victims next to a hospital. Pirates were hanged outside a riverside tavern. This crawl visits six pubs where London\'s most notorious crimes were planned, committed, or punished — east to west, from the Krays\' Whitechapel to the Old Bailey.',
    duration: 'Full day',
    difficulty: 'Easy',
    area: 'Central London, Wapping & East End',
    live: true,
    accentColor: '#1A1A2E',
    secondaryColor: '#8B1A1A',
    pubCount: 6,
    logistics: {
      tubeStart: 'Whitechapel',
      tubeEnd: 'St Paul\'s',
      suggestedStart: '12:00 PM',
      bestDay: 'Saturday',
      pacingTips: 'The Wapping stretch is the longest gap — use the Overground. One pint per pub, eat around stop 3 or 4.',
      specialNotes: 'The route runs east to west. Some riverside pubs get busy on weekend afternoons — arrive before the crowds.',
    },
  },
  {
    id: '8',
    slug: 'ww2',
    name: 'WW2 London',
    tagline: 'Blitz spirit — the pubs that survived the bombs.',
    description: 'Visit the pubs that kept spirits high through the darkest days. Stories of resilience and courage.',
    duration: '4 hours',
    difficulty: 'Easy',
    area: 'City & Westminster',
    live: false,
    accentColor: '#4A5D23',
    secondaryColor: '#D4B896',
  },
  {
    id: '9',
    slug: 'david-bowie',
    name: 'David Bowie',
    tagline: 'Brixton to Soho — Ziggy\'s London, pub by pub.',
    description: 'From Brixton to the West End, drink in the pubs and haunts of the Starman himself.',
    duration: '5 hours',
    difficulty: 'Medium',
    area: 'Brixton & Soho',
    live: false,
    accentColor: '#E63946',
    secondaryColor: '#FFD700',
  },
  {
    id: '10',
    slug: 'rolling-stones',
    name: 'Rolling Stones',
    tagline: 'Chelsea to Richmond — rock and roll\'s pub crawl.',
    description: 'Follow Mick and Keith through the pubs of Richmond, Chelsea and Soho where the Stones got their start.',
    duration: '5 hours',
    difficulty: 'Medium',
    area: 'Chelsea & Richmond',
    live: false,
    accentColor: '#1C1C8A',
    secondaryColor: '#F5F5DC',
  },
  {
    id: '11',
    slug: 'bermondsey-beer-mile',
    name: 'Bermondsey Beer Mile',
    tagline: 'South London\'s legendary brewery trail, arch by arch',
    description: 'Eight of the best taprooms on the Beer Mile, from The Kernel to Southwark Brewing.',
    editorialDescription: 'The Beer Mile started in 2009 when The Kernel set up under a railway arch in Bermondsey. Now there are twenty-odd taprooms packed into the arches between Bermondsey and London Bridge, pouring everything from hop-forward pale ales to barrel-aged sours to London\'s only draught mead. This is our pick of the best — eight stops that give you the full range of what the Mile has to offer without destroying you before lunch.',
    freshnessCaveat: 'Bermondsey Beer Mile taprooms change frequently \u2014 they move, close, and adjust their hours without much warning. Most are open Saturdays only, roughly 11am to 6pm. A few also open Fridays and Sundays. Always check before you go. This guide was last verified in March 2026.',
    duration: '4–6 hours',
    difficulty: 'Medium',
    area: 'Bermondsey',
    live: true,
    accentColor: '#D4A03C',
    secondaryColor: '#B87333',
    logistics: {
      tubeStart: 'Bermondsey',
      tubeEnd: 'London Bridge',
      suggestedStart: '11:00 AM',
      bestDay: 'Saturday',
      pacingTips: 'Stick to thirds and halves — eight taprooms adds up fast. Eat at Maltby Street Market around stop 5 or 6.',
      specialNotes: 'Most taprooms are Saturday only. Check individual opening hours before you go. Some also open Fridays and Sundays.',
    },
  },
  {
    id: '13',
    slug: 'historic-london',
    name: 'Historic London',
    tagline: "London's oldest and most storied pubs, Fleet Street to Wapping",
    description: 'Eight of London\'s most historic pubs, spanning 500 years of drinking history.',
    editorialDescription: "Every pub on this crawl has survived something — the Great Fire, the Blitz, the developers, or just the slow grind of centuries. From a Fleet Street tavern rebuilt in 1667 to a riverside den where Tudor pirates drank, this is a walk through London's drinking history. Eight pubs spanning 500 years. Dickens drank in at least four of them. You'll understand why.",
    duration: '5\u20136 hours',
    difficulty: 'Medium',
    area: 'Fleet Street to Wapping',
    live: true,
    pubCount: 8,
    accentColor: '#8B4513',
    secondaryColor: '#F5E6C8',
    logistics: {
      tubeStart: 'Chancery Lane',
      tubeEnd: 'Wapping',
      suggestedStart: '12:00 PM',
      bestDay: 'Saturday',
      pacingTips: 'The Fleet Street pubs are close together — pace yourself early. The walk from Southwark to Wapping is the longest stretch.',
      specialNotes: 'Ye Olde Cheshire Cheese and Ye Olde Mitre close early on weekends. Check times before you go.',
    },
  },
  {
    id: '12',
    slug: 'royal-family',
    name: 'Royal Family',
    tagline: 'Palace-adjacent pints and ceremonial routes.',
    description: 'Visit the pubs with royal connections, from historic royal warrants to where princes have been spotted.',
    duration: '4 hours',
    difficulty: 'Easy',
    area: 'Mayfair & Westminster',
    live: false,
    accentColor: '#7B2D8E',
    secondaryColor: '#D4AF37',
  },
  {
    id: '14',
    slug: 'literary-london',
    name: 'Literary London',
    tagline: "Where London's writers drank \u2014 Dickens, Orwell, Woolf, and more",
    description: "Eight pubs where London's greatest writers drank, argued, and left manuscripts under their chairs.",
    editorialDescription: "London's greatest writers didn't write in isolation. They wrote in pubs, argued in pubs, fell in love in pubs, and occasionally left their manuscripts under the chair. This crawl traces the drinking habits of the literary canon \u2014 from the Fitzrovia boozers where Orwell and Dylan Thomas held court, through the Bloomsbury local where Dickens was a regular, to the Fleet Street tavern where Johnson, Twain, and Yeats all raised a glass. Eight pubs. Five centuries of literature. Bring a book.",
    duration: '4\u20135 hours',
    difficulty: 'Medium',
    area: 'Fitzrovia, Soho & Southwark',
    live: true,
    pubCount: 8,
    accentColor: '#2E4057',
    secondaryColor: '#F5E6C8',
    logistics: {
      tubeStart: 'Goodge Street',
      tubeEnd: 'London Bridge',
      suggestedStart: '1:00 PM',
      bestDay: 'Thursday or Friday',
      pacingTips: 'Fitzrovia and Soho pubs are within walking distance of each other. The jump to Fleet Street and then Borough requires the Tube.',
      specialNotes: 'The French House serves half pints only — that\'s tradition, not a suggestion. Ye Olde Cheshire Cheese is cash only.',
    },
  },
];

// Helper to get a crawl by slug
export function getCrawlBySlug(slug: string): Crawl | undefined {
  return crawls.find(crawl => crawl.slug === slug);
}

// Helper to get pub count for a crawl
export function getPubCount(crawl: Crawl): number {
  return crawl.pubCount ?? 0;
}
