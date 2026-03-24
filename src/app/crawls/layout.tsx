import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Pub Crawls',
  description:
    'Browse all free, self-guided pub crawls across London. Filter by difficulty, sort by number of pubs, and find your next adventure.',
  alternates: {
    canonical: '/crawls',
  },
  openGraph: {
    title: 'All Pub Crawls | London on Tap',
    description:
      'Browse all free, self-guided pub crawls across London. Filter by difficulty, sort by number of pubs, and find your next adventure.',
  },
};

export default function CrawlsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
