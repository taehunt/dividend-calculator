import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/feed.xml",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
