// src/types/next-auth.d.ts
// NextAuth.js 타입 확장

import "next-auth";
import "next-auth/jwt";

/**
 * NextAuth의 기본 타입을 확장하여
 * 우리 프로젝트에 필요한 필드들을 추가합니다.
 */

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      provider: string; // 로그인 제공자 (google, github, credentials)
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    provider: string;
  }
}
