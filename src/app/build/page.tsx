import Link from 'next/link';
import { SiteNav, SiteFooter } from '@/components';

export const metadata = {
  title: 'Build Your Own Crawl',
  description: 'Design your own custom pub crawl through London. Pick your pubs, set your route, share with friends. Coming soon.',
};

export default function BuildPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content">
        <section className="min-h-[80vh] flex items-center justify-center px-6">
          <div className="max-w-[560px] text-center">
            <p className="font-label text-xs uppercase tracking-[0.2em] text-[var(--claret)] mb-6">
              Coming Soon
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)] mb-6">
              Build Your Own Crawl
            </h1>
            <p className="font-body text-lg text-[var(--muted)] leading-relaxed mb-4">
              Pick your pubs. Set your route. Share it with your mates.
              The crawl builder lets you design a completely custom pub crawl through London —
              your pubs, your order, your rules.
            </p>
            <p className="font-body text-[var(--muted)] mb-10">
              We&apos;re building this right now. Check back soon.
            </p>
            <Link href="/" className="btn-ghost">
              Browse Existing Crawls
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
