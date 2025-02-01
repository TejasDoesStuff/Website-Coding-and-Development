import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.discordapp.com',
      'unsplash.it',
      'connexting.ineshd.com'
    ],
  },
  // Disable optimizations for development-like behavior
  productionBrowserSourceMaps: true, // Enable source maps for easier debugging
  reactStrictMode: false, // Disable strict mode
  swcMinify: false, // Disable SWC minification
  optimizeFonts: false, // Disable font optimization
  experimental: {
    optimizeCss: false, // Disable CSS optimization
  },
  // Ensure API routes are handled correctly
  api: {
    bodyParser: true, // Enable body parsing for API routes
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable linting during builds
  },
};

export default nextConfig;