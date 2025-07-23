/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 默认路由
   * Default route
   */
  readonly VITE_APP_DEFAULT_ROUTE: string;

  /**
   * 公共资源路径
   * Public path
   */
  readonly VITE_APP_PUBLIC_PATH: string;

  /**
   * API请求基地址
   * API base URL
   */
  readonly VITE_APP_API_BASE_URL: string;

  /**
   * 路由模式
   * Router mode
   */
  readonly VITE_APP_ROUTER_MODE: 'frontend' | 'backend';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
