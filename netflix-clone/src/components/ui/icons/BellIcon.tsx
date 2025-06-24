// src/components/ui/icons/BellIcon.tsx
// Netflix 알림 아이콘

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IconProps } from "@/types";

export default function BellIcon({ className, size = "md" }: IconProps) {
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
      aria-label="알림"
    >
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
  );
}
