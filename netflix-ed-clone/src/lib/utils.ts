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
