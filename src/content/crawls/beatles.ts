// Beatles Pub Crawl - Follow the Fab Four through London's drinking spots

import { BasePub } from './types';

export interface BeatlesPub extends BasePub {
  connection: string;
  walkToNext: string | null;
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
    review: 'Hidden down a cobbled Belgravia mews. This was the Beatles\' local when visiting their manager Brian Epstein, who lived around the corner at 24 Chapel Street. Epstein hosted band meetings at his flat and the pub was the nearest pint. He was found dead at the Chapel Street house on 27 August 1967 from an accidental overdose.',
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
    review: 'Another mews pub just minutes from the Horse & Groom, and part of the same Belgravia circuit that London\'s 1960s elite moved through. The pub\'s other claim to fame: the Great Train Robbers, led by Bruce Reynolds, are said to have planned the August 1963 heist in the upstairs room, meeting in groups of four to avoid suspicion. A proper Fuller\'s pub with one of the best hidden beer gardens in central London.',
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
    review: 'John Lennon used this pub as a starting point for evenings out in Soho in 1963 and 1964, when Carnaby Street was the centre of Swinging London. The London Palladium \u2014 where the Beatles performed on Sunday Night at the London Palladium on 13 October 1963, the broadcast widely credited with igniting Beatlemania \u2014 is a two-minute walk away. A bust of Shakespeare with a hand missing (courtesy of the Luftwaffe) looks down from the first floor.',
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
    review: 'The Beatles spent significant time in Soho\'s pubs and clubs throughout 1963-66. The Ad Lib Club, where the band were regulars, was around the corner on Leicester Place. Trident Studios, where the Beatles recorded Hey Jude and several White Album tracks in 1968, was on nearby St Anne\'s Court. This is the Soho stop \u2014 the pub closest to where the band actually spent their time in the district.',
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
    review: 'Directly around the corner from the Apple Corps offices at 3 Savile Row, where the band worked from 1968 until their breakup. The Beatles also had earlier offices on nearby Wigmore Street. The Devonshire was a regular escape when Apple\'s famously chaotic management became too much. Compact, traditional, and largely unchanged since the 1960s.',
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
    review: 'A short walk from the Devonshire, on the Marylebone backstreets near the Apple Corps offices. EMI\'s headquarters, Manchester Square House \u2014 where photographer Angus McBean shot the iconic Please Please Me and the 1963-2023 staircase photographs \u2014 was nearby on Manchester Square. A quiet local pub that doesn\'t trade on its proximity to Beatles history.',
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
    review: 'In Kentish Town, this was a neighbourhood pub for John Lennon during his years in north London. Lennon lived at various addresses in the area, and the pub sits in the broader territory between central London and Abbey Road Studios in St John\'s Wood. A proper locals\' pub \u2014 no memorabilia, no tourist trade. Requires tube from the central stretch.',
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
    review: 'Worth the journey to Chiswick. This 15th-century riverside pub \u2014 records go back to 1484 \u2014 is where the Beatles filmed the tiger-in-the-cellar scene for their 1965 film Help! Ringo\'s line, ordering "two lagers and lime, and two lagers and lime," was delivered at this bar. The Thames-side terrace and the alleyway the band ran down are both intact. Best reached via Kew Bridge station on the Overground.',
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
