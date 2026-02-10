import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.example.com",
      },
    ],
  },
  async rewrites() {
    return [
      // {
      //   source: "/api/:path*",
      //   destination: `${process.env.API_URL}/api/:path*`,
      // },
      {
        source: "/:path*",
        destination: `${process.env.AUTH_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
