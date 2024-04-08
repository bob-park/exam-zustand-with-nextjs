import { createStore } from 'zustand-x';

const initState: UserState = {};

export const useUserStore = createStore('user')(initState, {
  immer: {
    enabledAutoFreeze: true,
  },
  devtools: {
    enabled: true,
  },
  persist: {
    enabled: true,
  },
}).extendActions((set, get, api) => ({
  updateMe: (user: User) => {
    set.state((draft) => {
      draft.me = user;
    });
  },
}));
