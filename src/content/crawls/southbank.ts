// South Bank Pub Crawl - London's Greatest Riverside Pubs

import { BasePub } from './types';

export interface SouthBankPub extends BasePub {
  landmark: string;
  walkToNext: string | null;
}

export const southBankPubs: SouthBankPub[] = [
  {
    id: 1,
    pubName: 'The Black Friar',
    address: '174 Queen Victoria Street',
    postcode: 'EC4V 4EG',
    lat: 51.5121,
    lng: -0.1038,
    landmark: 'Blackfriars Bridge',
    review: 'The starting point is technically north of the river, but it\'s a two-minute walk from Blackfriars Bridge and unmissable. Built in 1875 on the site of a Dominican priory, the interior was redecorated in 1905 in extravagant Art Nouveau \u2014 mosaics, marble, and bronze reliefs of fat monks drinking and feasting cover every surface. John Betjeman led the campaign that saved it from demolition in the 1960s.',
    walkToNext: '10 min walk across Blackfriars Bridge',
  },
  {
    id: 2,
    pubName: 'Founders Arms',
    address: '52 Hopton Street',
    postcode: 'SE1 9JH',
    lat: 51.5081,
    lng: -0.0987,
    landmark: "St Paul's Cathedral",
    review: 'A modern pub with zero historical interest and no pretence otherwise. You\'re here for the view \u2014 St Paul\'s Cathedral across the river, framed perfectly from the terrace. Good place to grab the first proper pint of the crawl before heading east along the Thames Path.',
    walkToNext: '5 min walk along the river',
  },
  {
    id: 3,
    pubName: 'The Anchor Bankside',
    address: '34 Park Street',
    postcode: 'SE1 9EF',
    lat: 51.5073,
    lng: -0.0921,
    landmark: "Shakespeare's Globe",
    review: 'A pub has stood on this site since at least the early 1600s, when Bankside was London\'s entertainment district \u2014 theatres, bear pits, and brothels shoulder to shoulder. Samuel Pepys is said to have watched the Great Fire of London from here on 2 September 1666. The current building dates from the 18th century. Shakespeare\'s Globe is next door.',
    walkToNext: '8 min walk via Borough Market',
  },
  {
    id: 4,
    pubName: 'The George Inn',
    address: '75-77 Borough High Street',
    postcode: 'SE1 1NH',
    lat: 51.5046,
    lng: -0.0897,
    landmark: 'Borough Market',
    review: 'London\'s last surviving galleried coaching inn, now owned by the National Trust. An inn has stood on this site since at least 1542 \u2014 the current building dates from 1676, rebuilt after a fire in Southwark. The cobbled courtyard with its timber balconies still hosts outdoor performances in summer. A two-minute detour off the river path, but non-negotiable.',
    walkToNext: '5 min walk back to the river',
  },
  {
    id: 5,
    pubName: 'The Mudlark',
    address: '4 Montague Close',
    postcode: 'SE1 9DA',
    lat: 51.5064,
    lng: -0.0882,
    landmark: 'London Bridge',
    review: 'Named after the Victorian mudlarks \u2014 scavengers who waded into the Thames at low tide to pick through the filth for coins, nails, and anything they could sell. A small, straightforward pub tucked under the arches near London Bridge. Good ales, no fuss, and a useful stop before the long riverside stretch east to Wapping.',
    walkToNext: '25 min walk along the Thames',
  },
  {
    id: 6,
    pubName: 'The Prospect of Whitby',
    address: '57 Wapping Wall',
    postcode: 'E1W 3SH',
    lat: 51.5066,
    lng: -0.0553,
    landmark: 'Wapping',
    review: 'London\'s oldest riverside pub, dating to around 1520. Originally called The Devil\'s Tavern for its clientele of smugglers and pirates. Samuel Pepys drank here. Charles Dickens drank here. J.M.W. Turner painted the Thames from the balcony. The flagstone floor and pewter bar top are original. Finish as the sun goes down \u2014 there is no better final pint in London.',
    walkToNext: null,
  },
];

// Calculate stats
export const southBankStats = {
  totalPubs: southBankPubs.length,
  estimatedTime: '4\u20135 hours',
  area: 'South Bank & Wapping',
};