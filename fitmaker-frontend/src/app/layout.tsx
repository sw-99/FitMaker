// app/layout.tsx
import './globals.css';
import { ReactQueryClientProvider } from '@/providers/ReactQueryClientProvider';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ko">
        <body>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </body>
        </html>
    );
}
