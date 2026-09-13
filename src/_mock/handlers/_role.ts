import { delay, http, HttpResponse } from 'msw';
import { GLOBAL_CONFIG } from '@/config/global';
import { ResultStatusEnum } from '#/enum';
import type { SysRoleDetail, SysRoleListItem, SysRoleListQuery, SysRoleOption, SysRoleSaveRequest } from '#/system/role';
import { ROLE_API_MAP } from '@/api/services/role';
import { SYSTEM_ROLE_MENU_IDS, SYSTEM_ROLES } from '../system-data';

const roleStore: SysRoleListItem[] = structuredClone(SYSTEM_ROLES);
const roleMenuStore: Record<number, number[]> = structuredClone(SYSTEM_ROLE_MENU_IDS);
let nextRoleId = Math.max(...roleStore.map(role => role.id)) + 1;

const cloneRole = (role: SysRoleListItem): SysRoleListItem => structuredClone(role);
const roleOptions = (): SysRoleOption[] => roleStore.map(({ id, name, code, sort, status }) => ({ id, name, code, sort, status }));

const findRole = (id: number): SysRoleListItem | undefined => roleStore.find(role => role.id === id);
const hasDuplicateCode = (code: string, id?: number): boolean =>
  roleStore.some(role => role.id !== id && role.code.trim().toUpperCase() === code.trim().toUpperCase());

const getRoleList = http.get(GLOBAL_CONFIG.apiBaseUrl + ROLE_API_MAP.LIST, async ({ request }) => {
  await delay(100);
  const url = new URL(request.url);
  const query: SysRoleListQuery = {
    pageNum: Number(url.searchParams.get('pageNum') ?? 1),
    pageSize: Number(url.searchParams.get('pageSize') ?? 10),
    name: url.searchParams.get('name') || undefined,
    code: url.searchParams.get('code') || undefined,
    status: url.searchParams.has('status') ? (Number(url.searchParams.get('status')) as SysRoleListQuery['status']) : undefined
  };
  const filtered = roleStore.filter(role => {
    const matchesName = !query.name || role.name.toLowerCase().includes(query.name.toLowerCase());
    const matchesCode = !query.code || role.code.toLowerCase().includes(query.code.toLowerCase());
    const matchesStatus = query.status === undefined || role.status === query.status;
    return matchesName && matchesCode && matchesStatus;
  });
  const start = (query.pageNum - 1) * query.pageSize;
  return HttpResponse.json({
    code: ResultStatusEnum.SUCCESS,
    message: '',
    data: { records: filtered.slice(start, start + query.pageSize).map(cloneRole), total: filtered.length }
  });
});

const getRoleOptions = http.get(GLOBAL_CONFIG.apiBaseUrl + ROLE_API_MAP.OPTIONS, async () => {
  await delay(100);
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: roleOptions() });
});

const getRoleDetail = http.get(`${GLOBAL_CONFIG.apiBaseUrl}${ROLE_API_MAP.DETAIL}/:id`, async ({ params }) => {
  await delay(100);
  const role = findRole(Number(params.id));
  if (!role) return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'Role not found', data: null }, { status: 404 });
  const data: SysRoleDetail = { ...cloneRole(role), menuIds: [...(roleMenuStore[role.id] ?? [])] };
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data });
});

const createRole = http.post(GLOBAL_CONFIG.apiBaseUrl + ROLE_API_MAP.CREATE, async ({ request }) => {
  await delay(100);
  const value = (await request.json()) as SysRoleSaveRequest;
  if (hasDuplicateCode(value.code)) {
    return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'Role code already exists', data: null }, { status: 409 });
  }
  const role: SysRoleListItem = { id: nextRoleId++, ...value, description: value.description ?? null };
  roleStore.push(role);
  roleMenuStore[role.id] = [...value.menuIds];
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: null });
});

const updateRole = http.put(`${GLOBAL_CONFIG.apiBaseUrl}${ROLE_API_MAP.UPDATE}/:id`, async ({ params, request }) => {
  await delay(100);
  const id = Number(params.id);
  const target = findRole(id);
  if (!target) return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'Role not found', data: null }, { status: 404 });
  const value = (await request.json()) as SysRoleSaveRequest;
  if (hasDuplicateCode(value.code, id)) {
    return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'Role code already exists', data: null }, { status: 409 });
  }
  Object.assign(target, { ...value, description: value.description ?? null });
  roleMenuStore[id] = [...value.menuIds];
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: null });
});

const deleteRole = http.delete(`${GLOBAL_CONFIG.apiBaseUrl}${ROLE_API_MAP.DELETE}/:id`, async ({ params }) => {
  await delay(100);
  const id = Number(params.id);
  const index = roleStore.findIndex(role => role.id === id);
  if (index < 0) return HttpResponse.json({ code: ResultStatusEnum.ERROR, message: 'Role not found', data: null }, { status: 404 });
  roleStore.splice(index, 1);
  delete roleMenuStore[id];
  return HttpResponse.json({ code: ResultStatusEnum.SUCCESS, message: '', data: null });
});

export { createRole, deleteRole, getRoleDetail, getRoleList, getRoleOptions, updateRole };
