// src/app/movies/page.tsx
import MoviesPage from "@/components/templates/MoviesPage";

export const metadata = {
  title: "영화 - Netflix Clone",
  description: "최신 영화부터 클래식까지, 다양한 장르의 영화를 만나보세요",
};

export default function MoviesPageContainer() {
  return <MoviesPage />;
}
