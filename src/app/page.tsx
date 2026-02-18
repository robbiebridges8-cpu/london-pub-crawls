import { crawls, Crawl } from '@/content/crawls';

function CrawlCard({ crawl }: { crawl: Crawl }) {
  const isComingSoon = !crawl.live;

  const CardWrapper = crawl.live && crawl.url
    ? ({ children }: { children: React.ReactNode }) => (
        <a href={crawl.url} className="block h-full group">
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className="h-full group cursor-default">
          {children}
        </div>
      );

  return (
    <CardWrapper>
      <article className="relative h-full overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-500">
        {/* Image area with color overlay */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Base gradient simulating image */}
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: `linear-gradient(145deg, ${crawl.accentColor} 0%, ${crawl.secondaryColor} 50%, ${crawl.accentColor}88 100%)`
            }}
          />

          {/* Texture overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Dark gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Coming Soon overlay */}
          {isComingSoon && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-medium text-[#1A1A1A] uppercase tracking-wider rounded">
              Coming Soon
            </div>
          )}

          {/* Live badge */}
          {crawl.live && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#C8871A] text-white text-xs font-semibold uppercase tracking-wider rounded">
              Live Now
            </div>
          )}

          {/* Content overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Area tag */}
            <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm text-white/90 text-xs font-medium uppercase tracking-wider rounded mb-3">
              {crawl.area}
            </span>

            {/* Crawl name */}
            <h3 className="font-serif text-3xl font-bold text-white mb-2 leading-tight">
              {crawl.name}
            </h3>

            {/* Tagline */}
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {crawl.tagline}
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-white">{crawl.pubs.length}</span> pubs
              </span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>{crawl.duration}</span>
            </div>

            {/* Hover CTA */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center gap-2 text-white font-medium text-sm">
                {crawl.live ? 'Start this crawl' : 'View details'}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </article>
    </CardWrapper>
  );
}

function MapIcon() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function BeerIcon() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

