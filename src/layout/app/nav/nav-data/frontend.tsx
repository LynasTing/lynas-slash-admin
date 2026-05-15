import type { NavProps } from '@/components/nav/types';
import { Icon } from '@/components/icon';

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
              }
            ]
          }
        ]
      }
    ]
  }
];
