import { Outlet, type RouteObject } from 'react-router';
import { Suspense, lazy } from 'react';

const LoginPage = lazy(() => import('@/pages/auth/login'));

const authCustomRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />
  }
];

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: (
      <Suspense>
        <Outlet />
      </Suspense>
    ),
    children: [...authCustomRoutes]
  }
];
