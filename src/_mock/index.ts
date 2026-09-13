import { signIn, signUp, mockTokenExpired } from './handlers/_auth';
import { getMenuList, createMenu, updateMenu, deleteMenu } from './handlers/_menu';
import { getRoleList, getRoleOptions, getRoleDetail, createRole, updateRole, deleteRole } from './handlers/_role';
import { getUserList, getUserDetail, createUser, updateUser, deleteUser } from './handlers/_user';
import { setupWorker } from 'msw/browser';

const handles = [
  signIn,
  signUp,
  mockTokenExpired,
  getMenuList,
  createMenu,
  updateMenu,
  deleteMenu,
  getRoleList,
  getRoleOptions,
  getRoleDetail,
  createRole,
  updateRole,
  deleteRole,
  getUserList,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser
];
const worker = setupWorker(...handles);

export { worker };
