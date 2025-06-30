// src/components/auth/SignUpForm.tsx
// Netflix 스타일 회원가입 폼 컴포넌트

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { validateEmail, getPasswordStrength } from "@/lib/utils";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button/Button";
import PasswordStrength from "@/components/ui/PasswordStrength";
import { SignUpFormData, ValidationError } from "@/types";

interface SignUpFormProps {
  className?: string;
}

/**
 * Netflix 스타일 회원가입 폼
 *
 * 기능:
 * - 이름, 이메일, 비밀번호 입력
 * - 비밀번호 확인 및 강도 검사
 * - 실시간 유효성 검사
 * - 이용약관 동의
 */
export default function SignUpForm({ className }: SignUpFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  // 폼 데이터 업데이트
  const updateFormData = (
    field: keyof SignUpFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 해당 필드의 오류 제거
    setErrors((prev) => prev.filter((error) => error.field !== field));
    setSignupError("");
  };

  // 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: ValidationError[] = [];

    // 이름 검사
    if (!formData.name.trim()) {
      newErrors.push({ field: "name", message: "이름을 입력해주세요." });
    } else if (formData.name.trim().length < 2) {
      newErrors.push({
        field: "name",
        message: "이름은 2자 이상이어야 합니다.",
      });
    }

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
    } else if (formData.password.length < 8) {
      newErrors.push({
        field: "password",
        message: "비밀번호는 8자 이상이어야 합니다.",
      });
    } else if (getPasswordStrength(formData.password) < 2) {
      newErrors.push({
        field: "password",
        message: "더 강한 비밀번호를 사용해주세요.",
      });
    }

    // 비밀번호 확인 검사
    if (!formData.confirmPassword) {
      newErrors.push({
        field: "confirmPassword",
        message: "비밀번호 확인을 입력해주세요.",
      });
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.push({
        field: "confirmPassword",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    // 약관 동의 검사
    if (!formData.acceptTerms) {
      newErrors.push({
        field: "acceptTerms",
        message: "이용약관에 동의해주세요.",
      });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // 회원가입 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSignupError("");

    try {
      // 실제 구현에서는 회원가입 API 호출
      // 현재는 데모용으로 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 성공 시 로그인 페이지로 이동
      router.push(
        "/auth/signin?message=회원가입이 완료되었습니다. 로그인해주세요."
      );
    } catch (error) {
      console.error("회원가입 오류:", error);
      setSignupError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
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
      {signupError && (
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
            <span className="text-red-400 text-sm">{signupError}</span>
          </div>
        </div>
      )}

      {/* 이름 입력 */}
      <Input
        label="이름"
        value={formData.name}
        onChange={(e) => updateFormData("name", e.target.value)}
        error={getFieldError("name")}
        disabled={isLoading}
        autoComplete="name"
      />

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
      <div className="space-y-3">
        <Input
          type="password"
          label="비밀번호"
          value={formData.password}
          onChange={(e) => updateFormData("password", e.target.value)}
          error={getFieldError("password")}
          showPasswordToggle
          disabled={isLoading}
          autoComplete="new-password"
        />

        {/* 비밀번호 강도 표시 */}
        <PasswordStrength password={formData.password} />
      </div>

      {/* 비밀번호 확인 입력 */}
      <Input
        type="password"
        label="비밀번호 확인"
        value={formData.confirmPassword}
        onChange={(e) => updateFormData("confirmPassword", e.target.value)}
        error={getFieldError("confirmPassword")}
        showPasswordToggle
        disabled={isLoading}
        autoComplete="new-password"
      />

      {/* 이용약관 동의 */}
      <div className="space-y-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => updateFormData("acceptTerms", e.target.checked)}
            disabled={isLoading}
            className="w-4 h-4 mt-1 bg-netflix-gray-dark border border-netflix-gray rounded text-netflix-red focus:ring-netflix-red focus:ring-2 focus:ring-offset-0"
          />
          <span className="ml-3 text-sm text-netflix-gray-light leading-relaxed">
            Netflix 이용약관 및 개인정보 처리방침에 동의합니다.{" "}
            <button
              type="button"
              className="text-white hover:underline"
              disabled={isLoading}
            >
              자세히 보기
            </button>
          </span>
        </label>

        {getFieldError("acceptTerms") && (
          <span className="text-red-400 text-sm flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 000 2v4a1 1 0 102 0V7a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {getFieldError("acceptTerms")}
          </span>
        )}
      </div>

      {/* 회원가입 버튼 */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "가입 중..." : "회원가입"}
      </Button>

      {/* 마케팅 정보 */}
      <div className="text-xs text-netflix-gray-light space-y-2">
        <p>
          이 페이지는 reCAPTCHA의 보호를 받으며 Google 개인정보 처리방침 및
          서비스 약관이 적용됩니다.
        </p>
      </div>
    </form>
  );
}
