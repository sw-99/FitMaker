'use client';

import { useUsers } from '@/hooks/useUsers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelectedUser } from '@/store/useSelectedUser';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UsersPage() {
    const { data, isLoading, error } = useUsers();
    const queryClient = useQueryClient();
    const router = useRouter();
    const setUser = useSelectedUser((state) => state.setUser);

    const deleteUser = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('삭제 실패');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const handleDelete = (id: number) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            deleteUser.mutate(id);
        }
    };

    if (isLoading) return <p className="text-gray-500">로딩 중...</p>;
    if (error) return <p className="text-red-500">에러 발생: {error.message}</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">사용자 목록</h1>
                <Link
                    href="/users/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + 사용자 등록
                </Link>
            </div>

            <ul className="space-y-4">
                {data?.map((user) => (
                    <li
                        key={user.id}
                        className="border p-4 rounded-md flex justify-between items-center"
                    >
                        <div>
                            <Link
                                href={`/users/${user.id}`}
                                onClick={() => setUser(user)} // ✅ Zustand 전역 저장
                            >
                                <p className="font-medium hover:underline">{user.name}</p>
                            </Link>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Link
                                href={`/users/edit/${user.id}`}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                수정
                            </Link>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="text-red-600 hover:underline text-sm"
                            >
                                삭제
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
