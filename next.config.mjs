/** @type {import('next').NextConfig} */
const nextConfig = {
  // Verification builds (e.g. an agent/CI running `next build` while a dev
  // server is up) can point at a separate output dir so they don't clobber
  // the running dev server's .next/ chunks: NEXT_DIST_DIR=.next-verify
  distDir: process.env.NEXT_DIST_DIR || '.next',
  poweredByHeader: false,
  images: {
    // Serve AVIF (smaller than WebP) where the browser supports it.
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
