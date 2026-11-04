import type { SysUserListItem, SysUserListPage, SysUserListQuery, SysUserSaveRequest } from '#/system/user';
import apiClient from '@/utils/request';

/**
 * 查询用户分页列表
 *
 * Gets a paginated user list
 *
 * @param params - 用户列表查询条件 / User list query parameters
 * @returns 用户分页结果 / Paginated user results
 */
export const getUserListApi = (params: SysUserListQuery): Promise<SysUserListPage> =>
  apiClient.get<SysUserListPage>({
    url: '/system/user/list',
    params
  });

/**
 * 查询指定用户详情
 *
 * Gets details for a specific user
 *
 * @param id - 用户主键 ID / User primary key ID
 * @returns 用户详情 / User details
 */
export const getUserDetailApi = (id: number): Promise<SysUserListItem> =>
  apiClient.get<SysUserListItem>({
    url: `/system/user/${id}`
  });

/**
 * 新增系统用户
 *
 * Creates a system user
 *
 * @param data - 用户保存参数 / User save request
 * @returns Resolves without a response payload
 */
export const createUserApi = (data: SysUserSaveRequest): Promise<void> =>
  apiClient.post<void>({
    url: '/system/user/add',
    data
  });

/**
 * 删除指定用户
 *
 * Deletes a specific user
 *
 * @param id - 用户主键 ID / User primary key ID
 * @returns Resolves without a response payload
 */
export const deleteUserApi = (id: number): Promise<void> =>
  apiClient.delete<void>({
    url: `/system/user/${id}`
  });

/**
 * 更新指定用户
 *
 * Updates a specific user
 *
 * @param id - 用户主键 ID / User primary key ID
 * @param data - 用户保存参数 / User save request
 * @returns Resolves without a response payload
 */
export const updateUserApi = (id: number, data: SysUserSaveRequest): Promise<void> =>
  apiClient.put<void>({
    url: `/system/user/${id}`,
    data
  });
