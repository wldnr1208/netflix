"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * 슬라이더 그룹 컴포넌트 (여러 슬라이더를 세로로 배치)
 */
export function MovieSliderGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-8 md:space-y-12", className)}>{children}</div>
  );
}
