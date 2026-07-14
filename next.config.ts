import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.instagram.com https://www.tiktok.com",
              "frame-src https://www.instagram.com https://www.tiktok.com https://*.tiktok.com",
              "img-src 'self' data: blob: https://www.instagram.com https://scontent*.cdninstagram.com https://cdninstagram.com https://*.tiktok.com https://*.tiktokcdn.com https://p16-sign.tiktokcdn-us.com https://p19-sign.tiktokcdn-us.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.tiktok.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.instagram.com https://www.tiktok.com https://*.tiktok.com",
              "media-src 'self' https://*.tiktok.com https://*.tiktokcdn.com blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
