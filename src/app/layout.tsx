import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
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
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#0f0f0f] text-[#F5F0E8]`}
      >
        {children}
      </body>
    </html>
  );
}
