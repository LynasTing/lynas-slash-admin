import type { User, Role, Permission, MenuTreeNode } from '#/entity';
import { faker } from '@faker-js/faker';
import { BasicStatusEnum, MenuTypeEnum } from '#/enum';
import { mockRoles } from '@/pages/management/system/role/role-mock';

const { GROUP, CATALOGUE, MENU, ACTION } = MenuTypeEnum;

/**
 * 用户表
 * User
 */
export const DB_USER: User[] = [
  {
    id: faker.string.uuid(),
    username: 'Lynas Ting',
    email: 'lynas.ting@slash.com',
    password: faker.internet.password(),
    avatar: faker.image.avatarGitHub(),
    roles: [mockRoles[0]],
    status: BasicStatusEnum.ENABLE
  },
  {
    id: faker.string.uuid(),
    username: 'Ava Chen',
    email: 'ava.chen@slash.com',
    password: faker.internet.password(),
    avatar: faker.image.avatarGitHub(),
    roles: [mockRoles[1]],
    status: BasicStatusEnum.ENABLE
  },
  {
    id: faker.string.uuid(),
    username: 'Noah Williams',
    email: 'noah.williams@slash.com',
    password: faker.internet.password(),
    avatar: faker.image.avatarGitHub(),
    roles: [mockRoles[2], mockRoles[3]],
    status: BasicStatusEnum.ENABLE
  },
  {
    id: faker.string.uuid(),
    username: 'Mia Rodriguez',
    email: 'mia.rodriguez@slash.com',
    password: faker.internet.password(),
    avatar: faker.image.avatarGitHub(),
    roles: [mockRoles[3]],
    status: BasicStatusEnum.ENABLE
  },
  {
    id: faker.string.uuid(),
    username: 'Ethan Kim',
    email: 'ethan.kim@slash.com',
    password: faker.internet.password(),
    avatar: faker.image.avatarGitHub(),
    roles: [mockRoles[4]],
    status: BasicStatusEnum.ENABLE
  },
  {
    id: faker.string.uuid(),
    username: 'Sophia Patel',
    email: 'sophia.patel@slash.com',
    password: faker.internet.password(),
    avatar: faker.image.avatarGitHub(),
    roles: [mockRoles[2]],
    status: BasicStatusEnum.DISABLE
  },
  {
    id: faker.string.uuid(),
    username: 'Liam Johnson',
    email: 'liam.johnson@slash.com',
    password: faker.internet.password(),
    avatar: faker.image.avatarGitHub(),
    roles: [mockRoles[5]],
    status: BasicStatusEnum.DISABLE
  },
  {
    id: faker.string.uuid(),
    username: 'Emma Brown',
    email: 'emma.brown@slash.com',
    password: faker.internet.password(),
    avatar: faker.image.avatarGitHub(),
    roles: [mockRoles[1], mockRoles[4]],
    status: BasicStatusEnum.ENABLE
  }
];

/**
 * 角色表
 * Role
 */
export const DB_ROLE: Role[] = [
  { id: 'role_admin_id', name: 'admin', code: 'SUPER_ADMIN' },
  { id: 'role_test_id', name: 'test', code: 'TEST' }
];

/**
 * 用户角色表
 * User_Role
 */
export const DB_USER_ROLE = [
  { id: 'user_admin_role_admin', userId: 'user_admin_id', roleId: 'role_admin_id' },
  { id: 'user_test_role_test', userId: 'user_test_id', roleId: 'role_test_id' }
];

/**
 * 权限表
 * Permission
 */
export const DB_PERMISSION: Permission[] = [
  { id: 'permission_create', name: 'permission-create', code: 'permission:create' },
  { id: 'permission_read', name: 'permission-read', code: 'permission:read' },
  { id: 'permission_update', name: 'permission-update', code: 'permission:update' },
  { id: 'permission_delete', name: 'permission-delete', code: 'permission:delete' }
];

export const DB_ROLE_PERMISSION = [
  { id: faker.string.uuid(), roleId: 'role_admin_id', permissionId: 'permission_create' },
  { id: faker.string.uuid(), roleId: 'role_admin_id', permissionId: 'permission_read' },
  { id: faker.string.uuid(), roleId: 'role_admin_id', permissionId: 'permission_update' },
  { id: faker.string.uuid(), roleId: 'role_admin_id', permissionId: 'permission_delete' },

  { id: faker.string.uuid(), roleId: 'role_test_id', permissionId: 'permission_read' },
  { id: faker.string.uuid(), roleId: 'role_test_id', permissionId: 'permission_update' }
];

/**
 * 菜单表
 * Menu
 */
