// src/components/layout/MainLayout.tsx
"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gray-50">
                <div className="mx-auto w-full max-w-screen-lg p-4">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
