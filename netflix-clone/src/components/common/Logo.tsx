// src/components/common/Logo.tsx
// Netflix 스타일 로고 컴포넌트

"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  clickable?: boolean;
}

/**
 * Netflix 스타일 로고 컴포넌트
 *
 * @param size - 로고 크기 (sm: 작음, md: 중간, lg: 큼)
 * @param className - 추가 클래스명
 * @param href - 링크 경로 (기본값: '/')
 * @param clickable - 클릭 가능 여부 (기본값: true)
 */
export default function Logo({
  size = "md",
  className,
  href = "/",
  clickable = true,
}: LogoProps) {
  // 크기별 스타일 정의
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl lg:text-6xl",
  };

  // 로고 텍스트 컴포넌트
  const LogoText = () => (
    <span
      className={cn(
        "font-bold text-gradient-red font-sans select-none",
        sizeClasses[size],
        "transition-all duration-300 hover:scale-105",
        className
      )}
    >
      NETFLIX
    </span>
  );

  // 클릭 가능한 로고 (링크)
  if (clickable) {
    return (
      <Link
        href={href}
        className={cn(
          "inline-block transition-transform duration-300 hover:scale-105",
          "focus:outline-none focus:ring-2 focus:ring-netflix-red focus:ring-offset-2 focus:ring-offset-black rounded-sm",
          className
        )}
        aria-label="Netflix 홈페이지로 이동"
      >
        <LogoText />
      </Link>
    );
  }

  // 클릭 불가능한 로고
  return <LogoText />;
}

/**
 * Netflix 아이콘 로고 컴포넌트 (N 문자만)
 */
export function NetflixIcon({
  size = "md",
  className,
}: Pick<LogoProps, "size" | "className">) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={cn(
        "netflix-bg-red rounded flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <span className="text-white font-bold text-lg">N</span>
    </div>
  );
}
