// src/components/ui/TVCard.tsx
// Netflix 스타일 TV 프로그램 카드 컴포넌트
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getImageUrl, formatRating, getYear, getGenreNames } from "@/lib/utils";
import { TVShow } from "@/types";
import WatchlistButton from "./WatchlistButton";

interface TVCardProps {
  show: TVShow;
  size?: "sm" | "md" | "lg";
  showTitle?: boolean;
  showOverview?: boolean;
  onPlay?: (show: TVShow) => void;
  className?: string;
}

/**
 * Netflix 스타일 TV 프로그램 카드 컴포넌트
 *
 * 기능:
 * - 호버 시 확대 및 상세 정보 표시
 * - 재생, 찜하기 버튼
 * - 반응형 디자인
 * - 이미지 최적화
 */
export default function TVCard({
  show,
  size = "md",
  showTitle = true,
  showOverview = false,
  onPlay,
  className,
}: TVCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 크기별 스타일 정의
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
  };

  const currentSize = sizeClasses[size];

  // 이미지 URL 생성
  const posterUrl = getImageUrl(show.poster_path, "w500");

  // 장르 이름 가져오기
  const genreNames = getGenreNames(show.genre_ids);

  // 연도 추출 (TV는 first_air_date 사용)
  const year = getYear(show.first_air_date);

  const handlePlay = () => {
    onPlay?.(show);
  };

  // TV 프로그램 제목 (name 또는 title 사용)
  const title = show.name || show.title || "제목 없음";

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-300 ease-out",
        currentSize.container,
        currentSize.hoverScale,
        "hover:z-20",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 메인 카드 영역 */}
      <div className="relative overflow-hidden rounded-sm netflix-card">
        {/* 포스터 이미지 */}
        <div className={cn("relative", currentSize.image)}>
          {!imageError ? (
            <Image
              src={posterUrl}
              alt={title}
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
            // 이미지 로드 실패 시 플레이스홀더
            <div className="w-full h-full bg-netflix-gray flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📺</div>
                <p className="text-xs text-netflix-gray-light">이미지 없음</p>
              </div>
            </div>
          )}

          {/* 로딩 스켈레톤 */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-netflix-gray animate-pulse" />
          )}

          {/* 평점 배지 - 상단 왼쪽 */}
          {show.vote_average > 0 && (
            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm rounded px-2 py-1 z-10">
              <span className="text-xs font-medium text-white">
                ⭐ {show.vote_average.toFixed(1)}
              </span>
            </div>
          )}

          {/* TV 프로그램 배지 */}
          <div className="absolute top-2 right-2 bg-blue-600/80 backdrop-blur-sm rounded px-2 py-1 z-10">
            <span className="text-xs font-medium text-white">TV</span>
          </div>

          {/* 찜하기 버튼 - 하단 오른쪽 (호버 아닐 때) */}
          {!isHovered && (
            <div className="absolute bottom-2 right-2 z-10">
              <WatchlistButton
                item={show}
                type="tv"
                size="sm"
                showLabel={false}
                className="w-8 h-8 p-0 bg-black/60 hover:bg-black/80 border-white/60"
              />
            </div>
          )}

          {/* 호버 시 그라데이션 오버레이 */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          )}
        </div>

        {/* 호버 시 나타나는 상세 정보 */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            {/* 액션 버튼들 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {/* 재생 버튼 */}
                <button
                  onClick={handlePlay}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                  aria-label={`${title} 재생`}
                >
                  <svg
                    className="w-4 h-4 text-black ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 5v10l8-5z" />
                  </svg>
                </button>

                {/* 찜하기 버튼 - 호버 시 더 큰 버튼 */}
                <WatchlistButton
                  item={show}
                  type="tv"
                  size="sm"
                  showLabel={false}
                  className="w-8 h-8 p-0"
                />

                {/* 상세 정보 버튼 */}
                <button
                  className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center hover:border-gray-300 transition-colors duration-200"
                  aria-label={`${title} 상세 정보`}
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

              {/* 평점 표시 */}
              {show.vote_average > 0 && (
                <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                  {formatRating(show.vote_average)}
                </div>
              )}
            </div>

            {/* TV 프로그램 정보 */}
            <div className="space-y-2">
              {showTitle && (
                <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                  {title}
                </h3>
              )}

              {/* 연도 및 장르 */}
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                {year && <span>{year}</span>}
                {genreNames.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{genreNames.slice(0, 2).join(", ")}</span>
                  </>
                )}
                {show.origin_country && show.origin_country.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{show.origin_country[0]}</span>
                  </>
                )}
              </div>

              {/* 개요 (옵션) */}
              {showOverview && show.overview && (
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                  {show.overview}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 카드 하단 제목 (호버 상태가 아닐 때) */}
      {showTitle && !isHovered && (
        <div className="mt-2 px-1">
          <h3 className="text-sm font-medium text-white line-clamp-2 leading-tight">
            {title}
          </h3>
          {year && (
            <p className="text-xs text-netflix-gray-light mt-1">{year}</p>
          )}
        </div>
      )}
    </div>
  );
}
