import type { BasicStatusEnum, PermissionTypeEnum } from './enum';
import type { NavItemDataProps } from '@/components/nav/types';

/**
 * 通用选项
 * Common options
 */
export interface CommonOptions {
  /**
   * 状态
   * Status
   */
  status?: BasicStatusEnum;

  /**
   * 描述
   * Description
   */
  desc?: string;

  /**
   * 创建时间
   * Create time
   */
  createdAt?: string;

  /**
   * 更新时间
   * Update time
   */
  updatedAt?: string;
}

export interface UserToken {
  /**
   * 访问 token
   * Access token
   */
  accessToken?: string;

  /**
   * 刷新 token
   * Refresh token
   */
  refreshToken?: string;
}

/**
 * 用户
 * User
 */
export interface User extends CommonOptions {
  /**
   * ID
   * uuid
   */
  id: string;

  /**
   * 用户名
   * Username
   */
  username: string;

  /**
   * 密码
   * Password
   */
  password: string;

  /**
   * 邮箱
   * Email
   */
  email?: string;

  /**
   * 手机
   * phone
   */
  phone?: string;

  /**
   * 头像
   * Avatar
   */
  avatar?: string;
}

export interface Role extends CommonOptions {
  /**
   * ID
   * uuid
   */
  id: string;

  /**
   * 名称
   * Name
   */
  name: string;

  /**
   * 编码
   * Code
   */
  code: string;
}

/**
 * Pick<T, K> 精准摘取类型属性
 * - T: 源类型
 * - K: 摘取的属性
 * - 从类型 T 中挑出一部分属性来组成新的类型 K
 *
 * Partial<T> 全员变可选
 * - T: 源类型
 * - 将类型 T 中的所有属性变为可选
 *
 * 菜单元信息
 * Menu meta info
 */
export type MenuMetaInfo = Partial<Pick<NavItemDataProps, 'path' | 'icon' | 'caption' | 'info' | 'disabled' | 'auth' | 'hidden'>> & {
  /**
   * 外部链接
   * External link
   */
  externalLink?: URL;

  /**
   * 组件
   * Component
   */
  component?: string;
};

/**
 * 菜单接口定义
 * Menu interface definition
 *
 * 用于描述系统中的菜单、目录或功能节点信息
 * Used to describe menu, catalog, or functional node information in the system
 */
export interface Menu extends CommonOptions, MenuMetaInfo {
  /**
   * 唯一标识符（UUID）
   * Unique identifier (UUID)
   */
  id: string;

  /**
   * 父级菜单 ID（顶级菜单可为空字符串）
   * Parent menu ID (can be an empty string for top-level menus)
   */
  parentId: string;

  /**
   * 菜单名称
   * Menu name
   */
  name: string;

  /**
   * 菜单编码（一般用于权限控制）
   * Menu code (usually used for permission control)
   */
  code: string;

  /**
   * 排序序号（可选）
   * Display order number (optional)
   */
  order?: number;

  /**
   * 菜单类型（分组 / 目录 / 菜单 / 组件）
   * Menu type (Group / Catalogue / Menu / Component)
   */
  type: PermissionTypeEnum;
}

/**
 * 权限
 * Permission
 */
export interface Permission extends CommonOptions {
  /**
   * ID
   * uuid
   */
  id: string;

  /**
   * 名称
   * Name
   */
  name: string;

  /**
   * 权限码
   * Permission code
   * - resource:action  example: "user-management:read"
   */
  code: string;
}

export type MenuTree = Menu & {
  children?: MenuTree[];
};

/**
 * 用户信息
 * User information
 */
export interface UserInfo {
  /**
   * 用户 ID
   * User ID (uuid)
   */
  id: string;

  /**
   * 邮箱
   * Email
   */
  email: string;

  /**
   * 用户名
   * Username
   */
  username: string;

  /**
   * 密码
   * Password
   * - Optional, usually not returned by backend
   */
  password?: string;

  /**
   * 头像
   * Avatar
   */
  avatar?: string;

  /**
   * 角色列表
   * Roles
   */
  roles?: Role[];

  /**
   * 用户状态
   * User status
   */
  status?: BasicStatusEnum;

  /**
   * 权限列表
   * Permissions
   */
  permissions?: Permission[];

  /**
   * 菜单树
   * Menu tree
   */
  menu?: MenuTree[];
}

export interface MenuTreeNode {
  /**
   * 权限唯一标识
   * Unique permission identifier
   */
  id: string;

  /**
   * 父级权限 ID
   * Parent permission ID
   */
  parentId: string;

  /**
   * 权限名称
   * Permission name
   */
  name: string;

  /**
   * 权限显示标题
   * Permission display label
   */
  label: string;

  /**
   * 权限类型
   * Permission type
   */
  type: PermissionTypeEnum;

  /**
   * 路由地址
   * Route path
   */
  route: string;

  /**
   * 权限状态
   * Permission status
   */
  status?: BasicStatusEnum;

  /**
   * 排序值
   * Sort order value
   */
  order?: number;

  /**
   * 菜单图标
   * Menu icon
   */
  icon?: string;

  /**
   * 页面组件路径
   * Page component path
   */
  component?: string;

  /**
   * 是否隐藏菜单
   * Whether the menu is hidden
   */
  hide?: boolean;

  /**
   * 是否隐藏标签页
   * Whether the tab is hidden
   */
  hideTab?: boolean;

  /**
   * 外链页面地址
   * External iframe source URL
   */
  frameSrc?: URL;

  /**
   * 是否为新功能标识
   * Whether this is marked as a new feature
   */
  newFeature?: boolean;

  /**
   * 子级权限列表
   * Child permission list
   */
  children?: MenuTreeNode[];
}
