// app/(main)/about/outreach/page.jsx
import Image from 'next/image';
import Link from 'next/link';
import { getSiteContent } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/config';

export const metadata = {
  title: 'Community Outreach',
  description: 'EUCO brings free live classical music to schools, care homes, and community centres across Edinburgh.',
  alternates: { canonical: '/about/outreach' },
};

export default async function OutreachPage() {
  const content = await getSiteContent();

  // Structured data for the outreach service
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Community Music Outreach',
    name: 'EUCO Community Outreach Programme',
    description: content.outreach_info,
    provider: { '@type': 'MusicGroup', name: SITE_CONFIG.name },
    areaServed: { '@type': 'Place', name: 'Edinburgh, Scotland' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
        {/* Hero */}
        <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
          <Image src="/images/community.jpg" alt="EUCO outreach" fill sizes="100vw"
            className="object-cover opacity-60" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-950" />
          <div className="relative z-10 text-center px-6">
            <p className="text-blue-400 text-xs font-bold tracking-[0.4em] uppercase mb-6">Our community</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Music for Everyone</h1>
            <p className="text-xl text-slate-200 font-light max-w-2xl mx-auto">
              Bringing the joy of live classical music beyond the concert hall.
            </p>
          </div>
        </div>

        {/* What we do */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8">What we do</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              {content.outreach_info || 'Our members form smaller ensembles to bring live music to schools, care homes, and community centres across Edinburgh.'}
            </p>
          </div>
        </section>

        {/* Impact areas */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Schools', desc: 'Interactive sessions introducing children to the instruments of the orchestra.' },
              { title: 'Care homes', desc: 'Bringing live music to residents, creating moments of joy and connection.' },
              { title: 'Community centres', desc: 'Free performances making classical music accessible to all.' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-blue-400 mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 md:p-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Arrange a visit</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-4 max-w-2xl mx-auto">
              Our outreach performances are offered <strong className="text-white">for free</strong> as part
              of our commitment to the community.
            </p>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
              If you are a teacher, activities coordinator, or community leader in Edinburgh,
              we would be delighted to hear from you.
            </p>
            <Link href="/contact-us"
              className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-full shadow-lg transition-all hover:scale-105">
              Get in touch
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
