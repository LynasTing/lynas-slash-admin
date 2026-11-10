import type { CurrentUserMenuNode } from '#/system/user';
import { SYS_MENU_CATEGORY_MAP } from '#/system/menu';
import type { NavItemDataProps, NavProps } from '@/components/nav/types';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import { ROUTE_LINK_MODE_MAP } from '@/router/types';

/**
 * 将当前层级的用户菜单节点转换为普通导航项，并递归处理子节点
 *
 * Converts menu nodes at the current level into navigation items and recursively processes their children.
 *
 * @param nodes - 当前层级的用户菜单节点 / User menu nodes at the current level
 * @returns 普通导航项数组 / Navigation item array
 */
const convertChildren = (nodes: CurrentUserMenuNode[]): NavItemDataProps[] => {
  const result: NavItemDataProps[] = [];

  // 复制后排序，避免修改输入菜单数组
  // Sort a copy to avoid mutating the input menu array
  const sortedNodes = [...nodes].toSorted((a, b) => a.sort - b.sort);

  sortedNodes.forEach(item => {
    // ACTION 表示页面操作权限，不应出现在导航树中
    // ACTION represents in-page permissions and must not appear in the navigation tree
    if (item.category === SYS_MENU_CATEGORY_MAP.ACTION) {
      return;
    }

    // MENU 没有页面路径时无法生成有效导航，因此跳过该节点
    // A MENU without a page path cannot produce a valid navigation item, so skip it
    if (item.category === SYS_MENU_CATEGORY_MAP.MENU && !item.path) {
      return;
    }

    // 映射当前节点字段，并递归转换子菜单
    // Map the current node fields and recursively convert its child menus
    result.push({
      title: item.i18nKey ?? item.name,
      path: item.path ?? undefined,
      icon: item.icon ?? undefined,
      caption: item.description ?? undefined,
      hidden: item.hidden === BOOLEAN_VALUE_MAP.TRUE,
      link: item.externalLink
        ? {
            url: item.externalLink,
            mode: ROUTE_LINK_MODE_MAP.NEW_WINDOW
          }
        : undefined,
      children: item.children.length > 0 ? convertChildren(item.children) : undefined
    });
  });

  return result;
};

/**
 * 将当前用户菜单树转换为导航组件所需的分组数据
 *
 * Converts the current user's menu tree into grouped data required by the navigation components.
 *
 * @param nodes - 当前用户可访问的菜单树 / Menu tree accessible to the current user
 * @returns 导航分组数组 / Grouped navigation data
 */
export const convertUserMenuToNavData = (nodes: CurrentUserMenuNode[]): NavProps['data'] => {
  const result: NavProps['data'] = [];

  // 复制后对分组排序，保持后端 sort 顺序且不修改输入数据
  // Sort a copy to preserve backend ordering without mutating the input data
  const sortedNodes = [...nodes].toSorted((a, b) => a.sort - b.sort);

  sortedNodes.forEach(item => {
    // GROUP 只提供分组名称，具体导航项由其 children 转换
    // GROUP only provides the group name; its children become the navigation items
    if (item.category !== SYS_MENU_CATEGORY_MAP.GROUP) {
      return;
    }
    result.push({
      name: item.i18nKey ?? item.name,
      items: convertChildren(item.children)
    });
  });

  return result;
};
