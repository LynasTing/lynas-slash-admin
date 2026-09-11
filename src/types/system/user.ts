import type { BooleanValue } from '../public/common';

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
