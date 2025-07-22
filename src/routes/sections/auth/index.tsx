import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router';

const Login = lazy(() => import('@/pages/auth/login'));

const auths: RouteObject[] = [
  {
    path: 'login',
    element: <Login />
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
    children: auths
  }
];
