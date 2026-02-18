'use client';

import { useState, useEffect, useRef } from 'react';

// Monopoly color groups
const colorGroups: Record<string, { name: string; color: string; bg: string }> = {
  brown: { name: 'Brown', color: '#8B4513', bg: '#F5E6D3' },
  lightBlue: { name: 'Light Blue', color: '#87CEEB', bg: '#E8F4FD' },
  pink: { name: 'Pink', color: '#D63384', bg: '#FCE4EC' },
  orange: { name: 'Orange', color: '#FF6B00', bg: '#FFF3E0' },
  red: { name: 'Red', color: '#D32F2F', bg: '#FFEBEE' },
  yellow: { name: 'Yellow', color: '#FFD600', bg: '#FFFDE7' },
  green: { name: 'Green', color: '#2E7D32', bg: '#E8F5E9' },
  darkBlue: { name: 'Dark Blue', color: '#1A237E', bg: '#E8EAF6' },
  station: { name: 'Station', color: '#212121', bg: '#F5F5F5' },
};

interface Pub {
  id: number;
  property: string;
  pubName: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  rating: number;
  startTime: string;
  endTime: string;
  transportToNext: string;
  transportTime: number | null;
  price: number;
  pintQuantity: string;
  review: string;
  colorGroup: string;
  website?: string;
}

