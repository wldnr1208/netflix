// src/components/providers/AppProvider.tsx
// Client Component로 헤더와 메인 콘텐츠를 관리 (검색 기능 추가)

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import QueryProvider from "./QueryProvider";

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * 메인 앱 레이아웃 Provider
 *
 * 역할:
 * - Header 컴포넌트 관리 (이벤트 핸들러 포함)
 * - 메인 콘텐츠 레이아웃 관리
 * - 검색 기능 라우팅 처리
 * - React Query Provider 제공
 *
 * 참고: SessionProvider는 SessionWrapper에서 제공됨
 */
export default function AppProvider({ children }: AppProviderProps) {
  const router = useRouter();

  // 검색 기능 핸들러
  const handleSearch = (query: string) => {
    if (query.trim()) {
      console.log("검색어:", query);
      // 검색 페이지로 라우팅
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <QueryProvider>
      {/* Netflix 헤더 */}
      <Header transparent={true} onSearch={handleSearch} />

      {/* 메인 콘텐츠 - 헤더 높이만큼 padding 추가 */}
      <main className="relative pt-16 lg:pt-20">{children}</main>
    </QueryProvider>
  );
}
