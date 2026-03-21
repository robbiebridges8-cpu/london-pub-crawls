import { BasePub } from './types';

export interface CriminalLondonPub extends BasePub {
  crime: string;
  walkToNext: string | null;
}

export const criminalLondonPubs: CriminalLondonPub[] = [
  {
    id: 1,
    pubName: 'The Blind Beggar',
    address: '337 Whitechapel Rd',
    postcode: 'E1 1BU',
    lat: 51.5210,
    lng: -0.0594,
    crime: 'Kray murder of George Cornell',
    review: 'The most infamous pub murder in British criminal history. On 9 March 1966, Ronnie Kray walked in and shot George Cornell in the head as he sat at the bar drinking a light ale. The barmaid ducked. The jukebox needle stuck. Cornell was a member of the rival Richardson gang, and his murder was the beginning of the end for the Krays \u2014 it led directly to the police investigation that brought them down three years later.',
    walkToNext: '10 min walk north to Bethnal Green',
  },
  {
    id: 2,
    pubName: 'The Carpenter\'s Arms',
    address: '73 Cheshire St',
    postcode: 'E2 6EG',
    lat: 51.5232,
    lng: -0.0631,
    crime: 'Kray twins\' headquarters',
    review: 'The Kray twins bought this pub in the 1960s and ran it as the headquarters of The Firm. Meetings were held here, and the Kray family\'s Christmas parties were local legend. Reggie Kray reportedly took a carving knife from the kitchen and had a drink at this bar before heading to Stoke Newington to murder Jack "The Hat" McVitie in 1967. The single entrance \u2014 the one the Krays insisted on, so they could watch the door \u2014 is still the only way in. Now a quiet gastropub.',
    walkToNext: 'Tube: Bethnal Green to Wapping (Overground, ~15 min)',
  },
  {
    id: 3,
    pubName: 'The Town of Ramsgate',
    address: '62 Wapping High St',
    postcode: 'E1W 2PN',
    lat: 51.5057,
    lng: -0.0560,
    crime: 'Judge Jeffreys captured',
    review: 'In December 1688, Judge Jeffreys \u2014 the Lord Chancellor known as "the Hanging Judge" for sentencing over 300 people to death after the Monmouth Rebellion \u2014 was caught here disguised as a coal merchant, trying to escape to France. A mob recognised him and nearly beat him to death before soldiers intervened. He was taken to the Tower of London and died there four months later. Next door, Wapping Old Stairs lead down to the Thames foreshore where convicted pirates were chained at low tide and left to drown.',
    walkToNext: '5 min walk east along the river',
  },
  {
    id: 4,
    pubName: 'The Prospect of Whitby',
    address: '57 Wapping Wall',
    postcode: 'E1W 3SH',
    lat: 51.5066,
    lng: -0.0553,
    crime: 'Pirates, smugglers & Execution Dock',
    review: 'Dating to around 1520, this is London\'s oldest riverside pub. It was originally called The Devil\'s Tavern \u2014 named for its clientele of smugglers, thieves, and pirates. A hangman\'s noose hangs over the river terrace as a memorial to Execution Dock, where pirates including Captain Kidd were hanged and left on display until three tides had washed over them. Judge Jeffreys is said to have watched the executions from the balcony.',
    walkToNext: 'Tube: Wapping to Barbican (~18 min via Overground and Hammersmith & City)',
  },
  {
    id: 5,
    pubName: 'The Rising Sun',
    address: '38 Cloth Fair',
    postcode: 'EC1A 7JQ',
    lat: 51.5189,
    lng: -0.0989,
    crime: 'Body snatchers',
    review: 'In the early 1830s, body snatchers John Bishop and Thomas Williams \u2014 known as the London Burkers \u2014 frequented this pub next to St Bartholomew\'s Hospital. They would drug victims with rum laced with laudanum, drown them in a well, and sell the corpses to the hospital\'s anatomy school. They were convicted of murder in 1831 and hanged at Newgate, a five-minute walk from this pub. Their case led directly to the Anatomy Act of 1832.',
    walkToNext: '5 min walk south-west',
  },
  {
    id: 6,
    pubName: 'The Viaduct Tavern',
    address: '126 Newgate St',
    postcode: 'EC1A 7AA',
    lat: 51.5155,
    lng: -0.1025,
    crime: 'Built on Newgate Prison cells',
    review: 'End the crawl opposite the Old Bailey \u2014 the Central Criminal Court of England and Wales. This is London\'s last surviving Victorian gin palace, built in 1875 directly above the cells of the old Giltspur Street Compter, a debtors\' prison. The original holding cells are still accessible in the cellar. Prison beneath your feet, pint in your hand, criminal court across the street.',
    walkToNext: null,
  },
];

export const criminalLondonStats = {
  totalPubs: criminalLondonPubs.length,
  estimatedTime: 'Full day',
  area: 'Central London, Wapping & East End',
};