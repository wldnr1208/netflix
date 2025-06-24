// src/components/ui/icons/MenuIcon.tsx
// Netflix 햄버거 메뉴 아이콘

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IconProps } from "@/types";

export default function MenuIcon({ className, size = "md" }: IconProps) {
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
      aria-label="메뉴 열기"
    >
      <path
        fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
