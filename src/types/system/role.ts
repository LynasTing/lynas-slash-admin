import type { BooleanValue } from '../public/common';

/**
 * 新增或修改角色的请求参数。
 * Create or update role request parameters.
 */
export interface SysRoleSaveRequest {
  /**
   * 角色名称，最大 64 个字符。
   * Role name, up to 64 characters.
   */
  name: string;

  /**
   * 角色唯一编码，最大 64 个字符。
   * Unique role code, up to 64 characters.
   */
  code: string;

  /**
   * 关联菜单 ID 列表；空数组表示清空授权。
   * Associated menu IDs; an empty array clears authorization.
   */
  menuIds: number[];

  /**
   * 显示排序整数，范围为 0 到 2147483647。
   * Display sort integer, from 0 to 2147483647.
   */
  sort: number;

  /**
   * 启用状态。
   * Availability status.
   */
  status: BooleanValue;

  /**
   * 角色描述，最大 255 个字符。
   * Role description, up to 255 characters.
   */
  description?: string;
}

/**
 * 角色列表查询参数。
 * Role list query parameters.
 */
export interface SysRoleListQuery {
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

  /**
   * 按角色名称模糊筛选，最多 64 个字符。
   * Fuzzy filter by role name, up to 64 characters.
   */
  name?: string;

  /**
   * 按角色编码模糊筛选，最多 64 个字符。
   * Fuzzy filter by role code, up to 64 characters.
   */
  code?: string;

  /**
   * 按启用状态精确筛选。
   * Exact filter by availability status.
   */
  status?: BooleanValue;
}

/**
 * 角色列表记录。
 * Role list record.
 */
export interface SysRoleListItem {
  /**
   * 角色主键 ID。
   * Role primary key ID.
   */
  id: number;

  /**
   * 角色名称。
   * Role name.
   */
  name: string;

  /**
   * 角色唯一编码。
   * Unique role code.
   */
  code: string;

  /**
   * 显示排序值。
   * Display sort value.
   */
  sort: number;

  /**
   * 启用状态。
   * Availability status.
   */
  status: BooleanValue;

  /**
   * 角色描述；未填写时为 null。
   * Role description; null when it is not provided.
   */
  description: string | null;
}

/**
 * 角色下拉选项。
 * Role select option.
 */
export interface SysRoleOption {
  /**
   * 角色主键 ID。
   * Role primary key ID.
   */
  id: number;

  /**
   * 角色名称。
   * Role name.
   */
  name: string;

  /**
   * 角色唯一编码。
   * Unique role code.
   */
  code: string;

  /**
   * 启用状态。
   * Availability status.
   */
  status: BooleanValue;

  /**
   * 显示排序值。
   * Display sort value.
   */
  sort: number;
}

/**
 * 角色分页结果。
 * Role pagination result.
 */
export interface SysRoleListPage {
  /**
   * 当前页角色记录。
   * Role records on the current page.
   */
  records: SysRoleListItem[];

  /**
   * 符合查询条件的总记录数。
   * Total records matching the query.
   */
  total: number;
}

/**
 * 角色详情及其已授权菜单。
 * Role detail with its authorized menus.
 */
export interface SysRoleDetail extends SysRoleListItem {
  /**
   * 已授权菜单 ID 列表。
   * Authorized menu ID list.
   */
  menuIds: number[];
}
