import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'London on Tap — Free Self-Guided Pub Crawls';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#FFF1E5',
          position: 'relative',
        }}
      >
        {/* Decorative top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: '#990F3D',
          }}
        />

        {/* Decorative bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: '#990F3D',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: 20,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#990F3D',
              fontWeight: 600,
            }}
          >
            Free Self-Guided Pub Crawls
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: '#1A0A00',
              lineHeight: 1,
              fontFamily: 'Georgia, serif',
            }}
          >
            London on Tap
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 3,
              background: '#C47B10',
              borderRadius: 2,
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: '#1A0A00',
              opacity: 0.7,
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
            }}
          >
            Curated routes through London&#39;s best pubs
          </div>
        </div>

        {/* URL in corner */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            right: 40,
            fontSize: 18,
            letterSpacing: '0.1em',
            color: '#990F3D',
            fontWeight: 600,
          }}
        >
          londonontap.com
        </div>
      </div>
    ),
    { ...size }
  );
}
