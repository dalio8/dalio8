/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Otimizações de performance
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
