'use client';

import { useEffect, useRef, useState } from 'react';

interface RouteSpineProps {
  totalStops: number;
  accentColor: string;
  className?: string;
}

export default function RouteSpine({ totalStops, accentColor, className = '' }: RouteSpineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get the parent route section
    const routeSection = container.closest('section');
    if (!routeSection) return;

    const updateProgress = () => {
      const rect = routeSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how much of the section has been scrolled through
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Start drawing when section enters viewport, complete when it leaves
      const scrollStart = viewportHeight * 0.8; // Start when section is 80% into viewport
      const scrollEnd = -sectionHeight + viewportHeight * 0.2; // End when 80% scrolled past

      let progress = 0;
      if (sectionTop <= scrollStart) {
        progress = (scrollStart - sectionTop) / (scrollStart - scrollEnd);
        progress = Math.max(0, Math.min(1, progress));
      }

      setScrollProgress(progress);
    };

    const updateHeight = () => {
      setContainerHeight(container.offsetHeight);
    };

    updateHeight();
    updateProgress();

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  // Calculate the total path length
  const lineLength = containerHeight;
  const strokeDashoffset = lineLength * (1 - scrollProgress);

  // Position stations evenly along the spine
  const stationSpacing = totalStops > 1 ? containerHeight / (totalStops - 1) : 0;

  return (
    <div
      ref={containerRef}
      className={`absolute left-1/2 top-0 bottom-0 w-8 ${className}`}
      style={{ transform: 'translateX(-50%)' }}
    >
      <svg
        className="w-full h-full"
        viewBox={`0 0 32 ${containerHeight || 100}`}
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        {/* Background track (faded) */}
        <line
          x1="16"
          y1="0"
          x2="16"
          y2={containerHeight}
          stroke="var(--border)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Animated line (draws as you scroll) */}
        <line
          x1="16"
          y1="0"
          x2="16"
          y2={containerHeight}
          stroke={accentColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={lineLength}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />

        {/* Station markers */}
        {Array.from({ length: totalStops }).map((_, index) => {
          const y = totalStops > 1 ? stationSpacing * index : containerHeight / 2;
          const stationProgress = totalStops > 1 ? index / (totalStops - 1) : 0;
          const isReached = scrollProgress >= stationProgress;

          return (
            <g key={index}>
              {/* Outer ring */}
              <circle
                cx="16"
                cy={y}
                r="10"
                fill="var(--midnight)"
                stroke={isReached ? accentColor : 'var(--border)'}
                strokeWidth="3"
                style={{ transition: 'stroke 0.3s ease, fill 0.3s ease' }}
              />
              {/* Inner dot */}
              <circle
                cx="16"
                cy={y}
                r="4"
                fill={isReached ? accentColor : 'var(--border)'}
                style={{ transition: 'fill 0.3s ease' }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
