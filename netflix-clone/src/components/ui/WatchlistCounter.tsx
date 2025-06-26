// src/components/ui/WatchlistCounter.tsx
// 헤더용 찜하기 카운터 컴포넌트
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useWatchlist } from "@/store/useWatchlistStore";

interface WatchlistCounterProps {
  className?: string;
  showCount?: boolean;
}

/**
 * 찜하기 카운터 컴포넌트 (헤더용)
 *
 * 기능:
 * - 찜한 콘텐츠 개수 표시
 * - 찜하기 페이지로 이동
 * - 애니메이션 효과
 */
export default function WatchlistCounter({
  className,
  showCount = true,
}: WatchlistCounterProps) {
  const { count } = useWatchlist();

  return (
    <Link
      href="/watchlist"
      className={cn(
        "relative inline-flex items-center justify-center",
        "w-10 h-10 rounded-full",
        "hover:bg-white/10 transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-white/20",
        className
      )}
      aria-label={`찜한 콘텐츠 ${count}개 보기`}
    >
      {/* 하트 아이콘 */}
      <svg
        className="w-6 h-6 text-white"
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

      {/* 카운터 배지 */}
      {showCount && count > 0 && (
        <div className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-netflix-red rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white px-1">
            {count > 99 ? "99+" : count}
          </span>
        </div>
      )}

      {/* 펄스 애니메이션 (새로 추가될 때) */}
      {count > 0 && (
        <div className="absolute inset-0 rounded-full bg-netflix-red/20 animate-ping" />
      )}
    </Link>
  );
}
