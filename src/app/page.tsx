'use client';

import Link from 'next/link';
import Image from 'next/image';
import { crawls } from '@/content/crawls';
import {
  SiteNav,
  SiteFooter,
  SectionLabel,
  CrawlCard,
  HowItWorksStep,
} from '@/components';
import { CrawlNameScramble } from '@/components/ui/crawl-name-scramble';

const howItWorksSteps = [
  {
    number: '01',
    title: 'Choose Your Crawl',
    description: 'Pick from our curated routes across London',
  },
  {
    number: '02',
    title: 'Get the Route',
    description: 'View the map and pub list on any device',
  },
  {
    number: '03',
    title: 'Start Walking',
    description: 'Follow the route at your own pace',
  },
  {
    number: '04',
    title: 'Enjoy the Pubs',
    description: 'Discover London\'s best drinking spots',
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
        <section className="relative min-h-screen flex flex-col">
          {/* London Skyline Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80"
              alt="London skyline at dusk"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/90 via-[var(--background)]/70 to-[var(--background)]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-16">
            <div className="text-center max-w-4xl mx-auto">
              {/* Main Headline */}
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-[var(--ink)] mb-8 tracking-tight">
                London Crawling
              </h1>

              {/* Scrambling Crawl Names */}
              <div className="mb-12">
                <CrawlNameScramble className="text-2xl md:text-3xl lg:text-4xl" />
              </div>

              {/* CTA Button */}
              <Link href="/crawls" className="btn-primary text-lg px-8 py-4">
                Explore the Crawls
              </Link>
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
        <section className="py-20 px-6">
          <div className="max-w-[1200px] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <SectionLabel className="mb-4">Our Routes</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)]">
                Choose Your Crawl
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

        {/* How It Works Section */}
        <section className="py-20 px-6 bg-[var(--surface)]">
          <div className="max-w-[1200px] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <SectionLabel className="mb-4">Getting Started</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)]">
                How It Works
              </h2>
            </div>

            {/* Steps Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step) => (
                <HowItWorksStep
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About Teaser Section */}
        <section className="py-20 px-6">
          <div className="max-w-[680px] mx-auto text-center">
            <SectionLabel className="mb-4">About Us</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)] mb-8">
              Made by Londoners, for everyone.
            </h2>

            <div className="space-y-6 font-body text-lg text-[var(--muted)] leading-relaxed mb-8">
              <p>
                These aren&apos;t tourist traps or corporate bar crawls. Every route has been
                walked, researched, and refined by people who actually love London pubs.
              </p>
              <p>
                We believe the best way to know a city is through its pubs — the history on the walls,
                the stories at the bar, the neighbourhoods between stops.
              </p>
            </div>

            <Link href="/about" className="btn-ghost">
              Learn More About Us
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
