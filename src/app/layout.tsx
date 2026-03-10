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
  title: "London Pub Crawls | Free Self-Guided Routes",
  description: "The best pub crawls in London. Curated by locals. Meticulously researched routes through London's best pubs. No apps to download. No tickets to buy.",
  keywords: "london pub crawl, pub crawl london, monopoly pub crawl, circle line challenge, best pub crawls london, free pub crawl",
  authors: [{ name: "London Pub Crawls" }],
  openGraph: {
    title: "London Pub Crawls | Free Self-Guided Routes",
    description: "The best pub crawls in London. Curated by locals. Meticulously researched routes through London's best pubs.",
    url: "https://londonpubcrawls.com",
    siteName: "London Pub Crawls",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "London Pub Crawls | Free Self-Guided Routes",
    description: "The best pub crawls in London. Curated by locals.",
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
