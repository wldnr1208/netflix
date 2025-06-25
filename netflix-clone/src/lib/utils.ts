// src/lib/utils.ts
// Netflix 클론 프로젝트의 유틸리티 함수들 (단계별로 추가)

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

// TODO: 다음 단계에서 추가될 유틸리티 함수들
//

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
//
// 4단계 (영화 카드)에서 추가 예정:
/**
 * TMDB 이미지 URL을 생성하는 함수
 * @param path - 이미지 경로 (TMDB에서 제공)
 * @param size - 이미지 크기 (기본값: 'w500')
 * @returns 완전한 이미지 URL
 */
export function getImageUrl(
  path: string | null,
  size: string = "w500"
): string {
  if (!path) return "/placeholder-movie.jpg";

  const baseUrl =
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";
  return `${baseUrl}/${size}${path}`;
}

/**
 * 영화 제목을 URL 슬러그로 변환하는 함수
 * @param title - 영화 제목
 * @returns URL 친화적인 슬러그
 */
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // 특수문자 제거
    .replace(/\s+/g, "-") // 공백을 하이픈으로 변경
    .replace(/-+/g, "-") // 연속된 하이픈을 하나로 변경
    .trim();
}

/**
 * 평점을 별점으로 변환하는 함수
 * @param rating - 0-10 사이의 평점 (TMDB 기준)
 * @returns 별점 문자열
 */
export function formatRating(rating: number): string {
  const stars = Math.round(rating / 2); // 10점 만점을 5점 만점으로 변환
  return "★".repeat(stars) + "☆".repeat(5 - stars);
}

/**
 * 평점을 퍼센트로 변환하는 함수
 * @param rating - 0-10 사이의 평점
 * @returns 퍼센트 문자열
 */
export function formatRatingPercent(rating: number): string {
  return `${Math.round(rating * 10)}%`;
}

/**
 * 영화 런타임을 시간:분 형식으로 변환하는 함수
 * @param minutes - 분 단위 런타임
 * @returns "1시간 30분" 형식의 문자열
 */
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}분`;
  if (mins === 0) return `${hours}시간`;
  return `${hours}시간 ${mins}분`;
}

/**
 * 날짜를 포맷팅하는 함수
 * @param dateString - ISO 날짜 문자열 (YYYY-MM-DD)
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "날짜 없음";

  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 연도만 추출하는 함수
 * @param dateString - ISO 날짜 문자열 (YYYY-MM-DD)
 * @returns 연도 문자열
 */
export function getYear(dateString: string): string {
  if (!dateString) return "";
  return new Date(dateString).getFullYear().toString();
}

/**
 * 숫자를 K, M 단위로 포맷팅하는 함수
 * @param num - 포맷팅할 숫자
 * @returns 포맷팅된 문자열 (예: 1.2K, 3.4M)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return Math.floor(num / 100000) / 10 + "M";
  }
  if (num >= 1000) {
    return Math.floor(num / 100) / 10 + "K";
  }
  return num.toString();
}

/**
 * 영화 장르 ID를 이름으로 변환하는 함수
 * @param genreIds - 장르 ID 배열
 * @returns 장르 이름 배열
 */
export function getGenreNames(genreIds: number[]): string[] {
  // TMDB 장르 매핑 (일부)
  const genreMap: Record<number, string> = {
    28: "액션",
    12: "모험",
    16: "애니메이션",
    35: "코미디",
    80: "범죄",
    99: "다큐멘터리",
    18: "드라마",
    10751: "가족",
    14: "판타지",
    36: "역사",
    27: "공포",
    10402: "음악",
    9648: "미스터리",
    10749: "로맨스",
    878: "SF",
    10770: "TV 영화",
    53: "스릴러",
    10752: "전쟁",
    37: "서부",
  };

  return genreIds.map((id) => genreMap[id] || "기타").slice(0, 3); // 최대 3개만
}
//
// 5단계 (검색 기능)에서 추가 예정:
// - debounce: 검색 입력 디바운싱
//
// 6단계 (데이터 관리)에서 추가 예정:
// - getFromLocalStorage: 로컬 스토리지 안전 읽기
// - setToLocalStorage: 로컬 스토리지 안전 쓰기
//
// 7단계 (고급 기능)에서 추가 예정:
// - createSlug: URL 슬러그 생성
// - formatDate: 날짜 포맷팅
// - formatRuntime: 런타임 포맷팅
// - formatNumber: 숫자 포맷팅 (1K, 1M)
// - shuffleArray: 배열 랜덤 섞기
// - delay: Promise 기반 지연 함수

/**
 * 왜 이렇게 단계별로 나누었나요?
 *
 * 1. 학습 부담 감소
 *    - 한 번에 모든 함수를 이해할 필요 없음
 *    - 필요한 시점에 해당 함수의 목적과 사용법을 배움
 *
 * 2. 실무와 동일한 방식
 *    - 실제 개발에서도 필요할 때 유틸리티 함수를 추가
 *    - 사용하지 않는 함수는 번들 크기만 증가시킴
 *
 * 3. 디버깅 용이성
 *    - 각 단계에서 추가된 함수만 테스트하면 됨
 *    - 문제 발생 시 해당 단계의 함수만 확인
 *
 * 4. 강의 진행성
 *    - 각 함수의 필요성을 실제 사용 맥락에서 설명 가능
 *    - "왜 이 함수가 필요한가?"에 대한 명확한 답변 제공
 */
