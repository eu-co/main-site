// =============================================================================
// app/(main)/concerts/page.jsx — Season listing (upcoming only)
// =============================================================================
// Past concerts no longer live here — they're on the education site's archive.
// Each upcoming concert links to /concerts/[slug] for its own full page.
// =============================================================================

import Link from 'next/link';
import Image from 'next/image';
import { getConcerts, getCleanImageUrl } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/config';
import Section from '@/components/Section';

export const metadata = {
  title: 'Concerts',
  description: `Upcoming concerts for the ${SITE_CONFIG.shortName} 2025/26 season in Edinburgh.`,
  alternates: { canonical: '/concerts' },
};

export default async function ConcertsPage() {
  const { upcoming } = await getConcerts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Section title="2025/26 Season">
        <p className="text-center max-w-2xl mx-auto text-lg text-slate-400 mb-16">
          Join us for our upcoming season of chamber music in Edinburgh.
          Click any concert for full programme details and tickets.
        </p>

        {upcoming.length === 0 ? (
          <p className="text-center text-slate-500 py-20">
            Our new season will be announced soon. Check back shortly.
          </p>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Hero card for the next concert */}
            {upcoming[0] && (
              <Link href={`/concerts/${upcoming[0].slug}`}
                className="group block relative rounded-2xl overflow-hidden shadow-2xl mb-12">
                <div className="relative h-[400px] md:h-[500px]">
                  <Image
                    src={getCleanImageUrl(upcoming[0].ShowImage)}
                    alt={upcoming[0].Title}
                    fill sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">
                    Next performance
                  </p>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    {upcoming[0].Title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-slate-300 text-sm mb-6">
                    <span>{upcoming[0].Date}</span>
                    {upcoming[0].Time && <><span className="text-slate-600">|</span><span>{upcoming[0].Time}</span></>}
                    <span className="text-slate-600">|</span>
                    <span>{upcoming[0].Venue}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full group-hover:bg-blue-400 transition-colors">
                    View details and tickets →
                  </span>
                </div>
              </Link>
            )}

            {/* Remaining concerts as rows */}
            {upcoming.slice(1).map((concert, i) => {
              const d = new Date(concert.Date);
              const day = !isNaN(d.getTime()) ? d.getDate() : '';
              const month = !isNaN(d.getTime()) ? d.toLocaleString('default', { month: 'short' }).toUpperCase() : '';

              return (
                <Link key={i} href={`/concerts/${concert.slug}`}
                  className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all">
                  {/* Date badge */}
                  <div className="flex-shrink-0 flex md:flex-col items-center gap-2 md:gap-0 bg-slate-800 group-hover:bg-slate-700 transition-colors rounded-xl p-4 min-w-[90px] text-center border border-slate-700">
                    <span className="text-2xl font-bold text-white">{day}</span>
                    <span className="text-sm text-blue-400 font-bold uppercase">{month}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {concert.Title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {concert.Time && `${concert.Time} · `}{concert.Venue}
                    </p>
                    {concert.Programme && (
                      <p className="text-slate-500 text-sm italic mt-2 line-clamp-1">
                        {concert.Programme}
                      </p>
                    )}
                  </div>
                  <span className="text-slate-600 group-hover:text-white text-sm transition-colors">
                    View →
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Link to archive on education site */}
        <div className="text-center mt-20 pt-12 border-t border-slate-800">
          <p className="text-slate-500 text-sm mb-4">Looking for past concerts?</p>
          <a href="https://education.eu-co.co.uk/archive"
            className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
            Browse our concert archive on the Education Hub →
          </a>
        </div>
      </Section>
    </main>
  );
}
