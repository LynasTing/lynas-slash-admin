import { apiClient } from '@/utils';
import type { AuthCsrfTokenResponse, AuthLoginResponse, LoginRequest, RegisterRequest } from '#/auth';
import type { CurrentUser } from '#/system/user';

/**
 * 注册
 * Register
 */
export const registerApi = (data: RegisterRequest) =>
  apiClient.post({
    url: `/auth/register`,
    data
  });

/**
 * 登录
 * Login
 */
export const loginApi = (data: LoginRequest) =>
  apiClient.post<AuthLoginResponse>({
    url: '/auth/login',
    data
  });

/**
 * 退出
 */
export const logoutApi = () =>
  apiClient.post({
    url: '/auth/logout'
  });

/**
 * 获取当前登录用户的公开信息
 */
export const getPublicUserInfoApi = () =>
  apiClient.get<CurrentUser>({
    url: `auth/me`
  });

/**
 * 获取 CSRF Token
 * Get CSRF token
 */
export const getCsrfTokenApi = (): Promise<AuthCsrfTokenResponse> =>
  apiClient.get<AuthCsrfTokenResponse>({
    url: '/auth/token/csrf'
  });
