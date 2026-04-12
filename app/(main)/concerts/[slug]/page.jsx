// =============================================================================
// app/(main)/concerts/[slug]/page.jsx — Individual concert page
// =============================================================================
// Each concert in the Google Sheet gets its own URL:
//   /concerts/mendelssohn-and-bruch-november-2025
//
// The slug is either:
//   a) Set explicitly in a "Slug" column in the sheet
//   b) Auto-generated from the title + date
//
// This page is statically generated at build time for all known concerts
// via generateStaticParams, so it loads instantly with zero client JS.
// =============================================================================

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getConcerts, getConcertBySlug, getCleanImageUrl } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/config';

// ── Generate all concert slugs at build time ────────────────────────────────

export async function generateStaticParams() {
  const { all } = await getConcerts();
  return all.map(c => ({ slug: c.slug }));
}

// ── Dynamic metadata per concert ────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const concert = await getConcertBySlug(slug);
  if (!concert) return { title: 'Concert Not Found' };

  return {
    title: concert.Title,
    description: concert.Description || `${concert.Title} — ${concert.Date} at ${concert.Venue}`,
    alternates: { canonical: `/concerts/${slug}` },
    openGraph: {
      title: `${concert.Title} | ${SITE_CONFIG.shortName}`,
      description: `${concert.Date} at ${concert.Venue}, Edinburgh`,
      images: concert.ShowImage ? [{ url: getCleanImageUrl(concert.ShowImage) }] : [],
    },
  };
}

export default async function ConcertPage({ params }) {
  const { slug } = await params;
  const concert = await getConcertBySlug(slug);
  if (!concert) notFound();

  const {
    Title, Date: dateStr, Time, Programme, Description,
    Venue, City, TicketLink, ShowImage,
  } = concert;

  const img = getCleanImageUrl(ShowImage);
  const d = new Date(dateStr);
  const fullDate = !isNaN(d.getTime())
    ? d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : dateStr;
  const programmeList = Programme ? Programme.split(',').map(s => s.trim()) : [];
  const isPast = d < new Date();

  // MusicEvent structured data for Google
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: Title,
    startDate: concert._isoDate,
    location: {
      '@type': 'MusicVenue',
      name: Venue,
      address: { '@type': 'PostalAddress', addressLocality: City || 'Edinburgh', addressRegion: 'Scotland', addressCountry: 'GB' },
    },
    performer: { '@type': 'MusicGroup', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    ...(TicketLink && { offers: { '@type': 'Offer', url: TicketLink, availability: 'https://schema.org/InStock' } }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />

      <article className="min-h-screen bg-slate-950 text-slate-100">
        {/* ── Hero Image ─────────────────────────────────────────────── */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={img} alt={Title} fill sizes="100vw"
            className={`object-cover ${isPast ? 'grayscale opacity-60' : ''}`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Back link */}
          <Link href="/concerts"
            className="absolute top-6 left-6 z-10 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
            ← All concerts
          </Link>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            {isPast && (
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase text-slate-400 bg-slate-800/80 rounded-full mb-4">
                Archived event
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              {Title}
            </h1>
            <div className="flex flex-wrap gap-4 text-lg text-slate-300">
              <span>{fullDate}</span>
              {Time && <><span className="text-slate-600">|</span><span>{Time}</span></>}
              <span className="text-slate-600">|</span>
              <span>{Venue}{City ? `, ${City}` : ''}</span>
            </div>
          </div>
        </div>

        {/* ── Content ────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Ticket CTA (upcoming only) */}
          {!isPast && TicketLink && (
            <a href={TicketLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-5 mb-12 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-1">
              Book Tickets
            </a>
          )}

          {!isPast && !TicketLink && (
            <div className="text-center py-5 mb-12 border border-slate-700 rounded-2xl text-slate-400 italic">
              Tickets available soon
            </div>
          )}

          {/* Programme */}
          {programmeList.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xs font-bold text-blue-400 tracking-[0.3em] uppercase mb-6">
                Programme
              </h2>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <ul className="space-y-3">
                  {programmeList.map((piece, i) => (
                    <li key={i} className="text-lg text-slate-200 italic border-b border-slate-800 last:border-0 pb-3 last:pb-0">
                      {piece}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Description */}
          {Description && (
            <section className="mb-12">
              <h2 className="text-xs font-bold text-blue-400 tracking-[0.3em] uppercase mb-6">
                About this concert
              </h2>
              <div className="text-slate-300 text-lg leading-relaxed">
                <p>{Description}</p>
              </div>
            </section>
          )}

          {/* Venue info */}
          <section className="mb-12">
            <h2 className="text-xs font-bold text-blue-400 tracking-[0.3em] uppercase mb-6">
              Venue
            </h2>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-6">
                <p className="text-xl font-semibold text-white">{Venue}</p>
                <p className="text-slate-400">{City || 'Edinburgh'}, Scotland</p>
              </div>
              {/* Google Maps embed for Reid Concert Hall (default venue) */}
              {Venue?.includes('Reid') && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2234!2d-3.1858!3d55.9468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4887c7843fdb2547%3A0x9b2e5b8f7e9c2f3a!2sReid%20Concert%20Hall!5e0!3m2!1sen!2suk"
                  width="100%" height="250" style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${Venue}`}
                  className="rounded-b-2xl"
                />
              )}
            </div>
          </section>

          {/* Navigation to other concerts */}
          <div className="flex justify-between pt-8 border-t border-slate-800">
            <Link href="/concerts" className="text-blue-400 hover:text-blue-300 transition-colors">
              ← Back to season
            </Link>
            {isPast && (
              <a href="https://education.eu-co.co.uk/archive"
                className="text-blue-400 hover:text-blue-300 transition-colors">
                Full archive →
              </a>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
