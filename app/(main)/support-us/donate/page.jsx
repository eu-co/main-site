// app/(main)/support-us/donate/page.jsx
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

export const metadata = {
  title: 'Donate & Sponsor',
  description: 'Support EUCO through donations or sponsorship. Help us bring classical music to Edinburgh.',
  alternates: { canonical: '/support-us/donate' },
};

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-blue-400 text-xs font-bold tracking-[0.4em] uppercase mb-4">Give</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Donate & Sponsor</h1>

        {/* Donate CTA */}
        <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/20 rounded-2xl p-8 md:p-12 mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Make a donation</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
            Every contribution helps us hire venues, purchase music, and fund our community outreach programme.
          </p>
          <a href={SITE_CONFIG.links.donate} target="_blank" rel="noopener noreferrer"
            className="inline-block px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-full shadow-lg transition-all hover:scale-105">
            Donate via JustGiving
          </a>
        </div>

        {/* Sponsorship info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Become a sponsor</h2>
          <div className="text-slate-300 text-lg leading-relaxed space-y-4">
            <p>
              As a student-run organisation, EUCO is constantly evolving. Each year, we seek new
              collaborations and welcome the support of local businesses and individuals who share
              our passion for music.
            </p>
            <p>
              Sponsorship can take many forms — from providing raffle prizes for our events to
              supporting a specific concert. In return, we can offer your brand exposure to a
              large audience of students and music lovers across Edinburgh.
            </p>
          </div>
          <Link href="/contact-us"
            className="mt-8 inline-block px-8 py-3 border border-blue-500/30 text-blue-400 font-bold rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
            Contact us about sponsorship
          </Link>
        </div>

        {/* What support provides */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-white mb-6">How your support helps</h2>
          <div className="space-y-4">
            {[
              { label: 'Community', text: 'Free musical outreach in local care homes and schools.' },
              { label: 'Music', text: 'Affordable, high-quality concerts for Edinburgh audiences.' },
              { label: 'Scope', text: 'Larger venues, ambitious repertoire, and international touring.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-800/50">
                <span className="text-blue-400 font-bold text-sm w-24 flex-shrink-0">{item.label}</span>
                <p className="text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
