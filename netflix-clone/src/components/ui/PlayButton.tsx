// src/components/ui/PlayButton.tsx
// Netflix 전용 재생 버튼 컴포넌트

"use client";

import React from "react";
import Button from "./Button";
import { cn } from "@/lib/utils";
import PlayIcon from "./icons/PlayIcon";

interface PlayButtonProps {
  // movie?: Movie; // 나중에 Movie 타입 만들어지면 추가 예정
  size?: "sm" | "md" | "lg";
  className?: string;
  onPlay?: () => void; // 일단 간단하게
  isLoading?: boolean;
  disabled?: boolean;
  showText?: boolean;
}

/**
 * Netflix 전용 재생 버튼 컴포넌트
 *
 * 왜 별도의 PlayButton을 만들었나요?
 *
 * 1. 도메인 특화: Netflix의 재생 기능에 특화된 로직
 * 2. 비즈니스 로직 분리: 영화 재생과 관련된 로직을 캡슐화
 * 3. 사용자 경험: 재생 버튼만의 특별한 UX (호버 효과, 애니메이션)
 * 4. 확장성: 나중에 재생 관련 기능 추가 시 이 컴포넌트만 수정
 * 5. 강의 진행: 학습자가 "재생 버튼"이라는 명확한 개념으로 이해 가능
 */
export default function PlayButton({
  // movie, // 나중에 추가 예정
  size = "md",
  className,
  onPlay,
  isLoading = false,
  disabled = false,
  showText = true,
}: PlayButtonProps) {
  const handlePlay = () => {
    if (onPlay && !isLoading && !disabled) {
      onPlay();
    }
  };

  // 재생 버튼만의 특별한 스타일
  const playButtonStyles = cn(
    "font-semibold",
    "shadow-lg shadow-black/20",
    "hover:shadow-xl hover:shadow-black/30",
    "transition-all duration-200",
    // Netflix 재생 버튼은 항상 빨간색
    "netflix-btn-primary",
    className
  );

  return (
    <Button
      variant="primary"
      size={size}
      icon={<PlayIcon size={size} />}
      onClick={handlePlay}
      isLoading={isLoading}
      disabled={disabled}
      className={playButtonStyles}
      aria-label="재생"
    >
      {showText && (isLoading ? "로딩 중..." : "재생")}
    </Button>
  );
}

/**
 * 사용 예시:
 *
 * 기본 사용법:
 * <PlayButton onPlay={() => console.log('재생!')} />
 *
 * 영화와 함께:
 * <PlayButton
 *   movie={movieData}
 *   onPlay={(movie) => playMovie(movie)}
 * />
 *
 * 로딩 상태:
 * <PlayButton isLoading onPlay={handlePlay} />
 *
 * 아이콘만 (텍스트 숨김):
 * <PlayButton showText={false} size="sm" />
 *
 * 이런 식으로 컴포넌트를 분리하는 이유:
 *
 * 1. 단일 책임 원칙 (SRP)
 *    - Button: 기본 버튼 UI와 상태 관리
 *    - PlayButton: Netflix 재생 기능에 특화된 로직
 *
 * 2. 컴포지션 패턴
 *    - PlayButton이 Button을 내부에서 사용
 *    - 기본 기능은 재사용하면서 특화 기능은 추가
 *
 * 3. 강의 진행성
 *    - 학습자가 "기본 버튼 → 재생 버튼" 순서로 배울 수 있음
 *    - 각 컴포넌트의 역할이 명확히 구분됨
 *
 * 4. 유지보수성
 *    - 재생 버튼의 동작 변경 시 이 파일만 수정
 *    - 기본 버튼 스타일 변경 시 Button.tsx만 수정
 */
