import { BasePub } from './types';

export interface HauntedLondonPub extends BasePub {
  ghost: string;
  walkToNext: string | null;
}

export const hauntedLondonPubs: HauntedLondonPub[] = [
  {
    id: 1,
    pubName: 'The Viaduct Tavern',
    address: '126 Newgate Street',
    postcode: 'EC1A 7AA',
    lat: 51.5155,
    lng: -0.1025,
    ghost: 'Newgate prisoners',
    review: 'London\'s last surviving Victorian gin palace, built in 1875 directly above the cells of Newgate debtors\' prison. The poltergeist activity is confined to the cellars — staff have been locked in, objects thrown, and lights killed. Nobody goes down there alone.',
    walkToNext: '5 min walk',
  },
  {
    id: 2,
    pubName: 'The Rising Sun',
    address: '38 Cloth Fair',
    postcode: 'EC1A 7JQ',
    lat: 51.5189,
    lng: -0.0989,
    ghost: 'Body snatchers\' victims',
    review: 'Next to St Bart\'s Hospital, this was the hunting ground for 19th-century body snatchers who drugged drinkers and sold their corpses to the surgeons next door. The landlady once felt an invisible ice-cold hand on her back in the shower. Cheap pints, lingering dread.',
    walkToNext: '15 min walk or Tube to Aldgate East',
  },
  {
    id: 3,
    pubName: 'The Ten Bells',
    address: '84 Commercial Street',
    postcode: 'E1 6LY',
    lat: 51.5195,
    lng: -0.0754,
    ghost: 'Ripper victims & axe-murdered landlord',
    review: 'Jack the Ripper\'s victims drank here. Annie Chapman was in this pub hours before she was murdered. A Victorian landlord was killed with an axe and his ghost reportedly crawls into beds on the upper floors. Beautiful Victorian tiling. The atmosphere after dark is not.',
    walkToNext: 'Take Northern line to Pimlico',
  },
  {
    id: 4,
    pubName: 'The Morpeth Arms',
    address: '58 Millbank',
    postcode: 'SW1P 4RW',
    lat: 51.4911,
    lng: -0.1266,
    ghost: 'Suicidal convict',
    review: 'Built in 1845 over tunnels connecting Millbank Prison to the Thames, where convicts waited to be shipped to Australia. A prisoner who killed himself rather than be deported haunts the cellars. The pub has a live ghost camera pointed at the old holding cells.',
    walkToNext: '15 min walk',
  },
  {
    id: 5,
    pubName: 'The Grenadier',
    address: '18 Wilton Row',
    postcode: 'SW1X 7NR',
    lat: 51.5021,
    lng: -0.1538,
    ghost: 'Cedric the soldier',
    review: 'Widely considered London\'s most haunted pub. A young soldier called Cedric was beaten to death in the cellar for cheating at cards. Every September, objects move, temperatures drop, and footsteps pace empty rooms. The ceiling is covered in banknotes left by visitors trying to pay off his debt.',
    walkToNext: 'Take Northern line to Archway, then bus to Highgate',
  },
  {
    id: 6,
    pubName: 'The Flask',
    address: '77 Highgate West Hill',
    postcode: 'N6 6BU',
    lat: 51.5686,
    lng: -0.1480,
    ghost: 'Spanish barmaid',
    review: 'Near Highgate Cemetery, which tells you everything. A Spanish barmaid hanged herself in the cellar after a failed affair with the landlord — the cellar is now a seating area. Glasses slide across tables. Customers report cold breath on the back of their neck. Parts date to 1663.',
    walkToNext: '15 min walk',
  },
  {
    id: 7,
    pubName: 'The Spaniards Inn',
    address: 'Spaniards Road',
    postcode: 'NW3 7JJ',
    lat: 51.5718,
    lng: -0.1672,
    ghost: 'Dick Turpin, Juan & the woman in white',
    review: 'Three ghosts for the price of a pint. Dick Turpin\'s father ran the place and the highwayman bangs around upstairs. A Spaniard called Juan, killed in a duel over a woman, haunts the bar. A woman in white drifts through the beer garden. Here since 1585. Dickens, Byron, Keats, and Shelley all drank here.',
    walkToNext: 'Take bus 210 or Tube from Hampstead to Angel',
  },
  {
    id: 8,
    pubName: 'The Old Queen\'s Head',
    address: '44 Essex Road',
    postcode: 'N1 8LN',
    lat: 51.5381,
    lng: -0.0991,
    ghost: 'Sir Walter Raleigh & Tudor woman',
    review: 'A 16th-century pub rebuilt in the 1830s. Sir Walter Raleigh\'s ghost appears in the bar and vanishes with a wave. A Tudor woman materialises on the first Sunday of every month. A young girl runs up and down the stairs, giggling, crying, and slamming doors. Three ghosts, unbothered by the DJ nights downstairs.',
    walkToNext: null,
  },
];

export const hauntedLondonStats = {
  totalPubs: hauntedLondonPubs.length,
  estimatedTime: 'Full evening',
  area: 'Central London & Highgate',
};