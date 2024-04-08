import { mapValuesKey } from 'zustand-x';
import { useCounterStore } from './counter/slice';
import { useUserStore } from './user/slice';

export const rootStore = {
  counter: useCounterStore,
  user: useUserStore,
};

export const useStore = () => mapValuesKey('use', rootStore);

export const store = mapValuesKey('get', rootStore);
export const actions = mapValuesKey('set', rootStore);
