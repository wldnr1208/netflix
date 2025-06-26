// src/components/ui/WatchlistButton.tsx
// 찜하기 버튼 컴포넌트 (버튼 반응·토글 신뢰도 강화 버전)
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
   * ✅ 2. onPointerDown → 모바일·데스크톱 모두 첫 입력 즉시 반응
   * ✅ 3. e.stopPropagation() 으로 카드 내부 다른 핸들러와 충돌 방지
   * ------------------------------------------------------------------ */
  const toggleWatchlist = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 250);

    if (isWatchlisted) {
      remove(item.id, type); // store 시그니처 맞춰 type 전송
    } else {
      add(item, type);
    }
  };

  const title = (item as Movie).title ?? (item as TVShow).name ?? "제목 없음";

  return (
    <button
      type="button"
      onPointerDown={toggleWatchlist}
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
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none" />
      )}
    </button>
  );
}
