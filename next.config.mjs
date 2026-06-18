/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve AVIF (smaller than WebP) where the browser supports it.
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Disable automatic preloading of stylesheets
    optimizeCss: false,
  },
};

export default nextConfig;
