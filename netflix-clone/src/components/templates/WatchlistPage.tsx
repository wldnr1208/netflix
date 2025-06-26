// src/components/templates/WatchlistPage.tsx
// 찜한 콘텐츠 목록 페이지 컴포넌트 (수정된 버전)
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useWatchlist } from "@/store/useWatchlistStore";
import { Movie } from "@/types";
import MovieCard from "@/components/ui/MovieCard";
import MovieCardGrid from "../ui/MovieCardLayouts";

/**
 * 찜한 콘텐츠 목록 페이지
 *
 * 기능:
 * - 영화/TV 프로그램 필터
 * - 정렬 옵션 (최신순, 제목순, 평점순)
 * - 빈 상태 처리
 * - 대량 삭제 기능
 */

// 정렬 타입 정의
type SortType = "addedAt" | "title" | "rating";

// 필터 타입 정의
type FilterType = "all" | "movie" | "tv";

// 찜하기 아이템 타입 확장 (Zustand 스토어에서 사용하는 타입)
interface WatchlistItemExtended {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  type: "movie" | "tv";
  addedAt: string;
  // Movie 타입에 필요한 추가 속성들
  original_title: string;
  vote_count: number;
  adult: boolean;
  original_language: string;
  popularity: number;
  video: boolean;
}

export default function WatchlistPage() {
  const { items, movies, tvShows, count, clear } = useWatchlist();
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("addedAt");

  // 필터링된 아이템
  const filteredItems =
    filter === "all" ? items : filter === "movie" ? movies : tvShows;

  // 정렬된 아이템
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "addedAt":
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      case "title":
        return a.title.localeCompare(b.title, "ko");
      case "rating":
        return b.vote_average - a.vote_average;
      default:
        return 0;
    }
  });

  // 영화 클릭 핸들러 - 타입 안전성 개선
  const handleMovieClick = (item: WatchlistItemExtended) => {
    console.log("영화 클릭:", item.title);
    alert(`${item.title} 상세 페이지로 이동 (개발 예정)`);
  };

  // 전체 삭제 핸들러
  const handleClearAll = () => {
    if (window.confirm("찜한 콘텐츠를 모두 삭제하시겠습니까?")) {
      clear();
    }
  };

  // 찜하기 아이템을 Movie 타입으로 변환
  const convertToMovie = (item: WatchlistItemExtended): Movie => ({
    id: item.id,
    title: item.title,
    original_title: item.original_title || item.title,
    overview: item.overview,
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    release_date: item.release_date,
    vote_average: item.vote_average,
    vote_count: item.vote_count || 0,
    genre_ids: item.genre_ids,
    adult: item.adult || false,
    original_language: item.original_language || "ko",
    popularity: item.popularity || 0,
    video: item.video || false,
  });

  return (
    <div className="min-h-screen netflix-bg-gray-dark py-8">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            내가 찜한 콘텐츠
          </h1>
          <p className="text-netflix-gray-light">
            총 {count}개의 콘텐츠를 찜했습니다
          </p>
        </div>

        {/* 컨트롤 바 */}
        {count > 0 && (
          <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-netflix-gray/20 rounded-lg">
            {/* 필터 버튼들 */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  filter === "all"
                    ? "bg-netflix-red text-white"
                    : "bg-netflix-gray text-netflix-gray-light hover:text-white"
                )}
              >
                전체 ({count})
              </button>
              <button
                onClick={() => setFilter("movie")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  filter === "movie"
                    ? "bg-netflix-red text-white"
                    : "bg-netflix-gray text-netflix-gray-light hover:text-white"
                )}
              >
                영화 ({movies.length})
              </button>
              <button
                onClick={() => setFilter("tv")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  filter === "tv"
                    ? "bg-netflix-red text-white"
                    : "bg-netflix-gray text-netflix-gray-light hover:text-white"
                )}
              >
                TV 프로그램 ({tvShows.length})
              </button>
            </div>

            {/* 정렬 옵션 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-4 py-2 bg-netflix-gray text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-netflix-red"
            >
              <option value="addedAt">최신 추가순</option>
              <option value="title">제목순</option>
              <option value="rating">평점순</option>
            </select>

            {/* 전체 삭제 버튼 */}
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
            >
              전체 삭제
            </button>
          </div>
        )}

        {/* 콘텐츠 목록 */}
        {sortedItems.length > 0 ? (
          <MovieCardGrid>
            {sortedItems.map((item) => (
              <MovieCard
                key={`${item.type}-${item.id}`}
                movie={convertToMovie(item as WatchlistItemExtended)}
                size="md"
                showOverview={true}
                onPlay={() => handleMovieClick(item as WatchlistItemExtended)}
              />
            ))}
          </MovieCardGrid>
        ) : (
          // 빈 상태
          <div className="text-center py-16">
            <div className="text-6xl mb-6">💔</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {filter === "all"
                ? "찜한 콘텐츠가 없습니다"
                : filter === "movie"
                ? "찜한 영화가 없습니다"
                : "찜한 TV 프로그램이 없습니다"}
            </h3>
            <p className="text-netflix-gray-light mb-8 max-w-md mx-auto">
              마음에 드는 콘텐츠를 찜해보세요. 하트 버튼을 클릭하면 여기에
              저장됩니다.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-netflix-red hover:bg-netflix-red-dark text-white rounded-lg font-medium transition-colors duration-200"
            >
              콘텐츠 둘러보기
            </Link>
          </div>
        )}

        {/* 통계 정보 */}
        {count > 0 && (
          <div className="mt-12 p-6 bg-netflix-gray/20 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              📊 찜하기 통계
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-netflix-red">
                  {count}
                </div>
                <div className="text-sm text-netflix-gray-light">총 콘텐츠</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {movies.length}
                </div>
                <div className="text-sm text-netflix-gray-light">영화</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {tvShows.length}
                </div>
                <div className="text-sm text-netflix-gray-light">
                  TV 프로그램
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {count > 0
                    ? (
                        sortedItems.reduce(
                          (sum, item) => sum + item.vote_average,
                          0
                        ) / sortedItems.length
                      ).toFixed(1)
                    : "0"}
                </div>
                <div className="text-sm text-netflix-gray-light">평균 평점</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
