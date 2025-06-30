// src/components/ui/Button.tsx
// Netflix 클론의 기본 버튼 컴포넌트 (재사용 가능한 기본형)

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types";

/**
 * Netflix 스타일 기본 버튼 컴포넌트
 *
 * 왜 이렇게 만들었나요?
 * 1. 단일 책임 원칙: 기본 버튼 스타일링만 담당
 * 2. 재사용성: 다른 특수 버튼들의 베이스로 사용
 * 3. 확장성: variant, size로 다양한 스타일 지원
 * 4. 접근성: ARIA 속성과 키보드 네비게이션 지원
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  isLoading = false,
  className,
  disabled,
  onClick,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // 버튼 변형별 스타일 (Netflix 디자인 시스템 기반)
  const variantClasses = {
    primary: "netflix-btn-primary", // 빨간색 Netflix 브랜드 버튼
    secondary: "netflix-btn-secondary", // 반투명 회색 버튼
    outline:
      "border-2 border-white/50 hover:border-white text-white bg-transparent hover:bg-white/10",
  };

  // 버튼 크기별 스타일 (반응형 고려)
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // 로딩 상태이거나 disabled일 때의 처리
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={cn(
        // 기본 Netflix 버튼 스타일
        "netflix-btn",
        // 변형별 스타일 적용
        variantClasses[variant],
        // 크기별 스타일 적용
        sizeClasses[size],
        // 비활성화/로딩 상태 스타일
        isDisabled && "opacity-50 cursor-not-allowed hover:scale-100",
        // 로딩 상태일 때 포인터 이벤트 비활성화
        isLoading && "pointer-events-none",
        // 추가 커스텀 클래스
        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {/* 로딩 스피너 */}
      {isLoading && (
        <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2" />
      )}

      {/* 아이콘 (로딩 중이 아닐 때만 표시) */}
      {!isLoading && icon && (
        <span className="inline-flex items-center justify-center mr-2">
          {icon}
        </span>
      )}

      {/* 버튼 텍스트 */}
      <span className={cn(isLoading && "opacity-70")}>{children}</span>
    </button>
  );
}

/**
 * 버튼 사용 예시와 가이드라인:
 *
 * 기본 사용법:
 * <Button>클릭하세요</Button>
 *
 * 변형 사용법:
 * <Button variant="secondary">보조 버튼</Button>
 *
 * 아이콘과 함께:
 * <Button icon={<PlayIcon />}>재생</Button>
 *
 * 로딩 상태:
 * <Button isLoading>처리 중...</Button>
 *
 * 이렇게 기본 버튼을 만드는 이유:
 * 1. 컴포지션 패턴: 다른 특수 버튼들이 이 버튼을 기반으로 만들어짐
 * 2. 일관성: 모든 버튼이 같은 기본 스타일과 동작을 가짐
 * 3. 유지보수: 버튼의 기본 동작을 한 곳에서 관리
 * 4. 테스트: 기본 버튼만 테스트하면 모든 파생 버튼의 기본 동작 검증됨
 */
