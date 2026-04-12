'use client';

import dynamic from 'next/dynamic';

const PubMap = dynamic(() => import('@/components/PubMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-[var(--surface)]">
      <p className="font-label text-sm uppercase tracking-wider text-[var(--muted)]">Loading map…</p>
    </div>
  ),
});

interface PubMapSectionProps {
  lat: number;
  lng: number;
  name: string;
}

export default function PubMapSection({ lat, lng, name }: PubMapSectionProps) {
  return <PubMap lat={lat} lng={lng} name={name} />;
}
