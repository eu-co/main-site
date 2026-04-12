// app/(main)/support-us/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';

export const metadata = {
  title: 'Support Us',
  description: 'Help support EUCO. Donate, sponsor us, or learn about our valued partners.',
  alternates: { canonical: '/support-us' },
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[350px] flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Support Student Music</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Your generosity helps us continue our tradition of ambitious, high-quality performances.
          </p>
          <a href={SITE_CONFIG.links.donate} target="_blank" rel="noopener noreferrer"
            className="inline-block px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-full shadow-lg transition-all hover:scale-105">
            Donate Now
          </a>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        {/* Partners card */}
        <Link href="/support-us/sponsors"
          className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">Our Partners</h2>
              <p className="text-slate-400 text-sm">See who makes our music possible</p>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed">
            We are grateful for the support of sponsors, university partners, local businesses, and individuals
            who share our passion for music.
          </p>
          <p className="text-blue-400 mt-6 font-semibold group-hover:translate-x-1 transition-transform inline-block">
            View partners →
          </p>
        </Link>

        {/* Sponsorship card */}
        <Link href="/support-us/donate"
          className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">Become a Sponsor</h2>
              <p className="text-slate-400 text-sm">Support the next generation of musicians</p>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Partnering with EUCO offers a unique opportunity to connect with a culturally engaged
            audience in Edinburgh.
          </p>
          <p className="text-blue-400 mt-6 font-semibold group-hover:translate-x-1 transition-transform inline-block">
            Sponsorship info →
          </p>
        </Link>
      </div>

      {/* How support helps */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">How your support helps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Community', desc: 'Free musical outreach performances in care homes and schools across Edinburgh.' },
            { title: 'Music', desc: 'Affordable, high-quality concerts and a vibrant music scene in the city.' },
            { title: 'Ambition', desc: 'Larger venues, more ambitious repertoire, and international touring opportunities.' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
