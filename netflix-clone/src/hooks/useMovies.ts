// src/hooks/useMovies.ts
// 영화 데이터를 위한 React Query 훅스

import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { TMDBService } from "@/lib/tmdb";
import { queryKeys } from "@/components/providers/QueryProvider";
import {
  MoviesResponse,
  TVShowsResponse,
  MovieCategory,
  TVCategory,
  Genre,
} from "@/types";

/**
 * 영화 목록을 가져오는 훅
 * @param category - 영화 카테고리
 * @param page - 페이지 번호 (기본값: 1)
 * @returns UseQueryResult<MoviesResponse>
 */
export function useMovies(
  category: MovieCategory,
  page: number = 1
): UseQueryResult<MoviesResponse> {
  return useQuery({
    queryKey: queryKeys.movies.list(category, page),
    queryFn: () => TMDBService.getMovies(category, page),
    enabled: !!category, // category가 있을 때만 실행
  });
}

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
    enabled: !!category,
  });
}

/**
 * 영화 상세 정보를 가져오는 훅
 * @param movieId - 영화 ID
 * @returns UseQueryResult<Movie>
 */
export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: queryKeys.movies.detail(movieId),
    queryFn: () => TMDBService.getMovieDetails(movieId),
    enabled: !!movieId && movieId > 0,
  });
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
 * 영화 검색 훅
 * @param query - 검색어
 * @param page - 페이지 번호 (기본값: 1)
 * @returns UseQueryResult<MoviesResponse>
 */
export function useSearchMovies(
  query: string,
  page: number = 1
): UseQueryResult<MoviesResponse> {
  return useQuery({
    queryKey: queryKeys.movies.search(query, page),
    queryFn: () => TMDBService.searchMovies(query, page),
    enabled: !!query && query.trim().length > 0, // 검색어가 있을 때만 실행
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
    enabled: !!query && query.trim().length > 0,
  });
}

/**
 * 영화 장르 목록을 가져오는 훅
 * @returns UseQueryResult<Genre[]>
 */
export function useMovieGenres(): UseQueryResult<Genre[]> {
  return useQuery({
    queryKey: queryKeys.genres.movies(),
    queryFn: () => TMDBService.getMovieGenres(),
    staleTime: 24 * 60 * 60 * 1000, // 24시간 (장르는 자주 변하지 않음)
  });
}

/**
 * TV 장르 목록을 가져오는 훅
 * @returns UseQueryResult<Genre[]>
 */
export function useTVGenres(): UseQueryResult<Genre[]> {
  return useQuery({
    queryKey: queryKeys.genres.tv(),
    queryFn: () => TMDBService.getTVGenres(),
    staleTime: 24 * 60 * 60 * 1000, // 24시간
  });
}

/**
 * 트렌딩 콘텐츠를 가져오는 훅
 * @param mediaType - 미디어 타입 ('movie' | 'tv' | 'all')
 * @param timeWindow - 시간 범위 ('day' | 'week')
 * @returns UseQueryResult<MoviesResponse | TVShowsResponse>
 */
export function useTrending(
  mediaType: "movie" | "tv" | "all" = "all",
  timeWindow: "day" | "week" = "week"
) {
  return useQuery({
    queryKey: queryKeys.trending.list(mediaType, timeWindow),
    queryFn: () => TMDBService.getTrending(mediaType, timeWindow),
    staleTime: 30 * 60 * 1000, // 30분 (트렌딩은 비교적 자주 업데이트)
  });
}

/**
 * 비슷한 영화를 가져오는 훅
 * @param movieId - 영화 ID
 * @param page - 페이지 번호 (기본값: 1)
 * @returns UseQueryResult<MoviesResponse>
 */
export function useSimilarMovies(
  movieId: number,
  page: number = 1
): UseQueryResult<MoviesResponse> {
  return useQuery({
    queryKey: queryKeys.movies.similar(movieId),
    queryFn: () => TMDBService.getSimilarMovies(movieId, page),
    enabled: !!movieId && movieId > 0,
  });
}

/**
 * 추천 영화를 가져오는 훅
 * @param movieId - 영화 ID
 * @param page - 페이지 번호 (기본값: 1)
 * @returns UseQueryResult<MoviesResponse>
 */
export function useRecommendedMovies(
  movieId: number,
  page: number = 1
): UseQueryResult<MoviesResponse> {
  return useQuery({
    queryKey: queryKeys.movies.recommendations(movieId),
    queryFn: () => TMDBService.getRecommendedMovies(movieId, page),
    enabled: !!movieId && movieId > 0,
  });
}

/**
 * 여러 영화 카테고리를 한번에 가져오는 훅
 * @param categories - 영화 카테고리 배열
 * @returns 각 카테고리별 쿼리 결과 객체
 */
export function useMultipleMovieCategories(
  categories: MovieCategory[],
  page: number = 1
) {
  const queryResults = useQueries({
    queries: categories.map((category) => ({
      queryKey: queryKeys.movies.list(category, page),
      queryFn: () => TMDBService.getMovies(category, page),
      enabled: !!category,
      // 필요하면 staleTime·cacheTime 등 옵션 추가
    })),
  });

  /**
   * queryResults 는 배열이므로,
   *  { popular: ..., top_rated: ... } 형태가 필요하다면 아래처럼 변환
   */
  const resultsByCategory = categories.reduce((acc, category, idx) => {
    acc[category] = queryResults[idx] as UseQueryResult<MoviesResponse>;
    return acc;
  }, {} as Record<MovieCategory, UseQueryResult<MoviesResponse>>);

  return resultsByCategory;
}

/**
 * 홈페이지용 영화 데이터를 모두 가져오는 훅
 * Netflix 홈페이지에 필요한 모든 섹션의 데이터를 한번에 관리
 */
export function useHomePageMovies() {
  const popularMovies = useMovies("popular");
  const nowPlayingMovies = useMovies("now_playing");
  const topRatedMovies = useMovies("top_rated");
  const upcomingMovies = useMovies("upcoming");
  const trendingContent = useTrending("movie", "week");

  return {
    popular: popularMovies,
    nowPlaying: nowPlayingMovies,
    topRated: topRatedMovies,
    upcoming: upcomingMovies,
    trending: trendingContent,
    // 전체 로딩 상태
    isLoading: [
      popularMovies,
      nowPlayingMovies,
      topRatedMovies,
      upcomingMovies,
      trendingContent,
    ].some((query) => query.isLoading),
    // 전체 에러 상태
    hasError: [
      popularMovies,
      nowPlayingMovies,
      topRatedMovies,
      upcomingMovies,
      trendingContent,
    ].some((query) => query.isError),
  };
}
