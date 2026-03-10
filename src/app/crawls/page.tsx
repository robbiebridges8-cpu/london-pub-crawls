'use client';

import { useState } from 'react';
import { Select, SelectItem } from '@heroui/react';
import { crawls } from '@/content/crawls';
import { SiteNav, SiteFooter, SectionLabel, CrawlCard } from '@/components';

type SortOption = 'name' | 'pubs' | 'difficulty';
type FilterOption = 'all' | 'live' | 'coming-soon';

const difficultyOrder: Record<string, number> = {
  'Easy': 1,
  'Medium': 2,
  'Hard': 3,
  'Legendary': 4,
};

export default function CrawlsPage() {
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  // Filter crawls
  let filteredCrawls = [...crawls];
  if (filterBy === 'live') {
    filteredCrawls = filteredCrawls.filter((c) => c.live);
  } else if (filterBy === 'coming-soon') {
    filteredCrawls = filteredCrawls.filter((c) => !c.live);
  }

  // Sort crawls
  filteredCrawls.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'pubs') {
      return b.pubs.length - a.pubs.length;
    } else if (sortBy === 'difficulty') {
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    }
    return 0;
  });

  return (
    <>
      <SiteNav />

      <main id="main-content" className="pt-24 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <SectionLabel className="mb-4">Explore London</SectionLabel>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)] mb-4">
              All Crawls
            </h1>
            <p className="font-body text-lg text-[var(--muted)] max-w-lg mx-auto">
              Browse our collection of curated pub crawls across London.
            </p>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Select
              label="Filter"
              selectedKeys={[filterBy]}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as FilterOption;
                setFilterBy(value);
              }}
              className="w-40"
              classNames={{
                trigger: 'bg-[var(--surface)] border-2 border-[var(--ink)]',
                label: 'font-label text-xs uppercase tracking-wider',
              }}
            >
              <SelectItem key="all">All</SelectItem>
              <SelectItem key="live">Live Only</SelectItem>
              <SelectItem key="coming-soon">Coming Soon</SelectItem>
            </Select>

            <Select
              label="Sort by"
              selectedKeys={[sortBy]}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as SortOption;
                setSortBy(value);
              }}
              className="w-40"
              classNames={{
                trigger: 'bg-[var(--surface)] border-2 border-[var(--ink)]',
                label: 'font-label text-xs uppercase tracking-wider',
              }}
            >
              <SelectItem key="name">Name</SelectItem>
              <SelectItem key="pubs">Most Pubs</SelectItem>
              <SelectItem key="difficulty">Difficulty</SelectItem>
            </Select>
          </div>

          {/* Crawl Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[var(--ink)]">
            {filteredCrawls.map((crawl) => (
              <CrawlCard key={crawl.id} crawl={crawl} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCrawls.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-lg text-[var(--muted)]">
                No crawls match your filters.
              </p>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
