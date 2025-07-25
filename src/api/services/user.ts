import type { UserToken, UserInfo } from '#/entity';
import apiClient from '../client';

export interface SignInParams {
  /**
   * 用户名
   * Username
   */
  username: string;

  /**
   * 密码
   * Password
   */
  password: string;
}

export type SignInRes = UserToken & {
  user: UserInfo;
};

/**
 * 用户登录
 * User login
 */
export const signinApi = (data: SignInParams) =>
  apiClient.post<SignInRes>({
    url: '/auth/signin',
    data
  });
