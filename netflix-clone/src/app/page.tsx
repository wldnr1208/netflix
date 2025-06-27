// src/app/page.tsx
// Netflix 클론 홈페이지 - 영화 + TV 프로그램 데이터 포함
"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { useHomePageMovies } from "@/hooks/useMovies";
import { useHomePageTVShows } from "@/hooks/useTVShows";
import { Movie, TVShow } from "@/types";
import { MovieSliderGroup } from "@/components/ui/MovieSliderGroup";
import MovieSlider from "@/components/ui/MovieSlider";
import TVSlider from "@/components/ui/TVSlider";

export default function HomePage() {
  const { data: session, status } = useSession();

  // 홈페이지 영화 데이터 가져오기
  const {
    popular: popularMovies,
    nowPlaying,
    topRated: topRatedMovies,
    upcoming,
    trending: trendingMovies,
    isLoading: moviesLoading,
    hasError: moviesError,
  } = useHomePageMovies();

  // 홈페이지 TV 프로그램 데이터 가져오기
  const {
    popular: popularTV,
    topRated: topRatedTV,
    onTheAir,
    airingToday,
    trending: trendingTV,
    isLoading: tvLoading,
    hasError: tvError,
  } = useHomePageTVShows();

  // 전체 로딩 상태
  const isLoading = moviesLoading || tvLoading;
  const hasError = moviesError || tvError;

  // 영화 클릭 핸들러
  const handleMovieClick = (movie: Movie) => {
    alert(`${movie.title} 상세 페이지로 이동 (개발 예정)`);
  };

  // TV 프로그램 클릭 핸들러
  const handleTVClick = (show: TVShow) => {
    alert(`${show.name} 상세 페이지로 이동 (개발 예정)`);
  };

  // 섹션 "모두 보기" 핸들러
  const handleSeeAllClick = (category: string) => {
    alert(`${category} 전체 목록 페이지로 이동 (개발 예정)`);
  };

  return (
    <div className="min-h-screen netflix-bg-gray-dark">
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-black/80 via-transparent to-black/80">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-gray-900" />

        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            <span className="text-gradient-red">NETFLIX</span> 클론
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 animate-slide-up">
            Next.js 15, NextAuth, React Query, Zustand로 만든 스트리밍 서비스
          </p>

          {/* 로그인 상태 메시지 */}
          {status === "loading" ? (
            <div className="animate-pulse">
              <div className="h-6 bg-white/20 rounded w-64 mx-auto mb-8" />
            </div>
          ) : session?.user ? (
            <div className="mb-8">
              <p className="text-white mb-2">
                안녕하세요, {session.user.name}님! 👋
              </p>
              <p className="text-netflix-gray-light text-sm">
                최신 영화와 TV 프로그램을 즐겨보세요
              </p>
            </div>
          ) : (
            <p className="text-netflix-gray-light mb-8">
              로그인하여 더 많은 기능을 이용해보세요
            </p>
          )}
        </div>
      </section>

      {/* ───────────────── Main ───────────────── */}
      <main className="pb-16">
        {/* API 오류 알림 */}
        {hasError && (
          <section className="py-8 px-4">
            <div className="container mx-auto">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-red-400 mb-2">
                  ⚠️ API 연결 오류
                </h3>
                <p className="text-netflix-gray-light">
                  TMDB API 키를 확인해주세요. (.env.local)
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 슬라이더 묶음 - 영화와 TV 프로그램 혼합 */}
        <MovieSliderGroup className="px-4">
          {/* 트렌딩 영화 */}
          <MovieSlider
            title="🔥 지금 뜨는 영화"
            movies={
              trendingMovies.data?.results.filter(
                (m): m is Movie => "title" in m
              ) ?? []
            }
            isLoading={trendingMovies.isLoading}
            onMovieClick={handleMovieClick}
            onSeeAllClick={() => handleSeeAllClick("트렌딩 영화")}
          />

          {/* 트렌딩 TV 프로그램 */}
          <TVSlider
            title="🔥 지금 뜨는 TV 프로그램"
            shows={
              trendingTV.data?.results.filter(
                (s): s is TVShow => "name" in s
              ) ?? []
            }
            isLoading={trendingTV.isLoading}
            onShowClick={handleTVClick}
            onSeeAllClick={() => handleSeeAllClick("트렌딩 TV")}
          />

          {/* 인기 영화 */}
          <MovieSlider
            title="🍿 인기 영화"
            movies={popularMovies.data?.results ?? []}
            isLoading={popularMovies.isLoading}
            onMovieClick={handleMovieClick}
            onSeeAllClick={() => handleSeeAllClick("인기 영화")}
          />

          {/* 인기 TV 프로그램 */}
          <TVSlider
            title="📺 인기 TV 프로그램"
            shows={popularTV.data?.results ?? []}
            isLoading={popularTV.isLoading}
            onShowClick={handleTVClick}
            onSeeAllClick={() => handleSeeAllClick("인기 TV")}
          />

          {/* 현재 상영중 영화 */}
          <MovieSlider
            title="🎬 현재 상영중"
            movies={nowPlaying.data?.results ?? []}
            isLoading={nowPlaying.isLoading}
            onMovieClick={handleMovieClick}
            onSeeAllClick={() => handleSeeAllClick("현재 상영중")}
          />

          {/* 현재 방영중 TV 프로그램 */}
          <TVSlider
            title="📡 현재 방영중"
            shows={onTheAir.data?.results ?? []}
            isLoading={onTheAir.isLoading}
            onShowClick={handleTVClick}
            onSeeAllClick={() => handleSeeAllClick("현재 방영중")}
          />

          {/* 높은 평점 영화 */}
          <MovieSlider
            title="⭐ 높은 평점 영화"
            movies={
              topRatedMovies.data?.results.filter(
                (m): m is Movie => "title" in m
              ) ?? []
            }
            isLoading={topRatedMovies.isLoading}
            onMovieClick={handleMovieClick}
            onSeeAllClick={() => handleSeeAllClick("높은 평점 영화")}
          />

          {/* 높은 평점 TV 프로그램 */}
          <TVSlider
            title="⭐ 높은 평점 TV 프로그램"
            shows={topRatedTV.data?.results ?? []}
            isLoading={topRatedTV.isLoading}
            onShowClick={handleTVClick}
            onSeeAllClick={() => handleSeeAllClick("높은 평점 TV")}
          />

          {/* 개봉 예정 영화 */}
          <MovieSlider
            title="🔜 개봉 예정"
            movies={upcoming.data?.results ?? []}
            isLoading={upcoming.isLoading}
            onMovieClick={handleMovieClick}
            onSeeAllClick={() => handleSeeAllClick("개봉 예정")}
          />

          {/* 오늘 방영 TV 프로그램 */}
          <TVSlider
            title="📅 오늘 방영"
            shows={airingToday.data?.results ?? []}
            isLoading={airingToday.isLoading}
            onShowClick={handleTVClick}
            onSeeAllClick={() => handleSeeAllClick("오늘 방영")}
          />
        </MovieSliderGroup>
      </main>

      {/* 글로벌 로딩 토스트 */}
      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-netflix-red text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            <span className="text-sm">콘텐츠 로딩 중...</span>
          </div>
        </div>
      )}

      {/* 기존 테스트 섹션들... */}
      <section className="py-16 px-4 border-t border-netflix-gray/20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">🔐 시스템 상태</h2>

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

            {/* API 상태 카드 */}
            <div className="netflix-card p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                TMDB API 상태
              </h3>
              <div className="space-y-2">
                {hasError ? (
                  <p className="text-red-400">❌ API 연결 실패</p>
                ) : (
                  <p className="text-green-400">✅ API 연결 성공</p>
                )}
                <p className="text-sm text-netflix-gray-light">
                  로딩 상태: {isLoading ? "로딩 중..." : "완료"}
                </p>
                <p className="text-sm text-netflix-gray-light">
                  인기 영화: {popularMovies.data?.results?.length || 0}개
                </p>
                <p className="text-sm text-netflix-gray-light">
                  인기 TV: {popularTV.data?.results?.length || 0}개
                </p>
              </div>
            </div>

            {/* 기능 상태 카드 */}
            <div className="netflix-card p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                구현된 기능
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-green-400">✅ 영화 카드 컴포넌트</p>
                <p className="text-green-400">✅ TV 프로그램 카드</p>
                <p className="text-green-400">✅ 로딩 스켈레톤</p>
                <p className="text-green-400">✅ React Query 캐싱</p>
                <p className="text-green-400">✅ 찜하기 기능</p>
                <p className="text-yellow-400">✅ 상세 페이지</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="netflix-bg-gray py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-netflix-gray-light">
            Netflix 클론 4단계 완성 | 영화 + TV 프로그램 데이터 표시 완료
          </p>
          <p className="text-sm text-netflix-gray-light mt-2">
            TMDB API, React Query, 영화/TV 카드 컴포넌트, 찜하기 기능 완료
          </p>
        </div>
      </footer>
    </div>
  );
}
