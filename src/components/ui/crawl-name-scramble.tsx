'use client';

import { useState, useEffect } from 'react';
import { TextScramble } from './text-scramble';

const crawlNames = [
  'Monopoly',
  'Circle Line',
  'Bermondsey',
  'Jack the Ripper',
  'Beatles',
  'Historic London',
  'South Bank',
  'Criminal London',
  'Literary London',
  'Haunted London',
];

export function CrawlNameScramble({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % crawlNames.length);
      setTrigger(true);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={className}>
      <span className="inline-flex items-baseline gap-1.5 md:gap-3">
        <TextScramble
          as="span"
          className="font-display font-bold text-[var(--claret)]"
          duration={0.6}
          speed={0.03}
          trigger={trigger}
          onScrambleComplete={() => setTrigger(false)}
          key={currentIndex}
        >
          {crawlNames[currentIndex]}
        </TextScramble>
        <span className="font-display font-bold text-[var(--ink)]">
          Pub Crawl
        </span>
      </span>
    </div>
  );
}
