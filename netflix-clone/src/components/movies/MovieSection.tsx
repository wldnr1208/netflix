// src/components/movies/MovieSection.tsx
// 영화 섹션 컴포넌트 (데이터 페칭 + 슬라이더)

"use client";

import React from "react";
import { useMovies } from "@/hooks/useMovies";
import { getMovieCategoryName } from "@/lib/tmdb";
import MovieSlider from "@/components/ui/MovieSlider";
import { MovieSectionProps } from "@/types";

/**
 * 영화 섹션 컴포넌트
 *
 * TMDB API에서 데이터를 가져와 슬라이더로 표시
 */
export default function MovieSection({
  title,
  category,
  className,
}: MovieSectionProps) {
  const { data, isLoading, isError, error } = useMovies(category);

  // 제목이 없으면 카테고리 이름 사용
  const sectionTitle = title || getMovieCategoryName(category);

  // 에러 상태
  if (isError) {
    return (
      <div className={className}>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          {sectionTitle}
        </h2>
        <div className="bg-red-900/20 border border-red-500 rounded-sm p-4">
          <p className="text-red-400 text-sm">
            영화 데이터를 불러올 수 없습니다: {error?.message}
          </p>
          <p className="text-red-300 text-xs mt-2">
            TMDB API 키를 확인해주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <MovieSlider
        movies={data?.results || []}
        title={sectionTitle}
        isLoading={isLoading}
        onMovieClick={(movie) => console.log("영화 클릭:", movie.title)}
      />
    </div>
  );
}
