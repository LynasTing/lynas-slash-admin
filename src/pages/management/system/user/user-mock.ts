import { faker } from '@faker-js/faker';
import { BasicStatusEnum } from '#/enum';
import type { UserRoleSummary, UserTableRow } from './types';

/**
 * 用户管理页可分配角色列表。
 * 用于列表展示角色标签，也可复用到新增、编辑用户表单的角色下拉选项。
 *
 * Assignable role list for the user management page.
 * Used for role badges in the table and can also feed role options in create/edit user forms.
 */
export const mockUserRoles: UserRoleSummary[] = [
  {
    id: 'role-super-admin',
    name: 'Super Admin',
    code: 'SUPER_ADMIN',
    status: BasicStatusEnum.ENABLE,
    desc: 'Full access to all platform configuration, security, and audit features'
  },
  {
    id: 'role-system-admin',
    name: 'System Admin',
    code: 'SYSTEM_ADMIN',
    status: BasicStatusEnum.ENABLE,
    desc: 'Manage users, roles, menus, and daily system configuration'
  },
  {
    id: 'role-content-operator',
    name: 'Content Operator',
    code: 'CONTENT_OPERATOR',
    status: BasicStatusEnum.ENABLE,
    desc: 'Maintain content, review submitted materials, and handle publishing workflows'
  },
  {
    id: 'role-data-analyst',
    name: 'Data Analyst',
    code: 'DATA_ANALYST',
    status: BasicStatusEnum.ENABLE,
    desc: 'View dashboards, export reports, and inspect operational metrics'
  },
  {
    id: 'role-support-agent',
    name: 'Support Agent',
    code: 'SUPPORT_AGENT',
    status: BasicStatusEnum.ENABLE,
    desc: 'Handle customer tickets and access limited user profile information'
  },
  {
    id: 'role-read-only',
    name: 'Read Only',
    code: 'READ_ONLY',
    status: BasicStatusEnum.DISABLE,
    desc: 'View management data without permission to create, edit, or delete records'
  }
];

/**
 * 用户管理页列表数据。
 * 用于驱动用户表格、详情跳转和编辑弹窗回填，字段结构对齐页面级 UserTableRow。
 *
 * User list data for the user management page.
 * Used to drive the user table, detail navigation, and edit modal prefilling with the page-level UserTableRow shape.
 */
export const mockUsers: UserTableRow[] = [
  {
    id: 'user-lynas-ting',
    username: 'Lynas Ting',
    email: 'lynas.ting@slash.com',
    avatar: faker.image.avatarGitHub(),
    role: mockUserRoles[0],
    status: BasicStatusEnum.ENABLE,
    createdAt: '2026-01-08 09:24:00',
    updatedAt: '2026-07-02 14:18:00'
  },
  {
    id: 'user-ava-chen',
    username: 'Ava Chen',
    email: 'ava.chen@slash.com',
    avatar: faker.image.avatarGitHub(),
    role: mockUserRoles[1],
    status: BasicStatusEnum.ENABLE,
    createdAt: '2026-01-19 11:36:00',
    updatedAt: '2026-06-27 16:05:00'
  },
  {
    id: 'user-noah-williams',
    username: 'Noah Williams',
    email: 'noah.williams@slash.com',
    avatar: faker.image.avatarGitHub(),
    role: mockUserRoles[2],
    status: BasicStatusEnum.ENABLE,
    createdAt: '2026-02-03 15:42:00',
    updatedAt: '2026-06-30 10:31:00'
  },
  {
    id: 'user-mia-rodriguez',
    username: 'Mia Rodriguez',
    email: 'mia.rodriguez@slash.com',
    avatar: faker.image.avatarGitHub(),
    role: mockUserRoles[3],
    status: BasicStatusEnum.ENABLE,
    createdAt: '2026-02-18 08:15:00',
    updatedAt: '2026-06-18 13:44:00'
  },
  {
    id: 'user-ethan-kim',
    username: 'Ethan Kim',
    email: 'ethan.kim@slash.com',
    avatar: faker.image.avatarGitHub(),
    role: mockUserRoles[4],
    status: BasicStatusEnum.ENABLE,
    createdAt: '2026-03-07 13:26:00',
    updatedAt: '2026-06-25 09:12:00'
  },
  {
    id: 'user-sophia-patel',
    username: 'Sophia Patel',
    email: 'sophia.patel@slash.com',
    avatar: faker.image.avatarGitHub(),
    role: mockUserRoles[3],
    status: BasicStatusEnum.DISABLE,
    createdAt: '2026-03-21 17:50:00',
    updatedAt: '2026-05-29 12:08:00'
  },
  {
    id: 'user-liam-johnson',
    username: 'Liam Johnson',
    email: 'liam.johnson@slash.com',
    avatar: faker.image.avatarGitHub(),
    role: mockUserRoles[5],
    status: BasicStatusEnum.DISABLE,
    createdAt: '2026-04-09 10:03:00',
    updatedAt: '2026-05-14 18:22:00'
  },
  {
    id: 'user-emma-brown',
    username: 'Emma Brown',
    email: 'emma.brown@slash.com',
    avatar: faker.image.avatarGitHub(),
    role: mockUserRoles[2],
    status: BasicStatusEnum.ENABLE,
    createdAt: '2026-04-26 14:37:00',
    updatedAt: '2026-06-22 11:19:00'
  }
];
