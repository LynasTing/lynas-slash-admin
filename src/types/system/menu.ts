import { type BooleanValue } from '../public/common';

/**
 * 系统菜单节点类型。
 * System menu node categories.
 */
export const SYS_MENU_CATEGORY_MAP = {
  /**
   * 分组，用于归类多个目录或菜单。
   * Group; used to organize directories or menus.
   */
  GROUP: 1,

  /**
   * 目录，用于承载子级菜单。
   * Directory; used to contain child menus.
   */
  DIRECTORY: 2,

  /**
   * 菜单，指向可访问的页面。
   * Menu; points to an accessible page.
   */
  MENU: 3,

  /**
   * 操作按钮，表示页面内的功能权限。
   * Action; represents an in-page functional permission.
   */
  ACTION: 4
} as const;

export type SysMenuCategory = (typeof SYS_MENU_CATEGORY_MAP)[keyof typeof SYS_MENU_CATEGORY_MAP];

/**
 * 系统菜单树节点。
 * System menu tree node.
 */
export interface SysMenuTreeNode {
  /**
   * 菜单主键 ID。
   * Menu primary key ID.
   */
  id: number;

  /**
   * 父级菜单 ID，0 表示根节点。
   * Parent menu ID; 0 represents a root node.
   */
  parentId: number;

  /**
   * 菜单名称。
   * Menu name.
   */
  name: string;

  /**
   * 父级菜单名称；根节点为 null。
   * Parent menu name; null for a root node.
   */
  parentName: string | null;

  /**
   * 前端国际化资源键，用于解析菜单展示名称。
   * Frontend internationalization resource key used to resolve the menu display name.
   */
  i18nKey: string;

  /**
   * 菜单唯一编码。
   * Unique menu code.
   */
  code: string;

  /**
   * 节点类型。
   * Menu node category.
   */
  category: SysMenuCategory;

  /**
   * 显示排序值，数值越小越靠前。
   * Display sort order; lower values appear first.
   */
  sort: number;

  /**
   * 启用状态。
   * Availability status.
   */
  status: BooleanValue;

  /**
   * 前端路由路径。
   * Frontend route path.
   */
  path: string | null;

  /**
   * 前端组件标识或组件路径。
   * Frontend component identifier or path.
   */
  component: string | null;

  /**
   * 菜单图标。
   * Menu icon.
   */
  icon: string | null;

  /**
   * 菜单隐藏状态。
   * Menu visibility state.
   */
  hidden: BooleanValue;

  /**
   * 菜单描述。
   * Menu description.
   */
  description: string | null;

  /**
   * 外链地址。
   * External link URL.
   */
  externalLink: string | null;

  /**
   * 子菜单节点；叶子节点返回空数组。
   * Child menu nodes; leaf nodes return an empty array.
   */
  children: SysMenuTreeNode[];
}

/**
 * 新增或修改菜单的请求参数。
 * Create or update menu request parameters.
 */
export interface SysMenuSaveRequest {
  /**
   * 父级菜单 ID，最小值为 0；0 表示根节点。
   * Parent menu ID, with a minimum value of 0; 0 represents a root node.
   */
  parentId: number;

  /**
   * 菜单名称，最大 64 个字符。
   * Menu name, up to 64 characters.
   */
  name: string;

  /**
   * 前端国际化资源键，最大 255 个字符；未提供时由前端决定展示文案。
   * Frontend internationalization resource key, up to 255 characters; the frontend decides the display text when it is not provided.
   */
  i18nKey?: string;

  /**
   * 菜单唯一编码，最大 128 个字符。
   * Unique menu code, up to 128 characters.
   */
  code: string;

  /**
   * 节点类型。
   * Menu node category.
   */
  category: SysMenuCategory;

  /**
   * 显示排序值，最小值为 0，数值越小越靠前。
   * Display sort order, with a minimum value of 0; lower values appear first.
   */
  sort: number;

  /**
   * 启用状态。
   * Availability status.
   */
  status: BooleanValue;

  /**
   * 前端路由路径，最大 255 个字符。
   * Frontend route path, up to 255 characters.
   */
  path?: string;

  /**
   * 前端组件标识或组件路径，最大 255 个字符。
   * Frontend component identifier or path, up to 255 characters.
   */
  component?: string;

  /**
   * 菜单图标，最大 128 个字符。
   * Menu icon, up to 128 characters.
   */
  icon?: string;

  /**
   * 菜单隐藏状态。
   * Menu visibility state.
   */
  hidden: BooleanValue;

  /**
   * 菜单描述，最大 500 个字符。
   * Menu description, up to 500 characters.
   */
  description?: string;

  /**
   * 外链地址，最大 500 个字符，使用完整的 HTTP 或 HTTPS URL。
   * External link URL, up to 500 characters, using a complete HTTP or HTTPS URL.
   */
  externalLink?: string;
}
