import type { Metadata } from "next";
import { Playfair_Display, Barlow_Condensed, Barlow, Spectral } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal", "italic"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["700"],
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  variable: "--font-card",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: {
    default: "London Crawling | Free Self-Guided Pub Crawls",
    template: "%s | London Crawling",
  },
  description: "Free, self-guided pub crawls through London's best drinking spots. Curated routes, interactive maps, no booking required.",
  keywords: "london pub crawl, pub crawl london, monopoly pub crawl, circle line challenge, best pub crawls london, free pub crawl, self-guided pub crawl",
  authors: [{ name: "London Crawling" }],
  metadataBase: new URL("https://londoncrawling.com"),
  openGraph: {
    title: "London Crawling | Free Self-Guided Pub Crawls",
    description: "Free, self-guided pub crawls through London's best drinking spots. Curated routes, interactive maps, no booking required.",
    url: "https://londoncrawling.com",
    siteName: "London Crawling",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "London Crawling | Free Self-Guided Pub Crawls",
    description: "Free, self-guided pub crawls through London's best drinking spots.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
              name: "London Crawling",
              url: "https://londoncrawling.com",
              description: "Free, self-guided pub crawls through London's best drinking spots.",
              publisher: {
                "@type": "Organization",
                name: "London Crawling",
                url: "https://londoncrawling.com",
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
