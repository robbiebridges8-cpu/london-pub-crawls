export type { BasePub } from './types';

export interface CrawlLogistics {
  tubeStart: string;
  tubeEnd: string;
  suggestedStart: string;
  bestDay: string;
  pacingTips: string;
  specialNotes?: string;
}

export interface Crawl {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  editorialDescription?: string;
  metaDescription?: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  area: string;
  live: boolean;
  url?: string;
  accentColor: string;
  secondaryColor: string;
  pubCount?: number;
  freshnessCaveat?: string;
  logistics?: CrawlLogistics;
}

export const crawls: Crawl[] = [
  {
    id: '1',
    slug: 'monopoly',
    name: 'Monopoly Board',
    tagline: '26 pubs for 26 board spaces. Old Kent Road to Mayfair in twelve hours.',
    description: 'A pub for every property on the London Monopoly board. 26 stops from Old Kent Road to Mayfair, with an optimised route, timings, and pub-by-pub descriptions.',
    metaDescription: 'The Monopoly pub crawl: a pub for every property on the London board. 26 stops, optimised route, and the pub-by-pub guide to completing it. Free, self-guided.',
    editorialDescription: 'In 1935, Victor Watson, managing director of Waddingtons in Leeds, sent his secretary Marjory Phillips to London with a notepad and instructions to pick streets for a board game. They stopped for afternoon tea in Islington \u2014 the Angel, specifically, which is how a Lyon\u2019s Corner House ended up on a Monopoly board. The streets they chose still exist, mostly. Vine Street doesn\u2019t, not really \u2014 it\u2019s 21 metres of dead end behind Piccadilly, the shortest street on the board and the hardest to find a pub for. Old Kent Road is still Old Kent Road. Mayfair is still Mayfair. And the price gap between them, which was already the point in 1935, has only widened. A flat on Old Kent Road costs about \u00a3380,000 today. A flat on Mount Street in Mayfair costs north of five and a half million. The board knew.\n\nThe Monopoly pub crawl takes this wealth gradient and makes you walk through it in real time. You start south of the river at 11am outside the Lord Nelson, one of only two pubs left on Old Kent Road \u2014 a street that once had 39. You cycle across Tower Bridge, drink in a railway arch near Fenchurch Street, pass through a timber-framed building that survived the Great Fire, and work your way north to Islington, where Watson and Phillips had their tea three generations ago. By mid-afternoon you\u2019re in Mayfair, where the pints cost more than your hourly wage and the supercars parked outside the pub cost more than your house. By evening you\u2019re stumbling through Soho and the West End, past Leicester Square and down Regent Street, finishing at The Duchess on Duke Street around 11pm \u2014 if you finish at all.\n\nTwenty-six pubs in roughly twelve hours. The maths is unforgiving. You have about 28 minutes per stop including travel time. Halves are non-negotiable unless you want to be face-down on Bow Street by pub eighteen. We stick to halves everywhere except a few stations and the final stop, and even then we\u2019ve had crawls where the last three pubs were a blur. The total liquid intake is around 17 pints-equivalent if you go full measures, which nobody should. Most groups who attempt it don\u2019t finish. The ones who do tend to have a spreadsheet, a timekeeper, and someone sober enough to navigate the Northern line at 1pm.\n\nThe route isn\u2019t the board order \u2014 it can\u2019t be, because the board skips around London without caring about geography. The optimised crawl runs south to north to west, roughly: Old Kent Road, through the City, up to Islington and King\u2019s Cross, across to Marylebone, down through Mayfair, into the West End, and finishing near Oxford Street. There are four stations woven in \u2014 Fenchurch Street, Liverpool Street, King\u2019s Cross, and Marylebone \u2014 each one a Wetherspoons or a Fuller\u2019s, each one a chance to eat something and recalibrate.\n\nWhat nobody tells you beforehand is that the crawl is secretly an economic geography lesson. You feel the neighbourhoods change as you move through the board. The browns are industrial south London. The light blues are scruffy-beautiful Islington. The stations punctuate with commuter pragmatism. The dark blues are Mayfair money, quiet streets and nine-pound pints. The pinks are Westminster grandeur. The reds are Fleet Street and Covent Garden \u2014 literary history and theatre crowds. The yellows and greens are Soho and the West End, where everything accelerates and the pavement fills with people and you realise you\u2019ve been drinking for ten hours. By the time you reach Oxford Street, you\u2019re walking through streets most Londoners can\u2019t afford to live on, holding a half-pint that cost more than your first three rounds combined.',
    duration: 'All Day',
    difficulty: 'Legendary',
    area: 'Central London',
    live: true,
    url: 'https://monopolypubcrawl.com',
    pubCount: 26,
    accentColor: '#D4001A',
    secondaryColor: '#1E8449',
    logistics: {
      tubeStart: 'Old Kent Road',
      tubeEnd: 'Oxford Street',
      suggestedStart: '11:00 AM',
      bestDay: 'Saturday',
      pacingTips: 'Halves only. 28 minutes per stop including travel. Eat at the station pubs.',
      specialNotes: 'Ye Olde Cheshire Cheese closes early on weekends. City pubs around Fleet Street may shut by 8pm on Saturdays.',
    },
  },
  {
    id: '2',
    slug: 'jack-the-ripper',
    name: 'Jack the Ripper',
    tagline: 'Five Whitechapel pubs connected to the 1888 murders.',
    description: 'A pub crawl through the Whitechapel murder sites. Five pubs where victims drank, suspects were named, and the history is still on the walls.',
    metaDescription: 'Jack the Ripper pub crawl: 5 Whitechapel pubs connected to the 1888 murders, from The White Hart to The Golden Heart. Free route with history and maps.',
    editorialDescription: 'Five women were murdered in Whitechapel in the autumn of 1888. They had names \u2014 Mary Ann Nichols, Annie Chapman, Elizabeth Stride, Catherine Eddowes, Mary Jane Kelly \u2014 and most of them were not, as the received story goes, prostitutes. Hallie Rubenhold\u2019s The Five makes the case that at least three of them were homeless women who couldn\u2019t scrape together fourpence for a lodging house bed. They were killed in the streets because that\u2019s where they slept.\n\nSome of them had their last drinks in the pubs on this crawl. Martha Tabram was at The White Hart on the evening of 7 August 1888 before she was stabbed 39 times in the alley behind the pub. Annie Chapman was drinking alone at The Ten Bells on the morning of 8 September. Mary Jane Kelly was a regular there and picked up clients on the pavement outside. These are facts, not atmosphere \u2014 the pubs are still standing, still serving, and still trading on the connection to varying degrees.\n\nThe differences are worth paying attention to. The Ten Bells is the most famous Ripper pub in the world, Grade II listed, and in 1976 a landlord renamed it \u201cThe Jack the Ripper\u201d and filled it with murder memorabilia. It took a twelve-year Reclaim the Night campaign to force the brewery to change the name back. The Culpeper, formerly the Princess Alice, has gone the opposite direction: gutted, refurbished, five floors of exposed brick and a rooftop herb garden. Nothing inside tells you that John Pizer used to threaten women with a knife here, or that Frances Coles was last seen alive walking out the door. The Pride of Spitalfields has done neither \u2014 it\u2019s an unreconstructed Victorian boozer where the Ripper era is preserved by accident rather than design.\n\nThe route is short. Five pubs across half a mile of Whitechapel and Spitalfields \u2014 you could walk it in twenty minutes without stopping. You start at The White Hart on Whitechapel High Street and end at The Golden Heart on Commercial Street, steps from Durward Street where Polly Nichols\u2019 body was found. In between, every evening, half a dozen walking tour operators lead groups through the same streets. They\u2019ve been doing it nightly for decades. The pubs have outlasted the controversy, the campaigns, and the refurbishments. They\u2019ll outlast the tours too.',
    duration: '4 hours',
    difficulty: 'Easy',
    area: 'Whitechapel',
    live: true,
    accentColor: '#8B1A1A',
    secondaryColor: '#1C1C1C',
    pubCount: 5,
    logistics: {
      tubeStart: 'Aldgate East',
      tubeEnd: 'Liverpool Street or Shoreditch High Street Overground',
      suggestedStart: '6:00 PM',
      bestDay: 'Friday or Saturday',
      pacingTips: 'One pint per pub. The route is short enough that you don\'t need to rush.',
      specialNotes: 'The Culpeper is a gastropub \u2014 expect table service and prices to match. Don\'t try to order at the bar.',
    },
  },
  {
    id: '3',
    slug: 'beatles',
    name: 'The Beatles',
    tagline: 'Eight pubs from Epstein\'s Belgravia local to the Help! filming location in Chiswick.',
    description: 'A Beatles pub crawl through London. Eight pubs with Fab Four connections \u2014 some verified, some proximity, all worth the visit.',
    metaDescription: 'Beatles pub crawl London: 8 pubs tracing the Fab Four from Epstein\'s Belgravia local to the Help! filming pub in Chiswick. Free route with maps.',
    editorialDescription: "On 30 January 1969, the Beatles played their last live performance on the roof of 3 Savile Row. The Metropolitan Police shut it down after forty-two minutes. That rooftop is now an Abercrombie & Fitch. This is roughly the level of indignity you should prepare for on a Beatles pub crawl through London.\n\nThe honest problem is that the Beatles were not a London pub band. They were a Liverpool pub band who moved to London to make records. Between 1962 and 1970 they spent the overwhelming majority of their London hours inside Abbey Road Studios in St John\u2019s Wood and, later, Trident Studios on St Anne\u2019s Court in Soho and the basement studio at Apple\u2019s Savile Row headquarters. Studios don\u2019t have pint glasses. Studios have tape machines and session musicians and George Martin telling you to do it again. The Beatles\u2019 London story is fundamentally a story about work, not about drinking, and any pub crawl that claims otherwise is selling you something.\n\nSo we built this one honestly. A couple of the stops have genuine, documented Beatles connections. The Horse & Groom in Belgravia was Brian Epstein\u2019s local \u2014 he lived around the corner on Chapel Street and held band meetings at his flat, which meant the nearest pint was fifty metres down a cobbled mews. The City Barge in Chiswick is where they filmed the tiger-in-the-cellar scene for Help! in April 1965, and Ringo\u2019s line about \u201ctwo lagers and lime\u201d was delivered at the actual bar. These are photographed, dated, verifiable facts.\n\nThe rest of the crawl is more like proximity drinking. De Hems in Soho was a music industry pub where Andrew Loog Oldham \u2014 who did PR for Epstein before managing the Stones \u2014 was a regular, and Trident Studios was two streets away. The Shakespeare\u2019s Head is around the corner from the London Palladium, where the Beatles performed on Sunday Night at the London Palladium in October 1963 and kicked off Beatlemania. The Devonshire Arms is directly behind 3 Savile Row, which makes it the nearest pub to Apple Corps, though \u201cthe nearest pub to Apple Corps\u201d is not quite the same thing as \u201ca Beatles pub.\u201d\n\nWe think that\u2019s fine. We think being upfront about thin connections is more interesting than pretending every stop has a plaque. The route runs from Belgravia through Soho and Marylebone, then jumps by tube to Kentish Town and out to the riverside in Chiswick. It covers about five hours if you\u2019re not rushing, and you shouldn\u2019t rush, because the pubs themselves are good regardless of who may or may not have drunk in them. The Star Tavern is where the Great Train Robbery was planned. The Assembly House has one of north London\u2019s finest surviving Victorian interiors. The Barley Mow has been pouring since 1793 and its neighbour was Charles Babbage.\n\nEight pubs. Two with solid Beatles connections, three with reasonable proximity claims, and three that are just good pubs in the right postcodes. We\u2019ve put them in an order that makes geographical sense and gives you a reason to visit Chiswick, which most crawls don\u2019t. If you want the Cavern Club, go to Liverpool. If you want a good afternoon of London pubs with a Beatles thread running through it \u2014 sometimes tight, sometimes loose \u2014 this is it.",
    duration: '5–6 hours',
    difficulty: 'Medium',
    area: 'Central London & Chiswick',
    live: true,
    pubCount: 8,
    accentColor: '#003087',
    secondaryColor: '#DAA520',
    logistics: {
      tubeStart: 'Hyde Park Corner',
      tubeEnd: 'Piccadilly Circus',
      suggestedStart: '12:00 PM',
      bestDay: 'Saturday or Sunday',
      pacingTips: 'Belgravia to Soho to Marylebone on foot, then tube to Kentish Town and Overground to Chiswick. One pint each.',
      specialNotes: 'The City Barge requires the Overground to Kew Bridge \u2014 allow 40 minutes. Worth it for the riverside terrace.',
    },
  },
  {
    id: '4',
    slug: 'circle-line',
    name: 'Circle Line Challenge',
    tagline: 'One pub at every station on the original Circle Line loop.',
    description: 'The Circle Line Challenge: 27 pubs at 27 stations, King\'s Cross clockwise to Farringdon. The original loop, halves only, before the Tube closes.',
    metaDescription: 'Circle Line pub crawl: 27 pubs at every station on the original loop. Route, pub picks, timings, and how to actually finish. Free guide with maps.',
    editorialDescription: 'Somewhere around 1999, a group of medical students decided that twenty-seven half-pints in twelve hours sounded like a reasonable Saturday. The Circle Line pub crawl probably didn\u2019t start with them \u2014 the tradition appears to go back to the 1960s, when rag week students ran a version called the Twelve Pubs of Christmas \u2014 but the medical students were the ones who stretched it to cover every station on the loop. One pub per stop. A half at each. Back to where you started for the twenty-eighth. Twelve hours or you\u2019ve failed.\n\nThe tube was the point. Not the pubs, not the beer \u2014 the tube. Other London crawls organise themselves by geography or theme or some borrowed board game. The Circle Line crawl uses the infrastructure itself as a drinking itinerary, which gives it a structure no one had to invent. You get on. You get off. You find the nearest pub. You drink. You get back on. The yellow line on the map does the route-planning for you, and the two-minute gaps between stations set the rhythm. It is, in its way, the most democratic pub crawl in London: no opinion required, no curation, just the next stop.\n\nThen TfL broke it. In December 2009, the Circle Line stopped being a circle. The continuous loop \u2014 Edgware Road round to Edgware Road, the same service pattern since 1884 \u2014 was extended west to Hammersmith and turned into a spiral. Trains now run from Hammersmith, do one lap of the old loop, and terminate back at Edgware Road. The change added stations, improved reliability, and quietly killed the geometry that made the crawl make sense. Twenty-seven became thirty-five if you followed the new map. Most people doing the crawl pretend this didn\u2019t happen. We do the same.\n\nOur route sticks to the original twenty-seven stations: King\u2019s Cross clockwise to Farringdon, the loop as it existed before 2009. You start at The Parcel Yard around 10am \u2014 it opens at 8am, which gives you margin \u2014 and work westbound through Euston Square, Baker Street, Paddington, and down through Kensington. The southern arc from Sloane Square to Westminster is where the crawl gets interesting: the pubs improve, the pace feels sustainable, you\u2019re roughly halfway. Then the City hits. Blackfriars through to Aldgate is the stretch that ends most attempts \u2014 the pubs close early on weekends, the distances feel longer because you\u2019re tired, and the light is going. If you make it to Hamilton Hall at Liverpool Street with your faculties intact, you\u2019ll finish. Moorgate, Barbican, Farringdon: three stops, three pubs, done.\n\nBoris Johnson\u2019s 2008 alcohol ban on TfL services didn\u2019t kill the crawl but it changed the texture. The night before the ban took effect \u2014 31 May 2008 \u2014 thousands packed the Circle Line for one last legal drink on the tube. Six stations had to close. Seventeen people were arrested. The crawl survived, obviously, because you drink in pubs, not on trains. But the ban removed the option of a between-stations can, which used to smooth the transitions. Now you walk into each pub cold sober from the platform, which is arguably how it should have been all along.\n\nThe completion rate is low. Most groups lose someone around Gloucester Road and lose the plot around Cannon Street. A thirteen-and-a-half-hour finish is the longest we\u2019ve seen documented. Halves are not optional \u2014 they\u2019re structural. If you drink pints, you will not finish, and the crawl will stop being fun somewhere around pub fourteen. The point was never the volume. The point was the loop.',
    duration: 'All Day',
    difficulty: 'Legendary',
    area: 'Zone 1',
    live: true,
    pubCount: 27,
    accentColor: '#FFD300',
    secondaryColor: '#003688',
    logistics: {
      tubeStart: 'King\'s Cross',
      tubeEnd: 'Farringdon',
      suggestedStart: '10:00 AM',
      bestDay: 'Saturday',
      pacingTips: 'Halves are structural, not optional. If you drink pints, you will not finish.',
      specialNotes: 'Ye Olde Watling closes at 8pm Saturdays. City pubs from Blackfriars to Aldgate shut early \u2014 don\'t dawdle in Kensington.',
    },
  },
  {
    id: '5',
    slug: 'south-bank',
    name: 'South Bank',
    tagline: 'Nine riverside pubs from Blackfriars to Rotherhithe, along the Thames Path.',
    description: 'A Thames pub crawl. Nine pubs from the Black Friar at Blackfriars to the Mayflower in Rotherhithe \u2014 three miles of river, mostly on foot.',
    metaDescription: 'South Bank pub crawl: 9 riverside pubs from Blackfriars to Rotherhithe along the Thames Path. Free route guide with pub descriptions and maps.',
    editorialDescription: 'Most London pubs turn their backs to the Thames. The river is there, somewhere behind the buildings, but you wouldn\u2019t know it from the bar. The pubs on this crawl are different. They face the water, they open onto it, and the water changes everything about how they work \u2014 the light, the noise, the way people drink. You sit outside at the Founders Arms with St Paul\u2019s Cathedral filling the frame across the river, or on the Mayflower\u2019s wooden jetty watching the tide pull at the pilings, and the pint in your hand is doing something a pint in a landlocked pub simply cannot do.\n\nWe\u2019ve walked this route four or five times now, Blackfriars to Rotherhithe, and the thing that keeps surprising us is how quickly the riverside changes character. You start at the Black Friar on the north bank \u2014 Arts and Crafts mosaics, marble monks, commuters pouring out of the station \u2014 and within twenty minutes of crossing Blackfriars Bridge you\u2019re on the South Bank proper, passing Tate Modern, weaving through tourists outside Shakespeare\u2019s Globe. By the time you reach the Anchor Bankside there\u2019s been a pub on that site since the 1600s, when Bankside was London\u2019s entertainment district: theatres, bear pits, brothels, and alehouses serving the lot. Samuel Pepys watched the Great Fire from a tavern here in 1666. Dr Johnson drank at the Anchor with Joshua Reynolds and Oliver Goldsmith. The history stacks up without you having to look for it.\n\nThen the route turns east past London Bridge and something shifts. The crowds thin. The architecture gets rawer \u2014 old wharves, converted warehouses, stretches of river wall where you can hear the water. The Horniman at Hays sits inside what was once the largest wharf in the Port of London, known as the Larder of London for all the tea and provisions that passed through it. Keep going into Bermondsey and Rotherhithe and you\u2019re walking through what was, until the 1970s, working dockland. The Old Justice, The Angel, The Mayflower \u2014 these are pubs that served watermen, dockers, and sailors. Captain Cook and Samuel Pepys both drank at The Angel\u2019s site. The Mayflower stands where the Pilgrim Fathers\u2019 ship was moored before it left for America in 1620.\n\nThe practical shape of the crawl is straightforward. Nine pubs, about three miles on foot, mostly along the Thames Path. The first six \u2014 the core route from the Black Friar to the Horniman \u2014 take three to four hours at a comfortable pace, and you\u2019re never far from a Tube station if you want to bail. The last three are bonus pubs, further east along Bermondsey Wall and into Rotherhithe, and they add an hour. They\u2019re also the best pubs on the route. The Angel is a Samuel Smith\u2019s house \u2014 cash only, no music, cheap pints \u2014 with a balcony where Turner supposedly painted The Fighting Temeraire. The Mayflower has a wooden jetty that hangs over the river at high tide and real ales that earned it back-to-back CAMRA Pub of the Year awards in 2024 and 2025.\n\nStart after lunch. Walk east. The sun will be behind you for most of the afternoon and in your face by the time you reach Rotherhithe, which is exactly what you want if you\u2019re finishing on the Mayflower\u2019s jetty at sunset.',
    duration: '5–6 hours',
    difficulty: 'Medium',
    area: 'South Bank, Bermondsey & Rotherhithe',
    live: true,
    pubCount: 9,
    accentColor: '#0098D4',
    secondaryColor: '#C0C0C0',
    logistics: {
      tubeStart: 'Blackfriars',
      tubeEnd: 'Wapping',
      suggestedStart: '1:00 PM',
      bestDay: 'Sunday',
      pacingTips: 'First six pubs are the core route (3\u20134 hours). Last three are bonus \u2014 add an hour but they\'re the best pubs.',
      specialNotes: 'The Angel is cash only (Samuel Smith\'s). The Old Justice reopened in 2023 after six years \u2014 check it\'s open before you walk out there.',
    },
  },
  {
    id: '7',
    slug: 'criminal-london',
    name: 'Criminal London',
    tagline: 'Six pubs where London\'s crimes were planned, committed, or punished.',
    description: 'A criminal history pub crawl from the Blind Beggar in Whitechapel to the Viaduct Tavern opposite the Old Bailey. The Krays, the body snatchers, Execution Dock.',
    metaDescription: 'Criminal London pub crawl: 6 pubs from the Blind Beggar to the Old Bailey. The Krays, Execution Dock, body snatchers, and Judge Jeffreys. Free route with maps.',
    editorialDescription: 'On 9 March 1966, Ronnie Kray walked into The Blind Beggar on Whitechapel Road and shot George Cornell in the head. Cornell was drinking a light ale. The barmaid ducked. The jukebox stuck. Several people in the pub saw it happen, and not one of them agreed to testify. It took the police three years to bring a case to trial, and by then the Krays had become something else entirely \u2014 not just criminals but characters, East End folk heroes who looked after their own and kept the streets safe and threw legendary Christmas parties for the neighbourhood kids.\n\nThat version of the story is mostly nonsense, but it\u2019s the version that stuck. The Krays ran protection rackets, committed armed robberies, and killed at least two people with their own hands. Reggie took a carving knife from the kitchen of The Carpenter\u2019s Arms \u2014 a pub the twins had bought for their mother \u2014 and used it to murder Jack McVitie at a house party in Stoke Newington. These were violent men who ruled through fear. But the mythology runs on a different fuel: the sharp suits, the celebrity photographs, the boxing, the idea that there was a code. Ronnie understood branding before branding had a name. He cultivated the rumours because the rumours were good for business.\n\nYou\u2019ll hear this mythology maintained in the pubs on this crawl, and that\u2019s partly the point. The Blind Beggar has the Cornell story on its walls. The Carpenter\u2019s Arms has a painted portrait of the twins. The Prospect of Whitby hangs a noose over the river terrace to remind you about Execution Dock, where pirates were hanged and left until three tides washed over them \u2014 Captain Kidd among them, in 1701. These places have learned that criminal history sells, and they\u2019re not wrong. We did this crawl on a Saturday and every pub had someone telling a version of a story they\u2019d heard from someone else who\u2019d heard it from someone who might have been there.\n\nThe route runs east to west, from Whitechapel to the Old Bailey, and the crimes get older as you go. The Krays are 1960s. Judge Jeffreys \u2014 the Hanging Judge, caught disguised as a sailor in a Wapping pub in 1688 while trying to flee to Hamburg \u2014 is seventeenth century. The body snatchers who scouted victims in the pubs around Smithfield are 1830s. Execution Dock operated for over four hundred years. By the time you reach The Viaduct Tavern, you\u2019re drinking above the cells of a debtors\u2019 prison and across the street from the Central Criminal Court. Six pubs, and between them roughly five centuries of people doing terrible things to each other within walking distance of the Thames.\n\nWe tend to start around noon. The Wapping stretch between pubs two and four is the longest gap \u2014 take the Overground rather than walking unless you fancy a forty-minute riverside trudge. Eat somewhere around stop three or four; the Prospect of Whitby does decent food if you\u2019re not in a rush. The whole thing takes four to five hours at a comfortable pace, and you\u2019ll finish within sight of St Paul\u2019s.',
    duration: '4–5 hours',
    difficulty: 'Easy',
    area: 'Central London, Wapping & East End',
    live: true,
    accentColor: '#1A1A2E',
    secondaryColor: '#8B1A1A',
    pubCount: 6,
    logistics: {
      tubeStart: 'Whitechapel',
      tubeEnd: 'St Paul\'s',
      suggestedStart: '12:00 PM',
      bestDay: 'Saturday',
      pacingTips: 'One pint per pub. The Wapping stretch is the longest gap \u2014 take the Overground unless you want a 40-minute walk.',
      specialNotes: 'The Prospect of Whitby does decent food if you need to eat. The Viaduct Tavern has claimed prison cells in the cellar \u2014 ask to see them.',
    },
  },
  {
    id: '8',
    slug: 'ww2',
    name: 'WW2 London',
    tagline: 'Blitz spirit — the pubs that survived the bombs.',
    description: 'Visit the pubs that kept spirits high through the darkest days. Stories of resilience and courage.',
    duration: '4 hours',
    difficulty: 'Easy',
    area: 'City & Westminster',
    live: false,
    accentColor: '#4A5D23',
    secondaryColor: '#D4B896',
  },
  {
    id: '9',
    slug: 'david-bowie',
    name: 'David Bowie',
    tagline: 'Brixton to Soho — Ziggy\'s London, pub by pub.',
    description: 'From Brixton to the West End, drink in the pubs and haunts of the Starman himself.',
    duration: '5 hours',
    difficulty: 'Medium',
    area: 'Brixton & Soho',
    live: false,
    accentColor: '#E63946',
    secondaryColor: '#FFD700',
  },
  {
    id: '10',
    slug: 'rolling-stones',
    name: 'Rolling Stones',
    tagline: 'Chelsea to Richmond — rock and roll\'s pub crawl.',
    description: 'Follow Mick and Keith through the pubs of Richmond, Chelsea and Soho where the Stones got their start.',
    duration: '5 hours',
    difficulty: 'Medium',
    area: 'Chelsea & Richmond',
    live: false,
    accentColor: '#1C1C8A',
    secondaryColor: '#F5F5DC',
  },
  {
    id: '11',
    slug: 'bermondsey-beer-mile',
    name: 'Bermondsey Beer Mile',
    tagline: 'Thirteen brewery taprooms under the railway arches. Mostly Saturdays only.',
    description: 'The Bermondsey Beer Mile: 13 taprooms from The Kernel to Hop Kingdom, under the arches between London Bridge and South Bermondsey.',
    metaDescription: 'Bermondsey Beer Mile guide: 13 taprooms from The Kernel to Hop Kingdom. Route, opening hours, what to drink, and where to eat. Updated for 2026.',
    editorialDescription: 'Until about 2009, the railway arches between London Bridge and South Bermondsey stations were full of mechanics, cabinet makers, and the kind of light industrial businesses that thrive in cheap, oddly shaped spaces nobody else wants. Then a cheesemonger started brewing beer in one of them.\n\nEvin O\u2019Riordain had been working at Neal\u2019s Yard Dairy in Covent Garden when they sent him to New York to help set up Whole Foods\u2019 cheese counter. His colleagues there took him to d.b.a., a bar on the Lower East Side with a beer list that treated brewing the way Neal\u2019s Yard treated cheesemaking \u2014 as craft with terroir, not commodity. He came home, started homebrewing, and in September 2009 signed the lease on a small arch on Druid Street. The Kernel Brewery opened with a pale ale dry-hopped with American varieties and a porter that tasted like the kind of thing London used to make before the big breweries killed the style. It was, by most accounts, the first new brewery in Bermondsey in over a century.\n\nWhat happened next was fast and not entirely planned. Brew By Numbers arrived in 2012. Anspach & Hobday Kickstarted their way into an arch in 2013, initially with nothing but a porter and a dream. Fourpure followed. Partizan. By 2015, people had started calling it the Bermondsey Beer Mile, and on Saturdays the arches opened their shutters and you could walk from one to the next, drinking thirds and halves at source. The rents were low because the landlord was Network Rail, which had owned London\u2019s railway arches since privatisation and wasn\u2019t especially interested in maximising yield from units that flooded when it rained and had no planning permission for retail use. The Saturday-only taproom model \u2014 technically wholesale premises with a bit of on-site tasting \u2014 was a licensing workaround that became the Mile\u2019s defining feature.\n\nIn 2018, Network Rail sold its entire arch portfolio to Blackstone and Telereal Trillium for \u00a31.5 billion. Rents started climbing. Brew By Numbers left. Fourpure closed in 2024, production shipped to Huddersfield. Some of the arches are now occupied by taprooms that don\u2019t brew on-site at all \u2014 Cloudwater\u2019s Bermondsey outpost pours Manchester beer, and Craft Beer Junction is primarily an import operation. The newer arrivals include a meadery, a cidery, and an indoor skatepark with its own beer brand. We are some distance from the original premise.\n\nBut the walk itself still works. You start at The Kernel on Spa Road \u2014 still Saturday-only, still no-frills, still pouring some of the best pale ale in London \u2014 and head west along Enid Street and Druid Street, roughly a mile and a half to the last arch. Thirteen stops on our route, though the actual count fluctuates; places open, places close, someone starts a nano-brewery in a shipping container. You\u2019ll want to eat around the midpoint \u2014 Maltby Street Market sits right between stops eight and nine, and the pulled pork there is better than anything the taprooms are serving. Most people don\u2019t finish. That\u2019s fine. The Beer Mile isn\u2019t a challenge crawl. It\u2019s a Saturday afternoon that starts with good intentions and ends when someone orders a fourth round at The Barrel Project and nobody makes it to Hop Kingdom.\n\nThe arches are still there. Whether they\u2019ll still be full of breweries in ten years depends on what the new landlords decide to charge for them.',
    duration: '4–6 hours',
    difficulty: 'Hard',
    area: 'Bermondsey',
    live: true,
    pubCount: 13,
    accentColor: '#D4A03C',
    secondaryColor: '#B87333',
    logistics: {
      tubeStart: 'Bermondsey',
      tubeEnd: 'London Bridge',
      suggestedStart: '11:00 AM',
      bestDay: 'Saturday',
      pacingTips: 'Thirds and halves only. Eat at Maltby Street Market between stops 8 and 9. Most people don\'t finish \u2014 that\'s fine.',
      specialNotes: 'The Kernel is Saturday only and sells out early. Gosnells makes mead, not beer. Hop Kingdom is a skatepark with a bar.',
    },
  },
  {
    id: '13',
    slug: 'historic-london',
    name: 'Historic London',
    tagline: 'Eight of London\'s oldest pubs, from Fleet Street to Wapping.',
    description: 'A historic pub crawl through London. Eight pubs from Ye Olde Cheshire Cheese (1667) to the Prospect of Whitby (1520) \u2014 the Great Fire survivors, the rebuilds, and the fakes.',
    metaDescription: 'Historic London pub crawl: 8 of London\'s oldest pubs from Ye Olde Cheshire Cheese to the Prospect of Whitby. Free route guide, Fleet Street to Wapping.',
    editorialDescription: "The Prospect of Whitby claims to date from 1520. Ye Olde Cheshire Cheese says 1667. The Cittie of Yorke will tell you a pub has stood on its site since 1430. Write them all down and you have a crawl that spans five centuries of continuous London drinking. Except almost none of it is continuous, and very little of it is what it claims to be.\n\nThe Great Fire of 1666 burned 13,200 buildings across 400 acres of the City. Over a thousand taverns existed in London before that fire. The ones inside the City walls \u2014 which includes most of Fleet Street, Holborn, and everything down to the river \u2014 were destroyed. Every pub in the Square Mile that claims a pre-1666 date is, at best, a pub on an old site. The building itself is post-fire. Ye Olde Cheshire Cheese was rebuilt in 1667. The Cittie of Yorke survived the fire but was rebuilt anyway in 1695, then again in 1924. Southwark, outside the City walls, had its own fire in 1676 that took out The George Inn. Even the Prospect of Whitby \u2014 far enough east to dodge both fires \u2014 burned down in the early 19th century and was rebuilt. The flagstone floor is probably original. The rest is not.\n\nWhat makes this interesting rather than depressing is that every pub on this crawl has made a choice about how to present its age. The George Inn performs authenticity through its galleried courtyard, which is genuine 1677 construction \u2014 but the Great Northern Railway demolished two-thirds of the building in 1889 for warehouses, so you\u2019re looking at one surviving wing of something that was once three times larger. The Cittie of Yorke performs it through a cavernous Gothic interior with thousand-gallon wine vats above the bar, which feels medieval but was designed by a wine merchant in 1831 and reconstructed in 1924. The Black Friar doesn\u2019t perform age at all \u2014 it performs the idea of monastic history through an Arts and Crafts interior so extravagantly decorated that it was nearly demolished in the 1960s before John Betjeman stepped in.\n\nThe route runs from Fleet Street to Wapping, roughly east, crossing the river at Blackfriars Bridge and following the south bank before cutting down to the Thames at the end. You can walk it in a day. We\u2019d suggest starting around noon \u2014 Ye Olde Cheshire Cheese and Ye Olde Mitre both close early on weekends, so check times before you go. The longest stretch is the walk from Southwark to Wapping along the river, which takes about 25 minutes and is one of the better riverside walks in London if the weather holds.\n\nDickens drank in at least four of these pubs. Samuel Johnson in at least two. Pepys in at least one. Turner painted from one. None of this makes the beer taste different, but it does make you pay attention to the rooms you\u2019re sitting in \u2014 the vaulted ceilings, the flagstone floors, the gallery balconies \u2014 in a way you wouldn\u2019t in a normal pub. Whether any of it is genuinely 500 years old matters less than the fact that someone, at some point, decided it should look like it was.",
    duration: '5\u20136 hours',
    difficulty: 'Medium',
    area: 'Fleet Street to Wapping',
    live: true,
    pubCount: 8,
    accentColor: '#8B4513',
    secondaryColor: '#F5E6C8',
    logistics: {
      tubeStart: 'Fleet Street',
      tubeEnd: 'Wapping',
      suggestedStart: '12:00 PM',
      bestDay: 'Saturday',
      pacingTips: 'The Southwark-to-Wapping riverside walk is 25 minutes and the best stretch. Don\'t skip it.',
      specialNotes: 'Ye Olde Cheshire Cheese and Ye Olde Mitre both close early on weekends \u2014 check times. The Cittie of Yorke is Samuel Smith\'s (cash only, cheap).',
    },
  },
  {
    id: '12',
    slug: 'royal-family',
    name: 'Royal Family',
    tagline: 'Palace-adjacent pints and ceremonial routes.',
    description: 'Visit the pubs with royal connections, from historic royal warrants to where princes have been spotted.',
    duration: '4 hours',
    difficulty: 'Easy',
    area: 'Mayfair & Westminster',
    live: false,
    accentColor: '#7B2D8E',
    secondaryColor: '#D4AF37',
  },
  {
    id: '14',
    slug: 'literary-london',
    name: 'Literary London',
    tagline: 'Eight pubs where London\'s writers drank, from Fitzrovia to Fleet Street.',
    description: 'A literary pub crawl through London. Eight pubs from the Fitzroy Tavern to the George Inn \u2014 Orwell, Dickens, Dylan Thomas, Yeats, and the pubs they couldn\'t stay away from.',
    metaDescription: 'Literary London pub crawl: 8 pubs where Orwell, Dickens, Dylan Thomas, and Yeats drank. Fitzrovia to Borough, with route and pub-by-pub descriptions.',
    editorialDescription: "George Orwell used to drink at the Dog and Duck on Bateman Street. When Animal Farm was picked up by the American Book of the Month Club in 1945, the landlord produced a bottle of 135 proof absinthe and Orwell celebrated there. He also drank at the Fitzroy Tavern on Charlotte Street, and at the Wheatsheaf on Rathbone Place, where he is said to have thrown up over the bar. Dylan Thomas was doing the same circuit \u2014 the Fitzroy, the Wheatsheaf, the French House on Dean Street \u2014 sometimes on the same evenings, sometimes in the same condition. Thomas arrived in Fitzrovia in 1933 and stayed, on and off, until pub closing times and borrowed money ran out. He left the only manuscript of Under Milk Wood under his chair at the French House. The staff found it and gave it back.\n\nThe Fitzrovia-to-Soho triangle that anchors this crawl existed because of economics, not inspiration. In the 1930s and 1940s, Charlotte Street and Rathbone Place had cheap rooms above shops, and the pubs were the only heated spaces a writer without a regular income could sit in for the price of a half. The Fitzroy Tavern was run by Judah Kleinfeld, a Polish-Jewish ex-tailor from Savile Row who everyone called Pop. Under his management it became the centre of a bohemian scene that gave the whole neighbourhood its name \u2014 the journalist Tom Driberg coined \u201cFitzrovia\u201d in the 1940s, after the pub. Augustus John, Nina Hamnett, Quentin Crisp, Aleister Crowley, and half of the BBC were regulars. Orwell used the Newman Arms round the corner as the model for the proles\u2019 pub in Nineteen Eighty-Four. He was writing about what he knew.\n\nThe crawl runs south from Fitzrovia into Soho, then east to Fleet Street and across the river to Borough. The geography traces a shift in centuries \u2014 from the twentieth-century bohemians of Charlotte Street to the Victorian and Georgian literati of Fleet Street and Southwark. Ye Olde Cheshire Cheese, rebuilt after the Great Fire in 1667, had Samuel Johnson as a regular and W.B. Yeats co-founding the Rhymers\u2019 Club in its back room in 1890. The George Inn on Borough High Street is London\u2019s last surviving galleried coaching inn, owned by the National Trust, and Dickens referenced it in Little Dorrit while his father was locked up in the Marshalsea debtors\u2019 prison around the corner. Dickens was a prolific pub-goer even by the standards of his era. He drank at the Lamb on Lamb\u2019s Conduit Street when he lived on Doughty Street. He drank at the Cheshire Cheese. He drank, by most accounts, everywhere.\n\nYou should start at the Fitzroy Tavern around one o\u2019clock on a Thursday or Friday, when Fitzrovia is busy enough to have atmosphere but not so packed that you can\u2019t get a seat. The Soho pubs are a two-minute walk from each other, which is convenient and dangerous in roughly equal measure. After the Coach and Horses you\u2019ll need to get across to Fleet Street \u2014 walk or take the Central line one stop from Tottenham Court Road to Chancery Lane. Then it\u2019s the Northern line south to London Bridge for the George Inn. We\u2019d recommend a pint at each, not a half, except at the French House, where a half is all you\u2019ll get. That\u2019s been the rule since the 1920s, when Victor Berlemont banned pint glasses because French sailors kept smashing them over each other\u2019s heads.\n\nNone of these writers drank in pubs because pubs made them better writers. Pubs were warm, pubs were cheap, pubs were open, and pubs didn\u2019t ask what you were working on. The manuscript got left under the chair. The celebration involved absinthe at ten in the morning. The columnist wrote his column from the barstool because going home meant stopping. This crawl is eight pubs across five centuries of people who wrote important things and drank more than was good for them.",
    duration: '4\u20135 hours',
    difficulty: 'Medium',
    area: 'Fitzrovia, Soho & Southwark',
    live: true,
    pubCount: 8,
    accentColor: '#2E4057',
    secondaryColor: '#F5E6C8',
    logistics: {
      tubeStart: 'Goodge Street',
      tubeEnd: 'London Bridge',
      suggestedStart: '1:00 PM',
      bestDay: 'Thursday or Friday',
      pacingTips: 'Fitzrovia and Soho are walkable. Fleet Street needs the Central line (one stop). Borough needs the Northern line south.',
      specialNotes: 'The French House serves half pints only \u2014 that\'s been the rule since the 1920s. Ye Olde Cheshire Cheese closes early on weekends.',
    },
  },
];

// Helper to get a crawl by slug
export function getCrawlBySlug(slug: string): Crawl | undefined {
  return crawls.find(crawl => crawl.slug === slug);
}

// Helper to get pub count for a crawl
export function getPubCount(crawl: Crawl): number {
  return crawl.pubCount ?? 0;
}
