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
            },
            {
              path: 'account',
              element: Component('/pages/management/user/account')
            }
          ]
        },
        {
          path: 'system',
          children: [
            {
              index: true,
              element: <Navigate to="menu" replace />
            },
            {
              path: 'menu',
              element: Component('/pages/management/system/menu')
            }
          ]
        }
      ]
    },
    {
      path: 'menu-level',
      children: [
        {
          index: true,
          element: <Navigate to="1a" replace />
        },
        {
          path: '1a',
          element: Component('/pages/menu-level/menu-level-1a')
        },
        {
          path: '1b',
          children: [
            {
              index: true,
              element: <Navigate to="2a" replace />
            },
            {
              path: '2a',
              element: Component('/pages/menu-level/menu-level-1b/menu-level-2a')
            },
            {
              path: '2b',
              children: [
                {
                  index: true,
                  element: <Navigate to="3a" replace />
                },
                {
                  path: '3a',
                  element: Component('/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3a')
                },
                {
                  path: '3b',
                  element: Component('/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3b')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: 'components',
      children: [
        {
          index: true,
          element: <Navigate to="toast" replace />
        },
        {
          path: 'toast',
          element: Component('/pages/components/toast')
        },
        {
          path: 'icon',
          element: Component('/pages/components/icon')
        },
        {
          path: 'multi-language',
          element: Component('/pages/components/multi-language')
        },
        {
          path: 'scroll',
          element: Component('/pages/components/scroll')
        },
        {
          path: 'chart',
          element: Component('/pages/components/chart')
        },
        {
          path: 'animate',
          element: Component('/pages/components/animate')
        },
        {
          path: 'upload',
          element: Component('/pages/components/upload')
        }
      ]
    }
  ];
  return frontendRoutes;
}
