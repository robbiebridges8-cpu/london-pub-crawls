// Literary London Pub Crawl - Where London's writers drank

import { BasePub } from './types';

export interface LiteraryLondonPub extends BasePub {
  writer: string;
  walkToNext: string | null;
}

export const literaryLondonPubs: LiteraryLondonPub[] = [
  {
    id: 1,
    pubName: 'The Fitzroy Tavern',
    address: '16A Charlotte Street',
    postcode: 'W1T 2LY',
    lat: 51.5193,
    lng: -0.1347,
    writer: 'Orwell & Dylan Thomas',
    walkToNext: '2 min walk',
    review: 'The Fitzroy Tavern gave Fitzrovia its name - the neighbourhood was christened by the bohemian writers and artists who made this their headquarters in the 1930s and 40s. George Orwell was a regular while writing Keep the Aspidistra Flying. Dylan Thomas drank here heavily and often. Augustus John called it "the Clapham Junction of the world." The Writers and Artists Bar downstairs still has portraits of its famous regulars on the walls.',
  },
  {
    id: 2,
    pubName: 'The Wheatsheaf',
    address: '25 Rathbone Place',
    postcode: 'W1T 1JB',
    lat: 51.5183,
    lng: -0.1339,
    writer: 'Dylan Thomas',
    walkToNext: '12 min walk',
    review: 'The second pillar of Fitzrovia\'s literary pub scene, a minute\'s walk from the Fitzroy Tavern. Dylan Thomas met his future wife Caitlin Macnamara here in 1936 - Augustus John, who was seeing Caitlin at the time, made the introduction. Julian Maclaren-Ross, the model for X. Donavon in Anthony Powell\'s A Dance to the Music of Time, held court at the bar. Anthony Burgess was also a regular.',
  },
  {
    id: 3,
    pubName: 'The Lamb',
    address: '94 Lamb\'s Conduit Street',
    postcode: 'WC1N 3LZ',
    lat: 51.5218,
    lng: -0.1199,
    writer: 'Charles Dickens',
    walkToNext: '15 min walk',
    review: 'The Lamb was Dickens\' local when he lived around the corner on Doughty Street between 1837 and 1839 - the house is now the Dickens Museum, a five-minute walk away. Ted Hughes and Sylvia Plath drank here during their time in London in the early 1960s. The pub\'s most distinctive feature is its surviving Victorian "snob screens" - etched glass partitions on a swivel that allowed drinkers to order without being seen by the room.',
  },
  {
    id: 4,
    pubName: 'The Dog and Duck',
    address: '18 Bateman Street',
    postcode: 'W1D 3AJ',
    lat: 51.5136,
    lng: -0.1310,
    writer: 'George Orwell',
    walkToNext: '2 min walk',
    review: 'George Orwell\'s Soho local. He celebrated here when Animal Farm was selected as Book of the Month in the United States in 1946. The upstairs room is named after him. The pub dates from 1734 and sits on the site of the Duke of Monmouth\'s residence. The Grade II listed Victorian interior of glazed tiles, ornamental glass, and mahogany is one of the best-preserved in Soho. Madonna has also been in. Less important.',
  },
  {
    id: 5,
    pubName: 'The French House',
    address: '49 Dean Street',
    postcode: 'W1D 5BG',
    lat: 51.5132,
    lng: -0.1315,
    writer: 'Dylan Thomas & De Gaulle',
    walkToNext: '2 min walk',
    review: 'The French House is the most famous bohemian pub in London. Charles de Gaulle drafted his "\u00C0 tous les Fran\u00E7ais" appeal to the French people in the upstairs dining room on 18 June 1940. Dylan Thomas left the only manuscript of Under Milk Wood under his chair here - it was found by the staff and returned. Brendan Behan, Francis Bacon, and Lucian Freud were all regulars. Beer is served by the half pint only - always has been, no exceptions. There is also no TV, no music, and a no phones at the bar rule.',
  },
  {
    id: 6,
    pubName: 'The Coach and Horses',
    address: '29 Greek Street',
    postcode: 'W1D 5DH',
    lat: 51.5132,
    lng: -0.1302,
    writer: 'Jeffrey Bernard & Private Eye',
    walkToNext: '15 min walk',
    review: 'The most literary pub in Soho. Jeffrey Bernard wrote his Spectator "Low Life" column from a barstool here for decades — his legendary absences inspired the 1989 West End play Jeffrey Bernard Is Unwell, starring Peter O\'Toole, which recreated the pub\'s interior on stage. Private Eye magazine held regular lunches here for years; it was their unofficial canteen. Norman Balon, landlord for over 60 years, was known as "London\'s rudest landlord" and wrote a memoir about it. Grade II listed and still on Greek Street, a minute from The French House.',
  },
  {
    id: 7,
    pubName: 'Ye Olde Cheshire Cheese',
    address: '145 Fleet Street',
    postcode: 'EC4A 2BP',
    lat: 51.5142,
    lng: -0.1084,
    writer: 'Johnson, Dickens, Twain, Yeats',
    walkToNext: 'Take Northern line to London Bridge',
    review: 'The literary pub to end all literary pubs. Rebuilt in 1667 after the Great Fire. Samuel Johnson, whose house is around the corner on Gough Square, was a regular and is said to have had a favourite seat by the fireplace. Dickens, Wilkie Collins, Mark Twain, W.B. Yeats (who co-founded the Rhymers\' Club here in 1890), Arthur Conan Doyle, G.K. Chesterton, and P.G. Wodehouse all drank in this building. The cellars are labyrinthine and may predate the Fire.',
  },
  {
    id: 8,
    pubName: 'The George Inn',
    address: '75-77 Borough High Street',
    postcode: 'SE1 1NH',
    lat: 51.5046,
    lng: -0.0897,
    writer: 'Shakespeare & Dickens',
    walkToNext: null,
    review: 'End at London\'s last surviving galleried coaching inn. Geoffrey Chaucer\'s Canterbury pilgrims departed from the Tabard Inn next door, which stood on this street until it burned down in 1676, the same fire that destroyed the earlier George. Shakespeare\'s Globe was a ten-minute walk; he almost certainly drank on this site. Dickens knew the George well and referenced it in Little Dorrit - his father had been locked up in the Marshalsea debtors\' prison around the corner.',
  },
];

// Calculate stats
export const literaryLondonStats = {
  totalPubs: literaryLondonPubs.length,
  estimatedTime: '4\u20135 hours',
  area: 'Fitzrovia, Soho & Southwark',
};