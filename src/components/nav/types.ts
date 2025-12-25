import * as React from 'react';

/**
 * 导航项状态属性
 * Navigation item state props
 */
export type NavItemStateProps = {
  /**
   * 是否展开
   * Whether the item is expanded
   */
  open?: boolean;

  /**
   * 是否激活（高亮显示）
   * Whether the item is active (highlighted)
   */
  active?: boolean;

  /**
   * 是否禁用（不可点击）
   * Whether the item is disabled (not clickable)
   */
  disabled?: boolean;

  /**
   * 是否隐藏
   * Whether the item is hidden
   */
  hidden?: boolean;
};

/**
 * 导航项数据属性
 * Navigation item data props
 */
export type NavItemDataProps = {
  /**
   * 路由路径
   * Route path
   */
  path: string;

  /**
   * 标题文本
   * Display title of the navigation item
   */
  title: string;

  /**
   * 图标，可以是图标名称字符串或 React 节点
   * Icon of the item, can be an icon name string or a React node
   */
  icon?: string | React.ReactNode;

  /**
   * 附加信息（例如徽标或额外提示）
   * Additional info (e.g., badge or extra hint)
   */
  info?: React.ReactNode;

  /**
   * 副标题或描述文字
   * Caption or description text
   */
  caption?: string;

  /**
   * 权限标识数组，用于控制该导航项的访问权限
   * Array of authorization keys for access control
   */
  auth?: string[];

  /**
   * 子导航项，形成树状菜单结构
   * Child navigation items (for nested menu structure)
   */
  children?: NavItemDataProps[];
} &
  /**
   * 继承自 NavItemStateProps，提供导航项状态支持
   * Extends NavItemStateProps to include state support
   */
  NavItemStateProps;

/**
 * 导航项选项属性
 * Navigation item options
 */
export type NavItemOptionsProps = {
  /**
   * 深度
   * Depth
   */
  depth?: number;

  /**
   * 是否拥有子导航项
   * Whether the item has child navigation items
   */
  hasChild?: boolean;
};

/**
 * 导航项属性
 * Navigation item props
 */
export type NavItemProps = React.ComponentProps<'div'> & NavItemDataProps & NavItemOptionsProps;

/**
 * 导航列表属性
 * Navigation list props
 */
export type NavListProps = Pick<NavItemProps, 'depth'> & {
  data: NavItemDataProps;

  /**
   * 权限校验函数（由外部注入）
   *
   * NavList / NavItem 在渲染时，会把 「当前导航项配置的 auth」
   * 传给这个函数，让使用者自行决定：
   *    - true 有权限，允许显示该导航
   *    - false 无权限，不渲染
   *
   * @description
   *  - auth 来源于 NavItemDataProps.auth
   *  - auth 可能为空（未配置权限时， 通常视为放行）
   *
   * auth validation function
   *
   * NavList / NavItem will pass the auth config from the current NavItem
   * to this function, let the user decide:
   *    - true allow display
   *    - false deny
   *
   * @description
   * - auth comes from NavItemDataProps.auth
   * - auth may be empty (unconfigured auth, usually treated as pass-through)
   */
  authenticate?: (auth?: NavItemProps['auth']) => boolean;
};

/**
 * 导航分组属性
 * Navigation group props
 */
export type NavGroupProps = Omit<NavListProps, 'data' | 'depth'> & {
  /** 导航分组名称 / name */
  name?: string;
  /** 子导航项 / children */
  items: NavItemDataProps[];
};

/**
 * 导航属性
 * Main
 */
export type NavProps = React.ComponentProps<'nav'> &
  Omit<NavListProps, 'data' | 'depth'> & {
    data: {
      name?: string;
      items: NavItemDataProps[];
    }[];
  };
