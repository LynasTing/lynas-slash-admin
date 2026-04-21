import { UserToken, User } from '#/entity';
import { apiClient } from '@/utils';

export enum UserApi {
  SignIn = '/auth/signIn',
  SignUp = '/auth/signUp',
  TokenExpired = '/user/tokenExpired'
}

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
    url: UserApi.SignUp,
    data
  });

/**
 * 登录
 * Sign in
 */
const signInApi = (data: SignInRequest) =>
  apiClient.post<SignInResponse>({
    url: UserApi.SignIn,
    data
  });

/**
 * token过期
 */
const tokenExpiredApi = () =>
  apiClient.post({
    url: UserApi.TokenExpired
  });

export { signInApi, signUpApi, tokenExpiredApi };
