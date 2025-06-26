// src/app/watchlist/page.tsx
// 찜한 콘텐츠 목록 페이지

import WatchlistPage from "@/components/templates/WatchlistPage";

export const metadata = {
  title: "내가 찜한 콘텐츠 | Netflix 클론",
  description: "찜한 영화와 TV 프로그램을 모아보세요",
};

export default function Watchlist() {
  return <WatchlistPage />;
}
