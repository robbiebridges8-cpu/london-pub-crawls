'use client';
import PubList from './PubList';
import { MonopolyPub, monopolyPubs, monopolyColorGroups, monopolyStats } from '@/content/crawls/monopoly';

function MonopolyBadge({ pub }: { pub: MonopolyPub }) {
  const g = monopolyColorGroups[pub.colorGroup];
  const light = ['yellow', 'lightBlue'].includes(pub.colorGroup);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
      <span style={{
        display: 'inline-block', width: '14px', height: '14px', borderRadius: '2px',
        background: g.color, border: '1.5px solid rgba(0,0,0,0.15)', flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'var(--font-label)', fontSize: '12px', fontWeight: 700,
        textTransform: 'uppercase' as const, letterSpacing: '0.06em',
        color: light ? '#555' : g.color, lineHeight: 1,
      }}>
        {pub.property}
      </span>
    </div>
  );
}

export default function MonopolyScrollMap() {
  return (
    <PubList
      pubs={monopolyPubs}
      totalPubs={monopolyStats.totalPubs}
      markerColor="#990F3D"
      markerTextColor="#FFF1E5"
      renderLabel={(pub) => <MonopolyBadge pub={pub} />}
      getTransport={(pub) => {
        if (!pub.transportToNext) return undefined;
        const time = pub.transportTime ? `${pub.transportTime} min` : '';
        return `${pub.transportToNext}${time ? ` · ${time}` : ''}`;
      }}
    />
  );
}
