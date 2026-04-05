// app/(main)/about/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/Section';

export const metadata = {
  title: 'About Us',
  description: "Discover EUCO's history, auditions, conductors, and collaborations.",
  alternates: { canonical: '/about' },
};

const aboutLinks = [
  { title: 'Our Story', description: 'Discover our rich history, from our founding in 1983.', path: '/about/our-story' },
  { title: 'Auditions', description: 'Find all the information you need to join the orchestra.', path: '/about/auditions' },
  { title: 'Conductors', description: 'Meet the professional conductors who have led our orchestra.', path: '/about/conductors' },
  { title: 'Opera', description: 'Our annual collaboration with Edinburgh Studio Opera.', path: '/about/opera' },
  { title: 'Concerto Competition', description: "The university's finest student soloists.", path: '/about/concerto-competition' },
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
              We are a community of music loving students of the University of Edinburgh
              from all over the world.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <Section title="Explore EUCO" className="bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutLinks.map((link) => (
            <Link key={link.title} href={link.path}
              className="group block h-full bg-slate-900 border border-slate-800 rounded-xl p-8 transition-all hover:border-slate-600 hover:bg-slate-800/80">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {link.title}
                </h3>
                <span className="text-slate-600 group-hover:text-white transition-colors text-2xl">→</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">{link.description}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
