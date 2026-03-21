'use client';
import PubList from './PubList';
import { CircleLinePub, circleLinePubs, circleLineStats } from '@/content/crawls/circleline';

const TFL_YELLOW = '#FFD300';
const TFL_BLUE = '#003688';
const TFL_RED = '#CC3333';

function TubeBadge({ pub }: { pub: CircleLinePub }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px',
      background: TFL_YELLOW, padding: '5px 12px 5px 8px', borderRadius: '4px',
      border: '1.5px solid #1a1a1a',
    }}>
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%',
        border: `2px solid ${TFL_RED}`, background: '#fff',
        position: 'relative', flexShrink: 0, overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', left: '-2px', right: '-2px', height: '6px',
          background: TFL_BLUE, top: '50%', transform: 'translateY(-50%)',
        }} />
      </div>
      <span style={{
        fontFamily: 'var(--font-label)', fontSize: '12px', fontWeight: 800,
        textTransform: 'uppercase' as const, letterSpacing: '0.04em',
        color: '#1a1a1a', lineHeight: 1,
      }}>
        {pub.station}
      </span>
    </div>
  );
}

export default function CircleLineScrollMap() {
  return (
    <PubList
      pubs={circleLinePubs}
      totalPubs={circleLineStats.totalPubs}
      markerColor={TFL_YELLOW}
      markerTextColor="#1a1a1a"
      renderLabel={(pub) => <TubeBadge pub={pub} />}
      getTransport={(pub) => {
        if (!pub.transportToNext) return undefined;
        const time = pub.transportTime ? `${pub.transportTime} min walk` : 'Walk';
        return time;
      }}
    />
  );
}
