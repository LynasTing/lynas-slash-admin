import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';
import { useMutation } from '@tanstack/react-query';
import { signinApi, type SignInRequest } from '@/api/services/auth';
import { toast } from 'sonner';

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: Partial<UserInfo>) => void;
    setUserToken: (userToken: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      userInfo: {},
      userToken: {},
      actions: {
        setUserInfo: userInfo => set({ userInfo }),
        setUserToken: userToken => set({ userToken }),
        clearUserInfoAndToken: () => {
          set({ userInfo: {}, userToken: {} });
        }
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
export const useUserPermissions = () => useUserStore(s => s.userInfo.permissions || []);

export const useSignIn = () => {
  const { setUserToken, setUserInfo } = useUserActions();

  /**
   * useMutation 专门用来做 会改变服务器状态的操作（POST / PUT / DELETE…）
   * - 它不会缓存数据（不像 useQuery 会缓存 GET 请求）
   *
   * 返回一个对象，里面主要包含：
   * - mutate(data, options) — 触发 mutation，是异步但回调风格
   * - mutateAsync(data, options) — 返回 Promise，方便 async/await
   * - status — idle | loading | success | error
   * - data — mutation 返回的成功数据
   * - error — 请求失败返回的错误对象
   */
  const signInMutation = useMutation({
    mutationFn: signinApi
  });

  const signIn = async (data: SignInRequest) => {
    try {
      const r = await signInMutation.mutateAsync(data);
      const { user, accessToken, refreshToken } = r;

      setUserToken({ accessToken, refreshToken });
      setUserInfo(user);
    } catch (err) {
      toast.error(err.message, {
        position: 'top-center'
      });
      throw err;
    }
  };

  return signIn;
};
