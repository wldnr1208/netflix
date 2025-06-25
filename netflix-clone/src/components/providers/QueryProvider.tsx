// src/components/providers/QueryProvider.tsx
// React Query Provider 설정

"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * React Query 설정
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5분간 캐시 유지
      staleTime: 5 * 60 * 1000, // 5분
      // 캐시된 데이터를 10분간 메모리에 보관
      gcTime: 10 * 60 * 1000, // 10분 (구 cacheTime)
      // 네트워크 재연결 시 자동 refetch
      refetchOnReconnect: true,
      // 윈도우 포커스 시 refetch 비활성화 (Netflix 특성상)
      refetchOnWindowFocus: false,
      // 에러 발생 시 재시도 설정
      retry: (failureCount, error) => {
        // 404 에러는 재시도하지 않음
        if (error && "status" in error && error.status === 404) {
          return false;
        }
        // 3회까지 재시도
        return failureCount < 3;
      },
      // 재시도 간격 (지수 백오프)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // mutation 에러 발생 시 1회 재시도
      retry: 1,
    },
  },
});

/**
 * React Query Provider 컴포넌트
 *
 * 기능:
 * - 전역 QueryClient 제공
 * - 개발 환경에서 React Query Devtools 활성화
 * - Netflix에 최적화된 캐싱 전략 적용
 */
export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* 개발 환경에서만 Devtools 표시 */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}

/**
 * React Query 키 팩토리
 *
 * 일관된 쿼리 키 관리를 위한 팩토리 함수들
 */
export const queryKeys = {
  // 영화 관련 쿼리 키들
  movies: {
    all: () => ["movies"] as const,
    lists: () => [...queryKeys.movies.all(), "list"] as const,
    list: (category: string, page?: number) =>
      [...queryKeys.movies.lists(), category, page] as const,
    details: () => [...queryKeys.movies.all(), "detail"] as const,
    detail: (id: number) => [...queryKeys.movies.details(), id] as const,
    search: (query: string, page?: number) =>
      [...queryKeys.movies.all(), "search", query, page] as const,
    similar: (id: number) =>
      [...queryKeys.movies.all(), "similar", id] as const,
    recommendations: (id: number) =>
      [...queryKeys.movies.all(), "recommendations", id] as const,
  },

  // TV 프로그램 관련 쿼리 키들
  tv: {
    all: () => ["tv"] as const,
    lists: () => [...queryKeys.tv.all(), "list"] as const,
    list: (category: string, page?: number) =>
      [...queryKeys.tv.lists(), category, page] as const,
    details: () => [...queryKeys.tv.all(), "detail"] as const,
    detail: (id: number) => [...queryKeys.tv.details(), id] as const,
    search: (query: string, page?: number) =>
      [...queryKeys.tv.all(), "search", query, page] as const,
  },

  // 장르 관련 쿼리 키들
  genres: {
    all: () => ["genres"] as const,
    movies: () => [...queryKeys.genres.all(), "movies"] as const,
    tv: () => [...queryKeys.genres.all(), "tv"] as const,
  },

  // 트렌딩 관련 쿼리 키들
  trending: {
    all: () => ["trending"] as const,
    list: (mediaType: string, timeWindow: string) =>
      [...queryKeys.trending.all(), mediaType, timeWindow] as const,
  },
} as const;

/**
 * 쿼리 클라이언트 접근 함수 (필요시 사용)
 */
export const getQueryClient = () => queryClient;
