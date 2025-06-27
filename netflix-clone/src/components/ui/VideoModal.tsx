// src/components/ui/VideoModal.tsx
// YouTube 비디오 재생 모달 컴포넌트
"use client";

import React, { useEffect } from "react";
import { TMDBService } from "@/lib/tmdb";
import { cn } from "@/lib/utils";
import { TMDBVideo } from "@/types";

interface VideoModalProps {
  video: TMDBVideo | null;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function VideoModal({
  video,
  isOpen,
  onClose,
  title,
}: VideoModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // 스크롤 방지
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) {
    return null;
  }

  // YouTube embed URL 생성
  const embedUrl = TMDBService.getYouTubeEmbedUrl(video.key, true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 백드롭 */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative z-10 w-full max-w-6xl mx-4">
        <div className="bg-netflix-gray-dark rounded-lg overflow-hidden shadow-2xl">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-netflix-gray/20">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {title && `${title} - `}
                {video.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-netflix-gray-light">
                <span className="bg-red-600 px-2 py-0.5 rounded text-xs text-white font-medium">
                  {video.type}
                </span>
                {video.official && (
                  <span className="text-green-400">✓ 공식</span>
                )}
                <span>YouTube</span>
                {video.size && <span>{video.size}p</span>}
              </div>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="모달 닫기"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 비디오 플레이어 */}
          <div className="relative">
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                title={video.name}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* 푸터 */}
          <div className="p-4 border-t border-netflix-gray/20">
            <div className="flex items-center justify-between text-sm text-netflix-gray-light">
              <span>
                게시일:{" "}
                {new Date(video.published_at).toLocaleDateString("ko-KR")}
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={TMDBService.getYouTubeUrl(video.key)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube에서 보기
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-netflix-red hover:bg-netflix-red-dark text-white rounded transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 간단한 예고편 재생 버튼 컴포넌트
 */
interface TrailerButtonProps {
  video: TMDBVideo | null;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function TrailerButton({
  video,
  title,
  className,
  children = "🎬 예고편",
  variant = "secondary",
}: TrailerButtonProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClick = () => {
    if (video) {
      setIsModalOpen(true);
    } else {
      alert("예고편을 찾을 수 없습니다.");
    }
  };

  const baseClasses =
    "px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium";
  const variantClasses = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary:
      "bg-gray-600/60 hover:bg-gray-600/80 text-white border-2 border-transparent hover:border-gray-500",
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={!video}
        className={cn(
          baseClasses,
          variantClasses[variant],
          !video && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {children}
      </button>

      <VideoModal
        video={video}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
      />
    </>
  );
}