const pubs: Pub[] = [
  {
    id: 1,
    property: "Old Kent Road",
    pubName: "Lord Nelson",
    address: "386 Old Kent Rd",
    postcode: "SE1 5AA",
    lat: 51.4842,
    lng: -0.0720,
    rating: 6,
    startTime: "11:00",
    endTime: "11:05",
    transportToNext: "Cycle",
    transportTime: 13,
    price: 2.60,
    pintQuantity: "1/2",
    review: "A proper South London pub to kick things off. It opens at 11am, and we usually try and get in and out quickly to bank some breathing room later down the line. Lord Nelson is a common starting place for crawlers, so try and make friends with other groups if you see them there - you'll be seeing a lot of them throughout the day! Make sure you get a photo underneath the Old Kent Road sign.",
    colorGroup: "brown",
  },
  {
    id: 2,
    property: "Fenchurch St Station",
    pubName: "The Minories",
    address: "64-73 Minories",
    postcode: "EC3N 1LA",
    lat: 51.5117,
    lng: -0.0756,
    rating: 7,
    startTime: "11:18",
    endTime: "11:38",
    transportToNext: "Walk",
    transportTime: 4,
    price: 7.20,
    pintQuantity: "1",
    review: "The first station on the route is an impressively sized venue, with an incredible interior showcasing exposed brick archways. Perfect atmosphere for winter drinks, but it doesn't have the brightest ambiance. Fortunately, there's a spacious beer garden to enjoy some morning sun in the summer.",
    colorGroup: "station",
    website: "https://www.theminoriespub.co.uk",
  },
  {
    id: 3,
    property: "Whitechapel Road",
    pubName: "The Hoop and Grapes",
    address: "47 Aldgate High St",
    postcode: "EC3N 1AL",
    lat: 51.5138,
    lng: -0.0762,
    rating: 5,
    startTime: "11:42",
    endTime: "12:02",
    transportToNext: "Walk",
    transportTime: 9,
    price: 3.70,
    pintQuantity: "1/2",
    review: "Rounding off the browns brings us to the Hoop and Grapes in Whitechapel. One of the few timber-framed buildings to survive the Great Fire of 1666, The Hoop and Grapes is steeped in history. With a similarly dimly-lit interior to the Minories, you can stand out the front if it's a nice day.",
    colorGroup: "brown",
    website: "https://www.nicholsonspubs.co.uk/restaurants/london/thehoopandgrapesaldgatecityoflondon",
  },
  {
    id: 4,
    property: "Liverpool St Station",
    pubName: "Hamilton Hall",
    address: "Liverpool St",
    postcode: "EC2M 7PY",
    lat: 51.5179,
    lng: -0.0828,
    rating: 4.5,
    startTime: "12:11",
    endTime: "12:31",
    transportToNext: "Tube",
    transportTime: 24,
    price: 6.52,
    pintQuantity: "1",
    review: "Our second station takes us to Liverpool St in the heart of the City. This Wetherspoons occupies the former Great Eastern Hotel's ballroom and it is one of the fancier Wetherspoons you'll find yourself in. You'll be surprised by how busy this is, even at midday.",
    colorGroup: "station",
    website: "https://www.jdwetherspoon.com/pubs/all-pubs/england/london/hamilton-hall-london",
  },
  {
    id: 5,
    property: "The Angel, Islington",
    pubName: "Camden Head",
    address: "2 Camden Walk",
    postcode: "N1 8DY",
    lat: 51.5360,
    lng: -0.1050,
    rating: 9,
    startTime: "12:55",
    endTime: "13:15",
    transportToNext: "Walk",
    transportTime: 8,
    price: 3.08,
    pintQuantity: "1/2",
    review: "After getting off the Tube at Angel, head to this lively courtyard pub just off Camden Passage. Camden Head kicks off our favourite phase of the crawl, where the spirits are high and the sun is (hopefully) shining bright. We normally have a pint here to savour our time in the beer garden for longer.",
    colorGroup: "lightBlue",
    website: "https://www.greeneking-pubs.co.uk/pubs/greater-london/camden-head",
  },
  {
    id: 6,
    property: "Pentonville Road",
    pubName: "The Castle",
    address: "Pentonville Road",
    postcode: "N1 9HF",
    lat: 51.5318,
    lng: -0.1130,
    rating: 9.5,
    startTime: "13:23",
    endTime: "13:43",
    transportToNext: "Walk",
    transportTime: 15,
    price: 3.85,
    pintQuantity: "1/2",
    review: "Our favourite pub on the entire crawl. Make sure you head up to the terrace, and if you can squeeze in a pint somewhere, do it here. The sun shining on the terrace can feel like you've teleported to a continental European city. Fun fact: the Hatton Garden heist of Easter weekend 2015 was planned here.",
    colorGroup: "lightBlue",
    website: "https://www.thecastleislington.co.uk",
  },
  {
    id: 7,
    property: "Kings Cross Station",
    pubName: "The Parcel Yard",
    address: "Kings Cross Station",
    postcode: "N1C 4AH",
    lat: 51.5320,
    lng: -0.1240,
    rating: 6.5,
    startTime: "13:58",
    endTime: "14:18",
    transportToNext: "Walk",
    transportTime: 11,
    price: 7.05,
    pintQuantity: "1",
    review: "The Parcel Yard is a Fuller's pub set in the restored Western Range of King's Cross station. It isn't the easiest to find - make sure you're inside the station and go up the stairs towards the back. You'll find a station pub that rivals any high street boozer.",
    colorGroup: "station",
    website: "https://www.parcelyard.co.uk",
  },
  {
    id: 8,
    property: "Euston Road",
    pubName: "The Euston Tap",
    address: "Euston Station",
    postcode: "NW1 2EF",
    lat: 51.5282,
    lng: -0.1337,
    rating: 8,
    startTime: "14:29",
    endTime: "14:49",
    transportToNext: "Walk",
    transportTime: 18,
    price: 3.25,
    pintQuantity: "1/2",
    review: "The light blues aren't the most coveted set on the standard Monopoly board, but they're comfortably our favourite colour on the crawl. Housed in a stunning neo-classical stone lodge at the front of Euston station, The Euston Tap is a craft beer paradise. Over 30 keg lines and a huge bottle selection.",
    colorGroup: "lightBlue",
    website: "https://www.eustontap.com",
  },
  {
    id: 9,
    property: "Marylebone Station",
    pubName: "The Marylebone",
    address: "93 Marylebone High St",
    postcode: "W1U 4RE",
    lat: 51.5210,
    lng: -0.1520,
    rating: 7,
    startTime: "15:07",
    endTime: "15:27",
    transportToNext: "Walk",
    transportTime: 18,
    price: 7.20,
    pintQuantity: "1",
    review: "At the end of the longest walk on the crawl, you'll arrive at a stylish gastropub on one of London's most charming high streets. The Marylebone is a modestly sized venue that is often full inside, but there is plenty of room to stand on the street outside.",
    colorGroup: "station",
    website: "https://www.themarylebone.co.uk",
  },
  {
    id: 10,
    property: "Park Lane",
    pubName: "The Audley",
    address: "41-43 Mount St",
    postcode: "W1K 2RX",
    lat: 51.5098,
    lng: -0.1520,
    rating: 7,
    startTime: "15:45",
    endTime: "16:05",
    transportToNext: "Walk",
    transportTime: 9,
    price: 4.50,
    pintQuantity: "1/2",
    review: "The Audley is situated in the heart of Mayfair, one of London's most expensive areas. As you might expect from the first of our dark blues, the beer isn't the cheapest here, but the quality of the venue is also what you would expect from the second-most lucrative property on the board.",
    colorGroup: "darkBlue",
    website: "https://the-audley.com",
  },
  {
    id: 11,
    property: "Mayfair",
    pubName: "The Burlington Arms",
    address: "21 Old Burlington St",
    postcode: "W1S 2JL",
    lat: 51.5105,
    lng: -0.1395,
    rating: 8,
    startTime: "16:14",
    endTime: "16:34",
    transportToNext: "Walk",
    transportTime: 12,
    price: 3.75,
    pintQuantity: "1/2",
    review: "Tucked away on a quiet Mayfair side street, The Burlington Arms is a refined pub with a loyal following. Fitting for the most expensive square on the board, this pub offers the luxury of The Audley with some added serenity. Enjoy it while it lasts - you're about to enter the belly of the beast.",
    colorGroup: "darkBlue",
    website: "https://www.burlingtonarms.com",
  },
  {
    id: 12,
    property: "Piccadilly",
    pubName: "St James's Tavern",
    address: "45 Great Windmill St",
    postcode: "W1D 7NE",
    lat: 51.5112,
    lng: -0.1340,
    rating: 6,
    startTime: "16:46",
    endTime: "17:06",
    transportToNext: "Walk",
    transportTime: 7,
    price: 4.05,
    pintQuantity: "1/2",
    review: "A handsome corner pub where Soho meets the West End. St James's Tavern is the first of the yellows visited on the crawl, where it feels like the world is moving at 100mph outside. There is a McDonald's across the road, which can be extremely handy if anyone is beginning to flag.",
    colorGroup: "yellow",
    website: "https://www.nicholsonspubs.co.uk/restaurants/london/thestjamestavernwestminster",
  },
  {
    id: 13,
    property: "Pall Mall",
    pubName: "The Red Lion",
    address: "Crown Passage",
    postcode: "SW1Y 6PP",
    lat: 51.5068,
    lng: -0.1379,
    rating: 6,
    startTime: "17:13",
    endTime: "17:33",
    transportToNext: "Walk",
    transportTime: 11,
    price: 3.70,
    pintQuantity: "1/2",
    review: "Hidden down a narrow alley off Pall Mall, The Red Lion dates back to 1821 and oozes old-world charm. Walking in here feels like you've discovered a secret London, and is a welcome contrast from the hustle and bustle of Piccadilly. Once you've completed this stop, you are officially halfway through the crawl.",
    colorGroup: "pink",
    website: "https://www.redlionwestminster.co.uk",
  },
  {
    id: 14,
    property: "Whitehall",
    pubName: "Silver Cross",
    address: "33 Whitehall",
    postcode: "SW1A 2BX",
    lat: 51.5065,
    lng: -0.1254,
    rating: 5.5,
    startTime: "17:44",
    endTime: "18:04",
    transportToNext: "Walk",
    transportTime: 1,
    price: 2.85,
    pintQuantity: "1/2",
    review: "One of the oldest licensed premises in London, the Silver Cross sits proudly on Whitehall with a licence dating back to 1674. Charles I reportedly granted it a licence to operate as a brothel - it's now a rather more respectable Greene King with a healthy selection and a spacious seating area.",
    colorGroup: "pink",
    website: "https://www.greeneking.co.uk/pubs/greater-london/silver-cross",
  },
  {
    id: 15,
    property: "Northumberland Avenue",
    pubName: "The Ship & Shovell",
    address: "2 Craven Passage",
    postcode: "WC2N 5NF",
    lat: 51.5076,
    lng: -0.1235,
    rating: 6,
    startTime: "18:05",
    endTime: "18:25",
    transportToNext: "Walk",
    transportTime: 20,
    price: 3.80,
    pintQuantity: "1/2",
    review: "London's only pub split across both sides of an alley. The Ship & Shovell, named after Admiral Sir Cloudesley Shovell, is two separate bars connected by name but divided by Craven Passage. This is a lively stop, with people congregating all the way up the alley.",
    colorGroup: "pink",
    website: "https://www.shipandshovell.co.uk",
  },
  {
    id: 16,
    property: "Fleet Street",
    pubName: "Ye Olde Cheshire Cheese",
    address: "145 Fleet St",
    postcode: "EC4A 2BP",
    lat: 51.5141,
    lng: -0.1081,
    rating: 5,
    startTime: "18:45",
    endTime: "19:05",
    transportToNext: "Walk",
    transportTime: 10,
    price: 3.60,
    pintQuantity: "1/2",
    review: "Rebuilt in 1667 after the Great Fire, Ye Olde Cheshire Cheese is one of London's most historic pubs. Samuel Johnson, Charles Dickens and Mark Twain all drank here. The warren of dark rooms connected by narrow staircases is enchanting. A crown jewel of the crawl.",
    colorGroup: "red",
    website: "https://www.ye-olde-cheshire-cheese.co.uk",
  },
  {
    id: 17,
    property: "Strand",
    pubName: "The Wellington",
    address: "351 Strand",
    postcode: "WC2R 0HS",
    lat: 51.5107,
    lng: -0.1195,
    rating: 6,
    startTime: "19:15",
    endTime: "19:35",
    transportToNext: "Walk",
    transportTime: 3,
    price: 4.05,
    pintQuantity: "1",
    review: "A grand corner pub on The Strand near Covent Garden, The Wellington is a reliable stop with a wide selection of beers. There's a Tesco en route here from Ye Olde Cheshire Cheese, where we have stopped previously for a meal deal to top us up.",
    colorGroup: "red",
    website: "https://www.thewellingtonpub.com",
  },
  {
    id: 18,
    property: "Bow Street",
    pubName: "The Marquess of Anglesey",
    address: "39 Bow St",
    postcode: "WC2E 7AU",
    lat: 51.5130,
    lng: -0.1222,
    rating: 8.5,
    startTime: "19:38",
    endTime: "19:58",
    transportToNext: "Walk",
    transportTime: 9,
    price: 3.85,
    pintQuantity: "1/2",
    review: "A stunning Young's pub right next to the Royal Opera House, The Marquess of Anglesey is made up of gorgeous Victorian tiling and impressive glasswork. The standout feature of this stop is the rooftop terrace. One of the most photogenic pubs on the crawl.",
    colorGroup: "orange",
    website: "https://www.themarquessofanglesey.co.uk",
  },
  {
    id: 19,
    property: "Trafalgar Square",
    pubName: "The Admiralty",
    address: "66 Trafalgar Sq",
    postcode: "WC2N 5DS",
    lat: 51.5080,
    lng: -0.1270,
    rating: 7,
    startTime: "20:07",
    endTime: "20:27",
    transportToNext: "Walk",
    transportTime: 5,
    price: 4.10,
    pintQuantity: "1/2",
    review: "This is where the memory begins to get a little hazy. Situated right on Trafalgar Square with Nelson's Column looming outside, The Admiralty is a spacious pub with a nautical theme. The location is unbeatable - grab a seat outside and drink in the surroundings.",
    colorGroup: "red",
    website: "https://www.admiraltytrafalgar.co.uk",
  },
  {
    id: 20,
    property: "Leicester Square",
    pubName: "The Moon Under Water",
    address: "28 Leicester Square",
    postcode: "WC2H 7LE",
    lat: 51.5113,
    lng: -0.1302,
    rating: 5,
    startTime: "20:32",
    endTime: "20:52",
    transportToNext: "Walk",
    transportTime: 3,
    price: 3.50,
    pintQuantity: "1/2",
    review: "Named after George Orwell's essay about his ideal pub, this Wetherspoons takes up a huge space on Leicester Square. Enjoy the cheap prices, but as with most Wetherspoons, the sooner you get out of here the better.",
    colorGroup: "yellow",
    website: "https://www.jdwetherspoon.com/pubs/all-pubs/england/london/the-moon-under-water-leicester-square",
  },
  {
    id: 21,
    property: "Coventry Street",
    pubName: "The Coach House",
    address: "7 Oxendon St",
    postcode: "SW1Y 4EE",
    lat: 51.5095,
    lng: -0.1310,
    rating: 6.5,
    startTime: "20:55",
    endTime: "21:15",
    transportToNext: "Walk",
    transportTime: 7,
    price: 3.90,
    pintQuantity: "1",
    review: "For some reason, the later in the crawl we get, the more we start opting for full pints instead of halves. This begins around the time of The Coach House, which is a cosy pub tucked just off Coventry Street in the heart of theatreland. Feels like the beginning of the home stretch - 5 to go.",
    colorGroup: "yellow",
    website: "https://www.thecoachhousesoho.co.uk",
  },
  {
    id: 22,
    property: "Regent Street",
    pubName: "The Starman",
    address: "15 Heddon St",
    postcode: "W1B 4BF",
    lat: 51.5125,
    lng: -0.1395,
    rating: 6,
    startTime: "21:22",
    endTime: "21:42",
    transportToNext: "Walk",
    transportTime: 2,
    price: 3.80,
    pintQuantity: "1/2",
    review: "Named in honour of David Bowie, whose Ziggy Stardust album cover was shot on this very street, The Starman is a stylish modern bar just off Regent Street. Check out the Bowie mural around the corner before heading in.",
    colorGroup: "green",
    website: "https://www.thestarman.co.uk",
  },
  {
    id: 23,
    property: "Vine Street",
    pubName: "Leicester Arms",
    address: "44 Glasshouse St",
    postcode: "W1B 5DP",
    lat: 51.5108,
    lng: -0.1360,
    rating: 6.5,
    startTime: "21:44",
    endTime: "22:04",
    transportToNext: "Walk",
    transportTime: 5,
    price: 3.80,
    pintQuantity: "1/2",
    review: "Although Vine Street doesn't exist anymore, Leicester Arms is a traditional pub on Glasshouse Street near where Vine Street once ran. It has a lot of character and a warm, old-school pub atmosphere. Remember to maintain regular water intervals.",
    colorGroup: "orange",
    website: "https://www.leicesterarmspub.co.uk",
  },
  {
    id: 24,
    property: "Marlborough Street",
    pubName: "Shakespeare's Head",
    address: "29 Great Marlborough St",
    postcode: "W1F 7HZ",
    lat: 51.5140,
    lng: -0.1385,
    rating: 7,
    startTime: "22:09",
    endTime: "22:29",
    transportToNext: "Walk",
    transportTime: 6,
    price: 3.32,
    pintQuantity: "1",
    review: "A large Greene King on Great Marlborough Street, Shakespeare's Head occupies an attractive building near Carnaby Street. The outdoor seating is prime people-watching territory. A wallet-friendly stop near the finish line.",
    colorGroup: "orange",
    website: "https://www.greeneking-pubs.co.uk/pubs/greater-london/shakespeares-head",
  },
  {
    id: 25,
    property: "Bond Street",
    pubName: "Duke of York",
    address: "Dering St, New Bond St",
    postcode: "W1S 1AF",
    lat: 51.5140,
    lng: -0.1460,
    rating: 6,
    startTime: "22:35",
    endTime: "22:55",
    transportToNext: "Walk",
    transportTime: 2,
    price: 3.80,
    pintQuantity: "1/2",
    review: "A charming little pub tucked away on a quiet street just off Bond Street. The Duke of York punches above its weight with a cosy, traditional interior. Definitely feels like a hidden gem. This is where the strict timings throughout the day pay dividends.",
    colorGroup: "green",
  },
  {
    id: 26,
    property: "Oxford Street",
    pubName: "The Duchess",
    address: "Woodcock St",
    postcode: "W1C 2AD",
    lat: 51.5148,
    lng: -0.1505,
    rating: 6,
    startTime: "22:57",
    endTime: "23:17",
    transportToNext: "N/A",
    transportTime: null,
    price: 7.35,
    pintQuantity: "1",
    review: "The grand finale. The Duchess is a sleek, modern venue just off Oxford Street - the perfect spot to celebrate the end of the epic Monopoly pub crawl. It closes at midnight, so you should be able to savour your conquest here. If you've made it to the end, you are part of the MonopElite - congratulations!",
    colorGroup: "green",
    website: "https://www.theduchessw1.co.uk",
  }
];

