import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { crawls, getCrawlBySlug } from '@/content/crawls';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';
import CrawlPageContent from './CrawlPageContent';

export function generateStaticParams() {
  return crawls
    .filter((c) => c.live)
    .map((c) => ({ slug: c.slug }));
}

interface CrawlPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CrawlPageProps): Promise<Metadata> {
  const { slug } = await params;
  const crawl = getCrawlBySlug(slug);

  if (!crawl || !crawl.live) {
    return { title: 'Not Found' };
  }

  const title = `${crawl.name} Pub Crawl`;
  const description =
    crawl.editorialDescription?.slice(0, 155) ||
    crawl.description.slice(0, 155);
  const url = `${SITE_URL}/${crawl.slug}`;

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
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function CrawlPage({ params }: CrawlPageProps) {
  const { slug } = await params;
  const crawl = getCrawlBySlug(slug);

  if (!crawl || !crawl.live) {
    notFound();
  }

  return <CrawlPageContent slug={slug} />;
}
