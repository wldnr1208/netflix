// src/components/ui/icons/PlayIcon.tsx
// Netflix 재생 버튼 아이콘

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IconProps } from "@/types";

/**
 * Netflix 스타일 재생 아이콘
 *
 * 왜 아이콘을 별도 컴포넌트로 만들었나요?
 * 1. 재사용성: 여러 곳에서 같은 아이콘 사용 가능
 * 2. 일관성: 아이콘 크기와 스타일 통일
 * 3. 유지보수: 아이콘 변경 시 한 곳만 수정하면 됨
 * 4. 접근성: aria-hidden 등 접근성 속성 통일 관리
 */
export default function PlayIcon({ className, size = "md" }: IconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <svg
      className={cn(sizeClasses[size], className)}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
      role="img"
      aria-label="재생"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        clipRule="evenodd"
      />
    </svg>
  );
}
