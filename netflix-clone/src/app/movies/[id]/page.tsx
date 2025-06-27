// src/app/movies/[id]/page.tsx
// 영화 상세 페이지 (예고편 모달 통합)
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useMovieDetails, useSimilarMovies } from "@/hooks/useMovies";
import { useMovieTrailers } from "@/hooks/useVideos";
import { getImageUrl, formatRating, getYear, formatRuntime } from "@/lib/utils";
import { Movie } from "@/types";
import Button from "@/components/ui/Button";
import WatchlistButton from "@/components/ui/WatchlistButton";
import MovieSlider from "@/components/ui/MovieSlider";
import { MovieSliderGroup } from "@/components/ui/MovieSliderGroup";
import VideoModal, { TrailerButton } from "@/components/ui/VideoModal";

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = parseInt(params.id as string);

  // 비디오 모달 상태
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // 영화 상세 정보 가져오기
  const { data: movie, isLoading, error } = useMovieDetails(movieId);

  // 비슷한 영화 가져오기
  const { data: similarMovies } = useSimilarMovies(movieId);

  // 예고편 정보 가져오기
  const {
    mainTrailer,
    hasTrailers,
    isLoading: trailersLoading,
  } = useMovieTrailers(movieId);

  // 영화 클릭 핸들러
  const handleMovieClick = (clickedMovie: Movie) => {
    window.location.href = `/movies/${clickedMovie.id}`;
  };

  // 재생 버튼 클릭 핸들러
  const handlePlayClick = () => {
    if (mainTrailer) {
      setIsVideoModalOpen(true);
    } else {
      alert(`${movie?.title}의 예고편을 찾을 수 없습니다.`);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen netflix-bg-gray-dark pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-netflix-red mx-auto mb-4"></div>
          <p className="text-white">영화 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !movie) {
    return (
      <div className="min-h-screen netflix-bg-gray-dark pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            영화를 찾을 수 없습니다
          </h1>
          <p className="text-netflix-gray-light mb-6">
            요청하신 영화가 존재하지 않거나 삭제되었습니다.
          </p>
          <Link href="/movies">
            <Button variant="primary">영화 목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  // 배경 이미지 URL
  const backdropUrl = getImageUrl(movie.backdrop_path, "original");
  const posterUrl = getImageUrl(movie.poster_path, "w500");

  return (
    <div className="min-h-screen netflix-bg-gray-dark">
      {/* 히어로 섹션 */}
      <section className="relative min-h-[80vh] lg:h-screen">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        {/* 컨텐츠 */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-3 sm:px-4 md:px-6	">
            <div className="max-w-4xl">
              {/* 뒤로가기 버튼 */}
              <div className="mb-6">
                <Link
                  href="/movies"
                  className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  영화 목록으로 돌아가기
                </Link>
              </div>

              {/* 영화 정보 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 포스터 */}
                <div className="lg:col-span-1">
                  <div className="relative aspect-[2/3] w-44 xs:w-52 sm:w-60 md:w-72 lg:w-auto mx-auto lg:mx-0">
                    <Image
                      src={posterUrl}
                      alt={movie.title}
                      fill
                      className="object-cover rounded-lg shadow-2xl"
                    />
                  </div>
                </div>

                {/* 상세 정보 */}
                <div className="lg:col-span-2 space-y-6">
                  {/* 제목 및 기본 정보 */}
                  <div>
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                      {movie.title}
                    </h1>
                    {movie.original_title !== movie.title && (
                      <p className="text-xl text-netflix-gray-light mb-4">
                        {movie.original_title}
                      </p>
                    )}

                    {/* 메타 정보 */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-netflix-gray-light mb-6">
                      {movie.release_date && (
                        <span className="flex items-center">
                          📅 {getYear(movie.release_date)}
                        </span>
                      )}
                      {movie.runtime && (
                        <span className="flex items-center">
                          ⏱️ {formatRuntime(movie.runtime)}
                        </span>
                      )}
                      {movie.vote_average > 0 && (
                        <span className="flex items-center">
                          ⭐ {formatRating(movie.vote_average)}
                        </span>
                      )}
                      {movie.adult && (
                        <span className="bg-red-600 px-2 py-1 rounded text-xs">
                          19+
                        </span>
                      )}
                    </div>

                    {/* 장르 */}
                    {movie.genres && movie.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {movie.genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="px-3 py-1 bg-netflix-gray/30 rounded-full text-sm text-white"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 개요 */}
                  {movie.overview && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        줄거리
                      </h3>
                      <p className="text-xs xs:text-sm sm:text-base text-netflix-gray-light leading-relaxed">
                        {movie.overview}
                      </p>
                    </div>
                  )}

                  {/* 액션 버튼들 */}
                  <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                    {/* 재생 버튼 - 예고편 모달 연동 */}
                    {trailersLoading ? (
                      <Button variant="primary" size="lg" disabled>
                        <span className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full mr-2"></span>
                        예고편 로딩 중...
                      </Button>
                    ) : (
                      <button
                        onClick={handlePlayClick}
                        className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2 font-medium"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        {hasTrailers ? "예고편 재생" : "예고편 재생 (없음)"}
                      </button>
                    )}

                    <WatchlistButton
                      item={movie}
                      type="movie"
                      size="lg"
                      showLabel={true}
                    />

                    {/* 추가 예고편 버튼 (기존 방식) */}
                    <TrailerButton
                      video={mainTrailer}
                      title={movie.title}
                      variant="secondary"
                    >
                      🎬 더 많은 예고편
                    </TrailerButton>
                  </div>

                  {/* 추가 정보 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-netflix-gray/20">
                    {/* 제작 정보 */}
                    <div className="space-y-3">
                      {movie.production_companies &&
                        movie.production_companies.length > 0 && (
                          <div>
                            <h4 className="text-white font-medium mb-2">
                              제작사
                            </h4>
                            <p className="text-netflix-gray-light text-sm">
                              {movie.production_companies
                                .map((company) => company.name)
                                .join(", ")}
                            </p>
                          </div>
                        )}
                      {movie.production_countries &&
                        movie.production_countries.length > 0 && (
                          <div>
                            <h4 className="text-white font-medium mb-2">
                              제작 국가
                            </h4>
                            <p className="text-netflix-gray-light text-sm">
                              {movie.production_countries
                                .map((country) => country.name)
                                .join(", ")}
                            </p>
                          </div>
                        )}
                    </div>

                    {/* 언어 정보 */}
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium mb-2">원어</h4>
                        <p className="text-netflix-gray-light text-sm">
                          {movie.original_language?.toUpperCase() ||
                            "정보 없음"}
                        </p>
                      </div>
                      {(movie.budget ?? 0) > 0 && (
                        <div>
                          <h4 className="text-white font-medium mb-2">
                            제작비
                          </h4>
                          <p className="text-netflix-gray-light text-sm">
                            ${movie.budget?.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 비슷한 영화 섹션 */}
      {similarMovies?.results && similarMovies.results.length > 0 && (
        <section className="py-16">
          <MovieSliderGroup className="px-4">
            <MovieSlider
              title="비슷한 영화"
              movies={similarMovies.results}
              onMovieClick={handleMovieClick}
              showSeeAll={false}
            />
          </MovieSliderGroup>
        </section>
      )}

      {/* 비디오 모달 */}
      <VideoModal
        video={mainTrailer}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={movie.title}
      />
    </div>
  );
}
