'use client';

import { crawls, Crawl } from '@/content/crawls';
import { useEffect, useRef } from 'react';
import { SiteNav, SiteFooter } from '@/components';

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

  const CardContent = (
    <>
      {/* Gold accent border on left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
        style={{ backgroundColor: crawl.live ? '#D4A853' : '#30363D' }}
      />

      {/* Card content */}
      <div className="p-6 pl-8">
        {/* Top row: area badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border"
            style={{
              borderColor: crawl.live ? crawl.accentColor : '#30363D',
              color: crawl.live ? crawl.accentColor : '#8B9AAD',
            }}
          >
            {crawl.area}
          </span>
          {isComingSoon ? (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#161B22] text-[#8B9AAD] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#30363D]">
              Coming Soon
            </span>
          ) : (
            <span className="px-3 py-1 bg-[#D4A853] text-[#0D1117] text-xs font-bold uppercase tracking-wider rounded-full">
              Live
            </span>
          )}
        </div>

        {/* Crawl name */}
        <h3 className={`font-serif text-xl font-bold mb-2 transition-colors ${
          crawl.live ? 'text-[#F5F0E8] group-hover:text-[#D4A853]' : 'text-[#8B9AAD]'
        }`}>
          {crawl.name}
        </h3>

        {/* Tagline */}
        <p className={`text-sm leading-relaxed mb-4 ${isComingSoon ? 'text-[#8B9AAD]/60' : 'text-[#8B9AAD]'}`}>
          {crawl.tagline}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-[#8B9AAD] pt-4 border-t border-[#30363D]">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {crawl.pubs.length} pubs
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {crawl.duration}
          </span>
          <span
            className="ml-auto px-2 py-0.5 rounded text-xs font-semibold border"
            style={{
              borderColor: crawl.live ? crawl.accentColor : '#30363D',
              color: isComingSoon ? '#8B9AAD' : crawl.accentColor,
            }}
          >
            {crawl.difficulty}
          </span>
        </div>

        {/* Hover arrow */}
        {crawl.live && (
          <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <span className="flex items-center gap-1 text-[#D4A853] text-sm font-semibold">
              Explore
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div
      ref={cardRef}
      className="opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {crawl.live ? (
        <a
          href={`/crawl/${crawl.slug}`}
          className="group block relative overflow-hidden rounded-lg bg-[#161B22] border border-[#30363D] transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:border-[#D4A853] hover:shadow-[0_0_30px_rgba(212,168,83,0.15)]"
        >
          {CardContent}
        </a>
      ) : (
        <div
          className="relative overflow-hidden rounded-lg bg-[#161B22]/50 border border-[#30363D]/50 opacity-60 cursor-default"
        >
          {CardContent}
        </div>
      )}
    </div>
  );
}

