import type { BooleanValue } from '../public/common';

/**
 * 当前登录用户的精简角色。
 * 用于 `GET /auth/me`、登录响应及后续 Zustand 登录用户状态，不等同于后台角色管理列表项。
 *
 * Compact role of the current signed-in user.
 * Used by `GET /auth/me`, sign-in responses, and future Zustand signed-in user state; it is not the same as a role-management list item.
 */
export interface CurrentUserRole {
  /**
   * 角色主键 ID。
   * JSON 响应中的 int64 在前端以 number 表示。
   *
   * Role primary key ID.
   * The int64 value in the JSON response is represented as a number in the frontend.
   */
  id: number;

  /**
   * 角色唯一编码。
   *
   * Unique role code.
   */
  code: string;

  /**
   * 角色名称。
   *
   * Role name.
   */
  name: string;
}

/**
 * 当前登录用户可访问的菜单树节点。
 * 用于 `GET /auth/me` 和登录响应中的导航、路由及功能权限构建，不等同于菜单管理树节点。
 *
 * Accessible menu tree node of the current signed-in user.
 * Used to build navigation, routes, and feature permissions from `GET /auth/me` and sign-in responses; it is not the same as a menu-management tree node.
 */
export interface CurrentUserMenuNode {
  /**
   * 菜单主键 ID。
   * JSON 响应中的 int64 在前端以 number 表示。
   *
   * Menu primary key ID.
   * The int64 value in the JSON response is represented as a number in the frontend.
   */
  id: number;

  /**
   * 父级菜单 ID。
   * JSON 响应中的 int64 在前端以 number 表示。
   *
   * Parent menu ID.
   * The int64 value in the JSON response is represented as a number in the frontend.
   */
  parentId: number;

  /**
   * 菜单名称。
   *
   * Menu name.
   */
  name: string;

  /**
   * 菜单唯一编码。
   *
   * Unique menu code.
   */
  code: string;

  /**
   * 菜单分类数值。
   * Swagger 仅声明为整数，未给出可用值域。
   *
   * Numeric menu category.
   * Swagger only declares an integer and does not provide an allowed value range.
   */
  category: number;

  /**
   * 菜单显示排序值。
   *
   * Menu display sort order.
   */
  sort: number;

  /**
   * 菜单启用状态数值。
   * Swagger 仅声明为整数，未将其约束为公共布尔数值。
   *
   * Numeric menu availability status.
   * Swagger only declares an integer and does not constrain it to the shared numeric boolean values.
   */
  status: number;

  /**
   * 前端路由路径；非页面节点时为 `null`。
   *
   * Frontend route path; `null` for non-page nodes.
   */
  path: string | null;

  /**
   * 前端组件标识或组件路径；非页面节点时为 `null`。
   *
   * Frontend component identifier or component path; `null` for non-page nodes.
   */
  component: string | null;

  /**
   * 菜单图标标识；未配置时为 `null`。
   *
   * Menu icon identifier; `null` when it is not configured.
   */
  icon: string | null;

  /**
   * 前端国际化资源键；未配置时为 `null`。
   *
   * Frontend internationalization resource key; `null` when it is not configured.
   */
  i18nKey: string | null;

  /**
   * 菜单隐藏状态数值。
   * Swagger 仅声明为整数，未将其约束为公共布尔数值。
   *
   * Numeric menu visibility status.
   * Swagger only declares an integer and does not constrain it to the shared numeric boolean values.
   */
  hidden: number;

  /**
   * 菜单描述；未填写时为 `null`。
   *
   * Menu description; `null` when it is not provided.
   */
  description: string | null;

  /**
   * 菜单外链地址；非外链菜单时为 `null`。
   *
   * External menu URL; `null` for non-external-link menus.
   */
  externalLink: string | null;

  /**
   * 子菜单节点列表。
   *
   * Child menu node list.
   */
  children: CurrentUserMenuNode[];
}

/**
 * 当前登录用户资料。
 * 对应 `GET /auth/me` 的解包响应，也由登录响应引用，未来可作为 Zustand 登录用户状态的类型。
 *
 * Current signed-in user profile.
 * Matches the unwrapped response from `GET /auth/me`, is referenced by sign-in responses, and can become the type used for Zustand signed-in user state.
 */
