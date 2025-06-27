// src/app/search/page.tsx
// 검색 결과 페이지 (기존 훅 사용)
"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchMovies } from "@/hooks/useMovies";
import { useSearchTVShows } from "@/hooks/useTVShows";
import MovieCard from "@/components/ui/MovieCard";
import TVCard from "@/components/ui/TVCard";
import { Movie, TVShow } from "@/types";

// 검색 결과 섹션 컴포넌트
interface SearchResultsSectionProps {
  query: string;
}

function SearchResultsSection({ query }: SearchResultsSectionProps) {
  const [activeTab, setActiveTab] = useState<"all" | "movies" | "tv">("all");

  // 검색 API 호출
  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
  } = useSearchMovies(query);

  const {
    data: tvData,
    isLoading: tvLoading,
    error: tvError,
  } = useSearchTVShows(query);

  // 데이터 정리
  const movies = moviesData?.results || [];
  const tvShows = tvData?.results || [];
  const totalMovies = moviesData?.total_results || 0;
  const totalTV = tvData?.total_results || 0;
  const totalResults = totalMovies + totalTV;

  const isLoading = moviesLoading || tvLoading;
  const hasError = moviesError || tvError;

  // 영화 재생 핸들러
  const handleMoviePlay = (movie: Movie) => {
    console.log(`영화 재생: ${movie.title}`);
    // 추후 예고편 모달 구현
  };

  // TV 재생 핸들러
  const handleTVPlay = (show: TVShow) => {
    const title = show.name || show.title || "제목 없음";
    console.log(`TV 재생: ${title}`);
    // 추후 예고편 모달 구현
  };

  // 탭별 필터링된 결과
  const getFilteredResults = () => {
    switch (activeTab) {
      case "movies":
        return { displayMovies: movies, displayTV: [] };
      case "tv":
        return { displayMovies: [], displayTV: tvShows };
      default:
        return { displayMovies: movies, displayTV: tvShows };
    }
  };

  const { displayMovies, displayTV } = getFilteredResults();

  // 검색어가 없는 경우
  if (!query || query.trim().length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            검색어를 입력해주세요
          </h1>
          <p className="text-netflix-gray-light leading-relaxed">
            좋아하는 영화나 TV 프로그램을
            <br />
            검색해보세요.
          </p>
        </div>
      </div>
    );
  }

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-netflix-red mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-white mb-2">
              검색 중...
            </h2>
            <p className="text-netflix-gray-light">
              {`"{query}" 검색 결과를 가져오고 있습니다.`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (hasError && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            검색 중 오류가 발생했습니다
          </h2>
          <p className="text-netflix-gray-light mb-8 leading-relaxed">
            네트워크 연결을 확인하고
            <br />
            다시 시도해주세요.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-netflix-red hover:bg-netflix-red-dark text-white font-medium rounded-lg transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 검색 결과 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          &quot;<span className="text-netflix-red">{query}</span>&quot; 검색
          결과
        </h1>
        <p className="text-netflix-gray-light">
          총{" "}
          <span className="text-white font-medium">
            {totalResults.toLocaleString()}
          </span>
          개의 결과를 찾았습니다.
        </p>
      </div>

      {/* 검색 결과가 없는 경우 */}
      {totalResults === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            &quot;{query}&quot;에 대한 검색 결과가 없습니다
          </h2>
          <p className="text-netflix-gray-light mb-8 leading-relaxed">
            다른 검색어로 시도해보세요.
          </p>

          <div className="max-w-sm mx-auto space-y-3 text-sm text-netflix-gray-light">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-netflix-red rounded-full"></span>
              <span>검색어의 철자를 확인해보세요</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-netflix-red rounded-full"></span>
              <span>더 간단한 검색어를 사용해보세요</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-netflix-red rounded-full"></span>
              <span>다른 키워드로 검색해보세요</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 탭 네비게이션 */}
          <div className="flex space-x-8 mb-8 border-b border-netflix-gray/30">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-4 px-1 text-sm font-medium border-b-2 transition-all duration-200 ${
                activeTab === "all"
                  ? "border-netflix-red text-white"
                  : "border-transparent text-netflix-gray-light hover:text-white hover:border-netflix-gray"
              }`}
            >
              전체 ({totalResults})
            </button>

            {totalMovies > 0 && (
              <button
                onClick={() => setActiveTab("movies")}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === "movies"
                    ? "border-netflix-red text-white"
                    : "border-transparent text-netflix-gray-light hover:text-white hover:border-netflix-gray"
                }`}
              >
                영화 ({totalMovies})
              </button>
            )}

            {totalTV > 0 && (
              <button
                onClick={() => setActiveTab("tv")}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === "tv"
                    ? "border-netflix-red text-white"
                    : "border-transparent text-netflix-gray-light hover:text-white hover:border-netflix-gray"
                }`}
              >
                TV 프로그램 ({totalTV})
              </button>
            )}
          </div>

          {/* 영화 검색 결과 */}
          {displayMovies.length > 0 && (
            <section className="mb-12">
              {activeTab === "all" && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    영화 ({totalMovies})
                  </h2>
                  {totalMovies > 6 && (
                    <button
                      onClick={() => setActiveTab("movies")}
                      className="text-netflix-red hover:text-netflix-red-light text-sm font-medium transition-colors"
                    >
                      모두 보기 →
                    </button>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {(activeTab === "all"
                  ? displayMovies.slice(0, 6)
                  : displayMovies
                ).map((movie) => (
                  <MovieCard
                    key={`movie-${movie.id}`}
                    movie={movie}
                    size="md"
                    showTitle={true}
                    onPlay={handleMoviePlay}
                    className="w-full"
                  />
                ))}
              </div>
            </section>
          )}

          {/* TV 프로그램 검색 결과 */}
          {displayTV.length > 0 && (
            <section className="mb-12">
              {activeTab === "all" && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    TV 프로그램 ({totalTV})
                  </h2>
                  {totalTV > 6 && (
                    <button
                      onClick={() => setActiveTab("tv")}
                      className="text-netflix-red hover:text-netflix-red-light text-sm font-medium transition-colors"
                    >
                      모두 보기 →
                    </button>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {(activeTab === "all" ? displayTV.slice(0, 6) : displayTV).map(
                  (show) => (
                    <TVCard
                      key={`tv-${show.id}`}
                      show={show}
                      size="md"
                      showTitle={true}
                      onPlay={handleTVPlay}
                      className="w-full"
                    />
                  )
                )}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

// 메인 검색 페이지 컴포넌트
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return <SearchResultsSection query={query} />;
}

// 검색 페이지 메인 컴포넌트
export default function SearchPage() {
  return (
    <div className="min-h-screen netflix-bg-gray-dark pt-20">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-20">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-netflix-red mx-auto mb-6"></div>
                <p className="text-white text-lg">페이지를 로딩 중...</p>
              </div>
            </div>
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  );
}
