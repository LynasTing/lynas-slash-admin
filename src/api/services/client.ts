import { GLOBAL_CONFIG } from '@/config/global';
import axios, { type AxiosResponse, type AxiosError, type AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import type { Result } from '#/api/global';
import { ResultStatus } from '#/enum';

const instance = axios.create({
  baseURL: GLOBAL_CONFIG.apiBaseUrl,
  timeout: 50 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer Token`;
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (res: AxiosResponse<Result<any>>) => {
    if (!res.data) throw new Error('请求出错，请稍后再试');
    const { status, message, data } = res.data;
    if (status === ResultStatus.SUCCESS) {
      return data;
    }
    throw new Error(message);
  },
  (error: AxiosError<Result>) => {
    const { response, message } = error || {};
    const errMsg = response?.data?.message || message;
    toast.error(errMsg, { position: 'top-center' });
    if (response?.status === 401) {
      console.log(`登录状态已过期 + ::>>`);
    }
    return Promise.reject(error);
  }
);

class APIClient {
  request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return instance.request(config);
  }
  get<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'get' });
  }
  post<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  put<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' });
  }
  delete<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
}

export default new APIClient();
