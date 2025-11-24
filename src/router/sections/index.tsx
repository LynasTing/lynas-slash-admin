import { type RouteObject, Navigate } from 'react-router';
import AppLayout from '@/layout/app';
import { GetFrontendRoutes } from './frontend';
import AuthGuard from '../components/auth-guard';
import { GLOBAL_CONFIG } from '@/config/global';

const getRoutes = () => {
  return GetFrontendRoutes();
};

export const appRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      // 索引路由(默认路由)，当访问根路由时，会重定向到默认路由
      {
        index: true,
        element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace />
      },
      ...getRoutes()
    ]
  }
];
