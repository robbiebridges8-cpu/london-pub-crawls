'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { BasePub } from '@/content/crawls/types';
import { getPubSlug } from '@/lib/pubs';
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
  const [collapsedPubs, setCollapsedPubs] = useState<Set<number>>(new Set());
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

      // The "cursor" sits at the middle of the visible content area
      // When the map is open on mobile, offset past it
      const mapEl = document.querySelector('.map-fixed.map-open') as HTMLElement | null;
      const mapBottom = mapEl ? mapEl.getBoundingClientRect().bottom : 0;
      const visibleTop = Math.max(mapBottom, 0);
      const cursorY = visibleTop + (window.innerHeight - visibleTop) * 0.5;

      // How far the cursor is into the spine (in spine-local coords)
      const cursorInSpine = cursorY - spineRect.top;

      // Get first dot and end bookend positions relative to spine
      const firstDot = dots[0];
      const endEl = spine.querySelector('.tl-bookend-end .tl-bookend-dot') as HTMLElement | null;
      const lastEl = endEl || dots[dots.length - 1];

      const firstCenter = firstDot.getBoundingClientRect().top + firstDot.offsetHeight / 2 - spineRect.top;
      const endCenter = lastEl.getBoundingClientRect().top + lastEl.offsetHeight / 2 - spineRect.top;

      // Clamp the fill to between first dot and end
      const fillTo = Math.min(endCenter, Math.max(firstCenter, cursorInSpine));
      const fillHeight = fillTo - firstCenter;

      progress.style.top = `${firstCenter}px`;
      progress.style.height = `${Math.max(0, fillHeight)}px`;

      // Dot states: filled if they're above the cursor
      dots.forEach((dot) => {
        const dotY = dot.getBoundingClientRect().top + dot.offsetHeight / 2 - spineRect.top;
        dot.classList.toggle('tl-dot-filled', dotY <= fillTo + 2);
        dot.classList.toggle('tl-dot-unfilled', dotY > fillTo + 2);
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
                <h3 className="tl-name">
                  {(() => {
                    const slug = getPubSlug(pub.pubName, pub.address);
                    return slug ? (
                      <Link href={`/pubs/${slug}`} className="tl-pub-link" onClick={e => e.stopPropagation()}>
                        {pub.pubName}
                      </Link>
                    ) : pub.pubName;
                  })()}
                </h3>
                <p className="tl-addr">{pub.address}, {pub.postcode}</p>
                <p className={`tl-desc ${collapsedPubs.has(pub.id) ? 'hidden' : ''}`}>{pub.review}</p>
                <button
                  className="tl-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCollapsedPubs(prev => {
                      const next = new Set(prev);
                      if (next.has(pub.id)) next.delete(pub.id);
                      else next.add(pub.id);
                      return next;
                    });
                  }}
                >
                  {collapsedPubs.has(pub.id) ? 'Read more' : 'Show less'}
                </button>
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
        .tl-pub-link {
          color: inherit; text-decoration: none;
        }
        .tl-pub-link:hover { text-decoration: underline; }

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
        .tl-toggle {
          font-family: var(--font-body);
          font-size: 13px; font-weight: 500;
          color: var(--teal); background: none; border: none;
          padding: 0; margin: 0 0 10px; cursor: pointer;
        }
        .tl-toggle:hover { text-decoration: underline; }

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
