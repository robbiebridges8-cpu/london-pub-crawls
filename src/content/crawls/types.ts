/**
 * Base pub interface that all crawl-specific pub types extend.
 * Contains only the fields that every pub across every crawl must have.
 */
export interface BasePub {
  /** Unique numeric ID, sequential from 1. Used as map marker label and list order. */
  id: number;

  /** Pub name exactly as displayed */
  pubName: string;

  /** Street address (no postcode) */
  address: string;

  /** UK postcode */
  postcode: string;

  /** Latitude — WGS84 decimal degrees */
  lat: number;

  /** Longitude — WGS84 decimal degrees */
  lng: number;

  /** Editorial review/description — crawl-specific, written for this crawl's theme */
  review: string;

  /** Pub website URL (optional) */
  website?: string;

  /** Image filename in /public/pubs/{slug}/ (optional) */
  image?: string;

  /** Google Place ID for future enrichment (optional) */
  googlePlaceId?: string;
}
