// src/components/ui/MovieCardLayouts.tsx
// 영화 카드 레이아웃 관련 컴포넌트들
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import MovieCardSkeleton from "./MovieCardSkeleton";

// ============================================================================
// MovieCardGrid - 그리드 레이아웃
// ============================================================================
interface MovieCardGridProps {
  children: React.ReactNode;
  className?: string;
  gap?: "sm" | "md" | "lg";
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
    xlarge?: number;
  };
}

/**
 * 영화 카드 그리드 컨테이너
 *
 * 기능:
 * - 반응형 그리드 레이아웃
 * - 커스텀 컬럼 수 설정
 * - 다양한 gap 크기
 */
export function MovieCardGrid({
  children,
  className,
  gap = "md",
  columns = {
    mobile: 2,
    tablet: 3,
    desktop: 4,
    large: 5,
    xlarge: 6,
  },
}: MovieCardGridProps) {
  // gap 크기 정의
  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  // 컬럼 클래스 생성
  const columnClasses = [
    `grid-cols-${columns.mobile}`,
    `sm:grid-cols-${columns.tablet}`,
    `md:grid-cols-${columns.desktop}`,
    `lg:grid-cols-${columns.large}`,
    `xl:grid-cols-${columns.xlarge}`,
  ].join(" ");

  return (
    <div
      className={cn(
        "grid",
        columnClasses,
        gapClasses[gap],
        "w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================================================
// MovieCardRow - 수평 스크롤 레이아웃
// ============================================================================
interface MovieCardRowProps {
  children: React.ReactNode;
  className?: string;
  showScrollbar?: boolean;
  gap?: "sm" | "md" | "lg";
}

/**
 * 수평 스크롤 가능한 영화 카드 컨테이너
 *
 * 기능:
 * - 수평 스크롤
 * - 스크롤바 숨김/표시 옵션
 * - 부드러운 스크롤 애니메이션
 */
export function MovieCardRow({
  children,
  className,
  showScrollbar = false,
  gap = "md",
}: MovieCardRowProps) {
  // gap 크기 정의
  const gapClasses = {
    sm: "space-x-2",
    md: "space-x-4",
    lg: "space-x-6",
  };

  return (
    <div
      className={cn(
        "flex overflow-x-auto pb-4",
        gapClasses[gap],
        !showScrollbar && "scrollbar-hide",
        "scroll-smooth",
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================================================
// MovieCardSection - 섹션 래퍼 (제목 + 레이아웃)
// ============================================================================
interface MovieCardSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  layout?: "grid" | "row";
  showSeeAll?: boolean;
  onSeeAllClick?: () => void;
}

/**
 * 영화 카드 섹션 (제목과 그리드/행을 포함)
 *
 * 기능:
 * - 섹션 제목 표시
 * - 그리드/행 레이아웃 선택
 * - "모두 보기" 버튼
 */
export function MovieCardSection({
  title,
  children,
  className,
  layout = "grid",
  showSeeAll = true,
  onSeeAllClick,
}: MovieCardSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      {/* 섹션 제목 */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>

        {showSeeAll && (
          <button
            onClick={onSeeAllClick}
            className="text-netflix-red hover:text-netflix-red-dark transition-colors duration-200 text-sm font-medium"
          >
            모두 보기
          </button>
        )}
      </div>

      {/* 컨텐츠 */}
      {layout === "grid" ? (
        <MovieCardGrid>{children}</MovieCardGrid>
      ) : (
        <MovieCardRow>{children}</MovieCardRow>
      )}
    </section>
  );
}

// ============================================================================
// MovieCardSkeletonList - 여러 스켈레톤 렌더링
// ============================================================================
interface MovieCardSkeletonListProps {
  count?: number;
  size?: "sm" | "md" | "lg";
  showTitle?: boolean;
  className?: string;
  layout?: "grid" | "row";
}

/**
 * 여러 개의 스켈레톤을 렌더링하는 컴포넌트
 *
 * 기능:
 * - 원하는 개수만큼 스켈레톤 렌더링
 * - 그리드/행 레이아웃 선택
 * - 모든 MovieCardSkeleton props 지원
 */
export function MovieCardSkeletonList({
  count = 6,
  size = "md",
  showTitle = true,
  className,
  layout = "grid",
}: MovieCardSkeletonListProps) {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <MovieCardSkeleton
      key={`skeleton-${index}`}
      size={size}
      showTitle={showTitle}
      className={className}
    />
  ));

  return layout === "grid" ? (
    <MovieCardGrid>{skeletons}</MovieCardGrid>
  ) : (
    <MovieCardRow>{skeletons}</MovieCardRow>
  );
}

// ============================================================================
// 기본 export (가장 많이 사용될 컴포넌트)
// ============================================================================
export default MovieCardGrid;
