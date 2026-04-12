// Jack the Ripper Pub Crawl - Whitechapel's Darkest History

import { BasePub } from './types';

export interface RipperPub extends BasePub {
  walkToNext: number | null;
}

export const ripperPubs: RipperPub[] = [
  {
    id: 1,
    pubName: 'The White Hart',
    address: '89 Whitechapel High St',
    postcode: 'E1 7RA',
    lat: 51.5152,
    lng: -0.0712,
    walkToNext: 3,
    review: 'Martha Tabram was drinking at The White Hart on the evening of 7 August 1888. She left and walked into George Yard — now Gunthorpe Street, the alley that runs directly behind the pub — where she was stabbed 39 times. The murder site is less than 50 feet from where you\'re standing with your pint. Tabram\'s killing is considered by many Ripperologists to be the opening act of the Whitechapel series, though she\'s not one of the canonical five. The basement tells its own story. A Polish barber called Severin Klosowski ran his shop down there during the murder spree. He was later convicted as serial poisoner George Chapman, and the officer who arrested him reportedly said: "You\'ve got Jack the Ripper at last." Nobody\'s proved that one way or the other. The White Hart has been here since at least 1721. It\'s a McMullen\'s now, dark wood panelling, not much changed. You start here.',
    website: 'https://www.thewhitehartlondon.co.uk',
  },
  {
    id: 2,
    pubName: 'The Ten Bells',
    address: '84 Commercial St',
    postcode: 'E1 6LY',
    lat: 51.5195,
    lng: -0.0754,
    walkToNext: 1,
    review: 'The most famous pub in Ripper history. Annie Chapman was seen drinking alone at The Ten Bells on the morning of 8 September 1888 — her body was found on Hanbury Street a few hours later. Mary Jane Kelly, the final canonical victim, was a regular here and picked up clients on the pavement outside. The pub leans into this. It was renamed "The Jack the Ripper" in 1976 and filled with murder memorabilia, until a sustained Reclaim the Night campaign forced the brewery to revert the name in 1988. What earns The Ten Bells a visit beyond the history is the interior. Floor-to-ceiling Victorian ceramic tiling — blue-and-white floral panels, a raised dado, and a painted mural called "Spitalfields in ye Olden Time" that predates the murders. Grade II listed since 1973. The pub sits on the corner of Fournier Street directly opposite Hawksmoor\'s Christ Church, which is worth a look on the way in.',
    website: 'https://www.tenbells.com',
  },
  {
    id: 3,
    pubName: 'The Culpeper',
    address: '40 Commercial St',
    postcode: 'E1 6LP',
    lat: 51.5161,
    lng: -0.0737,
    walkToNext: 5,
    review: 'Before the gastropub refurb and the rooftop herb garden, this was the Princess Alice. John Pizer, the man the local women called "Leather Apron", used to threaten sex workers with a knife in here. When the Ripper panic broke in September 1888 he became the first prime suspect, though he was cleared at Annie Chapman\'s inquest. Three years later, Frances Coles — the last official victim of the Whitechapel Murders — was seen leaving this pub alive for the last time. The Culpeper is now five floors of exposed brick and small plates, renamed in 2014 after the 17th-century herbalist Nicholas Culpeper. The original building went up in 1883, commercial Gothic in red brick with terracotta detailing — you can still see it in the facade, even after the Blitz took two storeys off the top.',
    website: 'https://www.theculpeper.com',
  },
  {
    id: 4,
    pubName: 'The Pride of Spitalfields',
    address: '3 Heneage St',
    postcode: 'E1 5LJ',
    lat: 51.5180,
    lng: -0.0720,
    walkToNext: 6,
    review: 'Then called the Romford Arms, this was George Hutchinson\'s local. On the night of 9 November 1888 — the night Mary Jane Kelly was murdered in Miller\'s Court — Hutchinson told police he\'d been walking home past the pub when he saw Kelly with a well-dressed man. His description was extraordinarily detailed: astrakhan coat, dark eyes, horseshoe pin, thick gold watch chain. So detailed, in fact, that some Ripperologists think Hutchinson himself belongs on the suspect list. The Pride of Spitalfields is one of the last unreconstructed Victorian boozers in Spitalfields. It\'s been in the CAMRA Good Beer Guide for years, the interior hasn\'t changed much, and there\'s a resident cat called Lenny who\'ll ignore you from whichever chair he\'s claimed. It\'s down a side street off Brick Lane — easy to walk past if you\'re not looking for it.',
  },
  {
    id: 5,
    pubName: 'The Golden Heart',
    address: '110 Commercial Street',
    postcode: 'E1 6LZ',
    lat: 51.5202,
    lng: -0.0743,
    walkToNext: null,
    review: 'Sandra Esquilant ran The Golden Heart for over 40 years. In 2002 Art Review magazine named her one of the 100 most influential people in the art world — not bad for a pub landlady on Commercial Street. Tracey Emin, Sarah Lucas, Gilbert and George were all regulars. There are still Emin pieces hanging on the walls and in the window. The pub itself was built in 1936 for Truman\'s Brewery, Grade II listed, with a neo-Georgian frontage of brick and Portland stone facing Spitalfields Market. The interior is largely unaltered — one of the best surviving examples of Truman\'s 1930s house style, according to Historic England. It sits steps from Durward Street, formerly Buck\'s Row, where Polly Nichols\' body was found on 31 August 1888. You end the crawl here.',
  },
];

// Calculate stats
export const ripperStats = {
  totalPubs: ripperPubs.length,
  totalWalkingMins: ripperPubs.reduce((acc, pub) => acc + (pub.walkToNext || 0), 0),
  estimatedTime: '4 hours',
  area: 'Whitechapel & Spitalfields',
};

// The five canonical victims for reference/display
export const canonicalVictims = [
  { name: 'Mary Ann Nichols', date: 'August 31, 1888', location: 'Buck\'s Row (now Durward Street)', age: 43 },
  { name: 'Annie Chapman', date: 'September 8, 1888', location: '29 Hanbury Street', age: 47 },
  { name: 'Elizabeth Stride', date: 'September 30, 1888', location: 'Dutfield\'s Yard, Berner Street', age: 44 },
  { name: 'Catherine Eddowes', date: 'September 30, 1888', location: 'Mitre Square', age: 46 },
  { name: 'Mary Jane Kelly', date: 'November 9, 1888', location: '13 Miller\'s Court, Dorset Street', age: 25 },
];
