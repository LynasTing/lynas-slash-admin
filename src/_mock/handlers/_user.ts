import { delay, http, HttpResponse } from 'msw';
import { GLOBAL_CONFIG } from '@/config/global';
import { ResultStatusEnum } from '#/enum';
import type { SysUserListItem, SysUserSaveRequest } from '#/system/user';
import { SYSTEM_USER_API_MAP as USER_API } from '@/api/services/user';
import { SYSTEM_ROLE_OPTIONS, SYSTEM_USER_PASSWORDS, SYSTEM_USERS } from '../system-data';

const userStore: SysUserListItem[] = structuredClone(SYSTEM_USERS);
const passwords: Record<number, string> = { ...SYSTEM_USER_PASSWORDS };
let nextUserId = Math.max(...userStore.map(user => user.id)) + 1;

const cloneUser = (user: SysUserListItem): SysUserListItem => structuredClone(user);
const findUser = (id: number): SysUserListItem | undefined => userStore.find(user => user.id === id);
const hasDuplicate = (field: 'username' | 'email', value: string, id?: number): boolean =>
  userStore.some(user => user.id !== id && user[field].trim().toUpperCase() === value.trim().toUpperCase());

const getUserList = http.get(GLOBAL_CONFIG.apiBaseUrl + USER_API.LIST, async ({ request }) => {
  await delay(100);
  const url = new URL(request.url);
  const pageNum = Number(url.searchParams.get('pageNum') ?? 1);
  const pageSize = Number(url.searchParams.get('pageSize') ?? 10);
  const start = (pageNum - 1) * pageSize;
  return HttpResponse.json({
    code: ResultStatusEnum.SUCCESS,
    message: '',
    data: { records: userStore.slice(start, start + pageSize).map(cloneUser), total: userStore.length }
  });
});

const getUserDetail = http.get(`${GLOBAL_CONFIG.apiBaseUrl}${USER_API.RESOURCE}/:id`, async ({ params }) => {
  await delay(100);
  const user = findUser(Number(params.id));
  if (!user) return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'User not found', data: null }, { status: 404 });
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: cloneUser(user) });
});

const resolveRoleIds = (roleIds: number[]): boolean => roleIds.every(id => SYSTEM_ROLE_OPTIONS.some(role => role.id === id));

const createUser = http.post(GLOBAL_CONFIG.apiBaseUrl + USER_API.CREATE, async ({ request }) => {
  await delay(100);
  const value = (await request.json()) as SysUserSaveRequest;
  if (hasDuplicate('username', value.username) || hasDuplicate('email', value.email) || !resolveRoleIds(value.roleIds)) {
    return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'Invalid or duplicate user data', data: null }, { status: 409 });
  }
  const user: SysUserListItem = { id: nextUserId++, ...value, nickname: value.nickname ?? null, roleIds: [...value.roleIds] };
  userStore.push(user);
  passwords[user.id] = value.password;
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: null });
});

const updateUser = http.put(`${GLOBAL_CONFIG.apiBaseUrl}${USER_API.RESOURCE}/:id`, async ({ params, request }) => {
  await delay(100);
  const id = Number(params.id);
  const target = findUser(id);
  if (!target) return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'User not found', data: null }, { status: 404 });
  const value = (await request.json()) as SysUserSaveRequest;
  if (hasDuplicate('username', value.username, id) || hasDuplicate('email', value.email, id) || !resolveRoleIds(value.roleIds)) {
    return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'Invalid or duplicate user data', data: null }, { status: 409 });
  }
  Object.assign(target, { ...value, nickname: value.nickname ?? null, roleIds: [...value.roleIds] });
  if (value.password) passwords[id] = value.password;
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: null });
});

const deleteUser = http.delete(`${GLOBAL_CONFIG.apiBaseUrl}${USER_API.RESOURCE}/:id`, async ({ params }) => {
  await delay(100);
  const id = Number(params.id);
  const index = userStore.findIndex(user => user.id === id);
  if (index < 0) return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'User not found', data: null }, { status: 404 });
  userStore.splice(index, 1);
  delete passwords[id];
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: null });
});

export { createUser, deleteUser, getUserDetail, getUserList, updateUser };
