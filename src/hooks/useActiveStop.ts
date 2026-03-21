'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Intersection Observer hook that tracks which pub card is most visible.
 * Returns the active stop index and a ref-setter function for each card.
 */
export function useActiveStop(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let best = -1;
        let bestRatio = 0;
        entries.forEach(entry => {
          const idx = cards.indexOf(entry.target as HTMLDivElement);
          if (idx >= 0 && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            best = idx;
          }
        });

        if (best >= 0) {
          // Debounce to avoid jittery updates during fast scrolling
          clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            setActiveIndex(best);
          }, 80);
        }
      },
      {
        // Observe when cards are in the middle 40% of the viewport
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    cards.forEach(card => observer.observe(card));
    return () => {
      observer.disconnect();
      clearTimeout(debounceRef.current);
    };
  }, [count]);

  return { activeIndex, setCardRef };
}
