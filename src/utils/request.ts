import axios, { AxiosError, AxiosRequestConfig, type AxiosResponse } from 'axios';
import { GLOBAL_CONFIG } from '@/config/global';
import { t } from '@/locales/i18n';
import { ResultStatusEnum, HttpStatusEnum } from '#/enum';
import type { Api } from '#/public/api';
import { toast } from 'sonner';
import { clearUserAuth, getUserToken, setUserToken } from '@/store/user';
import { redirectToLogin } from '@/router/navigation';
import type { AuthAccessTokenResponse } from '#/auth';

const instance = axios.create({
  baseURL: GLOBAL_CONFIG.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
});

/**
 * 请求拦截
 */
instance.interceptors.request.use(
  config => {
    const token = getUserToken();
    if (config.skipAuthorization || !token) {
      delete config.headers.Authorization;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 同时只允许有一个 refresh token 请求；
let refreshPromise: Promise<AuthAccessTokenResponse> | null = null;

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = instance
      .request<unknown, AuthAccessTokenResponse>({
        url: `/auth/token/refresh`,
        method: 'POST',
        skipAuthRefresh: true,
        skipAuthorization: true
      })
      .then(r => {
        setUserToken(r.accessToken);
        return r;
      })
      .finally(() => {
        // 成功、失败都需要清空，下次 refresh token 才可以正常发起请求
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const endSession = () => {
  if (!getUserToken()) return;

  clearUserAuth();
  redirectToLogin();
};

/**
 * 响应拦截
 */
instance.interceptors.response.use(
  <T>(res: AxiosResponse<Api<T>>) => {
    if (!res.data) throw new Error(t('api.error'));

    const { code, data, message } = res.data;
    if (code === ResultStatusEnum.SUCCESS) return data;

    throw new Error(message || t('sys.api.apiRequestFailed'));
  },
  async (error: AxiosError<Api<unknown>>) => {
    const { response, config: originRequest } = error;

    // 接口响应 401
    if (response?.status === HttpStatusEnum.UNAUTHORIZED) {
      const hasAccessToken = !!getUserToken();
      // 只有普通业务请求的第一次 401 才允许进入自动续期流程
      const canRefreshToken = hasAccessToken && originRequest && !originRequest.skipAuthRefresh && !originRequest.retryAfterRefresh;

      if (canRefreshToken) {
        // 先标记，再等待 refresh。原请求重发后即使再次 401 也不会死循环
        originRequest.retryAfterRefresh = true;

        try {
          // 第一个 401 创建 refresh token，其它请求等待同一个 Promise
          await refreshAccessToken();

          // 新 Token 已更新到本地，重走 Axios 请求拦截器，由它更新最新的 Bearer Token
        } catch (refreshError) {
          // 进入这里说明 refresh token 也失效，需要重新登录
          endSession();
          return Promise.reject(refreshError);
        }

        // 刷新成功后，重新发送请求，为请求拦截器注入最新的 Access Token
        return instance.request(originRequest);
      }

      // 不允许自动续期 token 且不执行强制跳转登录页面，结束会话
      if (!originRequest?.skipUnauthorizedRedirect) {
        endSession();
      }
    }

    const errorMsg = response?.data?.message ?? error.message ?? t('sys.api.errorMessage');
    toast.error(errorMsg, { position: 'top-center' });

    return Promise.reject(error);
  }
);

class APIClient {
  request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return instance.request<unknown, T>(config);
  }
  get<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  delete<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  put<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' });
  }
}

export default new APIClient();
