'use client';

import { notFound } from 'next/navigation';
import { getCrawlBySlug } from '@/content/crawls';
import CrawlPageLayout from '@/components/CrawlPageLayout';
import { crawlConfigs } from './crawlConfig';

export default function CrawlPageContent({ slug }: { slug: string }) {
  const crawl = getCrawlBySlug(slug);

  if (!crawl || !crawl.live) {
    notFound();
  }

  const config = crawlConfigs[slug];

  if (!config) {
    notFound();
  }

  const { ScrollMap } = config;

  return (
    <CrawlPageLayout
      crawl={crawl}
      pubCount={config.pubCount}
      pubs={config.pubs}
      theme={config.theme}
      stopsLabel={config.stopsLabel}
      beforeMap={config.beforeMap}
      afterMap={config.afterMap}
      printPubs={config.printPubs}
      routeSegments={config.routeSegments}
      isWalking={config.isWalking}
      createMarker={config.createMarker}
    >
      <ScrollMap />
    </CrawlPageLayout>
  );
}
