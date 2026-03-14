export interface BermondseyPub {
  id: number;
  pubName: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  review: string;
  style: string;
  walkToNext: string | null;
  website?: string;
}

export const bermondseyPubs: BermondseyPub[] = [
  {
    id: 1,
    pubName: 'The Kernel Brewery Taproom',
    address: '132 Spa Road',
    postcode: 'SE16 3AE',
    lat: 51.4953,
    lng: -0.0629,
    style: 'Pale ales & stouts',
    review: 'Where it all started. The Kernel opened in 2009 and single-handedly created the Beer Mile. Moved to this bigger Spa Road taproom in 2024 with two dozen taps and a Japanese kitchen residency. Their pale ales are still the benchmark.',
    walkToNext: '2 min walk',
  },
  {
    id: 2,
    pubName: 'Bianca Road Brew Co',
    address: '83 Enid Street',
    postcode: 'SE16 3RA',
    lat: 51.4948,
    lng: -0.0640,
    style: 'West Coast IPA',
    review: 'West Coast American brewing in a South London arch. Hop-forward IPAs and a relaxed taproom with good outdoor space. Named after a cycling trip across the States. Their TropiCali IPA is dangerously easy drinking.',
    walkToNext: '2 min walk',
  },
  {
    id: 3,
    pubName: 'Cloudwater',
    address: 'Arch 79, Enid Street',
    postcode: 'SE16 3RA',
    lat: 51.4955,
    lng: -0.0660,
    style: 'Seasonal IPAs & DIPAs',
    review: 'Manchester\'s finest set up a London outpost here and it\'s become the heart of the Mile. Twenty taps, beautiful fit-out, and some of the best hoppy beer in the country. Their seasonal DIPAs are world-class. Often the busiest spot.',
    walkToNext: '2 min walk',
  },
  {
    id: 4,
    pubName: 'Gosnells',
    address: 'Arch 72-73, Enid Street',
    postcode: 'SE16 3RA',
    lat: 51.4960,
    lng: -0.0670,
    style: 'Mead',
    review: 'London\'s first and only mead bar. Eight varieties on draught of the world\'s oldest alcoholic drink. Sweet, dry, sparkling, or hopped — mead is nothing like you\'d expect. A welcome curveball and a break from hops.',
    walkToNext: '5 min walk',
  },
  {
    id: 5,
    pubName: 'Anspach & Hobday',
    address: 'Arch 118, Druid Street',
    postcode: 'SE1 2HH',
    lat: 51.4978,
    lng: -0.0720,
    style: 'Porter & mixed styles',
    review: 'Old-school meets new-school. Their Porter is a proper London classic — rich, roasty, perfect — but they also do guava sours and West Coast DIPAs. Twelve taps and a reliably excellent vibe.',
    walkToNext: '3 min walk',
  },
  {
    id: 6,
    pubName: 'Hiver Taproom',
    address: '56 Stanworth Street',
    postcode: 'SE1 3NY',
    lat: 51.4983,
    lng: -0.0740,
    style: 'Honey beer',
    review: 'Every brew uses British honey, giving their range a distinctive sweetness. The taproom is light and airy with the Mile\'s biggest beer garden. Right next to Maltby Street Market — grab a toastie, bring it in, settle in.',
    walkToNext: '2 min walk',
  },
  {
    id: 7,
    pubName: 'The Barrel Project',
    address: 'Arch 80, Druid Street',
    postcode: 'SE1 2EZ',
    lat: 51.4985,
    lng: -0.0755,
    style: 'Barrel-aged & sours',
    review: 'Two hundred oak barrels line the walls and 24 taps pour what comes out of them. A London Beer Factory spin-off focused entirely on barrel-aged and sour beers. The interior looks like a wine cave that decided to rebel.',
    walkToNext: '3 min walk',
  },
  {
    id: 8,
    pubName: 'Southwark Brewing Company',
    address: '46 Druid Street',
    postcode: 'SE1 2EZ',
    lat: 51.5000,
    lng: -0.0785,
    style: 'Traditional English ale',
    review: 'The elder statesman of the Mile. Thirty years of brewing and one of London\'s oldest craft operations. Their Bermondsey Best is a proper English ale — the kind of pint your dad would approve of. A grounded finish before you stumble to London Bridge.',
    walkToNext: null,
  },
];

export const bermondseyStats = {
  totalPubs: bermondseyPubs.length,
  estimatedTime: '4–6 hours',
  area: 'Bermondsey',
};

export function getBermondseyMapsUrl(pub: BermondseyPub): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.pubName}, ${pub.address}, ${pub.postcode}`)}`;
}

export function getBermondseyDirectionsUrl(fromPub: BermondseyPub, toPub: BermondseyPub): string {
  const origin = encodeURIComponent(`${fromPub.pubName}, ${fromPub.address}`);
  const destination = encodeURIComponent(`${toPub.pubName}, ${toPub.address}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
}
