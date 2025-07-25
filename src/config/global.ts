import packageJson from '../../package.json';

/**
 * 应用全局配置类型定义
 */
export type GlobalConfig = {
  /**
   * 应用名称
   * Application Name
   */
  appName: string;

  /**
   * 应用版本
   * Application Version
   */
  appVersion: string;

  /**
   * 默认路由
   * Default Route
   */
  defaultRoute: string;

  /**
   * 公共资源路径
   * Public Path
   */
  publicPath: string;

  /**
   * API请求基地址
   * API Base URL
   */
  apiBaseUrl: string;

  /**
   * 路由模式
   * Router Mode
   */
  routerMode: 'frontend' | 'backend';
};

/**
 * 全局配置常量
 * Global configuration constants
 *
 * 从环境变量和 package.json 中读取配置
 * Reads configuration from environment variables and package.json
 *
 * @warning
 * 请不要在项目使用 import.meta.env 来获取配置，访问环境变量请使用 GLOBAL_CONFIG 统一访问
 * Please do not use import.meta.env to access configuration in the project, use GLOBAL_CONFIG for unified access
 */
export const GLOBAL_CONFIG: GlobalConfig = {
  appName: 'Lynas Slash Admin',
  appVersion: packageJson.version,
  defaultRoute: import.meta.env.VITE_DEFAULT_ROUTE || '/workbench',
  publicPath: import.meta.env.VITE_PUBLIC_PATH || '/',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  routerMode: import.meta.env.VITE_ROUTER_MODE || 'frontend'
};
