import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { MenuTreeNode, Role } from '#/entity';
import { BasicStatusEnum } from '#/enum';
import useLocale from '@/locales/use-locale';
import { BASIC_STATUS_LABEL_KEY_MAP } from '@/constants';
import { Badge } from '@/ui/badge';
import { Icon } from '@/components/icon';
import Button from '@/ui/button';
import { toast } from 'sonner';
import { flattenTree } from '@/utils';
import { createRoleApi, deleteRoleApi, getRoleListApi, updateRoleApi } from '@/api/services/role';
import { getMenuListApi } from '@/api/services/menu';
import type { RoleFormValues, RoleModalState, SaveRolePayload } from './types';

const ROLE_PAGE_I18N_PREFIX = 'pages.management.system.role';

type UseRolePageResult = {
  /**
   * 角色表格数据。
   *
   * Role table data.
   */
  roleTableData: Role[];

  /**
   * 菜单树候选项。
   *
   * Menu tree options.
   */
  menuTreeData: MenuTreeNode[];

  /**
   * 表格加载状态。
   *
   * Table loading state.
   */
  tableLoading: boolean;

  /**
   * 弹窗确认提交状态。
   *
   * Modal confirm loading state.
   */
  confirmLoading: boolean;

  /**
   * 待确认删除的角色。
   *
   * Role pending delete confirmation.
   */
  deletingRole: Role | null;

  /**
   * 弹窗状态。
   *
   * Modal state.
   */
  roleModalState: RoleModalState;

  /**
   * 表格列定义。
   *
   * Table column definitions.
   */
  columns: ColumnsType<Role>;

  /**
   * 打开新建弹窗。
   *
   * Open the create modal.
   */
  handleCreate: VoidFunction;

  /**
   * 关闭弹窗。
   *
   * Close the modal.
   */
  handleCancel: VoidFunction;

  /**
   * 关闭删除确认弹窗。
   *
   * Close the delete confirmation dialog.
   */
  handleDeleteCancel: VoidFunction;

  /**
   * 确认删除角色。
   *
   * Confirm role deletion.
   */
  handleDeleteConfirm: () => Promise<void>;

  /**
   * 保存角色。
   * @param value - 当前表单值。
   *
   * Save a role.
   * @param value - Current form values.
   */
  handleSave: (value: RoleFormValues) => Promise<void>;
};

const defaultRoleValue: RoleFormValues = {
  id: '',
  name: '',
  code: '',
  order: 1,
  status: BasicStatusEnum.ENABLE,
  desc: '',
  menus: []
};

/**
 * 规范化角色提交值。
 * 页面在提交前先做一次轻量收敛，保证空白字符、大小写和空描述不会把列表数据搅乱。
 * @param value - 原始表单值。
 * @returns 规范化后的提交数据。
 *
 * Normalize role values before submission.
 * The page performs a lightweight normalization pass so whitespace, code casing, and empty descriptions do not pollute stored role records.
 * @param value - Raw form value.
 * @returns Normalized payload.
 */
const buildRolePayload = (value: RoleFormValues): SaveRolePayload => ({
  ...value,
  name: value.name.trim(),
  code: value.code.trim().toUpperCase(),
  order: value.order ?? 0,
  desc: value.desc?.trim() ?? '',
  menus: structuredClone(value.menus ?? [])
});

/**
 * 统计角色授权菜单数量。
 * 角色列表不直接铺出整棵授权树，而是给出数量摘要，避免表格列被菜单名称撑爆。
 * @param menus - 角色授权菜单树。
 * @returns 授权菜单数量。
 *
 * Count the number of authorized menus on a role.
 * The table shows a compact summary instead of rendering the full authorized tree in a column.
 * @param menus - Authorized menu tree.
 * @returns Authorized menu count.
 */
const getAuthorizedMenuCount = (menus: MenuTreeNode[] = []): number => flattenTree(menus).length;

/**
 * 管理角色页面的数据加载、弹窗状态和表格操作。
 * 页面组件只负责组合标题、表格和弹窗，避免把列表请求、保存分发和列定义全部堆进 TSX。
 * @returns 角色页面所需的状态和操作。
 *
 * Manage role page data loading, modal state, and table actions.
 * The page component only composes the header, table, and modal so request flows, save dispatching, and column definitions do not pile up inside TSX.
 * @returns State and actions required by the role page.
 */
