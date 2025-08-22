// app/page.tsx
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Next.js + Spring Boot 연동 테스트</h1>
        <p className="mb-2">사용자 목록을 확인하려면 아래 링크를 클릭하세요:</p>
        <Link
            href="/users"
            className="text-blue-600 hover:underline font-medium"
        >
          → 사용자 목록 보기
        </Link>
      </main>
  );
}
