//Next.js의 <Image> 컴포넌트를 사용할 때, 외부 이미지 도메인(image.tmdb.org)을 허용하기 위한 설정이야.

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
