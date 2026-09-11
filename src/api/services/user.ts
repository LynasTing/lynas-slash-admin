import type { SysUserListItem, SysUserListPage, SysUserListQuery, SysUserSaveRequest } from '#/system/user';
import apiClient from '@/utils/request';

/**
 * 获取用户列表。
 * @returns 用户列表。
 *
 * Get the user list.
 * @returns User list.
 */
const getUserListApi = (params: SysUserListQuery): Promise<SysUserListPage> =>
  apiClient.get<SysUserListPage>({
    url: '/system/user/list',
    params
  });

/**
 * 创建用户。
 * 请求体使用表单值，其中 roleIds 是表单提交形态；服务端或 mock handler 负责解析为用户实体中的 roles。
 * @param data - 新用户表单提交值。
 * @returns 创建请求 Promise。
 *
 * Creates a user.
 * The request body uses form values where roleIds are the submission shape; the server or mock handler resolves them into entity roles.
 * @param data - Submitted values for the new user form.
 * @returns Create request Promise.
 */
const createUserApi = (data: SysUserSaveRequest): Promise<void> =>
  apiClient.post<void>({
    url: '/system/user/add',
    data
  });

export type DeleteUserPayload = {
  /**
   * 要删除的用户唯一标识。
   *
   * Unique identifier of the user to delete.
   */
  id: number;
};

/**
 * 查询用户详情。
 * @param id - 用户主键 ID。
 * @returns 用户详情。
 *
 * Gets a user detail.
 * @param id - User primary key ID.
 * @returns User detail.
 */
const getUserDetailApi = (id: number): Promise<SysUserListItem> =>
  apiClient.get<SysUserListItem>({
    url: `/system/user/${id}`
  });

/**
 * 删除指定用户。
 * @param data - 仅包含目标用户 ID 的删除请求体。
 * @returns 删除请求 Promise。
 *
 * Deletes a specific user.
 * @param data - Delete request body containing only the target user id.
 * @returns Delete request Promise.
 */
const deleteUserApi = (data: DeleteUserPayload): Promise<void> =>
  apiClient.delete<void>({
    url: `/system/user/${data.id}`
  });

/**
 * 更新用户。
 * 更新与创建共用表单数据结构；是否保留密码等业务规则由服务端或 mock handler 处理。
 * @param data - 编辑后的用户表单提交值。
 * @returns 更新请求 Promise。
 *
 * Updates a user.
 * Update and create share the form payload shape; business rules such as preserving a password are handled by the server or mock handler.
 * @param data - Submitted values from the edited user form.
 * @returns Update request Promise.
 */
const updateUserApi = (id: number, data: SysUserSaveRequest): Promise<void> =>
  apiClient.put<void>({
    url: `/system/user/${id}`,
    data
  });

export { getUserListApi, getUserDetailApi, createUserApi, deleteUserApi, updateUserApi };
