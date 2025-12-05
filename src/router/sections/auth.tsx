import { Navigate, type RouteObject } from 'react-router';
import { Suspense, lazy } from 'react';

const AuthPage = lazy(() => import('@/pages/auth'));
const LoginPage = lazy(() => import('@/pages/auth/login'));
const ResetPage = lazy(() => import('@/pages/auth/reset'));
const RegisterPage = lazy(() => import('@/pages/auth/register'));
const PhoneNumberPage = lazy(() => import('@/pages/auth/phone-number'));

const authCustomRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'reset',
    element: <ResetPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  {
    path: 'phone-number',
    element: <PhoneNumberPage />
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
    children: [{ index: true, element: <Navigate to="login" replace /> }, ...authCustomRoutes]
  }
];
