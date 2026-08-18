// Origins allowed to embed this site in an <iframe> (e.g. the portfolio's
// "side work" carousel). Everything else is still refused. Keep this pinned to
// exact origins: a wildcard like https://*.vercel.app lets anyone with a Vercel
// deploy frame the booking form. The localhost entries are dev-only.
const FRAME_ANCESTORS = [
  "'self'",
  'https://charlesrose.vercel.app',
  ...(process.env.NODE_ENV === 'production'
    ? []
    : ['http://localhost:*', 'http://127.0.0.1:*']),
];

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
    // Optimized images are static brand/hero assets: let the CDN and
    // browsers cache them for 30 days instead of the 60s default.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        // Static brand assets in /public change rarely; cache for 30 days.
        source: '/:file*.(png|webp|jpg|svg|ico)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Replaces X-Frame-Options: DENY — same protection, but with an
          // allow-list so the portfolio site can iframe this one.
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors ${FRAME_ANCESTORS.join(' ')}`,
          },
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
