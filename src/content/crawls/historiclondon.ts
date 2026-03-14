// Historic London Pub Crawl - Fleet Street to Wapping

export interface HistoricLondonPub {
  id: number;
  pubName: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  review: string;
  established: string;
  walkToNext: string | null;
  website?: string;
}

export const historicLondonPubs: HistoricLondonPub[] = [
  {
    id: 1,
    pubName: 'Ye Olde Cheshire Cheese',
    address: '145 Fleet Street',
    postcode: 'EC4A 2BP',
    lat: 51.5142,
    lng: -0.1084,
    established: '1667',
    review: 'Rebuilt one year after the Great Fire. Dickens, Twain, Yeats, and Wodehouse all drank here. Samuel Smith\'s runs it now — cash only, no music, no phone signal. A stuffed parrot called Polly sits behind the bar. She lived here from 1895 to 1926 and swore in multiple languages.',
    walkToNext: '8 min walk',
  },
  {
    id: 2,
    pubName: 'Ye Olde Mitre',
    address: '1 Ely Court, Ely Place',
    postcode: 'EC1N 6SJ',
    lat: 51.5185,
    lng: -0.1076,
    established: '1770s',
    review: 'Hidden down an alley so well that most Londoners don\'t know it exists. Built on the site of the Bishop of Ely\'s London estate. The stump of a cherry tree in the bar is said to be the one Elizabeth I danced around. Finding it is half the fun — look for the sign on Hatton Garden.',
    walkToNext: '5 min walk',
  },
  {
    id: 3,
    pubName: 'The Cittie of Yorke',
    address: '22 High Holborn',
    postcode: 'WC1V 6BN',
    lat: 51.5186,
    lng: -0.1120,
    established: 'site since 1430',
    review: 'There\'s been a pub on this site for nearly six centuries. The current building is a 1920s replica but the effect is extraordinary — a vast Gothic hall with enormous wine vats above the bar, individual booths with their own fireplaces, and a ceiling that feels like a medieval banqueting hall.',
    walkToNext: '10 min walk',
  },
  {
    id: 4,
    pubName: 'The Lamb and Flag',
    address: '33 Rose Street',
    postcode: 'WC2E 9EB',
    lat: 51.5122,
    lng: -0.1252,
    established: 'site since 1623',
    review: 'Down an alley behind Covent Garden. Nicknamed \'The Bucket of Blood\' for the bare-knuckle boxing upstairs. The poet Dryden was nearly beaten to death in the alley outside in 1679. Dickens drank here as a young man. Fuller\'s ales, low ceilings, Victorian woodwork.',
    walkToNext: '15 min walk',
  },
  {
    id: 5,
    pubName: 'The Black Friar',
    address: '174 Queen Victoria Street',
    postcode: 'EC4V 4EG',
    lat: 51.5121,
    lng: -0.1038,
    established: '1875',
    review: 'Not the oldest pub on this crawl but arguably the most beautiful. Built on the site of a Dominican priory, redecorated in 1905 in jaw-dropping Art Nouveau. Mosaics, marble, bronze reliefs of jolly monks everywhere. Nearly demolished in the 1960s; saved by John Betjeman.',
    walkToNext: '15 min walk across Blackfriars Bridge',
  },
  {
    id: 6,
    pubName: 'The George Inn',
    address: '75-77 Borough High Street',
    postcode: 'SE1 1NH',
    lat: 51.5046,
    lng: -0.0897,
    established: '1676 (site since 1542)',
    review: 'London\'s last surviving galleried coaching inn. Shakespeare drank here — the Globe was around the corner. Now owned by the National Trust. The cobbled courtyard with its timber balconies is one of the most atmospheric spots in London.',
    walkToNext: '5 min walk',
  },
  {
    id: 7,
    pubName: 'The Old Thameside Inn',
    address: 'Pickfords Wharf, Clink Street',
    postcode: 'SE1 9DG',
    lat: 51.5070,
    lng: -0.0912,
    established: 'modern (medieval site)',
    review: 'Sitting in the shadow of Winchester Palace, whose medieval rose window still looms above. The riverside terrace has views of the Thames and the City skyline. A breather between the weight of history at the George and the final stretch east.',
    walkToNext: '25 min walk along the Thames',
  },
  {
    id: 8,
    pubName: 'The Prospect of Whitby',
    address: '57 Wapping Wall',
    postcode: 'E1W 3SH',
    lat: 51.5066,
    lng: -0.0553,
    established: 'c.1520',
    review: 'London\'s oldest riverside pub. Originally \'The Devil\'s Tavern\' — named for the thieves, smugglers, and pirates who drank here. Pepys came. Dickens came. Turner painted the Thames from the balcony. The flagstone floor and pewter bar are original. Five hundred years of drinking history under your feet.',
    walkToNext: null,
  },
];

// Calculate stats
export const historicLondonStats = {
  totalPubs: historicLondonPubs.length,
  estimatedTime: '5-6 hours',
  area: 'Fleet Street to Wapping',
};

// Helper to get Google Maps URL for a pub
export function getHistoricLondonMapsUrl(pub: HistoricLondonPub): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.pubName}, ${pub.address}, ${pub.postcode}`)}`;
}

// Helper to get directions from one pub to the next
export function getHistoricLondonDirectionsUrl(from: HistoricLondonPub, to: HistoricLondonPub): string {
  const origin = encodeURIComponent(`${from.pubName}, ${from.address}`);
  const destination = encodeURIComponent(`${to.pubName}, ${to.address}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
}
