import { Outlet, type RouteObject } from 'react-router';
import { Suspense, lazy } from 'react';

const Login = lazy(() => import('@/pages/auth/login'));

const authCustomRoutes: RouteObject[] = [
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
    children: [...authCustomRoutes]
  }
];
