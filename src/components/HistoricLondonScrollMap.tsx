'use client';
import PubList from './PubList';
import { historicLondonPubs, historicLondonStats } from '@/content/crawls/historiclondon';

export default function HistoricLondonScrollMap() {
  return (
    <PubList
      pubs={historicLondonPubs}
      totalPubs={historicLondonStats.totalPubs}
      markerColor="#8B4513"
      markerTextColor="#FFFFFF"
      getTransport={(pub) => pub.walkToNext ?? undefined}
    />
  );
}
