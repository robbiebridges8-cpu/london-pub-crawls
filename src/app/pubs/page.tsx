import type { Metadata } from 'next';
import { getAllPubs } from '@/lib/pubs';
import { crawls } from '@/content/crawls';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PubDirectoryClient from './PubDirectoryClient';

const title = 'Every Pub, Every Crawl — Pub Directory';
const description = `Browse all ${getAllPubs().length} pubs across every London on Tap crawl. Search, filter by crawl, and explore the map.`;
const url = `${SITE_URL}/pubs`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${title} | ${SITE_NAME}`,
    description,
  },
  alternates: { canonical: url },
};

function ItemListJsonLd() {
  const pubs = getAllPubs();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'London on Tap Pub Directory',
    description: `All ${pubs.length} pubs across every London on Tap pub crawl.`,
    numberOfItems: pubs.length,
    itemListElement: pubs.map((pub, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Place',
        name: pub.name,
        url: `${SITE_URL}/pubs/${pub.slug}`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function PubDirectoryPage() {
  const pubs = getAllPubs();
  const liveCrawls = crawls
    .filter(c => c.live)
    .map(c => ({ slug: c.slug, name: c.name }));

  return (
    <>
      <ItemListJsonLd />
      <SiteNav />

      {/* Hero */}
      <header className="bg-[var(--claret)] pt-24 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-white/60 mb-3">
            Pub Directory
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            Every pub across every crawl
          </h1>
          <p className="font-body text-lg text-white/80 mb-6">
            {pubs.length} pubs. {liveCrawls.length} crawls. One city.
          </p>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 font-label text-xs uppercase tracking-wider text-white">
            {pubs.length} pubs
          </span>
        </div>
      </header>

      <PubDirectoryClient pubs={pubs} crawlNames={liveCrawls} />

      <SiteFooter />
    </>
  );
}
