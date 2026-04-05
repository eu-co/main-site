/** @type {import('next').NextConfig} */
const nextConfig = {
  // REQUIRED for Docker deployment — produces a self-contained server
  output: 'standalone',

  // Enable automatic image optimization - this is the KEY performance win.
  // next/image will auto-convert JPG/PNG to WebP/AVIF at multiple sizes.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Allow external images from these domains (for Google Drive, Unsplash, etc.)
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'images.squarespace-cdn.com' },
      { protocol: 'https', hostname: '**.eu-co.co.uk' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'offloadmedia.feverup.com' },
      { protocol: 'https', hostname: 'adventurebrits.co.uk' },
      { protocol: 'https', hostname: 'www.thescottishsun.co.uk' },
      { protocol: 'https', hostname: 'practicalwanderlust.com' },
      { protocol: 'https', hostname: 'www.transparenttextures.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: '**' },   // allow any external HTTPS image
    ],
    // Device sizes for srcset generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;
