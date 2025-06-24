// src/app/page.tsx
// 헤더 기능 테스트를 위한 홈페이지

"use client";

import React from "react";
import Button from "@/components/ui/Button";
import PlayButton from "@/components/ui/PlayButton";

export default function HomePage() {
  return (
    <div className="min-h-screen netflix-bg-gray-dark">
      {/* 히어로 섹션 - 헤더 투명도 테스트용 */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-black/80 via-transparent to-black/80">
        {/* 배경 이미지 대신 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-gray-900"></div>

        {/* 히어로 콘텐츠 */}
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            <span className="text-gradient-red">NETFLIX</span> 클론
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 animate-slide-up">
            Next.js 15, React Query, Zustand로 만든 스트리밍 서비스
          </p>

          {/* 버튼들 - 헤더 버튼과 구분하기 위해 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <PlayButton size="lg" onPlay={() => alert("재생 버튼 클릭!")} />
            <Button
              variant="secondary"
              size="lg"
              onClick={() => alert("상세 정보 클릭!")}
            >
              ℹ️ 상세 정보
            </Button>
          </div>
        </div>
      </section>

      {/* 스크롤 테스트용 섹션들 */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            📱 헤더 기능 테스트
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 기능 테스트 카드들 */}
            {[
              {
                title: "스크롤 감지",
                description: "페이지를 스크롤하면 헤더 배경이 나타납니다",
                test: "⬆️ 위로 스크롤해보세요",
              },
              {
                title: "검색 기능",
                description: "헤더의 검색 아이콘을 클릭해보세요",
                test: "🔍 검색 창이 열립니다",
              },
              {
                title: "모바일 메뉴",
                description: "화면을 좁게 하고 햄버거 메뉴를 클릭해보세요",
                test: "📱 모바일 메뉴가 나타납니다",
              },
              {
                title: "네비게이션",
                description: "헤더의 메뉴 항목들을 클릭해보세요",
                test: "🔗 각 페이지로 이동합니다",
              },
              {
                title: "로고 클릭",
                description: "Netflix 로고를 클릭해보세요",
                test: "🏠 홈으로 이동합니다",
              },
              {
                title: "반응형 테스트",
                description: "브라우저 창 크기를 조절해보세요",
                test: "📏 레이아웃이 반응합니다",
              },
            ].map((item, index) => (
              <div key={index} className="netflix-card p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-netflix-gray-light mb-4">
                  {item.description}
                </p>
                <div className="netflix-bg-red/20 rounded p-3">
                  <p className="text-sm text-white font-medium">{item.test}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추가 스크롤 콘텐츠 */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            🎬 더 많은 콘텐츠
          </h2>

          {/* 스크롤 테스트를 위한 더미 콘텐츠 */}
          <div className="space-y-8">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="netflix-bg-gray rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  섹션 {i + 1}
                </h3>
                <p className="text-netflix-gray-light leading-relaxed">
                  헤더의 스크롤 효과를 테스트하기 위한 콘텐츠입니다. 페이지를
                  위아래로 스크롤하면서 헤더의 배경이 투명에서 불투명으로 변하는
                  것을 확인해보세요. 또한 모바일에서는 햄버거 메뉴가 나타나고,
                  데스크톱에서는 전체 네비게이션이 표시됩니다.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="netflix-bg-gray py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-netflix-gray-light">
            헤더 테스트 페이지 | Netflix 클론 프로젝트
          </p>
          <p className="text-sm text-netflix-gray-light mt-2">
            개발자 도구(F12)를 열고 콘솔에서 검색 결과를 확인해보세요
          </p>
        </div>
      </footer>
    </div>
  );
}
