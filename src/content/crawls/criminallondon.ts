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
    review: 'The most famous pub murder in British criminal history happened here on 9 March 1966. Ronnie Kray walked in, found George Cornell sitting at the bar with a light ale, and shot him in the forehead. The barmaid ducked behind the counter. Nobody testified for three years. The Blind Beggar was built in 1894, but there\'s been a pub on this site since before 1654 \u2014 William Booth preached his first open-air sermon outside in 1865, which eventually became the Salvation Army. Two very different legacies for one Whitechapel pub. The Cornell story is on the walls now, naturally. You start here because it\'s the headline, and because everything that follows needs the context.',
    walkToNext: '10 min walk north to Bethnal Green',
    website: 'https://theblindbeggar.com',
  },
  {
    id: 2,
    pubName: 'The Carpenter\'s Arms',
    address: '73 Cheshire St',
    postcode: 'E2 6EG',
    lat: 51.5232,
    lng: -0.0631,
    crime: 'Kray twins\' headquarters',
    review: 'The Kray twins bought The Carpenter\'s Arms in 1967 for their mother Violet. It doubled as the headquarters of The Firm \u2014 the single entrance meant they could watch the door, and that entrance is still the only way in. Reggie reportedly had a drink here on 29 October 1967, took a carving knife from the kitchen, then headed to Stoke Newington to murder Jack McVitie. The pub closed in 2006, nearly got converted to flats, and reopened in 2009 as a gastropub. There\'s a large painted portrait of the twins on the wall and fresh flowers on the bar. The Kray family home was a hundred yards away. Their old boxing club, Repton, is still open between the two.',
    walkToNext: 'Tube: Bethnal Green to Wapping (Overground, ~15 min)',
    website: 'https://www.thecarpentersarms.net',
  },
  {
    id: 3,
    pubName: 'The Town of Ramsgate',
    address: '62 Wapping High St',
    postcode: 'E1W 2PN',
    lat: 51.5057,
    lng: -0.0560,
    crime: 'Judge Jeffreys captured',
    review: 'In December 1688, Judge Jeffreys \u2014 the Lord Chancellor who\'d sentenced over 300 people to death after the Monmouth Rebellion \u2014 was hiding on a ship at Wapping, disguised as a sailor, trying to escape to Hamburg. He couldn\'t hold out without a drink, went ashore, and was recognised lolling out of a window at what was then the Red Cow Tavern. A mob nearly killed him before soldiers dragged him to the Tower, where he died four months later. The pub was later renamed The Town of Ramsgate after fishermen from Kent who drank here on their way back from Billingsgate. Next door, Wapping Old Stairs lead down to the Thames foreshore where pirates were chained at low tide.',
    walkToNext: '5 min walk east along the river',
    website: 'https://townoframsgate.pub',
  },
  {
    id: 4,
    pubName: 'The Prospect of Whitby',
    address: '57 Wapping Wall',
    postcode: 'E1W 3SH',
    lat: 51.5066,
    lng: -0.0553,
    crime: 'Pirates, smugglers & Execution Dock',
    review: 'There\'s been a tavern here since around 1520. It was originally called The Pelican, then The Devil\'s Tavern \u2014 named for its clientele of smugglers, thieves, and river pirates. The current name comes from a Tyne collier ship that used to moor alongside. The 400-year-old stone floor survives from the original building; everything above it was rebuilt after a fire in the early nineteenth century. Samuel Pepys drank here. Turner and Whistler sketched the views from the terrace. A hangman\'s noose hangs over the river as a nod to Execution Dock, where Captain Kidd was hanged in 1701 and left on display for three years. We sat on that terrace for longer than we planned \u2014 it\'s one of those pubs where you order a second pint before you\'ve decided to.',
    walkToNext: 'Tube: Wapping to Barbican (~18 min via Overground and Hammersmith & City)',
    website: 'https://www.greeneking-pubs.co.uk/pubs/tower-hamlets/prospect-of-whitby',
  },
  {
    id: 5,
    pubName: 'The Rising Sun',
    address: '38 Cloth Fair',
    postcode: 'EC1A 7JQ',
    lat: 51.5189,
    lng: -0.0989,
    crime: 'Body snatchers',
    review: 'John Bishop and Thomas Williams \u2014 the London Burkers \u2014 used to scout victims in the pubs around Smithfield in the early 1830s, and The Rising Sun was one of them. They\'d drug people with rum laced with laudanum, drown them in a well, and sell the corpses to the anatomy school at St Bartholomew\'s Hospital next door. They confessed to selling up to a thousand bodies over twelve years. Both were hanged at Newgate in December 1831, a five-minute walk from this pub, in front of thirty thousand people. Their case led directly to the Anatomy Act of 1832. The pub itself may date to 1616, when it was listed as The Starre Tavern. John Betjeman was a regular when he lived around the corner on Cloth Court.',
    walkToNext: '5 min walk south-west',
    website: 'https://risingsunbarbican.co.uk',
  },
  {
    id: 6,
    pubName: 'The Viaduct Tavern',
    address: '126 Newgate St',
    postcode: 'EC1A 7AA',
    lat: 51.5155,
    lng: -0.1025,
    crime: 'Built on Newgate Prison cells',
    review: 'You finish opposite the Old Bailey, which feels right. The Viaduct Tavern is London\'s last surviving Victorian gin palace, built in 1875 on or near the site of the Giltspur Street Compter \u2014 a debtors\' prison that operated until the mid-nineteenth century. The cellar still has what are claimed to be the original holding cells: dark, cramped, with rusted iron bars. One former landlord reported being locked in by something unseen, the lights cutting out, and a voice saying \u201cthere\'s just two of us down here now.\u201d We didn\'t go down. The pub upstairs is Grade II listed, all ornate plasterwork and Victorian glass, and it sits directly across Newgate Street from the Central Criminal Court. A prison beneath your feet, a courthouse across the road.',
    walkToNext: null,
    website: 'https://www.viaducttavern.co.uk',
  },
];

export const criminalLondonStats = {
  totalPubs: criminalLondonPubs.length,
  estimatedTime: 'Full day',
  area: 'Central London, Wapping & East End',
};