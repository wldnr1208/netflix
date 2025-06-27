// src/store/useWatchlistStore.ts
// 찜한 콘텐츠 관리를 위한 Zustand 스토어 (디버깅 강화)

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Movie, TVShow } from "@/types";

// 찜한 아이템 타입 (영화와 TV 프로그램 모두 지원)
export interface WatchlistItem {
  id: number;
  type: "movie" | "tv";
  title: string;
  name?: string; // TV 프로그램용
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string; // 영화용
  first_air_date?: string; // TV용
  genre_ids: number[];
  addedAt: string; // 추가된 시간
}

// 스토어 상태 타입
interface WatchlistState {
  // 상태
  watchlist: WatchlistItem[];

  // 액션
  addToWatchlist: (item: Movie | TVShow, type: "movie" | "tv") => void;
  removeFromWatchlist: (id: number, type: "movie" | "tv") => void;
  isInWatchlist: (id: number, type: "movie" | "tv") => boolean;
  clearWatchlist: () => void;
  getWatchlistByType: (type: "movie" | "tv") => WatchlistItem[];
  getWatchlistCount: () => number;
  getRecentlyAdded: (limit?: number) => WatchlistItem[];
}

/**
 * 찜한 콘텐츠 관리 스토어
 */
export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      watchlist: [],

      // 찜하기 추가
      addToWatchlist: (item: Movie | TVShow, type: "movie" | "tv") => {
        const { watchlist } = get();

        // 이미 찜한 콘텐츠인지 확인
        const exists = watchlist.some(
          (watchItem) => watchItem.id === item.id && watchItem.type === type
        );

        if (exists) {
          console.warn(
            "⚠️ 이미 찜한 콘텐츠:",
            item.title || (item as TVShow).name
          );
          return;
        }

        // 새로운 찜하기 아이템 생성
        const newWatchlistItem: WatchlistItem = {
          id: item.id,
          type,
          title: item.title || (item as TVShow).name || "",
          name: (item as TVShow).name,
          poster_path: item.poster_path,
          backdrop_path: item.backdrop_path,
          overview: item.overview,
          vote_average: item.vote_average,
          release_date: (item as Movie).release_date,
          first_air_date: (item as TVShow).first_air_date,
          genre_ids: item.genre_ids || [],
          addedAt: new Date().toISOString(),
        };

        const newWatchlist = [newWatchlistItem, ...watchlist];

        set({ watchlist: newWatchlist });
      },

      // 찜하기 제거
      removeFromWatchlist: (id: number, type: "movie" | "tv") => {
        const { watchlist } = get();

        const updatedWatchlist = watchlist.filter(
          (item) => !(item.id === id && item.type === type)
        );

        set({ watchlist: updatedWatchlist });
      },

      // 찜하기 여부 확인
      isInWatchlist: (id: number, type: "movie" | "tv") => {
        const { watchlist } = get();
        const exists = watchlist.some(
          (item) => item.id === id && item.type === type
        );

        return exists;
      },

      // 전체 찜하기 목록 초기화
      clearWatchlist: () => {
        set({ watchlist: [] });
      },

      // 타입별 찜하기 목록 조회
      getWatchlistByType: (type: "movie" | "tv") => {
        const { watchlist } = get();
        const filtered = watchlist.filter((item) => item.type === type);
        return filtered;
      },

      // 찜하기 총 개수
      getWatchlistCount: () => {
        const { watchlist } = get();
        return watchlist.length;
      },

      // 최근 추가된 찜하기 목록
      getRecentlyAdded: (limit: number = 10) => {
        const { watchlist } = get();
        return watchlist.slice(0, limit);
      },
    }),
    {
      name: "netflix-watchlist", // 로컬 스토리지 키
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ watchlist: state.watchlist }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("❌ 찜하기 데이터 복원 실패:", error);
          } else {
            console.log(
              "✅ 찜하기 데이터 복원 완료:",
              state?.watchlist?.length || 0,
              "개"
            );
          }
        };
      },
    }
  )
);

// 편의 훅들
export const useWatchlist = () => {
  const store = useWatchlistStore();
  return {
    items: store.watchlist,
    add: store.addToWatchlist,
    remove: store.removeFromWatchlist,
    isInWatchlist: store.isInWatchlist,
    clear: store.clearWatchlist,
    count: store.getWatchlistCount(),
    recent: store.getRecentlyAdded(),
    movies: store.getWatchlistByType("movie"),
    tvShows: store.getWatchlistByType("tv"),
  };
};

// 특정 아이템의 찜하기 상태와 토글 기능을 제공하는 훅 (개선된 버전)
export const useWatchlistItem = (id: number, type: "movie" | "tv") => {
  const store = useWatchlistStore();

  return {
    isWatchlisted: store.isInWatchlist(id, type),
    toggle: (item: Movie | TVShow) => {
      if (store.isInWatchlist(id, type)) {
        store.removeFromWatchlist(id, type);
      } else {
        store.addToWatchlist(item, type);
      }
    },
  };
};
