'use client';

import { RipperPub, getRipperMapsUrl } from '@/content/crawls/ripper';

interface RipperStationCardProps {
  pub: RipperPub;
  onClick?: () => void;
}

export function RipperStationCard({ pub, onClick }: RipperStationCardProps) {
  return (
    <div
      className="ripper-card"
      onClick={onClick}
      style={{
        width: '215px',
        aspectRatio: '3 / 4.5',
        background: '#F5F0E6',
        border: '2px solid #1C1C1C',
        borderRadius: '2px',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        flex: '0 0 auto',
        alignSelf: 'start',
        boxShadow: '3px 3px 0 rgba(0,0,0,0.15)',
      }}
    >
      {/* Dark header band - like a newspaper masthead */}
      <div
        style={{
          padding: '12px 14px',
          textAlign: 'center',
          borderBottom: '2px solid #1C1C1C',
          backgroundColor: '#1C1C1C',
        }}
      >
        <div
          style={{
            fontSize: '8px',
            fontWeight: 700,
            color: '#8B1A1A',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}
        >
          Stop {pub.id} of 7
        </div>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 900,
            color: '#F5F0E6',
            lineHeight: 1.2,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontFamily: 'Georgia, serif',
          }}
        >
          {pub.pubName}
        </span>
      </div>

      {/* Card body - newspaper style */}
      <div
        style={{
          padding: '14px 16px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Ripper connection - like a headline */}
        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            color: '#8B1A1A',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px',
            paddingBottom: '8px',
            borderBottom: '1px solid #1C1C1C',
            fontFamily: 'Georgia, serif',
          }}
        >
          {pub.ripperConnection}
        </div>

        {/* Address */}
        <div
          style={{
            fontSize: '9px',
            color: '#666',
            marginBottom: '10px',
            fontStyle: 'italic',
          }}
        >
          {pub.address}, {pub.postcode}
        </div>

        {/* Review preview - newspaper column style */}
        <div
          style={{
            fontSize: '10px',
            color: '#333',
            lineHeight: 1.5,
            flex: 1,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            fontFamily: 'Georgia, serif',
          }}
        >
          {pub.review}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
            paddingTop: '10px',
            borderTop: '1px solid #1C1C1C',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#1C1C1C',
            }}
          >
            {pub.startTime} - {pub.endTime}
          </div>
          {pub.walkToNext && (
            <div
              style={{
                fontSize: '9px',
                color: '#666',
              }}
            >
              {pub.walkToNext} min walk
            </div>
          )}
        </div>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid #ddd',
          }}
        >
          <a
            href={getRipperMapsUrl(pub)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: '9px',
              fontWeight: 600,
              color: '#8B1A1A',
              textDecoration: 'none',
            }}
          >
            Open in Maps
          </a>
          {pub.website && (
            <a
              href={pub.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: '9px',
                fontWeight: 600,
                color: '#8B1A1A',
                textDecoration: 'none',
              }}
            >
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Flip card version for mobile
interface RipperStationFlipCardProps {
  pub: RipperPub;
  isFlipped: boolean;
  onFlip: () => void;
}

export function RipperStationFlipCard({ pub, isFlipped, onFlip }: RipperStationFlipCardProps) {
  return (
    <div
      onClick={onFlip}
      style={{
        width: '100%',
        maxWidth: '280px',
        aspectRatio: '3 / 4.5',
        perspective: '1000px',
        cursor: 'pointer',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        {/* Front */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            background: '#F5F0E6',
            border: '2px solid #1C1C1C',
            borderRadius: '2px',
            overflow: 'hidden',
            boxShadow: '3px 3px 0 rgba(0,0,0,0.15)',
          }}
        >
          {/* Dark header */}
          <div
            style={{
              padding: '14px',
              textAlign: 'center',
              borderBottom: '2px solid #1C1C1C',
              backgroundColor: '#1C1C1C',
            }}
          >
            <div
              style={{
                fontSize: '9px',
                fontWeight: 700,
                color: '#8B1A1A',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Stop {pub.id} of 7
            </div>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 900,
                color: '#F5F0E6',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: 'Georgia, serif',
              }}
            >
              {pub.pubName}
            </span>
          </div>

          {/* Body */}
          <div
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            {/* Connection headline */}
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#8B1A1A',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '10px',
                paddingBottom: '10px',
                borderBottom: '1px solid #1C1C1C',
                fontFamily: 'Georgia, serif',
              }}
            >
              {pub.ripperConnection}
            </div>

            <div
              style={{
                fontSize: '10px',
                color: '#666',
                marginBottom: '12px',
                fontStyle: 'italic',
              }}
            >
              {pub.address}, {pub.postcode}
            </div>

            <div
              style={{
                fontSize: '11px',
                color: '#333',
                lineHeight: 1.5,
                flex: 1,
                overflow: 'hidden',
                fontFamily: 'Georgia, serif',
              }}
            >
              {pub.review.length > 180 ? pub.review.slice(0, 180) + '...' : pub.review}
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '12px',
              paddingTop: '10px',
              borderTop: '1px solid #1C1C1C',
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1C1C1C' }}>
                {pub.startTime} - {pub.endTime}
              </div>
              {pub.walkToNext && (
                <div style={{ fontSize: '10px', color: '#666' }}>
                  {pub.walkToNext} min walk
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back - Historic Notes */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            background: '#1C1C1C',
            border: '2px solid #8B1A1A',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px',
              textAlign: 'center',
              borderBottom: '2px solid #8B1A1A',
              backgroundColor: '#8B1A1A',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                fontWeight: 900,
                color: '#F5F0E6',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}
            >
              Historic Notes
            </span>
          </div>

          {/* Body */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                fontWeight: 900,
                color: '#D4A853',
                letterSpacing: '0.02em',
                marginBottom: '14px',
                fontFamily: 'Georgia, serif',
              }}
            >
              {pub.pubName}
            </div>

            <div
              style={{
                fontSize: '12px',
                lineHeight: 1.6,
                color: '#F5F0E6',
                flex: 1,
                overflowY: 'auto',
                fontFamily: 'Georgia, serif',
              }}
            >
              {pub.historicNotes}
            </div>

            {/* Links */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '12px',
                borderTop: '1px solid #8B1A1A',
              }}
            >
              <a
                href={getRipperMapsUrl(pub)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: '11px',
                  color: '#D4A853',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Maps
              </a>
              {pub.website && (
                <a
                  href={pub.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: '11px',
                    color: '#D4A853',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
