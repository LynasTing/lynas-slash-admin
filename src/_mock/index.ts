import { signIn, signUp, mockTokenExpired } from './handlers/_auth';
import { getMenuList, createMenu, updateMenu } from './handlers/_menu';
import { getRoleList, createRole, updateRole, deleteRole } from './handlers/_role';
import { getUserList, createUser, deleteUser, updateUser } from './handlers/_user';
import { setupWorker } from 'msw/browser';

const handles = [
  signIn,
  signUp,
  mockTokenExpired,
  getMenuList,
  createMenu,
  updateMenu,
  getRoleList,
  createRole,
  updateRole,
  deleteRole,
  getUserList,
  createUser,
  deleteUser,
  updateUser
];
const worker = setupWorker(...handles);

export { worker };
