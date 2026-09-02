import { Navigate } from 'react-router';
import { Component } from '../utils/dynamic';
import type { AppRouteObject } from '@/router/types';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import { SYS_MENU_CATEGORY_MAP } from '#/system/menu';

export const dashboardRoutes: AppRouteObject[] = [
  {
    path: 'dashboard',
    meta: {
      name: 'sys.nav.dashboard',
      code: 'dashboard',
      category: SYS_MENU_CATEGORY_MAP.GROUP,
      sort: 1,
      status: BOOLEAN_VALUE_MAP.TRUE,
      hidden: BOOLEAN_VALUE_MAP.FALSE,
      icon: 'local:ic-workbench',
      navGroup: {
        name: 'sys.nav.dashboard',
        sort: 1
      }
    },
    children: [
      { index: true, element: <Navigate to="workbench" replace /> },
      {
        path: 'workbench',
        element: Component('/pages/dashboard/workbench'),
        meta: {
          name: 'sys.nav.workbench',
          code: 'workbench',
          category: SYS_MENU_CATEGORY_MAP.MENU,
          sort: 1,
          status: BOOLEAN_VALUE_MAP.TRUE,
          hidden: BOOLEAN_VALUE_MAP.FALSE,
          icon: 'local:ic-workbench'
        }
      },
      {
        path: 'analysis',
        element: Component('/pages/dashboard/analysis'),
        meta: {
          name: 'sys.nav.analysis',
          code: 'analysis',
          category: SYS_MENU_CATEGORY_MAP.MENU,
          sort: 2,
          status: BOOLEAN_VALUE_MAP.TRUE,
          hidden: BOOLEAN_VALUE_MAP.FALSE,
          icon: 'local:ic-analysis'
        }
      }
    ]
  }
];
