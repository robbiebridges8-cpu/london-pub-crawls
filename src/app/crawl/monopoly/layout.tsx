import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monopoly Pub Crawl London | 26 Pubs, 26 Properties | London Pub Crawls',
  description:
    'The legendary London Monopoly Pub Crawl: visit 26 pubs mapped to every property on the Monopoly board. From Old Kent Road to Mayfair. Complete route, reviews, and tips for the ultimate London pub crawl challenge.',
  keywords:
    'monopoly pub crawl, monopoly pub crawl london, london monopoly pub crawl, 26 pubs london, monopoly board pub crawl, old kent road pub, mayfair pub crawl, best pub crawl london',
  authors: [{ name: 'London Pub Crawls' }],
  openGraph: {
    title: 'Monopoly Pub Crawl London | 26 Pubs, 26 Properties',
    description:
      'Complete the legendary Monopoly board, drink by drink. 26 pubs mapped to every property. From Old Kent Road to Mayfair.',
    url: 'https://londonpubcrawls.com/crawl/monopoly',
    siteName: 'London Pub Crawls',
    locale: 'en_GB',
    type: 'article',
    images: [
      {
        url: 'https://londonpubcrawls.com/og/monopoly.jpg',
        width: 1200,
        height: 630,
        alt: 'Monopoly Pub Crawl - 26 Pubs, 26 Properties',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monopoly Pub Crawl London | 26 Pubs, 26 Properties',
    description:
      'Complete the legendary Monopoly board, drink by drink. The ultimate London pub crawl.',
    images: ['https://londonpubcrawls.com/og/monopoly.jpg'],
  },
  alternates: {
    canonical: 'https://londonpubcrawls.com/crawl/monopoly',
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

export default function MonopolyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
