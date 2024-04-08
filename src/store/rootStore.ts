import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createCounterSlice } from './counter/slice';
import { createUserSlice } from './user/slice';

export const useStore = create<BoundState>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createCounterSlice(...a),
        ...createUserSlice(...a),
      })),
      { name: 'liveshorts-store' },
    ),
    { name: 'liveshorts-store' },
  ),
);

export type BoundState = UserState & CounterState;