export default function Home() {
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

      <div className="min-h-screen bg-[#0D1117]">
        {/* Navigation */}
        <SiteNav />

        {/* Hero Section - Dark, typographic, atmospheric */}
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          {/* Atmospheric background */}
          <div className="absolute inset-0">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-[#161B22] to-[#0D1117]" />

            {/* Warm glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#D4A853]/5 blur-[100px]" />
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#D4A853]/3 blur-[80px]" />

            {/* Subtle pattern overlay for texture */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A853' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161B22] border border-[#D4A853]/30 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
              <span className="text-sm text-[#D4A853] font-medium">
                {liveCrawls.length} crawls live now
              </span>
            </div>

            {/* Main headline - big, serif, warm */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#F5F0E8] mb-6 leading-[1.1] tracking-tight">
              Drink Your Way
              <br />
              <span className="text-[#D4A853]">Through History</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[#8B9AAD] max-w-2xl mx-auto mb-10 leading-relaxed">
              Curated pub crawl routes through London&apos;s history, music, crime, and culture.
              <br className="hidden md:block" />
              Free, self-guided, and locally researched.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="#crawls"
                className="px-8 py-4 bg-[#D4A853] text-[#0D1117] font-semibold rounded-lg hover:bg-[#E8C068] transition-all duration-200 inline-flex items-center gap-2"
              >
                Explore the Crawls
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <a
                href="/crawl/monopoly"
                className="px-8 py-4 bg-transparent text-[#F5F0E8] font-semibold rounded-lg border-2 border-[#F5F0E8] hover:bg-[#F5F0E8] hover:text-[#0D1117] transition-all duration-200"
              >
                Start with Monopoly
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-[#F5F0E8]">12</div>
                <div className="text-sm text-[#8B9AAD] uppercase tracking-wider">Crawls</div>
              </div>
              <div className="w-px h-12 bg-[#30363D]" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-[#F5F0E8]">{totalPubs}+</div>
                <div className="text-sm text-[#8B9AAD] uppercase tracking-wider">Pubs</div>
              </div>
              <div className="w-px h-12 bg-[#30363D]" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-[#D4A853]">Free</div>
                <div className="text-sm text-[#8B9AAD] uppercase tracking-wider">Always</div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8B9AAD]">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#8B9AAD] to-transparent" />
          </div>
        </header>

        {/* Crawl Directory Grid */}
        <section id="crawls" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-4">
                Choose Your Crawl
              </h2>
              <p className="text-[#8B9AAD] max-w-xl mx-auto">
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
        <section id="how-it-works" className="py-24 px-6 bg-[#161B22]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-4">
                How It Works
              </h2>
              <p className="text-[#8B9AAD]">Three simple steps to your perfect pub crawl.</p>
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
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0D1117] border-2 border-[#D4A853] flex items-center justify-center text-[#D4A853]">
                    {step.icon}
                  </div>
                  <div className="text-xs text-[#D4A853] font-bold tracking-widest mb-2">{step.num}</div>
                  <h3 className="text-lg font-bold text-[#F5F0E8] mb-3">{step.title}</h3>
                  <p className="text-[#8B9AAD] text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-4">
                Every Crawl Includes
              </h2>
              <p className="text-[#8B9AAD]">We walked them so you don&apos;t have to plan them.</p>
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
                  className="p-6 rounded-lg bg-[#161B22] border border-[#30363D] hover:border-[#D4A853] transition-colors"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-[#F5F0E8] mb-2">{feature.title}</h3>
                  <p className="text-[#8B9AAD] text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-[#161B22]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-6">
              About London Pub Crawls
            </h2>
            <p className="text-[#8B9AAD] text-lg leading-relaxed mb-6">
              We believe the best way to know London is through its pubs. These aren&apos;t just
              places to drink — they&apos;re living museums, neighbourhood landmarks, and the
              settings for centuries of stories.
            </p>
            <p className="text-[#8B9AAD] text-lg leading-relaxed mb-8">
              Every crawl on this site has been walked, researched, and written up by people
              who actually love London pubs. No AI-generated lists, no affiliate links, no
              sponsored content. Just honest recommendations for people who want to explore.
            </p>
            <div className="inline-flex items-center gap-3 text-[#D4A853] font-medium">
              <span>Made in London</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853]" />
              <span>Researched on foot</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853]" />
              <span>Written with a pint in hand</span>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 px-6">
          <div className="max-w-xl mx-auto">
            <div className="p-8 rounded-xl bg-[#161B22] border-2 border-[#D4A853] text-center">
              <h2 className="font-serif text-2xl font-bold text-[#F5F0E8] mb-2">
                New crawls. Insider tips. No spam.
              </h2>
              <p className="text-[#8B9AAD] text-sm mb-6">
                Be the first to know when new crawls drop.
              </p>
              <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-lg text-[#F5F0E8] placeholder:text-[#8B9AAD]/50 focus:outline-none focus:border-[#D4A853] transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D4A853] text-[#0D1117] font-semibold rounded-lg hover:bg-[#E8C068] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <SiteFooter />
      </div>
    </>
  );
}
