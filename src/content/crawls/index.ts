import { CrawlPub } from '../pubs';

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
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  area: string;
  live: boolean;
  url?: string;
  accentColor: string;
  secondaryColor: string;
  pubs: CrawlPub[];
  logistics?: CrawlLogistics;
}

export const crawls: Crawl[] = [
  {
    id: '1',
    slug: 'monopoly',
    name: 'Monopoly Pub Crawl',
    tagline: 'All 28 board spaces. All by foot.',
    description: 'Visit 26 pubs mapped to every property on the Monopoly board. From Old Kent Road to Mayfair.',
    editorialDescription: 'The ultimate London pub crawl. Twenty-six pubs, one for each property on the Monopoly board. Start at Old Kent Road, finish at Mayfair — if you make it. This isn\'t a casual afternoon; it\'s a proper expedition through London\'s drinking history, mapped onto the world\'s most famous board game.',
    duration: 'Full day',
    difficulty: 'Legendary',
    area: 'Central London',
    live: true,
    url: 'https://monopolypubcrawl.com',
    accentColor: '#D4001A',
    secondaryColor: '#1E8449',
    pubs: [
      {
        pubId: 'cittie-of-yorke',
        description: 'Vast historic cellar pub on High Holborn with dramatic vaulted interior. Holborn is on the Monopoly board — a natural stop.',
        historicNotes: 'One of the great surviving cellar pubs of London.',
      },
      {
        pubId: 'sherlock-holmes-westminster',
        description: 'Themed around the famous detective, with a replica of his Baker Street study upstairs. Near Trafalgar Square and the Strand — both Monopoly squares.',
        historicNotes: 'One of London\'s best themed pubs with genuine Victorian character.',
      },
      {
        pubId: 'nags-head-covent-garden',
        description: 'A proper free house in Covent Garden — no music, no mobiles, cash only. Near the Strand on the Monopoly board. A beloved London institution resisting the modern age.',
        historicNotes: 'One of the last genuine free houses in central London.',
      },
    ],
    logistics: {
      tubeStart: 'Elephant & Castle',
      tubeEnd: 'Oxford Circus',
      suggestedStart: '11:00 AM',
      bestDay: 'Saturday',
      pacingTips: 'Stick to halves early on to bank time. Eat around pub 8-10. The City pubs close early on weekends.',
      specialNotes: 'Some City pubs are closed on weekends. Check opening times for Fleet Street stops.',
    },
  },
  {
    id: '2',
    slug: 'jack-the-ripper',
    name: 'Jack the Ripper',
    tagline: 'Whitechapel\'s darkest corners, one pint at a time.',
    description: 'Follow the trail through the historic pubs of the East End where Victorian London\'s darkest chapter unfolded.',
    editorialDescription: 'Whitechapel, 1888. The East End\'s fog-shrouded streets held secrets that still echo today. This crawl takes you through the pubs where the victims drank, where suspects were questioned, and where Victorian London confronted its darkest hour. Not for the faint-hearted — in any sense.',
    duration: '4 hours',
    difficulty: 'Medium',
    area: 'Whitechapel',
    live: true,
    accentColor: '#8B1A1A',
    secondaryColor: '#1C1C1C',
    pubs: [
      {
        pubId: 'ten-bells-spitalfields',
        description: 'The most famous Ripper pub in existence. Annie Chapman and Mary Kelly were regulars here. The pub briefly renamed itself \'Jack the Ripper\' in the 1970s before reverting under protest in 1988.',
        historicNotes: 'Two canonical victims were last seen drinking here. Elizabeth Stride was once thrown out for being drunk.',
      },
      {
        pubId: 'white-hart-whitechapel',
        description: 'Ripper suspect George Chapman ran a barbershop in the basement. Martha Tabram is believed to have drunk here the night she died. Still displays Ripper memorabilia and is home to the famous \'Ripper Corner\'.',
        historicNotes: 'Martha Tabram\'s murder took place 50 feet from the back of the pub.',
      },
      {
        pubId: 'blind-beggar-whitechapel',
        description: 'Where Ronnie Kray shot George Cornell dead in 1966 — the most infamous pub shooting in British criminal history. Also historically linked to the Ripper era and the founding of the Salvation Army nearby.',
        historicNotes: 'Ronnie Kray walked in and shot George Cornell at the bar in broad daylight.',
      },
      {
        pubId: 'culpeper-whitechapel',
        description: 'Formerly the Princess Alice, where Frances Coles met her murderer in 1891. Early Ripper suspect \'Leather Apron\' was said to be a regular here.',
        historicNotes: 'Now a stylish gastro-pub but formerly one of the East End\'s most notorious drinking dens.',
      },
      {
        pubId: 'kings-stores-whitechapel',
        description: 'One of the oldest pubs in the area with direct Ripper-era connections. Same building reportedly used by Henry VIII as an arsenal centuries earlier.',
        historicNotes: 'A regular stop on organised Ripper pub tours.',
      },
      {
        pubId: 'bell-pub-aldgate',
        description: 'Near Mitre Square, site of Catherine Eddowes\' murder. A classic end-point for Ripper tours, steeped in the atmosphere of the old City fringe.',
        historicNotes: 'Close to the spot where one of the five canonical victims was found.',
      },
      {
        pubId: 'duke-of-wellington-spitalfields',
        description: 'Closest pub to the location of Jack the Ripper\'s most gruesome murder. A proper East End local with Victorian bones.',
        historicNotes: 'Consistently cited as the pub nearest to Mary Kelly\'s murder site.',
      },
    ],
    logistics: {
      tubeStart: 'Aldgate East',
      tubeEnd: 'Aldgate',
      suggestedStart: '6:00 PM',
      bestDay: 'Thursday or Friday',
      pacingTips: 'Best done as an evening crawl when the atmospheric streets match the mood. One pint per pub keeps it tight.',
      specialNotes: 'Consider joining a walking tour first, then do the pub crawl after for full context.',
    },
  },
  {
    id: '3',
    slug: 'beatles',
    name: 'Beatles Pub Crawl',
    tagline: "Follow the Fab Four through London's drinking spots",
    description: 'Visit the pubs where John, Paul, George and Ringo hung out during their London years.',
    editorialDescription: "The Beatles didn't just change music in London — they lived it, pub by pub. From Brian Epstein's Belgravia local to the Soho haunts of Swinging London, from the Apple Corps offices in Mayfair to a 15th-century riverside pub in Chiswick where they filmed Help!, this crawl traces the Fab Four's London through the places they actually drank. Eight pubs. Four decades of history. One legendary band.",
    duration: 'Full day',
    difficulty: 'Medium',
    area: 'Central London & Chiswick',
    live: true,
    accentColor: '#003087',
    secondaryColor: '#DAA520',
    pubs: [
      {
        pubId: 'horse-and-groom-mayfair',
        description: 'The Beatles and Brian Epstein\'s unofficial meeting pub, tucked behind his Belgravia home at 24 Chapel Street. Band meetings and strategy sessions were held here over pints.',
        historicNotes: 'Brian Epstein was found dead at his home just steps away in August 1967.',
      },
      {
        pubId: 'pub-marylebone',
        description: 'Near Marylebone Station, famously used in the opening scenes of A Hard Day\'s Night. A handsome Victorian boozer with strong Beatles filming connections.',
        historicNotes: 'Marylebone Station and environs feature heavily in the 1964 film.',
      },
      {
        pubId: 'the-pub-chiswick-barge',
        description: 'Used as a filming location in The Beatles\' 1965 film Help! Ringo\'s memorable order of \'two lagers and lime\' was delivered here. A beautiful riverside pub dating to the 14th century.',
        historicNotes: 'One of the best filming location pubs in London, still unchanged.',
      },
      {
        pubId: 'ship-soho',
        description: 'The legendary Soho pub next door to the Marquee Club. The Beatles were regulars here alongside virtually every major rock act of the 60s.',
        historicNotes: 'The Marquee\'s unofficial green room.',
      },
      {
        pubId: 'dog-and-duck-soho',
        description: 'A classic Soho haunt with Victorian tilework and stained glass. Frequented by the Beatles and the broader Soho music scene.',
        historicNotes: 'One of Soho\'s most beautiful and historically layered pubs.',
      },
      {
        pubId: 'queens-arms-bayswater',
        description: 'A beautiful Victorian pub near St John\'s Wood tube and close to Abbey Road Studios. Perfect for a post-crossing pint.',
        historicNotes: 'Walking distance from the Abbey Road crossing.',
      },
    ],
    logistics: {
      tubeStart: 'St John\'s Wood',
      tubeEnd: 'Piccadilly Circus',
      suggestedStart: '12:00 PM',
      bestDay: 'Saturday or Sunday',
      pacingTips: 'Start at Abbey Road for the photo, then work your way through Soho. Perfect pace for a relaxed afternoon.',
      specialNotes: 'Book the Abbey Road crossing photo early — it gets crowded after midday.',
    },
  },
  {
    id: '4',
    slug: 'circle-line',
    name: 'Circle Line Challenge',
    tagline: '27 stops. 27 pubs. The ultimate test.',
    description: 'A pub at every Circle Line station. Complete the loop before the Tube closes.',
    editorialDescription: 'The Circle Line Challenge is London\'s ultimate pub crawl endurance test. One pub at every station on the Circle Line — 27 stops, 27 pubs, one continuous loop through Zone 1. You start at Edgware Road and work your way around the entire circle before the Tube closes. Most groups don\'t make it past Embankment. The ones who complete the loop earn bragging rights that last a lifetime.',
    duration: '10 hours',
    difficulty: 'Hard',
    area: 'Zone 1',
    live: true,
    accentColor: '#FFD300',
    secondaryColor: '#003688',
    pubs: [
      {
        pubId: 'prince-of-wales-paddington',
        description: 'A classic Victorian pub near Paddington tube. Ideal starting point for a Circle Line crawl heading east. Traditional London boozer with a good cask ale selection.',
        historicNotes: 'Near Paddington Station, gateway to the West.',
      },
      {
        pubId: 'victoria-cross-victoria',
        description: 'A large accessible pub near Victoria station. Useful Circle Line stop in the south of the route.',
        historicNotes: 'Victoria is a major interchange — a good place to re-group mid-crawl.',
      },
      {
        pubId: 'the-blackfriar',
        description: 'The most extraordinary pub interior in London — an Arts and Crafts masterpiece with a vaulted marble back room. Built in 1905 on the site of a Dominican friary.',
        historicNotes: 'Nearly demolished in 1964. Betjeman\'s campaign saved it. One of London\'s great pub interiors.',
      },
      {
        pubId: 'counting-house-mansion-house',
        description: 'A former bank transformed into a spectacular pub with a central dome, chandeliers and original banking hall architecture. Near Mansion House Circle Line stop.',
        historicNotes: 'The banking hall has been preserved entirely. Spectacular interior.',
      },
      {
        pubId: 'hamilton-hall-liverpool-street',
        description: 'Inside Liverpool Street station itself — a former ballroom turned pub with extraordinary gilded ceilings and baroque plasterwork.',
        historicNotes: 'One of the finest pub interiors in London, inexplicably inside a train station.',
      },
      {
        pubId: 'water-poet-aldgate',
        description: 'A large, atmospheric pub near Liverpool Street and Aldgate East with a beer garden. Good real ale selection.',
        historicNotes: 'Good base for exploring Spitalfields on the Circle Line crawl.',
      },
      {
        pubId: 'callooh-callay-hoxton',
        description: 'A quirky cocktail bar near Old Street with a hidden back bar called The Jubjub. Not a traditional pub but an essential Circle Line stop for those who want something different mid-crawl.',
        historicNotes: 'Named after Lewis Carroll\'s Jabberwocky.',
      },
      {
        pubId: 'edinburgh-castle-camden',
        description: 'A large, friendly Camden pub with a huge outdoor area. Near Camden Town tube and ideal for the northern arc of the Circle Line. Regular live music.',
        historicNotes: 'A Camden institution in a neighbourhood famous for its music scene.',
      },
      {
        pubId: 'queens-arms-bayswater',
        description: 'A beautiful Victorian pub near St John\'s Wood tube. Perfect pit stop on the western arc of the Circle Line.',
        historicNotes: 'Walking distance from the Abbey Road crossing.',
      },
    ],
    logistics: {
      tubeStart: 'Edgware Road',
      tubeEnd: 'Edgware Road',
      suggestedStart: '10:00 AM',
      bestDay: 'Saturday',
      pacingTips: 'One drink per pub. Eat at stops 9, 18, and 25. The full 27 is a marathon — pace yourself.',
      specialNotes: 'Some City pubs close on weekends. Check times for stops around Bank and Monument.',
    },
  },
  {
    id: '5',
    slug: 'south-bank',
    name: 'South Bank Pub Crawl',
    tagline: "London's greatest riverside pubs, Blackfriars to Wapping",
    description: 'Three miles along the Thames, six pubs, and 500 years of London drinking history.',
    editorialDescription: "Three miles along the Thames, six pubs, and 500 years of London drinking history. Start at the Art Nouveau splendour of the Black Friar, cross to the South Bank for views of St Paul's and Shakespeare's Globe, duck into London's last coaching inn, then follow the river east past Tower Bridge to finish at the oldest riverside pub in London. This is the Thames at its best \u2014 and you're walking the whole thing.",
    duration: '4\u20135 hours',
    difficulty: 'Easy',
    area: 'South Bank & Wapping',
    live: true,
    accentColor: '#0098D4',
    secondaryColor: '#C0C0C0',
    pubs: [
      {
        pubId: 'the-blackfriar',
        description: 'Start at the most extraordinary pub interior in London. Built in 1875 and redecorated in stunning Art Nouveau style, every surface is covered in mosaics, marble, and bronze reliefs of merry monks.',
        historicNotes: 'Nearly demolished in 1964. Betjeman\'s campaign saved it. One of London\'s great pub interiors.',
      },
      {
        pubId: 'anchor-bankside',
        description: 'A Thames-side institution since the 1600s. Samuel Pepys watched the Great Fire from here in 1666. Shakespeare\'s Globe is next door.',
        historicNotes: 'The current building dates from 1770s but the inn has been here for centuries.',
      },
      {
        pubId: 'george-inn-southwark',
        description: 'London\'s last surviving galleried coaching inn, owned by the National Trust. Dickens drank here. Shakespeare almost certainly did too.',
        historicNotes: 'The most atmospheric pub in all of London. A genuine piece of living history.',
      },
    ],
    logistics: {
      tubeStart: 'Blackfriars',
      tubeEnd: 'Wapping',
      suggestedStart: '1:00 PM',
      bestDay: 'Sunday',
      pacingTips: 'Perfect for a lazy Sunday afternoon stroll. Take your time with the views. Bring a camera.',
      specialNotes: 'The route works both directions — start at Wapping for sunset views over the City.',
    },
  },
  {
    id: '7',
    slug: 'criminal-london',
    name: 'Criminal London Pub Crawl',
    tagline: 'Gangsters, smugglers, and the pubs where it all went down',
    description: 'Eight pubs where London\'s most notorious crimes were planned, committed, or punished.',
    editorialDescription: 'London\'s criminal history didn\'t happen in dark alleys — it happened in pubs. The Great Train Robbery was planned over pints in a Belgravia mews. Ronnie Kray committed murder in a Whitechapel saloon bar. Body snatchers drugged their victims next to a hospital. Pirates were hanged outside a riverside tavern. This crawl visits eight pubs where London\'s most notorious crimes were planned, committed, or punished. Not for the faint-hearted — but the beer\'s good.',
    duration: 'Full day',
    difficulty: 'Medium',
    area: 'Central London, Wapping & East End',
    live: true,
    accentColor: '#1A1A2E',
    secondaryColor: '#8B1A1A',
    pubs: [
      {
        pubId: 'blind-beggar-whitechapel',
        description: 'Where Ronnie Kray shot George Cornell dead in 1966 — the most infamous pub shooting in British criminal history.',
        historicNotes: 'Ronnie Kray walked in and shot George Cornell at the bar in broad daylight.',
      },
      {
        pubId: 'carpenters-arms-bethnal-green',
        description: 'Owned by the Kray twins themselves in the 1960s. Ronnie and Reggie used it as their local and a meeting point for their firm. A genuine piece of criminal London history.',
        historicNotes: 'The Krays bought this pub and ran it as their own. Their mother lived around the corner.',
      },
      {
        pubId: 'white-hart-whitechapel',
        description: 'Ripper suspect George Chapman ran a barbershop in the basement. Still displays Ripper memorabilia and is home to the famous \'Ripper Corner\'.',
        historicNotes: 'Martha Tabram\'s murder took place 50 feet from the back of the pub.',
      },
      {
        pubId: 'ten-bells-spitalfields',
        description: 'A Kray-era East End institution. The Krays operated in the same East End territory as the Ripper murders, decades later.',
        historicNotes: 'Deep criminal history spanning centuries.',
      },
      {
        pubId: 'ye-olde-cheshire-cheese',
        description: 'Rebuilt after the Great Fire of 1666. One of London\'s most atmospheric historic pubs. Allegedly a haunt of highwaymen and criminals in the 17th century.',
        historicNotes: 'The pub has barely changed since the 1600s.',
      },
      {
        pubId: 'horns-tavern-kennington',
        description: 'A Victorian pub with a dark criminal past. South London gangs used this area extensively. Charlie Richardson, rival of the Krays, operated in this part of London.',
        historicNotes: 'South London\'s criminal history is as rich as the East End\'s.',
      },
      {
        pubId: 'george-inn-southwark',
        description: 'London\'s only surviving galleried coaching inn. A meeting point for London\'s criminal underworld for centuries.',
        historicNotes: 'The most atmospheric pub in all of London.',
      },
      {
        pubId: 'viaduct-tavern-holborn',
        description: 'Built in 1875 on the site of Newgate Prison. Five original prison cells are still visible in the basement. A stunning Victorian gin palace.',
        historicNotes: 'The original cells can be viewed on request.',
      },
      {
        pubId: 'lamb-and-flag-covent-garden',
        description: 'Known as the \'Bucket of Blood\' after bare-knuckle fights held here. A West End institution since 1638.',
        historicNotes: 'Dryden was attacked outside in 1679.',
      },
      {
        pubId: 'cittie-of-yorke',
        description: 'Vast historic cellar pub with ancient cubicles perfect for plotting. Used by lawyers and journalists for centuries.',
        historicNotes: 'The current building dates from 1430s, rebuilt 1695.',
      },
    ],
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
    pubs: [
      {
        pubId: 'cittie-of-yorke',
        description: 'One of London\'s oldest and most dramatic pub interiors. Used by lawyers and journalists during the Blitz as it was near the Inns of Court. Survived the bombing intact.',
        historicNotes: 'The current building dates from 1430s, rebuilt 1695.',
      },
      {
        pubId: 'lamb-and-flag-covent-garden',
        description: 'One of the oldest surviving pubs in the West End. Survived the Blitz and has been serving since at least 1638.',
        historicNotes: 'Dickens drank here. Dryden was attacked outside in 1679.',
      },
      {
        pubId: 'the-hoop-and-grapes',
        description: 'One of the few timber-framed buildings in the City of London to survive both the Great Fire of 1666 and the Blitz. A crooked, atmospheric survivor from pre-fire London.',
        historicNotes: 'Dates to at least 1592. The lean in the building is visible from the street.',
      },
      {
        pubId: 'viaduct-tavern-holborn',
        description: 'A stunning Victorian gin palace that survived the Blitz. Built on the site of Newgate Prison with original cells still visible in the basement.',
        historicNotes: 'The original cells can be viewed on request.',
      },
      {
        pubId: 'olde-bell-fleet-street',
        description: 'Built by Sir Christopher Wren in 1670 for the masons rebuilding St Bride\'s Church after the Great Fire. Survived the Blitz.',
        historicNotes: 'Designed by Wren himself. The Wren connection is genuine.',
      },
      {
        pubId: 'seven-stars-holborn',
        description: 'Behind the Royal Courts of Justice, dating from 1602. Used by lawyers during the Blitz — the law courts nearby were a significant bombing target.',
        historicNotes: 'Survived the Great Fire, the Blitz and 400 years of lawyers.',
      },
      {
        pubId: 'ye-olde-cheshire-cheese',
        description: 'Rebuilt after the Great Fire of 1666. One of London\'s most atmospheric historic pubs. Kept spirits high through the Blitz.',
        historicNotes: 'The pub has barely changed since the 1600s.',
      },
      {
        pubId: 'george-inn-southwark',
        description: 'London\'s only surviving galleried coaching inn. Kept serving throughout the war.',
        historicNotes: 'A genuine piece of living history.',
      },
      {
        pubId: 'the-blackfriar',
        description: 'The most extraordinary pub interior in London — an Arts and Crafts masterpiece. Nearly demolished in 1964 but saved by Betjeman\'s campaign.',
        historicNotes: 'One of London\'s great pub interiors.',
      },
    ],
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
    pubs: [
      {
        pubId: 'prince-albert-brixton',
        description: 'A tribute was held here the night of Bowie\'s death in 2016. Close to his birthplace on Stansfield Road. A Brixton institution that was packed with fans singing his songs until dawn.',
        historicNotes: 'Spontaneous tribute venue on the night Bowie died.',
      },
      {
        pubId: 'starman-pub-brixton',
        description: 'Named in Bowie\'s honour, this pub near Brixton tube is a pilgrimage stop for fans. Often the final pub on guided Bowie walking tours.',
        historicNotes: 'Purpose-named Bowie tribute pub in his home neighbourhood.',
      },
      {
        pubId: 'toby-jug-kingston',
        description: 'Where Bowie first performed as Ziggy Stardust with the Spiders From Mars in 1972. A historic gig venue on the outer edges of the Bowie London story.',
        historicNotes: 'Ziggy Stardust was born on this stage on 10 January 1972.',
      },
      {
        pubId: 'ship-soho',
        description: 'The legendary Soho pub next door to the Marquee Club. David Bowie\'s favourite pub and watering hole for virtually every major rock act of the 60s and 70s.',
        historicNotes: 'David Bowie\'s favourite pub. The Marquee\'s unofficial green room.',
      },
      {
        pubId: 'dog-and-duck-soho',
        description: 'A classic Soho haunt with Victorian tilework and stained glass. Frequented by Bowie and the broader Soho music scene.',
        historicNotes: 'One of Soho\'s most beautiful and historically layered pubs.',
      },
    ],
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
    pubs: [
      {
        pubId: 'bricklayers-arms-soho',
        description: 'Where the Rolling Stones held their very first rehearsal in May 1962. Brian Jones, Mick Jagger and Keith Richards played together for the first time in the upstairs room. Now a record shop but the Stones\' tongue-and-lip logo is still visible above the door.',
        historicNotes: 'The birthplace of the Rolling Stones as a band.',
      },
      {
        pubId: 'worlds-end-chelsea',
        description: 'The pub at the end of the King\'s Road where the Stones hung around in their Chelsea years. Mick and Keith lived nearby at Edith Grove and Cheyne Walk.',
        historicNotes: 'Chelsea was the Stones\' home neighbourhood before they were famous.',
      },
      {
        pubId: 'six-bells-chelsea',
        description: 'A King\'s Road institution since the 18th century. A regular haunt of the Stones and their circle during the Chelsea years, close to where Brian Jones, Mick and Keith lived in Edith Grove\'s infamous flat.',
        historicNotes: 'One of the great surviving Chelsea pubs from the Stones era.',
      },
      {
        pubId: 'surprise-chelsea',
        description: 'A tucked-away Chelsea local near Cheyne Walk where Mick Jagger and Keith Richards lived after making their fortune. An ideal neighbourhood pub for rock royalty.',
        historicNotes: 'Near Jagger\'s house at 48 Cheyne Walk and Richards\' at number 3.',
      },
      {
        pubId: 'ship-soho',
        description: 'The legendary Soho pub next door to the Marquee Club. The Rolling Stones were regulars here in the early days.',
        historicNotes: 'The Marquee\'s unofficial green room.',
      },
      {
        pubId: 'dog-and-duck-soho',
        description: 'A classic Soho haunt with Victorian tilework. Frequented by the Stones and the broader Soho music scene.',
        historicNotes: 'One of Soho\'s most beautiful and historically layered pubs.',
      },
    ],
  },
  {
    id: '11',
    slug: 'bermondsey-beer-mile',
    name: 'Bermondsey Beer Mile',
    tagline: 'South London\'s legendary brewery trail, arch by arch',
    description: 'Eight of the best taprooms on the Beer Mile, from The Kernel to Southwark Brewing.',
    editorialDescription: 'The Beer Mile started in 2009 when The Kernel set up under a railway arch in Bermondsey. Now there are twenty-odd taprooms packed into the arches between Bermondsey and London Bridge, pouring everything from hop-forward pale ales to barrel-aged sours to London\'s only draught mead. This is our pick of the best — eight stops that give you the full range of what the Mile has to offer without destroying you before lunch.',
    duration: '4–6 hours',
    difficulty: 'Easy',
    area: 'Bermondsey',
    live: true,
    accentColor: '#D4A03C',
    secondaryColor: '#B87333',
    pubs: [
      {
        pubId: 'southwark-brewing-bermondsey',
        description: 'The westernmost start point of the Beer Mile. Traditional British brewing techniques applied to modern recipes. Their London Pale Ale on cask is the ideal first pint of the day.',
        historicNotes: 'One of the original Beer Mile pioneers.',
      },
      {
        pubId: 'hiver-bermondsey',
        description: 'Award-winning honey beer and cider brewed with British ingredients. The Beer Mile\'s largest beer garden. Also runs beekeeping experiences and karaoke nights.',
        historicNotes: 'A genuine crowd favourite with an excellent outdoor space under the arches.',
      },
      {
        pubId: 'anspach-hobday-bermondsey',
        description: 'Known for exceptional porters and stouts. Their taproom has 12 taps featuring core range alongside seasonal and experimental brews. A must for dark beer lovers.',
        historicNotes: 'One of the Beer Mile\'s most respected breweries for traditional styles.',
      },
      {
        pubId: 'kernel-bermondsey',
        description: 'The original Beer Mile pioneer, established 2009. Constantly rotating varietals, consistently excellent. The godfather of London craft beer. Always a queue on Saturdays.',
        historicNotes: 'Founded in 2009, The Kernel sparked the entire craft beer revolution in this part of London.',
      },
      {
        pubId: 'fourpure-bermondsey',
        description: 'The Beer Mile\'s most impressive taproom. 43 draught taps at any one time, on-site restaurant, huge space. A fitting end point to the mile.',
        historicNotes: 'The Basecamp Taproom opened 2019 and immediately set the gold standard.',
      },
      {
        pubId: 'bianca-road-bermondsey',
        description: 'West Coast American-inspired beers brewed in South London. Known for their IPAs and one of the best beer gardens on the mile. Lively atmosphere and great street art inside.',
        historicNotes: 'Named after a cycling trip across the US.',
      },
      {
        pubId: 'gosnells-bermondsey',
        description: 'The country\'s first dedicated mead bar. Eight draught options of the world\'s oldest alcoholic drink. An essential detour for those who want something truly different on the mile.',
        historicNotes: 'Mead — fermented honey — predates beer by thousands of years.',
      },
      {
        pubId: 'moor-beer-bermondsey',
        description: 'All-natural, live yeast, vegan-friendly beers that drink more like natural wine. A Bristol transplant that\'s become a Beer Mile staple.',
        historicNotes: 'Founded 2007, now a London fixture.',
      },
      {
        pubId: 'marquis-of-wellington-bermondsey',
        description: 'A friendly traditional local with a genuine passion for craft beer and quality pizza. Hosts regular events bringing in local brewers and distillers. The \'old school pub\' anchor of the Beer Mile.',
        historicNotes: 'A proper boozer amid the taprooms — provides essential balance.',
      },
      {
        pubId: 'rake-borough-market',
        description: 'Tiny but legendary craft beer bar next to Borough Market. Over 100 craft beers. The spiritual godfather of the Beer Mile.',
        historicNotes: 'One of the UK\'s earliest craft beer champions, opened 2006.',
      },
    ],
  },
  {
    id: '13',
    slug: 'historic-london',
    name: 'Historic London Pub Crawl',
    tagline: "London's oldest and most storied pubs, Fleet Street to Wapping",
    description: 'Eight of London\'s most historic pubs, spanning 500 years of drinking history.',
    editorialDescription: "Every pub on this crawl has survived something — the Great Fire, the Blitz, the developers, or just the slow grind of centuries. From a Fleet Street tavern rebuilt in 1667 to a riverside den where Tudor pirates drank, this is a walk through London's drinking history. Eight pubs spanning 500 years. Dickens drank in at least four of them. You'll understand why.",
    duration: '5\u20136 hours',
    difficulty: 'Easy',
    area: 'Fleet Street to Wapping',
    live: true,
    accentColor: '#8B4513',
    secondaryColor: '#F5E6C8',
    pubs: [],
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
    pubs: [
      {
        pubId: 'grenadier-belgravia',
        description: 'Hidden in a Belgravia mews, this former officers\' mess of the Duke of Wellington\'s regiment was regularly visited by royals. Said to be haunted by a guardsman flogged to death for cheating at cards.',
        historicNotes: 'The Duke of Wellington drank here. Allegedly one of the most haunted pubs in London.',
      },
      {
        pubId: 'star-and-garter-richmond',
        description: 'A Victorian pub right on the Thames at Richmond, close to Richmond Palace where Henry VII died and Elizabeth I spent much of her early life. Floods at very high tides \u2014 part of its charm.',
        historicNotes: 'Richmond was royal territory for centuries. The pub occupies prime riverside position.',
      },
      {
        pubId: 'kings-arms-westminster',
        description: 'A parliamentary local near the Houses of Parliament, frequented by MPs, Lords and civil servants. Royally connected through its Westminster setting and clientele.',
        historicNotes: 'Westminster\'s best pure political/royal boozer.',
      },
      {
        pubId: 'the-albert-victoria',
        description: 'A beautiful Victorian pub named after Prince Albert, consort to Queen Victoria. The division bell can be heard inside \u2014 MPs drink here and run back to vote.',
        historicNotes: 'The division bell still rings here when a Commons vote is called.',
      },
      {
        pubId: 'two-chairmen-westminster',
        description: 'A hidden Westminster gem named after the chairmen who carried sedan chairs for royals and nobles visiting St James\'s Park. Dates from the 18th century.',
        historicNotes: 'The name tells the whole story \u2014 royal transport\'s working class backbone.',
      },
      {
        pubId: 'palace-of-westminster-stranger',
        description: 'A bar inside the Houses of Parliament itself, accessible only with an MP\'s invitation. The ultimate insider\'s London drinking experience.',
        historicNotes: 'You need to be invited by an MP to drink here.',
      },
      {
        pubId: 'trafalgar-greenwich',
        description: 'A grand Regency pub on the Thames at Greenwich. Prime Ministers Gladstone and Disraeli both dined here. Close to the Old Royal Naval College.',
        historicNotes: 'Victorian PMs would come here for the famous whitebait dinners by Thames boat.',
      },
    ],
  },
  {
    id: '14',
    slug: 'literary-london',
    name: 'Literary London Pub Crawl',
    tagline: "Where London's writers drank \u2014 Dickens, Orwell, Woolf, and more",
    description: "Eight pubs where London's greatest writers drank, argued, and left manuscripts under their chairs.",
    editorialDescription: "London's greatest writers didn't write in isolation. They wrote in pubs, argued in pubs, fell in love in pubs, and occasionally left their manuscripts under the chair. This crawl traces the drinking habits of the literary canon \u2014 from the Fitzrovia boozers where Orwell and Dylan Thomas held court, through the Bloomsbury local where Dickens was a regular, to the Fleet Street tavern where Johnson, Twain, and Yeats all raised a glass. Eight pubs. Five centuries of literature. Bring a book.",
    duration: '4\u20135 hours',
    difficulty: 'Easy',
    area: 'Fitzrovia, Soho & Southwark',
    live: true,
    accentColor: '#2E4057',
    secondaryColor: '#F5E6C8',
    pubs: [],
  },
  {
    id: '15',
    slug: 'haunted-london',
    name: 'Haunted London Pub Crawl',
    tagline: 'London\'s most haunted pubs and the ghosts that haunt them',
    description: 'Eight of London\'s most convincingly haunted pubs, from a gin palace built on a prison to a pub where a murdered soldier moves objects every September.',
    editorialDescription: 'Every old London pub has a ghost story. Most of them are nonsense. These ones might not be. From a Victorian gin palace built on a prison to a Belgravia mews pub where a murdered soldier moves objects every September, this crawl takes you through the capital\'s most convincingly haunted drinking holes. Eight pubs. Poltergeists, body snatchers, highwaymen, and a ghost with a live camera feed. Best done after dark. Obviously.',
    duration: 'Full evening',
    difficulty: 'Medium',
    area: 'Central London & Highgate',
    live: true,
    accentColor: '#2C1810',
    secondaryColor: '#F5E6C8',
    pubs: [],
  },
];

// Helper to get a crawl by slug
export function getCrawlBySlug(slug: string): Crawl | undefined {
  return crawls.find(crawl => crawl.slug === slug);
}

// Helper to get pub count for a crawl
export function getPubCount(crawl: Crawl): number {
  return crawl.pubs.length;
}
