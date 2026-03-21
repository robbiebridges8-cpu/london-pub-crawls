import { notFound } from 'next/navigation';
import { crawls, getCrawlBySlug } from '@/content/crawls';
import CrawlPageContent from './CrawlPageContent';

export function generateStaticParams() {
  return crawls
    .filter((c) => c.live)
    .map((c) => ({ slug: c.slug }));
}

interface CrawlPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CrawlPage({ params }: CrawlPageProps) {
  const { slug } = await params;
  const crawl = getCrawlBySlug(slug);

  if (!crawl || !crawl.live) {
    notFound();
  }

  return <CrawlPageContent slug={slug} />;
}
