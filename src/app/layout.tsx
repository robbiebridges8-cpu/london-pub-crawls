import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Barlow_Condensed, Barlow, Spectral } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-68GCKCY9XS";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal", "italic"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  variable: "--font-card",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "London on Tap | Free Self-Guided Pub Crawls",
    template: "%s | London on Tap",
  },
  description: "Free, self-guided pub crawls through London's best drinking spots. Curated routes, interactive maps, no booking required.",
  keywords: "london pub crawl, pub crawl london, monopoly pub crawl, circle line challenge, best pub crawls london, free pub crawl, self-guided pub crawl",
  authors: [{ name: "London on Tap" }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "London on Tap | Free Self-Guided Pub Crawls",
    description: "Free, self-guided pub crawls through London's best drinking spots. Curated routes, interactive maps, no booking required.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "London on Tap | Free Self-Guided Pub Crawls",
    description: "Free, self-guided pub crawls through London's best drinking spots.",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-GB': SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <head>
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        {/* Schema.org WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
              description: "Free, self-guided pub crawls through London's best drinking spots.",
              publisher: {
                "@type": "Organization",
                name: SITE_NAME,
                url: SITE_URL,
              },
            }),
          }}
        />
      </head>
      <body className={`${playfairDisplay.variable} ${barlowCondensed.variable} ${barlow.variable} ${spectral.variable} font-body antialiased`}>
        <Providers>
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-claret focus:text-white focus:rounded"
          >
            Skip to content
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
