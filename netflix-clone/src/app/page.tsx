// src/app/page.tsx
// 헤더 기능 테스트를 위한 홈페이지

"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";
import PlayButton from "@/components/ui/PlayButton";

export default function HomePage() {
  const { data: session, status } = useSession();

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
            Next.js 15, NextAuth, React Query, Zustand로 만든 스트리밍 서비스
          </p>

          {/* 로그인 상태에 따른 다른 메시지 */}
          {status === "loading" ? (
            <div className="animate-pulse">
              <div className="h-6 bg-white/20 rounded w-64 mx-auto mb-8"></div>
            </div>
          ) : session?.user ? (
            <div className="mb-8">
              <p className="text-white mb-2">
                안녕하세요, {session.user.name}님! 👋
              </p>
              <p className="text-netflix-gray-light text-sm">
                {session.user.provider === "google" ? "Google" : "이메일"}로
                로그인됨
              </p>
            </div>
          ) : (
            <p className="text-netflix-gray-light mb-8">
              로그인하여 더 많은 기능을 이용해보세요
            </p>
          )}

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

      {/* 로그인 기능 테스트 섹션 */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            🔐 로그인 기능 테스트
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 로그인 상태 카드 */}
            <div className="netflix-card p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                현재 로그인 상태
              </h3>
              {status === "loading" ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  <div className="h-4 bg-white/20 rounded w-1/2"></div>
                </div>
              ) : session?.user ? (
                <div className="space-y-2">
                  <p className="text-green-400">✅ 로그인됨</p>
                  <p className="text-sm text-netflix-gray-light">
                    이름: {session.user.name}
                  </p>
                  <p className="text-sm text-netflix-gray-light">
                    이메일: {session.user.email}
                  </p>
                  <p className="text-sm text-netflix-gray-light">
                    제공자:{" "}
                    {session.user.provider === "google" ? "Google" : "이메일"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-red-400">❌ 로그인 안됨</p>
                  <p className="text-sm text-netflix-gray-light">
                    헤더의 로그인 버튼을 클릭해보세요
                  </p>
                </div>
              )}
            </div>

            {/* 기능 테스트 카드들 */}
            {[
              {
                title: "이메일 로그인",
                description: "/auth/signin 페이지에서 테스트",
                test: "📧 test@netflix.com / password123",
              },
              {
                title: "Google 로그인",
                description: "Google OAuth로 소셜 로그인",
                test: "🔗 구글 계정 필요",
              },
              {
                title: "회원가입",
                description: "/auth/signup 페이지에서 가입",
                test: "📝 새 계정 만들기",
              },
              {
                title: "프로필 메뉴",
                description: "로그인 후 헤더 프로필 클릭",
                test: "👤 드롭다운 메뉴 확인",
              },
              {
                title: "로그아웃",
                description: "프로필 메뉴에서 로그아웃",
                test: "🚪 세션 종료 테스트",
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

      {/* 기존 스크롤 테스트 섹션들... */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            📱 헤더 기능 테스트
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="netflix-bg-gray rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  섹션 {i + 1}
                </h3>
                <p className="text-netflix-gray-light leading-relaxed">
                  NextAuth를 이용한 로그인 시스템이 완성되었습니다! Google
                  OAuth와 이메일/비밀번호 로그인을 지원하며, 세션 관리, 프로필
                  드롭다운, 로그아웃 기능까지 모두 작동합니다.
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
            Netflix 클론 3단계 완성 | NextAuth 로그인 시스템 구축
          </p>
          <p className="text-sm text-netflix-gray-light mt-2">
            로그인/로그아웃, Google OAuth, 세션 관리 완료
          </p>
        </div>
      </footer>
    </div>
  );
}
