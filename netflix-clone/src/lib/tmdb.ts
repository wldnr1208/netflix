// src/lib/tmdb.ts
// TMDB API 서비스 함수들

import axios from "axios";
import {
  Movie,
  TVShow,
  MoviesResponse,
  TVShowsResponse,
  MovieCategory,
  TVCategory,
  Genre,
} from "@/types";

// TMDB API 설정
const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error(
    "TMDB API 키가 설정되지 않았습니다. .env.local 파일을 확인해주세요."
  );
}

// Axios 인스턴스 생성
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "ko-KR", // 한국어 우선, 없으면 영어
    region: "KR", // 한국 지역 설정
  },
});

/**
 * TMDB API 서비스 클래스
 */
export class TMDBService {
  /**
   * 영화 목록을 카테고리별로 가져오는 함수
   * @param category - 영화 카테고리
   * @param page - 페이지 번호 (기본값: 1)
   * @returns Promise<MoviesResponse>
   */
  static async getMovies(
    category: MovieCategory,
    page: number = 1
  ): Promise<MoviesResponse> {
    try {
      const response = await tmdbApi.get<MoviesResponse>(`/movie/${category}`, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error(`영화 목록 가져오기 실패 (${category}):`, error);
      throw new Error(`영화 목록을 가져올 수 없습니다: ${category}`);
    }
  }

  /**
   * TV 프로그램 목록을 카테고리별로 가져오는 함수
   * @param category - TV 프로그램 카테고리
   * @param page - 페이지 번호 (기본값: 1)
   * @returns Promise<TVShowsResponse>
   */
  static async getTVShows(
    category: TVCategory,
    page: number = 1
  ): Promise<TVShowsResponse> {
    try {
      const response = await tmdbApi.get<TVShowsResponse>(`/tv/${category}`, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error(`TV 프로그램 목록 가져오기 실패 (${category}):`, error);
      throw new Error(`TV 프로그램 목록을 가져올 수 없습니다: ${category}`);
    }
  }

  /**
   * 특정 영화의 상세 정보를 가져오는 함수
   * @param movieId - 영화 ID
   * @returns Promise<Movie>
   */
  static async getMovieDetails(movieId: number): Promise<Movie> {
    try {
      const response = await tmdbApi.get<Movie>(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(`영화 상세 정보 가져오기 실패 (ID: ${movieId}):`, error);
      throw new Error("영화 상세 정보를 가져올 수 없습니다.");
    }
  }

  /**
   * 특정 TV 프로그램의 상세 정보를 가져오는 함수
   * @param tvId - TV 프로그램 ID
   * @returns Promise<TVShow>
   */
  static async getTVShowDetails(tvId: number): Promise<TVShow> {
    try {
      const response = await tmdbApi.get<TVShow>(`/tv/${tvId}`);
      return response.data;
    } catch (error) {
      console.error(
        `TV 프로그램 상세 정보 가져오기 실패 (ID: ${tvId}):`,
        error
      );
      throw new Error("TV 프로그램 상세 정보를 가져올 수 없습니다.");
    }
  }

  /**
   * 영화 검색 함수
   * @param query - 검색어
   * @param page - 페이지 번호 (기본값: 1)
   * @returns Promise<MoviesResponse>
   */
  static async searchMovies(
    query: string,
    page: number = 1
  ): Promise<MoviesResponse> {
    try {
      const response = await tmdbApi.get<MoviesResponse>("/search/movie", {
        params: { query, page },
      });
      return response.data;
    } catch (error) {
      console.error(`영화 검색 실패 (검색어: ${query}):`, error);
      throw new Error("영화 검색에 실패했습니다.");
    }
  }

  /**
   * TV 프로그램 검색 함수
   * @param query - 검색어
   * @param page - 페이지 번호 (기본값: 1)
   * @returns Promise<TVShowsResponse>
   */
  static async searchTVShows(
    query: string,
    page: number = 1
  ): Promise<TVShowsResponse> {
    try {
      const response = await tmdbApi.get<TVShowsResponse>("/search/tv", {
        params: { query, page },
      });
      return response.data;
    } catch (error) {
      console.error(`TV 프로그램 검색 실패 (검색어: ${query}):`, error);
      throw new Error("TV 프로그램 검색에 실패했습니다.");
    }
  }

  /**
   * 영화 장르 목록을 가져오는 함수
   * @returns Promise<Genre[]>
   */
  static async getMovieGenres(): Promise<Genre[]> {
    try {
      const response = await tmdbApi.get<{ genres: Genre[] }>(
        "/genre/movie/list"
      );
      return response.data.genres;
    } catch (error) {
      console.error("영화 장르 목록 가져오기 실패:", error);
      throw new Error("영화 장르 목록을 가져올 수 없습니다.");
    }
  }

  /**
   * TV 프로그램 장르 목록을 가져오는 함수
   * @returns Promise<Genre[]>
   */
  static async getTVGenres(): Promise<Genre[]> {
    try {
      const response = await tmdbApi.get<{ genres: Genre[] }>("/genre/tv/list");
      return response.data.genres;
    } catch (error) {
      console.error("TV 장르 목록 가져오기 실패:", error);
      throw new Error("TV 장르 목록을 가져올 수 없습니다.");
    }
  }

  /**
   * 트렌딩 콘텐츠를 가져오는 함수
   * @param mediaType - 미디어 타입 ('movie' | 'tv' | 'all')
   * @param timeWindow - 시간 범위 ('day' | 'week')
   * @returns Promise<MoviesResponse | TVShowsResponse>
   */
  static async getTrending(
    mediaType: "movie" | "tv" | "all" = "all",
    timeWindow: "day" | "week" = "week"
  ): Promise<MoviesResponse | TVShowsResponse> {
    try {
      const response = await tmdbApi.get(
        `/trending/${mediaType}/${timeWindow}`
      );
      return response.data;
    } catch (error) {
      console.error("트렌딩 콘텐츠 가져오기 실패:", error);
      throw new Error("트렌딩 콘텐츠를 가져올 수 없습니다.");
    }
  }

  /**
   * 비슷한 영화를 가져오는 함수
   * @param movieId - 영화 ID
   * @param page - 페이지 번호 (기본값: 1)
   * @returns Promise<MoviesResponse>
   */
  static async getSimilarMovies(
    movieId: number,
    page: number = 1
  ): Promise<MoviesResponse> {
    try {
      const response = await tmdbApi.get<MoviesResponse>(
        `/movie/${movieId}/similar`,
        {
          params: { page },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`비슷한 영화 가져오기 실패 (ID: ${movieId}):`, error);
      throw new Error("비슷한 영화를 가져올 수 없습니다.");
    }
  }

  /**
   * 추천 영화를 가져오는 함수
   * @param movieId - 영화 ID
   * @param page - 페이지 번호 (기본값: 1)
   * @returns Promise<MoviesResponse>
   */
  static async getRecommendedMovies(
    movieId: number,
    page: number = 1
  ): Promise<MoviesResponse> {
    try {
      const response = await tmdbApi.get<MoviesResponse>(
        `/movie/${movieId}/recommendations`,
        {
          params: { page },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`추천 영화 가져오기 실패 (ID: ${movieId}):`, error);
      throw new Error("추천 영화를 가져올 수 없습니다.");
    }
  }
}

/**
 * 카테고리명을 한국어로 변환하는 함수
 * @param category - 영화 카테고리
 * @returns 한국어 카테고리명
 */
export function getMovieCategoryName(category: MovieCategory): string {
  const categoryNames: Record<MovieCategory, string> = {
    now_playing: "현재 상영중",
    popular: "인기 영화",
    top_rated: "높은 평점",
    upcoming: "개봉 예정",
  };

  return categoryNames[category] || category;
}

/**
 * TV 카테고리명을 한국어로 변환하는 함수
 * @param category - TV 프로그램 카테고리
 * @returns 한국어 카테고리명
 */
export function getTVCategoryName(category: TVCategory): string {
  const categoryNames: Record<TVCategory, string> = {
    airing_today: "오늘 방영",
    on_the_air: "방영 중",
    popular: "인기 프로그램",
    top_rated: "높은 평점",
  };

  return categoryNames[category] || category;
}

/**
 * API 상태 확인 함수
 * @returns Promise<boolean>
 */
export async function checkTMDBConnection(): Promise<boolean> {
  try {
    await tmdbApi.get("/configuration");
    return true;
  } catch (error) {
    console.error("TMDB API 연결 실패:", error);
    return false;
  }
}

export default TMDBService;
