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
    review: 'A pub has stood at 145 Fleet Street since 1538. The current Ye Olde Cheshire Cheese was rebuilt in 1667, a year after the Great Fire turned the original to ash, and the vaulted cellars underneath may date to a 13th-century Carmelite friary. The literary roll call is absurd \u2014 Johnson, Dickens, Twain, Yeats, Conan Doyle, Wodehouse \u2014 though the real star was Polly, an African grey parrot who sat behind the bar from the 1880s until 1926, swearing at regulars and shouting their drink orders back at them. When Polly died, obituaries ran in 200 newspapers worldwide. The bird is still there, stuffed in a glass case. You\'ll want to find her.',
    walkToNext: '8 min walk',
    website: 'https://ye-olde-cheshire-cheese.co.uk',
  },
  {
    id: 2,
    pubName: 'Ye Olde Mitre',
    address: '1 Ely Court, Ely Place',
    postcode: 'EC1N 6SJ',
    lat: 51.5185,
    lng: -0.1076,
    established: '1770s',
    review: 'You will walk past the entrance at least once. Ye Olde Mitre is down an alley off Ely Court between Hatton Garden and Ely Place, and the signage does not go out of its way to help you. The original pub was built in 1546 as servants\' quarters for the Bishop of Ely\'s palace. The current building dates from 1773, a year after the palace was demolished. Inside the bar there\'s a cherry tree stump that supposedly marks the boundary between the Bishop\'s land and Sir Christopher Hatton\'s \u2014 Elizabeth I allegedly danced around the tree itself, though that story improves with every retelling. The whole site was technically part of Cambridgeshire until the 1960s, which is the kind of jurisdictional quirk only London produces.',
    walkToNext: '5 min walk',
    website: 'https://www.yeoldemitreholborn.co.uk',
  },
  {
    id: 3,
    pubName: 'The Cittie of Yorke',
    address: '22 High Holborn',
    postcode: 'WC1V 6BN',
    lat: 51.5186,
    lng: -0.1120,
    established: 'site since 1430',
    review: 'The main hall of The Cittie of Yorke is one of those rooms where you stop talking when you walk in. A 50-foot ceiling, thousand-gallon wine vats mounted above the bar, and individual wooden booths that were originally designed so that lawyers from the nearby Inns of Court could discuss cases without being overheard. A pub has occupied this High Holborn site since around 1430, but the current interior is largely the work of a wine merchant named George Henekey who rebuilt it in 1831, with another reconstruction in 1924. During the Blitz, the landlord drained the port from those overhead vats into the gutter rather than risk them crashing down from a bomb blast. Samuel Smith\'s bought the place in 1975 and renamed it \u2014 the original Cittie of Yorke was actually across the road.',
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
    review: 'On 18 December 1679, three hired thugs dragged the poet John Dryden into the alley beside what is now The Lamb and Flag and beat him nearly to death. The assailants were probably sent by the Earl of Rochester and the Duchess of Portsmouth, who blamed Dryden for an anonymous satirical essay he didn\'t actually write. The building on Rose Street dates from at least 1688, though it only became a pub in 1772. The upstairs room hosted bare-knuckle prize fights through the 18th and 19th centuries, earning the place its nickname: the Bucket of Blood. We\u2019d recommend getting a drink and standing in the alley outside \u2014 in good weather it fills up fast, and you can see exactly where Dryden caught his beating.',
    walkToNext: '15 min walk',
    website: 'https://www.lambandflagcoventgarden.co.uk',
  },
  {
    id: 5,
    pubName: 'The Black Friar',
    address: '174 Queen Victoria Street',
    postcode: 'EC4V 4EG',
    lat: 51.5121,
    lng: -0.1038,
    established: '1875',
    review: 'The Black Friar is not old. It was built in 1875. What makes it unmissable is the 1905 interior redesign by Herbert Fuller-Clark and the sculptor Henry Poole \u2014 over 50 types of marble, mother-of-pearl inlay, copper reliefs of monks eating, drinking, and fishing, mosaic friezes, alabaster columns. Every surface is decorated, and then decorated again. The whole thing references the Dominican friars who occupied the site from the 13th century, but the execution is pure Arts and Crafts excess. In 1964, developers planned to demolish it for a road scheme. John Betjeman led the campaign that saved it, and the pub now holds Grade II* listing \u2014 the highest heritage protection any London pub has. Cross Blackfriars Bridge after this one.',
    walkToNext: '15 min walk across Blackfriars Bridge',
    website: 'https://www.nicholsonspubs.co.uk/restaurants/london/theblackfriarblackfriars',
  },
  {
    id: 6,
    pubName: 'The George Inn',
    address: '75-77 Borough High Street',
    postcode: 'SE1 1NH',
    lat: 51.5046,
    lng: -0.0897,
    established: '1676 (site since 1542)',
    review: 'London\'s last surviving galleried coaching inn. The George Inn on Borough High Street has been here since at least 1542, though the current building dates from 1677 \u2014 the Southwark fire of 1676 destroyed the previous one. What you\'re looking at is one wing of what was originally a three-sided courtyard; the Great Northern Railway pulled down the north and east wings in 1889 to build warehouses. The National Trust has owned it since 1937. In the coaching era, horse-drawn coaches left from this yard for Kent, Sussex, and the Channel ports. Dickens referenced it in Little Dorrit. Stand in the cobbled courtyard with a pint and look up at the galleries \u2014 that geometry hasn\'t changed in 350 years.',
    walkToNext: '5 min walk',
    website: 'https://www.george-southwark.co.uk',
  },
  {
    id: 7,
    pubName: 'The Old Thameside Inn',
    address: 'Pickfords Wharf, Clink Street',
    postcode: 'SE1 9DG',
    lat: 51.5070,
    lng: -0.0912,
    established: 'modern (medieval site)',
    review: 'The Old Thameside Inn is a modern pub, and it doesn\'t pretend otherwise. The reason you\'re here is directly above your head: the surviving rose window and gable wall of Winchester Palace, the 12th-century London residence of the Bishops of Winchester. The ruins loom over the pub\'s terrace on Clink Street. From this spot, the Bishops ran an operation that included Bankside\'s theatres, bear-baiting pits, a private prison \u2014 the Clink, which gave English its slang for jail \u2014 and licensed brothels whose workers were known as Winchester Geese. The building itself was once Pickfords Wharf, a spice warehouse on docks dating back to the 16th century. Get a table on the terrace if you can. The views across to the City are worth the stop.',
    walkToNext: '25 min walk along the Thames',
    website: 'https://www.nicholsonspubs.co.uk/restaurants/london/theoldthamesideinnsouthwark',
  },
  {
    id: 8,
    pubName: 'The Prospect of Whitby',
    address: '57 Wapping Wall',
    postcode: 'E1W 3SH',
    lat: 51.5066,
    lng: -0.0553,
    established: 'c.1520',
    review: 'Dating to around 1520, The Prospect of Whitby has the strongest claim to being London\'s oldest riverside pub \u2014 though the Mayflower in Rotherhithe disputes this, and neither claim survives much scrutiny. It was originally called The Pelican, then The Devil\'s Tavern, a name it earned from its clientele of river thieves, smugglers, and pirates. Execution Dock was nearby; convicted pirates were hanged at the low-water mark and left until three tides had washed over them. The pub burned down in the early 1800s and was rebuilt, then renamed after a Whitby coal ship that used to moor alongside. The stone floor may be original Tudor. Pepys drank here. Turner painted the Thames from the first floor in 1825. Whistler came back repeatedly in the 1860s. The pewter-topped bar catches the afternoon light in a way that makes you understand why painters kept showing up.',
    walkToNext: null,
    website: 'https://www.greeneking-pubs.co.uk/pubs/tower-hamlets/prospect-of-whitby',
  },
];

// Calculate stats
export const historicLondonStats = {
  totalPubs: historicLondonPubs.length,
  estimatedTime: '5-6 hours',
  area: 'Fleet Street to Wapping',
};