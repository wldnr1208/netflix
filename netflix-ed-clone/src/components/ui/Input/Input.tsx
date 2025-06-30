// src/components/ui/Input.tsx
// Netflix 스타일 입력 필드 컴포넌트

"use client";

import React, { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";
import EyeIcon from "../icons/EyeIcon";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
}

/**
 * Netflix 스타일 입력 필드 컴포넌트
 *
 * 특징:
 * - Netflix 스타일의 floating label
 * - 오류 상태 표시
 * - 비밀번호 보기/숨기기 기능
 * - 포커스 및 호버 효과
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      showPasswordToggle = false,
      className,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!props.value || !!props.defaultValue
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const inputType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;
    const isLabelFloating = isFocused || hasValue;

    return (
      <div className="relative w-full">
        {/* 입력 필드 컨테이너 */}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={cn(
              // 기본 스타일
              "w-full px-4 pt-6 pb-2 text-white bg-netflix-gray-dark rounded-sm",
              "border border-netflix-gray transition-all duration-200",
              "focus:outline-none focus:ring-0",

              // 포커스 상태
              isFocused && "border-white bg-netflix-gray",

              // 오류 상태
              error && "border-red-500 bg-red-900/10",

              // 호버 상태
              "hover:bg-netflix-gray",

              // 비밀번호 토글이 있을 때 오른쪽 패딩 추가
              showPasswordToggle && "pr-12",

              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {/* Floating Label */}
          {label && (
            <label
              className={cn(
                "absolute left-4 transition-all duration-200 pointer-events-none",
                "text-netflix-gray-light",

                // Label 위치 조정
                isLabelFloating ? "top-2 text-xs" : "top-4 text-base",

                // 포커스 상태에서 색상 변경
                isFocused && "text-white",

                // 오류 상태에서 색상 변경
                error && "text-red-400"
              )}
            >
              {label}
            </label>
          )}

          {/* 비밀번호 보기/숨기기 버튼 */}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                "text-netflix-gray-light hover:text-white",
                "transition-colors duration-200 p-1"
              )}
              tabIndex={-1}
            >
              <EyeIcon isVisible={showPassword} />
            </button>
          )}
        </div>

        {/* 오류 메시지 또는 도움말 텍스트 */}
        {(error || helperText) && (
          <div className="mt-2 text-sm">
            {error ? (
              <span className="text-red-400 flex items-center">
                <svg
                  className="w-4 h-4 mr-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 000 2v4a1 1 0 102 0V7a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </span>
            ) : (
              <span className="text-netflix-gray-light">{helperText}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
