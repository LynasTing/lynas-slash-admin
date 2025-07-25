import { useUserStore } from './store';

export const useUserActions = () => useUserStore(state => state.actions);
