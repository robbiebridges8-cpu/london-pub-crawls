import type { MetadataRoute } from 'next';
import { crawls } from '@/content/crawls';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://londonontap.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const liveCrawls = crawls.filter((c) => c.live);

  const crawlPages: MetadataRoute.Sitemap = liveCrawls.map((crawl) => ({
    url: `${SITE_URL}/${crawl.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/crawls`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/build`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...crawlPages,
  ];
}
