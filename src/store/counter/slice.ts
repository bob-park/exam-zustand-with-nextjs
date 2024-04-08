import { createStore } from 'zustand-x';
import { devtools } from 'zustand/middleware';

export const useCounterStore = createStore('counter')(
  {
    count: 0,
  },
  {
    immer: {
      enabledAutoFreeze: true,
    },
    devtools: {
      enabled: true,
    },
    persist: {
      enabled: true,
    },
  },
).extendActions((set, get, api) => ({
  increase: () => {
    set.count(get.count() + 1);
  },
  decrease: () => {
    set.count(get.count() - 1);
  },
}));
