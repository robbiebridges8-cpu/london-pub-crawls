'use client';
import PubList from './PubList';
import { hauntedLondonPubs, hauntedLondonStats } from '@/content/crawls/hauntedlondon';

export default function HauntedLondonScrollMap() {
  return (
    <PubList
      pubs={hauntedLondonPubs}
      totalPubs={hauntedLondonStats.totalPubs}
      markerColor="#2C1810"
      markerTextColor="#E8DDD0"
      getTransport={(pub) => pub.walkToNext ?? undefined}
    />
  );
}
