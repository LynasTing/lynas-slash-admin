import { checkAny } from '@/utils';
import type { NavItemDataProps } from '@/components/nav/types';
import { GLOBAL_CONFIG } from '@/config/global';
import { backendNavData } from './backend';
import { createFrontendNavData } from '@/router/navigation/create-frontend-nav-data';
import { protectedRoutes } from '@/router/sections/protected/routes';
import { createNavBadgeInfo } from '../nav-badges';
import { useNavBadgeValues } from '../nav-badge-values';
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
export const filterNavItems = (items: NavItemDataProps[], permissions: string[]): NavItemDataProps[] => {
  return items.flatMap(item => {
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
      const children = filterNavItems(item.children, permissions);

      /**
       * 如果整个子项目都被过滤掉了，则过滤掉当前项目
       * If all child items are filtered out, filter out the current item
       */
      if (!children.length) {
        return [];
      }

      return hasPermission ? [{ ...item, children }] : [];
    }

    return hasPermission ? [item] : [];
  });
};

/**
 * 按当前路由模式返回导航数据源。
 * @returns 当前模式下未经权限筛选的导航树。
 *
 * Returns the navigation data source for the active router mode.
 * @returns Navigation tree before permission filtering for the active mode.
 */
export const getNavDataByRouterMode = () =>
  GLOBAL_CONFIG.routerMode === 'backend' ? backendNavData : createFrontendNavData(protectedRoutes);

/**
 * 根据权限过滤导航数据
 * @param permissions 权限列表
 * @returns 过滤后的导航数据
 *
 * Filter navigation data based on permissions
 * @param permissions Permission list
 * @returns Filtered navigation data
 */
export const filterNavData = (permissions: string[]) => {
  const navData = getNavDataByRouterMode();
  return (
    navData
      .map(group => {
        /**
         * 过滤组内每项
         * Filter each item in the group
         */
        const filteredItems = filterNavItems(group.items, permissions);

        /**
         * 如果组内没有项目了，返回 null
         * 为什么不返回空数组？
         * - 页面会渲染空白标题等
         *
         * If there are no items in the group, return null
         * Why not return an empty array?
         * - The page will render blank titles, etc
         */
        if (!filteredItems.length) {
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
 * 根据权限过滤导航数据
 * @returns 过滤后的导航数据
 *
 * Filter navigation data based on permissions
 * @returns Filtered navigation data
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
  const badgeValues = useNavBadgeValues();
  /**
   * 使用 code 拿到菜单数据
   * Get menu data using code
   */
  const filteredNavData = useMemo(() => {
    const addBadgeInfo = (items: NavItemDataProps[]): NavItemDataProps[] =>
      items.map(item => ({
        ...item,
        info: item.badge ? createNavBadgeInfo(item.badge, badgeValues) : item.info,
        children: item.children ? addBadgeInfo(item.children) : undefined
      }));

    return filterNavData(permissionCodes).map(group => ({
      ...group,
      items: addBadgeInfo(group.items)
    }));
  }, [badgeValues, permissionCodes]);
  /**
   * 返回过滤后的菜单数据
   * Return the filtered menu data
   */
  return filteredNavData;
};
