'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { SITE_CONFIG } from '@/lib/config';

// Initializes PostHog in the browser and starts autocapture. The 2025-05-24
// defaults capture $pageview on every App Router navigation, so single-page
// route changes are tracked without a manual page-view listener.
export function PostHogProvider({ children }) {
  useEffect(() => {
    if (!SITE_CONFIG.posthog.key) return;
    posthog.init(SITE_CONFIG.posthog.key, {
      api_host: SITE_CONFIG.posthog.host,
      defaults: '2025-05-24',
    });
  }, []);

  return children;
}
