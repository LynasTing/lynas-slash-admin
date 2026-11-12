import type { CurrentUserMenuNode } from '#/system/user';
import { SYS_MENU_CATEGORY_MAP } from '#/system/menu';

/**
 * 通过用户菜单树平铺菜单路径
 * @param nodes - 用户所有的菜单节点
 * @returns 收集后的所有菜单路径
 */
export const collectMenuPaths = (nodes: CurrentUserMenuNode[]): string[] => {
  const result: string[] = [];

  nodes.forEach(item => {
    if (item.category === SYS_MENU_CATEGORY_MAP.MENU && item.path) {
      result.push(item.path);
    }
    if (item.children.length > 0) {
      result.push(...collectMenuPaths(item.children));
    }
  });

  return result;
};

/**
 * 找出用户菜单树中的第一个页面菜单
 */
export const findFirstAccessibleMenu = (nodes: CurrentUserMenuNode[]): string | undefined => {
  const sortedNodes = [...nodes].sort((a, b) => a.sort - b.sort);

  for (const item of sortedNodes) {
    if (item.category === SYS_MENU_CATEGORY_MAP.MENU && item.path) {
      return item.path;
    }

    if (item.children.length > 0) {
      const target = findFirstAccessibleMenu(item.children);
      if (target) return target;
    }
  }

  return undefined;
};
