import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPubs, getPubBySlug, AggregatedPub } from '@/lib/pubs';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PubMapSection from '@/components/PubMapSection';

export function generateStaticParams() {
  return getAllPubs().map(p => ({ slug: p.slug }));
}

interface PubPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pub = getPubBySlug(slug);

  if (!pub) return { title: 'Not Found' };

  const crawlNames = pub.crawls.map(c => c.crawlName).join(', ');
  const title = `${pub.name} — London Pub`;
  const description = `${pub.name} at ${pub.address}, ${pub.postcode}. Featured on ${crawlNames}. Part of the London on Tap pub directory.`;
  const url = `${SITE_URL}/pubs/${pub.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    alternates: { canonical: url },
  };
}

function PlaceJsonLd({ pub }: { pub: AggregatedPub }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Place', 'BarOrPub'],
    name: pub.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: pub.address,
      postalCode: pub.postcode,
      addressLocality: 'London',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: pub.coordinates.lat,
      longitude: pub.coordinates.lng,
    },
    containedInPlace: pub.crawls.map(c => ({
      '@type': 'TouristAttraction',
      name: `${c.crawlName} Pub Crawl`,
      url: `${SITE_URL}/${c.crawlSlug}`,
    })),
    url: `${SITE_URL}/pubs/${pub.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function getMorePubs(currentSlug: string, count: number): AggregatedPub[] {
  const all = getAllPubs().filter(p => p.slug !== currentSlug);
  // Deterministic shuffle based on slug to avoid hydration mismatches
  const hash = currentSlug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffled = [...all].sort((a, b) => {
    const ha = (a.slug.charCodeAt(0) * 31 + hash) % 1000;
    const hb = (b.slug.charCodeAt(0) * 31 + hash) % 1000;
    return ha - hb;
  });
  return shuffled.slice(0, count);
}

export default async function PubPage({ params }: PubPageProps) {
  const { slug } = await params;
  const pub = getPubBySlug(slug);

  if (!pub) notFound();

  const morePubs = getMorePubs(pub.slug, 3);

  return (
    <>
      <PlaceJsonLd pub={pub} />
      <SiteNav />

      {/* Hero */}
      <header className="bg-[var(--claret)] pt-24 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-white/60 mb-3">
            Pub Directory
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            {pub.name}
          </h1>
          <p className="font-body text-lg text-white/80 mb-6">
            {pub.address}, {pub.postcode}
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 font-label text-xs uppercase tracking-wider text-white">
              Featured on {pub.crawls.length} {pub.crawls.length === 1 ? 'crawl' : 'crawls'}
            </span>
            {pub.website && (
              <a
                href={pub.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 font-label text-xs uppercase tracking-wider text-white hover:bg-white/25 transition-colors"
              >
                Visit Website ↗
              </a>
            )}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pub.name}, ${pub.address}, ${pub.postcode}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 font-label text-xs uppercase tracking-wider text-white hover:bg-white/25 transition-colors"
            >
              Open in Maps ↗
            </a>
          </div>
        </div>
      </header>

      {/* Map */}
      <section className="bg-[var(--background)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-[300px] md:h-[400px]">
            <PubMapSection lat={pub.coordinates.lat} lng={pub.coordinates.lng} name={pub.name} />
          </div>
        </div>
      </section>

      {/* Featured On */}
      <section className="bg-[var(--background)] py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-3">
            Featured On
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-8">
            {pub.crawls.length === 1 ? 'Part of one crawl' : `Appears on ${pub.crawls.length} crawls`}
          </h2>

          <div className="space-y-6">
            {pub.crawls.map((crawl) => (
              <article
                key={crawl.crawlSlug}
                className="bg-[var(--surface)] rounded-lg p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <Link
                      href={`/${crawl.crawlSlug}`}
                      className="font-display text-xl font-bold text-[var(--claret)] hover:text-[var(--claret-dark)] transition-colors"
                    >
                      {crawl.crawlName} Pub Crawl
                    </Link>
                    <p className="font-label text-xs uppercase tracking-wider text-[var(--muted)] mt-1">
                      Stop {crawl.positionOnCrawl} of {crawl.totalOnCrawl}
                    </p>
                  </div>
                  <Link
                    href={`/${crawl.crawlSlug}`}
                    className="shrink-0 inline-flex items-center px-4 py-2 rounded bg-[var(--claret)] text-white font-label text-xs uppercase tracking-wider hover:bg-[var(--claret-dark)] transition-colors"
                  >
                    View Crawl
                  </Link>
                </div>
                <p className="font-card text-[var(--ink)] leading-relaxed">
                  {crawl.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* More Pubs */}
      <section className="bg-[var(--surface)] py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-3">
            Discover More
          </p>
          <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-8">
            More Pubs
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {morePubs.map((p) => (
              <Link
                key={p.slug}
                href={`/pubs/${p.slug}`}
                className="bg-[var(--background)] rounded-lg p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-2">
                  {p.name}
                </h3>
                <p className="font-body text-sm text-[var(--muted)] mb-3">
                  {p.address}, {p.postcode}
                </p>
                <div className="flex flex-wrap gap-1">
                  {p.crawls.map((c) => (
                    <span
                      key={c.crawlSlug}
                      className="inline-block px-2 py-0.5 rounded-full bg-[var(--claret)] text-white font-label text-[10px] uppercase tracking-wider"
                    >
                      {c.crawlName}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
