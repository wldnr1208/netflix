// src/components/layout/Header.tsx
// Netflix 스타일 헤더 컴포넌트

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/Logo";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import BellIcon from "@/components/ui/icons/BellIcon";
import MenuIcon from "@/components/ui/icons/MenuIcon";
import XIcon from "@/components/ui/icons/XIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";
import Button from "../ui/Button/Button";

// 현재 Header에서만 사용하는 타입 (나중에 types/index.ts로 이동 예정)
interface HeaderProps {
  // user?: User; // User 타입 아직 정의 안됨
  onSearch?: (query: string) => void;
  transparent?: boolean;
}

/**
 * Netflix 스타일 헤더 컴포넌트
 *
 * 기능:
 * - 스크롤에 따른 배경 투명도 변경
 * - 반응형 네비게이션 메뉴
 * - 검색 기능
 * - 사용자 프로필 드롭다운
 */
export default function Header({
  // user, // User 타입 정의되면 주석 해제
  onSearch,
  transparent = false,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 검색 처리
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  // 네비게이션 메뉴 항목
  const navigationItems = [
    { name: "홈", href: "/" },
    { name: "TV 프로그램", href: "/tv" },
    { name: "영화", href: "/movies" },
    { name: "최신", href: "/latest" },
    { name: "내가 찜한 콘텐츠", href: "/my-list" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // 배경 스타일
        isScrolled || !transparent
          ? "netflix-bg-gray-dark/95 backdrop-blur-md shadow-lg"
          : "bg-transparent",
        "border-b border-white/10"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* 로고 */}
          <div className="flex items-center space-x-8">
            <Logo size="sm" />

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden lg:flex space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    "hover:text-netflix-red text-white/80 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* 우측 메뉴 */}
          <div className="flex items-center space-x-4">
            {/* 검색 */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="제목, 사람, 장르"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "bg-black/50 border border-white/30 rounded px-4 py-2 text-white text-sm",
                      "focus:outline-none focus:border-white/60 focus:bg-black/70",
                      "w-64 transition-all duration-200"
                    )}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 p-2 text-white/60 hover:text-white"
                  >
                    <XIcon />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-white/60 hover:text-white transition-colors duration-200"
                  aria-label="검색 열기"
                >
                  <SearchIcon />
                </button>
              )}
            </div>

            {/* 알림 */}
            <button
              className="p-2 text-white/60 hover:text-white transition-colors duration-200"
              aria-label="알림"
            >
              <BellIcon />
            </button>

            {/* 사용자 프로필 */}
            {/* user가 정의되면 활성화 예정 */}
            {false ? ( // user ? ( 로 나중에 변경
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded hover:bg-white/10 transition-colors duration-200">
                  <div className="w-8 h-8 bg-netflix-red rounded flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      U {/* {user.name.charAt(0).toUpperCase()} */}
                    </span>
                  </div>
                  <ChevronDownIcon />
                </button>
              </div>
            ) : (
              <Button variant="primary" size="sm">
                로그인
              </Button>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white"
              aria-label="메뉴 토글"
            >
              {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* 모바일 네비게이션 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 animate-slide-up">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white py-2 px-4 rounded hover:bg-white/10 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
