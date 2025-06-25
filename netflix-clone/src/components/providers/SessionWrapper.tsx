// src/components/providers/SessionWrapper.tsx
// NextAuth SessionProvider를 위한 Client Component 래퍼

"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

interface SessionWrapperProps {
  children: React.ReactNode;
}

/**
 * NextAuth SessionProvider 래퍼
 *
 * 역할:
 * - 전체 앱을 SessionProvider로 감싸기
 * - 로그인 페이지와 메인 앱 모두에서 useSession 사용 가능
 */
export default function SessionWrapper({ children }: SessionWrapperProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
