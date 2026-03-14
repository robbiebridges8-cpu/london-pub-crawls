'use client';

import Link from 'next/link';
import { crawls } from '@/content/crawls';
import {
  SiteNav,
  SiteFooter,
  CrawlCard,
} from '@/components';
import { CrawlNameScramble } from '@/components/ui/crawl-name-scramble';

const valueProps = [
  {
    icon: (
      <svg className="w-12 h-12 text-[var(--claret)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: 'Curated Routes',
    description: 'Each crawl is researched and walked by locals who know the best pubs, the hidden gems, and the history worth knowing.',
  },
  {
    icon: (
      <svg className="w-12 h-12 text-[var(--claret)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Works on Any Device',
    description: 'No app to download. Just open the route on your phone, follow the map, and start walking.',
  },
  {
    icon: (
      <svg className="w-12 h-12 text-[var(--claret)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Completely Free',
    description: 'No booking fees, no sign-ups, no hidden costs. Just brilliant pubs and good company.',
  },
];

export default function Home() {
  const displayCrawls = [
    ...crawls.filter((c) => c.live),
    ...crawls.filter((c) => !c.live).slice(0, 4),
  ];

  return (
    <>
      <SiteNav />

      <main id="main-content">
        {/* Hero Section */}
        <section
          className="relative min-h-screen flex flex-col overflow-hidden"
          style={{
            minHeight: '100dvh',
          }}
        >
          {/* Background image — absolute fill */}
          <div className="hero-bg absolute inset-0 z-0" />
          {/* Overlays */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--background)]/70 via-[var(--background)]/50 to-[var(--background)] lg:from-[var(--background)]/80 lg:via-[var(--background)]/65" />
          <div className="absolute inset-0 z-0" style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(255,241,229,0.55) 0%, transparent 100%)',
          }} />
          <div className="hidden lg:block absolute inset-0 z-0" style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,241,229,0.5) 0%, transparent 100%)',
          }} />

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center px-6 pt-12 md:pt-24 pb-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Stats */}
              <div className="flex justify-center gap-8 md:gap-12 mb-6">
                <div className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)]">
                    {crawls.filter(c => c.live).length}
                  </div>
                  <div className="font-label text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
                    Crawls
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)]">
                    101
                  </div>
                  <div className="font-label text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
                    Pubs
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)]">
                    Free
                  </div>
                  <div className="font-label text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
                    Always
                  </div>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-[var(--ink)] mb-8 tracking-tight">
                London on Tap
              </h1>

              {/* Scrambling Crawl Names */}
              <div className="mb-12">
                <CrawlNameScramble className="text-2xl md:text-3xl lg:text-4xl" />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#crawls" className="btn-primary text-lg px-8 py-4">
                  Explore the Crawls
                </a>
                <Link href="/build" className="btn-ghost text-lg px-8 py-4">
                  Build Your Own
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="relative z-10 pb-8 flex justify-center">
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 text-[var(--muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Crawls Section */}
        <section id="crawls" className="py-20 px-6 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)]">
                The Crawls
              </h2>
            </div>

            {/* Crawl Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[var(--ink)]">
              {displayCrawls.map((crawl) => (
                <CrawlCard key={crawl.id} crawl={crawl} />
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
              <Link href="/crawls" className="btn-ghost">
                View All Crawls
              </Link>
            </div>
          </div>
        </section>

        {/* Build Your Own CTA */}
        <section className="py-20 px-6 bg-[var(--ink)]">
          <div className="max-w-[800px] mx-auto text-center">
            <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--gold)] mb-4">
              Coming Soon
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Build Your Own Crawl
            </h2>
            <p className="font-body text-lg text-white/70 leading-relaxed mb-8 max-w-lg mx-auto">
              Pick your pubs. Set your route. Share it with your mates.
              Design a completely custom pub crawl through London.
            </p>
            <Link href="/build" className="inline-block px-8 py-4 bg-[var(--claret)] text-white font-label text-sm uppercase tracking-wider font-bold hover:bg-[var(--claret-dark)] transition-colors">
              Find Out More
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6 bg-[var(--surface)]">
          <div className="max-w-[1200px] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)]">
                How It Works
              </h2>
            </div>

            {/* Value Props Grid */}
            <div className="grid md:grid-cols-3 gap-12">
              {valueProps.map((prop, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-6">
                    {prop.icon}
                  </div>
                  <h3 className="font-label text-lg uppercase tracking-wider text-[var(--ink)] mb-3">
                    {prop.title}
                  </h3>
                  <p className="font-body text-[var(--muted)] leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 scroll-mt-20">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)]">
                The Story
              </h2>
            </div>

            <div className="space-y-6 font-body text-lg text-[var(--muted)] leading-relaxed">
              <p>
                I walked the Monopoly Pub Crawl in 2023. Twenty-six pubs, one for each property on the board.
                Old Kent Road to Mayfair. It took twelve hours, several wrong turns, and one very memorable
                night in a Whitechapel pub I&apos;d never have found otherwise.
              </p>
              <p>
                That&apos;s when I realised: there&apos;s no good resource for this. Just scattered Reddit posts,
                outdated blogs, and closed pubs. So I started mapping them myself.
              </p>
              <p>
                London on Tap is what I wish existed when I started. Proper routes, researched pubs,
                interactive maps. Free, no booking, no app to download. Just great pubs and the stories
                that make them special.
              </p>
              <p className="text-[var(--ink)] font-medium">
                Every route on this site has been walked by someone who genuinely loves London pubs.
                I hope you enjoy them as much as I did.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-[var(--muted)]/30">
              <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">
                — Robbie, Founder
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
