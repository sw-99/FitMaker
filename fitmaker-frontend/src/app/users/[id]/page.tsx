'use client';

import { UserSchema } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelectedUser } from '@/store/useSelectedUser';
import {z} from "zod";

interface Props {
    params: {
        id: string;
    };
}

export default function UserDetailPage({ params }: Props) {
    const router = useRouter();
    const [user, setUserState] = useState<z.infer<typeof UserSchema> | null>(null);
    const setUser = useSelectedUser((state) => state.setUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`, {
                cache: 'no-store',
            });

            if (!res.ok) {
                router.push('/users');
                return;
            }

            const json = await res.json();
            const result = UserSchema.safeParse(json);

            if (!result.success) {
                router.push('/users');
                return;
            }

            setUser(result.data); // ✅ Zustand에 저장
            setUserState(result.data);
            setLoading(false);
        };

        fetchUser();
    }, [params.id, router, setUser]);

    if (loading || !user) return <p className="p-6 text-gray-500">로딩 중...</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">사용자 상세</h1>
            <div className="space-y-2 border p-4 rounded-md mb-6">
                <div>
                    <span className="font-semibold">ID:</span> {user.id}
                </div>
                <div>
                    <span className="font-semibold">이름:</span> {user.name}
                </div>
                <div>
                    <span className="font-semibold">이메일:</span> {user.email}
                </div>
            </div>

            <button
                onClick={async () => {
                    const ok = confirm('정말 삭제하시겠습니까?');
                    if (!ok) return;

                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`, {
                        method: 'DELETE',
                    });

                    if (res.ok) {
                        router.push('/users');
                    } else {
                        alert('삭제 실패');
                    }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
                삭제하기
            </button>
        </div>
    );
}
