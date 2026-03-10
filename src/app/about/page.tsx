'use client';

import Link from 'next/link';
import { SiteNav, SiteFooter, SectionLabel } from '@/components';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteNav />

      <main id="main-content" className="pt-32 pb-24 px-6">
        <article className="max-w-[680px] mx-auto">
          {/* Page title */}
          <div className="text-center mb-12">
            <SectionLabel className="mb-4">Our Story</SectionLabel>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)]">
              About Us
            </h1>
          </div>

          {/* Intro */}
          <div className="space-y-6 font-body text-lg text-[var(--muted)] leading-relaxed mb-16">
            <p className="text-xl text-[var(--ink)]">
              We believe the best way to know a city is through its pubs.
            </p>
            <p>
              The history on the walls. The stories at the bar. The neighbourhoods you walk through
              between stops. A good pub crawl isn&apos;t just drinking &mdash; it&apos;s exploration,
              conversation, and discovery.
            </p>
            <p>
              London Pub Crawls was born from a simple frustration: most pub crawls online are
              either tourist traps, corporate bar crawls, or just lists of pubs with no thought
              to the route, the history, or the experience.
            </p>
            <p>
              We wanted something better. So we made it ourselves.
            </p>
          </div>

          {/* Philosophy */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-6">
              Our Philosophy
            </h2>
            <div className="space-y-6 font-body text-[var(--muted)] leading-relaxed">
              <p>
                Every route on this site has been walked, researched, and refined by people who
                actually love London pubs. We look for character, history, and atmosphere &mdash;
                not just any pub that happens to be nearby.
              </p>
              <p>
                Our crawls are free, self-guided, and designed for groups of friends, tourists,
                or anyone who wants to explore London with a pint in hand.
              </p>
            </div>
          </section>

          {/* What We Look For */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-6">
              What We Look For
            </h2>
            <ul className="space-y-4 font-body text-[var(--muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--claret)] mt-1">&#9670;</span>
                <span><strong className="text-[var(--ink)]">History</strong> &mdash; Pubs with stories to tell. Victorian gin palaces, Dickensian coaching inns, and locals that have been pulling pints for centuries.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--claret)] mt-1">&#9670;</span>
                <span><strong className="text-[var(--ink)]">Character</strong> &mdash; No chains. No identikit gastropubs. We want personality, quirks, and atmosphere.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--claret)] mt-1">&#9670;</span>
                <span><strong className="text-[var(--ink)]">Walkability</strong> &mdash; Routes that flow naturally through interesting neighbourhoods, with sensible distances between stops.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--claret)] mt-1">&#9670;</span>
                <span><strong className="text-[var(--ink)]">Variety</strong> &mdash; A mix of pub styles &mdash; old and new, grand and cosy, famous and hidden.</span>
              </li>
            </ul>
          </section>

          {/* The Team */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-6">
              Made by Londoners
            </h2>
            <div className="space-y-6 font-body text-[var(--muted)] leading-relaxed">
              <p>
                We&apos;re a small group of pub enthusiasts who call London home. Between us,
                we&apos;ve probably visited every historic pub in Zone 1 (and quite a few beyond).
              </p>
              <p>
                This isn&apos;t a business &mdash; it&apos;s a passion project. We don&apos;t take
                money from pubs to feature them. We don&apos;t run ads. We just love London pubs
                and want to share that love with others.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center pt-8 border-t-2 border-[var(--ink)]">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">
              Ready to explore?
            </h2>
            <p className="font-body text-[var(--muted)] mb-8">
              Pick a crawl and start your adventure.
            </p>
            <Link href="/crawls" className="btn-primary inline-block">
              View All Crawls
            </Link>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
