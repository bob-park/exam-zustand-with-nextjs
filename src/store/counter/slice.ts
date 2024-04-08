import { create, SlicePattern } from 'zustand';
import { type BoundState } from '../rootStore';

export const createCounterSlice: SlicePattern<CounterState> = (set) => ({
  count: 0,
  increase: () =>
    set((state) => ({ count: state.count + 1 }), false, {
      type: 'counter/increase',
    }),
  decrease: () =>
    set((state) => ({ count: state.count - 1 }), false, {
      type: 'counter/decrease',
    }),
});
