import { lazy, Suspense } from 'react';
import { Outlet, type RouteObject } from 'react-router';

const Page404 = lazy(() => import('@/pages/sys/error/404/index.tsx'));

export const errorRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: '404',
        element: <Page404 />
      }
    ]
  }
];
