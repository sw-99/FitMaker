'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSelectedUser } from '@/store/useSelectedUser';

const UserFormSchema = z.object({
    name: z.string().min(1, '이름을 입력해주세요'),
    email: z.string().email('유효한 이메일을 입력해주세요'),
});

type UserFormData = z.infer<typeof UserFormSchema>;

export default function NewUserPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        resolver: zodResolver(UserFormSchema),
    });

    const router = useRouter();
    const clearUser = useSelectedUser((state) => state.clearUser); // Zustand 상태 초기화용

    const onSubmit = async (data: UserFormData) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error(`API Error: ${res.status}`);
            }

            clearUser(); // ✅ 등록 후 전역 상태 초기화
            router.push('/users'); // 등록 후 목록 페이지로 이동
        } catch (err) {
            console.error(err);
            alert('등록에 실패했습니다.');
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">사용자 등록</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">이름</label>
                    <input
                        {...register('name')}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="홍길동"
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
                        placeholder="example@example.com"
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
                    {isSubmitting ? '등록 중...' : '등록하기'}
                </button>
            </form>
        </div>
    );
}
