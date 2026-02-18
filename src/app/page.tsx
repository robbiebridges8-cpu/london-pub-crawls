'use client';

import { crawls, Crawl } from '@/content/crawls';
import { useEffect, useRef } from 'react';

function CrawlCard({ crawl, index }: { crawl: Crawl; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isComingSoon = !crawl.live;

  return (
    <div
      ref={cardRef}
      className="opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <a
        href={crawl.live ? `/crawl/${crawl.slug}` : undefined}
        className={`group block relative overflow-hidden rounded-lg bg-white border transition-all duration-300 ${
          crawl.live
            ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg border-[#E2DED6] hover:border-[#C9A227]'
            : 'cursor-default border-[#E2DED6] opacity-75'
        }`}
        onClick={(e) => !crawl.live && e.preventDefault()}
      >
        {/* Color accent bar at top */}
        <div
          className="h-2 w-full"
          style={{ backgroundColor: crawl.accentColor }}
        />

        {/* Card content */}
        <div className="p-6">
          {/* Top row: area badge */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full"
              style={{
                backgroundColor: `${crawl.accentColor}15`,
                color: crawl.accentColor,
              }}
            >
              {crawl.area}
            </span>
            {isComingSoon ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-[#F5F2ED] text-[#4A5568] text-xs font-semibold uppercase tracking-wider rounded-full">
                Coming Soon
              </span>
            ) : (
              <span className="px-3 py-1 bg-[#1B4D3E] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                Live
              </span>
            )}
          </div>

          {/* Crawl name */}
          <h3 className="font-serif text-xl font-bold text-[#1C2632] mb-2 group-hover:text-[#722F37] transition-colors">
            {crawl.name}
          </h3>

          {/* Tagline */}
          <p className={`text-sm leading-relaxed mb-4 ${isComingSoon ? 'text-[#4A5568]/60' : 'text-[#4A5568]'}`}>
            {crawl.tagline}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-xs text-[#4A5568] pt-4 border-t border-[#E8E4DD]">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#1C3D5A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {crawl.pubs.length} pubs
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#1C3D5A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {crawl.duration}
            </span>
            <span
              className="ml-auto px-2 py-0.5 rounded text-xs font-semibold"
              style={{
                backgroundColor: `${crawl.accentColor}12`,
                color: isComingSoon ? '#4A5568' : crawl.accentColor,
              }}
            >
              {crawl.difficulty}
            </span>
          </div>

          {/* Hover arrow */}
          {crawl.live && (
            <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <span className="flex items-center gap-1 text-[#722F37] text-sm font-semibold">
                Explore
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

export default function Home() {
  const liveCrawl = crawls.find((c) => c.slug === 'monopoly');
  const totalPubs = crawls.reduce((acc, c) => acc + c.pubs.length, 0);
  const liveCrawls = crawls.filter((c) => c.live);

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'London Pub Crawls',
            description: "Curated pub crawl routes through London's history, music, crime, and culture.",
            url: 'https://londonpubcrawls.com',
          }),
        }}
      />

      {/* Subtle paper texture */}
      <div className="paper-texture">
        <div className="min-h-screen bg-[#FAF8F5]">
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E8E4DD]">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              <a href="/" className="font-serif text-xl font-bold text-[#1C2632]">
                London Pub Crawls
              </a>
              <div className="hidden md:flex items-center gap-8">
                <a href="#crawls" className="text-sm text-[#4A5568] hover:text-[#722F37] transition-colors">
                  Crawls
                </a>
                <a href="#how-it-works" className="text-sm text-[#4A5568] hover:text-[#722F37] transition-colors">
                  How It Works
                </a>
                <a href="#about" className="text-sm text-[#4A5568] hover:text-[#722F37] transition-colors">
                  About
                </a>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Decorative background */}
            <div className="absolute inset-0">
              {/* Warm gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2ED] via-[#FAF8F5] to-[#FAF8F5]" />

              {/* Decorative shapes */}
              <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-[#722F37]/5 blur-3xl" />
              <div className="absolute top-40 right-[15%] w-48 h-48 rounded-full bg-[#1C3D5A]/5 blur-3xl" />
              <div className="absolute bottom-32 left-[20%] w-56 h-56 rounded-full bg-[#1B4D3E]/5 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E4DD] rounded-full mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#1B4D3E] animate-pulse" />
                <span className="text-sm text-[#4A5568] font-medium">
                  {liveCrawls.length} crawls live now
                </span>
              </div>

              {/* Main headline */}
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#1C2632] mb-6 leading-[1.1] tracking-tight">
                Discover London,
                <br />
                <span className="text-[#722F37]">One Pub at a Time</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-[#4A5568] max-w-2xl mx-auto mb-10 leading-relaxed">
                Curated pub crawl routes through London&apos;s history, music, crime, and culture.
                Free, self-guided, and locally researched.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <a
                  href="#crawls"
                  className="px-8 py-4 bg-[#722F37] text-white font-semibold rounded-lg hover:bg-[#5C262D] transition-all duration-200 inline-flex items-center gap-2"
                >
                  Explore the Crawls
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <a
                  href="/crawl/monopoly"
                  className="px-8 py-4 bg-white text-[#1C2632] font-semibold rounded-lg border-2 border-[#1C2632] hover:bg-[#1C2632] hover:text-white transition-all duration-200"
                >
                  Start with Monopoly
                </a>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 md:gap-16">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#1C2632]">12</div>
                  <div className="text-sm text-[#4A5568] uppercase tracking-wider">Crawls</div>
                </div>
                <div className="w-px h-12 bg-[#E8E4DD]" />
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#1C2632]">{totalPubs}+</div>
                  <div className="text-sm text-[#4A5568] uppercase tracking-wider">Pubs</div>
                </div>
                <div className="w-px h-12 bg-[#E8E4DD]" />
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#1B4D3E]">Free</div>
                  <div className="text-sm text-[#4A5568] uppercase tracking-wider">Always</div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4A5568]">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-[#4A5568] to-transparent" />
            </div>
          </header>

          {/* Featured Crawl Banner */}
          {liveCrawl && (
            <section className="py-16 px-6 bg-[#1C2632]">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#C9A227] text-[#1C2632] text-xs font-bold uppercase tracking-wider rounded mb-4">
                      Featured
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                      The Monopoly Pub Crawl
                    </h2>
                    <p className="text-white/70 max-w-lg">
                      26 pubs. Every property on the board. From Old Kent Road to Mayfair.
                      The legendary London challenge.
                    </p>
                  </div>
                  <a
                    href="/crawl/monopoly"
                    className="flex-shrink-0 px-8 py-4 bg-[#D32F2F] text-white font-bold rounded-lg hover:bg-[#B71C1C] transition-colors inline-flex items-center gap-2"
                  >
                    Start the Crawl
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* Crawl Directory Grid */}
          <section id="crawls" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C2632] mb-4">
                  Choose Your Adventure
                </h2>
                <p className="text-[#4A5568] max-w-xl mx-auto">
                  From Victorian crime scenes to rock &apos;n&apos; roll history —
                  every crawl tells a different London story.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crawls.map((crawl, index) => (
                  <CrawlCard key={crawl.id} crawl={crawl} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="py-24 px-6 bg-[#F5F2ED]">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C2632] mb-4">
                  How It Works
                </h2>
                <p className="text-[#4A5568]">Three simple steps to your perfect pub crawl.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    num: '01',
                    title: 'Pick a Crawl',
                    description: 'Choose from 12 themed routes, each with its own story and character.',
                    icon: (
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    ),
                  },
                  {
                    num: '02',
                    title: 'Follow the Route',
                    description: 'Use our maps and guides on your phone. Pub by pub, at your own pace.',
                    icon: (
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    ),
                  },
                  {
                    num: '03',
                    title: 'Enjoy the Journey',
                    description: 'History, atmosphere, and very good beer. That\'s what we\'re about.',
                    icon: (
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    ),
                  },
                ].map((step) => (
                  <div key={step.num} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white border-2 border-[#1C3D5A] flex items-center justify-center text-[#1C3D5A]">
                      {step.icon}
                    </div>
                    <div className="text-xs text-[#722F37] font-bold tracking-widest mb-2">{step.num}</div>
                    <h3 className="text-lg font-bold text-[#1C2632] mb-3">{step.title}</h3>
                    <p className="text-[#4A5568] text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What You Get */}
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C2632] mb-4">
                  Every Crawl Includes
                </h2>
                <p className="text-[#4A5568]">We walked them so you don&apos;t have to plan them.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: '🗺️',
                    title: 'Interactive Map',
                    description: 'Every pub plotted with directions between stops.',
                  },
                  {
                    icon: '🍺',
                    title: 'Pub-by-Pub Guide',
                    description: 'History, recommendations, and what to order.',
                  },
                  {
                    icon: '📍',
                    title: 'Walking Directions',
                    description: 'Start station, total distance, estimated time.',
                  },
                  {
                    icon: '✍️',
                    title: 'Locally Researched',
                    description: 'Not scraped — actually visited and written up.',
                  },
                  {
                    icon: '📱',
                    title: 'Mobile First',
                    description: 'Designed for your phone, mid-crawl, in bad lighting.',
                  },
                  {
                    icon: '💰',
                    title: 'Completely Free',
                    description: 'No signup, no paywall, no catch. Just pubs.',
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="p-6 rounded-lg bg-white border border-[#E8E4DD] hover:border-[#C9A227] transition-colors"
                  >
                    <div className="text-3xl mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-[#1C2632] mb-2">{feature.title}</h3>
                    <p className="text-[#4A5568] text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 px-6 bg-[#F5F2ED]">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1C2632] mb-6">
                About London Pub Crawls
              </h2>
              <p className="text-[#4A5568] text-lg leading-relaxed mb-6">
                We believe the best way to know London is through its pubs. These aren&apos;t just
                places to drink — they&apos;re living museums, neighbourhood landmarks, and the
                settings for centuries of stories.
              </p>
              <p className="text-[#4A5568] text-lg leading-relaxed mb-8">
                Every crawl on this site has been walked, researched, and written up by people
                who actually love London pubs. No AI-generated lists, no affiliate links, no
                sponsored content. Just honest recommendations for people who want to explore.
              </p>
              <div className="inline-flex items-center gap-3 text-[#722F37] font-medium">
                <span>Made in London</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
                <span>Researched on foot</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]" />
                <span>Written with a pint in hand</span>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="py-24 px-6">
            <div className="max-w-xl mx-auto">
              <div className="p-8 rounded-xl bg-white border-2 border-[#1C2632] text-center">
                <h2 className="font-serif text-2xl font-bold text-[#1C2632] mb-2">
                  New crawls. Insider tips. No spam.
                </h2>
                <p className="text-[#4A5568] text-sm mb-6">
                  Be the first to know when new crawls drop.
                </p>
                <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 bg-[#FAF8F5] border border-[#E8E4DD] rounded-lg text-[#1C2632] placeholder:text-[#4A5568]/50 focus:outline-none focus:border-[#1C3D5A] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1C3D5A] text-white font-semibold rounded-lg hover:bg-[#152D45] transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-16 px-6 border-t border-[#E8E4DD]">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-12 mb-12">
                {/* Logo & tagline */}
                <div className="md:col-span-1">
                  <div className="font-serif text-xl font-bold text-[#1C2632] mb-3">
                    London Pub Crawls
                  </div>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    Curated routes through London&apos;s finest pubs since 2024.
                  </p>
                </div>

                {/* Crawls column */}
                <div>
                  <h4 className="font-semibold text-[#1C2632] mb-4 text-sm uppercase tracking-wider">Live Crawls</h4>
                  <ul className="space-y-2">
                    {crawls.filter(c => c.live).map((crawl) => (
                      <li key={crawl.id}>
                        <a
                          href={`/crawl/${crawl.slug}`}
                          className="text-sm text-[#4A5568] hover:text-[#722F37] transition-colors"
                        >
                          {crawl.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coming Soon */}
                <div>
                  <h4 className="font-semibold text-[#1C2632] mb-4 text-sm uppercase tracking-wider">Coming Soon</h4>
                  <ul className="space-y-2">
                    {crawls.filter(c => !c.live).slice(0, 5).map((crawl) => (
                      <li key={crawl.id}>
                        <span className="text-sm text-[#4A5568]/60">
                          {crawl.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div>
                  <h4 className="font-semibold text-[#1C2632] mb-4 text-sm uppercase tracking-wider">Links</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="#about" className="text-sm text-[#4A5568] hover:text-[#722F37] transition-colors">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="mailto:hello@londonpubcrawls.com" className="text-sm text-[#4A5568] hover:text-[#722F37] transition-colors">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="#crawls" className="text-sm text-[#4A5568] hover:text-[#722F37] transition-colors">
                        All Crawls
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="pt-8 border-t border-[#E8E4DD] flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#4A5568]">
                  &copy; {new Date().getFullYear()} London Pub Crawls. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                  <a href="https://instagram.com" className="text-[#4A5568] hover:text-[#722F37] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="https://twitter.com" className="text-[#4A5568] hover:text-[#722F37] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
