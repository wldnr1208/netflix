// src/components/ui/WatchlistButton.tsx
// 찜하기 버튼 컴포넌트 (TypeScript 오류 수정 버전)
"use client";

import React, { useState } from "react";
import { Movie, TVShow } from "@/types";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { cn } from "@/lib/utils";

interface WatchlistButtonProps {
  item: Movie | TVShow;
  type: "movie" | "tv";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export default function WatchlistButton({
  item,
  type,
  size = "md",
  showLabel = true,
  className,
}: WatchlistButtonProps) {
  /* ------------------------------------------------------------------
   * ✅ 1. id 로만 찜 여부 비교
   *      - 동일 작품을 movie/tv 변환하다 겹치는 문제 제거
   * ------------------------------------------------------------------ */
  const isWatchlisted = useWatchlistStore((s) =>
    s.watchlist.some((i) => i.id === item.id)
  );

  const add = useWatchlistStore((s) => s.addToWatchlist);
  const remove = useWatchlistStore((s) => s.removeFromWatchlist);

  /* 애니메이션 플래그 */
  const [isAnimating, setIsAnimating] = useState(false);

  /* 크기별 스타일 매핑 */
  const sizeMap = {
    sm: {
      btn: showLabel ? "px-3 py-1.5" : "w-8 h-8 p-0",
      icon: "w-4 h-4",
      text: "text-xs",
    },
    md: {
      btn: showLabel ? "px-4 py-2" : "w-10 h-10 p-0",
      icon: "w-5 h-5",
      text: "text-sm",
    },
    lg: {
      btn: showLabel ? "px-6 py-3" : "w-12 h-12 p-0",
      icon: "w-6 h-6",
      text: "text-base",
    },
  } as const;
  const cur = sizeMap[size];

  /* ------------------------------------------------------------------
   * ✅ 2. 모든 이벤트에서 전파 차단 (onClick, onMouseDown, onPointerDown)
   * ✅ 3. 찜하기 동작만 수행하고 절대 상세 페이지로 이동하지 않음
   * ------------------------------------------------------------------ */
  const handleClick = (e: React.MouseEvent) => {
    console.log("[WatchlistButton] 찜하기 버튼 클릭됨", item.id);
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log("[WatchlistButton] 마우스 다운 이벤트");
    e.preventDefault();
    e.stopPropagation();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleWatchlist = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 250);

    if (isWatchlisted) {
      remove(item.id, type);
      console.log("[WatchlistButton] 찜 해제:", item.id);
    } else {
      add(item, type);
      console.log("[WatchlistButton] 찜 추가:", item.id);
    }
  };

  const title = (item as Movie).title ?? (item as TVShow).name ?? "제목 없음";

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onPointerDown={handlePointerDown}
      className={cn(
        "relative flex items-center justify-center gap-2 transition-all duration-200",
        "border-2 border-white/80 hover:border-white backdrop-blur-sm focus:outline-none",
        "focus:ring-2 focus:ring-netflix-red focus:ring-offset-2 focus:ring-offset-black z-30",
        isWatchlisted
          ? "bg-netflix-red hover:bg-netflix-red-dark text-white"
          : "bg-black/60 hover:bg-black/80 text-white",
        showLabel ? "rounded-lg" : "rounded-full",
        cur.btn,
        isAnimating && "scale-110",
        className
      )}
      aria-label={isWatchlisted ? `${title} 찜 해제` : `${title} 찜하기`}
      aria-pressed={isWatchlisted}
    >
      {/* 하트 아이콘 */}
      <svg
        className={cn(
          cur.icon,
          "transition-all duration-200",
          isAnimating && "animate-pulse"
        )}
        viewBox="0 0 24 24"
        fill={isWatchlisted ? "currentColor" : "none"}
        stroke={isWatchlisted ? "none" : "currentColor"}
        strokeWidth={isWatchlisted ? 0 : 2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>

      {/* 텍스트 라벨 */}
      {showLabel && (
        <span className={cn("font-medium", cur.text)}>
          {isWatchlisted ? "찜함" : "찜하기"}
        </span>
      )}

      {/* 클릭 애니메이션 */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
      )}
    </button>
  );
}
