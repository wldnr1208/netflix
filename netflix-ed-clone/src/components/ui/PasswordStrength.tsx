// src/components/ui/PasswordStrength.tsx
// 비밀번호 강도 표시 컴포넌트

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  getPasswordStrength,
  getPasswordStrengthText,
  getPasswordStrengthColor,
} from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
  className?: string;
  showText?: boolean;
}

/**
 * Netflix 스타일 비밀번호 강도 표시 컴포넌트
 *
 * 기능:
 * - 비밀번호 강도를 0-4 레벨로 표시
 * - 시각적 바와 텍스트로 강도 표현
 * - 실시간 강도 계산
 */
export default function PasswordStrength({
  password,
  className,
  showText = true,
}: PasswordStrengthProps) {
  const strength = getPasswordStrength(password);
  const strengthText = getPasswordStrengthText(strength);
  const strengthColor = getPasswordStrengthColor(strength);

  // 비밀번호가 없으면 표시하지 않음
  if (!password) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      {/* 강도 바 */}
      <div className="flex space-x-1">
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              level <= strength
                ? getStrengthBarColor(strength)
                : "bg-netflix-gray"
            )}
          />
        ))}
      </div>

      {/* 강도 텍스트 */}
      {showText && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-netflix-gray-light">비밀번호 강도:</span>
          <span className={cn("font-medium", strengthColor)}>
            {strengthText}
          </span>
        </div>
      )}

      {/* 비밀번호 요구사항 */}
      {strength < 3 && (
        <div className="text-xs text-netflix-gray-light space-y-1">
          <p>더 안전한 비밀번호를 위해:</p>
          <ul className="space-y-1 ml-2">
            {password.length < 8 && (
              <li className="flex items-center text-red-400">
                <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                8자 이상 입력
              </li>
            )}
            {!/[A-Z]/.test(password) && (
              <li className="flex items-center text-red-400">
                <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                대문자 포함
              </li>
            )}
            {!/[a-z]/.test(password) && (
              <li className="flex items-center text-red-400">
                <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                소문자 포함
              </li>
            )}
            {!/\d/.test(password) && (
              <li className="flex items-center text-red-400">
                <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                숫자 포함
              </li>
            )}
            {!/[!@#$%^&*(),.?":{}|<>]/.test(password) && (
              <li className="flex items-center text-red-400">
                <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                특수문자 포함
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * 강도별 바 색상 반환
 */
function getStrengthBarColor(strength: number): string {
  const colors = [
    "bg-red-500", // 매우 약함
    "bg-orange-500", // 약함
    "bg-yellow-500", // 보통
    "bg-green-500", // 강함
    "bg-emerald-500", // 매우 강함
  ];

  return colors[strength] || "bg-gray-500";
}
