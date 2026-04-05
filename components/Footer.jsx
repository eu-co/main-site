// =============================================================================
// components/Footer.jsx — Server Component (no client-side JS needed)
// =============================================================================

import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-black mt-16 py-10">
      <div className="container mx-auto px-6 text-center text-gray-400">
        {/* Sponsor */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 hover:text-white transition-colors">
            Proudly sponsored by Stringers of Edinburgh:
          </h3>
          <a href={SITE_CONFIG.links.stringers} target="_blank" rel="noopener noreferrer" aria-label="Stringers Music"
            className="inline-block hover:text-white transition-colors">
            {/* Replace SVG import with next/image or inline SVG */}
            <Image src="/logos/stringers-logo.svg" alt="Stringers" width={120} height={48} className="mx-auto invert opacity-60 hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Links */}
        <div className="flex justify-center items-center space-x-6 mb-4">
          <a href={SITE_CONFIG.links.eusa} target="_blank" rel="noopener noreferrer" aria-label="EUSA"
            className="hover:text-white transition-colors">
            <Image src="/logos/eusa-logo.svg" alt="EUSA" width={48} height={48} className="invert opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href={SITE_CONFIG.links.university} target="_blank" rel="noopener noreferrer" aria-label="University of Edinburgh"
            className="hover:text-white transition-colors">
            <Image src="/logos/UoE-logo.svg" alt="UoE" width={80} height={32} className="invert opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="hover:text-white transition-colors">
            <Image src="/logos/insta.svg" alt="Instagram" width={24} height={24} className="invert opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="hover:text-white transition-colors">
            <Image src="/logos/facebook.svg" alt="Facebook" width={24} height={24} className="invert opacity-60 hover:opacity-100 transition-opacity" />
          </a>
        </div>

        <p className="hover:text-white transition-colors">
          © {new Date().getFullYear()} Edinburgh University Chamber Orchestra. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
