// app/(main)/about/conductors/page.jsx — Data from Google Sheet
import Image from 'next/image';
import { getConductors } from '@/lib/data';
import Section from '@/components/Section';

export const metadata = {
  title: 'Conductors & Guest Artists',
  description: 'Meet the professional conductors and guest artists who have led EUCO.',
  alternates: { canonical: '/about/conductors' },
};

export default async function ConductorsPage() {
  const conductors = await getConductors();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-blue-400 text-xs font-bold tracking-[0.4em] uppercase mb-4">Our musicians</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Conductors & Guest Artists</h1>
        <p className="text-lg text-slate-400 mb-16 max-w-2xl">
          We are proud to have worked with these incredible musicians and conductors
          who bring their expertise and passion to our performances.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conductors.map((person, i) => (
            <a key={i} href={person.url || '#'} target="_blank" rel="noopener noreferrer"
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/30 hover:shadow-2xl transition-all duration-300">
              {/* Image */}
              <div className="h-64 relative overflow-hidden bg-slate-800">
                {person.imageUrl ? (
                  <Image
                    src={`/${person.imageUrl}`}
                    alt={person.name}
                    fill sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 text-4xl font-bold">
                    {person.name?.charAt(0)}
                  </div>
                )}
              </div>
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {person.name}
                </h3>
                <p className="text-blue-400 text-sm font-semibold mb-3">{person.role}</p>
                {person.bio && (
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{person.bio}</p>
                )}
              </div>
            </a>
          ))}
        </div>

        {conductors.length === 0 && (
          <p className="text-center text-slate-500 py-20">Conductor information coming soon.</p>
        )}
      </div>
    </main>
  );
}
