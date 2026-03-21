'use client';
import PubList from './PubList';
import { literaryLondonPubs, literaryLondonStats } from '@/content/crawls/literarylondon';

export default function LiteraryLondonScrollMap() {
  return (
    <PubList
      pubs={literaryLondonPubs}
      totalPubs={literaryLondonStats.totalPubs}
      markerColor="#2E4057"
      markerTextColor="#FFFFFF"
      getTransport={(pub) => pub.walkToNext ?? undefined}
    />
  );
}
