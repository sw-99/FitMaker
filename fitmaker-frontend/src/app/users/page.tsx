// app/users/page.tsx
'use client';

import { useUsers } from '@/hooks/useUsers';

export default function UsersPage() {
    const { data, isLoading, error } = useUsers();

    if (isLoading) return <p className="text-gray-500">로딩 중...</p>;
    if (error) return <p className="text-red-500">에러 발생: {error.message}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">사용자 목록</h1>
            <ul className="space-y-2">
                {data?.map(user => (
                    <li key={user.id} className="border p-4 rounded-md">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
