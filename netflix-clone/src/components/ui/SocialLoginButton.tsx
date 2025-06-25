// src/components/ui/SocialLoginButton.tsx
// 소셜 로그인 버튼 컴포넌트

"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import GoogleIcon from "./icons/GoogleIcon";
import { SocialProvider } from "@/types";

interface SocialLoginButtonProps {
  provider: SocialProvider;
  callbackUrl?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

/**
 * Netflix 스타일 소셜 로그인 버튼
 *
 * 지원하는 제공자:
 * - Google
 * - Credentials (이메일/비밀번호)
 */
export default function SocialLoginButton({
  provider,
  callbackUrl = "/",
  className,
  disabled = false,
  isLoading = false,
}: SocialLoginButtonProps) {
  const handleLogin = async () => {
    try {
      await signIn(provider, {
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error);
    }
  };

  // 제공자별 설정
  const providerConfig = getProviderConfig(provider);

  return (
    <Button
      variant="outline"
      onClick={handleLogin}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      icon={!isLoading ? providerConfig.icon : undefined}
      className={cn(
        "w-full justify-center",
        "border-netflix-gray-light hover:border-white",
        "bg-transparent hover:bg-white/5",
        "text-white font-medium",
        className
      )}
    >
      {isLoading ? "로그인 중..." : providerConfig.text}
    </Button>
  );
}

/**
 * 제공자별 설정 반환
 */
function getProviderConfig(provider: SocialProvider) {
  const configs = {
    google: {
      text: "Google로 로그인",
      icon: <GoogleIcon />,
    },
    credentials: {
      text: "이메일로 로그인",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
    },
  };

  return configs[provider] || configs.credentials;
}

/**
 * Google 로그인 버튼 (간편 사용)
 */
export function GoogleLoginButton(
  props: Omit<SocialLoginButtonProps, "provider">
) {
  return <SocialLoginButton {...props} provider="google" />;
}
