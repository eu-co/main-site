// =============================================================================
// app/(main)/page.jsx — HOME PAGE (Server Component)
// =============================================================================
// WHAT CHANGED:
//   - This is a SERVER COMPONENT — no useState, useEffect, lazy imports needed
//   - Concert data is fetched at build time (zero loading spinners)
//   - Images use next/image → auto WebP/AVIF, responsive srcset, lazy loading
//   - Metadata uses Next.js Metadata API instead of manual <title>/<meta>
//   - Hero scroll effect is extracted to a client component (HeroSection)
//   - The <Suspense> / React.lazy pattern is GONE — Next.js code-splits per page
// =============================================================================

import Image from 'next/image';
import Link from 'next/link';
import { getConcerts, getCleanImageUrl } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/config';
import HeroSection from '@/components/HeroSection';
import SignupForm from '@/components/SignupForm';

// ── Page-specific metadata (overrides root layout defaults) ────────────────
export const metadata = {
  title: `${SITE_CONFIG.name} | Live Classical Music in Edinburgh`,
  description: `Discover the ${SITE_CONFIG.name}, Edinburgh's leading student orchestra. Find upcoming concerts, book tickets, and learn more.`,
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  // Data is fetched at BUILD TIME on the server — no loading spinner
  const { upcoming } = await getConcerts();
  const nextConcert = upcoming[0];

  return (
    <main>
      {/* ── Hero Section (client component for scroll opacity effect) ──── */}
      <HeroSection />

      {/* ── Upcoming Concert Teaser ────────────────────────────────────── */}
      {nextConcert && (
        <section className="relative bg-black py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Upcoming Performances
                </h2>
                <p className="text-slate-400">Join us for our 2025/26 Season</p>
              </div>
              <Link href="/concerts/upcoming"
                className="hidden md:flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                View Full Schedule →
              </Link>
            </div>

            <Link href="/concerts/upcoming"
              className="block max-w-5xl mx-auto bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-900/20 transition-shadow">
              <div className="flex flex-col md:flex-row">
                {/* IMAGE: next/image auto-converts to WebP, generates srcset */}
                <div className="w-full md:w-1/2 h-48 md:h-[400px] relative">
                  <Image
                    src={getCleanImageUrl(nextConcert.ShowImage)}
                    alt={nextConcert.Title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                  <p className="text-blue-400 font-bold uppercase tracking-wider text-xs mb-3">
                    {nextConcert.Date}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {nextConcert.Title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-6">{nextConcert.Venue}</p>
                  <span className="inline-flex items-center gap-2 self-start bg-white text-black px-6 py-3 rounded-full font-bold">
                    Ticket Info →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── About Teaser ───────────────────────────────────────────────── */}
      <section className="relative w-full py-24 bg-black">
        <div className="container mx-auto px-6 text-center">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-6">Est. 1983</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            40 Years of Musical Excellence
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed mb-10">
            Edinburgh University Chamber Orchestra brings together the most talented
            student musicians to perform a wide range of music at the highest level.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/about/our-story"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-blue-50 hover:scale-105 transition-all">
              Discover Our Story →
            </Link>
            <Link href="/about/auditions"
              className="inline-flex items-center gap-2 px-8 py-4 text-slate-300 font-semibold hover:text-white transition-colors">
              Join us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Gallery Teaser ─────────────────────────────────────────────── */}
      {/* KEY CHANGE: These images were 10-14 MB each as raw JPGs.
          next/image converts them to ~50-100 KB WebP at the correct size. */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Our previous seasons</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/images/FullOrchestra.jpg', alt: 'The orchestra performing' },
              { src: '/images/ImkeClarinet.jpg', alt: 'A clarinet player in rehearsal' },
              { src: '/images/Bruch.jpg', alt: 'Performing Bruch' },
              { src: '/images/Phillip.jpg', alt: 'Phillip Higham conducting' },
            ].map((img, i) => (
              <div key={i} className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <Link href="/education/articles"
            className="mt-12 inline-block px-8 py-3 bg-blue-600 text-black font-bold rounded-full hover:bg-blue-500 transition-colors">
            Listen to us
          </Link>
        </div>
      </section>

      {/* ── Mailing List ───────────────────────────────────────────────── */}
      <SignupForm />

      {/* ── Support CTA ────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] flex items-center justify-center text-center bg-gray-900">
        <div className="relative z-10 p-8">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Support Student Music
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mt-4 max-w-2xl mx-auto">
            Your generosity helps us continue our tradition of ambitious, high-quality performances.
          </p>
          <a href={SITE_CONFIG.links.donate} target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-block px-12 py-4 bg-blue-600 text-black text-lg font-bold rounded-full hover:scale-105 transition-transform">
            Donate Now
          </a>
        </div>
      </section>
    </main>
  );
}
