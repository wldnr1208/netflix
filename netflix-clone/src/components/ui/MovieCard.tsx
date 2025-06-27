// src/components/ui/MovieCard.tsx
// 완성된 영화 카드 컴포넌트 (카드 클릭으로 상세 이동, 버튼들은 개별 동작)
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getImageUrl, formatRating, getYear, getGenreNames } from "@/lib/utils";
import { MovieCardProps } from "@/types";
import WatchlistButton from "./WatchlistButton";

type MovieWithType = MovieCardProps["movie"] & {
  type?: "movie" | "tv";
  media_type?: "movie" | "tv";
};

export default function MovieCard({
  movie,
  size = "md",
  showTitle = true,
  showOverview = false,
  onPlay,
  className,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const router = useRouter();

  const typedMovie = movie as MovieWithType;
  const itemType: "movie" | "tv" =
    typedMovie.media_type === "tv" || typedMovie.type === "tv" ? "tv" : "movie";

  const sizeClasses = {
    sm: {
      container: "w-32 sm:w-40",
      image: "h-48 sm:h-60",
      hoverScale: "hover:scale-110",
    },
    md: {
      container: "w-40 sm:w-48 md:w-56",
      image: "h-60 sm:h-72 md:h-84",
      hoverScale: "hover:scale-105",
    },
    lg: {
      container: "w-48 sm:w-56 md:w-64 lg:w-72",
      image: "h-72 sm:h-84 md:h-96 lg:h-108",
      hoverScale: "hover:scale-105",
    },
  } as const;
  const currentSize = sizeClasses[size];

  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const genreNames = getGenreNames(movie.genre_ids);
  const year = getYear(movie.release_date);

  // 재생 버튼 클릭 (이벤트 전파 차단)
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("[MovieCard] ▶ 재생 버튼 클릭", movie.id);
    onPlay?.(movie);
  };

  // 정보 버튼 클릭 (이벤트 전파 차단)
  const handleInfoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("[MovieCard] ⓘ 정보 버튼 클릭 → 상세 페이지로 이동", movie.id);
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-300 ease-out",
        currentSize.container,
        currentSize.hoverScale,
        "hover:z-20",
        className
      )}
      onMouseDown={(e) => {
        // 버튼이 아닌 카드 영역 클릭시에만 상세 페이지로 이동
        const target = e.target as HTMLElement;
        const isButton = target.closest("button");

        if (!isButton) {
          console.log("[MovieCard] 카드 클릭 → 상세 페이지로 이동:", movie.id);
          e.preventDefault();
          e.stopPropagation();
          router.push(`/movies/${movie.id}`);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-sm netflix-card">
        {/* ─── 이미지 ─── */}
        <div className={cn("relative", currentSize.image)}>
          {!imageError ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 288px"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-netflix-gray flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-xs text-netflix-gray-light">이미지 없음</p>
              </div>
            </div>
          )}

          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-netflix-gray animate-pulse" />
          )}

          {movie.vote_average > 0 && (
            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm rounded px-2 py-1 z-10">
              <span className="text-xs font-medium text-white">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>
          )}

          {/* 비호버 상태의 찜하기 버튼 */}
          {!isHovered && (
            <div className="absolute top-2 right-2 z-50">
              <WatchlistButton
                item={movie}
                type={itemType}
                size="sm"
                showLabel={false}
                className="w-8 h-8 p-0 bg-black/60 hover:bg-black/80 border-white/60"
              />
            </div>
          )}

          {/* 호버 배경 */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          )}
        </div>

        {/* ─── 호버 상세 정보 ─── */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {/* 재생 버튼 */}
                <button
                  type="button"
                  onClick={handlePlay}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 z-50"
                  aria-label={`${movie.title} 재생`}
                >
                  <svg
                    className="w-4 h-4 text-black ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 5v10l8-5z" />
                  </svg>
                </button>

                {/* 찜하기 버튼 */}
                <div className="z-50">
                  <WatchlistButton
                    item={movie}
                    type={itemType}
                    size="sm"
                    showLabel={false}
                    className="w-8 h-8 p-0"
                  />
                </div>

                {/* 정보 버튼 */}
                <button
                  type="button"
                  onClick={handleInfoClick}
                  className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center hover:border-gray-300 transition-colors duration-200 z-50"
                  aria-label={`${movie.title} 상세 정보`}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {movie.vote_average > 0 && (
                <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                  {formatRating(movie.vote_average)}
                </div>
              )}
            </div>

            <div className="space-y-2">
              {showTitle && (
                <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                  {movie.title}
                </h3>
              )}

              <div className="flex items-center space-x-2 text-xs text-gray-300">
                {year && <span>{year}</span>}
                {genreNames.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{genreNames.slice(0, 2).join(", ")}</span>
                  </>
                )}
              </div>

              {showOverview && movie.overview && (
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                  {movie.overview}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ─── 기본 제목 ─── */}
      {showTitle && !isHovered && (
        <div className="mt-2 px-1">
          <h3 className="text-sm font-medium text-white line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          {year && (
            <p className="text-xs text-netflix-gray-light mt-1">{year}</p>
          )}
        </div>
      )}
    </div>
  );
}
