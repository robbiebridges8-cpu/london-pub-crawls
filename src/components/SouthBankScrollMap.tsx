'use client';
import PubList from './PubList';
import { southBankPubs, southBankStats } from '@/content/crawls/southbank';

export default function SouthBankScrollMap() {
  return (
    <PubList
      pubs={southBankPubs}
      totalPubs={southBankStats.totalPubs}
      markerColor="#0098D4"
      markerTextColor="#FFFFFF"
      getTransport={(pub) => pub.walkToNext ?? undefined}
    />
  );
}
