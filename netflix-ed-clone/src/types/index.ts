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

// TODO: 다음 단계에서 추가될 타입들
// - Movie (영화 데이터 타입) - 4단계에서 추가 예정
// - User (사용자 타입) - 3단계 로그인 페이지에서 추가 예정
// - HeaderProps (헤더 컴포넌트) - 헤더 완성 후 추가 예정
