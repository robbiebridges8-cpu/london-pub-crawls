import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "London Pub Crawls | Drink Your Way Through History",
  description: "Discover London's greatest themed pub crawls. Curated routes through history, music, crime, and culture. From the Monopoly Pub Crawl to Jack the Ripper, find your perfect pub adventure.",
  keywords: "london pub crawl, pub crawl london, monopoly pub crawl, jack the ripper pub crawl, beatles london pubs, circle line pub crawl, best pub crawls london",
  authors: [{ name: "London Pub Crawls" }],
  openGraph: {
    title: "London Pub Crawls | Drink Your Way Through History",
    description: "Discover London's greatest themed pub crawls. Curated routes through history, music, crime, and culture.",
    url: "https://londonpubcrawls.com",
    siteName: "London Pub Crawls",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "London Pub Crawls | Drink Your Way Through History",
    description: "Discover London's greatest themed pub crawls. Curated routes through history, music, crime, and culture.",
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
        {/* Leaflet CSS for maps */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans antialiased bg-[#0D1117] text-[#F5F0E8]`}
      >
        {children}
      </body>
    </html>
  );
}
