import type { User } from '#/entity';
import { apiClient } from '@/utils';
import type { UserFormValues } from '@/pages/management/system/user/types';

/**
 * 用户管理接口地址。
 * 统一维护路径，避免页面、mock handler 和服务层各自书写字符串后发生漂移。
 *
 * User management API endpoints.
 * Paths are centralized so pages, mock handlers, and the service layer cannot drift through separately written string literals.
 */
export const USER_API_MAP = {
  LIST: '/system/user/list',
  CREATE: '/system/user/create',
  DELETE: '/system/user/delete',
  UPDATE: '/system/user/update'
} as const;

/**
 * 获取用户列表。
 * @returns 用户列表。
 *
 * Get the user list.
 * @returns User list.
 */
const getUserListApi = () =>
  apiClient.get<User[]>({
    url: USER_API_MAP.LIST
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
const createUserApi = (data: UserFormValues) =>
  apiClient.post({
    url: USER_API_MAP.CREATE,
    data
  });

export type DeleteUserPayload = {
  /**
   * 要删除的用户唯一标识。
   *
   * Unique identifier of the user to delete.
   */
  id: User['id'];
};

/**
 * 删除指定用户。
 * @param data - 仅包含目标用户 ID 的删除请求体。
 * @returns 删除请求 Promise。
 *
 * Deletes a specific user.
 * @param data - Delete request body containing only the target user id.
 * @returns Delete request Promise.
 */
const deleteUserApi = (data: DeleteUserPayload) =>
  apiClient.delete({
    url: USER_API_MAP.DELETE,
    data
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
const updateUserApi = (data: UserFormValues) =>
  apiClient.put({
    url: USER_API_MAP.UPDATE,
    data
  });

export { getUserListApi, createUserApi, deleteUserApi, updateUserApi };
