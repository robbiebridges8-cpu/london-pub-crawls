// Jack the Ripper Pub Crawl - Whitechapel's Darkest History

import { BasePub } from './types';

export interface RipperPub extends BasePub {
  walkToNext: number | null;
}

export const ripperPubs: RipperPub[] = [
  {
    id: 1,
    pubName: 'The White Hart',
    address: '89 Whitechapel High St',
    postcode: 'E1 7RA',
    lat: 51.5152,
    lng: -0.0712,
    walkToNext: 3,
    review: 'Martha Tabram was drinking here on the night of 7 August 1888 before she was murdered in George Yard \u2014 the alleyway next door, now Gunthorpe Street. Tabram\'s killing is considered by many Ripperologists to be the first in the Whitechapel series. The cellar housed the barber shop of Severin Klosowski, later convicted as the serial poisoner George Chapman, and named as a Ripper suspect by the officer who arrested him.',
  },
  {
    id: 2,
    pubName: 'The Ten Bells',
    address: '84 Commercial St',
    postcode: 'E1 6LY',
    lat: 51.5195,
    lng: -0.0754,
    walkToNext: 1,
    review: 'The most famous pub in Ripper history. Annie Chapman was seen drinking here alone on the morning of 8 September 1888, hours before her body was found on Hanbury Street. Mary Jane Kelly was a regular and picked up clients on the pavement outside. The pub was renamed "The Jack the Ripper" in 1976 and reverted after a Reclaim the Night campaign in 1988. The original Victorian ceramic tiling \u2014 including a painted mural of "Spitalfields in ye Olden Time" \u2014 is intact and stunning.',
    website: 'https://www.tenbells.com',
  },
  {
    id: 3,
    pubName: 'The Culpeper',
    address: '40 Commercial St',
    postcode: 'E1 6LP',
    lat: 51.5161,
    lng: -0.0737,
    walkToNext: 5,
    review: 'Formerly The Princess Alice \u2014 the pub where John Pizer, known as "Leather Apron", threatened local women with a knife and became the first prime Ripper suspect in September 1888. He was cleared at Annie Chapman\'s inquest. Frances Coles, the last official victim of the Whitechapel Murders, was last seen alive leaving here in February 1891. The building has been heavily refurbished and is now a gastropub, but it sits on ground soaked in the case.',
  },
  {
    id: 4,
    pubName: 'The Pride of Spitalfields',
    address: '3 Heneage St',
    postcode: 'E1 5LJ',
    lat: 51.5180,
    lng: -0.0720,
    walkToNext: 6,
    review: 'Then called the Romford Arms, this was the local of George Hutchinson \u2014 the witness who gave police an extraordinarily detailed description of a man he claimed to have seen with Mary Kelly on the night of her murder, 9 November 1888. Some researchers consider Hutchinson himself a suspect. The pub is one of the last unreconstructed Victorian boozers in Spitalfields \u2014 carpets, low ceilings, no TV, no pretension. CAMRA\'s East London Pub of the Year, 2013.',
  },
  {
    id: 5,
    pubName: 'The Alma',
    address: '41 Spelman St',
    postcode: 'E1 5LG',
    lat: 51.5170,
    lng: -0.0660,
    walkToNext: 8,
    review: 'One of the few surviving pubs from the Whitechapel of 1888, on the back streets where the canonical murders happened. It sits two minutes from Durward Street \u2014 formerly Buck\'s Row \u2014 where Polly Nichols, the first canonical victim, was found on 31 August 1888. Ripper walking tours stop here. The second floor has period posters and artwork from the case.',
  },
  {
    id: 6,
    pubName: 'The Blind Beggar',
    address: '337 Whitechapel Rd',
    postcode: 'E1 1BU',
    lat: 51.5210,
    lng: -0.0594,
    walkToNext: null,
    review: 'End with a different chapter of East End violence. On 9 March 1966, Ronnie Kray walked into this pub and shot George Cornell of the Richardson gang in the head. The jukebox was playing "The Sun Ain\'t Gonna Shine Anymore." Cornell\'s last words: "Well, look who\'s here." Nothing to do with the Ripper \u2014 everything to do with the thread of darkness that runs through Whitechapel across the centuries. William Booth preached his first Salvation Army sermon outside in 1865.',
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
