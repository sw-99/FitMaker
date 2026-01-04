"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function BodySubTabs() {
    const pathname = usePathname();

    const tabs = [
        { name: "정보 입력", href: "/records/body/info" },
        { name: "이미지 업로드", href: "/records/body/image" },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 mb-6">
            <div className="flex space-x-2 overflow-x-auto">
                {tabs.map((tab) => {
                    const isActive = pathname.startsWith(tab.href);

                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={clsx(
                                "px-4 py-2 text-sm rounded-full transition-all whitespace-nowrap",
                                isActive
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                            )}
                        >
                            {tab.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