export function useRolePage(): UseRolePageResult {
  const { t } = useLocale();
  const [roleTableData, setRoleTableData] = useState<Role[]>([]);
  const [menuTreeData, setMenuTreeData] = useState<MenuTreeNode[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);

  const [roleModalState, setRoleModalState] = useState<RoleModalState>({
    visible: false,
    type: 'create',
    formValue: defaultRoleValue
  });

  /**
   * 加载角色列表和菜单树。
   * 角色编辑依赖菜单树候选项，因此这里一起请求，避免弹窗打开后再二次等待。
   *
   * Load the role list and menu tree.
   * Role editing depends on menu tree options, so both requests are executed together before the modal opens.
   */
  const loadRolePageData = useCallback(async (): Promise<void> => {
    setTableLoading(true);

    try {
      const [roles, menus] = await Promise.all([getRoleListApi(), getMenuListApi()]);
      setRoleTableData(roles);
      setMenuTreeData(menus);
    } catch (error) {
      const message = error instanceof Error ? error.message : t(`${ROLE_PAGE_I18N_PREFIX}.toast.loadFailed`);
      toast.error(message);
    } finally {
      setTableLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadRolePageData();
  }, [loadRolePageData]);

  const handleCreate = useCallback(() => {
    setRoleModalState({
      visible: true,
      type: 'create',
      formValue: defaultRoleValue
    });
  }, []);

  const handleEdit = useCallback((role: Role) => {
    setRoleModalState({
      visible: true,
      type: 'edit',
      formValue: {
        id: role.id,
        name: role.name,
        code: role.code,
        order: role.order,
        status: role.status ?? BasicStatusEnum.ENABLE,
        desc: role.desc ?? '',
        menus: structuredClone(role.menus ?? [])
      }
    });
  }, []);

  const handleCancel = useCallback(() => {
    setRoleModalState(previousState => ({
      ...previousState,
      visible: false
    }));
  }, []);

  /**
   * 保存角色。
   * 新增和编辑走同一个弹窗，所以这里根据 modal type 分发到不同接口。
   * @param value - 当前表单值。
   *
   * Save a role.
   * Create and edit share the same modal, so the page dispatches to different APIs based on the modal type here.
   * @param value - Current form value.
   */
  const handleSave = useCallback(
    async (value: RoleFormValues): Promise<void> => {
      setConfirmLoading(true);

      try {
        const payload = buildRolePayload(value);
        const roles = roleModalState.type === 'create' ? await createRoleApi(payload as Role) : await updateRoleApi(payload as Role);

        setRoleTableData(roles);
        setRoleModalState(previousState => ({
          ...previousState,
          visible: false
        }));
        toast.success(
          roleModalState.type === 'create'
            ? t(`${ROLE_PAGE_I18N_PREFIX}.toast.createSuccess`)
            : t(`${ROLE_PAGE_I18N_PREFIX}.toast.updateSuccess`)
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : t(`${ROLE_PAGE_I18N_PREFIX}.toast.saveFailed`);
        toast.error(message);
      } finally {
        setConfirmLoading(false);
      }
    },
    [roleModalState.type, t]
  );

  /**
   * 打开删除确认弹窗。
   * 破坏性操作必须先记录目标角色，再等待用户确认，避免误触表格按钮直接删数据。
   * @param role - 待删除角色。
   *
   * Open the delete confirmation dialog.
   * Destructive actions must capture the target role first and wait for explicit confirmation so an accidental table click cannot delete data immediately.
   * @param role - Role pending deletion.
   */
  const handleDeleteRequest = useCallback((role: Role): void => {
    setDeletingRole(role);
  }, []);

  /**
   * 关闭删除确认弹窗。
   *
   * Close the delete confirmation dialog.
   */
  const handleDeleteCancel = useCallback(() => {
    setDeletingRole(null);
  }, []);

  /**
   * 确认删除角色。
   * 列表页不做本地乐观删除，而是始终以接口返回结果刷新，避免顺序和过滤规则在本地与 mock 源数据分叉。
   *
   * Confirm role deletion.
   * The page always refreshes from the API response instead of doing local optimistic removal so ordering and filtering rules cannot drift from the mock source of truth.
   */
  const handleDeleteConfirm = useCallback(async (): Promise<void> => {
    if (!deletingRole) return;

    try {
      const roles = await deleteRoleApi(deletingRole.id);
      setRoleTableData(roles);
      setDeletingRole(null);
      toast.success(t(`${ROLE_PAGE_I18N_PREFIX}.toast.deleteSuccess`));
    } catch (error) {
      const message = error instanceof Error ? error.message : t(`${ROLE_PAGE_I18N_PREFIX}.toast.deleteFailed`);
      toast.error(message);
    }
  }, [deletingRole, t]);

  const columns: ColumnsType<Role> = useMemo(
    () => [
      {
        title: t(`${ROLE_PAGE_I18N_PREFIX}.columns.order`),
        dataIndex: 'order',
        width: 90
      },
      {
        title: t(`${ROLE_PAGE_I18N_PREFIX}.columns.name`),
        dataIndex: 'name',
        width: 220
      },
      {
        title: t(`${ROLE_PAGE_I18N_PREFIX}.columns.code`),
        dataIndex: 'code',
        width: 180
      },
      {
        title: t(`${ROLE_PAGE_I18N_PREFIX}.columns.status`),
        dataIndex: 'status',
        align: 'center',
        width: 120,
        render: (status: BasicStatusEnum = BasicStatusEnum.ENABLE) => (
          <Badge variant={status === BasicStatusEnum.DISABLE ? 'error' : 'success'}>{t(BASIC_STATUS_LABEL_KEY_MAP[status])}</Badge>
        )
      },
      {
        title: t(`${ROLE_PAGE_I18N_PREFIX}.columns.menus`),
        dataIndex: 'menus',
        align: 'center',
        width: 100,
        render: (_, record) => getAuthorizedMenuCount(record.menus ?? [])
      },
      {
        title: t(`${ROLE_PAGE_I18N_PREFIX}.columns.description`),
        dataIndex: 'desc'
      },
      {
        title: t(`${ROLE_PAGE_I18N_PREFIX}.columns.action`),
        key: 'operation',
        align: 'center',
        width: 120,
        render: (_, record) => (
          <div className="text-gray flex w-full justify-center">
            <Button variant="ghost" size="icon" aria-label={t(`${ROLE_PAGE_I18N_PREFIX}.actions.edit`)} onClick={() => handleEdit(record)}>
              <Icon icon="solar:pen-bold-duotone" size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t(`${ROLE_PAGE_I18N_PREFIX}.actions.delete`)}
              onClick={() => handleDeleteRequest(record)}>
              <Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
            </Button>
          </div>
        )
      }
    ],
    [handleDeleteRequest, handleEdit, t]
  );

  return {
    roleTableData,
    menuTreeData,
    tableLoading,
    confirmLoading,
    deletingRole,
    roleModalState,
    columns,
    handleCreate,
    handleCancel,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleSave
  };
}