function PubCard({ pub, onClick }: { pub: Pub; onClick: () => void }) {
  const group = colorGroups[pub.colorGroup];
  const lightBands = ['yellow', 'lightBlue'];
  const textColor = lightBands.includes(pub.colorGroup) ? '#1a1a1a' : '#fff';

  return (
    <button
      onClick={onClick}
      className="w-full bg-white border-2 border-black rounded-md overflow-hidden cursor-pointer flex flex-col text-left hover:shadow-lg transition-shadow"
      style={{ aspectRatio: '3 / 4.5' }}
    >
      {/* Color band */}
      <div
        className="px-4 py-3 text-center border-b-2 border-black"
        style={{ backgroundColor: group.color }}
      >
        <span
          className="text-xs font-black uppercase tracking-wide"
          style={{ color: textColor }}
        >
          {pub.property}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-black uppercase tracking-tight text-black mb-1 leading-tight">
          {pub.pubName}
        </h3>
        <p className="text-[10px] text-gray-600 mb-3">
          {pub.address}, {pub.postcode}
        </p>
        <div className="h-px bg-black mb-3" />
        <p className="text-xs text-gray-600 flex-1 line-clamp-4">
          {pub.review}
        </p>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
          <span className="text-xs font-bold">{pub.startTime} - {pub.endTime}</span>
          <span className="text-xs">
            <span className="font-black text-sm">{pub.id}</span>
            <span className="text-gray-400">/26</span>
          </span>
        </div>
      </div>
    </button>
  );
}

