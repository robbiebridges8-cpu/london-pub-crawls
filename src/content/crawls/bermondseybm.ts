import { BasePub } from './types';

export interface BermondseyPub extends BasePub {
  style: string;
  walkToNext: string | null;
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
    review: 'The brewery that started the Beer Mile before the Beer Mile had a name. Evin O\'Riordain founded Kernel in 2010 under a railway arch and has been making some of London\'s best pale ales ever since. The Pale Ale \u2014 dry, bitter, and packed with American hops \u2014 is a London modern classic. The taproom is bare-bones: you\'re here for the beer, not the d\u00e9cor. Opens Saturdays only.',
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
    review: 'A newer addition to the Mile, opened in 2021 by a former Kernel brewer. Small-batch and experimental \u2014 expect the tap list to change every visit. They don\'t do safe or predictable, which is exactly what makes them worth the stop.',
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
    review: 'Manchester\'s most celebrated craft brewery, with a permanent Bermondsey taproom. Their IPAs and pale ales are consistently among the best in the UK \u2014 clean, balanced, and unapologetically hop-forward. The taproom is more polished than some of the grittier arches on the Mile. Usually has a queue on Saturday afternoons.',
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
    review: 'The wildcard on the Mile. Gosnells make mead, not beer \u2014 every batch is brewed with British honey. If you think mead is a novelty for medieval fairs, this will change your mind. Try the citra-hopped variety. The taproom is small and friendly.',
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
    review: 'One of the Mile\'s anchor breweries, established in 2013 by Paul Anspach and Jack Hobday. Their Porter \u2014 rich, roasty, with a long chocolate finish \u2014 is a proper London porter in the tradition of the style that was invented in this city. But they also range into sours, IPAs, and lagers. Twelve taps, usually busy, reliably excellent.',
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
    review: 'Another honey brewery, but making beer rather than mead \u2014 every brew incorporates British honey, giving the range a distinctive sweetness. The taproom is lighter and airier than most of the arches, with the Beer Mile\'s biggest outdoor seating area. Directly adjacent to Maltby Street Market \u2014 combine the two on a Saturday.',
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
    review: 'A London Beer Factory spin-off dedicated entirely to barrel-aged and sour beers. The taproom has 200 oak barrels lining the walls and 24 taps pouring the results. The interior is genuinely impressive \u2014 it looks like a wine cellar that switched sides. If you like sours and wild ales, this is the highlight of the Mile.',
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
    review: 'One of the longer-running operations on the Mile. Their Bermondsey Best is an English bitter \u2014 the kind of straightforward, well-made pint that doesn\'t need a backstory. A solid, unpretentious finish before the walk to London Bridge. Good place to sit down and take stock of how many thirds you\'ve actually had.',
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
