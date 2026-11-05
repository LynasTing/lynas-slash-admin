import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    /**
     * 当前请求不需要请求头携带 Token
     * Do not attach the Authorization header to this request
     */
    skipAuthorization?: boolean;

    /**
     * 当前请求失败时，不允许自动调用 refresh token
     * Do not start automatic token refresh when this request fails
     */
    skipAuthRefresh?: boolean;

    /**
     * 当前请求返回 401 时，不执行强制跳转登录页面
     * Do not redirect globally to the login page when this request returns 401
     */
    skipUnauthorizedRedirect?: boolean;

    /**
     * 原请求已经在 refresh 成功后重发过一次
     * The original request has already been replayed once after refresh
     */
    retryAfterRefresh?: boolean;
  }
}
