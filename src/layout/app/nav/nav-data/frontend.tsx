import type { NavProps } from '@/components/nav/types';
import { Icon } from '@/components/icon';
import { Badge } from '@/ui/badge';

export const frontendNavData: NavProps['data'] = [
  {
    name: 'sys.nav.dashboard',
    items: [
      {
        title: 'sys.nav.workbench',
        path: '/workbench',
        icon: <Icon icon="local:ic-workbench" size="24" />
      },
      {
        title: 'sys.nav.analysis',
        path: '/analysis',
        icon: <Icon icon="local:ic-analysis" size="24" />
      }
    ]
  },
  {
    name: 'sys.nav.ui',
    items: [
      {
        title: 'sys.nav.functions.label',
        path: '/functions',
        icon: <Icon icon="solar:plain-2-bold-duotone" size="24" />,
        children: [
          {
            title: 'sys.nav.functions.clipboard',
            path: '/functions/clipboard'
          },
          {
            title: 'sys.nav.functions.tokenExpired',
            path: '/functions/token-expired'
          }
        ]
      },
      {
        title: 'sys.nav.components.label',
        path: '/components',
        icon: <Icon icon="solar:widget-5-bold-duotone" size="24" />,
        caption: 'sys.nav.components.description',
        children: [
          {
            title: 'sys.nav.components.toast',
            path: '/components/toast'
          },
          {
            title: 'sys.nav.components.icon',
            path: '/components/icon'
          },
          {
            title: 'sys.nav.components.multiLanguage',
            path: '/components/multi-language'
          },
          {
            title: 'sys.nav.components.scroll',
            path: '/components/scroll'
          },
          {
            title: 'sys.nav.components.chart',
            path: '/components/chart'
          },
          {
            title: 'sys.nav.components.animate',
            path: '/components/animate'
          },
          {
            title: 'upload',
            path: '/components/upload'
          }
        ]
      }
    ]
  },
  {
    name: 'sys.nav.pages.label',
    items: [
      {
        title: 'sys.nav.pages.management',
        path: '/management',
        icon: <Icon icon="local:ic-management" size="24" />,
        children: [
          {
            title: 'sys.nav.pages.user',
            path: '/management/user',
            children: [
              {
                title: 'sys.nav.pages.profile',
                path: '/management/user/profile'
              },
              {
                title: 'sys.nav.pages.account',
                path: '/management/user/account'
              }
            ]
          },
          {
            title: 'sys.nav.pages.system',
            path: '/management/system',
            children: [
              {
                title: 'sys.nav.pages.menu',
                path: '/management/system/menu'
              }
            ]
          }
        ]
      },
      {
        title: 'sys.nav.pages.menuLevel.label',
        path: '/menu-level',
        icon: <Icon icon="local:ic-menu-level" size="24" />,
        children: [
          {
            title: 'sys.nav.pages.menuLevel.level1a',
            path: '/menu-level/1a'
          },
          {
            title: 'sys.nav.pages.menuLevel.level1b',
            path: '/menu-level/1b',
            children: [
              {
                title: 'sys.nav.pages.menuLevel.level2a',
                path: '/menu-level/1b/2a'
              },
              {
                title: 'sys.nav.pages.menuLevel.level2b',
                path: '/menu-level/1b/2b',
                children: [
                  {
                    title: 'sys.nav.pages.menuLevel.level3a',
                    path: '/menu-level/1b/2b/3a'
                  },
                  {
                    title: 'sys.nav.pages.menuLevel.level3b',
                    path: '/menu-level/1b/2b/3b'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: '异常页',
        path: '/error',
        icon: <Icon icon="bxs:error-alt" size="24" />,
        children: [
          {
            title: '403',
            path: '/error/403'
          },
          {
            title: '404',
            path: '/error/404'
          },
          {
            title: '500',
            path: '/error/500'
          }
        ]
      }
    ]
  },
  {
    name: 'others',
    items: [
      {
        title: 'calendar',
        path: '/others/calendar',
        icon: <Icon icon="solar:calendar-bold-duotone" size="24" />,
        info: <Badge variant="warning">+12</Badge>
      },
      {
        title: 'link',
        path: '/others/link',
        icon: <Icon icon="local:ic-external" size="24" />,
        children: [
          {
            title: 'iframe',
            path: '/others/link/iframe'
          },
          {
            title: 'external',
            path: '/others/link/external'
          }
        ]
      },
      {
        title: 'kanban',
        path: '/others/kanban',
        icon: <Icon icon="solar:clipboard-bold-duotone" size="24" />
      }
    ]
  }
];
