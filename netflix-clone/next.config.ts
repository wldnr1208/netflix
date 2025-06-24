import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 실험적인 기능들 (Next.js 15 기준)
  experimental: {
    // App Router 최적화
    optimizePackageImports: ["lucide-react"],
  },

  // 이미지 최적화 설정
  images: {
    // TMDB 이미지 도메인 허용
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "www.themoviedb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
    // 이미지 크기 최적화
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 이미지 포맷 최적화
    formats: ["image/webp", "image/avif"],
  },

  // 성능 최적화
  compress: true,

  // 개발 환경에서 React Strict Mode 활성화
  reactStrictMode: true,

  // 리다이렉트 설정 (나중에 인증 로직과 함께 구현)
  async redirects() {
    return [
      // 현재는 간단한 리다이렉트만 설정
      // 나중에 인증 상태에 따른 조건부 리다이렉트 추가 예정
    ];
  },

  // 보안 헤더 설정
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // 보안 헤더
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // 성능 헤더
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      // 정적 파일 캐싱
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // TypeScript 및 ESLint 설정
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
