'use client';
import PubList from './PubList';
import { bermondseyPubs, bermondseyStats } from '@/content/crawls/bermondseybm';

export default function BermondseyScrollMap() {
  return (
    <PubList
      pubs={bermondseyPubs}
      totalPubs={bermondseyStats.totalPubs}
      markerColor="#D4A03C"
      markerTextColor="#1a1a1a"
      getTransport={(pub) => pub.walkToNext ?? undefined}
    />
  );
}
