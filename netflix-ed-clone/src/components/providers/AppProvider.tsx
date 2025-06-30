// src/components/providers/AppProvider.tsx
// Client Component로 헤더와 전역 상태를 관리

"use client";

import React from "react";
import Header from "@/components/layout/Header";

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * 앱 전체를 감싸는 Client Component
 *
 * 역할:
 * - Header 컴포넌트 관리 (이벤트 핸들러 포함)
 * - 나중에 React Query Provider 추가 예정
 * - 나중에 Zustand Store Provider 추가 예정
 */
export default function AppProvider({ children }: AppProviderProps) {
  // 검색 기능 핸들러
  const handleSearch = (query: string) => {
    console.log("검색어:", query);
    // TODO: 나중에 검색 페이지로 라우팅 또는 검색 결과 페이지로 이동
    // router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      {/* Netflix 헤더 */}
      <Header transparent={true} onSearch={handleSearch} />

      {/* 메인 콘텐츠 - 헤더 높이만큼 padding 추가 */}
      <main className="relative pt-16 lg:pt-20">{children}</main>
    </>
  );
}
