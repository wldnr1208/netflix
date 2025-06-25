// src/app/auth/signin/page.tsx
// Netflix 스타일 로그인 페이지

import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Logo from "@/components/common/Logo";
import LoginForm from "@/components/auth/LoginForm";
import { GoogleLoginButton } from "@/components/ui/SocialLoginButton";
import { LoginPageProps } from "@/types";

/**
 * Netflix 스타일 로그인 페이지
 *
 * 기능:
 * - 이메일/비밀번호 로그인
 * - Google 소셜 로그인
 * - 오류 메시지 표시
 * - 회원가입 링크
 */
export default async function SignInPage({ searchParams }: LoginPageProps) {
  // 이미 로그인된 사용자는 홈으로 리다이렉트
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  const callbackUrl = searchParams?.callbackUrl || "/";
  const error = searchParams?.error;
  const message = searchParams?.message;

  return (
    <div className="min-h-screen netflix-bg-gray-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-netflix-gray-dark to-red-900/20" />

      <div className="relative w-full max-w-md space-y-8">
        {/* 로고 */}
        <div className="text-center">
          <Logo size="lg" clickable={false} />
          <h2 className="mt-6 text-3xl font-bold text-white">로그인</h2>
          <p className="mt-2 text-sm text-netflix-gray-light">
            Netflix 계정으로 로그인하세요
          </p>
        </div>

        {/* 성공 메시지 */}
        {message && (
          <div className="p-4 bg-green-900/20 border border-green-500 rounded-sm">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-400 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-green-400 text-sm">{message}</span>
            </div>
          </div>
        )}

        {/* 로그인 폼 카드 */}
        <div className="netflix-card p-8">
          {/* 소셜 로그인 */}
          <div className="space-y-4 mb-8">
            <GoogleLoginButton callbackUrl={callbackUrl} className="w-full" />

            {/* 구분선 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-netflix-gray" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-netflix-gray-dark text-netflix-gray-light">
                  또는
                </span>
              </div>
            </div>
          </div>

          {/* 이메일/비밀번호 로그인 폼 */}
          <LoginForm callbackUrl={callbackUrl} error={error} />
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center">
          <p className="text-netflix-gray-light">
            Netflix 회원이 아니신가요?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-white hover:text-netflix-red transition-colors duration-200"
            >
              지금 가입하세요
            </Link>
          </p>
        </div>

        {/* 추가 정보 */}
        <div className="text-center">
          <p className="text-xs text-netflix-gray-light">
            이 페이지는 reCAPTCHA의 보호를 받으며{" "}
            <button className="hover:underline">
              Google 개인정보 처리방침
            </button>{" "}
            및 <button className="hover:underline">서비스 약관</button>이
            적용됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
