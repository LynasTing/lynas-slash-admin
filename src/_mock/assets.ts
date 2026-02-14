import { faker } from '@faker-js/faker';
import { BasicStatusEnum } from '#/enum';

/**
 * User role mock
 */
const ADMIN_ROLE = {
  id: faker.string.uuid(),
  name: 'Admin',
  label: 'admin',
  status: BasicStatusEnum.ENABLE,
  order: 1,
  desc: 'Super Admin',
  permission: []
};

/**
 * User data mock
 */
export const DEFAULT_USER = {
  id: faker.string.uuid(),
  username: 'admin',
  email: 'admin@slash.com',
  avatar: faker.image.avatarGitHub(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  password: 'demo1234',
  role: ADMIN_ROLE,
  permissions: ADMIN_ROLE.permission
};

/**
 * User list mock
 */
export const USER_LIST = [DEFAULT_USER];
