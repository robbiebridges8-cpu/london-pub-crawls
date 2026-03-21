/**
 * Pub Directory — single entry per unique pub across all crawls.
 *
 * Auto-generated from per-crawl data files. If a pub appears in multiple
 * crawls, it has one entry here with all crawl slugs listed.
 *
 * To regenerate: run `npx tsx scripts/generate-pub-directory.ts`
 */

export interface DirectoryPub {
  id: number;
  name: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  crawls: string[];
}

export const pubDirectory: DirectoryPub[] = [
  { id: 1, name: 'Anspach & Hobday', address: 'Arch 118, Druid Street', postcode: 'SE1 2HH', lat: 51.4978, lng: -0.072, crawls: ['bermondsey-beer-mile'] },
  { id: 2, name: 'Bianca Road Brew Co', address: '83 Enid Street', postcode: 'SE16 3RA', lat: 51.4948, lng: -0.064, crawls: ['bermondsey-beer-mile'] },
  { id: 3, name: 'Camden Head', address: '2 Camden Walk', postcode: 'N1 8DY', lat: 51.536, lng: -0.105, crawls: ['monopoly'] },
  { id: 4, name: 'Cloudwater', address: 'Arch 79, Enid Street', postcode: 'SE16 3RA', lat: 51.4955, lng: -0.066, crawls: ['bermondsey-beer-mile'] },
  { id: 5, name: 'Duke of York', address: 'Dering St, New Bond St', postcode: 'W1S 1AF', lat: 51.514, lng: -0.146, crawls: ['monopoly'] },
  { id: 6, name: 'Founders Arms', address: '52 Hopton Street', postcode: 'SE1 9JH', lat: 51.5081, lng: -0.0987, crawls: ['south-bank'] },
  { id: 7, name: 'Gosnells', address: 'Arch 72-73, Enid Street', postcode: 'SE16 3RA', lat: 51.496, lng: -0.067, crawls: ['bermondsey-beer-mile'] },
  { id: 8, name: 'Hamilton Hall', address: 'Liverpool St', postcode: 'EC2M 7PY', lat: 51.5179, lng: -0.0828, crawls: ['monopoly', 'circle-line'] },
  { id: 9, name: 'Hiver Taproom', address: '56 Stanworth Street', postcode: 'SE1 3NY', lat: 51.4983, lng: -0.074, crawls: ['bermondsey-beer-mile'] },
  { id: 10, name: 'Leicester Arms', address: '44 Glasshouse St', postcode: 'W1B 5DP', lat: 51.5108, lng: -0.136, crawls: ['monopoly'] },
  { id: 11, name: 'Lord Nelson', address: '386 Old Kent Rd', postcode: 'SE1 5AA', lat: 51.4842, lng: -0.072, crawls: ['monopoly'] },
  { id: 12, name: 'Shakespeare\'s Head', address: '29 Great Marlborough St', postcode: 'W1F 7HZ', lat: 51.514, lng: -0.1385, crawls: ['monopoly', 'beatles'] },
  { id: 13, name: 'Silver Cross', address: '33 Whitehall', postcode: 'SW1A 2BX', lat: 51.5065, lng: -0.1254, crawls: ['monopoly'] },
  { id: 14, name: 'Southwark Brewing Company', address: '46 Druid Street', postcode: 'SE1 2EZ', lat: 51.5, lng: -0.0785, crawls: ['bermondsey-beer-mile'] },
  { id: 15, name: 'St James\'s Tavern', address: '45 Great Windmill St', postcode: 'W1D 7NE', lat: 51.5112, lng: -0.134, crawls: ['monopoly'] },
  { id: 16, name: 'St Stephen\'s Tavern', address: '10 Bridge Street', postcode: 'SW1A 2JR', lat: 51.5007, lng: -0.1246, crawls: ['circle-line'] },
  { id: 17, name: 'The Admiralty', address: '66 Trafalgar Sq', postcode: 'WC2N 5DS', lat: 51.508, lng: -0.127, crawls: ['monopoly'] },
  { id: 18, name: 'The Albany', address: '240 Great Portland Street', postcode: 'W1W 5QU', lat: 51.5236, lng: -0.1439, crawls: ['circle-line'] },
  { id: 19, name: 'The Alma', address: '41 Spelman Street', postcode: 'E1 5LG', lat: 51.517, lng: -0.066, crawls: ['jack-the-ripper'] },
  { id: 20, name: 'The Anchor Bankside', address: '34 Park Street', postcode: 'SE1 9EF', lat: 51.5073, lng: -0.0921, crawls: ['south-bank'] },
  { id: 21, name: 'The Antelope', address: '22 Eaton Terrace', postcode: 'SW1W 8EZ', lat: 51.4928, lng: -0.1575, crawls: ['circle-line'] },
  { id: 22, name: 'The Audley', address: '41-43 Mount St', postcode: 'W1K 2RX', lat: 51.5098, lng: -0.152, crawls: ['monopoly'] },
  { id: 23, name: 'The Barley Mow', address: '8 Dorset Street', postcode: 'W1U 6QW', lat: 51.5188, lng: -0.1543, crawls: ['beatles'] },
  { id: 24, name: 'The Barrel Project', address: 'Arch 80, Druid Street', postcode: 'SE1 2EZ', lat: 51.4985, lng: -0.0755, crawls: ['bermondsey-beer-mile'] },
  { id: 25, name: 'The Bell', address: '29 Bush Lane', postcode: 'EC4R 0AN', lat: 51.5119, lng: -0.0904, crawls: ['circle-line'] },
  { id: 26, name: 'The Black Friar', address: '174 Queen Victoria Street', postcode: 'EC4V 4EG', lat: 51.5121, lng: -0.1038, crawls: ['south-bank', 'historic-london', 'circle-line'] },
  { id: 27, name: 'The Blind Beggar', address: '337 Whitechapel Road', postcode: 'E1 1BU', lat: 51.521, lng: -0.0594, crawls: ['jack-the-ripper', 'criminal-london'] },
  { id: 28, name: 'The Burlington Arms', address: '21 Old Burlington St', postcode: 'W1S 2JL', lat: 51.5105, lng: -0.1395, crawls: ['monopoly'] },
  { id: 29, name: 'The Butchers Hook & Cleaver', address: '61 West Smithfield', postcode: 'EC1A 9DY', lat: 51.5193, lng: -0.1015, crawls: ['circle-line'] },
  { id: 30, name: 'The Carpenter\'s Arms', address: '73 Cheshire Street', postcode: 'E2 6EG', lat: 51.5232, lng: -0.0631, crawls: ['criminal-london'] },
  { id: 31, name: 'The Cask Pub & Kitchen', address: '6 Charlwood Street', postcode: 'SW1V 2EE', lat: 51.4908, lng: -0.1407, crawls: ['circle-line'] },
  { id: 32, name: 'The Castle', address: 'Pentonville Road', postcode: 'N1 9HF', lat: 51.5318, lng: -0.113, crawls: ['monopoly'] },
  { id: 33, name: 'The Chapel', address: '48 Chapel Street', postcode: 'NW1 5DP', lat: 51.5198, lng: -0.1676, crawls: ['circle-line'] },
  { id: 34, name: 'The Cittie of Yorke', address: '22 High Holborn', postcode: 'WC1V 6BN', lat: 51.5186, lng: -0.112, crawls: ['historic-london'] },
  { id: 35, name: 'The City Barge', address: '27 Strand-on-the-Green', postcode: 'W4 3PH', lat: 51.4872, lng: -0.2678, crawls: ['beatles'] },
  { id: 36, name: 'The Coach House', address: '7 Oxendon St', postcode: 'SW1Y 4EE', lat: 51.5095, lng: -0.131, crawls: ['monopoly'] },
  { id: 37, name: 'The Coronet', address: '338-346 Holloway Road', postcode: 'W11 3HX', lat: 51.5094, lng: -0.1963, crawls: ['circle-line'] },
  { id: 38, name: 'The Counting House', address: '50 Cornhill', postcode: 'EC3V 3PD', lat: 51.5131, lng: -0.0864, crawls: ['circle-line'] },
  { id: 39, name: 'The Culpeper', address: '40 Commercial Street', postcode: 'E1 6LP', lat: 51.5161, lng: -0.0737, crawls: ['jack-the-ripper'] },
  { id: 40, name: 'The Devonshire Arms', address: '7 Duke Street', postcode: 'W1U 3EG', lat: 51.5165, lng: -0.15, crawls: ['beatles'] },
  { id: 41, name: 'The Dog and Duck', address: '18 Bateman Street', postcode: 'W1D 3AJ', lat: 51.5136, lng: -0.131, crawls: ['literary-london'] },
  { id: 42, name: 'The Duchess', address: 'Woodcock St', postcode: 'W1C 2AD', lat: 51.5148, lng: -0.1505, crawls: ['monopoly'] },
  { id: 43, name: 'The Edgar Wallace', address: '40 Essex Street', postcode: 'WC2R 3JE', lat: 51.5118, lng: -0.1124, crawls: ['circle-line'] },
  { id: 44, name: 'The Elephant & Castle', address: '40 Holland Street', postcode: 'W8 4LT', lat: 51.5016, lng: -0.1927, crawls: ['circle-line'] },
  { id: 45, name: 'The Euston Flyer', address: '83-87 Euston Road', postcode: 'NW1 2RA', lat: 51.5256, lng: -0.1349, crawls: ['circle-line'] },
  { id: 46, name: 'The Euston Tap', address: 'Euston Station', postcode: 'NW1 2EF', lat: 51.5282, lng: -0.1337, crawls: ['monopoly'] },
  { id: 47, name: 'The Fitzroy Tavern', address: '16A Charlotte Street', postcode: 'W1T 2LY', lat: 51.5193, lng: -0.1347, crawls: ['literary-london'] },
  { id: 48, name: 'The Flask', address: '77 Highgate West Hill', postcode: 'N6 6BU', lat: 51.5686, lng: -0.148, crawls: ['haunted-london'] },
  { id: 49, name: 'The French House', address: '49 Dean Street', postcode: 'W1D 5BG', lat: 51.5132, lng: -0.1315, crawls: ['literary-london'] },
  { id: 50, name: 'The George Inn', address: '75-77 Borough High Street', postcode: 'SE1 1NH', lat: 51.5046, lng: -0.0897, crawls: ['south-bank', 'historic-london', 'literary-london'] },
  { id: 51, name: 'The Globe', address: '83 Moorgate', postcode: 'EC2M 6SA', lat: 51.5182, lng: -0.0889, crawls: ['circle-line'] },
  { id: 53, name: 'The Grenadier', address: '18 Wilton Row', postcode: 'SW1X 7NR', lat: 51.5021, lng: -0.1538, crawls: ['haunted-london'] },
  { id: 54, name: 'The Hoop & Toy', address: '34 Thurloe Place', postcode: 'SW7 2HQ', lat: 51.4941, lng: -0.1744, crawls: ['circle-line'] },
  { id: 55, name: 'The Hoop and Grapes', address: '47 Aldgate High St', postcode: 'EC3N 1AL', lat: 51.5138, lng: -0.0762, crawls: ['monopoly', 'circle-line'] },
  { id: 56, name: 'The Horse & Groom', address: '7 Groom Place, Belgravia', postcode: 'SW1X 7BA', lat: 51.501, lng: -0.1528, crawls: ['beatles'] },
  { id: 57, name: 'The Hung Drawn and Quartered', address: '26-27 Great Tower Street', postcode: 'EC3R 5AQ', lat: 51.51, lng: -0.0785, crawls: ['circle-line'] },
  { id: 58, name: 'The Jerusalem Tavern', address: '55 Britton Street', postcode: 'EC1M 5UQ', lat: 51.5221, lng: -0.1049, crawls: ['circle-line'] },
  { id: 59, name: 'The Kernel Brewery Taproom', address: '132 Spa Road', postcode: 'SE16 3AE', lat: 51.4953, lng: -0.0629, crawls: ['bermondsey-beer-mile'] },
  { id: 60, name: 'The Lamb', address: '94 Lamb\'s Conduit Street', postcode: 'WC1N 3LZ', lat: 51.5218, lng: -0.1199, crawls: ['literary-london'] },
  { id: 61, name: 'The Lamb and Flag', address: '33 Rose Street', postcode: 'WC2E 9EB', lat: 51.5122, lng: -0.1252, crawls: ['historic-london'] },
  { id: 62, name: 'The Marquess of Anglesey', address: '39 Bow St', postcode: 'WC2E 7AU', lat: 51.513, lng: -0.1222, crawls: ['monopoly'] },
  { id: 63, name: 'The Marylebone', address: '93 Marylebone High St', postcode: 'W1U 4RE', lat: 51.521, lng: -0.152, crawls: ['monopoly'] },
  { id: 64, name: 'The Minories', address: '64-73 Minories', postcode: 'EC3N 1LA', lat: 51.5117, lng: -0.0756, crawls: ['monopoly'] },
  { id: 65, name: 'The Mitre', address: '24 Craven Terrace', postcode: 'W2 3QH', lat: 51.5126, lng: -0.1876, crawls: ['circle-line'] },
  { id: 66, name: 'The Monument', address: '18 Fish Street Hill', postcode: 'EC3R 6DB', lat: 51.51, lng: -0.086, crawls: ['circle-line'] },
  { id: 67, name: 'The Moon Under Water', address: '28 Leicester Square', postcode: 'WC2H 7LE', lat: 51.5113, lng: -0.1302, crawls: ['monopoly'] },
  { id: 68, name: 'The Morpeth Arms', address: '58 Millbank', postcode: 'SW1P 4RW', lat: 51.4911, lng: -0.1266, crawls: ['haunted-london'] },
  { id: 69, name: 'The Mudlark', address: '4 Montague Close', postcode: 'SE1 9DA', lat: 51.5064, lng: -0.0882, crawls: ['south-bank'] },
  { id: 70, name: 'The Old Queen\'s Head', address: '44 Essex Road', postcode: 'N1 8LN', lat: 51.5381, lng: -0.0991, crawls: ['haunted-london'] },
  { id: 71, name: 'The Old Thameside Inn', address: 'Pickfords Wharf, Clink Street', postcode: 'SE1 9DG', lat: 51.507, lng: -0.0912, crawls: ['historic-london'] },
  { id: 72, name: 'The Parcel Yard', address: 'Kings Cross Station', postcode: 'N1C 4AH', lat: 51.532, lng: -0.124, crawls: ['monopoly', 'circle-line'] },
  { id: 73, name: 'The Pillars of Hercules', address: '7 Greek Street', postcode: 'W1D 4DF', lat: 51.5138, lng: -0.131, crawls: ['beatles', 'literary-london'] },
  { id: 74, name: 'The Pride of Spitalfields', address: '3 Heneage Street', postcode: 'E1 5LJ', lat: 51.518, lng: -0.072, crawls: ['jack-the-ripper'] },
  { id: 75, name: 'The Prince of Wales', address: '71 Prince of Wales Road', postcode: 'NW5 3SA', lat: 51.5532, lng: -0.1476, crawls: ['beatles'] },
  { id: 76, name: 'The Prospect of Whitby', address: '57 Wapping Wall', postcode: 'E1W 3SH', lat: 51.5066, lng: -0.0553, crawls: ['south-bank', 'historic-london', 'criminal-london'] },
  { id: 77, name: 'The Red Lion', address: 'Crown Passage', postcode: 'SW1Y 6PP', lat: 51.5068, lng: -0.1379, crawls: ['monopoly'] },
  { id: 78, name: 'The Red Lion', address: '48 Parliament Street', postcode: 'SW1A 2NH', lat: 51.5012, lng: -0.1268, crawls: ['circle-line'] },
  { id: 79, name: 'The Rising Sun', address: '38 Cloth Fair', postcode: 'EC1A 7JQ', lat: 51.5189, lng: -0.0989, crawls: ['haunted-london', 'criminal-london'] },
  { id: 80, name: 'The Spaniards Inn', address: 'Spaniards Road', postcode: 'NW3 7JJ', lat: 51.5718, lng: -0.1672, crawls: ['haunted-london'] },
  { id: 81, name: 'The Star Tavern', address: '6 Belgrave Mews West', postcode: 'SW1X 8HT', lat: 51.5013, lng: -0.1565, crawls: ['beatles'] },
  { id: 82, name: 'The Starman', address: '15 Heddon St', postcode: 'W1B 4BF', lat: 51.5125, lng: -0.1395, crawls: ['monopoly'] },
  { id: 83, name: 'The Stanhope Arms', address: '97 Gloucester Road', postcode: 'SW7 4SS', lat: 51.4943, lng: -0.1828, crawls: ['circle-line'] },
  { id: 84, name: 'The Ten Bells', address: '84 Commercial Street', postcode: 'E1 6LY', lat: 51.5195, lng: -0.0754, crawls: ['jack-the-ripper', 'haunted-london'] },
  { id: 85, name: 'The Town of Ramsgate', address: '62 Wapping High Street', postcode: 'E1W 2PN', lat: 51.5057, lng: -0.056, crawls: ['criminal-london'] },
  { id: 86, name: 'The Viaduct Tavern', address: '126 Newgate Street', postcode: 'EC1A 7AA', lat: 51.5155, lng: -0.1025, crawls: ['haunted-london', 'criminal-london'] },
  { id: 87, name: 'The Victoria', address: '10A Strathearn Place', postcode: 'W2 2NH', lat: 51.5155, lng: -0.1793, crawls: ['circle-line'] },
  { id: 88, name: 'The Volunteer', address: '245 Baker Street', postcode: 'NW1 6XE', lat: 51.5226, lng: -0.1571, crawls: ['circle-line'] },
  { id: 89, name: 'The Wellington', address: '351 Strand', postcode: 'WC2R 0HS', lat: 51.5107, lng: -0.1195, crawls: ['monopoly'] },
  { id: 90, name: 'The Wheatsheaf', address: '25 Rathbone Place', postcode: 'W1T 1JB', lat: 51.5183, lng: -0.1339, crawls: ['literary-london'] },
  { id: 91, name: 'The White Hart', address: '89 Whitechapel High Street', postcode: 'E1 7RA', lat: 51.5152, lng: -0.0712, crawls: ['jack-the-ripper'] },
  { id: 92, name: 'Ye Olde Cheshire Cheese', address: '145 Fleet St', postcode: 'EC4A 2BP', lat: 51.5141, lng: -0.1081, crawls: ['monopoly', 'historic-london', 'literary-london'] },
  { id: 93, name: 'Ye Olde Mitre', address: '1 Ely Court, Ely Place', postcode: 'EC1N 6SJ', lat: 51.5185, lng: -0.1076, crawls: ['historic-london'] },
];

/** Get all pubs featured in a specific crawl */
export function getPubsByCrawl(slug: string): DirectoryPub[] {
  return pubDirectory.filter((p) => p.crawls.includes(slug));
}

/** Get pubs that appear in multiple crawls */
export function getMultiCrawlPubs(): DirectoryPub[] {
  return pubDirectory.filter((p) => p.crawls.length > 1);
}
