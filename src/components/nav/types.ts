export type NavItemStateProps = {
  /**
   * 是否展开
   * Whether the item is expanded
   */
  open?: boolean;

  /**
   * 是否激活（高亮）
   * Whether the item is active (highlighted)
   */
  active?: boolean;

  /**
   * 是否禁用
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * 是否隐藏
   * Whether the item is hidden
   */
  hidden?: boolean;
};

export type NavItemDataProps = {
  /**
   * 跳转的路径
   * Path to navigate to
   */
  path: string;

  /**
   * 菜单名称
   * Menu name
   */
  title: string;

  /**
   * 图标，既可以传字符串（例如 Iconify 的图标名），也可以传 React 组件
   * Icon, can be a string (like Iconify icon name) or a React component
   */
  icon?: string | React.ReactNode;

  /**
   * 额外信息，可以是 React 组件或字符串
   * Additional information, can be a React component or a string
   */
  info?: React.ReactNode;

  /**
   * 补充描述文字
   * Optional description text
   */
  caption?: string;

  /**
   * 权限控制，判断当前用户是否有权限访问此菜单
   * Permission control, checks if the current user has access to this menu
   */
  auth?: string[];

  /**
   * 子菜单
   * Submenu items, can be nested
   */
  children?: NavItemDataProps[];
} & NavItemStateProps;
