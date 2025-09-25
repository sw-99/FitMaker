// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainLayout } from "@/components/layout/MainLayout";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FitMaker",
    description: "Next.js App with TailwindCSS",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
        <body className={`${inter.className} antialiased bg-gray-50 min-h-screen`}>
        <ReactQueryClientProvider>
            <MainLayout>{children}</MainLayout>
        </ReactQueryClientProvider>
        </body>
        </html>
    );
}
