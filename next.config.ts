import type { NextConfig } from 'next';

const config: NextConfig = {
  // Expose Vercel's build environment to the client so the temporary
  // Experiment menu can (a) show only on preview/dev, never production, and
  // (b) highlight which branch you're currently viewing. Vercel sets these at
  // build time; locally they're empty. Remove with the menu before launch.
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV ?? '',
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF ?? '',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i1.sndcdn.com',
      },
    ],
  },
};

export default config;
