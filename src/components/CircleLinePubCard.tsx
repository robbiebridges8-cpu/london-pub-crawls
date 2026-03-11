'use client';

import { CircleLinePub, getCircleLineMapsUrl } from '@/content/crawls/circleline';

interface CircleLineStationCardProps {
  pub: CircleLinePub;
  onClick?: () => void;
}

export function CircleLineStationCard({ pub, onClick }: CircleLineStationCardProps) {
  return (
    <div
      className="circle-line-card"
      onClick={onClick}
      style={{
        width: '215px',
        aspectRatio: '3 / 4.5',
        background: '#FFFFFF',
        border: '2px solid #000',
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        flex: '0 0 auto',
        alignSelf: 'start',
      }}
    >
      {/* TfL-style header band with Circle Line yellow */}
      <div
        style={{
          padding: '14px',
          textAlign: 'center',
          borderBottom: '2px solid #000',
          backgroundColor: '#FFD300',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {/* Roundel icon */}
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#003688',
            border: '2px solid #fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 900,
              color: '#fff',
            }}
          >
            {pub.id}
          </span>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 900,
            color: '#1a1a1a',
            lineHeight: 1.2,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {pub.station}
        </span>
      </div>

      {/* Card body */}
      <div
        style={{
          padding: '16px 18px 14px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            fontSize: '15px',
            fontWeight: 900,
            color: '#000',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            marginBottom: '6px',
            lineHeight: 1.15,
          }}
        >
          {pub.pubName.toUpperCase()}
        </div>

        <div
          style={{
            fontSize: '10px',
            color: '#444',
            marginBottom: '12px',
            lineHeight: 1.3,
          }}
        >
          {pub.address}, {pub.postcode}
        </div>

        <div
          style={{
            height: '1px',
            background: '#000',
            margin: '0 0 12px',
          }}
        />

        {/* Review preview */}
        <div
          style={{
            fontSize: '11px',
            color: '#333',
            lineHeight: 1.4,
            flex: 1,
            overflow: 'hidden',
            textAlign: 'left',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
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
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid #ddd',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#000',
            }}
          >
            {pub.startTime} - {pub.endTime}
          </div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: 900,
                color: '#003688',
              }}
            >
              {pub.id}
            </span>
            <span style={{ color: '#888' }}>/27</span>
          </div>
        </div>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
            paddingTop: '10px',
            borderTop: '1px solid #ddd',
          }}
        >
          <a
            href={getCircleLineMapsUrl(pub)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: '#003688',
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
                fontSize: '10px',
                fontWeight: 600,
                color: '#003688',
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
interface CircleLineStationFlipCardProps {
  pub: CircleLinePub;
  isFlipped: boolean;
  onFlip: () => void;
}

export function CircleLineStationFlipCard({ pub, isFlipped, onFlip }: CircleLineStationFlipCardProps) {
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
        {/* Front - Station Card */}
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
            background: '#FFFFFF',
            border: '2px solid #000',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          {/* Yellow header band */}
          <div
            style={{
              padding: '14px',
              textAlign: 'center',
              borderBottom: '2px solid #000',
              backgroundColor: '#FFD300',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#003688',
                border: '2px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff' }}>
                {pub.id}
              </span>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#1a1a1a',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {pub.station}
            </span>
          </div>

          {/* Card body */}
          <div
            style={{
              padding: '16px 18px 14px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: '15px',
                fontWeight: 900,
                color: '#000',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                marginBottom: '6px',
                lineHeight: 1.15,
              }}
            >
              {pub.pubName.toUpperCase()}
            </div>

            <div
              style={{
                fontSize: '10px',
                color: '#444',
                marginBottom: '12px',
                lineHeight: 1.3,
              }}
            >
              {pub.address}, {pub.postcode}
            </div>

            <div style={{ height: '1px', background: '#000', margin: '0 0 12px' }} />

            {/* Review preview */}
            <div
              style={{
                fontSize: '11px',
                color: '#333',
                lineHeight: 1.4,
                flex: 1,
                overflow: 'hidden',
                textAlign: 'left',
              }}
            >
              {pub.review.length > 150 ? pub.review.slice(0, 150) + '...' : pub.review}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#000' }}>
                {pub.startTime} - {pub.endTime}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 700 }}>
                <span style={{ fontSize: '14px', fontWeight: 900, color: '#003688' }}>{pub.id}</span>
                <span style={{ color: '#888' }}>/27</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back - Full Review */}
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
            background: '#fff',
            border: '2px solid #000',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          {/* Yellow header band */}
          <div
            style={{
              padding: '14px',
              textAlign: 'center',
              borderBottom: '2px solid #000',
              backgroundColor: '#FFD300',
              color: '#1a1a1a',
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {pub.station}
          </div>

          {/* Review body */}
          <div
            style={{
              flex: 1,
              padding: '16px 18px 18px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '15px',
                fontWeight: 900,
                textAlign: 'center',
                color: '#000',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
                lineHeight: 1.15,
              }}
            >
              {pub.pubName.toUpperCase()}
            </div>

            <div style={{ height: '1px', background: '#000', margin: '0 0 16px' }} />

            <div
              style={{
                fontSize: '12px',
                lineHeight: 1.5,
                color: '#000',
                flex: 1,
                overflowY: 'auto',
                textAlign: 'left',
              }}
            >
              {pub.review}
            </div>

            {/* Meta */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '12px',
              }}
            >
              <a
                href={getCircleLineMapsUrl(pub)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: '12px',
                  color: '#003688',
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
                    fontSize: '12px',
                    color: '#003688',
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
