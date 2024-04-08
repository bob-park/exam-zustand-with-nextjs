import { create, SlicePattern } from 'zustand';
import { type BoundState } from '../rootStore';

export const createUserSlice: SlicePattern<UserState> = (set) => ({
  me: {
    id: 1,
    userId: 'hwpark',
    name: 'Bob Park',
  },
  updateMe: (user: User) => set((state) => ({ me: user })),
});
