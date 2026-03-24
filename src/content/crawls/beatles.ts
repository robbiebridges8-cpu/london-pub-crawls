// Beatles Pub Crawl - Follow the Fab Four through London's drinking spots

import { BasePub } from './types';

export interface BeatlesPub extends BasePub {
  connection: string;
  walkToNext: string | null;
  bonus: boolean;
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
    bonus: false,
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
    bonus: false,
    review: 'Another mews pub just minutes from the Horse & Groom, and part of the same Belgravia circuit that London\'s 1960s elite moved through. The Star Tavern\'s other claim to fame: the Great Train Robbers, led by Bruce Reynolds, are said to have planned the August 1963 heist in the upstairs room, meeting in groups of four to avoid suspicion. A proper Fuller\'s pub with one of the best hidden beer gardens in central London.',
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
    bonus: false,
    review: 'John Lennon used The Shakespeare\'s Head as a starting point for evenings out in Soho in 1963 and 1964, when Carnaby Street was the centre of Swinging London. The London Palladium, where the Beatles performed on Sunday Night at the London Palladium on 13 October 1963, the broadcast widely credited with igniting Beatlemania, is a two-minute walk away. A bust of Shakespeare with a hand missing (courtesy of the Luftwaffe) looks down from the first floor.',
    walkToNext: '5 min walk',
  },
  {
    id: 4,
    pubName: 'De Hems',
    address: '11 Macclesfield Street',
    postcode: 'W1D 5BW',
    lat: 51.5121,
    lng: -0.1313,
    connection: 'Soho music scene',
    bonus: false,
    review: 'De Hems is a Dutch-style pub in the heart of Soho that was a hub for the 1960s music industry. Andrew Loog Oldham, who did PR work for Brian Epstein promoting the Beatles before managing the Rolling Stones, was among the music business regulars. The Ad Lib Club, where the Beatles were regulars, was around the corner on Leicester Place. Trident Studios, where they recorded Hey Jude and several White Album tracks in 1968, was on nearby St Anne\'s Court. The pub also served as the Dutch Resistance HQ in London during WWII.',
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
    bonus: false,
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
    bonus: false,
    review: 'The Barley Mow is a short walk from the Devonshire, on the Marylebone backstreets near the Apple Corps offices. EMI\'s headquarters, Manchester Square House, where photographer Angus McBean shot the iconic Please Please Me and the 1963-2023 staircase photographs, was nearby on Manchester Square. A quiet local pub that doesn\'t trade on its proximity to Beatles history.',
    walkToNext: 'Take Northern line to Kentish Town',
  },
  {
    id: 7,
    pubName: 'The Assembly House',
    address: '292-294 Kentish Town Road',
    postcode: 'NW5 2TG',
    lat: 51.5502,
    lng: -0.1420,
    connection: "Lennon's north London",
    bonus: true,
    review: 'A Grade II listed Victorian pub on Kentish Town Road, in the heart of the north London territory John Lennon frequented during his years living in the area. The 1898 interior is one of the finest surviving Victorian pub designs in north London. No Beatles memorabilia or tourist trade — just a proper period pub in Lennon\'s old neighbourhood. Requires tube from the central stretch.',
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
    bonus: true,
    review: 'The City Barge is worth the journey to Chiswick. This 15th-century riverside pub (records go back to 1484) is where the Beatles filmed the tiger-in-the-cellar scene for their 1965 film Help! Ringo\'s line, ordering "two lagers and lime, and two lagers and lime," was delivered at this bar. The Thames-side terrace and the alleyway the band ran down are both intact. Best reached via Kew Bridge station on the Overground.',
    walkToNext: null,
  },
];

// Calculate stats
export const beatlesStats = {
  totalPubs: beatlesPubs.length,
  estimatedTime: 'Full day',
  area: 'Central London & Chiswick',
};