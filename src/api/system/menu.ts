import apiClient from '@/utils/request';
import type { SysMenuSaveRequest, SysMenuTreeNode } from '#/system/menu';

/**
 * 获取菜单管理树
 * 后端直接返回递归 children，前端不得再按分页结果拼接树结构
 *
 * Get the menu management tree
 * The backend returns recursive children directly, so the frontend must not reconstruct a tree from paged results
 *
 * @returns 菜单树节点列表 / Menu tree nodes
 */
export const getSysMenuListApi = (): Promise<SysMenuTreeNode[]> =>
  apiClient.get<SysMenuTreeNode[]>({
    url: '/system/menu/list'
  });

/**
 * 新增菜单节点
 * 创建成功后不使用接口返回值，由页面重新加载服务端菜单树
 *
 * Creates a menu node
 * The page reloads the server menu tree after a successful creation instead of using a response payload
 *
 * @param data - 菜单新增参数 / Menu creation payload
 * @returns Resolves without a response payload
 */
export const createSysMenuApi = (data: SysMenuSaveRequest): Promise<void> =>
  apiClient.post<void>({
    url: '/system/menu/add',
    data
  });

/**
 * 修改系统菜单节点
 * 修改成功后不使用接口返回值，由页面重新加载服务端菜单树
 *
 * Updates a system menu node
 * The page reloads the server menu tree after a successful update instead of using a response payload
 *
 * @param id - 菜单节点 ID / Menu node ID
 * @param data - 菜单修改参数 / Menu update payload
 * @returns Resolves without a response payload
 */
export const updateSysMenuApi = (id: number, data: SysMenuSaveRequest): Promise<void> =>
  apiClient.put<void>({
    url: `/system/menu/${id}`,
    data
  });

/**
 * 删除系统菜单节点
 * 删除成功后不使用接口返回值，由页面重新加载服务端菜单树
 *
 * Deletes a system menu node
 * The page reloads the server menu tree after a successful deletion instead of using a response payload
 *
 * @param id - 菜单节点 ID / Menu node ID
 * @returns Resolves without a response payload
 */
export const deleteSysMenuApi = (id: number): Promise<void> =>
  apiClient.delete<void>({
    url: `/system/menu/${id}`
  });
