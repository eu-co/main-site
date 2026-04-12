// app/(main)/about/our-story/page.jsx
import Image from 'next/image';
import { getSiteContent, getTimeline, getCommittee } from '@/lib/data';

export const metadata = {
  title: 'Our Story',
  description: 'Discover the history, people, and traditions of the Edinburgh University Chamber Orchestra since 1983.',
  alternates: { canonical: '/about/our-story' },
};

export default async function OurStoryPage() {
  const [content, timeline, committee] = await Promise.all([
    getSiteContent(), getTimeline(), getCommittee(),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
        <Image src="/backgrounds/history1.jpg" alt="EUCO performing" fill sizes="100vw"
          className="object-cover opacity-50" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-slate-950" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-blue-400 text-xs font-bold tracking-[0.4em] uppercase mb-6">Est. 1983</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Story</h1>
          <p className="text-xl text-slate-300 font-light italic leading-relaxed">
            &ldquo;Distinct from the university&apos;s music society, EUCO has established itself
            as one of Scotland&apos;s leading amateur orchestras.&rdquo;
          </p>
        </div>
      </div>

      {/* ── The Beginning ────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-8">The beginning</h2>
        <div className="text-slate-300 text-lg leading-relaxed space-y-6">
          <p>{content.story_p1 || 'Edinburgh University Chamber Orchestra was founded in 1983.'}</p>
          <p>{content.story_p2 || 'The orchestra consists of nearly forty members.'}</p>
        </div>
      </section>

      {/* ── Community ────────────────────────────────────────────────── */}
      <section className="border-t border-b border-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8">More than music</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            {content.story_p3 || 'We have socials every few weeks which always make for memorable moments.'}
          </p>
        </div>
      </section>

      {/* ── Touring ──────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <Image src="/backgrounds/history-parallax.jpg" alt="" fill sizes="100vw"
          className="object-cover opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">A tradition of touring</h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-10">
            {content.story_touring || 'The orchestra has toured much of Europe.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-slate-500 uppercase tracking-widest">
            {['Rome', 'Leiden', 'Prague', 'Florence', 'Salzburg', 'Belgian', 'Scottish Isles'].map(place => (
              <span key={place} className="px-4 py-2 border border-slate-800 rounded-full">{place}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      {timeline.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Through the years</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-800" />

            <div className="space-y-12">
              {timeline.map((event, i) => {
                const isRight = i % 2 !== 0;
                return (
                  <div key={i} className="relative flex items-start">
                    {/* Dot on the line */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 bg-blue-500 rounded-full border-4 border-slate-950 z-10" />

                    {/* Content card */}
                    <div className={`ml-16 md:ml-0 md:w-5/12 ${isRight ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <p className="text-blue-400 font-bold text-xl mb-1">{event.year}</p>
                        <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Committee ────────────────────────────────────────────────── */}
      {committee.length > 0 && (
        <section className="border-t border-slate-800 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              {committee[0]?.year || '2025/26'} Committee
            </h2>
            <p className="text-center text-slate-400 mb-12">The people behind the music.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {committee.map((member, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
                  {member.imageUrl ? (
                    <Image src={`/${member.imageUrl}`} alt={member.name} width={80} height={80}
                      className="rounded-full mx-auto mb-3 object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto mb-3 flex items-center justify-center text-slate-500 text-lg font-bold">
                      {member.name?.charAt(0)}
                    </div>
                  )}
                  <p className="font-semibold text-white text-sm">{member.name}</p>
                  <p className="text-blue-400 text-xs mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
