// src/components/ui/TVSlider.tsx
// Netflix 스타일 TV 프로그램 슬라이더 컴포넌트
"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TVShow } from "@/types";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import { MovieCardSkeletonList } from "./MovieCardLayouts";
import TVCard from "./TVCard";

interface TVSliderProps {
  shows: TVShow[];
  title: string;
  isLoading?: boolean;
  onShowClick?: (show: TVShow) => void;
  showSeeAll?: boolean;
  onSeeAllClick?: () => void;
  className?: string;
}

/**
 * Netflix 스타일 TV 프로그램 슬라이더
 *
 * 기능
 * 1. 좌우 화살표 / 스냅 스크롤
 * 2. 마우스·터치 드래그
 * 3. 로딩 스켈레톤
 * 4. WatchlistButton 통합
 */
export default function TVSlider({
  shows,
  title,
  isLoading = false,
  onShowClick,
  showSeeAll = true,
  onSeeAllClick,
  className,
}: TVSliderProps) {
  /* ───────────────────────── refs & state ───────────────────────── */
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 드래그 관련
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  /* ───────────────────────── helpers ───────────────────────── */
  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // 초기 & TV 프로그램 변경 시 스크롤 버튼 재계산
  useEffect(() => {
    updateScrollButtons();
  }, [shows]);

  const scrollLeft = () => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollBy({ left: -el.clientWidth * 0.8, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollBy({ left: el.clientWidth * 0.8, behavior: "smooth" });
    }
  };

  /* ──────────────── pointer-drag (마우스/터치) ──────────────── */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    scrollStartX.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!isDragging.current || !el) return;
    const deltaX = dragStartX.current - e.clientX;
    el.scrollLeft = scrollStartX.current + deltaX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    scrollContainerRef.current?.releasePointerCapture(e.pointerId);
  };

  /* ───────────────────────── UI ───────────────────────── */
  return (
    <div className={cn("relative group", className)}>
      {/* ───── 타이틀 & '모두 보기' ───── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>

        {showSeeAll && (
          <button
            onClick={onSeeAllClick}
            className="text-sm text-netflix-gray-light hover:text-white transition-colors duration-200"
          >
            모두 보기
          </button>
        )}
      </div>

      {/* ───── 화살표 ───── */}
      <div className="relative">
        {canScrollLeft && !isLoading && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:from-black/90"
            aria-label="이전"
          >
            <ChevronDownIcon className="w-6 h-6 text-white rotate-90" />
          </button>
        )}

        {canScrollRight && !isLoading && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:from-black/90"
            aria-label="다음"
          >
            <ChevronDownIcon className="w-6 h-6 text-white -rotate-90" />
          </button>
        )}

        {/* ───── 카드 리스트 ───── */}
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap space-x-3 overflow-x-auto scrollbar-hide pb-4 scroll-smooth snap-x snap-mandatory touch-pan-x cursor-grab"
          onScroll={updateScrollButtons}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {isLoading ? (
            <MovieCardSkeletonList count={6} layout="row" size="md" />
          ) : shows && shows.length > 0 ? (
            shows.map((show, idx) => (
              <div
                key={`${show.id}-${idx}`}
                className="flex-shrink-0 snap-start"
              >
                <TVCard
                  show={show}
                  size="md"
                  onPlay={() => onShowClick?.(show)}
                />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full min-h-[300px] text-netflix-gray-light">
              <div className="text-center">
                <div className="text-4xl mb-2">📺</div>
                <p className="text-lg">TV 프로그램을 불러올 수 없습니다</p>
                <p className="text-sm mt-1">잠시 후 다시 시도해 주세요</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
