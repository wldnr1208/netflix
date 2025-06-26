// src/hooks/useTVShows.ts
// TV 프로그램 데이터를 가져오는 React Query 훅들 (수정됨)

import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { TMDBService } from "@/lib/tmdb";
import { queryKeys } from "@/components/providers/QueryProvider";
import { TVShowsResponse, TVCategory } from "@/types";

/**
 * TV 프로그램 목록을 가져오는 훅
 * @param category - TV 프로그램 카테고리
 * @param page - 페이지 번호 (기본값: 1)
 * @returns UseQueryResult<TVShowsResponse>
 */
export function useTVShows(
  category: TVCategory,
  page: number = 1
): UseQueryResult<TVShowsResponse> {
  return useQuery({
    queryKey: queryKeys.tv.list(category, page),
    queryFn: () => TMDBService.getTVShows(category, page),
    enabled: !!category, // category가 있을 때만 실행
  });
}

/**
 * 인기 TV 프로그램 훅
 */
export function usePopularTVShows(page: number = 1) {
  return useTVShows("popular", page);
}

/**
 * 높은 평점 TV 프로그램 훅
 */
export function useTopRatedTVShows(page: number = 1) {
  return useTVShows("top_rated", page);
}

/**
 * 현재 방영중 TV 프로그램 훅
 */
export function useOnTheAirTVShows(page: number = 1) {
  return useTVShows("on_the_air", page);
}

/**
 * 오늘 방영 TV 프로그램 훅
 */
export function useAiringTodayTVShows(page: number = 1) {
  return useTVShows("airing_today", page);
}

/**
 * TV 프로그램 상세 정보를 가져오는 훅
 * @param tvId - TV 프로그램 ID
 * @returns UseQueryResult<TVShow>
 */
export function useTVShowDetails(tvId: number) {
  return useQuery({
    queryKey: queryKeys.tv.detail(tvId),
    queryFn: () => TMDBService.getTVShowDetails(tvId),
    enabled: !!tvId && tvId > 0,
  });
}

/**
 * TV 프로그램 검색 훅
 * @param query - 검색어
 * @param page - 페이지 번호 (기본값: 1)
 * @returns UseQueryResult<TVShowsResponse>
 */
export function useSearchTVShows(
  query: string,
  page: number = 1
): UseQueryResult<TVShowsResponse> {
  return useQuery({
    queryKey: queryKeys.tv.search(query, page),
    queryFn: () => TMDBService.searchTVShows(query, page),
    enabled: !!query && query.trim().length > 0, // 검색어가 있을 때만 실행
  });
}

/**
 * 트렌딩 TV 프로그램을 가져오는 훅
 * @param timeWindow - 시간 범위 ('day' | 'week')
 * @returns UseQueryResult<TVShowsResponse>
 */
export function useTrendingTVShows(timeWindow: "day" | "week" = "week") {
  return useQuery({
    queryKey: queryKeys.trending.list("tv", timeWindow),
    queryFn: () => TMDBService.getTrending("tv", timeWindow),
    staleTime: 30 * 60 * 1000, // 30분 (트렌딩은 비교적 자주 업데이트)
  });
}

/**
 * 여러 TV 프로그램 카테고리를 한번에 가져오는 훅
 * @param categories - TV 프로그램 카테고리 배열
 * @param page - 페이지 번호 (기본값: 1)
 * @returns 각 카테고리별 쿼리 결과 객체
 */
export function useMultipleTVCategories(
  categories: TVCategory[],
  page: number = 1
) {
  const queryResults = useQueries({
    queries: categories.map((category) => ({
      queryKey: queryKeys.tv.list(category, page),
      queryFn: () => TMDBService.getTVShows(category, page),
      enabled: !!category,
    })),
  });

  /**
   * queryResults 는 배열이므로,
   *  { popular: ..., top_rated: ... } 형태가 필요하다면 아래처럼 변환
   */
  const resultsByCategory = categories.reduce((acc, category, idx) => {
    acc[category] = queryResults[idx] as UseQueryResult<TVShowsResponse>;
    return acc;
  }, {} as Record<TVCategory, UseQueryResult<TVShowsResponse>>);

  return resultsByCategory;
}

/**
 * 홈페이지용 TV 프로그램 데이터를 모두 가져오는 훅
 * Netflix 홈페이지에 필요한 모든 섹션의 데이터를 한번에 관리
 */
export function useHomePageTVShows() {
  const popularTV = useTVShows("popular");
  const topRatedTV = useTVShows("top_rated");
  const onTheAirTV = useTVShows("on_the_air");
  const airingTodayTV = useTVShows("airing_today");
  const trendingTV = useTrendingTVShows("week");

  return {
    popular: popularTV,
    topRated: topRatedTV,
    onTheAir: onTheAirTV,
    airingToday: airingTodayTV,
    trending: trendingTV,
    // 전체 로딩 상태
    isLoading: [
      popularTV,
      topRatedTV,
      onTheAirTV,
      airingTodayTV,
      trendingTV,
    ].some((query) => query.isLoading),
    // 전체 에러 상태
    hasError: [
      popularTV,
      topRatedTV,
      onTheAirTV,
      airingTodayTV,
      trendingTV,
    ].some((query) => query.isError),
    // 에러 정보
    errors: {
      popular: popularTV.error,
      topRated: topRatedTV.error,
      onTheAir: onTheAirTV.error,
      airingToday: airingTodayTV.error,
      trending: trendingTV.error,
    },
  };
}
