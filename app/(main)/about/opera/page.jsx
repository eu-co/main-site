// app/(main)/about/opera/page.jsx
import Image from 'next/image';
import { getSiteContent } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/config';

export const metadata = {
  title: 'Opera',
  description: 'EUCO as the resident orchestra for Edinburgh Studio Opera.',
  alternates: { canonical: '/about/opera' },
};

export default async function OperaPage() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-black text-slate-100">
      {/* Hero with video background */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          poster="/backgrounds/opera-snippet-1.jpg">
          <source src="/videos/opera-background.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative z-10 text-center px-6">
          <p className="text-blue-400 text-xs font-bold tracking-[0.4em] uppercase mb-6">Annual collaboration</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Opera</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A theatrical collaboration with Edinburgh Studio Opera
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 md:p-12">
          <div className="text-slate-300 text-lg leading-relaxed space-y-6">
            <p>{content.opera_info || 'Each year, EUCO is the resident orchestra for Edinburgh Studio Opera.'}</p>
            <p>
              Working with talented vocalists, a professional artistic team, and our dedicated musicians,
              we explore the rich and dramatic world of the opera repertoire. Our most recent production
              was Massenet&apos;s &lsquo;Cendrillon&rsquo; at the Pleasance Theatre.
            </p>
          </div>

          {/* ESO logo link */}
          <div className="flex justify-center my-12">
            <a href={SITE_CONFIG.links.eso} target="_blank" rel="noopener noreferrer"
              className="transition-transform hover:scale-105">
              <Image src="/backgrounds/ESO.jpg" alt="Edinburgh Studio Opera" width={120} height={120}
                className="rounded-lg shadow-lg" />
            </a>
          </div>

          <p className="text-slate-300 text-lg text-center">
            We are thrilled to continue this partnership and look forward to our next production in Spring 2026.
          </p>

          {/* Opera images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image src="/backgrounds/opera-snippet-1.jpg" alt="Opera performance"
                fill sizes="50vw" className="object-cover" loading="lazy" />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image src="/backgrounds/opera-snippet-2.jpg" alt="Orchestra in the pit"
                fill sizes="50vw" className="object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
