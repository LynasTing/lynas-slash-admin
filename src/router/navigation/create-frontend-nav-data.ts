import type { NavItemDataProps, NavProps } from '@/components/nav/types';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import type { AppRouteObject, RouteMeta } from '../types';

type ConvertedNavItem = {
  /**
   * 供最终导航组件渲染的数据
   *
   * Data rendered by the final navigation components
   */
  item: NavItemDataProps;

  /**
   * 仅在转换阶段用于稳定排序的路由元数据
   *
   * Route metadata used only for stable ordering during conversion
   */
  meta: RouteMeta;
};

type NavGroupData = {
  /**
   * 分组的显示名称
   *
   * Display name of the group
   */
  name: string;

  /**
   * 分组的展示顺序
   *
   * Display order of the group
   */
  sort: number;

  /**
   * 分组中的一级导航节点
   *
   * First-level navigation nodes in the group
   */
  items: NavItemDataProps[];
};

/**
 * 解析当前路由相对于父级导航路径的绝对路径。
 * @param parentPath - 父级导航节点的绝对路径。
 * @param path - 当前路由声明的路径。
 * @returns 可供导航组件使用的规范化绝对路径。
 *
 * Resolves an absolute navigation path from a route path and its parent path.
 * @param parentPath - Absolute path of the parent navigation node.
 * @param path - Path declared by the current route.
 * @returns A normalized absolute path for navigation components.
 */
export const resolveRoutePath = (parentPath: string, path?: string): string => {
  /**
   * 无 path 的布局路由不会生成 URL 片段，子路由必须继承已有父路径。
   * Layout routes without a path do not add a URL segment, so descendants inherit the existing parent path.
   */
  if (!path) {
    return parentPath || '/';
  }

  if (path.startsWith('/')) {
    return path === '/' ? path : path.replace(/\/+$/, '');
  }

  const normalizedParentPath = parentPath === '/' ? '' : parentPath.replace(/\/+$/, '');
  return `/${[normalizedParentPath, path].filter(Boolean).join('/').replace(/^\/+/, '')}`;
};

/**
 * 将路由节点递归转换为导航节点，并保留排序所需的元数据。
 * @param routes - 当前层级的路由配置。
 * @param parentPath - 当前层级继承的绝对路径。
 * @returns 当前层级可展示的导航节点。
 *
 * Recursively converts route nodes into navigation nodes while preserving ordering metadata.
 * @param routes - Route configuration at the current depth.
 * @param parentPath - Absolute path inherited by the current depth.
 * @returns Visible navigation nodes at the current depth.
 */
const convertRoutes = (routes: AppRouteObject[] | undefined, parentPath: string): ConvertedNavItem[] => {
  if (!routes) {
    return [];
  }

  return routes
    .flatMap(route => {
      /**
       * index 路由仅负责默认内容或重定向，不能成为可点击的导航节点。
       * Index routes only provide default content or redirects and must not become clickable navigation nodes.
       */
      if (route.index || route.meta?.status === BOOLEAN_VALUE_MAP.FALSE) {
        return [];
      }

      const path = resolveRoutePath(parentPath, route.path);
      const children = convertRoutes('children' in route ? route.children : undefined, path);

      /**
       * 布局或重定向容器可没有导航元数据；继续上浮其后代，避免无效空菜单。
       * Layout and redirect containers can omit navigation metadata; promote descendants to avoid empty menu nodes.
       */
      if (!route.meta) {
        return children;
      }

      return [
        {
          item: {
            path,
            title: route.meta.name,
            icon: route.meta.icon ?? undefined,
            caption: route.meta.description ?? undefined,
            hidden: route.meta.hidden === BOOLEAN_VALUE_MAP.TRUE,
            badge: route.meta.navBadge,
            link: route.meta.link,
            children: children.map(child => child.item)
          },
          meta: route.meta
        }
      ];
    })
    .sort((first, second) => first.meta.sort - second.meta.sort);
};

/**
 * 按路由元数据创建前端模式的分组导航树。
 * @param routes - 前端模式中允许参与导航派生的路由。
 * @returns 供侧边栏、移动端、搜索和面包屑共用的导航数据。
 *
 * Creates grouped navigation data from route metadata for frontend router mode.
 * @param routes - Routes allowed to participate in frontend navigation derivation.
 * @returns Navigation data shared by sidebars, mobile navigation, search, and breadcrumbs.
 */
export const createFrontendNavData = (routes: AppRouteObject[]): NavProps['data'] => {
  const groupDataMap = new Map<string, NavGroupData>();

  /**
   * 顶级路由代表导航分组，其直接子路由才是菜单一级节点。
   * Top-level routes represent navigation groups, and only their direct children are first-level menu nodes.
   */
  convertRoutes(routes, '/').forEach(convertedItem => {
    const navGroup: NonNullable<RouteMeta['navGroup']> | undefined = convertedItem.meta.navGroup;
    if (!navGroup) {
      return;
    }

    const groupKey: string = `${navGroup.sort}:${navGroup.name}`;
    const groupData: NavGroupData = groupDataMap.get(groupKey) ?? {
      name: navGroup.name,
      sort: navGroup.sort,
      items: []
    };

    /**
     * 分组路由自身仅提供标题和排序，不作为菜单项输出，避免多出一层无意义目录。
     * The group route supplies only the heading and order, rather than becoming an extra menu directory.
     */
    groupData.items.push(...(convertedItem.item.children ?? []));
    groupDataMap.set(groupKey, groupData);
  });

  return [...groupDataMap.values()]
    .sort((first, second) => first.sort - second.sort)
    .map(group => ({
      name: group.name,
      items: group.items
    }));
};
