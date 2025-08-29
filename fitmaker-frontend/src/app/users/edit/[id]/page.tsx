'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from '@/types/user';
import { useSelectedUser } from '@/store/useSelectedUser';

const EditUserSchema = UserSchema.pick({
    name: true,
    email: true,
});

type EditUserForm = z.infer<typeof EditUserSchema>;

interface Props {
    params: {
        id: string;
    };
}

export default function EditUserPage({ params }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const setUser = useSelectedUser((state) => state.setUser); // Zustand 업데이트용

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<EditUserForm>({
        resolver: zodResolver(EditUserSchema),
    });

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`);
            if (!res.ok) {
                alert('사용자 정보를 불러올 수 없습니다.');
                router.push('/users');
                return;
            }

            const json = await res.json();
            const result = UserSchema.safeParse(json);
            if (!result.success) {
                alert('잘못된 사용자 데이터입니다.');
                router.push('/users');
                return;
            }

            reset(result.data); // React Hook Form 초기값
            setUser(result.data); // ✅ Zustand 상태 업데이트
            setLoading(false);
        };

        fetchUser();
    }, [params.id, reset, router, setUser]);

    const onSubmit = async (data: EditUserForm) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error('수정 실패');
            }

            setUser({ ...data, id: Number(params.id) }); // ✅ 수정 후 상태 저장
            router.push(`/users/${params.id}`);
        } catch (err) {
            alert('사용자 수정에 실패했습니다.');
            console.error(err);
        }
    };

    if (loading) return <p className="p-6 text-gray-500">로딩 중...</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">사용자 수정</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">이름</label>
                    <input
                        {...register('name')}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">이메일</label>
                    <input
                        {...register('email')}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    {isSubmitting ? '저장 중...' : '저장하기'}
                </button>
            </form>
        </div>
    );
}
