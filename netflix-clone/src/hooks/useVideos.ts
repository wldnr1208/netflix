// src/hooks/useVideos.ts
// 영화/TV 프로그램 비디오(예고편) 데이터를 가져오는 React Query 훅들

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TMDBService } from "@/lib/tmdb";
import { TMDBVideosResponse } from "@/types";
import { queryKeys } from "@/components/providers/QueryProvider";

/**
 * 영화 비디오(예고편) 정보를 가져오는 훅
 * @param movieId - 영화 ID
 * @returns UseQueryResult<TMDBVideosResponse>
 */
export function useMovieVideos(
  movieId: number
): UseQueryResult<TMDBVideosResponse> {
  return useQuery({
    queryKey: queryKeys.movies.videos(movieId),
    queryFn: () => TMDBService.getMovieVideos(movieId),
    enabled: !!movieId && movieId > 0,
    staleTime: 24 * 60 * 60 * 1000, // 24시간 (비디오 정보는 자주 바뀌지 않음)
  });
}

/**
 * TV 프로그램 비디오(예고편) 정보를 가져오는 훅
 * @param tvId - TV 프로그램 ID
 * @returns UseQueryResult<TMDBVideosResponse>
 */
export function useTVVideos(tvId: number): UseQueryResult<TMDBVideosResponse> {
  return useQuery({
    queryKey: queryKeys.tv.videos(tvId),
    queryFn: () => TMDBService.getTVVideos(tvId),
    enabled: !!tvId && tvId > 0,
    staleTime: 24 * 60 * 60 * 1000, // 24시간
  });
}

/**
 * 영화 예고편 필터링 훅
 * @param movieId - 영화 ID
 * @returns 필터링된 예고편 목록과 메인 예고편
 */
export function useMovieTrailers(movieId: number) {
  const { data: videosData, isLoading, error } = useMovieVideos(movieId);

  const trailers = videosData?.results
    ? TMDBService.filterTrailers(videosData.results)
    : [];

  const mainTrailer = trailers.length > 0 ? trailers[0] : null;

  return {
    trailers,
    mainTrailer,
    hasTrailers: trailers.length > 0,
    isLoading,
    error,
  };
}

/**
 * TV 프로그램 예고편 필터링 훅
 * @param tvId - TV 프로그램 ID
 * @returns 필터링된 예고편 목록과 메인 예고편
 */
export function useTVTrailers(tvId: number) {
  const { data: videosData, isLoading, error } = useTVVideos(tvId);

  const trailers = videosData?.results
    ? TMDBService.filterTrailers(videosData.results)
    : [];

  const mainTrailer = trailers.length > 0 ? trailers[0] : null;

  return {
    trailers,
    mainTrailer,
    hasTrailers: trailers.length > 0,
    isLoading,
    error,
  };
}
