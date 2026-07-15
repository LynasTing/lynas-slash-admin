import type { Role, UserInfo } from '#/entity';

/**
 * 用户弹窗操作类型。
 * 用户管理页后续通常会复用一个弹窗承载新增和编辑，所以先把操作模式抽成稳定类型，避免散落的字符串字面量。
 *
 * User modal action type.
 * The user management page will typically reuse a single modal for both create and edit flows, so the action mode is extracted as a stable type instead of scattering string literals.
 */
export type UserModalType = 'create' | 'edit';

/**
 * 用户页面使用的角色摘要。
 * 用户列表和表单通常只关心角色展示与选择，不需要把角色的菜单树等重字段直接带入用户模块。
 *
 * Role summary used by the user page.
 * The user list and form usually only need role display and selection, so heavy role fields such as menu trees should not be pulled into the user module directly.
 */
export type UserRoleSummary = Pick<Role, 'id' | 'name' | 'code' | 'status' | 'desc'>;

/**
 * 用户列表行数据。
 * 当前页面既要兼容全局用户实体里的基础字段，也要容纳 mock 数据中以单角色对象展示的结构，因此单独定义页面行类型更稳妥。
 *
 * User table row data.
 * The current page needs to work with both the base fields from the global user entity and the mock structure that exposes a single role object, so a page-specific row type is safer.
 */
export type UserTableRow = Omit<UserInfo, 'roles'> & {
  /**
   * 当前页展示的主角色。
   * 现有 mock 数据和列表 UI 都按单角色展示，先显式收敛为单个角色摘要，后续再决定是否扩展为多角色展示。
   *
   * Primary role displayed on this page.
   * The existing mock data and list UI both render a single role, so the page explicitly narrows this to one role summary for now.
   */
  role?: UserRoleSummary | null;

  /**
   * 创建时间。
   * 用户实体当前未统一声明该字段，但管理页列表和详情很可能会用到，因此提前补齐页面层可选字段。
   *
   * Creation time.
   * The global user entity does not currently declare this field consistently, but the management page will likely use it in lists and detail views, so it is added here as an optional page-level field.
   */
  createdAt?: string | Date;

  /**
   * 更新时间。
   * 该字段用于承接 mock 数据和未来接口返回，避免页面在接入排序、审计信息时再次临时补类型。
   *
   * Update time.
   * This field accommodates both mock data and future API responses, preventing another round of ad-hoc typing when sorting or audit metadata is introduced.
   */
  updatedAt?: string | Date;
};

/**
 * 用户表单值。
 * 表单层只保留真正可编辑的输入字段，并把角色选择收敛成角色 ID，避免直接双向绑定整块角色对象。
 *
 * User form values.
 * The form layer keeps only fields that are actually editable and narrows role selection to a role ID instead of binding an entire role object.
 */
export type UserFormValues = Pick<UserTableRow, 'id' | 'username' | 'email' | 'avatar' | 'status'> & {
  /**
   * 当前选择的角色 ID。
   * 页面提交时应传递稳定主键，而不是混入展示用角色对象，避免保存载荷和列表展示结构耦合。
   *
   * Currently selected role ID.
   * The page should submit a stable primary key instead of mixing in a display-oriented role object, keeping save payloads decoupled from list rendering structure.
   */
  roleId: string;

  /**
   * 登录密码。
   * 新增用户时通常必填，编辑用户时可作为可选重置项，因此保留在页面表单层而不强行写回全局实体。
   *
   * Login password.
   * It is typically required when creating a user and optional when editing as a reset field, so it stays in the page form layer instead of being forced back into the global entity.
   */
  password: string;
};

/**
 * 保存用户时提交的数据。
 * 当前与表单值一致；保留独立别名是为了后续接入接口时，可以单独约束提交载荷而不影响表单状态类型。
 *
 * Submitted data when saving a user.
 * It currently matches the form values; the separate alias leaves room to constrain the API payload later without reshaping the form state type.
 */
export type SaveUserPayload = UserFormValues;
