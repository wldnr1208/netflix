// src/lib/auth.ts
// NextAuth.js 설정 파일

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateEmail } from "@/lib/utils";

/**
 * NextAuth 설정
 *
 * 지원하는 로그인 방식:
 * 1. Google OAuth
 * 2. 이메일/비밀번호 (Credentials)
 */
export const authOptions: NextAuthOptions = {
  // 로그인 제공자 설정
  providers: [
    // Google OAuth 설정
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // 이메일/비밀번호 로그인 (개발용)
    CredentialsProvider({
      id: "credentials",
      name: "Email and Password",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
          placeholder: "example@netflix.com",
        },
        password: {
          label: "비밀번호",
          type: "password",
        },
      },
      async authorize(credentials) {
        // 실제 프로덕션에서는 데이터베이스에서 사용자 확인
        // 현재는 데모용 하드코딩
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 이메일 유효성 검사
        if (!validateEmail(credentials.email)) {
          return null;
        }

        // 데모용 테스트 계정
        const testUsers = [
          {
            id: "1",
            email: "test@netflix.com",
            password: "password123",
            name: "Netflix 테스트 사용자",
            image: undefined,
          },
          {
            id: "2",
            email: "demo@netflix.com",
            password: "demo123",
            name: "Netflix 데모 사용자",
            image: undefined,
          },
        ];

        const user = testUsers.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }

        // 로그인 실패 시 null 반환
        return null;
      },
    }),
  ],

  // 커스텀 페이지 설정
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  // 세션 설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },

  // JWT 설정
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30일
  },

  // 콜백 함수들
  callbacks: {
    // JWT 토큰 생성/수정 시 호출
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider || "credentials";
      }
      return token;
    },

    // 세션 생성 시 호출 (클라이언트에서 사용할 세션 데이터)
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },

    // 로그인 허용 여부 결정
    async signIn() {
      // 모든 로그인 허용 (실제 서비스에서는 추가 검증 로직 필요)
      return true;
    },

    // 리다이렉트 URL 처리
    async redirect({ url, baseUrl }) {
      // 상대 경로면 baseUrl과 결합
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // 같은 도메인이면 허용
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      // 기본적으로 홈페이지로 리다이렉트
      return baseUrl;
    },
  },

  // 이벤트 핸들러
  events: {
    async signIn({ user, account }) {
      console.log(`사용자 로그인: ${user.email} (${account?.provider})`);
    },
    async signOut({ session }) {
      console.log(`사용자 로그아웃: ${session?.user?.email}`);
    },
  },

  // 디버그 모드 (개발 환경에서만)
  debug: process.env.NODE_ENV === "development",
};
