// Jack the Ripper Pub Crawl - Whitechapel's Darkest History

export interface RipperPub {
  id: number;
  pubName: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  rating: number;
  startTime: string;
  endTime: string;
  walkToNext: number | null; // minutes walking
  ripperConnection: string; // Brief connection to the case
  review: string;
  historicNotes: string;
  website?: string;
  image?: string;
}

export const ripperPubs: RipperPub[] = [
  {
    id: 1,
    pubName: 'The Hoop and Grapes',
    address: '47 Aldgate High Street',
    postcode: 'EC3N 1AL',
    lat: 51.5142,
    lng: -0.0758,
    rating: 8,
    startTime: '18:00',
    endTime: '18:40',
    walkToNext: 8,
    ripperConnection: 'Near Mitre Square - Catherine Eddowes murder site',
    review: 'One of the few timber-framed buildings to survive both the Great Fire and the Blitz. The crooked floors and leaning walls transport you straight to Victorian London. Start here at Aldgate, steps from where Catherine Eddowes met her end in Mitre Square on the night of the Double Event.',
    historicNotes: 'Dating to at least 1592, this building would have been standing when the Ripper stalked these streets. Mitre Square, where Catherine Eddowes was found mutilated on September 30, 1888, is a two-minute walk away.',
    website: 'https://www.hoopandgrapes.co.uk',
  },
  {
    id: 2,
    pubName: 'The White Hart',
    address: '89 Whitechapel High Street',
    postcode: 'E1 7RA',
    lat: 51.5153,
    lng: -0.0702,
    rating: 7,
    startTime: '18:50',
    endTime: '19:30',
    walkToNext: 5,
    ripperConnection: 'George Chapman suspect connection; Martha Tabram',
    review: 'A pub with deep Ripper connections. Serial killer George Chapman — once seriously considered as a Ripper suspect — ran a barbershop in the basement here. Martha Tabram, sometimes considered the first Ripper victim, was drinking here the night she was murdered in nearby George Yard.',
    historicNotes: 'George Chapman (born Severin Klosowski) was hanged in 1903 for poisoning three women. Inspector Abberline, who led the Ripper investigation, reportedly said "You\'ve got Jack the Ripper at last" when Chapman was arrested. Martha Tabram was stabbed 39 times on August 7, 1888.',
    website: 'https://www.whitehartpub.com',
  },
  {
    id: 3,
    pubName: 'The Ten Bells',
    address: '84 Commercial Street',
    postcode: 'E1 6LY',
    lat: 51.5197,
    lng: -0.0759,
    rating: 9,
    startTime: '19:40',
    endTime: '20:30',
    walkToNext: 3,
    ripperConnection: 'Annie Chapman and Mary Kelly were regulars',
    review: 'The most famous Ripper pub in existence. Annie Chapman drank here the night before she was murdered. Mary Jane Kelly, the final canonical victim, was a regular. The pub briefly renamed itself "Jack the Ripper" in the 1970s before reverting under public pressure in 1988. The Victorian interior is largely intact.',
    historicNotes: 'Annie Chapman was last seen alive near here at 5:30am on September 8, 1888 before being found murdered in the backyard of 29 Hanbury Street. Mary Kelly lived at 13 Miller\'s Court, just around the corner, and drank here regularly before her murder on November 9, 1888. Elizabeth Stride was also known to drink here.',
    website: 'https://www.tenbells.com',
  },
  {
    id: 4,
    pubName: 'The Golden Heart',
    address: '110 Commercial Street',
    postcode: 'E1 6LZ',
    lat: 51.5201,
    lng: -0.0749,
    rating: 7,
    startTime: '20:35',
    endTime: '21:10',
    walkToNext: 4,
    ripperConnection: 'Heart of Ripper territory; Spitalfields local',
    review: 'A proper Spitalfields boozer in the heart of Ripper territory. Sandra Esquilant ran this pub for decades and made it a haven for artists and eccentrics. The pub sits on the corner where the victims would have walked nightly, just yards from the Ten Bells and minutes from several murder sites.',
    historicNotes: 'This stretch of Commercial Street was the main thoroughfare of the Ripper\'s hunting ground. The victims would have passed this corner regularly. The pub maintains a genuine East End atmosphere that evokes the area\'s Victorian past.',
  },
  {
    id: 5,
    pubName: 'The Pride of Spitalfields',
    address: '3 Heneage Street',
    postcode: 'E1 5LJ',
    lat: 51.5178,
    lng: -0.0725,
    rating: 8,
    startTime: '21:15',
    endTime: '21:55',
    walkToNext: 5,
    ripperConnection: 'Victorian survivor in murder zone',
    review: 'A perfectly preserved Victorian pub tucked down a narrow street off Brick Lane. The frosted glass, original fittings, and cramped interior give an authentic sense of what East End drinking dens were like in 1888. One of the few pubs in the area that hasn\'t been modernized beyond recognition.',
    historicNotes: 'Heneage Street runs parallel to Hanbury Street, where Annie Chapman was murdered. The pub\'s Victorian interior is among the most authentic in the area, offering a genuine glimpse into the world the Ripper\'s victims inhabited.',
  },
  {
    id: 6,
    pubName: 'The Gun',
    address: '54 Brushfield Street',
    postcode: 'E1 6AG',
    lat: 51.5189,
    lng: -0.0773,
    rating: 7,
    startTime: '22:00',
    endTime: '22:35',
    walkToNext: 6,
    ripperConnection: 'Opposite Spitalfields Market; period atmosphere',
    review: 'Sitting opposite the old Spitalfields Market, The Gun occupies a building dating to the 1700s. The market was a major employer for the destitute women of the East End — several Ripper victims worked there. A solid pint in atmospheric surroundings.',
    historicNotes: 'Spitalfields Market was the economic heart of the area in 1888. Many of the Ripper\'s victims scraped together pennies through casual labour here, selling flowers, matches, or whatever they could find. The area around Brushfield Street was thick with doss houses and lodging rooms.',
  },
  {
    id: 7,
    pubName: 'The Alma',
    address: '41 Spelman Street',
    postcode: 'E1 5LQ',
    lat: 51.5164,
    lng: -0.0678,
    rating: 7,
    startTime: '22:45',
    endTime: '23:20',
    walkToNext: null,
    ripperConnection: 'Final stop near Buck\'s Row',
    review: 'End the crawl at this local\'s pub, a short walk from Durward Street (formerly Buck\'s Row) where Mary Ann Nichols, the first canonical victim, was discovered. A proper East End pub that hasn\'t tried to cash in on its grim proximity to history. Raise a final glass to the five women.',
    historicNotes: 'Mary Ann Nichols was found at 3:40am on August 31, 1888 by a carter named Charles Cross. Her throat had been cut and her abdomen mutilated. She was 43 years old and had been struggling to find the fourpence needed for a bed that night. "I\'ll soon get my doss money," she reportedly told a friend. "See what a jolly bonnet I\'ve got now."',
  },
];

// Calculate stats
export const ripperStats = {
  totalPubs: ripperPubs.length,
  totalWalkingMins: ripperPubs.reduce((acc, pub) => acc + (pub.walkToNext || 0), 0),
  estimatedTime: '5 hours',
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
  {
    name: 'Mary Ann Nichols',
    date: 'August 31, 1888',
    location: 'Buck\'s Row (now Durward Street)',
    age: 43,
  },
  {
    name: 'Annie Chapman',
    date: 'September 8, 1888',
    location: '29 Hanbury Street',
    age: 47,
  },
  {
    name: 'Elizabeth Stride',
    date: 'September 30, 1888',
    location: 'Dutfield\'s Yard, Berner Street',
    age: 44,
  },
  {
    name: 'Catherine Eddowes',
    date: 'September 30, 1888',
    location: 'Mitre Square',
    age: 46,
  },
  {
    name: 'Mary Jane Kelly',
    date: 'November 9, 1888',
    location: '13 Miller\'s Court, Dorset Street',
    age: 25,
  },
];
