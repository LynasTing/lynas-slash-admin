import packageJson from '../../package.json';

/**
 * Global application configuration type definition
 * 全局应用配置
 */
export type GlobalConfig = {
  /**
   * Application name
   * 应用名称
   */
  appName: string;

  /**
   * Application version
   * 应用版本
   */
  appVersion: string;

  /**
   * Public path for static assets
   * 静态资源的公共路径
   */
  publicPath: string;

  /**
   * Base URL for API endpoints
   * API 请求基本 URL
   */
  apiBaseUrl: string;

  /**
   * Default route path for the application
   * 应用默认路由
   */
  defaultRoute: string;

  /**
   * Route mode: frontend routing or backend routing
   * 路由模式：前端路由或后端路由
   */
  routerMode: 'frontend' | 'backend';
};

/**
 * Global configuration constans
 * Reads configuration from environment variables and package.json
 *
 * 全局配置
 * 从环境变量和 package.json 中读取配置
 *
 * @warning
 * Don't use the import.meta.env to get the configuration, use the GLOBAL_CONFIG instead
 * 不要使用 import.meta.env 获取配置，使用 GLOBAL_CONFIG
 */
export const GLOBAL_CONFIG: GlobalConfig = {
  appName: packageJson.name,
  appVersion: packageJson.version,
  publicPath: import.meta.env.VITE_APP_PUBLIC_PATH || '/',
  apiBaseUrl: import.meta.env.VITE_APP_API_BASE_URL || '/api',
  defaultRoute: import.meta.env.VITE_APP_DEFAULT_ROUTE || '/',
  routerMode: import.meta.env.VITE_APP_ROUTER_MODE || 'frontend'
};