function PubModal({ pub, onClose }: { pub: Pub; onClose: () => void }) {
  const group = colorGroups[pub.colorGroup];
  const lightBands = ['yellow', 'lightBlue'];
  const textColor = lightBands.includes(pub.colorGroup) ? '#1a1a1a' : '#fff';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'bg-green-700';
    if (rating >= 6) return 'bg-orange-500';
    if (rating >= 4) return 'bg-orange-700';
    return 'bg-red-600';
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-black rounded-md max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center text-lg hover:bg-gray-100 z-10"
        >
          ×
        </button>

        {/* Header */}
        <div
          className="px-5 py-3 text-center border-b-2 border-black"
          style={{ backgroundColor: group.color }}
        >
          <span className="text-lg font-black uppercase tracking-wide" style={{ color: textColor }}>
            {pub.property}
          </span>
        </div>

        {/* Title */}
        <div className="text-center px-6 pt-5 pb-3">
          <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-1">
            {pub.pubName}
          </h2>
          <p className="text-sm text-gray-600">{pub.address}, {pub.postcode}</p>
        </div>

        <div className="h-px bg-black mx-6" />

        {/* Body */}
        <div className="p-6">
          {/* Details table */}
          <div className="mb-4 space-y-1">
            <div className="flex items-baseline gap-1 text-sm">
              <span>Times</span>
              <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
              <span className="font-semibold">{pub.startTime} - {pub.endTime}</span>
            </div>
            <div className="flex items-baseline gap-1 text-sm">
              <span>Quantity</span>
              <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
              <span className="font-semibold">{pub.pintQuantity} pint</span>
            </div>
            <div className="flex items-baseline gap-1 text-sm">
              <span>Price</span>
              <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
              <span className="font-semibold">£{pub.price.toFixed(2)}</span>
            </div>
            {pub.transportTime && (
              <div className="flex items-baseline gap-1 text-sm">
                <span>Next stop</span>
                <span className="flex-1 border-b border-dotted border-gray-400 relative top-[-3px]" />
                <span className="font-semibold">{pub.transportTime} min ({pub.transportToNext})</span>
              </div>
            )}
          </div>

          {/* Review */}
          <div className="pt-4 mb-4 border-t border-black">
            <h4 className="text-sm font-black uppercase tracking-tight mb-2">Our Review</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{pub.review}</p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-black">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.pubName}, ${pub.address}, ${pub.postcode}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-800 hover:text-red-600 hover:underline"
            >
              Open in Maps
            </a>
            <div className="flex items-center gap-3">
              <span className={`${getRatingColor(pub.rating)} text-white px-2 py-1 rounded text-sm font-bold`}>
                {pub.rating}/10
              </span>
              <span className="text-sm text-gray-500 font-semibold">#{pub.id} of 26</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MonopolyPage() {
  const [selectedPub, setSelectedPub] = useState<Pub | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleCards((prev) => new Set([...prev, index]));
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const totalPrice = pubs.reduce((sum, p) => sum + p.price, 0);

  return (
    <>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'TouristAttraction',
                '@id': 'https://londonpubcrawls.com/crawl/monopoly#attraction',
                name: 'Monopoly Pub Crawl London',
                description: 'Visit 26 pubs mapped to every property on the Monopoly board. From Old Kent Road to Mayfair.',
                url: 'https://londonpubcrawls.com/crawl/monopoly',
                touristType: ['Pub Enthusiasts', 'Board Game Fans', 'London Explorers'],
                isAccessibleForFree: true,
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How many pubs are on the Monopoly pub crawl?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The Monopoly pub crawl features 26 pubs, one for each property on the Monopoly board including all four stations.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How long does the Monopoly pub crawl take?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The full Monopoly pub crawl typically takes 12 hours, starting at 11am and finishing around 11pm.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#C8E6C9] via-[#A5D6A7] to-[#81C784]">
          {/* Board pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(46, 125, 50, 0.08) 80px, rgba(46, 125, 50, 0.08) 82px),
                repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(46, 125, 50, 0.08) 80px, rgba(46, 125, 50, 0.08) 82px)
              `,
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
            {/* Back link */}
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[#1a1a2e]/60 hover:text-[#1a1a2e] transition-colors mb-6 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Crawls
            </a>

            {/* Top hat */}
            <div className="text-6xl mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
              🎩
            </div>

            {/* Title card */}
            <div className="bg-[#FFF9E6] border-4 border-[#1a1a2e] rounded-xl p-8 md:p-12 max-w-2xl mx-auto mb-8 shadow-lg">
              <div className="text-sm md:text-base text-[#1a1a2e] tracking-[6px] uppercase mb-2">
                The London
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white bg-[#D32F2F] px-6 md:px-12 py-3 md:py-4 rounded-md inline-block shadow-[0_4px_0_#B71C1C] tracking-wider mb-4">
                MONOPOLY
              </h1>
              <div className="text-lg md:text-xl text-[#1a1a2e] tracking-[10px] uppercase mt-2">
                Pub Crawl
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-[#2a2a3e] mb-8 max-w-lg mx-auto">
              Complete the legendary Monopoly board, drink by drink.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
              {[
                { num: '26', label: 'Pubs' },
                { num: '26', label: 'Drinks' },
                { num: '12', label: 'Hours' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#FFF9E6] border-2 border-[#1a1a2e] rounded-lg px-5 py-4 shadow-sm hover:-translate-y-1 transition-transform"
                >
                  <div className="text-2xl md:text-3xl font-black text-[#D32F2F]">{stat.num}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 md:py-24 px-6 bg-[#FAFAF8]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#1a1a2e] mb-4">
                  The Ultimate London Challenge
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Monopoly Pub Crawl takes you on an epic journey through 26 London pubs, each one mapped to a property on the classic Monopoly board. From the humble beginnings of Old Kent Road to the glittering heights of Mayfair, you&apos;ll experience London like never before.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Due to geographical constraints, the route can&apos;t follow the board order exactly. Instead, it&apos;s optimised to minimise travel time while hitting all 26 properties. Start at 11am, finish by midnight. Simple.
                </p>
                <a
                  href="#route"
                  className="inline-flex items-center gap-3 bg-[#D32F2F] text-white px-8 py-4 rounded-md font-bold text-lg tracking-wider uppercase shadow-[0_4px_0_#B71C1C] hover:translate-y-1 hover:shadow-[0_2px_0_#B71C1C] transition-all"
                >
                  See the Route
                  <span className="text-xl">→</span>
                </a>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-2">
                {[colorGroups.brown, colorGroups.lightBlue, colorGroups.red, colorGroups.green].map((group, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: group.bg }}
                  >
                    <div
                      className="w-12 h-12 rounded-full"
                      style={{ backgroundColor: group.color }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Route */}
        <section id="route" className="py-16 md:py-24 px-6 bg-[#FAFAF8]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-center text-[#1a1a2e] mb-4">
              The Route
            </h2>
            <p className="text-center text-gray-600 max-w-xl mx-auto mb-8">
              Click any pub card to see full details, times, and our review.
            </p>

            {/* Timeline grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pubs.map((pub, index) => (
                <div
                  key={pub.id}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className={`transition-all duration-500 ${
                    visibleCards.has(index)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                >
                  <PubCard pub={pub} onClick={() => setSelectedPub(pub)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logistics */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-center text-[#1a1a2e] mb-12">
              Before You Go
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: '🚶',
                  title: 'Getting Around',
                  text: 'Mix of walking, cycling (we recommend Lime bikes), and one tube journey. Total walking: ~6 miles.',
                },
                {
                  icon: '⏰',
                  title: 'Timing',
                  text: 'Start at 11am sharp. The schedule is tight but achievable. Stick to halves early on to bank time.',
                },
                {
                  icon: '💰',
                  title: 'Budget',
                  text: `Expect to spend around £${totalPrice.toFixed(0)} on drinks following our recommended quantities.`,
                },
              ].map((card) => (
                <div key={card.title} className="bg-white rounded-xl p-8 text-center shadow-md hover:-translate-y-1 transition-transform">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl mx-auto mb-5">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-3">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-black uppercase tracking-tight text-center mb-8">Survival Tips</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: '🍔', title: 'Eat!', text: 'Grab food around pub 8-10. Tesco meal deals are your friend.' },
                  { icon: '💧', title: 'Hydrate', text: 'Water between pubs. Trust us on this one.' },
                  { icon: '👟', title: 'Comfortable Shoes', text: 'You\'ll be on your feet for 12 hours. Dress accordingly.' },
                  { icon: '📱', title: 'Charge Up', text: 'Full battery at the start. Bring a power bank if you can.' },
                  { icon: '👥', title: 'Stick Together', text: 'Assign a leader. Keep count of your group at each pub.' },
                  { icon: '🎯', title: 'Pace Yourself', text: 'It\'s a marathon, not a sprint. The light blues are key.' },
                ].map((tip) => (
                  <div key={tip.title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                      {tip.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{tip.title}</h4>
                      <p className="text-gray-600 text-sm">{tip.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1a1a2e] text-white py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <div className="font-black text-xl uppercase tracking-wide">
                Monopoly Pub Crawl
              </div>
              <nav className="flex gap-6">
                <a href="/" className="text-white/60 hover:text-white transition-colors text-sm">Home</a>
                <a href="/#crawls" className="text-white/60 hover:text-white transition-colors text-sm">All Crawls</a>
                <a href="#route" className="text-white/60 hover:text-white transition-colors text-sm">Route</a>
              </nav>
            </div>
            <hr className="border-white/10 mb-6" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
              <p>&copy; {new Date().getFullYear()} London Pub Crawls. All rights reserved.</p>
              <p className="text-xs italic">
                MONOPOLY is a trademark of Hasbro. This site is not affiliated with or endorsed by Hasbro.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Modal */}
      {selectedPub && (
        <PubModal pub={selectedPub} onClose={() => setSelectedPub(null)} />
      )}
    </>
  );
}
