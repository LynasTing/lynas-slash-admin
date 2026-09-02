import type { BooleanValue } from '#/public/common';
import type { SysMenuCategory } from '#/system/menu';
import type { IndexRouteObject, NonIndexRouteObject } from 'react-router';

export const ROUTE_LINK_MODE_MAP = {
  IFRAME: 'iframe',
  NEW_WINDOW: 'new-window'
} as const;

export type RouteLinkMode = (typeof ROUTE_LINK_MODE_MAP)[keyof typeof ROUTE_LINK_MODE_MAP];

export const ROUTE_NAV_BADGE_VARIANT_MAP = {
  DEFAULT: 'default',
  SECONDARY: 'secondary',
  DESTRUCTIVE: 'destructive',
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
  OUTLINE: 'outline'
} as const;

export type RouteNavBadgeVariant = (typeof ROUTE_NAV_BADGE_VARIANT_MAP)[keyof typeof ROUTE_NAV_BADGE_VARIANT_MAP];

export interface RouteNavGroup {
  /**
   * 侧边栏分组的显示名称或国际化 key
   *
   * Display name or i18n key for the sidebar group
   */
  name: string;

  /**
   * 分组在主导航中的展示顺序
   *
   * Display order of the group in primary navigation
   */
  sort: number;
}

export interface RouteNavBadge {
  /**
   * 用于读取运行时徽标数值的稳定业务键
   *
   * Stable business key used to read the runtime badge value
   */
  key: string;

  /**
   * 徽标在导航中的视觉语义
   *
   * Visual meaning of the badge in navigation
   */
  variant: RouteNavBadgeVariant;
}

export interface RouteLink {
  /**
   * 外部目标的完整 HTTP 或 HTTPS 地址
   *
   * Complete HTTP or HTTPS URL for the external destination
   */
  url: string;

  /**
   * 用户从导航进入目标时采用的打开方式
   *
   * Opening behavior used when the user enters the destination from navigation
   */
  mode: RouteLinkMode;
}

export interface RouteMeta {
  /**
   * 菜单在导航树中的唯一标识
   *
   * Unique identifier of the menu node in the navigation tree
   */
  id?: number;

  /**
   * 所属父级菜单；根节点使用约定的根 ID
   *
   * Parent menu that owns this node; root nodes use the configured root ID
   */
  parentId?: number;

  /**
   * 导航菜单中展示的名称
   *
   * Display name shown in navigation menus
   */
  name: string;

  /**
   * 用于权限校验和菜单节点识别的业务编码
   *
   * Business code used for permission checks and menu-node identification
   */
  code: string;

  /**
   * 决定节点在导航树中的职责及其可包含的子节点
   *
   * Determines the node's role in navigation and the children it may contain
   */
  category: SysMenuCategory;

  /**
   * 同级菜单在导航中的展示顺序
   *
   * Display order among sibling menu nodes
   */
  sort: number;

  /**
   * 控制菜单节点是否可被访问（渲染， 但不可访问）
   *
   * Controls whether the menu node can be accessed
   */
  status: BooleanValue;

  /**
   * 供导航组件解析的图标标识
   *
   * Icon identifier resolved by the navigation component
   */
  icon?: string | null;

  /**
   * 是否渲染在导航菜单中
   *
   * Controls visibility in navigation menus without changing direct-route access
   */
  hidden?: BooleanValue;

  /**
   * 菜单的补充说明，可用于导航中的描述文案
   *
   * Supplementary menu description for navigation copy
   */
  description?: string | null;

  /**
   * 外链或内嵌页面使用的目标地址
   *
   * Target address for external links or embedded pages
   */
  externalLink?: string | null;

  /**
   * 当前顶级导航节点所属的侧边栏分组
   *
   * Sidebar group that owns the current top-level navigation node
   */
  navGroup?: RouteNavGroup;

  /**
   * 当前导航项关联的运行时徽标配置
   *
   * Runtime badge configuration associated with the current navigation item
   */
  navBadge?: RouteNavBadge;

  /**
   * 外部链接的目标地址与打开方式
   *
   * Target URL and opening behavior for an external link
   */
  link?: RouteLink;
}

/**
 * 应用可运行的路由配置，在 React Router 配置基础上补充菜单关联信息
 *
 * Executable application route configuration enriched with menu metadata
 */
type AppRouteObjectExtension = {
  /**
   * 页面组件的模块标识，用于将菜单配置转换为可渲染的路由元素
   *
   * Page-module identifier used to convert menu configuration into a renderable route element
   */
  component?: string | null;

  /**
   * 与当前路由关联的菜单元数据
   *
   * Menu metadata associated with the current route
   */
  meta?: RouteMeta;
};

/**
 * 保留 React Router 对索引路由和非索引路由的联合约束，并替换 children 类型
 *
 * Preserves React Router's index and non-index route union while replacing the children type
 */
export type AppRouteObject =
  | (AppRouteObjectExtension & Omit<IndexRouteObject, 'children'>)
  | (AppRouteObjectExtension &
      Omit<NonIndexRouteObject, 'children'> & {
        /**
         * 当前节点下的子路由，递归使用扩展后的路由类型以保留菜单元数据
         *
         * Child routes use the extended route type recursively to preserve menu metadata
         */
        children?: AppRouteObject[];
      });
