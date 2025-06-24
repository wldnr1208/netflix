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
// 3단계 (로그인 페이지)에서 추가 예정:
// - 이메일 유효성 검사 함수
// - 비밀번호 강도 검사 함수
//
// 4단계 (영화 카드)에서 추가 예정:
// - getImageUrl: TMDB 이미지 URL 생성
// - formatRating: 평점을 별점으로 변환
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
