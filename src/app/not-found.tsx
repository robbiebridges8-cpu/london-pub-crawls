import Link from 'next/link';
import { SiteNav, SiteFooter } from '@/components';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <SiteNav />
      <main className="flex-1 flex items-center justify-center px-6" style={{ paddingTop: '4.5rem' }}>
        <div className="text-center">
          <h1 className="font-display text-5xl font-bold text-[var(--ink)] mb-4">404</h1>
          <p className="font-body text-lg text-[var(--muted)] mb-8">
            This page doesn&apos;t exist. Maybe the pub closed down.
          </p>
          <Link href="/" className="btn-primary">
            Back to all crawls
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
