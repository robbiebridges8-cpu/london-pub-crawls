import { crawls, Crawl } from '@/content/crawls';

function CrawlCard({ crawl }: { crawl: Crawl }) {
  const CardWrapper = crawl.live && crawl.url
    ? ({ children }: { children: React.ReactNode }) => (
        <a href={crawl.url} className="block h-full">
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => <div className="h-full">{children}</div>;

  return (
    <CardWrapper>
      <article
        className="group relative h-full overflow-hidden rounded-sm bg-zinc-900/80 border border-zinc-800 transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-900"
        style={{ '--accent': crawl.accentColor } as React.CSSProperties}
      >
        {/* Atmospheric background gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at top, ${crawl.accentColor}15 0%, transparent 50%)`
          }}
        />

        {/* Image placeholder with atmospheric gradient */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${crawl.accentColor}30 0%, #0f0f0f 60%, #0f0f0f 100%)`
            }}
          />
          {/* Fog/mist overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />

          {/* Number badge */}
          <div
            className="absolute top-4 left-4 w-10 h-10 rounded-sm flex items-center justify-center text-sm font-bold text-white/90"
            style={{ backgroundColor: `${crawl.accentColor}cc` }}
          >
            {crawl.pubs}
          </div>

          {/* Live badge */}
          {crawl.live && (
            <div className="absolute top-4 right-4 px-2 py-1 bg-emerald-500/90 text-[10px] font-bold uppercase tracking-wider text-white rounded-sm">
              Live
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: crawl.accentColor }}
            />
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              {crawl.area}
            </span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-zinc-100 transition-colors">
            {crawl.name}
          </h3>

          <p className="text-zinc-400 text-sm leading-relaxed mb-4 italic">
            &ldquo;{crawl.tagline}&rdquo;
          </p>

          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {crawl.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: crawl.difficulty === 'Easy' ? '#22c55e'
                    : crawl.difficulty === 'Medium' ? '#f59e0b'
                    : crawl.difficulty === 'Hard' ? '#ef4444'
                    : '#a855f7'
                }}
              />
              {crawl.difficulty}
            </span>
          </div>

          {/* Hover arrow */}
          <div
            className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
            style={{ backgroundColor: `${crawl.accentColor}40` }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke={crawl.accentColor}
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ backgroundColor: crawl.accentColor }}
        />
      </article>
    </CardWrapper>
  );
}

