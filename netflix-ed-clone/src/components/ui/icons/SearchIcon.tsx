// src/components/ui/icons/SearchIcon.tsx
// Netflix 검색 아이콘

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IconProps } from "@/types";

export default function SearchIcon({ className, size = "md" }: IconProps) {
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
      aria-label="검색"
    >
      <path
        fillRule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clipRule="evenodd"
      />
    </svg>
  );
}