export const DB_MENU: MenuTreeNode[] = [
  /** group_dashboard */
  {
    id: 'group_dashboard',
    parentId: '',
    name: 'sys.nav.dashboard',
    label: 'sys.nav.dashboard',
    code: 'group_dashboard',
    type: GROUP,
    route: '/dashboard',
    path: '/dashboard'
  },
  {
    id: 'workbench',
    parentId: 'group_dashboard',
    name: 'sys.nav.workbench',
    label: 'sys.nav.workbench',
    code: 'workbench',
    icon: 'local:ic-workbench',
    type: MENU,
    route: '/workbench',
    path: '/workbench',
    component: '/pages/dashboard/workbench'
  },
  {
    id: 'analysis',
    parentId: 'group_dashboard',
    name: 'sys.nav.analysis',
    label: 'sys.nav.analysis',
    code: 'analysis',
    icon: 'local:ic-analysis',
    type: MENU,
    route: '/analysis',
    path: '/analysis',
    component: '/pages/dashboard/analysis'
  }
];

/**
 * 菜单管理表
 * Menu management table
 */
export const DB_SYSTEM_MENU: MenuTreeNode[] = [
  {
    id: 'dashboard',
    parentId: '',
    name: 'Dashboard',
    label: 'pages.management.system.menu.mock.dashboard',
    type: CATALOGUE,
    route: '/dashboard',
    status: BasicStatusEnum.ENABLE,
    icon: 'solar:home-2-bold-duotone',
    component: '/layout/dashboard',
    children: [
      {
        id: 'workbench',
        parentId: 'dashboard',
        name: 'Workbench',
        label: 'sys.nav.workbench',
        type: MENU,
        route: '/workbench',
        status: BasicStatusEnum.ENABLE,
        icon: 'local:ic-workbench',
        component: '/pages/dashboard/workbench'
      },
      {
        id: 'analysis',
        parentId: 'dashboard',
        name: 'Analysis',
        label: 'sys.nav.analysis',
        type: MENU,
        route: '/analysis',
        status: BasicStatusEnum.DISABLE,
        icon: 'local:ic-analysis',
        component: '/pages/dashboard/analysis'
      }
    ]
  },
  {
    id: 'management',
    parentId: '',
    name: 'Management',
    label: 'sys.nav.pages.management',
    type: CATALOGUE,
    route: '/management',
    status: BasicStatusEnum.ENABLE,
    icon: 'solar:settings-bold-duotone',
    component: '/layout/management',
    children: [
      {
        id: 'user',
        parentId: 'management',
        name: 'User',
        label: 'sys.nav.pages.user',
        type: CATALOGUE,
        route: '/management/user',
        status: BasicStatusEnum.ENABLE,
        icon: 'solar:user-rounded-bold-duotone',
        component: '/layout/management/user',
        children: [
          {
            id: 'user-profile',
            parentId: 'user',
            name: 'Profile',
            label: 'sys.nav.pages.profile',
            type: MENU,
            route: '/management/user/profile',
            status: BasicStatusEnum.ENABLE,
            icon: 'solar:user-id-bold-duotone',
            component: '/pages/management/user/profile'
          },
          {
            id: 'user-account',
            parentId: 'user',
            name: 'Account',
            label: 'pages.management.system.menu.mock.account',
            type: MENU,
            route: '/management/user/account',
            status: BasicStatusEnum.ENABLE,
            icon: 'solar:shield-user-bold-duotone',
            component: '/pages/management/user/account'
          }
        ]
      },
      {
        id: 'system',
        parentId: 'management',
        name: 'System',
        label: 'sys.nav.pages.system',
        type: CATALOGUE,
        route: '/management/system',
        status: BasicStatusEnum.ENABLE,
        icon: 'solar:widget-5-bold-duotone',
        component: '/layout/management/system',
        children: [
          {
            id: 'system-menu',
            parentId: 'system',
            name: 'Menu',
            label: 'sys.nav.pages.menu',
            type: MENU,
            route: '/management/system/menu',
            status: BasicStatusEnum.ENABLE,
            icon: 'solar:list-bold-duotone',
            component: '/pages/management/system/menu',
            children: [
              {
                id: 'system-menu-create',
                parentId: 'system-menu',
                name: 'Create menu',
                label: 'pages.management.system.menu.mock.createMenu',
                type: ACTION,
                route: '/management/system/menu:create',
                status: BasicStatusEnum.ENABLE
              },
              {
                id: 'system-menu-delete',
                parentId: 'system-menu',
                name: 'Delete menu',
                label: 'pages.management.system.menu.mock.deleteMenu',
                type: ACTION,
                route: '/management/system/menu:delete',
                status: BasicStatusEnum.DISABLE
              }
            ]
          }
        ]
      }
    ]
  }
];
