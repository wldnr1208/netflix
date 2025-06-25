// src/app/api/auth/[...nextauth]/route.ts
// NextAuth.js API 라우트 핸들러

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth.js API 라우트
 *
 * 이 파일은 NextAuth의 모든 인증 요청을 처리합니다:
 * - GET /api/auth/signin: 로그인 페이지
 * - POST /api/auth/signin: 로그인 처리
 * - GET /api/auth/signout: 로그아웃 페이지
 * - POST /api/auth/signout: 로그아웃 처리
 * - GET /api/auth/session: 세션 정보
 * - GET /api/auth/csrf: CSRF 토큰
 * - GET /api/auth/providers: 로그인 제공자 목록
 * - GET /api/auth/callback/[provider]: OAuth 콜백
 */

const handler = NextAuth(authOptions);

// Next.js 13+ App Router에서 GET, POST 요청 모두 처리
export { handler as GET, handler as POST };
