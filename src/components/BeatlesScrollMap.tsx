'use client';
import PubList from './PubList';
import { beatlesPubs, beatlesStats } from '@/content/crawls/beatles';

export default function BeatlesScrollMap() {
  return (
    <PubList
      pubs={beatlesPubs}
      totalPubs={beatlesStats.totalPubs}
      markerColor="#003087"
      markerTextColor="#fff"
      getTransport={(pub) => pub.walkToNext ?? undefined}
    />
  );
}
