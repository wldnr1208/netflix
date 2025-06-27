// src/types/index.ts
// Netflix 클론 프로젝트의 기본 타입 정의 (비디오 타입 추가)

// 현재 2단계에서 실제로 사용하는 타입들만 정의

/**
 * 버튼 컴포넌트 관련 타입
 */
export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * 아이콘 컴포넌트 타입
 */
export interface IconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * 로고 컴포넌트 타입
 */
export interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  clickable?: boolean;
}

// 3단계에서 추가: 로그인 관련 타입들

/**
 * 사용자 타입 (NextAuth 사용자 확장)
 */
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string; // google, credentials 등
}

/**
 * 로그인 폼 데이터
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * 회원가입 폼 데이터
 */
export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

/**
 * 폼 유효성 검사 오류
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * 소셜 로그인 제공자
 */
export type SocialProvider = "google" | "credentials";

/**
 * 로그인 페이지 Props (Next.js 15 대응)
 */
export interface LoginPageProps {
  searchParams?: Promise<{
    callbackUrl?: string;
    error?: string;
    message?: string;
  }>;
}

// 4단계에서 추가: 영화 관련 타입들

/**
 * TMDB 영화 데이터 타입 (기본)
 */
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
  video: boolean;
  // 상세 정보에서 추가되는 속성들 (옵셔널)
  genres?: Genre[];
  runtime?: number;
  budget?: number;
  revenue?: number;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  homepage?: string;
}

/**
 * TMDB TV 프로그램 데이터 타입 (기본)
 */
export interface TVShow {
  id: number;
  name: string;
  title?: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  origin_country: string[];
  original_language: string;
  popularity: number;
  // 상세 정보에서 추가되는 속성들 (옵셔널)
  genres?: Genre[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  episode_run_time?: number[];
  networks?: Network[];
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  spoken_languages?: SpokenLanguage[];
  created_by?: Creator[];
  seasons?: Season[];
  status?: string;
  type?: string;
  last_air_date?: string;
  next_episode_to_air?: Episode;
  last_episode_to_air?: Episode;
  homepage?: string;
  tagline?: string;
}

/**
 * 장르 타입
 */
export interface Genre {
  id: number;
  name: string;
}

/**
 * 제작사 타입
 */
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

/**
 * 제작 국가 타입
 */
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

/**
 * 언어 타입
 */
export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

/**
 * 네트워크 타입 (TV 전용)
 */
export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

/**
 * 제작자 타입 (TV 전용)
 */
export interface Creator {
  id: number;
  name: string;
  gender: number;
  profile_path: string | null;
}

/**
 * 시즌 타입 (TV 전용)
 */
export interface Season {
  id: number;
  air_date: string;
  episode_count: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

/**
 * 에피소드 타입 (TV 전용)
 */
export interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

// 비디오 관련 타입들 (예고편 재생 기능)

/**
 * TMDB 비디오 정보 타입
 */
export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string; // YouTube, Vimeo 등
  type: string; // Trailer, Teaser, Clip 등
  official: boolean;
  published_at: string;
  size: number; // 720, 1080 등
}

/**
 * TMDB 비디오 응답 타입
 */
export interface TMDBVideosResponse {
  id: number;
  results: TMDBVideo[];
}

/**
 * 비디오 모달 Props
 */
export interface VideoModalProps {
  video: TMDBVideo | null;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

/**
 * 예고편 버튼 Props
 */
export interface TrailerButtonProps {
  video: TMDBVideo | null;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
}

/**
 * TMDB API 응답 타입
 */
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/**
 * 영화 API 응답 타입
 */
export type MoviesResponse = TMDBResponse<Movie>;

/**
 * TV 프로그램 API 응답 타입
 */
export type TVShowsResponse = TMDBResponse<TVShow>;

/**
 * 영화 카테고리 타입
 */
export type MovieCategory =
  | "now_playing"
  | "popular"
  | "top_rated"
  | "upcoming";

/**
 * TV 프로그램 카테고리 타입
 */
export type TVCategory =
  | "airing_today"
  | "on_the_air"
  | "popular"
  | "top_rated";

/**
 * 영화 카드 컴포넌트 Props
 */
export interface MovieCardProps {
  movie: Movie;
  size?: "sm" | "md" | "lg";
  showTitle?: boolean;
  showOverview?: boolean;
  onPlay?: (movie: Movie) => void;
  className?: string;
}

/**
 * TV 카드 컴포넌트 Props
 */
export interface TVCardProps {
  show: TVShow;
  size?: "sm" | "md" | "lg";
  showTitle?: boolean;
  showOverview?: boolean;
  onPlay?: (show: TVShow) => void;
  className?: string;
}

/**
 * 영화 섹션 컴포넌트 Props
 */
export interface MovieSectionProps {
  title: string;
  category: MovieCategory;
  className?: string;
}

/**
 * TV 섹션 컴포넌트 Props
 */
export interface TVSectionProps {
  title: string;
  category: TVCategory;
  className?: string;
}

/**
 * 영화 슬라이더 컴포넌트 Props
 */
export interface MovieSliderProps {
  movies: Movie[];
  title: string;
  isLoading?: boolean;
  onMovieClick?: (movie: Movie) => void;
  showSeeAll?: boolean;
  onSeeAllClick?: () => void;
  className?: string;
}

/**
 * TV 슬라이더 컴포넌트 Props
 */
export interface TVSliderProps {
  shows: TVShow[];
  title: string;
  isLoading?: boolean;
  onShowClick?: (show: TVShow) => void;
  showSeeAll?: boolean;
  onSeeAllClick?: () => void;
  className?: string;
}

/**
 * 미디어 타입 (영화 또는 TV)
 */
export type MediaType = "movie" | "tv";

/**
 * 트렌딩 미디어 타입
 */
export type TrendingMediaType = "movie" | "tv" | "all";

/**
 * 시간 범위 타입
 */
export type TimeWindow = "day" | "week";

/**
 * 검색 결과 타입
 */
export interface SearchResults {
  movies: Movie[];
  tvShows: TVShow[];
  totalResults: number;
}

/**
 * 찜하기 아이템 타입
 */
export interface WatchlistItem {
  id: number;
  type: MediaType;
  title: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  addedAt: string;
}

/**
 * 찜하기 버튼 Props
 */
export interface WatchlistButtonProps {
  item: Movie | TVShow;
  type: MediaType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}
