// app/(main)/about/page.jsx
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'About Us',
  description: "Discover EUCO's history, conductors, opera collaboration, and community outreach.",
  alternates: { canonical: '/about' },
};

const sections = [
  { title: 'Our Story', desc: 'From 1983 to today — four decades of music-making in Edinburgh.', path: '/about/our-story', color: 'text-blue-400' },
  { title: 'Conductors', desc: 'The professional musicians who bring their expertise to our stage.', path: '/about/conductors', color: 'text-blue-400' },
  { title: 'Opera', desc: 'Our annual collaboration as resident orchestra for Edinburgh Studio Opera.', path: '/about/opera', color: 'text-pink-400' },
  { title: 'Outreach', desc: 'Bringing free live music to schools, care homes, and communities.', path: '/about/outreach', color: 'text-teal-400' },
  { title: 'News', desc: 'The latest updates from the orchestra.', path: '/about/news', color: 'text-amber-400' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-black flex items-center">
        <Image src="/backgrounds/ColourFade4.png" alt="" fill sizes="100vw"
          className="object-cover opacity-40 mix-blend-screen" priority />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 leading-tight pb-2">
              The Orchestra
            </h1>
            <div className="h-1 w-24 bg-blue-500 my-8 rounded-full" />
            <p className="text-slate-200 text-lg md:text-2xl leading-relaxed font-light">
              We are a community of music-loving students of the University of Edinburgh
              from all over the world. Our passion for orchestral and chamber music founded
              this society and has kept it going for many decades.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Navigation cards */}
      <div className="bg-black py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-400 text-center mb-12">Explore</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map(s => (
              <Link key={s.path} href={s.path}
                className="group block bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-slate-600 hover:bg-slate-800/80 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-2xl font-bold text-white group-hover:${s.color} transition-colors`}>
                    {s.title}
                  </h3>
                  <span className="text-slate-600 group-hover:text-white transition-colors text-xl">→</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stringers sponsor section */}
      <section className="bg-slate-950 py-24 border-t border-slate-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative h-[350px] rounded-2xl overflow-hidden">
            <Image src="/backgrounds/stringers-shop.jpg" alt="Stringers of Edinburgh"
              fill sizes="50vw" className="object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Our valued partner</p>
            <Image src="/logos/stringers-logo.svg" alt="Stringers" width={160} height={60}
              className="mb-6 invert" />
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              We are proudly partnered with Stringers, Edinburgh&apos;s leading specialist violin,
              viola, and cello shop.
            </p>
            <Link href="/support-us/sponsors" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
              Learn more about our partners →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
