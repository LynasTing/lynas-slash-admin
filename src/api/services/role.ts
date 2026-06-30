import type { Role } from '#/entity';
import { apiClient } from '@/utils';

/**
 * 角色接口地址集合。
 *
 * Role API endpoint map.
 */
export const ROLE_API_MAP = {
  LIST: '/system/role/list',
  CREATE: '/system/role/create',
  UPDATE: '/system/role/update',
  DELETE: '/system/role/delete'
} as const;

/**
 * 获取角色列表。
 * @returns 角色列表。
 *
 * Get the role list.
 * @returns Role list.
 */
const getRoleListApi = () =>
  apiClient.get<Role[]>({
    url: ROLE_API_MAP.LIST
  });

/**
 * 新增角色。
 * @param data - 角色数据。
 * @returns 更新后的角色列表。
 *
 * Create a role.
 * @param data - Role payload.
 * @returns Updated role list.
 */
const createRoleApi = (data: Role) =>
  apiClient.post<Role[]>({
    url: ROLE_API_MAP.CREATE,
    data
  });

/**
 * 更新角色。
 * @param data - 角色数据。
 * @returns 更新后的角色列表。
 *
 * Update a role.
 * @param data - Role payload.
 * @returns Updated role list.
 */
const updateRoleApi = (data: Role) =>
  apiClient.post<Role[]>({
    url: ROLE_API_MAP.UPDATE,
    data
  });

/**
 * 删除角色。
 * @param id - 角色 ID。
 * @returns 更新后的角色列表。
 *
 * Delete a role.
 * @param id - Role id.
 * @returns Updated role list.
 */
const deleteRoleApi = (id: string) =>
  apiClient.post<Role[]>({
    url: ROLE_API_MAP.DELETE,
    data: { id }
  });

export { createRoleApi, deleteRoleApi, getRoleListApi, updateRoleApi };
