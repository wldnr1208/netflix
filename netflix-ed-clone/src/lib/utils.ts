import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스를 조건부로 결합하고 충돌을 해결하는 함수
 * 현재 2단계에서 Button, Logo 등의 className 조합에 사용
 *
 * @param inputs - 클래스 값들의 배열
 * @returns 결합된 클래스 문자열
 *
 * 사용 예시:
 * cn('text-white', isActive && 'bg-red-500', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 3단계에서 추가: 로그인 관련 유틸리티 함수들

/**
 * 이메일 유효성 검사 함수
 * @param email - 검사할 이메일 주소
 * @returns 유효한 이메일인지 여부
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 강도 검사 함수
 * @param password - 검사할 비밀번호
 * @returns 강도 점수 (0-4)
 */
export function getPasswordStrength(password: string): number {
  let strength = 0;

  // 길이 체크 (8자 이상)
  if (password.length >= 8) strength++;

  // 대문자 포함 체크
  if (/[A-Z]/.test(password)) strength++;

  // 소문자 포함 체크
  if (/[a-z]/.test(password)) strength++;

  // 숫자 포함 체크
  if (/\d/.test(password)) strength++;

  // 특수문자 포함 체크
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  return Math.min(strength, 4);
}

/**
 * 비밀번호 강도를 텍스트로 변환
 * @param strength - 강도 점수 (0-4)
 * @returns 강도 텍스트
 */
export function getPasswordStrengthText(strength: number): string {
  const strengthTexts = ["매우 약함", "약함", "보통", "강함", "매우 강함"];

  return strengthTexts[strength] || "알 수 없음";
}

/**
 * 비밀번호 강도 색상 반환
 * @param strength - 강도 점수 (0-4)
 * @returns Tailwind 색상 클래스
 */
export function getPasswordStrengthColor(strength: number): string {
  const colors = [
    "text-red-500", // 매우 약함
    "text-orange-500", // 약함
    "text-yellow-500", // 보통
    "text-green-500", // 강함
    "text-emerald-500", // 매우 강함
  ];

  return colors[strength] || "text-gray-500";
}
