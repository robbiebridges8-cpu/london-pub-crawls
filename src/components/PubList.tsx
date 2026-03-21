'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { BasePub } from '@/content/crawls/types';
import { useCrawlContext } from './CrawlContext';

export interface PubListProps<T extends BasePub> {
  pubs: T[];
  totalPubs: number;
  markerColor: string;
  markerTextColor: string;
  getTransport?: (pub: T) => string | undefined;
  renderLabel?: (pub: T) => ReactNode;
  onPubClick?: (pubId: number) => void;
}

export default function PubList<T extends BasePub>({
  pubs,
  totalPubs,
  markerColor,
  markerTextColor,
  getTransport,
  renderLabel,
  onPubClick,
}: PubListProps<T>) {
  const { onPubClick: contextPubClick } = useCrawlContext();
  const handlePubClick = onPubClick ?? contextPubClick;
  const mc = markerColor;
  const mtc = markerTextColor;
  const spineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  const mapsUrl = (pub: BasePub) =>
    `https://www.google.com/maps/search/?api=1&query=${pub.lat},${pub.lng}`;

  // Scroll-driven progress spine
  useEffect(() => {
    const spine = spineRef.current;
    const progress = progressRef.current;
    if (!spine || !progress) return;

    const update = () => {
      const dots = spine.querySelectorAll<HTMLDivElement>('.tl-dot');
      if (dots.length === 0) return;

      const spineRect = spine.getBoundingClientRect();
      // The fixed map covers the top of the viewport on mobile.
      // Find its bottom edge so we know where visible content starts.
      const mapEl = document.querySelector('.map-fixed');
      const mapBottom = mapEl ? mapEl.getBoundingClientRect().bottom : 0;
      const navHeight = 72; // 4.5rem
      const contentStart = Math.max(mapBottom, navHeight);
      // Trigger: midpoint of the visible content area (between map bottom and viewport bottom)
      const triggerY = contentStart + (window.innerHeight - contentStart) * 0.5;
      const firstDot = dots[0];
      const firstDotY = firstDot.getBoundingClientRect().top + 14 - spineRect.top;

      // Find which dots we've passed and interpolate between them
      let lastPassedIdx = -1;
      let nextIdx = 0;
      let interpProgress = 0;

      for (let i = 0; i < dots.length; i++) {
        const dotCenter = dots[i].getBoundingClientRect().top + dots[i].offsetHeight / 2;
        if (dotCenter <= triggerY) {
          lastPassedIdx = i;
        } else {
          nextIdx = i;
          break;
        }
        if (i === dots.length - 1) nextIdx = i;
      }

      // Calculate continuous fill height by interpolating between last passed and next dot
      let fillHeight = 0;
      if (lastPassedIdx >= 0) {
        const passedDotRect = dots[lastPassedIdx].getBoundingClientRect();
        const passedY = passedDotRect.top + dots[lastPassedIdx].offsetHeight / 2 - spineRect.top;
        fillHeight = passedY - firstDotY;

        // Interpolate towards next dot if there is one
        if (nextIdx > lastPassedIdx && nextIdx < dots.length) {
          const nextDotRect = dots[nextIdx].getBoundingClientRect();
          const nextDotCenter = nextDotRect.top + dots[nextIdx].offsetHeight / 2;
          const passedDotCenter = passedDotRect.top + dots[lastPassedIdx].offsetHeight / 2;
          const gap = nextDotCenter - passedDotCenter;
          if (gap > 0) {
            const scrolledPast = triggerY - passedDotCenter;
            interpProgress = Math.min(1, Math.max(0, scrolledPast / gap));
            const nextY = nextDotRect.top + dots[nextIdx].offsetHeight / 2 - spineRect.top;
            fillHeight = (passedY - firstDotY) + interpProgress * (nextY - passedY);
          }
        }
      }

      progress.style.top = `${firstDotY}px`;
      progress.style.height = `${Math.max(0, fillHeight)}px`;

      // Update dot states
      dots.forEach((dot, i) => {
        dot.classList.toggle('tl-dot-filled', i <= lastPassedIdx);
        dot.classList.toggle('tl-dot-unfilled', i > lastPassedIdx);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [pubs]);

  return (
    <div ref={spineRef} className="tl-spine" style={{ '--mc': mc, '--mtc': mtc } as React.CSSProperties}>
      {/* Background track */}
      <div className="tl-track" />
      {/* Progress fill */}
      <div ref={progressRef} className="tl-progress" />

      {/* Start */}
      <div className="tl-bookend">
        <div className="tl-bookend-dot" style={{ background: mc }} />
        <span className="tl-bookend-text">Start</span>
      </div>

      {pubs.map((pub, i) => {
        const transport = getTransport ? getTransport(pub) : undefined;
        const isLast = i === pubs.length - 1;

        return (
          <div key={pub.id} id={`pub-card-${pub.id}`}>
            <div
              className="tl-pub"
              onClick={() => handlePubClick?.(pub.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePubClick?.(pub.id);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="tl-dot tl-dot-unfilled" style={{ '--mc': mc, '--mtc': mtc } as React.CSSProperties}>
                {pub.id}
              </div>
              <div className="tl-content">
                {renderLabel && renderLabel(pub)}
                <h3 className="tl-name">{pub.pubName}</h3>
                <p className="tl-addr">{pub.address}, {pub.postcode}</p>
                <p className="tl-desc">{pub.review}</p>
                <div className="tl-links">
                  <a href={mapsUrl(pub)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                    Open in Maps
                  </a>
                  {pub.website && (
                    <>
                      <span className="tl-links-sep">·</span>
                      <a href={pub.website} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                        Website
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            {!isLast && transport && (
              <div className="tl-walk">
                <span className="tl-walk-text">↓ {transport}</span>
              </div>
            )}
          </div>
        );
      })}

      {/* End */}
      <div className="tl-bookend tl-bookend-end">
        <div className="tl-bookend-dot" style={{ background: mc }} />
        <span className="tl-bookend-text">End of crawl</span>
      </div>

      <style jsx>{`
        .tl-spine {
          position: relative;
          padding: 16px 0 24px 48px;
        }

        /* Track + progress */
        .tl-track {
          position: absolute; left: 9px; top: 16px; bottom: 24px;
          width: 2px; background: var(--surface); z-index: 0;
        }
        .tl-progress {
          position: absolute; left: 9px; top: 16px;
          height: 0; width: 2px;
          background: var(--mc); z-index: 1;
          transition: height 0.25s ease;
        }

        .tl-bookend {
          display: flex; align-items: center; gap: 10px;
          padding: 0 0 12px; position: relative;
        }
        .tl-bookend-end { padding: 12px 0 0; }
        .tl-bookend-dot {
          width: 10px; height: 10px; border-radius: 50%;
          position: absolute; left: -24px; top: 4px; z-index: 2;
        }
        .tl-bookend-end .tl-bookend-dot { top: 16px; }
        .tl-bookend-text {
          font-family: var(--font-label);
          font-size: 12px; font-weight: 600;
          text-transform: uppercase; color: var(--muted);
        }

        .tl-pub {
          position: relative;
          padding-bottom: 12px;
          cursor: pointer;
        }
        .tl-pub:hover .tl-name { color: var(--claret); }

        .tl-dot {
          position: absolute; left: -38px; top: 0;
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-label);
          font-size: 13px; font-weight: 700;
          z-index: 2; transition: all 0.2s ease;
        }
        .tl-dot-filled {
          background: var(--mc) !important; color: var(--mtc) !important;
        }
        .tl-dot-unfilled {
          background: var(--surface) !important; color: var(--muted) !important;
        }

        .tl-name {
          font-family: var(--font-display);
          font-size: 20px; font-weight: 700;
          color: var(--ink); line-height: 1.2;
          margin: 0 0 2px; transition: color 0.15s ease;
        }
        .tl-addr {
          font-family: var(--font-body);
          font-size: 13px; font-weight: 400;
          color: var(--muted); margin: 0 0 10px;
          line-height: 1.3;
        }
        .tl-desc {
          font-family: var(--font-card);
          font-size: 14.5px; font-weight: 400;
          color: #3D2E1F; line-height: 1.6;
          margin: 0 0 10px;
        }
        .tl-links {
          display: flex; align-items: center; gap: 6px;
        }
        .tl-links a {
          font-family: var(--font-body);
          font-size: 13px; font-weight: 500;
          color: var(--teal); text-decoration: none;
        }
        .tl-links a:hover { text-decoration: underline; }
        .tl-links-sep { color: var(--muted); font-size: 11px; }

        .tl-walk { padding: 8px 0; }
        .tl-walk-text {
          font-family: var(--font-body);
          font-size: 12.5px; font-weight: 400;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
}
