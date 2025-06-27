import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
};

module.exports = nextConfig;


export default nextConfig;
