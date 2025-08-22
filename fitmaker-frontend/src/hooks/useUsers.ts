// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { UsersResponseSchema, User } from '@/types/user';

export const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const data = await api('/users');
            return UsersResponseSchema.parse(data); // zod 유효성 검사
        },
    });
};