export interface CurrentUser {
  /**
   * 用户主键 ID。
   * JSON 响应中的 int64 在前端以 number 表示。
   *
   * User primary key ID.
   * The int64 value in the JSON response is represented as a number in the frontend.
   */
  userId: number;

  /**
   * 登录用户名。
   *
   * Login username.
   */
  username: string;

  /**
   * 用户昵称；未填写时为 `null`。
   *
   * User nickname; `null` when it is not provided.
   */
  nickname: string | null;

  /**
   * 用户电子邮箱；账号密码注册用户可能为 `null`。
   *
   * User email address; it can be `null` for users registered with only an account and password.
   */
  email: string | null;

  /**
   * 用户手机号码；未填写时为 `null`。
   *
   * User phone number; `null` when it is not provided.
   */
  phone: string | null;

  /**
   * 用户头像地址；未填写时为 `null`。
   *
   * User avatar URL; `null` when it is not provided.
   */
  avatar: string | null;

  /**
   * 当前用户拥有的精简角色列表。
   *
   * Compact role list owned by the current user.
   */
  roles: CurrentUserRole[];

  /**
   * 当前用户拥有的业务权限编码列表。
   *
   * Business permission code list owned by the current user.
   */
  permissions: string[];

  /**
   * 当前用户可访问的菜单树。
   *
   * Accessible menu tree of the current user.
   */
  menu: CurrentUserMenuNode[];
}

/**
 * 用户列表查询参数。
 * User list query parameters.
 */
export interface SysUserListQuery {
  /**
   * 当前页码，从 1 开始。
   * Current page number, starting from 1.
   */
  pageNum: number;

  /**
   * 每页记录数，范围为 1 到 999。
   * Records per page, from 1 to 999.
   */
  pageSize: number;
}

/**
 * 用户列表记录。
 * User list record.
 */
export interface SysUserListItem {
  /**
   * 用户主键 ID。
   * User primary key ID.
   */
  id: number;

  /**
   * 登录用户名。
   * Login username.
   */
  username: string;

  /**
   * 用户昵称；后端未返回时为空。
   * Nickname; absent when not returned by the backend.
   */
  nickname?: string | null;

  /**
   * 电子邮箱。
   * Email address.
   */
  email: string;

  /**
   * 手机号；后端未返回时为空。
   * Phone number; absent when not returned by the backend.
   */
  phone?: string | null;

  /**
   * 用户头像地址；后端未返回时为空。
   * Avatar URL; absent when not returned by the backend.
   */
  avatar?: string | null;

  /**
   * 启用状态。
   * Availability status.
   */
  status: BooleanValue;

  /**
   * 关联角色主键 ID 列表。
   * Associated role primary key IDs.
   */
  roleIds: number[];
}

/**
 * 用户新增或更新请求。
 * 密码创建时必填且长度为 8 到 72 个字符；更新时为空字符串表示保持原密码。头像字段为后端已持久化的 URL 或相对路径，不代表文件上传能力。
 *
 * User create or update request.
 * Password is required and 8 to 72 characters on creation; an empty string preserves the existing password during updates. The avatar field is a persisted URL or relative path, not file-upload support.
 */
export interface SysUserSaveRequest {
  /**
   * 登录用户名，最大 64 个字符。
   * Login username, up to 64 characters.
   */
  username: string;

  /**
   * 用户昵称，最大 50 个字符。
   * Nickname, up to 50 characters.
   */
  nickname?: string;

  /**
   * 登录密码，最大 72 个字符。
   * Login password, up to 72 characters.
   */
  password: string;

  /**
   * 电子邮箱，最大 255 个字符。
   * Email address, up to 255 characters.
   */
  email: string;

  /**
   * 手机号，最大 32 个字符。
   * Phone number, up to 32 characters.
   */
  phone?: string;

  /**
   * 用户头像 URL 或相对路径，最大 512 个字符。
   * Avatar URL or relative path, up to 512 characters.
   */
  avatar?: string;

  /**
   * 启用状态。
   * Availability status.
   */
  status: BooleanValue;

  /**
   * 关联角色主键 ID 列表。
   * Associated role primary key IDs.
   */
  roleIds: number[];
}

/**
 * 用户分页结果。
 * User pagination result.
 */
export interface SysUserListPage {
  /**
   * 当前页用户记录。
   * User records on the current page.
   */
  records: SysUserListItem[];

  /**
   * 符合查询条件的总记录数。
   * Total records matching the query.
   */
  total: number;
}
