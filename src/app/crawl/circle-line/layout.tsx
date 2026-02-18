import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Circle Line Challenge Pub Crawl | 27 Stations, 27 Pubs | London Pub Crawls',
  description:
    'The ultimate London Underground pub crawl: one pub for every Circle Line station. 27 stops, ~14 miles, 10+ hours. Complete route with pub recommendations, walking directions, and tips for attempting London\'s most famous pub crawl challenge.',
  keywords:
    'circle line pub crawl, circle line challenge, london tube pub crawl, underground pub crawl, 27 pubs london, london pub crawl route, circle line pubs, tube challenge london, best pub crawl london',
  authors: [{ name: 'London Pub Crawls' }],
  openGraph: {
    title: 'Circle Line Challenge | 27 Stations. 27 Pubs. One Loop.',
    description:
      'The ultimate London Underground pub crawl. One pub for every Circle Line station. Complete route, pub recommendations, and tips for London\'s most famous challenge.',
    url: 'https://londonpubcrawls.com/crawl/circle-line',
    siteName: 'London Pub Crawls',
    locale: 'en_GB',
    type: 'article',
    images: [
      {
        url: 'https://londonpubcrawls.com/og/circle-line.jpg',
        width: 1200,
        height: 630,
        alt: 'Circle Line Challenge - 27 Stations, 27 Pubs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Circle Line Challenge | 27 Stations. 27 Pubs. One Loop.',
    description:
      'The ultimate London Underground pub crawl. One pub for every Circle Line station. Are you up for the challenge?',
    images: ['https://londonpubcrawls.com/og/circle-line.jpg'],
  },
  alternates: {
    canonical: 'https://londonpubcrawls.com/crawl/circle-line',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  other: {
    'geo.region': 'GB-LND',
    'geo.placename': 'London',
  },
};

export default function CircleLineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
