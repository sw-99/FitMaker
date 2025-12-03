// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn"; // (없으면 fallback 유틸 사용)

const NAV_ITEMS = [
    { href: "/records/body", label: "기록" },
    { href: "/chat", label: "채팅" },
    { href: "/feedback", label: "피드백" },
    { href: "/dashboard", label: "대시보드" },
];

export function Header() {
    const pathname = usePathname();

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + "/");

    return (
        <header className="sticky top-0 z-40 w-full border-b-2 border-sky-500 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="mx-auto grid h-16 max-w-screen-2xl grid-cols-3 items-center px-4 sm:px-6">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" aria-label="홈으로">
                        <div className="flex items-center gap-2">
                            <LogoIcon className="h-7 w-7 text-gray-800" />
                            <span className="hidden text-lg font-semibold sm:inline">FitMaker</span>
                        </div>
                    </Link>
                </div>

                {/* Center: Nav */}
                <nav className="hidden justify-center md:flex">
                    <ul className="flex items-center gap-6">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium text-gray-700 transition-colors hover:text-sky-700",
                                        isActive(item.href) && "text-sky-700 underline underline-offset-8 decoration-2"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right: Auth + My Page */}
                <div className="flex items-center justify-end gap-2 sm:gap-3">
                    {/* 로그인 */}
                    <Link
                        href="/auth/login" // 필요시 /auth/login 등으로 변경
                        aria-label="로그인"
                        className={cn(
                            "inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50",
                            isActive("/login") && "ring-2 ring-sky-500 ring-offset-1"
                        )}
                    >
                        <span className="hidden sm:inline">로그인</span>
                        <span className="sm:hidden">Login</span>
                    </Link>

                    {/* 회원가입 */}
                    <Link
                        href="/signup" // 필요시 /auth/signup 등으로 변경
                        aria-label="회원가입"
                        className={cn(
                            "inline-flex items-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-sky-700",
                            isActive("/signup") && "ring-2 ring-sky-500 ring-offset-1"
                        )}
                    >
                        <span className="hidden sm:inline">회원가입</span>
                        <span className="sm:hidden">Sign up</span>
                    </Link>

                    {/* 마이페이지 */}
                    <Link
                        href="/mypage"
                        className={cn(
                            "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50",
                            isActive("/mypage") && "ring-2 ring-sky-500 ring-offset-1"
                        )}
                        aria-label="마이페이지"
                    >
                        <UserIcon className="h-5 w-5" />
                        <span className="hidden sm:inline">마이페이지</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

/* ---- Icons ---- */

function LogoIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
            <path d="M12 2a7 7 0 0 1 7 7v1h1a2 2 0 1 1 0 4h-1v1a7 7 0 1 1-14 0v-1H4a2 2 0 1 1 0-4h1V9a7 7 0 0 1 7-7zm0 2a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V9a5 5 0 0 0-5-5z" />
        </svg>
    );
}

function UserIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
        </svg>
    );
}
