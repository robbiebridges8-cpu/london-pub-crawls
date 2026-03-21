'use client';

import { createContext, useContext } from 'react';

interface CrawlContextValue {
  onPubClick?: (pubId: number) => void;
}

export const CrawlContext = createContext<CrawlContextValue>({});

export function useCrawlContext() {
  return useContext(CrawlContext);
}
