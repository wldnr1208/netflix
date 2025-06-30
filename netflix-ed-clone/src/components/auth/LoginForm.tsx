// src/components/auth/LoginForm.tsx
// Netflix 스타일 로그인 폼 컴포넌트

"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { validateEmail } from "@/lib/utils";
import Button from "@/components/ui/Button/Button";
import { LoginFormData, ValidationError } from "@/types";
import Input from "../ui/Input/Input";

interface LoginFormProps {
  callbackUrl?: string;
  error?: string;
  className?: string;
}

/**
 * Netflix 스타일 로그인 폼
 *
 * 기능:
 * - 이메일/비밀번호 로그인
 * - 실시간 유효성 검사
 * - 로그인 상태 관리
 * - 오류 처리
 */
export default function LoginForm({
  callbackUrl = "/",
  error: initialError,
  className,
}: LoginFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(initialError || "");

  // 폼 데이터 업데이트
  const updateFormData = (
    field: keyof LoginFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 해당 필드의 오류 제거
    setErrors((prev) => prev.filter((error) => error.field !== field));
    setLoginError("");
  };

  // 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: ValidationError[] = [];

    // 이메일 검사
    if (!formData.email) {
      newErrors.push({ field: "email", message: "이메일을 입력해주세요." });
    } else if (!validateEmail(formData.email)) {
      newErrors.push({
        field: "email",
        message: "올바른 이메일 형식이 아닙니다.",
      });
    }

    // 비밀번호 검사
    if (!formData.password) {
      newErrors.push({
        field: "password",
        message: "비밀번호를 입력해주세요.",
      });
    } else if (formData.password.length < 6) {
      newErrors.push({
        field: "password",
        message: "비밀번호는 6자 이상이어야 합니다.",
      });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // 로그인 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (result?.ok) {
        // 로그인 성공
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setLoginError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 필드별 오류 메시지 가져오기
  const getFieldError = (field: string) => {
    return errors.find((error) => error.field === field)?.message;
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      {/* 전역 오류 메시지 */}
      {loginError && (
        <div className="p-4 bg-red-900/20 border border-red-500 rounded-sm">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-400 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 000 2v4a1 1 0 102 0V7a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-red-400 text-sm">{loginError}</span>
          </div>
        </div>
      )}

      {/* 이메일 입력 */}
      <Input
        type="email"
        label="이메일"
        value={formData.email}
        onChange={(e) => updateFormData("email", e.target.value)}
        error={getFieldError("email")}
        disabled={isLoading}
        autoComplete="email"
      />

      {/* 비밀번호 입력 */}
      <Input
        type="password"
        label="비밀번호"
        value={formData.password}
        onChange={(e) => updateFormData("password", e.target.value)}
        error={getFieldError("password")}
        showPasswordToggle
        disabled={isLoading}
        autoComplete="current-password"
      />

      {/* 로그인 유지 체크박스 */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => updateFormData("rememberMe", e.target.checked)}
            disabled={isLoading}
            className="w-4 h-4 bg-netflix-gray-dark border border-netflix-gray rounded text-netflix-red focus:ring-netflix-red focus:ring-2 focus:ring-offset-0"
          />
          <span className="ml-2 text-sm text-netflix-gray-light">
            로그인 상태 유지
          </span>
        </label>

        <button
          type="button"
          className="text-sm text-netflix-gray-light hover:text-white transition-colors duration-200"
          disabled={isLoading}
        >
          비밀번호를 잊으셨나요?
        </button>
      </div>

      {/* 로그인 버튼 */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>

      {/* 테스트 계정 안내 */}
      <div className="mt-4 p-3 bg-netflix-gray-dark/50 rounded-sm border border-netflix-gray">
        <p className="text-xs text-netflix-gray-light mb-2">테스트 계정:</p>
        <div className="text-xs text-white space-y-1">
          <p>이메일: test@netflix.com</p>
          <p>비밀번호: password123</p>
        </div>
      </div>
    </form>
  );
}
