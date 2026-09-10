import apiClient from '@/utils/request';
import type { SysRoleDetail, SysRoleListPage, SysRoleListQuery, SysRoleOption, SysRoleSaveRequest } from '#/system/role';

/**
 * 角色接口地址集合。
 *
 * Role API endpoint map.
 */
export const ROLE_API_MAP = {
  LIST: '/system/role/list',
  OPTIONS: '/system/role/options',
  CREATE: '/system/role/add',
  DETAIL: '/system/role',
  UPDATE: '/system/role',
  DELETE: '/system/role'
} as const;

/**
 * 获取角色列表。
 * @returns 角色列表。
 *
 * Get the role list.
 * @returns Role list.
 */
const getRoleListApi = (params: SysRoleListQuery): Promise<SysRoleListPage> =>
  apiClient.get<SysRoleListPage>({
    url: ROLE_API_MAP.LIST,
    params
  });

/**
 * 获取全部角色下拉选项。
 * 用于表单选择，接口不接收分页参数。
 * @returns 角色下拉选项。
 *
 * Get all role select options.
 * Used by forms and does not accept pagination parameters.
 * @returns Role select options.
 */
const getRoleOptionsApi = (): Promise<SysRoleOption[]> =>
  apiClient.get<SysRoleOption[]>({
    url: ROLE_API_MAP.OPTIONS
  });

/**
 * 查询角色详情。
 * 用于编辑时回显基础字段和已授权菜单 ID。
 * @param id - 角色 ID。
 * @returns 角色详情。
 *
 * Get role detail.
 * Used to restore the base fields and authorized menu IDs when editing.
 * @param id - Role ID.
 * @returns Role detail.
 */
const getRoleDetailApi = (id: number): Promise<SysRoleDetail> =>
  apiClient.get<SysRoleDetail>({
    url: `${ROLE_API_MAP.DETAIL}/${id}`
  });

/**
 * 创建角色，写入完成后由页面重新查询服务端数据
 * @param data - 角色字段与菜单授权
 *
 * Create a role before the page reloads server data
 * @param data - Role fields and menu authorization
 * @returns Resolves without a response payload
 */
const createRoleApi = (data: SysRoleSaveRequest): Promise<void> =>
  apiClient.post<void>({
    url: ROLE_API_MAP.CREATE,
    data
  });

/**
 * 更新角色。
 * @param id - 角色 ID
 * @param data - 角色数据
 *
 * Update a role.
 * @param id - Role ID
 * @param data - Role payload
 * @returns No payload.
 */
const updateRoleApi = (id: number, data: SysRoleSaveRequest): Promise<void> =>
  apiClient.put<void>({
    url: `${ROLE_API_MAP.UPDATE}/${id}`,
    data
  });

/**
 * 删除角色。
 * @param id - 角色 ID。
 *
 * Delete a role.
 * @param id - Role id.
 * @returns No payload.
 */
const deleteRoleApi = (id: number): Promise<void> =>
  apiClient.delete<void>({
    url: `${ROLE_API_MAP.DELETE}/${id}`
  });

export { createRoleApi, deleteRoleApi, getRoleDetailApi, getRoleListApi, getRoleOptionsApi, updateRoleApi };
