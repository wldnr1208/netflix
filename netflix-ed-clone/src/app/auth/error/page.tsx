// src/app/auth/error/page.tsx
// NextAuth 인증 오류 페이지

"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Logo from "@/components/common/Logo";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/router";

/**
 * 오류 콘텐츠 컴포넌트 (Suspense로 감싸진)
 */
function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  const errorMessages = {
    Configuration: {
      title: "설정 오류",
      description: "인증 설정에 문제가 있습니다. 관리자에게 문의해주세요.",
    },
    AccessDenied: {
      title: "접근 거부",
      description: "로그인이 거부되었습니다. 계정을 확인해주세요.",
    },
    Verification: {
      title: "인증 오류",
      description: "이메일 인증에 실패했습니다. 다시 시도해주세요.",
    },
    Default: {
      title: "로그인 오류",
      description: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
    },
  };

  const errorInfo =
    errorMessages[error as keyof typeof errorMessages] || errorMessages.Default;

  return (
    <div className="min-h-screen netflix-bg-gray-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-netflix-gray-dark to-red-900/20" />

      <div className="relative w-full max-w-md space-y-8 text-center">
        {/* 로고 */}
        <Logo size="lg" clickable={false} />

        {/* 오류 아이콘 */}
        <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 000 2v4a1 1 0 102 0V7a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* 오류 정보 */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-white">{errorInfo.title}</h1>
          <p className="text-netflix-gray-light">{errorInfo.description}</p>

          {/* 오류 코드 표시 (개발 환경) */}
          {process.env.NODE_ENV === "development" && error && (
            <div className="p-3 bg-netflix-gray-dark/50 rounded-sm border border-netflix-gray">
              <p className="text-xs text-netflix-gray-light">
                오류 코드: {error}
              </p>
            </div>
          )}
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => router.push("/auth/signin")}
          >
            다시 로그인하기
          </Button>

          <Link href="/">
            <Button variant="secondary" size="lg" className="w-full">
              홈으로 돌아가기
            </Button>
          </Link>
        </div>

        {/* 도움말 링크 */}
        <div className="text-center">
          <p className="text-sm text-netflix-gray-light">
            문제가 지속되면{" "}
            <button className="text-white hover:underline">고객센터</button>에
            문의해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * NextAuth 인증 오류 페이지
 *
 * 다양한 오류 유형 처리:
 * - Configuration: 설정 오류
 * - AccessDenied: 접근 거부
 * - Verification: 이메일 인증 오류
 * - Default: 알 수 없는 오류
 */
export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen netflix-bg-gray-dark flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-white rounded-full" />
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
