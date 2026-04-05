// =============================================================================
// app/layout.jsx — ROOT LAYOUT (replaces index.js + BrowserRouter wrapper)
// =============================================================================
// WHAT CHANGED:
//   - BrowserRouter is gone (Next.js handles routing via file system)
//   - ScrollToTop is gone (Next.js does this automatically)
//   - Global CSS is imported here instead of index.js
//   - Metadata API replaces manual <title>/<meta> tags on every page
//   - Organization schema is injected once here, not repeated per page
// =============================================================================

import './globals.css';
import { SITE_CONFIG, getOrganizationSchema } from '@/lib/config';

// ── GLOBAL METADATA (Next.js Metadata API) ─────────────────────────────────
// This replaces the manual <title> and <meta> tags you had in every component.
// Each page can OVERRIDE these defaults via its own `export const metadata`.
export const metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Live Classical Music in Edinburgh`,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [{ url: '/images/FullOrchestra.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  // Geo meta tags for local SEO
  other: {
    'geo.region': 'GB-SCT',
    'geo.placename': 'Edinburgh',
    'geo.position': `${SITE_CONFIG.geo.latitude};${SITE_CONFIG.geo.longitude}`,
    'ICBM': `${SITE_CONFIG.geo.latitude}, ${SITE_CONFIG.geo.longitude}`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body className="bg-black text-white min-h-screen font-sans">
        {/* Organization schema — injected once, applies to all pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
        />
        {children}
      </body>
    </html>
  );
}