export default function Home() {
  const liveCrawl = crawls.find(c => c.live);
  const featuredCrawl = crawls.find(c => c.slug === 'jack-the-ripper');
  const totalPubs = crawls.reduce((acc, c) => acc + c.pubs.length, 0);

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

      <div className="min-h-screen bg-[#FAFAF8]">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
          <div className="backdrop-blur-md bg-white/80 border-b border-neutral-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                {/* Tiny pint glass icon */}
                <span className="text-[#C8871A]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 3h10v2h2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5h2V3zm2 2v14h6V5H9z"/>
                  </svg>
                </span>
                <span className="font-serif text-xl font-bold text-[#1A1A1A] tracking-tight">
                  London Pub Crawls
                </span>
              </a>
              <div className="flex items-center gap-8">
                <a href="#crawls" className="text-sm text-neutral-600 hover:text-[#1A1A1A] transition-colors hidden sm:block">
                  Crawls
                </a>
                <a href="#about" className="text-sm text-neutral-600 hover:text-[#1A1A1A] transition-colors hidden sm:block">
                  About
                </a>
                <a
                  href="#build"
                  className="text-sm px-4 py-2 bg-[#C8871A] text-white font-medium hover:bg-[#B07816] transition-colors rounded"
                >
                  Build Your Crawl
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Atmospheric background - simulating pub scene photo */}
          <div className="absolute inset-0">
            {/* Warm golden base */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #2C2C3E 0%, #1A1A1A 40%, #2C2C3E 100%)'
              }}
            />

            {/* Golden light spots - simulating pub windows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C8871A]/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-orange-400/10 rounded-full blur-[80px]" />

            {/* Grain texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Bottom gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
            {/* Overline */}
            <p className="text-xs font-medium text-[#C8871A] uppercase tracking-[0.25em] mb-8">
              London&apos;s Finest Pub Crawls
            </p>

            {/* Main headline */}
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-[0.9] tracking-tight">
              Drink London&apos;s
              <br />
              Story
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Twelve themed routes through the city&apos;s greatest pubs.
              <br className="hidden sm:block" />
              Pick one, build your own, or let history decide.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#crawls"
                className="group px-8 py-4 bg-[#C8871A] text-white font-semibold rounded transition-all hover:bg-[#B07816] hover:shadow-lg hover:shadow-[#C8871A]/20"
              >
                Explore the Crawls
              </a>
              <a
                href="#build"
                className="px-8 py-4 border-2 border-white/30 text-white font-medium rounded hover:border-white/60 hover:bg-white/5 transition-all"
              >
                Build Your Crawl
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </header>

        {/* Stats Bar */}
        <section className="bg-[#2C2C3E] py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
              <div className="text-center md:border-r md:border-white/10">
                <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-1">12</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">Crawls</div>
              </div>
              <div className="text-center md:border-r md:border-white/10">
                <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-1">{totalPubs}+</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">Pubs</div>
              </div>
              <div className="text-center md:border-r md:border-white/10">
                <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-1">40+</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">Miles of Walking</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-1">1</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">Great City</div>
              </div>
            </div>
          </div>
        </section>

        {/* Crawl Directory */}
        <section id="crawls" className="py-24 bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-4">
                The Crawls
              </h2>
              <p className="text-neutral-500 text-lg max-w-xl">
                Every route is researched, mapped and ready to walk.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {crawls.map((crawl) => (
                <CrawlCard key={crawl.id} crawl={crawl} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Crawl Spotlight */}
        {featuredCrawl && (
          <section className="py-24 bg-white border-y border-neutral-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Image side */}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(145deg, ${featuredCrawl.accentColor} 0%, ${featuredCrawl.secondaryColor} 100%)`
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-[180px] text-white/10 font-bold">
                      ?
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div>
                  <span className="inline-block px-3 py-1 bg-[#8B0000]/10 text-[#8B0000] text-xs font-semibold uppercase tracking-wider rounded mb-6">
                    Featured Route
                  </span>
                  <h3 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
                    {featuredCrawl.name}
                  </h3>
                  <p className="text-xl text-neutral-500 italic mb-6">
                    &ldquo;{featuredCrawl.tagline}&rdquo;
                  </p>
                  <p className="text-neutral-600 leading-relaxed mb-8">
                    {featuredCrawl.editorialDescription || featuredCrawl.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-8 mb-8">
                    <div>
                      <div className="text-3xl font-serif font-bold text-[#1A1A1A]">{featuredCrawl.pubs.length}</div>
                      <div className="text-sm text-neutral-500 uppercase tracking-wider">Pubs</div>
                    </div>
                    <div className="w-px h-12 bg-neutral-200" />
                    <div>
                      <div className="text-3xl font-serif font-bold text-[#1A1A1A]">{featuredCrawl.duration}</div>
                      <div className="text-sm text-neutral-500 uppercase tracking-wider">Duration</div>
                    </div>
                    <div className="w-px h-12 bg-neutral-200" />
                    <div>
                      <div className="text-3xl font-serif font-bold text-[#C8871A]">{featuredCrawl.difficulty}</div>
                      <div className="text-sm text-neutral-500 uppercase tracking-wider">Difficulty</div>
                    </div>
                  </div>

                  <a
                    href={`/${featuredCrawl.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white font-semibold rounded hover:bg-neutral-800 transition-colors"
                  >
                    Explore this route
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <section id="about" className="py-24 bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
                How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#C8871A]/10 text-[#C8871A]">
                  <MapIcon />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">Pick Your Route</h3>
                <p className="text-neutral-500 leading-relaxed">
                  Choose from 12 themed crawls, each mapped and researched. History, music, crime, or beer — we&apos;ve got you.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#C8871A]/10 text-[#C8871A]">
                  <BeerIcon />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">Build Your Crawl</h3>
                <p className="text-neutral-500 leading-relaxed">
                  Customise any route. Swap pubs, set your pace, share with friends. Make it yours.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#C8871A]/10 text-[#C8871A]">
                  <PhoneIcon />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">Follow the Map</h3>
                <p className="text-neutral-500 leading-relaxed">
                  Interactive maps, pub by pub. Everything you need on your phone. Just add pints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        {liveCrawl && (
          <section id="build" className="py-24 bg-[#2C2C3E]">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to explore?
              </h2>
              <p className="text-neutral-300 text-lg mb-8">
                Start with the Monopoly Pub Crawl — the ultimate test of endurance and London knowledge.
              </p>
              <a
                href={liveCrawl.url}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C8871A] text-white font-semibold rounded hover:bg-[#B07816] transition-all hover:shadow-lg hover:shadow-[#C8871A]/20"
              >
                Begin the Monopoly Crawl
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-[#2C2C3E] pt-16 pb-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            {/* Footer top */}
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Logo column */}
              <div className="md:col-span-1">
                <a href="/" className="flex items-center gap-2 mb-4">
                  <span className="text-[#C8871A]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 3h10v2h2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5h2V3zm2 2v14h6V5H9z"/>
                    </svg>
                  </span>
                  <span className="font-serif text-lg font-bold text-white">
                    London Pub Crawls
                  </span>
                </a>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Researched and written in London. Best enjoyed with a pint.
                </p>
              </div>

              {/* Crawls column */}
              <div>
                <h4 className="text-white font-semibold mb-4">Crawls</h4>
                <ul className="space-y-2">
                  {crawls.slice(0, 6).map((crawl) => (
                    <li key={crawl.id}>
                      <a href={crawl.url || `/${crawl.slug}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                        {crawl.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4 opacity-0">More</h4>
                <ul className="space-y-2">
                  {crawls.slice(6).map((crawl) => (
                    <li key={crawl.id}>
                      <a href={crawl.url || `/${crawl.slug}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                        {crawl.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Platform column */}
              <div>
                <h4 className="text-white font-semibold mb-4">Platform</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#about" className="text-sm text-neutral-400 hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#build" className="text-sm text-neutral-400 hover:text-white transition-colors">
                      Build Your Crawl
                    </a>
                  </li>
                  <li>
                    <a href="mailto:hello@londonpubcrawls.com" className="text-sm text-neutral-400 hover:text-white transition-colors">
                      Submit a Pub
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-sm text-neutral-400 hover:text-white transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-sm text-neutral-400 hover:text-white transition-colors">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer bottom */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-neutral-500">
                  &copy; {new Date().getFullYear()} London Pub Crawls. All rights reserved.
                </p>
                <p className="text-xs text-neutral-500">
                  Drink responsibly. Know your limits.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