export default function Home() {
  const liveCrawl = crawls.find(c => c.live);

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
            description: 'Discover London\'s greatest themed pub crawls. Curated routes through history, music, and culture.',
            url: 'https://londonpubcrawls.com',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'London Pub Crawls Directory',
            description: 'Curated pub crawl routes across London',
            numberOfItems: crawls.length,
            itemListElement: crawls.map((crawl, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: crawl.name,
              description: crawl.tagline,
              url: crawl.url || `https://londonpubcrawls.com/${crawl.slug}`,
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
          <div className="backdrop-blur-md bg-[#0a0a0a]/80 border-b border-zinc-800/50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <a href="/" className="font-serif text-xl font-bold text-white tracking-tight">
                London Pub Crawls
              </a>
              <div className="flex items-center gap-8">
                <a href="#crawls" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
                  Crawls
                </a>
                <a href="#about" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
                  About
                </a>
                <a
                  href="mailto:hello@londonpubcrawls.com"
                  className="text-sm px-4 py-2 border border-zinc-700 text-zinc-300 hover:border-amber-500/50 hover:text-amber-500 transition-all rounded-sm"
                >
                  Submit a Crawl
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Atmospheric background layers */}
          <div className="absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-zinc-900/50 to-[#0a0a0a]" />

            {/* Ambient light spots */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-3xl" />

            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0a0a0a_70%)]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
              <span className="text-xs font-medium text-amber-500/80 uppercase tracking-[0.2em]">
                Est. 2024 · London
              </span>
              <span className="w-12 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            </div>

            {/* Main headline */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9] tracking-tight">
              Drink Your Way
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">
                Through History
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Curated pub crawls through London&apos;s greatest stories.
              <span className="text-zinc-500"> Real pubs. Proper routes. Local knowledge.</span>
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#crawls"
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-sm overflow-hidden transition-all hover:shadow-lg hover:shadow-amber-500/20"
              >
                <span className="relative z-10">Explore the Crawls</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              {liveCrawl && (
                <a
                  href={liveCrawl.url}
                  className="px-8 py-4 border border-zinc-700 text-zinc-300 font-medium rounded-sm hover:border-zinc-500 hover:text-white transition-all"
                >
                  Try the Monopoly Crawl →
                </a>
              )}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent animate-pulse" />
            </div>
          </div>
        </header>

        {/* Featured Crawl Spotlight */}
        {liveCrawl && (
          <section className="relative py-24 border-y border-zinc-800/50">
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-transparent" />
            <div className="relative max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-sm mb-6">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">
                      Now Live
                    </span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                    The Monopoly Pub Crawl
                  </h2>
                  <p className="text-xl text-zinc-400 mb-6 italic">
                    &ldquo;{liveCrawl.tagline}&rdquo;
                  </p>
                  <p className="text-zinc-500 leading-relaxed mb-8">
                    {liveCrawl.description} Experience 26 of London&apos;s finest pubs,
                    from the brown properties of the Old Kent Road to the dark blues of Mayfair.
                    Complete timings, reviews, and survival tips included.
                  </p>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{liveCrawl.pubs}</div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">Pubs</div>
                    </div>
                    <div className="w-px h-12 bg-zinc-800" />
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{liveCrawl.duration}</div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">Duration</div>
                    </div>
                    <div className="w-px h-12 bg-zinc-800" />
                    <div className="text-center">
                      <div className="text-3xl font-bold text-amber-500">{liveCrawl.difficulty}</div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">Difficulty</div>
                    </div>
                  </div>
                  <a
                    href={liveCrawl.url}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-sm hover:bg-zinc-100 transition-colors"
                  >
                    Start the Crawl
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
                <div className="relative hidden lg:block">
                  <div className="aspect-square rounded-sm overflow-hidden bg-gradient-to-br from-red-500/20 via-zinc-900 to-zinc-900 border border-zinc-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[200px] opacity-10 font-serif font-bold text-white">
                        M
                      </div>
                    </div>
                    {/* Monopoly color strip */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 flex">
                      <div className="flex-1 bg-amber-800" />
                      <div className="flex-1 bg-sky-300" />
                      <div className="flex-1 bg-pink-500" />
                      <div className="flex-1 bg-orange-500" />
                      <div className="flex-1 bg-red-500" />
                      <div className="flex-1 bg-yellow-400" />
                      <div className="flex-1 bg-green-600" />
                      <div className="flex-1 bg-blue-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Crawl Directory */}
        <section id="crawls" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                The Directory
              </h2>
              <p className="text-zinc-500 max-w-xl mx-auto">
                {crawls.length} curated crawls through London&apos;s history, music, crime, and culture.
                More routes added monthly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crawls.map((crawl) => (
                <CrawlCard key={crawl.id} crawl={crawl} />
              ))}
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section id="about" className="py-24 border-t border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Why London Pub Crawls?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: 'Locally Researched',
                  description: 'Every crawl walked, every pub visited. No armchair recommendations—just routes we\'ve done ourselves.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  ),
                  title: 'Interactive Maps',
                  description: 'Turn-by-turn routes with Google Maps integration. Never get lost between pints.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Mobile First',
                  description: 'Designed for your phone. Offline support coming soon. Your pocket pub guide.',
                },
              ].map((prop, i) => (
                <div
                  key={i}
                  className="group p-8 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:border-zinc-700 transition-colors"
                >
                  <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-sm bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20 transition-colors">
                    {prop.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{prop.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{prop.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 border-t border-zinc-800/50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to explore?
            </h2>
            <p className="text-zinc-500 mb-8">
              Start with the Monopoly Pub Crawl—the ultimate test of endurance and London knowledge.
            </p>
            <a
              href="https://monopolypubcrawl.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all"
            >
              Begin the Monopoly Crawl
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="font-serif text-lg font-bold text-white mb-1">
                  London Pub Crawls
                </div>
                <p className="text-sm text-zinc-600">
                  Curated routes through London&apos;s finest pubs.
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-zinc-500">
                <a href="https://monopolypubcrawl.com" className="hover:text-white transition-colors">
                  Monopoly Crawl
                </a>
                <span className="text-zinc-800">·</span>
                <a href="mailto:hello@londonpubcrawls.com" className="hover:text-white transition-colors">
                  Contact
                </a>
                <span className="text-zinc-800">·</span>
                <span className="text-zinc-600">Drink responsibly</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center">
              <p className="text-xs text-zinc-700">
                © {new Date().getFullYear()} London Pub Crawls. Made with pints in London.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
