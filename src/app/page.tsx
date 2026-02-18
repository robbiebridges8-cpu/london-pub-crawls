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
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <a
        href={crawl.live ? `/crawl/${crawl.slug}` : undefined}
        className={`group block relative overflow-hidden rounded-lg bg-[#1a1a1a] border border-white/5 transition-all duration-500 ${
          crawl.live ? 'cursor-pointer hover:-translate-y-2 hover:border-white/10' : 'cursor-default'
        }`}
        style={{
          boxShadow: crawl.live
            ? `0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px ${crawl.accentColor}10`
            : '0 4px 20px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => !crawl.live && e.preventDefault()}
      >
        {/* Accent gradient background */}
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
          style={{
            background: `radial-gradient(ellipse at top left, ${crawl.accentColor}40 0%, transparent 60%)`,
          }}
        />

        {/* Card content */}
        <div className="relative p-6">
          {/* Top row: badges */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="px-2 py-1 text-xs font-medium uppercase tracking-wider rounded"
              style={{
                backgroundColor: `${crawl.accentColor}20`,
                color: crawl.accentColor,
              }}
            >
              {crawl.area}
            </span>
            {isComingSoon ? (
              <span className="flex items-center gap-1.5 px-2 py-1 bg-white/10 text-white/60 text-xs font-medium uppercase tracking-wider rounded">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Coming Soon
              </span>
            ) : (
              <span
                className="px-2 py-1 text-xs font-bold uppercase tracking-wider rounded"
                style={{
                  backgroundColor: crawl.accentColor,
                  color: '#0f0f0f',
                }}
              >
                Live
              </span>
            )}
          </div>

          {/* Crawl name */}
          <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[#D4A853] transition-colors">
            {crawl.name}
          </h3>

          {/* Tagline */}
          <p className={`text-sm leading-relaxed mb-4 ${isComingSoon ? 'text-white/40' : 'text-white/60'}`}>
            {crawl.tagline}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {crawl.pubs.length} pubs
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {crawl.duration}
            </span>
            <span
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                backgroundColor: `${crawl.accentColor}15`,
                color: isComingSoon ? 'rgba(255,255,255,0.4)' : crawl.accentColor,
              }}
            >
              {crawl.difficulty}
            </span>
          </div>

          {/* Hover arrow */}
          {crawl.live && (
            <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <span className="flex items-center gap-1 text-[#D4A853] text-sm font-medium">
                Start
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div
          className="h-1 w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ backgroundColor: crawl.accentColor }}
        />
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
            description: "London's best pub crawls. Planned, mapped, ready to walk.",
            url: 'https://londonpubcrawls.com',
          }),
        }}
      />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      <div className="min-h-screen bg-[#0f0f0f]">
        {/* Hero Section */}
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Atmospheric background */}
          <div className="absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]" />

            {/* Pub window glow effects */}
            <div className="absolute top-1/3 left-[15%] w-32 h-48 bg-[#D4A853]/20 blur-[80px] rounded-full" />
            <div className="absolute top-1/4 left-[25%] w-24 h-36 bg-[#D4A853]/15 blur-[60px] rounded-full" />
            <div className="absolute top-1/3 right-[20%] w-28 h-40 bg-[#D4A853]/18 blur-[70px] rounded-full" />
            <div className="absolute top-[40%] right-[30%] w-20 h-32 bg-[#D4A853]/12 blur-[50px] rounded-full" />

            {/* Street silhouette shapes */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

            {/* Cobblestone reflection effect */}
            <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4A853]/10 to-transparent" />
            </div>

            {/* Subtle fog/mist */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
            {/* Main headline */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              London&apos;s Best Pub Crawls.
              <br />
              <span className="text-[#D4A853]">Planned, Mapped, Ready to Walk.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              12 themed routes. {totalPubs}+ handpicked pubs. Free, self-guided, and locally researched.
            </p>

            {/* CTA button */}
            <a
              href="#crawls"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4A853] text-[#0f0f0f] font-semibold rounded-lg glow-amber transition-all duration-300 hover:bg-[#E5B964]"
            >
              Explore the Crawls
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            {/* Stats bar */}
            <div className="mt-16 flex items-center justify-center gap-6 md:gap-12 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <span className="text-2xl font-serif font-bold text-white">12</span>
                Crawls
              </span>
              <span className="w-px h-6 bg-white/20" />
              <span className="flex items-center gap-2">
                <span className="text-2xl font-serif font-bold text-white">{totalPubs}+</span>
                Pubs
              </span>
              <span className="w-px h-6 bg-white/20" />
              <span className="flex items-center gap-2">
                <span className="text-2xl font-serif font-bold text-[#D4A853]">100%</span>
                Free
              </span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </header>

        {/* Crawl Directory Grid */}
        <section id="crawls" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                Choose Your Crawl
              </h2>
              <div className="w-24 h-1 bg-[#D4A853]" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crawls.map((crawl, index) => (
                <CrawlCard key={crawl.id} crawl={crawl} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Dead Simple
              </h2>
              <p className="text-white/50">Three steps. That&apos;s it.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  ),
                  title: 'Pick a crawl',
                  description: 'Browse 12 themed routes, from Monopoly to the Ripper.',
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11l2 2-2 2" />
                    </svg>
                  ),
                  title: 'Follow the route',
                  description: 'Interactive maps. Pub by pub. On your phone.',
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Enjoy the pubs',
                  description: 'History, atmosphere, and very good beer.',
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#D4A853]/10 text-[#D4A853]">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Crawl Spotlight */}
        {liveCrawl && (
          <section className="py-24 px-6 relative overflow-hidden">
            {/* Monopoly red gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4001A]/10 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content side */}
                <div>
                  <span className="inline-block px-3 py-1 bg-[#D4001A]/20 text-[#D4001A] text-xs font-bold uppercase tracking-wider rounded mb-6">
                    Featured Crawl
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                    {liveCrawl.name}
                  </h2>
                  <p className="text-xl text-white/50 italic mb-6">
                    &ldquo;{liveCrawl.tagline}&rdquo;
                  </p>
                  <p className="text-white/60 leading-relaxed mb-8">
                    {liveCrawl.editorialDescription || liveCrawl.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-8 mb-8">
                    <div>
                      <div className="text-4xl font-serif font-bold text-white">28</div>
                      <div className="text-sm text-white/50 uppercase tracking-wider">Pubs</div>
                    </div>
                    <div className="w-px h-12 bg-white/20" />
                    <div>
                      <div className="text-4xl font-serif font-bold text-white">~26</div>
                      <div className="text-sm text-white/50 uppercase tracking-wider">Miles</div>
                    </div>
                    <div className="w-px h-12 bg-white/20" />
                    <div>
                      <div className="text-4xl font-serif font-bold text-[#D4001A]">Epic</div>
                      <div className="text-sm text-white/50 uppercase tracking-wider">Difficulty</div>
                    </div>
                  </div>

                  <a
                    href={liveCrawl.url}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4001A] text-white font-semibold rounded-lg hover:bg-[#B80016] transition-colors"
                  >
                    Start the Monopoly Crawl
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {/* Visual side */}
                <div className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1a1a] border border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4001A]/20 via-[#1E8449]/10 to-[#0f0f0f]" />
                  {/* Monopoly board color strip */}
                  <div className="absolute bottom-0 left-0 right-0 h-3 flex">
                    <div className="flex-1 bg-amber-800" />
                    <div className="flex-1 bg-sky-300" />
                    <div className="flex-1 bg-pink-500" />
                    <div className="flex-1 bg-orange-500" />
                    <div className="flex-1 bg-red-500" />
                    <div className="flex-1 bg-yellow-400" />
                    <div className="flex-1 bg-green-600" />
                    <div className="flex-1 bg-blue-900" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-[200px] text-white/5 font-bold">M</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* What You Get */}
        <section className="py-24 px-6 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Every Crawl Includes
              </h2>
              <p className="text-white/50">We walked them so you don&apos;t have to plan them.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🗺️',
                  title: 'Interactive Map',
                  description: 'Every pub plotted. Clickable. Zoomable.',
                },
                {
                  icon: '🍺',
                  title: 'Pub-by-Pub Breakdown',
                  description: 'Descriptions, history, recommended drinks, order of visit.',
                },
                {
                  icon: '📍',
                  title: 'Walking Directions',
                  description: 'Start station, end station, total distance, estimated time.',
                },
                {
                  icon: '🏗️',
                  title: 'Crawl Builder',
                  description: 'Customise any route. Pick your pubs. Share with your group.',
                },
                {
                  icon: '✍️',
                  title: 'Locally Researched',
                  description: 'Not scraped, not AI-generated lists. Actually visited.',
                },
                {
                  icon: '📱',
                  title: 'Mobile First',
                  description: 'Designed for your phone. Works at pub-lighting brightness.',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg bg-[#1a1a1a] border border-white/5 hover:border-[#D4A853]/30 transition-colors"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-24 px-6">
          <div className="max-w-xl mx-auto">
            <div className="p-8 rounded-lg bg-[#1a1a1a] border border-[#D4A853]/30 text-center">
              <h2 className="font-serif text-2xl font-bold text-white mb-2">
                New crawls. Insider tips. No spam.
              </h2>
              <p className="text-white/50 text-sm mb-6">
                Be the first to know when new crawls drop.
              </p>
              <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4A853]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D4A853] text-[#0f0f0f] font-semibold rounded-lg hover:bg-[#E5B964] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Logo & tagline */}
              <div className="md:col-span-1">
                <div className="font-serif text-xl font-bold text-white mb-3">
                  London Pub Crawls
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  Made in London. Researched on foot. Written with a pint in hand.
                </p>
              </div>

              {/* Crawls column */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Crawls</h4>
                <ul className="space-y-2">
                  {crawls.slice(0, 6).map((crawl) => (
                    <li key={crawl.id}>
                      <a
                        href={crawl.live ? `/crawl/${crawl.slug}` : undefined}
                        className={`text-sm transition-colors ${
                          crawl.live ? 'text-white/50 hover:text-[#D4A853]' : 'text-white/30 cursor-default'
                        }`}
                      >
                        {crawl.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider opacity-0">More</h4>
                <ul className="space-y-2">
                  {crawls.slice(6).map((crawl) => (
                    <li key={crawl.id}>
                      <a
                        href={crawl.live ? `/crawl/${crawl.slug}` : undefined}
                        className={`text-sm transition-colors ${
                          crawl.live ? 'text-white/50 hover:text-[#D4A853]' : 'text-white/30 cursor-default'
                        }`}
                      >
                        {crawl.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#about" className="text-sm text-white/50 hover:text-[#D4A853] transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="mailto:hello@londonpubcrawls.com" className="text-sm text-white/50 hover:text-[#D4A853] transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#crawls" className="text-sm text-white/50 hover:text-[#D4A853] transition-colors">
                      All Crawls
                    </a>
                  </li>
                  <li>
                    <a href="#newsletter" className="text-sm text-white/50 hover:text-[#D4A853] transition-colors">
                      Newsletter
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/30">
                &copy; {new Date().getFullYear()} London Pub Crawls. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="https://instagram.com" className="text-white/30 hover:text-[#D4A853] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://twitter.com" className="text-white/30 hover:text-[#D4A853] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
