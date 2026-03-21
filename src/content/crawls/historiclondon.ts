// Historic London Pub Crawl - Fleet Street to Wapping

import { BasePub } from './types';

export interface HistoricLondonPub extends BasePub {
  established: string;
  walkToNext: string | null;
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
    review: 'Rebuilt in 1667, one year after the Great Fire of London destroyed the original. The vaulted cellars may be 13th-century, remnants of a Carmelite monastery. Samuel Johnson, Charles Dickens, Mark Twain, W.B. Yeats, Arthur Conan Doyle, and P.G. Wodehouse all drank here at various points across three centuries. Samuel Smith\'s runs it now \u2014 cash only, no music, no phone signal. A stuffed parrot called Polly sat behind the bar from 1895 to 1926, swearing at customers in multiple languages.',
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
    review: 'Hidden down an alley between Hatton Garden and Ely Place that most Londoners have never found. The current building dates from the 1770s, on a site that was part of the Bishop of Ely\'s London estate from 1290. A cherry tree stump preserved in the bar is said to be from the tree Elizabeth I danced around \u2014 though that claim is better as a pub story than as history. Finding the entrance is half the experience.',
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
    review: 'A pub has stood on this site since around 1430, making it one of the oldest licensed premises in London. The current building is a 1924 reconstruction by the architects of the Trocadero, but the effect is extraordinary \u2014 a cavernous Gothic hall with a 50-foot ceiling, enormous wine vats above the bar, and individual booths with their own coal fireplaces. One of the most impressive pub interiors in the city.',
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
    review: 'First licensed in 1772, though the building on this Covent Garden alleyway dates to at least 1623. Known as "The Bucket of Blood" for the bare-knuckle prize fights held in the upstairs room throughout the 18th and 19th centuries. On 18 December 1679, the poet John Dryden was attacked and nearly beaten to death in the alley outside by thugs hired by the Duchess of Portsmouth. The young Charles Dickens drank here when he was working at a nearby blacking factory.',
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
    review: 'Built in 1875 on the site of a 13th-century Dominican priory \u2014 hence the name. The interior was transformed in 1905 by the architect Herbert Fuller-Clark and the sculptor Henry Poole into one of London\'s finest examples of Arts and Crafts design. Mosaic friezes, marble columns, alabaster, and bronze reliefs of monks in various states of revelry cover every surface. The pub was scheduled for demolition in 1964 to make way for a road scheme; John Betjeman led the successful campaign to save it.',
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
    review: 'London\'s only surviving galleried coaching inn and a Grade I listed building, owned by the National Trust since 1937. An inn has occupied this site since at least 1542. The current structure was rebuilt in 1676 after a catastrophic fire swept through Southwark. In the coaching era, passengers boarded horse-drawn coaches in the cobbled yard for journeys to Kent, Sussex, and the Channel ports. Dickens referenced it in Little Dorrit. Shakespeare almost certainly knew the earlier building \u2014 the Globe was a ten-minute walk.',
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
    review: 'The building is modern, but the location is medieval. It sits directly beneath the surviving ruins of Winchester Palace \u2014 the 12th-century London residence of the Bishops of Winchester, whose great hall rose window still looms over the pub\'s terrace. From here, the Bishops controlled Bankside\'s theatres, bear-baiting pits, and licensed brothels (whose workers were known as "Winchester Geese"). A riverside terrace with views across to the City.',
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
    review: 'Dating to around 1520, this is the strongest claim to the title of London\'s oldest riverside pub. It was originally called The Devil\'s Tavern \u2014 a name earned by its regular clientele of river thieves, smugglers, and pirates. The pub was renamed after a Whitby coal ship that used to moor alongside. Samuel Pepys visited. Dickens set scenes nearby. Turner painted the Thames from the first-floor balcony. The flagstone floor and pewter-topped bar are original Tudor features.',
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
