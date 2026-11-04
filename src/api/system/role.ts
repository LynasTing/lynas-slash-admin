import apiClient from '@/utils/request';
import type { SysRoleDetail, SysRoleListPage, SysRoleListQuery, SysRoleOption, SysRoleSaveRequest } from '#/system/role';

/**
 * 查询角色分页列表
 *
 * Gets a paginated role list
 *
 * @param params - 角色列表查询条件 / Role list query parameters
 * @returns 角色分页结果 / Paginated role results
 */
export const getRoleListApi = (params: SysRoleListQuery): Promise<SysRoleListPage> =>
  apiClient.get<SysRoleListPage>({
    url: '/system/role/list',
    params
  });

/**
 * 查询全部角色下拉选项
 *
 * Gets all role options for selection
 *
 * @returns 角色选项列表 / Role option list
 */
export const getRoleOptionsApi = (): Promise<SysRoleOption[]> =>
  apiClient.get<SysRoleOption[]>({
    url: '/system/role/options'
  });

/**
 * 查询角色详情及其已授权菜单
 *
 * Gets role details and its authorized menus
 *
 * @param id - 角色主键 ID / Role primary key ID
 * @returns 角色详情 / Role details
 */
export const getRoleDetailApi = (id: number): Promise<SysRoleDetail> =>
  apiClient.get<SysRoleDetail>({
    url: `/system/role/${id}`
  });

/**
 * 新增角色及其菜单授权
 *
 * Creates a role and its menu authorization
 *
 * @param data - 角色保存参数 / Role save request
 * @returns Resolves without a response payload
 */
export const createRoleApi = (data: SysRoleSaveRequest): Promise<void> =>
  apiClient.post<void>({
    url: '/system/role/add',
    data
  });

/**
 * 更新角色及其菜单授权
 *
 * Updates a role and its menu authorization
 *
 * @param id - 角色主键 ID / Role primary key ID
 * @param data - 角色保存参数 / Role save request
 * @returns Resolves without a response payload
 */
export const updateRoleApi = (id: number, data: SysRoleSaveRequest): Promise<void> =>
  apiClient.put<void>({
    url: `/system/role/${id}`,
    data
  });

/**
 * 删除指定角色
 *
 * Deletes a specific role
 *
 * @param id - 角色主键 ID / Role primary key ID
 * @returns Resolves without a response payload
 */
export const deleteRoleApi = (id: number): Promise<void> =>
  apiClient.delete<void>({
    url: `/system/role/${id}`
  });
