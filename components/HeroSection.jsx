// =============================================================================
// components/HeroSection.jsx — Client component (needs scroll listener)
// =============================================================================
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [heroOpacity, setHeroOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / 500);
      setHeroOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-screen sticky top-0 -z-10 transition-opacity duration-100" style={{ opacity: heroOpacity }}>
      <div className="relative h-full flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background: next/image with priority for LCP */}
        <Image
          src="/backgrounds/hero-photo.jpg"
          alt="Orchestra performing"
          fill
          sizes="100vw"
          className="object-cover"
          priority  // This is above the fold → load immediately
          quality={75}
        />
        <div className="absolute inset-0 bg-black opacity-50" />

        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Experience <span className="text-blue-400">Chamber</span> Orchestra
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            Edinburgh&apos;s fully auditioned student-led ensemble dedicated to performing
            chamber music at the highest level — join us for our 2025/26 season!
          </p>
        </div>
      </div>
    </div>
  );
}
