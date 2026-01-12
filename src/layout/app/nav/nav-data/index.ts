import { checkAny } from '@/utils';
import type { NavItemDataProps } from '@/components/nav/types';
import { GLOBAL_CONFIG } from '@/config/global';
import { backendNavData } from './backend';
import { frontendNavData } from './frontend';
import { useUserPermissions } from '@/store/user';
import { useMemo } from 'react';

/**
 * 递归处理导航数据，过滤掉没有权限的
 * @param items 导航项目数组
 * @param permissions 权限列表
 * @returns 过滤后的导航项目数组
 *
 * Recursively process navigation data and filter out those without permissions
 * @param items Navigation item array
 * @param permissions Permission list
 * @returns Filtered navigation item array
 */
const filterItems = (items: NavItemDataProps[], permissions: string[]) => {
  return items.filter(item => {
    /**
     * 检查当前项目是否有权限
     * Check if the current item has permission
     */
    const hasPermission = item.auth ? checkAny(item.auth, permissions) : true;

    /**
     * 如果有子项目，需要递归处理
     * If there are child items, recursively process
     */
    if (item.children?.length) {
      const found = filterItems(item.children, permissions);

      /**
       * 如果整个子项目都被过滤掉了，则过滤掉当前项目
       * If all child items are filtered out, filter out the current item
       */
      if (!found.length) {
        return false;
      }

      /**
       * 更新子项目
       * Update child items
       */
      item.children = found;
    }

    return hasPermission;
  });
};

const navData = GLOBAL_CONFIG.routerMode === 'backend' ? backendNavData : frontendNavData;

/**
 * 根据权限过滤导航数据
 * @param permissions 权限列表
 * @returns 过滤后的导航数据
 *
 * Filter navigation data based on permissions
 * @param permissions Permission list
 * @returns Filtered navigation data
 */
const filterNavData = (permissions: string[]) => {
  return (
    navData
      .map(group => {
        /**
         * 过滤组内每项
         * Filter each item in the group
         */
        const filteredItems = filterItems(group.items, permissions);

        /**
         * 如果组内没有项目了，返回 null
         * 为什么不返回空数组？
         * - 页面会渲染空白标题等
         *
         * If there are no items in the group, return null
         * Why not return an empty array?
         * - The page will render blank titles, etc
         */
        if (!filterItems.length) {
          return null;
        }

        /**
         * 返回过滤后的组
         * Return the filtered group
         */
        return {
          ...group,
          items: filteredItems
        };
      })
      /**
       * 过滤空数组
       * NonNullable 会过滤掉 null 和 undefined
       *
       * Filter empty arrays
       * NonNullable will filter out null and undefined
       */
      .filter((i): i is NonNullable<typeof i> => i !== null)
  );
};

/**
 * 使用 code 拿到菜单数据
 * Get menu data using code
 */
export const useFilteredNavData = () => {
  /**
   * 拿到登录用户的权限
   * Get the permissions of the logged-in user
   */
  const permissions = useUserPermissions();
  /**
   * 提取权限数组中的 code
   * Extract the code from the permission array
   */
  const permissionCodes = useMemo(() => permissions.map(i => i.code), [permissions]);
  /**
   * 使用 code 拿到菜单数据
   * Get menu data using code
   */
  const filteredNavData = useMemo(() => filterNavData(permissionCodes), [permissionCodes]);
  /**
   * 返回过滤后的菜单数据
   * Return the filtered menu data
   */
  return filteredNavData;
};
