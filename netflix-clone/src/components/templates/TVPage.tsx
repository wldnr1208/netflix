// src/components/templates/TVPage.tsx
"use client";

import React from "react";
import { useHomePageTVShows } from "@/hooks/useTVShows";
import { TVShow } from "@/types";
import { MovieSliderGroup } from "@/components/ui/MovieSliderGroup";
import TVSlider from "@/components/ui/TVSlider";

export default function TVPage() {
  const {
    popular,
    topRated,
    onTheAir,
    airingToday,
    trending,
    isLoading,
    hasError,
  } = useHomePageTVShows();

  const handleTVClick = (show: TVShow) => {
    console.log("TV 프로그램 클릭:", show.name);
    alert(`${show.name} 상세 페이지로 이동 (개발 예정)`);
  };

  const handleSeeAllClick = (category: string) => {
    console.log("모두 보기 클릭:", category);
    alert(`${category} 전체 목록 페이지로 이동 (개발 예정)`);
  };

  return (
    <div className="min-h-screen netflix-bg-gray-dark pt-20">
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            📺 TV 프로그램
          </h1>
          <p className="text-lg text-netflix-gray-light">
            드라마부터 예능까지, 다양한 TV 프로그램을 즐겨보세요
          </p>
        </div>
      </section>

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

      <main className="pb-16">
        <MovieSliderGroup className="px-4">
          <TVSlider
            title="🔥 지금 뜨는 TV 프로그램"
            shows={
              trending.data?.results.filter((s): s is TVShow => "name" in s) ??
              []
            }
            isLoading={trending.isLoading}
            onShowClick={handleTVClick}
            onSeeAllClick={() => handleSeeAllClick("트렌딩 TV")}
          />
          <TVSlider
            title="📺 인기 TV 프로그램"
            shows={popular.data?.results ?? []}
            isLoading={popular.isLoading}
            onShowClick={handleTVClick}
            onSeeAllClick={() => handleSeeAllClick("인기 TV")}
          />
          <TVSlider
            title="📡 현재 방영중"
            shows={onTheAir.data?.results ?? []}
            isLoading={onTheAir.isLoading}
            onShowClick={handleTVClick}
            onSeeAllClick={() => handleSeeAllClick("현재 방영중")}
          />
          <TVSlider
            title="⭐ 높은 평점 TV 프로그램"
            shows={topRated.data?.results ?? []}
            isLoading={topRated.isLoading}
            onShowClick={handleTVClick}
            onSeeAllClick={() => handleSeeAllClick("높은 평점 TV")}
          />
          <TVSlider
            title="📅 오늘 방영"
            shows={airingToday.data?.results ?? []}
            isLoading={airingToday.isLoading}
            onShowClick={handleTVClick}
            onSeeAllClick={() => handleSeeAllClick("오늘 방영")}
          />
        </MovieSliderGroup>
      </main>

      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-netflix-red text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            <span className="text-sm">TV 프로그램 로딩 중...</span>
          </div>
        </div>
      )}
    </div>
  );
}
