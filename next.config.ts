import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow local /public images (default) + external CDNs if needed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
};

export default nextConfig;
