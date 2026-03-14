// Literary London Pub Crawl - Where London's writers drank

export interface LiteraryLondonPub {
  id: number;
  pubName: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  review: string;
  writer: string;
  walkToNext: string | null;
  website?: string;
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
    review: 'The pub that gave Fitzrovia its name. Orwell and Dylan Thomas were regulars in the 1930s and 40s when this was the centre of bohemian London. The Writers and Artists Bar downstairs has portraits of both on the wall. Augustus John called it \'the Clapham Junction of the world.\'',
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
    review: 'A minute\'s walk from the Fitzroy and the other pillar of Fitzrovia\'s literary pub scene. Dylan Thomas met his future wife Caitlin here \u2014 Augustus John introduced them. Orwell, Burgess, and Julian Maclaren-Ross all drank at this bar.',
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
    review: 'Dickens\' local when he lived round the corner on Doughty Street \u2014 now home to the Dickens Museum. Ted Hughes and Sylvia Plath drank here in their happier days. The Victorian snob screens \u2014 frosted glass partitions that let you drink without being seen \u2014 are still in place.',
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
    review: 'Orwell\'s Soho pub. He celebrated Animal Farm being chosen as Book of the Month here. The upstairs room is named after him. The Grade II listed Victorian interior \u2014 all tiles and etched glass \u2014 has barely changed since 1897.',
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
    review: 'Soho\'s legendary bohemian pub. De Gaulle wrote his \'\u00C0 tous les Fran\u00E7ais\' speech upstairs. Dylan Thomas left the manuscript of Under Milk Wood under his chair. They only serve beer by the half pint. No TV, no music, no phones \u2014 conversation is the point.',
  },
  {
    id: 6,
    pubName: 'The Pillars of Hercules',
    address: '7 Greek Street',
    postcode: 'W1D 4DF',
    lat: 51.5138,
    lng: -0.1310,
    writer: 'Charles Dickens',
    walkToNext: '15 min walk',
    review: 'Dickens name-checked this Soho pub and the side street was renamed Manette Street after a character in A Tale of Two Cities. Martin Amis, Julian Barnes, and Ian McEwan propped up the bar more recently. Clive James named an essay collection after it.',
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
    review: 'The literary pub to end all literary pubs. Johnson, Pepys, Dickens, Twain, Yeats, Conan Doyle, Wodehouse \u2014 the guest list reads like the canon. Rebuilt after the Great Fire in 1667. Cash only, no music, sawdust floors. Polly the parrot swore in multiple languages from behind the bar for 31 years.',
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
    review: 'London\'s last galleried coaching inn. Chaucer\'s pilgrims set out from a tavern next door in The Canterbury Tales. Shakespeare drank here. Dickens knew it well \u2014 his father was locked up in the debtors\' prison round the corner. The cobbled courtyard hasn\'t changed in 400 years.',
  },
];

// Calculate stats
export const literaryLondonStats = {
  totalPubs: literaryLondonPubs.length,
  estimatedTime: '4\u20135 hours',
  area: 'Fitzrovia, Soho & Southwark',
};

// Helper to get Google Maps URL for a pub
export function getLiteraryLondonMapsUrl(pub: LiteraryLondonPub): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.pubName}, ${pub.address}, ${pub.postcode}`)}`;
}

// Helper to get directions from one pub to the next
export function getLiteraryLondonDirectionsUrl(from: LiteraryLondonPub, to: LiteraryLondonPub): string {
  const origin = encodeURIComponent(`${from.pubName}, ${from.address}`);
  const destination = encodeURIComponent(`${to.pubName}, ${to.address}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
}
