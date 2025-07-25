import type { BasicStatus } from '#/enum';
import type { NavItemDataProps } from '@/components/nav/types';

/**
 * 基础实体类型
 * Base entity type
 */
export interface BaseEntity {
  /**
   * 状态
   * Status
   */
  status?: BasicStatus;

  /**
   * 描述
   * Description
   */
  desc?: string;

  /**
   * 创建时间
   * Created at
   */
  createdAt?: string;

  /**
   * 更新时间
   * Updated at
   */
  updatedAt?: string;
}

export type MenuMetaInfo = Partial<Pick<NavItemDataProps, 'path' | 'icon' | 'caption' | 'info' | 'disabled' | 'auth' | 'hidden'>> & {
  /**
   * 外部链接
   * External link
   */
  externalLink?: URL;
  /**
   * 组件路径
   * Component path
   */
  component?: string;
};

export interface Menu extends BaseEntity, MenuMetaInfo {
  /**
   * uuid
   */
  id: string;

  /**
   * 父id
   * Parent ID
   */
  parentId: string;

  /**
   * 菜单名称
   * Menu name
   */
  name: string;

  /**
   * 菜单编码
   * Menu code
   */
  code: string;

  /**
   * 排序
   * order
   */
  order?: number;

  /**
   * 菜单类型
   * Menu type
   */
  type: string;
}

export type MenuTree = Menu & {
  /**
   * 子菜单
   * Submenus
   */
  children?: MenuTree[];
};

export interface User extends BaseEntity {
  /**
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
  email: string;

  /**
   * 手机号
   * Phone number
   */
  phone?: string;

  /**
   * 头像
   * Avatar
   */
  avatar?: string;
}

export interface Role extends BaseEntity {
  /**
   * uuid
   */
  id: string;

  /**
   * Code
   */
  code: string;

  /**
   * 名称
   * Name
   */
  name: string;
}

export interface Permission extends BaseEntity {
  /**
   * uuid
   */
  id: string;

  /**
   * Code
   */
  code: string;

  /**
   * 名称
   * Name
   */
  name: string;
}

export interface UserInfo {
  /**
   * id
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
   */
  password?: string;

  /**
   * 头像
   * Avatar
   */
  avatar?: string;

  /**
   * 角色
   * Role
   */
  roles: Role[];

  /**
   * 状态
   * Status
   */
  status: BasicStatus;

  /**
   * 权限
   * Permissions
   */
  permissions: Permission[];

  /**
   * 菜单
   * Menus
   */
  menus: MenuTree[];
}

export interface UserToken {
  /**
   * 访问令牌
   * Access token
   */
  accessToken?: string;

  /**
   * 刷新令牌
   * Refresh token
   */
  refreshToken?: string;
}
