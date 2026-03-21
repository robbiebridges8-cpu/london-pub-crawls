'use client';
import PubList from './PubList';
import { ripperPubs, ripperStats } from '@/content/crawls/ripper';

export default function RipperScrollMap() {
  return (
    <PubList
      pubs={ripperPubs}
      totalPubs={ripperStats.totalPubs}
      markerColor="#1C1C1C"
      markerTextColor="#F5F0E6"
      getTransport={(pub) => pub.walkToNext ? `${pub.walkToNext} min walk` : undefined}
    />
  );
}
