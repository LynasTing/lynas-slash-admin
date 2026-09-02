import { BOOLEAN_VALUE_MAP } from '#/public/common';
import { SYS_MENU_CATEGORY_MAP } from '#/system/menu';
import { Navigate } from 'react-router';
import { Component } from '../utils/dynamic';
import { ROUTE_LINK_MODE_MAP, type AppRouteObject, type RouteLink } from '@/router/types';

const SHADCN_UI_URL = 'https://ui.shadcn.com';

const iframeLink: RouteLink = {
  url: SHADCN_UI_URL,
  mode: ROUTE_LINK_MODE_MAP.IFRAME
};

const externalLink: RouteLink = {
  url: SHADCN_UI_URL,
  mode: ROUTE_LINK_MODE_MAP.NEW_WINDOW
};

export const viewRoutes: AppRouteObject[] = [
  {
    path: 'view',
    meta: {
      name: '页面',
      code: 'view',
      category: SYS_MENU_CATEGORY_MAP.GROUP,
      sort: 3,
      status: BOOLEAN_VALUE_MAP.TRUE,
      hidden: BOOLEAN_VALUE_MAP.FALSE,
      icon: null,
      navGroup: {
        name: 'sys.nav.pages.label',
        sort: 3
      }
    },
    children: [
      {
        path: 'management',
        meta: {
          name: 'sys.nav.pages.management',
          code: 'management',
          category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
          sort: 1,
          status: BOOLEAN_VALUE_MAP.TRUE,
          hidden: BOOLEAN_VALUE_MAP.FALSE,
          icon: 'local:ic-management'
        },
        children: [
          { index: true, element: <Navigate to="user" replace /> },
          {
            path: 'user',
            meta: {
              name: 'sys.nav.pages.user',
              code: 'management-user',
              category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
              sort: 1,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:user-rounded-bold-duotone'
            },
            children: [
              { index: true, element: <Navigate to="profile" replace /> },
              {
                path: 'profile',
                element: Component('/pages/management/user/profile'),
                meta: {
                  name: 'sys.nav.pages.profile',
                  code: 'management-user-profile',
                  category: SYS_MENU_CATEGORY_MAP.MENU,
                  sort: 1,
                  status: BOOLEAN_VALUE_MAP.TRUE,
                  hidden: BOOLEAN_VALUE_MAP.FALSE,
                  icon: 'solar:user-circle-bold-duotone'
                }
              },
              {
                path: 'account',
                element: Component('/pages/management/user/account'),
                meta: {
                  name: 'sys.nav.pages.account',
                  code: 'management-user-account',
                  category: SYS_MENU_CATEGORY_MAP.MENU,
                  sort: 2,
                  status: BOOLEAN_VALUE_MAP.TRUE,
                  hidden: BOOLEAN_VALUE_MAP.FALSE,
                  icon: 'solar:settings-bold-duotone'
                }
              }
            ]
          },
          {
            path: 'system',
            meta: {
              name: 'sys.nav.pages.system',
              code: 'management-system',
              category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
              sort: 2,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:settings-bold-duotone'
            },
            children: [
              { index: true, element: <Navigate to="role" replace /> },
              {
                path: 'role',
                element: Component('/pages/management/system/role'),
                meta: {
                  name: 'sys.nav.pages.role',
                  code: 'management-system-role',
                  category: SYS_MENU_CATEGORY_MAP.MENU,
                  sort: 1,
                  status: BOOLEAN_VALUE_MAP.TRUE,
                  hidden: BOOLEAN_VALUE_MAP.FALSE,
                  icon: 'solar:shield-user-bold-duotone'
                }
              },
              {
                path: 'menu',
                element: Component('/pages/management/system/menu'),
                meta: {
                  name: 'sys.nav.pages.menu',
                  code: 'management-system-menu',
                  category: SYS_MENU_CATEGORY_MAP.MENU,
                  sort: 2,
                  status: BOOLEAN_VALUE_MAP.TRUE,
                  hidden: BOOLEAN_VALUE_MAP.FALSE,
                  icon: 'solar:list-check-bold-duotone'
                }
              },
              {
                path: 'user',
                element: Component('/pages/management/system/user'),
                meta: {
                  name: 'sys.nav.pages.user',
                  code: 'management-system-user',
                  category: SYS_MENU_CATEGORY_MAP.MENU,
                  sort: 3,
                  status: BOOLEAN_VALUE_MAP.TRUE,
                  hidden: BOOLEAN_VALUE_MAP.FALSE,
                  icon: 'solar:user-rounded-bold-duotone'
                }
              }
            ]
          },
          {
            path: 'menu-level',
            meta: {
              name: 'sys.nav.pages.menuLevel.label',
              code: 'menu-level',
              category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
              sort: 3,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'local:ic-menu-level'
            },
            children: [
              { index: true, element: <Navigate to="menu-level-1a" replace /> },
              {
                path: 'menu-level-1a',
                element: Component('/pages/management/menu-level/menu-level-1a'),
                meta: {
                  name: 'sys.nav.pages.menuLevel.level1a',
                  code: 'menu-level-1a',
                  category: SYS_MENU_CATEGORY_MAP.MENU,
                  sort: 1,
                  status: BOOLEAN_VALUE_MAP.TRUE,
                  hidden: BOOLEAN_VALUE_MAP.FALSE,
                  icon: 'solar:document-text-bold-duotone'
                }
              },
              {
                path: 'menu-level-1b',
                meta: {
                  name: 'sys.nav.pages.menuLevel.level1b',
                  code: 'menu-level-1b',
                  category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
                  sort: 2,
                  status: BOOLEAN_VALUE_MAP.TRUE,
                  hidden: BOOLEAN_VALUE_MAP.FALSE,
                  icon: 'solar:layers-bold-duotone'
                },
                children: [
                  { index: true, element: <Navigate to="menu-level-2a" replace /> },
                  {
                    path: 'menu-level-2a',
                    element: Component('/pages/management/menu-level/menu-level-1b/menu-level-2a'),
                    meta: {
                      name: 'sys.nav.pages.menuLevel.level2a',
                      code: 'menu-level-1b-2a',
                      category: SYS_MENU_CATEGORY_MAP.MENU,
                      sort: 1,
                      status: BOOLEAN_VALUE_MAP.TRUE,
                      hidden: BOOLEAN_VALUE_MAP.FALSE,
                      icon: 'solar:list-check-bold-duotone'
                    }
                  },
                  {
                    path: 'menu-level-2b',
                    meta: {
                      name: 'sys.nav.pages.menuLevel.level2b',
                      code: 'menu-level-1b-2b',
                      category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
                      sort: 2,
                      status: BOOLEAN_VALUE_MAP.TRUE,
                      hidden: BOOLEAN_VALUE_MAP.FALSE,
                      icon: 'solar:folder-with-files-bold-duotone'
                    },
                    children: [
                      { index: true, element: <Navigate to="menu-level-3a" replace /> },
                      {
                        path: 'menu-level-3a',
                        element: Component('/pages/management/menu-level/menu-level-1b/menu-level-2b/menu-level-3a'),
                        meta: {
                          name: 'sys.nav.pages.menuLevel.level3a',
                          code: 'menu-level-1b-2b-3a',
                          category: SYS_MENU_CATEGORY_MAP.MENU,
                          sort: 1,
                          status: BOOLEAN_VALUE_MAP.TRUE,
                          hidden: BOOLEAN_VALUE_MAP.FALSE,
                          icon: 'solar:card-bold-duotone'
                        }
                      },
                      {
                        path: 'menu-level-3b',
                        element: Component('/pages/management/menu-level/menu-level-1b/menu-level-2b/menu-level-3b'),
                        meta: {
                          name: 'sys.nav.pages.menuLevel.level3b',
                          code: 'menu-level-1b-2b-3b',
                          category: SYS_MENU_CATEGORY_MAP.MENU,
                          sort: 2,
                          status: BOOLEAN_VALUE_MAP.TRUE,
                          hidden: BOOLEAN_VALUE_MAP.FALSE,
                          icon: 'solar:box-minimalistic-bold-duotone'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'others',
        meta: {
          name: 'sys.nav.others.label',
          code: 'others',
          category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
          sort: 1,
          status: BOOLEAN_VALUE_MAP.TRUE,
          hidden: BOOLEAN_VALUE_MAP.FALSE,
          icon: 'solar:box-minimalistic-bold-duotone'
        },
        children: [
          { index: true, element: <Navigate to="calendar" replace /> },
          {
            path: 'calendar',
            element: Component('/pages/others/calendar'),
            meta: {
              name: 'sys.nav.others.calendar',
              code: 'others-calendar',
              category: SYS_MENU_CATEGORY_MAP.MENU,
              sort: 1,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:calendar-bold-duotone',
              navBadge: {
                key: 'calendar-pending',
                variant: 'warning'
              }
            }
          },
          {
            path: 'functions',
            meta: {
              name: 'sys.nav.functions.label',
              code: 'functions',
              category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
              sort: 2,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:plain-2-bold-duotone'
            },
            children: [
              { index: true, element: <Navigate to="clipboard" replace /> },
              {
                path: 'clipboard',
                element: Component('/pages/others/functions/clipboard'),
                meta: {
                  name: 'sys.nav.functions.clipboard',
                  code: 'functions-clipboard',
                  category: SYS_MENU_CATEGORY_MAP.MENU,
                  sort: 1,
                  status: BOOLEAN_VALUE_MAP.TRUE,
                  hidden: BOOLEAN_VALUE_MAP.FALSE,
                  icon: 'solar:clipboard-bold-duotone'
                }
              },
              {
                path: 'token-expired',
                element: Component('/pages/others/functions/token-expired'),
                meta: {
                  name: 'sys.nav.functions.tokenExpired',
                  code: 'functions-token-expired',
                  category: SYS_MENU_CATEGORY_MAP.MENU,
                  sort: 2,
                  status: BOOLEAN_VALUE_MAP.TRUE,
                  hidden: BOOLEAN_VALUE_MAP.FALSE,
                  icon: 'solar:password-bold-duotone'
                }
              }
            ]
          },
          {
            path: 'link',
            meta: {
              name: 'link',
              code: 'others-link',
              category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
              sort: 3,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'local:ic-external'
            },
            children: [
              { index: true, element: <Navigate to="iframe" replace /> },
              {
                path: 'iframe',
                element: Component('/pages/others/link/iframe', { src: iframeLink.url }),
                meta: {
                  name: 'iframe',
                  code: 'others-link-iframe',
                  category: SYS_MENU_CATEGORY_MAP.MENU,
                  sort: 1,
                  status: BOOLEAN_VALUE_MAP.TRUE,
                  hidden: BOOLEAN_VALUE_MAP.FALSE,
                  icon: 'solar:document-text-bold-duotone',
                  link: iframeLink
                }
              },
              {
                path: 'external',
                element: Component('/pages/others/link/external', { src: externalLink.url }),
                meta: {
                  name: 'external',
                  code: 'others-link-external',
                  category: SYS_MENU_CATEGORY_MAP.MENU,
                  sort: 2,
                  status: BOOLEAN_VALUE_MAP.TRUE,
                  hidden: BOOLEAN_VALUE_MAP.FALSE,
                  icon: 'solar:code-square-bold-duotone',
                  link: externalLink
                }
              }
            ]
          },
          {
            path: 'kanban',
            element: Component('/pages/others/kanban'),
            meta: {
              name: 'sys.nav.others.kanban',
              code: 'others-kanban',
              category: SYS_MENU_CATEGORY_MAP.MENU,
              sort: 4,
              status: BOOLEAN_VALUE_MAP.TRUE,
              hidden: BOOLEAN_VALUE_MAP.FALSE,
              icon: 'solar:clipboard-bold-duotone'
            }
          }
        ]
      }
    ]
  }
];
