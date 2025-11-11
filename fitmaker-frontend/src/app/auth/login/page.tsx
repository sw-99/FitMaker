// app/(auth)/login/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --- API endpoint 설정 -------------------------------------------------
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const LOGIN_ENDPOINT = API_BASE ? `${API_BASE}/auth/login` : "/api/auth/login";
const OAUTH_GOOGLE = API_BASE ? `${API_BASE}/auth/oauth/google` : "/api/auth/oauth/google";
const OAUTH_KAKAO  = API_BASE ? `${API_BASE}/auth/oauth/kakao`  : "/api/auth/oauth/kakao";

// --- Validation schema (Zod v4) ---------------------------------------
const LoginSchema = z.object({
    email: z.string().min(1, "이메일을 입력해 주세요.").email("유효한 이메일 형식이 아니에요."),
    password: z.string().min(1, "비밀번호를 입력해 주세요."),
    remember: z.boolean().optional(),
});
type LoginFormValues = z.infer<typeof LoginSchema>;

type LoginResponse = {
    ok?: boolean;
    message?: string;
    // 필요 시 토큰/유저정보 등 추가
};

async function loginRequest(payload: LoginFormValues): Promise<LoginResponse> {
    const res = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // httpOnly 쿠키 세션 발급 시
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        let msg = "로그인에 실패했어요. 다시 시도해 주세요.";
        try {
            const data = (await res.json()) as Partial<LoginResponse>;
            if (data?.message) msg = data.message;
        } catch {}
        throw new Error(msg);
    }
    return res.json();
}

export default function LoginPage() {
    const router = useRouter();
    const sp = useSearchParams();
    const callbackUrl = sp.get("callbackUrl") ?? "/mypage";

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { remember: true },
        mode: "onSubmit",
    });

    const mutation = useMutation<LoginResponse, Error, LoginFormValues>({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            if (data?.ok === false) {
                setError("password", { type: "server", message: data.message ?? "로그인 실패" });
                return;
            }
            router.replace(callbackUrl);
        },
        onError: (err) => {
            setError("password", { type: "server", message: err.message });
        },
    });

    const onSubmit = (values: LoginFormValues) => {
        mutation.mutate(values);
    };

    return (
        <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-screen-sm items-center px-4">
            <div className="w-full">
                {/* Title */}
                <h1 className="mb-2 text-2xl font-bold text-gray-900">로그인</h1>
                <p className="mb-8 text-sm text-gray-600">
                    계정에 로그인하고 기록, 피드백, 대시보드를 이용해 보세요.
                </p>

                {/* Card */}
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    {/* OAuth (세로 배치) */}
                    <div className="mb-6 grid grid-cols-1 gap-3">
                        <button
                            type="button"
                            onClick={() => (window.location.href = OAUTH_GOOGLE)}
                            className="inline-flex w-full items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Google로 계속
                        </button>
                        <button
                            type="button"
                            onClick={() => (window.location.href = OAUTH_KAKAO)}
                            className="inline-flex w-full items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Kakao로 계속
                        </button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">또는 이메일로 로그인</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-800">
                                이메일
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                {...register("email")}
                                className="block w-full rounded-lg border px-3 py-2 text-sm outline-none ring-sky-500 focus:ring-2"
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && (
                                <p role="alert" className="mt-1 text-xs text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-800">
                                    비밀번호
                                </label>
                                <Link href="/forgot-password" className="text-xs font-medium text-sky-700 hover:underline">
                                    비밀번호 찾기
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                {...register("password")}
                                className="block w-full rounded-lg border px-3 py-2 text-sm outline-none ring-sky-500 focus:ring-2"
                                aria-invalid={!!errors.password}
                            />
                            {errors.password && (
                                <p role="alert" className="mt-1 text-xs text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Remember me */}
                        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className="h-4 w-4" {...register("remember")} />
                            로그인 상태 유지
                        </label>

                        {/* 서버 에러 (password 필드에 바인딩) */}
                        {mutation.isError && !errors.password && (
                            <p role="alert" className="text-sm text-red-600">{mutation.error.message}</p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {mutation.isPending ? "로그인 중..." : "로그인"}
                        </button>
                    </form>
                </div>

                {/* Footer links */}
                <p className="mt-6 text-center text-sm text-gray-700">
                    아직 계정이 없나요?{" "}
                    <Link href="/signup" className="font-medium text-sky-700 hover:underline">
                        회원가입
                    </Link>
                </p>
            </div>
        </main>
    );
}
