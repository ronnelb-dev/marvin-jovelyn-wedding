import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/**')],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 400, 600],
    minimumCacheTTL: 86400, // 24 hours
  },
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
};

export default withFlowbiteReact(nextConfig);
