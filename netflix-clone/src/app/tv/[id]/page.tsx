// src/app/tv/[id]/page.tsx
// TV 프로그램 상세 페이지 (실제 API 사용)
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTVShowDetails, useHomePageTVShows } from "@/hooks/useTVShows";
import { getImageUrl, formatRating, getYear } from "@/lib/utils";
import { TVShow } from "@/types";
import Button from "@/components/ui/Button";
import PlayButton from "@/components/ui/PlayButton";
import WatchlistButton from "@/components/ui/WatchlistButton";
import TVSlider from "@/components/ui/TVSlider";
import { MovieSliderGroup } from "@/components/ui/MovieSliderGroup";

export default function TVDetailPage() {
  const params = useParams();
  const router = useRouter();
  const showId = parseInt(params.id as string);

  // TV 프로그램 상세 정보 가져오기
  const { data: show, isLoading, error } = useTVShowDetails(showId);

  // 추천 TV 프로그램 가져오기
  const { popular: popularShows, topRated: topRatedShows } =
    useHomePageTVShows();

  // TV 프로그램 클릭 핸들러
  const handleTVClick = (clickedShow: TVShow) => {
    router.push(`/tv/${clickedShow.id}`);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen netflix-bg-gray-dark pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-netflix-red mx-auto mb-4"></div>
          <p className="text-white">TV 프로그램 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !show) {
    return (
      <div className="min-h-screen netflix-bg-gray-dark pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            TV 프로그램을 찾을 수 없습니다
          </h1>
          <p className="text-netflix-gray-light mb-6">
            요청하신 TV 프로그램이 존재하지 않거나 삭제되었습니다.
          </p>
          <Link href="/tv">
            <Button variant="primary">TV 목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  // 배경 이미지와 포스터 URL
  const backdropUrl = getImageUrl(show.backdrop_path, "original");
  const posterUrl = getImageUrl(show.poster_path, "w500");

  // TV 프로그램 제목 (name 또는 title 사용)
  const title = show.name || show.title || "제목 없음";

  return (
    <div className="min-h-screen netflix-bg-gray-dark">
      {/* 히어로 섹션 */}
      <section className="relative h-screen">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src={backdropUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        {/* 컨텐츠 */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl">
              {/* 뒤로가기 버튼 */}
              <div className="mb-6 pt-20">
                <button
                  onClick={() => router.back()}
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
                  뒤로가기
                </button>
              </div>

              {/* TV 프로그램 정보 */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* 포스터 */}
                <div className="lg:col-span-1">
                  <div className="relative aspect-[2/3] max-w-sm mx-auto lg:mx-0">
                    <Image
                      src={posterUrl}
                      alt={title}
                      fill
                      className="object-cover rounded-lg shadow-2xl"
                    />
                  </div>
                </div>

                {/* 상세 정보 */}
                <div className="lg:col-span-3 space-y-6">
                  {/* 제목 및 기본 정보 */}
                  <div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                      {title}
                    </h1>
                    {show.original_name !== title && (
                      <p className="text-xl text-white/70 mb-4">
                        {show.original_name}
                      </p>
                    )}

                    {/* 메타 정보 */}
                    <div className="flex flex-wrap items-center gap-6 text-white mb-6">
                      {show.adult && (
                        <span className="bg-red-600 px-2 py-1 rounded text-sm font-bold">
                          19+
                        </span>
                      )}
                      <span className="text-lg">
                        {getYear(show.first_air_date)}
                      </span>
                      {show.vote_average > 0 && (
                        <span className="flex items-center text-lg">
                          <svg
                            className="w-5 h-5 mr-1 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {formatRating(show.vote_average)}
                        </span>
                      )}
                      {show.number_of_seasons && (
                        <span className="text-lg">
                          {show.number_of_seasons}시즌
                        </span>
                      )}
                      {show.number_of_episodes && (
                        <span className="text-lg">
                          {show.number_of_episodes}화
                        </span>
                      )}
                    </div>

                    {/* 장르 */}
                    {show.genres && show.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {show.genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="px-3 py-1 bg-white/20 rounded-full text-sm text-white"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 줄거리 */}
                  {show.overview && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        줄거리
                      </h3>
                      <p className="text-white/90 leading-relaxed text-lg max-w-4xl">
                        {show.overview}
                      </p>
                    </div>
                  )}

                  {/* 액션 버튼들 */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <PlayButton
                      size="lg"
                      onPlay={() => alert(`${title} 재생 (개발 예정)`)}
                    />

                    <WatchlistButton
                      item={show}
                      type="tv"
                      size="lg"
                      showLabel={true}
                    />

                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => alert("에피소드 목록 (개발 예정)")}
                    >
                      📺 에피소드 목록
                    </Button>

                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => alert("예고편 재생 (개발 예정)")}
                    >
                      🎬 예고편
                    </Button>
                  </div>

                  {/* 추가 정보 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/20">
                    <div className="space-y-4">
                      {show.networks && show.networks.length > 0 && (
                        <div>
                          <h4 className="text-white font-medium mb-1">
                            방송사
                          </h4>
                          <p className="text-white/70 text-sm">
                            {show.networks
                              .map((network) => network.name)
                              .join(", ")}
                          </p>
                        </div>
                      )}
                      {show.production_companies &&
                        show.production_companies.length > 0 && (
                          <div>
                            <h4 className="text-white font-medium mb-1">
                              제작사
                            </h4>
                            <p className="text-white/70 text-sm">
                              {show.production_companies
                                .map((company) => company.name)
                                .join(", ")}
                            </p>
                          </div>
                        )}
                      {show.origin_country &&
                        show.origin_country.length > 0 && (
                          <div>
                            <h4 className="text-white font-medium mb-1">
                              제작 국가
                            </h4>
                            <p className="text-white/70 text-sm">
                              {show.origin_country.join(", ")}
                            </p>
                          </div>
                        )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-1">원어</h4>
                        <p className="text-white/70 text-sm">
                          {show.original_language?.toUpperCase() || "정보 없음"}
                        </p>
                      </div>
                      {show.status && (
                        <div>
                          <h4 className="text-white font-medium mb-1">상태</h4>
                          <p className="text-white/70 text-sm">{show.status}</p>
                        </div>
                      )}
                      {show.first_air_date && (
                        <div>
                          <h4 className="text-white font-medium mb-1">
                            첫 방영일
                          </h4>
                          <p className="text-white/70 text-sm">
                            {new Date(show.first_air_date).toLocaleDateString(
                              "ko-KR"
                            )}
                          </p>
                        </div>
                      )}
                      {show.last_air_date && (
                        <div>
                          <h4 className="text-white font-medium mb-1">
                            마지막 방영일
                          </h4>
                          <p className="text-white/70 text-sm">
                            {new Date(show.last_air_date).toLocaleDateString(
                              "ko-KR"
                            )}
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

      {/* 추천 TV 프로그램 섹션 */}
      {(popularShows?.data?.results && popularShows.data.results.length > 0) ||
      (topRatedShows?.data?.results &&
        topRatedShows.data.results.length > 0) ? (
        <section className="py-16">
          <MovieSliderGroup className="px-4">
            {popularShows?.data?.results &&
              popularShows.data.results.length > 0 && (
                <TVSlider
                  title="인기 TV 프로그램"
                  shows={popularShows.data.results.slice(0, 10)}
                  onShowClick={handleTVClick}
                  showSeeAll={false}
                />
              )}

            {topRatedShows?.data?.results &&
              topRatedShows.data.results.length > 0 && (
                <TVSlider
                  title="높은 평점 TV 프로그램"
                  shows={topRatedShows.data.results.slice(0, 10)}
                  onShowClick={handleTVClick}
                  showSeeAll={false}
                />
              )}
          </MovieSliderGroup>
        </section>
      ) : null}
    </div>
  );
}
