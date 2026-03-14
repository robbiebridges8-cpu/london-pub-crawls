// Beatles Pub Crawl - Follow the Fab Four through London's drinking spots

export interface BeatlesPub {
  id: number;
  pubName: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  review: string;
  connection: string;
  walkToNext: string | null;
  website?: string;
}

export const beatlesPubs: BeatlesPub[] = [
  {
    id: 1,
    pubName: 'The Horse & Groom',
    address: '7 Groom Place, Belgravia',
    postcode: 'SW1X 7BA',
    lat: 51.5010,
    lng: -0.1528,
    connection: "Epstein's local",
    review: "Hidden down a cobbled Belgravia mews, this was the Beatles' local when visiting manager Brian Epstein, who lived round the corner on Chapel Street. Band meetings happened over pints here. Epstein was found dead at his Chapel Street home in August 1967.",
    walkToNext: '3 min walk',
  },
  {
    id: 2,
    pubName: 'The Star Tavern',
    address: '6 Belgrave Mews West',
    postcode: 'SW1X 8HT',
    lat: 51.5013,
    lng: -0.1565,
    connection: '60s Belgravia circuit',
    review: "Another mews gem just minutes from the Horse & Groom. The Star was part of the Belgravia circuit for London's 1960s elite — actors, musicians, and the Great Train Robbers reportedly planned their heist upstairs. A proper Fuller's pub with one of the best beer gardens in SW1.",
    walkToNext: '15 min walk or Tube to Oxford Circus',
  },
  {
    id: 3,
    pubName: "The Shakespeare's Head",
    address: '29 Great Marlborough Street',
    postcode: 'W1F 7HZ',
    lat: 51.5133,
    lng: -0.1393,
    connection: "Lennon's Soho opener",
    review: "John Lennon used this Carnaby Street pub as an evening opener on multiple occasions in 1963, when Soho was the beating heart of Swinging London. The London Palladium — where Beatlemania was born that October — is a two-minute walk. A bust of Shakespeare missing a hand peers down from the first floor.",
    walkToNext: '5 min walk',
  },
  {
    id: 4,
    pubName: 'The Pillars of Hercules',
    address: '7 Greek Street',
    postcode: 'W1D 4DF',
    lat: 51.5138,
    lng: -0.1310,
    connection: 'Soho haunt',
    review: "A Soho institution on Greek Street. The Beatles haunted Soho's pubs and clubs throughout the mid-60s — the Ad Lib club was around the corner, Trident Studios where they recorded Hey Jude was on St Anne's Court. Dark wood, good beer, and the ghost of a thousand late-night sessions.",
    walkToNext: '10 min walk',
  },
  {
    id: 5,
    pubName: 'The Devonshire Arms',
    address: '7 Duke Street',
    postcode: 'W1U 3EG',
    lat: 51.5165,
    lng: -0.1500,
    connection: 'Apple Corps local',
    review: "Within stumbling distance of the Apple Corps offices on Savile Row and the earlier Wigmore Street office, the Devonshire was a regular haunt of the Fab Four in 1968-69. When Apple was in full swing — and full chaos — this is where they'd slip out for a pint between meetings.",
    walkToNext: '5 min walk',
  },
  {
    id: 6,
    pubName: 'The Barley Mow',
    address: '8 Dorset Street',
    postcode: 'W1U 6QW',
    lat: 51.5188,
    lng: -0.1543,
    connection: 'Near EMI House',
    review: "Sits on the Marylebone backstreets near the old Apple offices. EMI House on Manchester Square — where the Please Please Me album cover was shot on that famous staircase — is just around the corner. A quiet local pub that feels like it's been here forever, because it has.",
    walkToNext: 'Take Northern line to Kentish Town',
  },
  {
    id: 7,
    pubName: 'The Prince of Wales',
    address: '71 Prince of Wales Road',
    postcode: 'NW5 3SA',
    lat: 51.5532,
    lng: -0.1476,
    connection: "Lennon's north London",
    review: "Up in Kentish Town, this was a favourite of John and Yoko during their London years. Close to Abbey Road Studios and the area where Lennon spent time during the lost weekend years. A proper locals' pub, no pretensions.",
    walkToNext: 'Take Overground to Kew Bridge',
  },
  {
    id: 8,
    pubName: 'The City Barge',
    address: '27 Strand-on-the-Green',
    postcode: 'W4 3PH',
    lat: 51.4872,
    lng: -0.2678,
    connection: 'Help! filming location',
    review: "The grand finale — worth the trip to Chiswick. This 15th-century riverside pub is where the Beatles filmed the tiger-in-the-cellar scene in Help! Ringo ordered 'two lagers and lime, and two lagers and lime' at this very bar. Built in 1484, views of the Thames, and the alleyway they ran down is still there.",
    walkToNext: null,
  },
];

// Calculate stats
export const beatlesStats = {
  totalPubs: beatlesPubs.length,
  estimatedTime: 'Full day',
  area: 'Central London & Chiswick',
};

// Helper to get Google Maps URL for a pub
export function getBeatlesMapsUrl(pub: BeatlesPub): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.pubName}, ${pub.address}, ${pub.postcode}`)}`;
}

// Helper to get directions from one pub to the next
export function getBeatlesDirectionsUrl(fromPub: BeatlesPub, toPub: BeatlesPub): string {
  const origin = encodeURIComponent(`${fromPub.pubName}, ${fromPub.address}`);
  const destination = encodeURIComponent(`${toPub.pubName}, ${toPub.address}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
}
