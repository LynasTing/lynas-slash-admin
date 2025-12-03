import { UserToken, User } from '#/entity';
import { apiClient } from '@/utils';

export enum UserApi {
  SignIn = '/auth/signin',
  SignUp = '/auth/signup'
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
 */
const signupApi = (data: SignUpRequest) =>
  apiClient.post<SignInResponse>({
    url: UserApi.SignUp,
    data
  });

/**
 * 登录
 */
const signinApi = (data: SignInRequest) =>
  apiClient.post<SignInResponse>({
    url: UserApi.SignIn,
    data
  });

export { signinApi, signupApi };
