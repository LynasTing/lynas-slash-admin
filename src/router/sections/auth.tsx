import { type RouteObject } from 'react-router';
import { Suspense, lazy } from 'react';

const AuthPage = lazy(() => import('@/pages/auth'));
const LoginPage = lazy(() => import('@/pages/auth/login'));
const ResetPage = lazy(() => import('@/pages/auth/reset'));

const authCustomRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'reset',
    element: <ResetPage />
  }
];

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: (
      <Suspense>
        <AuthPage />
      </Suspense>
    ),
    children: [...authCustomRoutes]
  }
];
