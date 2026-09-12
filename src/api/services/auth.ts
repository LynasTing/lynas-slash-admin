import type { User, UserToken } from '#/entity';
import { apiClient } from '@/utils';

export const USER_API_MAP = {
  SIGN_IN: '/auth/signIn',
  SIGN_UP: '/auth/signUp',
  TOKEN_EXPIRED: '/user/tokenExpired'
} as const;

export interface SignInRequest {
  username: string;
  password: string;
}

/**
 * 登录-响应
 */
export type SignInResponse = UserToken & { user: User };

/**
 * 注册参数
 */
export interface SignUpRequest extends SignInRequest {
  email: string;
}

/**
 * 注册
 * Register
 */
const signUpApi = (data: SignUpRequest) =>
  apiClient.post<SignInResponse>({
    url: USER_API_MAP.SIGN_UP,
    data
  });

/**
 * 登录
 * Sign in
 */
const signInApi = (data: SignInRequest) =>
  apiClient.post<SignInResponse>({
    url: USER_API_MAP.SIGN_IN,
    data
  });

/**
 * token过期
 */
const tokenExpiredApi = () =>
  apiClient.post({
    url: USER_API_MAP.TOKEN_EXPIRED
  });

export { signInApi, signUpApi, tokenExpiredApi };
