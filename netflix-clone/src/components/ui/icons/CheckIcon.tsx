// src/components/ui/icons/CheckIcon.tsx
// 체크(✓) 아이콘 컴포넌트

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IconProps } from "@/types";

export default function CheckIcon({ className, size = "md" }: IconProps) {
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
      aria-label="완료"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
