import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;

  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (userToken: UserToken) => void;
    clearUserData?: () => void;
  };
};

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      userInfo: {},
      userToken: {},
      actions: {
        setUserInfo: userInfo => {
          set({ userInfo });
        },
        setUserToken: userToken => {
          set({ userToken });
        }
      }
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({
        [StorageEnum.UserInfo]: state.userInfo,
        [StorageEnum.UserToken]: state.userToken
      })
    }
  )
);
