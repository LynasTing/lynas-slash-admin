import type { Role } from '#/entity';

/**
 * 角色弹窗操作类型。
 * 页面用它区分当前弹窗是在创建角色，还是在编辑已有角色。
 *
 * Role modal action type.
 * The page uses it to distinguish whether the modal is creating a role or editing an existing one.
 */
export type RoleModalType = 'create' | 'edit';

/**
 * 角色表单值。
 * 只挑选角色管理页面真正会编辑的字段，避免表单层直接绑定完整实体并意外改动无关数据。
 *
 * Role form values.
 * Only fields edited by the role management page are selected, preventing the form layer from binding the full entity and mutating unrelated data.
 */
export type RoleFormValues = Pick<Role, 'id' | 'name' | 'code' | 'order' | 'status' | 'desc' | 'menus'>;

/**
 * 角色弹窗状态。
 * 页面用一个对象集中管理弹窗可见性、弹窗模式和当前表单初始值，避免多个零散 state 之间不同步。
 *
 * Role modal state.
 * The page keeps modal visibility, modal mode, and current initial form values in one object to avoid desynchronization across scattered state values.
 */
export type RoleModalState = {
  /**
   * 弹窗是否可见。
   *
   * Whether the modal is visible.
   */
  visible: boolean;

  /**
   * 当前弹窗操作类型。
   *
   * Current modal action type.
   */
  type: RoleModalType;

  /**
   * 弹窗标题。
   *
   * Modal title.
   */
  title: string;

  /**
   * 表单初始值。
   * 新增时使用默认角色值，编辑时使用当前角色数据。
   *
   * Initial form values.
   * Create mode uses default role values, while edit mode uses the selected role data.
   */
  formValue: RoleFormValues;
};

/**
 * 保存角色时提交的数据。
 * 当前与表单值保持一致；单独命名是为了以后接入接口时可以独立收敛提交 payload。
 *
 * Submitted data when saving a role.
 * It currently matches the form values; the separate name leaves room to narrow the API payload later.
 */
export type SaveRolePayload = RoleFormValues;
