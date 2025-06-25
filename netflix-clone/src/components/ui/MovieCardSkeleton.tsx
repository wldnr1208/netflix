// src/components/ui/MovieCardSkeleton.tsx
// 영화 카드 로딩 스켈레톤 컴포넌트 (단일)
"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface MovieCardSkeletonProps {
  size?: "sm" | "md" | "lg";
  showTitle?: boolean;
  className?: string;
}

/**
 * 단일 영화 카드 스켈레톤 컴포넌트
 *
 * 기능:
 * - 다양한 크기 지원 (sm, md, lg)
 * - 제목 표시 옵션
 * - 반응형 디자인
 * - 부드러운 애니메이션
 *
 * 사용법:
 * <MovieCardSkeleton size="md" showTitle={true} />
 */
export default function MovieCardSkeleton({
  size = "md",
  showTitle = true,
  className,
}: MovieCardSkeletonProps) {
  const sizeClasses = {
    sm: {
      container: "w-32 sm:w-40",
      image: "h-48 sm:h-60",
    },
    md: {
      container: "w-40 sm:w-48 md:w-56",
      image: "h-60 sm:h-72 md:h-84",
    },
    lg: {
      container: "w-48 sm:w-56 md:w-64 lg:w-72",
      image: "h-72 sm:h-84 md:h-96 lg:h-108",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={cn("space-y-2", currentSize.container, className)}>
      {/* 이미지 스켈레톤 */}
      <div
        className={cn(
          "bg-netflix-gray animate-pulse rounded-sm",
          currentSize.image
        )}
      />

      {/* 제목 스켈레톤 */}
      {showTitle && (
        <div className="space-y-2 px-1">
          <div className="h-4 bg-netflix-gray animate-pulse rounded w-3/4" />
          <div className="h-3 bg-netflix-gray animate-pulse rounded w-1/2" />
        </div>
      )}
    </div>
  );
}
