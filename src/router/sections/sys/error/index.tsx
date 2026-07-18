import { Suspense, lazy } from 'react';
import { Outlet, type RouteObject } from 'react-router';
import SimpleLayout from '@/layout/simple';
import { LineLoading } from '@/components/loading';

const Page403 = lazy(() => import('@/pages/sys/error/page-403'));
const Page404 = lazy(() => import('@/pages/sys/error/page-404'));
const Page500 = lazy(() => import('@/pages/sys/error/page-500'));

export const errorRoutes: RouteObject[] = [
  {
    path: '/error',
    element: (
      <SimpleLayout>
        <Suspense fallback={<LineLoading />}>
          <Outlet />
        </Suspense>
      </SimpleLayout>
    ),
    children: [
      {
        path: '403',
        element: <Page403 />
      },
      {
        path: '404',
        element: <Page404 />
      },
      {
        path: '500',
        element: <Page500 />
      }
    ]
  },
  {
    path: '*',
    element: <Page404 />
  }
];
