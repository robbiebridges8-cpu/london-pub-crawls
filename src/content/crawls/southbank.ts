// South Bank Pub Crawl - London's Greatest Riverside Pubs

export interface SouthBankPub {
  id: number;
  pubName: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  review: string;
  landmark: string;
  walkToNext: string | null;
  website?: string;
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
    review: 'Start at the most extraordinary pub interior in London. Built in 1875 and redecorated in stunning Art Nouveau style, every surface is covered in mosaics, marble, and bronze reliefs of merry monks. Nothing else on this crawl looks like this.',
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
    review: "Cross Blackfriars Bridge and turn left along the South Bank. The Founders Arms is a modern pub but the view is the point \u2014 St Paul's Cathedral fills the window like a painting. Grab a terrace seat if the weather's kind.",
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
    review: "A Thames-side institution since the 1600s. Samuel Pepys watched the Great Fire from here in 1666. Low beams, wood-panelled rooms, and a sprawling layout that rewards exploration. Shakespeare's Globe is next door.",
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
    review: "A short detour off the river but essential. London's last surviving galleried coaching inn, owned by the National Trust. Dickens drank here. Shakespeare almost certainly did too. The cobbled courtyard feels like stepping back 400 years.",
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
    review: 'Named after the Victorian scavengers who picked through Thames mud for valuables at low tide. Small, honest, well-kept ales, and a perfect position between Borough Market and the river. Good stop before the final stretch east.',
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
    review: "London's oldest riverside pub, dating back to 1520. Originally called The Devil's Tavern for its clientele of smugglers and pirates. Pepys and Dickens both drank here. The flagstone floor, pewter bar top, and Thames-side terrace are all original. Finish here as the sun goes down.",
    walkToNext: null,
  },
];

// Calculate stats
export const southBankStats = {
  totalPubs: southBankPubs.length,
  estimatedTime: '4\u20135 hours',
  area: 'South Bank & Wapping',
};

// Helper to get Google Maps URL for a pub
export function getSouthBankMapsUrl(pub: SouthBankPub): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.pubName}, ${pub.address}, ${pub.postcode}`)}`;
}

// Helper to get directions from one pub to the next
export function getSouthBankDirectionsUrl(from: SouthBankPub, to: SouthBankPub): string {
  const origin = encodeURIComponent(`${from.pubName}, ${from.address}`);
  const destination = encodeURIComponent(`${to.pubName}, ${to.address}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
}
