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
