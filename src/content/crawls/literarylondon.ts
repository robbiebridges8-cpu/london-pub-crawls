// Literary London Pub Crawl - Where London's writers drank

import { BasePub } from './types';

export interface LiteraryLondonPub extends BasePub {
  writer: string;
  walkToNext: string | null;
}

export const literaryLondonPubs: LiteraryLondonPub[] = [
  {
    id: 1,
    pubName: 'The Fitzroy Tavern',
    address: '16A Charlotte Street',
    postcode: 'W1T 2LY',
    lat: 51.5193,
    lng: -0.1347,
    writer: 'Orwell & Dylan Thomas',
    walkToNext: '2 min walk',
    review: 'The pub that named a neighbourhood. Judah \u201cPop\u201d Kleinfeld, a Polish-Jewish ex-tailor from Savile Row, took over in 1919 and turned it into the centre of London\'s bohemian scene \u2014 so much so that the journalist Tom Driberg coined the term \u201cFitzrovia\u201d after it in the 1940s. Orwell was a regular while writing Keep the Aspidistra Flying. Dylan Thomas arrived in 1933 and kept coming back, scribbling verses on beer mats and handing them to women at the bar. Augustus John called it \u201cthe Clapham Junction of the world.\u201d The Writers and Artists Bar downstairs still has portraits of the old regulars on the walls. Start here \u2014 it sets the tone for everything that follows.',
    website: 'https://fitzroytavern.co.uk',
  },
  {
    id: 2,
    pubName: 'The Wheatsheaf',
    address: '25 Rathbone Place',
    postcode: 'W1T 1JB',
    lat: 51.5183,
    lng: -0.1339,
    writer: 'Dylan Thomas',
    walkToNext: '12 min walk',
    review: 'A minute\'s walk from the Fitzroy Tavern, and the second pillar of the Fitzrovia circuit. Dylan Thomas met his future wife Caitlin Macnamara here in April 1936 \u2014 Augustus John, who was seeing Caitlin at the time, made the introduction, which tells you something about the social dynamics. Julian Maclaren-Ross held court at the bar in his trademark teddy-bear overcoat and silver-knobbed cane; he became the model for X. Trapnell in Anthony Powell\'s A Dance to the Music of Time. Orwell drank here too, and is said to have thrown up over the bar. Anthony Burgess was a regular. The Wheatsheaf writers were a recognised group for a while \u2014 Orwell, Thomas, Edwin Muir, Humphrey Jennings. Now it\'s a Nicholson\'s pub, well kept, and quieter than it deserves.',
    website: 'https://www.nicholsonspubs.co.uk/restaurants/london/wheatsheaf',
  },
  {
    id: 3,
    pubName: 'The Lamb',
    address: '94 Lamb\'s Conduit Street',
    postcode: 'WC1N 3LZ',
    lat: 51.5218,
    lng: -0.1199,
    writer: 'Charles Dickens',
    walkToNext: '15 min walk',
    review: 'Dickens\'s local when he lived around the corner on Doughty Street between 1837 and 1839 \u2014 the house is now the Dickens Museum, a five-minute walk away. The Lamb dates from the 1720s and still has its original Victorian snob screens: etched glass panels on swivels at the bar that let you order without being seen by the rest of the room. They were popular in the 1890s and almost none survive. Ted Hughes used to drink here and arranged early meetings with Sylvia Plath at the pub. There\'s a working polyphon \u2014 a predecessor to the gramophone \u2014 that you can play for charity. Lamb\'s Conduit Street itself is one of the best stretches of independent shops in central London, worth arriving early for.',
    website: 'https://www.thelamblondon.com',
  },
  {
    id: 4,
    pubName: 'The Dog and Duck',
    address: '18 Bateman Street',
    postcode: 'W1D 3AJ',
    lat: 51.5136,
    lng: -0.1310,
    writer: 'George Orwell',
    walkToNext: '2 min walk',
    review: 'Orwell\'s Soho local, and the pub where he celebrated in August 1945 when Animal Farm was selected by the American Book of the Month Club. The landlord had managed to get hold of a bottle of 135 proof absinthe for the occasion, which tells you what kind of place this was. The current building dates from 1897, designed by Francis Chambers for Cannon Brewery, and the Grade II listed interior of glazed tiles, ornamental glass, and mahogany is on CAMRA\'s National Inventory of Historic Pub Interiors. John Constable used to nip in from his house around the corner in the early 1800s. The upstairs dining room is named after Orwell. Madonna has also been in. Less important.',
    website: 'https://www.nicholsonspubs.co.uk/restaurants/london/thedogandducksoholondon',
  },
  {
    id: 5,
    pubName: 'The French House',
    address: '49 Dean Street',
    postcode: 'W1D 5BG',
    lat: 51.5132,
    lng: -0.1315,
    writer: 'Dylan Thomas & De Gaulle',
    walkToNext: '2 min walk',
    review: 'Victor Berlemont banned pint glasses in the 1920s because French sailors kept smashing them over each other\'s heads. The half-pint rule has held ever since \u2014 no exceptions, no arguments. Charles de Gaulle drafted his \u201cA tous les Francais\u201d appeal to the French people in the upstairs dining room on 18 June 1940. Dylan Thomas left the only manuscript of Under Milk Wood under his chair and the staff had to rescue it. Brendan Behan, Francis Bacon, and Lucian Freud were all regulars. No TV, no music, and a no-phones-at-the-bar policy. The French House sells more Ricard than anywhere else in Britain, which makes sense once you\'ve been. It\'s a small pub and it gets packed \u2014 don\'t expect a seat after six.',
    website: 'https://www.frenchhousesoho.com',
  },
  {
    id: 6,
    pubName: 'The Coach and Horses',
    address: '29 Greek Street',
    postcode: 'W1D 5DH',
    lat: 51.5132,
    lng: -0.1302,
    writer: 'Jeffrey Bernard & Private Eye',
    walkToNext: '15 min walk',
    review: 'Jeffrey Bernard wrote his Spectator \u201cLow Life\u201d column from a barstool here for decades. When he didn\'t show up, the magazine ran the headline \u201cJeffrey Bernard Is Unwell\u201d \u2014 which became the title of the 1989 West End play starring Peter O\'Toole, performed on a set that recreated this pub\'s interior. Private Eye held its fortnightly lunches upstairs for forty years, with Richard Ingrams, William Rushton, and Peter Cook in attendance. Norman Balon ran the place from 1943 until 2006, earned the title \u201cLondon\'s Rudest Landlord,\u201d and wrote a memoir called You\'re Barred, You Bastards. Grade II listed and still on Greek Street, thirty seconds from the French House. The current incarnation bills itself as London\'s first vegetarian pub.',
    website: 'https://www.coachandhorsessoho.pub',
  },
  {
    id: 7,
    pubName: 'Ye Olde Cheshire Cheese',
    address: '145 Fleet Street',
    postcode: 'EC4A 2BP',
    lat: 51.5142,
    lng: -0.1084,
    writer: 'Johnson, Dickens, Twain, Yeats',
    walkToNext: 'Take Northern line to London Bridge',
    review: 'Rebuilt in 1667 after the Great Fire, on a site that\'s had a pub since 1538. Samuel Johnson\'s house is around the corner on Gough Square, and he\'s said to have had a favourite seat by the fireplace. W.B. Yeats co-founded the Rhymers\' Club here in 1890 \u2014 he later called the other poets \u201cCompanions of the Cheshire Cheese\u201d in his poem The Grey Rock. Dickens used it frequently and alluded to it in A Tale of Two Cities. Mark Twain, Arthur Conan Doyle, G.K. Chesterton, and P.G. Wodehouse all drank in this building. The cellars are labyrinthine and may predate the Fire. You enter through a narrow alley off Fleet Street and the interior is a warren of dark-panelled rooms on multiple levels. This is the one that makes you understand why writers needed pubs.',
    website: 'https://ye-olde-cheshire-cheese.co.uk',
  },
  {
    id: 8,
    pubName: 'The George Inn',
    address: '75-77 Borough High Street',
    postcode: 'SE1 1NH',
    lat: 51.5046,
    lng: -0.0897,
    writer: 'Shakespeare & Dickens',
    walkToNext: null,
    review: 'London\'s last surviving galleried coaching inn, owned by the National Trust since 1937. The earliest record dates to 1542. The current building went up in 1677 after the Southwark fire of 1676 destroyed the earlier George \u2014 the same fire that took the Tabard Inn next door, where Chaucer\'s Canterbury pilgrims gathered. Shakespeare\'s Globe was a ten-minute walk away, and he almost certainly drank on this site. Dickens knew the George well and referenced it in Little Dorrit \u2014 his father had been locked up in the Marshalsea debtors\' prison around the corner, which probably made the pub more useful than most. The Great Northern Railway demolished the north and east wings in 1889 for warehouses, so what survives is the south range only. Greene King runs it now. The galleried courtyard is the thing \u2014 get a drink and sit outside if the weather allows.',
    website: 'https://www.george-southwark.co.uk',
  },
];

// Calculate stats
export const literaryLondonStats = {
  totalPubs: literaryLondonPubs.length,
  estimatedTime: '4\u20135 hours',
  area: 'Fitzrovia, Soho & Southwark',
};