// =============================================================================
// app/(main)/concerts/upcoming/page.jsx — Server Component with build-time data
// =============================================================================
// WHAT CHANGED:
//   - useGoogleSheet hook (client) → getConcerts() (server, build-time)
//   - No loading spinner — data is pre-rendered into HTML
//   - Modal is extracted to a client component (ConcertModal)
//   - framer-motion AnimatePresence stays (in client component)
// =============================================================================

import Image from 'next/image';
import { getConcerts, getCleanImageUrl } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/config';
import Section from '@/components/Section';
import ConcertList from '@/components/ConcertList';

export const metadata = {
  title: 'Upcoming Concerts',
  description: `View the schedule for ${SITE_CONFIG.shortName}'s 2025/26 concert season. Find venues, programmes, and ticket links.`,
  alternates: { canonical: '/concerts/upcoming' },
  openGraph: {
    title: `Upcoming Concerts | ${SITE_CONFIG.shortName}`,
    description: 'Join us for our 2025/26 Season of classical music in Edinburgh.',
  },
};

// Structured data for concert events (geo-optimised for Edinburgh)
function getConcertEventSchema(concerts) {
  return concerts.map(c => ({
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: c.Title,
    startDate: c._isoDate,
    location: {
      '@type': 'MusicVenue',
      name: c.Venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Edinburgh',
        addressRegion: 'Scotland',
        addressCountry: 'GB',
      },
    },
    performer: { '@type': 'MusicGroup', name: SITE_CONFIG.name },
    organizer: { '@type': 'MusicGroup', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    ...(c.TicketLink && { offers: { '@type': 'Offer', url: c.TicketLink, availability: 'https://schema.org/InStock' } }),
  }));
}

export default async function UpcomingConcertsPage() {
  const { upcoming } = await getConcerts();

  return (
    <>
      {/* Inject MusicEvent structured data for each concert */}
      {upcoming.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getConcertEventSchema(upcoming)) }}
        />
      )}

      <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
        <Section title="2025/26 Season">
          {upcoming.length === 0 ? (
            <p className="text-center text-slate-400 py-20">
              No upcoming concerts at the moment. Check back soon!
            </p>
          ) : (
            /* ConcertList is a client component for the modal interactivity */
            <ConcertList concerts={JSON.parse(JSON.stringify(upcoming))} />
          )}
        </Section>
      </main>
    </>
  );
}
