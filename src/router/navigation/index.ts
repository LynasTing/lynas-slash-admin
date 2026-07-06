import type { NavigateFunction, NavigateOptions, To } from 'react-router';

let globalNavigate: NavigateFunction | null = null;

/**
 * 注册全局导航函数。
 * @param navigate - React Router 提供的导航函数。
 *
 * Registers the global navigation function.
 * @param navigate - Navigation function provided by React Router.
 */
export const setGlobalNavigate = (navigate: NavigateFunction) => {
  globalNavigate = navigate;
};

/**
 * 在 React 组件树外执行路由跳转。
 * @param to - 目标路由。
 * @param options - React Router 跳转配置。
 *
 * Navigates outside the React component tree.
 * @param to - Target route.
 * @param options - React Router navigation options.
 */
export const navigateTo = (to: To, options?: NavigateOptions) => {
  globalNavigate?.(to, options);
};

/**
 * 跳转到登录页，并替换当前历史记录。
 *
 * Navigates to the login page and replaces the current history entry.
 */
export const redirectToLogin = () => {
  navigateTo('/auth/login', { replace: true });
};
