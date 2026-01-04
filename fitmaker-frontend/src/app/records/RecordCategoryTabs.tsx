"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function RecordCategoryTabs() {
    const pathname = usePathname();

    const tabs = [
        { name: "신체", href: "/records/body" },
        { name: "식단", href: "/records/meal" },
        { name: "운동", href: "/records/workout" },
    ];

    return (
        <div className="w-full border-b bg-white">
            <div className="max-w-5xl mx-auto px-4 py-3 overflow-x-auto">
                <div className="flex items-center space-x-2">
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
                                        : "text-gray-600 hover:bg-gray-100"
                                )}
                            >
                                {tab.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
