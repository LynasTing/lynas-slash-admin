import axios, { AxiosError, AxiosRequestConfig, type AxiosResponse } from 'axios';
import { GLOBAL_CONFIG } from '@/config/global';
import { t } from '@/locales/i18n';
import { ResultStatusEnum, HttpStatusEnum } from '#/enum';
import type { Api } from '#/api';
import { toast } from 'sonner';
import { useUserActions } from '@/store/user';
import { useNavigate } from 'react-router';

const instance = axios.create({
  baseURL: GLOBAL_CONFIG.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

/**
 * 请求拦截
 */
instance.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer Token';
    return config;
  },
  error => {
    console.log(`hhhh + ::>>`);
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
instance.interceptors.response.use(
  <T>(res: AxiosResponse<Api<T>>) => {
    if (!res.data) throw new Error(t('api.error'));

    const { status, data, message } = res.data;
    if (status === ResultStatusEnum.SUCCESS) {
      return data;
    }
    throw new Error(message || t('sys.api.apiRequestFailed'));
  },
  (error: AxiosError<Api<unknown>>) => {
    const navigate = useNavigate();
    navigate('/auth/login', { replace: true });

    const { response, message } = error ?? {};
    const errMsg = response?.data?.message ?? (message || t('sys.api.errorMessage'));
    toast.error(errMsg, { position: 'top-center' });

    if (error?.status === HttpStatusEnum.UNAUTHORIZED) {
      const { clearUserInfoAndToken } = useUserActions();
      clearUserInfoAndToken();
    }
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
}

export default new APIClient();
