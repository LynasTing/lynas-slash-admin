import type { NavItemDataProps, NavProps } from '@/components/nav';
import { useUserMenus } from '@/store/user';
import { useNavBadgeValues } from '../nav-badge-values';
import { useMemo } from 'react';
import { convertUserMenuToNavData } from './backend';
import { createNavBadgeInfo } from '../nav-badges';

/**
 * 根据当前用户菜单生成最终导航数据，并补充运行时徽标信息
 *
 * Creates the final navigation data from the current user's menus and adds runtime badge information.
 *
 * @returns 供侧边栏、顶部导航、移动端导航、搜索和面包屑共用的导航数据 / Navigation data shared by the sidebar, top navigation, mobile navigation, search, and breadcrumbs
 */
export const useFilteredNavData = (): NavProps['data'] => {
  const userMenus = useUserMenus();
  const badgeValues = useNavBadgeValues();

  return useMemo(() => {
    const navData = convertUserMenuToNavData(userMenus);

    // 递归为每个导航节点补充运行时徽标内容
    // Recursively add runtime badge content to each navigation node
    const addBadgeInfo = (items: NavItemDataProps[]): NavItemDataProps[] =>
      items.map(i => ({
        ...i,
        info: i.badge ? createNavBadgeInfo(i.badge, badgeValues) : i.info,
        children: i.children ? addBadgeInfo(i.children) : undefined
      }));

    return navData.map(item => ({
      ...item,
      items: addBadgeInfo(item.items)
    }));
  }, [userMenus, badgeValues]);
};
