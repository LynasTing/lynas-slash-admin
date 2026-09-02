import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router';
import SimpleLayout from '@/layout/simple';
import { LineLoading } from '@/components/loading';
import type { AppRouteObject } from '@/router/types';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import { SYS_MENU_CATEGORY_MAP } from '#/system/menu';

const Page403 = lazy(() => import('@/pages/system/error/page-403'));
const Page404 = lazy(() => import('@/pages/system/error/page-404'));
const Page500 = lazy(() => import('@/pages/system/error/page-500'));

export const errorRoutes: AppRouteObject[] = [
  {
    path: '/error',
    element: (
      <SimpleLayout>
        <Suspense fallback={<LineLoading />}>
          <Outlet />
        </Suspense>
      </SimpleLayout>
    ),
    meta: {
      name: 'sys.nav.pages.error.label',
      code: 'error',
      category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
      sort: 3,
      status: BOOLEAN_VALUE_MAP.TRUE,
      hidden: BOOLEAN_VALUE_MAP.FALSE,
      icon: 'bxs:error-alt',
      navGroup: {
        name: 'sys.nav.pages.label',
        sort: 3
      }
    },
    children: [
      {
        path: '403',
        element: <Page403 />,
        meta: {
          name: 'sys.nav.pages.error.forbidden',
          code: 'error-403',
          category: SYS_MENU_CATEGORY_MAP.MENU,
          sort: 1,
          status: BOOLEAN_VALUE_MAP.TRUE,
          hidden: BOOLEAN_VALUE_MAP.FALSE
        }
      },
      {
        path: '404',
        element: <Page404 />,
        meta: {
          name: 'sys.nav.pages.error.notFound',
          code: 'error-404',
          category: SYS_MENU_CATEGORY_MAP.MENU,
          sort: 2,
          status: BOOLEAN_VALUE_MAP.TRUE,
          hidden: BOOLEAN_VALUE_MAP.FALSE
        }
      },
      {
        path: '500',
        element: <Page500 />,
        meta: {
          name: 'sys.nav.pages.error.serverError',
          code: 'error-500',
          category: SYS_MENU_CATEGORY_MAP.MENU,
          sort: 3,
          status: BOOLEAN_VALUE_MAP.TRUE,
          hidden: BOOLEAN_VALUE_MAP.FALSE
        }
      }
    ]
  },
  { path: '*', element: <Page404 /> }
];
