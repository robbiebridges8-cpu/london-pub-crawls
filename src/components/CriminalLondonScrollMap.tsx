'use client';
import PubList from './PubList';
import { criminalLondonPubs, criminalLondonStats } from '@/content/crawls/criminallondon';

export default function CriminalLondonScrollMap() {
  return (
    <PubList
      pubs={criminalLondonPubs}
      totalPubs={criminalLondonStats.totalPubs}
      markerColor="#1A1A2E"
      markerTextColor="#fff"
      getTransport={(pub) => pub.walkToNext ?? undefined}
    />
  );
}
