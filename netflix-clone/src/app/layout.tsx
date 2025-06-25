// src/app/layout.tsx
// Netflix 클론의 루트 레이아웃

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionWrapper from "@/components/providers/SessionWrapper";
import AppProvider from "@/components/providers/AppProvider";
import "./globals.css";

// Inter 폰트 설정 (Netflix는 Helvetica Neue를 사용하지만 웹에서는 Inter가 좋은 대안)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Netflix Clone - 영화와 TV 프로그램을 무제한으로",
  description:
    "Netflix 클론 프로젝트 - Next.js, React Query, Zustand로 만든 스트리밍 서비스",
  keywords: ["netflix", "streaming", "movies", "tv shows", "clone"],
  authors: [{ name: "Netflix Clone Team" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://netflix-clone.com",
    siteName: "Netflix Clone",
    title: "Netflix Clone - 영화와 TV 프로그램을 무제한으로",
    description:
      "Netflix 클론 프로젝트 - Next.js, React Query, Zustand로 만든 스트리밍 서비스",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Netflix Clone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Netflix Clone - 영화와 TV 프로그램을 무제한으로",
    description:
      "Netflix 클론 프로젝트 - Next.js, React Query, Zustand로 만든 스트리밍 서비스",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#e50914",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

/**
 * Netflix 클론의 루트 레이아웃 컴포넌트
 *
 * 특징:
 * - Netflix 브랜드 컬러 적용
 * - 반응형 디자인
 * - SEO 최적화
 * - 접근성 고려
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <head>
        {/* Netflix 브랜드 컬러를 위한 메타 태그 */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* 프리로드할 중요한 리소스 */}
        <link
          rel="preconnect"
          href="https://image.tmdb.org"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://api.themoviedb.org"
          crossOrigin="anonymous"
        />

        {/* DNS 프리페치 */}
        <link rel="dns-prefetch" href="//image.tmdb.org" />
        <link rel="dns-prefetch" href="//api.themoviedb.org" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased netflix-bg-gray-dark text-foreground min-h-screen`}
        suppressHydrationWarning={true}
      >
        {/* 스킵 링크 (접근성) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-netflix-red focus:text-white focus:rounded focus:outline-none"
        >
          메인 콘텐츠로 건너뛰기
        </a>

        {/* 메인 앱 컨테이너 */}
        <div id="root" className="relative">
          {/* SessionProvider로 전체 앱 감싸기 */}
          <SessionWrapper>
            <AppProvider>{children}</AppProvider>
          </SessionWrapper>

          {/* 여기에 푸터가 들어갈 예정 */}
        </div>

        {/* 포털을 위한 div (모달, 토스트 등) */}
        <div id="portal-root" />

        {/* 로딩 스피너를 위한 div */}
        <div id="loading-root" />

        {/* 개발 환경에서만 표시되는 정보 */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white text-xs px-2 py-1 rounded">
            <div className="block sm:hidden">XS</div>
            <div className="hidden sm:block md:hidden">SM</div>
            <div className="hidden md:block lg:hidden">MD</div>
            <div className="hidden lg:block xl:hidden">LG</div>
            <div className="hidden xl:block 2xl:hidden">XL</div>
            <div className="hidden 2xl:block">2XL</div>
          </div>
        )}
      </body>
    </html>
  );
}
