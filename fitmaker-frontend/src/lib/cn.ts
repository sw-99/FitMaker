// src/lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스 병합 유틸
 * - clsx로 조건부 클래스 지원
 * - twMerge로 중복/충돌 난 클래스 자동 정리
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
