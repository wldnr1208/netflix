// src/types/index.ts
// Netflix 클론 프로젝트의 기본 타입 정의 (단계별로 추가)

// 현재 2단계에서 실제로 사용하는 타입들만 정의

/**
 * 버튼 컴포넌트 관련 타입
 */
export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * 아이콘 컴포넌트 타입
 */
export interface IconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * 로고 컴포넌트 타입
 */
export interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  clickable?: boolean;
}

// 3단계에서 추가: 로그인 관련 타입들

/**
 * 사용자 타입 (NextAuth 사용자 확장)
 */
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string; // google, credentials 등
}

/**
 * 로그인 폼 데이터
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * 회원가입 폼 데이터
 */
export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

/**
 * 폼 유효성 검사 오류
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * 소셜 로그인 제공자
 */
export type SocialProvider = "google" | "credentials";

/**
 * 로그인 페이지 Props
 */
/**
 * 로그인 페이지 Props (Next.js 15 대응)
 */
export interface LoginPageProps {
  searchParams?: Promise<{
    callbackUrl?: string;
    error?: string;
    message?: string;
  }>;
}

// TODO: 다음 단계에서 추가될 타입들
// - Movie (영화 데이터 타입) - 4단계에서 추가 예정
// - User (사용자 타입) - 3단계 로그인 페이지에서 추가 예정
// - HeaderProps (헤더 컴포넌트) - 헤더 완성 후 추가 예정
