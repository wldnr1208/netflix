"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getImageUrl, formatRating, getYear, getGenreNames } from "@/lib/utils";
import { MovieCardProps } from "@/types";
import PlusIcon from "./icons/PlusIcon";

export default function MovieCard({
  movie,
  size = "md",
  showTitle = true,
  showOverview = false,
  onPlay,
  onAddToWatchlist,
  className,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: {
      container: "w-32 sm:w-40",
      image: "h-48 sm:h-60",
      hoverScale: "hover:scale-110",
    },
    md: {
      container: "w-40 sm:w-48 md:w-56",
      image: "h-60 sm:h-72 md:h-84",
      hoverScale: "hover:scale-105",
    },
    lg: {
      container: "w-48 sm:w-56 md:w-64 lg:w-72",
      image: "h-72 sm:h-84 md:h-96 lg:h-108",
      hoverScale: "hover:scale-105",
    },
  };

  const currentSize = sizeClasses[size];
  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const genreNames = getGenreNames(movie.genre_ids);
  const year = getYear(movie.release_date);

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-300 ease-out select-none pointer-events-none", // 중요!
        currentSize.container,
        currentSize.hoverScale,
        "hover:z-20",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-sm netflix-card">
        <div className={cn("relative", currentSize.image)}>
          {!imageError ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              draggable={false}
              className={cn(
                "object-cover transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 288px"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-netflix-gray flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-xs text-netflix-gray-light">이미지 없음</p>
              </div>
            </div>
          )}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-netflix-gray animate-pulse" />
          )}

          {movie.vote_average > 0 && (
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded px-2 py-1">
              <span className="text-xs font-medium text-white">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>
          )}

          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          )}
        </div>

        {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onPlay?.(movie)}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 pointer-events-auto"
                >
                  <svg
                    className="w-4 h-4 text-black ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 5v10l8-5z" />
                  </svg>
                </button>
                <button
                  onClick={() => onAddToWatchlist?.(movie)}
                  className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center hover:border-gray-300 transition-colors duration-200 pointer-events-auto"
                >
                  <PlusIcon className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center hover:border-gray-300 transition-colors duration-200 pointer-events-auto">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {movie.vote_average > 0 && (
                <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                  {formatRating(movie.vote_average)}
                </div>
              )}
            </div>

            <div className="space-y-2 pointer-events-none">
              {showTitle && (
                <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                  {movie.title}
                </h3>
              )}
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                {year && <span>{year}</span>}
                {genreNames.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{genreNames.slice(0, 2).join(", ")}</span>
                  </>
                )}
              </div>
              {showOverview && movie.overview && (
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                  {movie.overview}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {!isHovered && showTitle && (
        <div className="mt-2 px-1 pointer-events-none">
          <h3 className="text-sm font-medium text-white line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          {year && (
            <p className="text-xs text-netflix-gray-light mt-1">{year}</p>
          )}
        </div>
      )}
    </div>
  );
}
