import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { setGlobalNavigate } from '.';

/**
 * 路由导航注册组件。
 *
 * 这个组件必须渲染在 RouterProvider 内部，用于合法获取 useNavigate 的返回值，
 * 再把导航能力注册给 axios interceptor 等 React 组件树外的代码使用。
 *
 * Router navigation registration component.
 *
 * This component must be rendered inside RouterProvider. It legally reads the useNavigate
 * result and registers navigation for code outside the React component tree, such as axios interceptors.
 */
export function NavigationRegister() {
  const navigate = useNavigate();

  useEffect(() => {
    setGlobalNavigate(navigate);
  }, [navigate]);

  return null;
}
