// store/useSelectedUser.ts
import { create } from 'zustand';
import { User } from '@/types/user';

interface SelectedUserState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const useSelectedUser = create<SelectedUserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
