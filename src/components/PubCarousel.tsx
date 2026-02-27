'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface PubCarouselProps {
  children: ReactNode[];
  title?: string;
}

export default function PubCarousel({ children, title }: PubCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 300;
      const gap = 24;
      carouselRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
      setCurrentIndex(index);
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current && !isScrolling) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 300;
      const gap = 24;
      const scrollLeft = carouselRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [currentIndex, isScrolling]);

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < children.length - 1;

  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-2xl font-bold text-[#1C2632]">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-[#4A5568]">
            <span className="font-semibold">{currentIndex + 1}</span>
            <span>/</span>
            <span>{children.length}</span>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <button
        onClick={() => scrollToIndex(currentIndex - 1)}
        disabled={!canScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-[#E8E4DD] flex items-center justify-center transition-all ${
          canScrollLeft
            ? 'hover:bg-[#722F37] hover:text-white hover:border-[#722F37] cursor-pointer'
            : 'opacity-30 cursor-not-allowed'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => scrollToIndex(currentIndex + 1)}
        disabled={!canScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-[#E8E4DD] flex items-center justify-center transition-all ${
          canScrollRight
            ? 'hover:bg-[#722F37] hover:text-white hover:border-[#722F37] cursor-pointer'
            : 'opacity-30 cursor-not-allowed'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="snap-center flex-shrink-0 first:ml-4 last:mr-4"
            style={{ width: 'min(85vw, 320px)' }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-[#722F37] w-6'
                : 'bg-[#E8E4DD] hover:bg-[#4A5568]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
