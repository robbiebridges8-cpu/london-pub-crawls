'use client';

import { HeroUIProvider } from '@heroui/react';
import { PostHogProvider } from './PostHogProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <PostHogProvider>{children}</PostHogProvider>
    </HeroUIProvider>
  );
}
