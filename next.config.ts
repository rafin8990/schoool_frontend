import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'i.pinimg.com',
      'placehold.co',
      'images.pexels.com',
      'localhost',
      'task.bamsbd.com',
      'shinystepsedu.com',
      'api.shinystepsedu.com',
    ],
  },
  output: 'standalone',
};

export default nextConfig;