import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StorageEnum } from '#/enum';
import type { AuthLoginResponse, AuthBootstrapStatus } from '#/auth';
import type { CurrentUser } from '#/system/user';

type UserStore = {
  userInfo: CurrentUser;
  userToken: AuthLoginResponse['accessToken'];
  authBootstrapStatus: AuthBootstrapStatus;
  actions: {
    setUserInfo: (userInfo: CurrentUser) => void;
    setUserToken: (userToken: AuthLoginResponse['accessToken']) => void;
    clearUserInfoAndToken: () => void;
    setAuthBootstrapStatus: (s: AuthBootstrapStatus) => void;
  };
};

const emptyUserInfo: CurrentUser = {
  userId: 0,
  username: '',
  nickname: null,
  email: null,
  phone: null,
  avatar: null,
  roles: [],
  permissions: [],
  menu: []
};

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      userInfo: emptyUserInfo,
      userToken: '',
      authBootstrapStatus: 'idle',
      actions: {
        setUserInfo: userInfo => set({ userInfo }),
        setUserToken: userToken => set({ userToken }),
        clearUserInfoAndToken: () => {
          set({ userInfo: emptyUserInfo, userToken: '' });
        },
        setAuthBootstrapStatus: (s: AuthBootstrapStatus) => set({ authBootstrapStatus: s })
      }
    }),
    {
      name: StorageEnum.User,
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        [StorageEnum.UserInfo]: state.userInfo,
        [StorageEnum.UserToken]: state.userToken
      })
    }
  )
);

export const useUserToken = () => useUserStore(s => s.userToken);
export const useUserActions = () => useUserStore(s => s.actions);
export const useUserInfo = () => useUserStore(s => s.userInfo);
export const setUserInfo = (s: CurrentUser) => {
  useUserStore.getState().actions.setUserInfo(s);
};

export const useUserPermissions = () => useUserStore(s => s.userInfo.permissions || []);
export const useUserMenus = () => useUserStore(s => s.userInfo.menu || []);

export const clearUserAuth = () => {
  useUserStore.getState().actions.clearUserInfoAndToken();
};

export const getUserToken = () => useUserStore.getState().userToken;
export const setUserToken = (s: AuthLoginResponse['accessToken']) => {
  useUserStore.getState().actions.setUserToken(s);
};

export const useAuthBootstrapStatus = () => useUserStore(s => s.authBootstrapStatus);
export const setAuthBootstrapStatus = (s: AuthBootstrapStatus) => {
  useUserStore.getState().actions.setAuthBootstrapStatus(s);
};
