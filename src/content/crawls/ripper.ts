// Jack the Ripper Pub Crawl - Whitechapel's Darkest History

export interface RipperPub {
  id: number;
  pubName: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  review: string;
  walkToNext: number | null;
  website?: string;
}

export const ripperPubs: RipperPub[] = [
  {
    id: 1,
    pubName: 'The White Hart',
    address: '89 Whitechapel High Street',
    postcode: 'E1 7RA',
    lat: 51.5152,
    lng: -0.0712,
    walkToNext: 5,
    review: 'Where every Ripper tour begins. Martha Tabram drank here on the night she was murdered in the alleyway next door — George Yard, now Gunthorpe Street. The cellar once housed the barber shop of Ripper suspect Severin Klosowski. Still has Ripper memorabilia on the walls.',
  },
  {
    id: 2,
    pubName: 'The Culpeper',
    address: '40 Commercial Street',
    postcode: 'E1 6LP',
    lat: 51.5161,
    lng: -0.0737,
    walkToNext: 5,
    review: 'The original Princess Alice was the haunt of "Leather Apron" — John Pizer, who threatened local women with a knife and was briefly the prime Ripper suspect. Frances Coles, the last official Whitechapel murder victim, was last seen alive here. Now a smart gastropub with a rooftop, but the bones of 1888 are still underneath.',
  },
  {
    id: 3,
    pubName: 'The Golden Heart',
    address: '110 Commercial Street',
    postcode: 'E1 6LZ',
    lat: 51.5189,
    lng: -0.0748,
    walkToNext: 2,
    review: 'Not a Ripper pub per se, but a proper Spitalfields landmark sitting on the route between murder sites. Sandra Esquilant held court here for decades. A pint-sized breather between the darkness of Commercial Street and what\'s coming next at the Ten Bells.',
  },
  {
    id: 4,
    pubName: 'The Ten Bells',
    address: '84 Commercial Street',
    postcode: 'E1 6LY',
    lat: 51.5195,
    lng: -0.0754,
    walkToNext: 3,
    review: 'The most famous Ripper pub in the world. Annie Chapman drank here the morning she was murdered on Hanbury Street. Mary Jane Kelly picked up clients on the pavement outside. Was renamed "The Jack the Ripper" from 1976–1988 before a Reclaim the Night campaign forced the change back. The original Victorian tiling is stunning.',
    website: 'https://www.tenbells.com',
  },
  {
    id: 5,
    pubName: 'The Pride of Spitalfields',
    address: '3 Heneage Street',
    postcode: 'E1 5LJ',
    lat: 51.5180,
    lng: -0.0720,
    walkToNext: 5,
    review: 'A tiny, perfect Victorian boozer tucked behind Brick Lane. The kind of cramped, candlelit, unreconstructed pub that Whitechapel was full of in 1888. Drink here to feel what it was actually like — low ceilings, dark wood, locals who\'ve been coming for decades.',
  },
  {
    id: 6,
    pubName: 'The Alma',
    address: '41 Spelman Street',
    postcode: 'E1 5LG',
    lat: 51.5170,
    lng: -0.0660,
    walkToNext: 8,
    review: 'One of the few surviving pubs from the actual Ripper era in this part of Whitechapel. A quiet, no-nonsense local that the victims would have known well. It sits close to Durward Street (formerly Buck\'s Row), where Polly Nichols — the first canonical victim — was found.',
  },
  {
    id: 7,
    pubName: 'The Blind Beggar',
    address: '337 Whitechapel Road',
    postcode: 'E1 1BU',
    lat: 51.5210,
    lng: -0.0594,
    walkToNext: null,
    review: 'End the crawl with a different kind of East End infamy. The Blind Beggar is where Ronnie Kray shot George Cornell in 1966. Nothing to do with the Ripper, everything to do with the dark thread that runs through Whitechapel. William Booth preached his first Salvation Army sermon outside here in 1865. A proper full stop.',
    website: 'https://www.theblindbeggar.com',
  },
];

// Calculate stats
export const ripperStats = {
  totalPubs: ripperPubs.length,
  totalWalkingMins: ripperPubs.reduce((acc, pub) => acc + (pub.walkToNext || 0), 0),
  estimatedTime: '4 hours',
  area: 'Whitechapel & Spitalfields',
};

// Helper to get Google Maps URL for a pub
export function getRipperMapsUrl(pub: RipperPub): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.pubName}, ${pub.address}, ${pub.postcode}`)}`;
}

// Helper to get directions from one pub to the next
export function getRipperDirectionsUrl(fromPub: RipperPub, toPub: RipperPub): string {
  const origin = encodeURIComponent(`${fromPub.pubName}, ${fromPub.address}`);
  const destination = encodeURIComponent(`${toPub.pubName}, ${toPub.address}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
}

// The five canonical victims for reference/display
export const canonicalVictims = [
  { name: 'Mary Ann Nichols', date: 'August 31, 1888', location: 'Buck\'s Row (now Durward Street)', age: 43 },
  { name: 'Annie Chapman', date: 'September 8, 1888', location: '29 Hanbury Street', age: 47 },
  { name: 'Elizabeth Stride', date: 'September 30, 1888', location: 'Dutfield\'s Yard, Berner Street', age: 44 },
  { name: 'Catherine Eddowes', date: 'September 30, 1888', location: 'Mitre Square', age: 46 },
  { name: 'Mary Jane Kelly', date: 'November 9, 1888', location: '13 Miller\'s Court, Dorset Street', age: 25 },
];
