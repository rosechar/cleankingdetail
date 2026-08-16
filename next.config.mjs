// Origins allowed to embed this site in an <iframe> (e.g. the portfolio's
// "side work" carousel). Everything else is still refused. Add the portfolio's
// production origin here; localhost:* covers local dev of any port.
const FRAME_ANCESTORS = [
  "'self'",
  'https://*.vercel.app',
  'http://localhost:*',
  'http://127.0.0.1:*',
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
  },
  async headers() {
    return [
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
