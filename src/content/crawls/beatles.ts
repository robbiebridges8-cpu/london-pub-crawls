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
    review: 'Brian Epstein lived around the corner at 24 Chapel Street, which made The Horse & Groom his local by default. The Beatles held band meetings at Epstein\'s flat and came here for the nearest pint \u2014 fifty metres down a cobbled Belgravia mews. There are black-and-white photos of the band on the walls from that era, and the pub has been serving since at least 1852. It\'s a genuine mews pub, built to service the stables behind the big townhouses, and it still feels like it exists slightly outside the rest of London. Epstein was found dead at the Chapel Street house on 27 August 1967. You\'ll walk past it on the way to the next stop.',
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
    review: 'The Star Tavern\'s Beatles connection is loose \u2014 it was part of the same Belgravia mews circuit the band moved through when visiting Epstein \u2014 but the pub has its own story and it\'s better. Bruce Reynolds and the Great Train Robbery gang planned the August 1963 heist in the upstairs room, meeting in groups of four to avoid suspicion. They got away with 2.6 million pounds. The landlord at the time was a gambler named Paddy Kennedy, known for swearing at customers indiscriminately. It\'s a Grade II listed Fuller\'s pub, one of only five to appear in every edition of the Good Beer Guide. Diana Dors and Peter O\'Toole were regulars.',
    walkToNext: '15 min walk or Tube to Oxford Circus',
    website: 'https://www.star-tavern-belgravia.co.uk',
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
    review: 'John Lennon used The Shakespeare\'s Head as a starting point for Soho nights in 1963 and 1964, when Carnaby Street was still the real thing. It\'s a Wetherspoons now, which means cheap pints and carpet, but look up at the first-floor facade: there\'s a bust of Shakespeare with a hand missing, blown off by the Luftwaffe. The London Palladium is a two-minute walk away \u2014 the Beatles performed there on 13 October 1963, the Sunday Night broadcast that\'s widely credited with igniting Beatlemania. Around the corner, the old Marlborough Street Magistrates Court has its own Beatles footnote: Lennon appeared there charged with exhibiting sexually explicit artwork. Keith Richards, Mick Jagger, and Johnny Rotten all had their own dates in the same courtroom.',
    walkToNext: '5 min walk',
    website: 'https://www.jdwetherspoon.com/pubs/all-pubs/england/london/the-shakespeares-head-london',
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
    review: 'London\'s only Dutch pub, on Macclesfield Street at the edge of Chinatown. The site started life as the Horse and Dolphin coaching inn, then became an oyster house in 1890 run by a retired Dutch sea captain \u2014 the poet Swinburne used to travel ten miles daily to eat oysters at the long marble bar. During WWII it was the unofficial headquarters of the Dutch Resistance in London, and the spy Kim Philby was friendly with the chef. By the 1960s the music industry had moved in: Andrew Loog Oldham, who did PR for Epstein before managing the Rolling Stones, was a regular. Trident Studios, where the Beatles recorded Hey Jude and several White Album tracks in 1968, was two streets away on St Anne\'s Court.',
    walkToNext: '10 min walk',
    website: 'https://www.dehems.co.uk',
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
    review: 'Directly around the corner from 3 Savile Row, where Apple Corps set up in 1968 after stints on Baker Street and Wigmore Street. The Beatles bought the Savile Row building for 500,000 pounds, put a recording studio in the basement, and played their last ever concert on the roof. The Devonshire Arms was the nearest pub to all of that, first licensed in 1771, and it would be strange if nobody from Apple walked in for a pint during the years of famously chaotic management. The Portland stone frontage dates from a 1928 rebuild. It\'s a compact, traditional local that hasn\'t changed much.',
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
    review: 'The Barley Mow has been pouring pints since 1793, making it one of the oldest surviving pubs in Marylebone. It\'s Grade II listed, with snug compartments and a heritage interior that the chain pubs around it can\'t touch. The Beatles connection here is proximity rather than proof \u2014 EMI\'s headquarters at Manchester Square, where Angus McBean shot the Please Please Me staircase photograph, was a short walk away. More interesting: Charles Babbage, the father of computing, lived and worked next door at 1 Dorset Street from 1829 until his death in 1871. One of central London\'s last remaining free houses, which means the beer list answers to nobody.',
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
    review: 'This one requires the tube from central London, but the interior justifies the journey. The Assembly House was built in 1898 by Thorpe and Furniss in a Flemish Renaissance style that most pubs don\'t even attempt: wrought-iron turret on the corner, elaborate etched mirrors in the back room featuring birds and foliage, cast-iron Ionic columns, and a skylight over what was originally a billiard room. It\'s Grade II listed and on CAMRA\'s inventory of historic pub interiors. The Beatles connection is that Lennon lived in north London during the mid-1960s, which puts this in his territory if not on his bar tab. The pub has occupied this site since around 1750.',
    walkToNext: 'Take Overground to Kew Bridge',
    website: 'https://www.assemblyhousenw5.co.uk',
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
    review: 'Worth the Overground ride to Chiswick, because this is the crawl\'s most verifiable Beatles location. On 24 April 1965, the band filmed at The City Barge for Help! \u2014 they walked down Post Office Alley onto the Thames towpath, were chased inside by bagpipers, and Ringo ended up trapped in the cellar with a tiger. His line ordering "two lagers and lime, and two lagers and lime" was shot at this bar. The pub itself goes back to 1484, when it was called The Navigators Arms; it was renamed after the Lord Mayor began mooring his ceremonial barge outside. A 1940 land mine destroyed most of the building, so what you\'re drinking in is partly a rebuild, but the riverside terrace and the alley the Beatles ran down are both still there.',
    walkToNext: null,
    website: 'https://www.citybargechiswick.com',
  },
];

// Calculate stats
export const beatlesStats = {
  totalPubs: beatlesPubs.length,
  estimatedTime: 'Full day',
  area: 'Central London & Chiswick',
};