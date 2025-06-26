// src/components/ui/WatchlistIcon.tsx
// (텍스트 없는) 원형 찜하기 아이콘 버튼
"use client";

import { Movie, TVShow } from "@/types";
import { useWatchlistItem } from "@/store/useWatchlistStore";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface WatchlistIconProps {
  item: Movie | TVShow;
  type: "movie" | "tv";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function WatchlistIcon({
  item,
  type,
  size = "md",
  className,
}: WatchlistIconProps) {
  const { isWatchlisted, toggle } = useWatchlistItem(item.id, type);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeMap = {
    sm: { btn: "w-8 h-8", icon: "w-4 h-4" },
    md: { btn: "w-10 h-10", icon: "w-5 h-5" },
    lg: { btn: "w-12 h-12", icon: "w-6 h-6" },
  };
  const cur = sizeMap[size];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 카드 클릭 막기
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    toggle(item);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative rounded-full border-2 border-white/80 hover:border-white backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:ring-offset-2 focus:ring-offset-black",
        isWatchlisted
          ? "bg-netflix-red hover:bg-netflix-red-dark"
          : "bg-black/60 hover:bg-black/80",
        cur.btn,
        isAnimating && "scale-110",
        className
      )}
      aria-label={isWatchlisted ? "찜하기 해제" : "찜하기"}
    >
      <div className="relative flex items-center justify-center">
        {isWatchlisted ? (
          <svg
            className={cn(cur.icon, "text-white")}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className={cn(cur.icon, "text-white")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
