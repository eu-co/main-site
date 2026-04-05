// =============================================================================
// components/Header.jsx — Client component (needs scroll/menu state)
// =============================================================================
// WHAT CHANGED:
//   - react-router-dom's Link/NavLink → next/link's Link
//   - react-burger-menu REMOVED (it was 25KB gzipped) → simple Tailwind mobile menu
//   - SVG logo: next/image for raster, inline SVG or <Image> for the logo
//   - No more process.env.PUBLIC_URL (Next.js serves from /public directly)
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Education', path: 'https://education.eu-co.co.uk', external: true },
  {
    name: 'About', path: '/about',
    dropdown: [
      { name: 'Our Story', path: '/about/our-story' },
      { name: 'Auditions', path: '/about/auditions' },
      { name: 'Conductors', path: '/about/conductors' },
      { name: 'Opera', path: '/about/opera' },
      { name: 'Concerto Competition', path: '/about/concerto-competition' },
    ],
  },
  {
    name: 'Concerts', path: '/concerts',
    dropdown: [
      { name: 'Upcoming', path: '/concerts/upcoming' },
      { name: 'Past', path: '/concerts/past' },
      { name: 'Outreach', path: '/concerts/outreach' },
    ],
  },
  {
    name: 'Contact Us', path: '/contact-us',
    dropdown: [
      { name: 'Contact Us Directly', path: '/contact-us/direct' },
      { name: 'FAQ', path: '/contact-us/faq' },
    ],
  },
  {
    name: 'Support Us', path: '/support-us',
    dropdown: [
      { name: 'Our Partners', path: '/support-us/sponsors' },
      { name: 'Sponsorship', path: '/support-us/donate' },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  return (
    <header className="sticky top-0 z-30">
      {/* ── Desktop Header ────────────────────────────────────────────── */}
      <div className="hidden md:block">
        <div className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-md shadow-lg' 
            : 'bg-black/80 backdrop-blur-sm'
        }`}>
          <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center text-2xl font-bold text-blue-400">
              {/* Logo: Use next/image for the SVG or a PNG version */}
              <Image
                src="/favicon/logo.png"
                alt="EUCO Logo"
                width={48}
                height={48}
                className="mr-4"
                priority
              />
              <span>Edinburgh University Chamber Orchestra</span>
            </Link>

            <div className="flex items-center space-x-1">
              {navItems.map(item => {
                const NavTag = item.external ? 'a' : Link;
                const navProps = item.external
                  ? { href: item.path, target: '_self' }
                  : { href: item.path };

                return (
                  <div key={item.name} className="relative group py-2">
                    <NavTag
                      {...navProps}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        !item.external && isActive(item.path)
                          ? 'bg-blue-600/80 text-black'
                          : 'text-gray-300 group-hover:bg-gray-700'
                      }`}
                    >
                      {item.name}
                    </NavTag>
                  {item.dropdown && (
                    <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                      {item.dropdown.map(sub => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-600 hover:text-black"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* ── Mobile Header ─────────────────────────────────────────────── */}
      <div className="md:hidden bg-black py-3 px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/favicon/logo.png" alt="EUCO" width={40} height={40} className="mr-2" priority />
          <span className="font-bold text-lg text-blue-400 leading-tight">
            Edinburgh University<br />Chamber Orchestra
          </span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-300 hover:text-white p-2"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* ── Mobile Menu Overlay ────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-black z-40 overflow-y-auto">
          <nav className="p-6 space-y-4">
            {navItems.map(item => {
              const MobileTag = item.external ? 'a' : Link;
              const mobileProps = item.external
                ? { href: item.path }
                : { href: item.path };
              return (
              <div key={item.name}>
                <MobileTag
                  {...mobileProps}
                  className="block text-xl font-bold text-white py-2"
                >
                  {item.name}
                </MobileTag>
                {item.dropdown?.map(sub => (
                  <Link
                    key={sub.path}
                    href={sub.path}
                    className="block text-base text-gray-400 pl-4 py-1.5 hover:text-blue-400"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
