import pubsData from '../../../pubs.json';

export interface Pub {
  id: string;
  name: string;
  address: string;
  neighbourhood: string;
  lat: number;
  lng: number;
  googlePlaceId: string | null;
}

export interface CrawlPub {
  pubId: string;
  description: string;
  historicNotes: string;
}

// Export canonical pub data from JSON
export const pubs: Pub[] = pubsData.pubs;

// Helper to get a pub by ID
export function getPubById(id: string): Pub | undefined {
  return pubs.find(pub => pub.id === id);
}
