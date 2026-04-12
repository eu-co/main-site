// app/(main)/join/page.jsx — Auditions + Concerto Competition
import { getSiteContent } from '@/lib/data';
import Section from '@/components/Section';

export const metadata = {
  title: 'Join Us',
  description: 'Audition for EUCO or enter the annual Concerto Competition. All the information you need to join Edinburgh\'s leading student chamber orchestra.',
  alternates: { canonical: '/join' },
};

export default async function JoinPage() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Hero */}
      <div className="relative py-24 px-6 text-center border-b border-slate-800">
        <p className="text-blue-400 text-xs font-bold tracking-[0.4em] uppercase mb-6">Get involved</p>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Join Us</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Whether you want to audition for a seat in the orchestra or compete as a soloist,
          we would love to meet you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        {/* Auditions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-10">
          <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">September 2026</p>
          <h2 className="text-3xl font-bold text-white mb-6">Auditions</h2>
          <div className="space-y-4 text-slate-300 leading-relaxed mb-8">
            <p>Auditions for all sections will be held at the beginning of the academic year.</p>
            <div className="bg-slate-800 p-5 rounded-xl border-l-4 border-blue-600 space-y-2">
              <p><span className="font-semibold text-white">Date:</span> {content.auditions_date || 'September 2026'}</p>
              <p><span className="font-semibold text-white">Time:</span> {content.auditions_time || 'TBC'}</p>
              <p><span className="font-semibold text-white">Location:</span> {content.auditions_location || 'TBC'}</p>
            </div>
            <p className="text-sm">{content.auditions_info || 'Prepare a solo piece (up to 5 minutes) and be ready for a sight-reading excerpt.'}</p>
          </div>
          <button disabled className="w-full px-6 py-3 bg-blue-600/30 text-blue-300 font-bold rounded-xl cursor-not-allowed">
            Sign-up opens September
          </button>
        </div>

        {/* Concerto Competition */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-10">
          <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">October 2026</p>
          <h2 className="text-3xl font-bold text-white mb-6">Concerto Competition</h2>
          <div className="space-y-4 text-slate-300 leading-relaxed mb-8">
            <p>{content.competition_info || 'The annual competition provides a platform for exceptional student soloists to perform a concerto with the full orchestra.'}</p>
            <p>The winner performs their chosen concerto with EUCO in one of our main season concerts. Past winners have gone on to pursue successful careers in music.</p>
          </div>
          <button disabled className="w-full px-6 py-3 bg-blue-600/30 text-blue-300 font-bold rounded-xl cursor-not-allowed">
            Applications open October
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden border border-slate-800">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2234.331221714576!2d-3.188448684069872!3d55.94523598060521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4887c78075a34065%3A0x72a4a75476de0b8!2sAlison%20House!5e0!3m2!1sen!2suk"
            width="100%" height="300" style={{ border: 0 }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Audition location — Allison House, Edinburgh"
          />
        </div>
        <p className="text-center text-slate-500 text-sm mt-4">
          Auditions are held at Allison House, Nicolson Square, Edinburgh
        </p>
      </div>
    </main>
  );
}
