import type { Role } from '#/entity';
import { BasicStatusEnum } from '#/enum';

export const mockRoles: Role[] = [
  {
    id: 'role-super-admin',
    name: 'Super Admin',
    code: 'SUPER_ADMIN',
    status: BasicStatusEnum.ENABLE,
    order: 1,
    desc: 'Full access to all platform configuration, security, and audit features',
    menus: []
  },
  {
    id: 'role-system-admin',
    name: 'System Admin',
    code: 'SYSTEM_ADMIN',
    status: BasicStatusEnum.ENABLE,
    order: 2,
    desc: 'Manage users, roles, menus, and daily system configuration',
    menus: []
  },
  {
    id: 'role-content-operator',
    name: 'Content Operator',
    code: 'CONTENT_OPERATOR',
    status: BasicStatusEnum.ENABLE,
    order: 3,
    desc: 'Maintain content, review submitted materials, and handle publishing workflows',
    menus: []
  },
  {
    id: 'role-data-analyst',
    name: 'Data Analyst',
    code: 'DATA_ANALYST',
    status: BasicStatusEnum.ENABLE,
    order: 4,
    desc: 'View dashboards, export reports, and inspect operational metrics',
    menus: []
  },
  {
    id: 'role-support-agent',
    name: 'Support Agent',
    code: 'SUPPORT_AGENT',
    status: BasicStatusEnum.ENABLE,
    order: 5,
    desc: 'Handle customer tickets and access limited user profile information',
    menus: []
  },
  {
    id: 'role-read-only',
    name: 'Read Only',
    code: 'READ_ONLY',
    status: BasicStatusEnum.DISABLE,
    order: 6,
    desc: 'View management data without permission to create, edit, or delete records',
    menus: []
  },
  {
    id: 'role-guest-reviewer',
    name: 'Guest Reviewer',
    code: 'GUEST_REVIEWER',
    status: BasicStatusEnum.DISABLE,
    order: 7,
    desc: 'Temporary review role reserved for external collaborators',
    menus: []
  }
];
