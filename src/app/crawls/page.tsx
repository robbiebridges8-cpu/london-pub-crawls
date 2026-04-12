import type { Metadata } from 'next';
import { crawls } from '@/content/crawls';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';
import { SiteNav, SiteFooter, CrawlCard } from '@/components';

export const metadata: Metadata = {
  title: 'All Pub Crawls in London',
  description: 'Browse all London on Tap pub crawls — Monopoly, Circle Line, Bermondsey Beer Mile, and more. Free, self-guided routes with maps and pub-by-pub descriptions.',
  openGraph: {
    title: `All Pub Crawls in London | ${SITE_NAME}`,
    description: 'Browse all London on Tap pub crawls — Monopoly, Circle Line, Bermondsey Beer Mile, and more. Free, self-guided routes with maps.',
    url: `${SITE_URL}/crawls`,
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/crawls` },
};

const CRAWL_ORDER = [
  'monopoly',
  'circle-line',
  'bermondsey-beer-mile',
  'jack-the-ripper',
  'south-bank',
  'beatles',
  'criminal-london',
  'historic-london',
  'literary-london',
];

export default function CrawlsPage() {
  const liveCrawls = crawls.filter((c) => c.live);
  const displayCrawls = CRAWL_ORDER
    .map((slug) => liveCrawls.find((c) => c.slug === slug))
    .filter((c): c is typeof liveCrawls[number] => !!c);

  return (
    <>
      <SiteNav />

      <main id="main-content" className="pt-24 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)]">
              The Crawls
            </h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[var(--ink)]">
            {displayCrawls.map((crawl) => (
              <CrawlCard key={crawl.id} crawl={crawl} />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
