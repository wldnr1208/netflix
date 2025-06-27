// src/components/pages/MoviesPage.tsx
"use client";

import React from "react";
import { useHomePageMovies } from "@/hooks/useMovies";
import { Movie } from "@/types";
import { MovieSliderGroup } from "@/components/ui/MovieSliderGroup";
import MovieSlider from "@/components/ui/MovieSlider";

export default function MoviesPage() {
  const {
    popular,
    nowPlaying,
    topRated,
    upcoming,
    trending,
    isLoading,
    hasError,
  } = useHomePageMovies();

  const handleMovieClick = (movie: Movie) => {
    alert(`${movie.title} 상세 페이지로 이동 (개발 예정)`);
  };

  const handleSeeAllClick = (category: string) => {
    alert(`${category} 전체 목록 페이지로 이동 (개발 예정)`);
  };

  return (
    <div className="min-h-screen netflix-bg-gray-dark pt-20">
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🍿 영화
          </h1>
          <p className="text-lg text-netflix-gray-light">
            최신 영화부터 클래식까지, 다양한 장르의 영화를 만나보세요
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
          <MovieSlider
            title="🔥 지금 뜨는 영화"
            movies={
              trending.data?.results.filter((m): m is Movie => "title" in m) ??
              []
            }
            isLoading={trending.isLoading}
            onMovieClick={handleMovieClick}
            onSeeAllClick={() => handleSeeAllClick("트렌딩 영화")}
          />
          <MovieSlider
            title="🍿 인기 영화"
            movies={popular.data?.results ?? []}
            isLoading={popular.isLoading}
            onMovieClick={handleMovieClick}
            onSeeAllClick={() => handleSeeAllClick("인기 영화")}
          />
          <MovieSlider
            title="🎬 현재 상영중"
            movies={nowPlaying.data?.results ?? []}
            isLoading={nowPlaying.isLoading}
            onMovieClick={handleMovieClick}
            onSeeAllClick={() => handleSeeAllClick("현재 상영중")}
          />
          <MovieSlider
            title="⭐ 높은 평점 영화"
            movies={
              topRated.data?.results.filter((m): m is Movie => "title" in m) ??
              []
            }
            isLoading={topRated.isLoading}
            onMovieClick={handleMovieClick}
            onSeeAllClick={() => handleSeeAllClick("높은 평점 영화")}
          />
          <MovieSlider
            title="🔜 개봉 예정"
            movies={upcoming.data?.results ?? []}
            isLoading={upcoming.isLoading}
            onMovieClick={handleMovieClick}
            onSeeAllClick={() => handleSeeAllClick("개봉 예정")}
          />
        </MovieSliderGroup>
      </main>

      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-netflix-red text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            <span className="text-sm">영화 데이터 로딩 중...</span>
          </div>
        </div>
      )}
    </div>
  );
}
