import Link from "next/link";

export function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r p-4 hidden md:block">
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600">
                            대시보드
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" className="block text-gray-700 hover:text-blue-600">
                            설정
                        </Link>
                    </li>
                    <li>
                        <Link href="/logout" className="block text-gray-700 hover:text-blue-600">
                            로그아웃
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
