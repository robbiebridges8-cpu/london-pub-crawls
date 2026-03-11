'use client';

import { MonopolyPub, monopolyColorGroups, getMonopolyMapsUrl } from '@/content/crawls/monopoly';

interface MonopolyPubCardProps {
  pub: MonopolyPub;
  onClick?: () => void;
}

export function MonopolyPubCard({ pub, onClick }: MonopolyPubCardProps) {
  const group = monopolyColorGroups[pub.colorGroup];
  const lightBands = ['yellow', 'lightBlue'];
  const bandTextColor = lightBands.includes(pub.colorGroup) ? '#1a1a1a' : '#fff';

  return (
    <div
      className="property-card"
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
      {/* Color band with property name */}
      <div
        style={{
          padding: '14px',
          textAlign: 'center',
          borderBottom: '2px solid #000',
          backgroundColor: group.color,
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 900,
            color: bandTextColor,
            lineHeight: 1.2,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {pub.property}
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
            fontSize: '16px',
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

        {/* Image */}
        <div
          style={{
            width: '100%',
            flex: 1,
            minHeight: '60px',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '10px',
          }}
        >
          {pub.image ? (
            <img
              src={pub.image}
              alt={pub.pubName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}
            >
              🍺
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
                color: '#000',
              }}
            >
              {pub.id}
            </span>
            <span style={{ color: '#888' }}>/26</span>
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
            href={getMonopolyMapsUrl(pub)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: '#2563eb',
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
                color: '#2563eb',
                textDecoration: 'none',
              }}
            >
              Website →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Flip card version for mobile
interface MonopolyFlipCardProps {
  pub: MonopolyPub;
  isFlipped: boolean;
  onFlip: () => void;
}

export function MonopolyFlipCard({ pub, isFlipped, onFlip }: MonopolyFlipCardProps) {
  const group = monopolyColorGroups[pub.colorGroup];
  const lightBands = ['yellow', 'lightBlue'];
  const bandTextColor = lightBands.includes(pub.colorGroup) ? '#1a1a1a' : '#fff';

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
        {/* Front - Property Card */}
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
          {/* Color band */}
          <div
            style={{
              padding: '14px',
              textAlign: 'center',
              borderBottom: '2px solid #000',
              backgroundColor: group.color,
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 900,
                color: bandTextColor,
                lineHeight: 1.2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {pub.property}
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
                fontSize: '16px',
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

            {/* Image */}
            <div
              style={{
                width: '100%',
                flex: 1,
                minHeight: '60px',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '10px',
              }}
            >
              {pub.image ? (
                <img
                  src={pub.image}
                  alt={pub.pubName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}
                >
                  🍺
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#000' }}>
                {pub.startTime} - {pub.endTime}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 700 }}>
                <span style={{ fontSize: '14px', fontWeight: 900, color: '#000' }}>{pub.id}</span>
                <span style={{ color: '#888' }}>/26</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back - Review */}
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
          {/* Color band */}
          <div
            style={{
              padding: '14px',
              textAlign: 'center',
              borderBottom: '2px solid #000',
              backgroundColor: group.color,
              color: bandTextColor,
              fontSize: '12px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {pub.property}
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
                fontSize: '16px',
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
                href={getMonopolyMapsUrl(pub)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: '12px',
                  color: '#2563eb',
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
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Website →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
