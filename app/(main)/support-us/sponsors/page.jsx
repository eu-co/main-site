// app/(main)/support-us/sponsors/page.jsx
import Image from 'next/image';
import { getPartners, getCleanImageUrl } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/config';

export const metadata = {
  title: 'Our Partners',
  description: 'The sponsors, university partners, and friends who make EUCO possible.',
  alternates: { canonical: '/support-us/sponsors' },
};

function PartnerCard({ item, index }) {
  const logo = getCleanImageUrl(item.Logo);
  const isAlt = index % 2 !== 0;

  return (
    <div className={`flex flex-col ${isAlt ? 'md:flex-row-reverse' : 'md:flex-row'} bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all`}>
      {/* Logo */}
      <div className="w-full md:w-5/12 h-48 md:h-auto bg-white flex items-center justify-center p-8 relative">
        <Image src={logo} alt={`${item.Name} logo`} fill sizes="40vw" className="object-contain p-6" />
      </div>
      {/* Content */}
      <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-white mb-3">{item.Name}</h3>
        <p className="text-slate-400 leading-relaxed mb-6">{item.Description}</p>
        {item.Link && (
          <a href={item.Link} target="_blank" rel="noopener noreferrer"
            className="text-blue-400 font-semibold hover:text-white transition-colors text-sm uppercase tracking-wider">
            Visit website →
          </a>
        )}
      </div>
    </div>
  );
}

function PartnerSection({ title, partners, label }) {
  if (!partners?.length) return null;
  return (
    <section className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px bg-slate-800 flex-1" />
        <h2 className="text-xl font-bold text-white uppercase tracking-widest whitespace-nowrap">{title}</h2>
        <div className="h-px bg-slate-800 flex-1" />
      </div>
      <div className="space-y-6">
        {partners.map((item, i) => <PartnerCard key={i} item={item} index={i} />)}
      </div>
    </section>
  );
}

export default async function SponsorsPage() {
  const { mainSponsor, sponsors, musicCommunity, raffle, university, collaboration, individuals } = await getPartners();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Hero */}
      <div className="relative py-24 text-center bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent" />
        <div className="relative z-10 px-6">
          <p className="text-blue-400 text-xs font-bold tracking-[0.4em] uppercase mb-6">Thank you</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Partners</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            We are grateful for the generous support of our friends, who help make our music possible.
          </p>
          <a href={SITE_CONFIG.links.donate} target="_blank" rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg transition-all hover:scale-105">
            Support us
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Main sponsor - hero treatment */}
        {mainSponsor.map((item, i) => (
          <section key={i} className="mb-20">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-16 border border-yellow-500/20">
              <p className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase mb-8">Principal partner</p>
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="w-full lg:w-5/12 bg-white rounded-2xl p-8 h-[250px] flex items-center justify-center relative">
                  <Image src={getCleanImageUrl(item.Logo)} alt={item.Name} fill sizes="40vw" className="object-contain p-6" />
                </div>
                <div className="w-full lg:w-7/12">
                  <h2 className="text-4xl font-bold text-white mb-4">{item.Name}</h2>
                  <p className="text-xl text-slate-300 leading-relaxed mb-8">{item.Description}</p>
                  {item.Link && (
                    <a href={item.Link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-yellow-400 transition-colors">
                      Visit {item.Name} →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        <PartnerSection title="Sponsors" partners={sponsors} />
        <PartnerSection title="Music Community" partners={musicCommunity} />
        <PartnerSection title="Raffle Partners" partners={raffle} />
        <PartnerSection title="University Partners" partners={university} />
        <PartnerSection title="Artistic Collaborations" partners={collaboration} />

        {/* Individuals */}
        {individuals.map((item, i) => (
          <section key={i} className="text-center py-16 border-t border-slate-800">
            <h2 className="text-3xl font-bold text-white mb-8">{item.Logo || 'Thank You'}</h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {(item.Description || '').split(',').map((name, j) => (
                <span key={j} className="text-slate-400 text-lg hover:text-white transition-colors">
                  {name.trim()}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
