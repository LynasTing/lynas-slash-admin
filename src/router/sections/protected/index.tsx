import { Navigate } from 'react-router';
import type { AppRouteObject } from '../../types';
import AppLayout from '@/layout/app';
import AuthGuard from '../../components/auth-guard';
import { GLOBAL_CONFIG } from '@/config/global';
import { protectedRoutes } from './routes';

export const appRoutes: AppRouteObject[] = [
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
      ...protectedRoutes
    ]
  }
];
