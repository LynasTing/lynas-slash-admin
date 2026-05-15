import { Navigate, type RouteObject } from 'react-router';
import { Component } from './utils/dynamic';

export function GetFrontendRoutes() {
  const frontendRoutes: RouteObject[] = [
    {
      path: 'workbench',
      element: Component('/pages/dashboard/workbench')
    },
    {
      path: 'analysis',
      element: Component('/pages/dashboard/analysis')
    },
    {
      path: 'functions',
      children: [
        {
          index: true,
          element: <Navigate to="clipboard" replace />
        },
        {
          path: 'clipboard',
          element: Component('/pages/functions/clipboard')
        },
        {
          path: 'token-expired',
          element: Component('/pages/functions/token-expired')
        }
      ]
    },
    {
      path: 'management',
      children: [
        {
          index: true,
          element: <Navigate to="user" replace />
        },
        {
          path: 'user',
          children: [
            {
              index: true,
              element: <Navigate to="profile" replace />
            },
            {
              path: 'profile',
              element: Component('/pages/management/user/profile')
            }
          ]
        }
      ]
    }
  ];
  return frontendRoutes;
}
