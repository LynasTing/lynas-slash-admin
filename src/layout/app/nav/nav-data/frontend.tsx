import type { NavProps } from '@/components/nav/types';
import { Icon } from '@/components/icon';

export const frontendNavData: NavProps['data'] = [
  {
    name: 'dashboard.nav.dashboard',
    items: [
      {
        title: 'dashboard.nav.workbench',
        path: '/workbench',
        icon: <Icon icon="local:ic-workbench" size="24" />
      }
    ]
  }
];
