import { UserToken, User } from '#/entity';
import { apiClient } from '@/utils';

export enum UserApi {
  SignIn = '/auth/signin'
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
 * 登录
 */
const signinApi = (data: SignInRequest) =>
  apiClient.post<SignInResponse>({
    url: UserApi.SignIn,
    data
  });

export { signinApi };
