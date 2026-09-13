import type { SysMenuTreeNode } from '#/system/menu';
import type { SysRoleListItem, SysRoleOption } from '#/system/role';
import type { SysUserListItem } from '#/system/user';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import { SYS_MENU_CATEGORY_MAP } from '#/system/menu';

export const SYSTEM_ROLES: SysRoleListItem[] = [
  { id: 1, name: 'Super Admin', code: 'SUPER_ADMIN', sort: 1, status: BOOLEAN_VALUE_MAP.TRUE, description: 'Full access' },
  { id: 2, name: 'System Admin', code: 'SYSTEM_ADMIN', sort: 2, status: BOOLEAN_VALUE_MAP.TRUE, description: 'System management' },
  { id: 3, name: 'Read Only', code: 'READ_ONLY', sort: 3, status: BOOLEAN_VALUE_MAP.FALSE, description: 'Read-only access' }
];

export const SYSTEM_ROLE_OPTIONS: SysRoleOption[] = SYSTEM_ROLES.map(({ id, name, code, sort, status }) => ({
  id,
  name,
  code,
  sort,
  status
}));

export const SYSTEM_ROLE_MENU_IDS: Record<number, number[]> = {
  1: [1, 2, 3, 4],
  2: [1, 2, 3],
  3: [1]
};

export const SYSTEM_USERS: SysUserListItem[] = [
  {
    id: 1,
    username: 'admin',
    nickname: 'Administrator',
    email: 'admin@example.com',
    phone: '13800138000',
    avatar: undefined,
    status: BOOLEAN_VALUE_MAP.TRUE,
    roleIds: [1]
  },
  {
    id: 2,
    username: 'operator',
    nickname: 'System Operator',
    email: 'operator@example.com',
    phone: undefined,
    avatar: undefined,
    status: BOOLEAN_VALUE_MAP.TRUE,
    roleIds: [2]
  }
];

export const SYSTEM_USER_PASSWORDS: Record<number, string> = {
  1: 'Admin@123456',
  2: 'Operator@123456'
};

export const SYSTEM_MENUS: SysMenuTreeNode[] = [
  {
    id: 1,
    parentId: 0,
    parentName: null,
    name: '系统管理',
    i18nKey: 'sys.nav.pages.system',
    code: 'management-system',
    category: SYS_MENU_CATEGORY_MAP.DIRECTORY,
    sort: 1,
    status: BOOLEAN_VALUE_MAP.TRUE,
    path: '/view/management/system',
    component: null,
    icon: 'solar:settings-bold-duotone',
    hidden: BOOLEAN_VALUE_MAP.FALSE,
    description: null,
    externalLink: null,
    children: [
      {
        id: 2,
        parentId: 1,
        parentName: '系统管理',
        name: '角色管理',
        i18nKey: 'sys.nav.pages.role',
        code: 'management-system-role',
        category: SYS_MENU_CATEGORY_MAP.MENU,
        sort: 1,
        status: BOOLEAN_VALUE_MAP.TRUE,
        path: '/view/management/system/role',
        component: '/pages/views/management/system/role',
        icon: 'solar:shield-user-bold-duotone',
        hidden: BOOLEAN_VALUE_MAP.FALSE,
        description: null,
        externalLink: null,
        children: []
      },
      {
        id: 3,
        parentId: 1,
        parentName: '系统管理',
        name: '菜单管理',
        i18nKey: 'sys.nav.pages.menu',
        code: 'management-system-menu',
        category: SYS_MENU_CATEGORY_MAP.MENU,
        sort: 2,
        status: BOOLEAN_VALUE_MAP.TRUE,
        path: '/view/management/system/menu',
        component: '/pages/views/management/system/menu',
        icon: 'solar:list-check-bold-duotone',
        hidden: BOOLEAN_VALUE_MAP.FALSE,
        description: null,
        externalLink: null,
        children: []
      },
      {
        id: 4,
        parentId: 1,
        parentName: '系统管理',
        name: '用户管理',
        i18nKey: 'sys.nav.pages.user',
        code: 'management-system-user',
        category: SYS_MENU_CATEGORY_MAP.MENU,
        sort: 3,
        status: BOOLEAN_VALUE_MAP.TRUE,
        path: '/view/management/system/user',
        component: '/pages/views/management/system/user',
        icon: 'solar:user-rounded-bold-duotone',
        hidden: BOOLEAN_VALUE_MAP.FALSE,
        description: null,
        externalLink: null,
        children: []
      }
    ]
  }
];
