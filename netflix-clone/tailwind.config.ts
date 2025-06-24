import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Netflix 브랜드 컬러
        netflix: {
          red: "#E50914",
          "red-dark": "#B20710",
          black: "#000000",
          "gray-dark": "#141414",
          "gray-medium": "#2F2F2F",
          "gray-light": "#B3B3B3",
          white: "#FFFFFF",
        },
        // 배경 그라데이션용 컬러
        background: {
          "gradient-start": "#000000",
          "gradient-end": "#141414",
          card: "rgba(0, 0, 0, 0.75)",
          modal: "rgba(0, 0, 0, 0.9)",
        },
      },
      fontFamily: {
        // Netflix에서 사용하는 폰트
        sans: ["Helvetica Neue", "Segoe UI", "Roboto", "Ubuntu", "sans-serif"],
      },
      spacing: {
        // Netflix 스타일 간격
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      screens: {
        // Netflix 반응형 브레이크포인트
        xs: "475px",
        "3xl": "1920px",
      },
      animation: {
        // Netflix 스타일 애니메이션
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      aspectRatio: {
        // 영화 포스터/카드 비율
        "2/3": "2 / 3",
        "16/9": "16 / 9",
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [
    // Tailwind CSS 공식 플러그인 API 사용 (완전한 타입 안정성)
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        // Netflix 스타일 그라데이션 유틸리티 추가
        ".bg-netflix-gradient": {
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)",
        },
        ".bg-hero-gradient": {
          background:
            "linear-gradient(77deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 85%)",
        },
      });
    }),
  ],
};

export default config;
