import type { MenuTreeNode } from '#/entity';
import { apiClient } from '@/utils';

export enum MenuApi {
  List = '/system/menu/list',
  Create = '/system/menu/create',
  Update = '/system/menu/update'
}

/**
 * 获取菜单管理列表
 * Get the menu management list
 *
 * @returns 菜单树列表
 * @returns Menu tree list
 */
const getMenuListApi = () =>
  apiClient.get<MenuTreeNode[]>({
    url: MenuApi.List
  });

/**
 * 新增菜单节点
 * Create a menu node
 *
 * @param data 菜单节点
 * @param data Menu node
 * @returns 更新后的菜单树列表
 * @returns Updated menu tree list
 */
const createMenuApi = (data: MenuTreeNode) =>
  apiClient.post<MenuTreeNode[]>({
    url: MenuApi.Create,
    data
  });

/**
 * 更新菜单节点
 * Update a menu node
 *
 * @param data 菜单节点
 * @param data Menu node
 * @returns 更新后的菜单树列表
 * @returns Updated menu tree list
 */
const updateMenuApi = (data: MenuTreeNode) =>
  apiClient.post<MenuTreeNode[]>({
    url: MenuApi.Update,
    data
  });

export { getMenuListApi, createMenuApi, updateMenuApi };
