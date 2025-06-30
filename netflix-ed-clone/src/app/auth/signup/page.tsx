// src/app/auth/signup/page.tsx
// Netflix 스타일 회원가입 페이지

import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Logo from "@/components/common/Logo";
import SignUpForm from "@/components/auth/SignUpForm";
import { GoogleLoginButton } from "@/components/ui/Button/SocialLoginButton";

/**
 * Netflix 스타일 회원가입 페이지
 *
 * 기능:
 * - 이름, 이메일, 비밀번호로 회원가입
 * - 비밀번호 강도 검사
 * - Google 소셜 로그인
 * - 로그인 페이지 링크
 */
export default async function SignUpPage() {
  // 이미 로그인된 사용자는 홈으로 리다이렉트
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen netflix-bg-gray-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-netflix-gray-dark to-red-900/20" />

      <div className="relative w-full max-w-md space-y-8">
        {/* 로고 */}
        <div className="text-center">
          <Logo size="lg" clickable={false} />
          <h2 className="mt-6 text-3xl font-bold text-white">회원가입</h2>
          <p className="mt-2 text-sm text-netflix-gray-light">
            Netflix에서 수많은 콘텐츠를 만나보세요
          </p>
        </div>

        {/* 회원가입 폼 카드 */}
        <div className="netflix-card p-8">
          {/* 소셜 로그인 */}
          <div className="space-y-4 mb-8">
            <GoogleLoginButton callbackUrl="/" className="w-full" />

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

          {/* 회원가입 폼 */}
          <SignUpForm />
        </div>

        {/* 로그인 링크 */}
        <div className="text-center">
          <p className="text-netflix-gray-light">
            이미 Netflix 회원이신가요?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-white hover:text-netflix-red transition-colors duration-200"
            >
              로그인하세요
            </Link>
          </p>
        </div>

        {/* 추가 정보 */}
        <div className="text-center space-y-2">
          <p className="text-xs text-netflix-gray-light">
            가입하면 Netflix{" "}
            <button className="hover:underline">이용약관</button> 및{" "}
            <button className="hover:underline">개인정보 처리방침</button>에
            동의하는 것으로 간주됩니다.
          </p>

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
