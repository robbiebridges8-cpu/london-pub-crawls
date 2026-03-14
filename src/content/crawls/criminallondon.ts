export interface CriminalLondonPub {
  id: number;
  pubName: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  review: string;
  crime: string;
  walkToNext: string | null;
  website?: string;
}

export const criminalLondonPubs: CriminalLondonPub[] = [
  {
    id: 1,
    pubName: 'The Lamb and Flag',
    address: '33 Rose Street',
    postcode: 'WC2E 9EB',
    lat: 51.5122,
    lng: -0.1252,
    crime: 'Bare-knuckle boxing & assassination attempt',
    review: 'Start with a Covent Garden pub nicknamed \'The Bucket of Blood.\' Bare-knuckle prize fights were held upstairs for decades. In 1679, poet John Dryden was attacked and nearly beaten to death in the alley outside — hired thugs sent by the Duchess of Portsmouth.',
    walkToNext: '15 min walk or Tube to Hyde Park Corner',
  },
  {
    id: 2,
    pubName: 'The Star Tavern',
    address: '6 Belgrave Mews West',
    postcode: 'SW1X 8HT',
    lat: 51.5013,
    lng: -0.1565,
    crime: 'Great Train Robbery',
    review: 'Hidden in a Belgravia mews, this is where the Great Train Robbers planned the 1963 heist. Bruce Reynolds and his crew met in groups of four upstairs, plotting over pints. Also the local of cat burglar George \'Taters\' Chatham, who\'d pop in after relieving Sophia Loren of her jewellery.',
    walkToNext: 'Take District line to Tower Hill, then walk',
  },
  {
    id: 3,
    pubName: 'The Town of Ramsgate',
    address: '62 Wapping High Street',
    postcode: 'E1W 2PN',
    lat: 51.5057,
    lng: -0.0560,
    crime: 'Judge Jeffreys captured',
    review: 'In 1688, the hated Judge Jeffreys — \'the Hanging Judge\' — was caught here disguised as a sailor, trying to flee to France. The mob nearly lynched him. He was dragged to the Tower and died there. Next door, Wapping Old Stairs lead down to where pirates were chained at low tide and left to drown.',
    walkToNext: '5 min walk',
  },
  {
    id: 4,
    pubName: 'The Prospect of Whitby',
    address: '57 Wapping Wall',
    postcode: 'E1W 3SH',
    lat: 51.5066,
    lng: -0.0553,
    crime: 'Pirates, smugglers & Execution Dock',
    review: 'London\'s oldest riverside pub, originally called \'The Devil\'s Tavern\' for its clientele — smugglers, pirates, and thieves. A noose hangs outside by the river as a memorial to Execution Dock. Judge Jeffreys used to watch executions from the balcony with a pint. Dating to 1520.',
    walkToNext: 'Take Overground to Bethnal Green, then walk',
  },
  {
    id: 5,
    pubName: 'The Carpenter\'s Arms',
    address: '73 Cheshire Street',
    postcode: 'E2 6EG',
    lat: 51.5232,
    lng: -0.0631,
    crime: 'Kray twins\' headquarters',
    review: 'The Krays bought this pub and made it their headquarters in the 1960s. The Firm held meetings here. Reggie reportedly grabbed a carving knife from the kitchen before heading out to murder Jack \'The Hat\' McVitie. The one entrance the Krays loved — so they could watch the door — is still the only way in.',
    walkToNext: '10 min walk',
  },
  {
    id: 6,
    pubName: 'The Blind Beggar',
    address: '337 Whitechapel Road',
    postcode: 'E1 1BU',
    lat: 51.5210,
    lng: -0.0594,
    crime: 'Kray murder of George Cornell',
    review: 'The most infamous pub murder in British history. On 9 March 1966, Ronnie Kray walked in and shot George Cornell in the head. The jukebox was playing \'The Sun Ain\'t Gonna Shine Anymore\' — the needle stuck on the word \'anymore.\' Cornell\'s last words: \'Well, look who\'s here.\'',
    walkToNext: 'Take Central line to Barbican, then walk',
  },
  {
    id: 7,
    pubName: 'The Rising Sun',
    address: '38 Cloth Fair',
    postcode: 'EC1A 7JQ',
    lat: 51.5189,
    lng: -0.0989,
    crime: 'Body snatchers',
    review: 'Next to St Bart\'s Hospital, this was where 19th-century body snatchers John Bishop and Thomas Williams targeted victims. They\'d drug drinkers and sell the corpses to surgeons next door for dissection. London\'s answer to Burke and Hare.',
    walkToNext: '5 min walk',
  },
  {
    id: 8,
    pubName: 'The Viaduct Tavern',
    address: '126 Newgate Street',
    postcode: 'EC1A 7AA',
    lat: 51.5155,
    lng: -0.1025,
    crime: 'Built on Newgate Prison cells',
    review: 'End opposite the Old Bailey in the last surviving Victorian gin palace. Built in 1875 directly above the cells of Newgate debtors\' prison. The cellars still have the original holding cells. Prison below, pub at ground level, court across the street.',
    walkToNext: null,
  },
];

export const criminalLondonStats = {
  totalPubs: criminalLondonPubs.length,
  estimatedTime: 'Full day',
  area: 'Central London, Wapping & East End',
};

export function getCriminalLondonMapsUrl(pub: CriminalLondonPub): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.pubName}, ${pub.address}, ${pub.postcode}`)}`;
}

export function getCriminalLondonDirectionsUrl(fromPub: CriminalLondonPub, toPub: CriminalLondonPub): string {
  const origin = encodeURIComponent(`${fromPub.pubName}, ${fromPub.address}`);
  const destination = encodeURIComponent(`${toPub.pubName}, ${toPub.address}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;
}
