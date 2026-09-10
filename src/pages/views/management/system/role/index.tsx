import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input, Select } from 'antd';
import Table from 'antd/es/table';
import type { ColumnsType } from 'antd/es/table';
import type { SysMenuTreeNode } from '#/system/menu';
import type { SysRoleListItem, SysRoleListQuery, SysRoleSaveRequest } from '#/system/role';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import useLocale from '@/locales/use-locale';
import { BASIC_STATUS_LABEL_KEY_MAP } from '@/constants';
import { Badge } from '@/ui/badge';
import { Icon } from '@/components/icon';
import Button from '@/ui/button';
import { Card, CardContent, CardHeader } from '@/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Text, Title } from '@/ui/typography';
import { toast } from 'sonner';
import { createRoleApi, deleteRoleApi, getRoleDetailApi, getRoleListApi, updateRoleApi } from '@/api/services/role';
import { getSysMenuListApi } from '@/api/system/menu';
import RoleModal from './role-modal';

const ROLE_PAGE_I18N_PREFIX = 'pages.management.system.role';

const defaultRoleValue: SysRoleSaveRequest = {
  name: '',
  code: '',
  sort: 1,
  status: BOOLEAN_VALUE_MAP.TRUE,
  description: '',
  menuIds: []
};

/**
 * 角色管理页面。
 *
 * Role management page.
 */
export default function RolePage(): React.ReactElement {
  const { t } = useLocale();
  const [roleTableData, setRoleTableData] = useState<SysRoleListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [filters, setFilters] = useState<Pick<SysRoleListQuery, 'name' | 'code' | 'status'>>({});
  const [appliedFilters, setAppliedFilters] = useState<Pick<SysRoleListQuery, 'name' | 'code' | 'status'>>({});
  const listRequestId = useRef(0);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [menuTreeData, setMenuTreeData] = useState<SysMenuTreeNode[]>([]);
  const [menuTreeLoaded, setMenuTreeLoaded] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deletingRole, setDeletingRole] = useState<SysRoleListItem | null>(null);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [roleModalFormValue, setRoleModalFormValue] = useState<SysRoleSaveRequest>(defaultRoleValue);

  /**
   * 加载角色列表。
   * 菜单树只服务于角色弹窗，不能因菜单接口故障阻断列表查询。
   *
   * Load the role list.
   * The menu tree serves only the role dialog, so a menu API failure must not block the list query.
   */
  const loadRoleList = useCallback(
    async (pageNum: number, pageSize: number, nextFilters: Pick<SysRoleListQuery, 'name' | 'code' | 'status'>): Promise<void> => {
      const requestId = ++listRequestId.current;
      setTableLoading(true);

      try {
        const rolePage = await getRoleListApi({ pageNum, pageSize, ...nextFilters });
        // 只接受最后一次查询结果，避免慢响应覆盖新的筛选或分页
        // Only accept the latest query so slow responses cannot replace newer results
        if (requestId !== listRequestId.current) return;

        setRoleTableData(rolePage.records);
        setTotal(rolePage.total);
      } catch {
        // 统一请求工具已展示错误消息；页面只保留现有列表数据
        // The request utility has shown the error; the page only keeps the current list data.
      } finally {
        // 旧请求不能结束新请求的加载状态
        // An older request must not clear the latest request loading state
        if (requestId === listRequestId.current) setTableLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    void loadRoleList(1, 10, {});
    return () => {
      listRequestId.current += 1;
    };
  }, [loadRoleList]);

  /**
   * 懒加载角色授权菜单树。
   * 角色列表不依赖菜单树，因此只在新增或编辑时加载一次，并在失败时阻止打开缺少授权候选项的弹窗。
   *
   * Lazily load the role authorization menu tree.
   * The role list does not depend on the tree, so load it once only for create or edit and prevent a dialog without authorization options on failure.
   * @returns Whether the menu tree is available for the dialog.
   */
  const loadMenuTree = useCallback(async (): Promise<boolean> => {
    // 已缓存的菜单树无需重复请求，避免分页和弹窗操作放大接口压力
    // A cached tree needs no second request, preventing pagination and dialog actions from amplifying API load.
    if (menuTreeLoaded) return true;

    try {
      const menus = await getSysMenuListApi();
      setMenuTreeData(menus);
      setMenuTreeLoaded(true);
      return true;
    } catch {
      // 统一请求工具已展示错误消息；不在菜单数据缺失时打开授权弹窗
      // The request utility has shown the error; do not open the authorization dialog without menu data.
      return false;
    }
  }, [menuTreeLoaded]);

  /**
   * 打开新增角色弹窗。
   * 授权菜单是表单的必要候选数据，加载失败时保持弹窗关闭。
   *
   * Open the create-role dialog.
   * Authorized menus are required form options, so keep the dialog closed when loading fails.
   * @returns Resolves after the dialog is opened or menu loading fails.
   */
  const handleCreate = async (): Promise<void> => {
    // 缺少菜单候选项时不能提交可靠的 menuIds
    // Reliable menuIds cannot be submitted without menu options.
    if (!(await loadMenuTree())) return;

    setEditingRoleId(null);
    setRoleModalFormValue({ ...defaultRoleValue });
    setRoleModalVisible(true);
  };

  const handleSearch = (): void => {
    setAppliedFilters(filters);
    setPagination(previous => ({ ...previous, current: 1 }));
    void loadRoleList(1, pagination.pageSize, filters);
  };

  const handleResetFilters = (): void => {
    setFilters({});
    setAppliedFilters({});
    setPagination(previous => ({ ...previous, current: 1 }));
    void loadRoleList(1, pagination.pageSize, {});
  };

  const handleEdit = useCallback(
    async (role: SysRoleListItem): Promise<void> => {
      try {
        const [detail, isMenuTreeReady] = await Promise.all([getRoleDetailApi(role.id), loadMenuTree()]);
        // 菜单候选项缺失时不能安全编辑授权
        // Authorization cannot be edited safely without menu options
        if (!isMenuTreeReady) return;

        setEditingRoleId(detail.id);
        setRoleModalFormValue({
          name: detail.name,
          code: detail.code,
          sort: detail.sort,
          status: detail.status,
          description: detail.description ?? '',
          menuIds: detail.menuIds
        });
        setRoleModalVisible(true);
      } catch {
        // 请求工具已统一展示错误提示，页面保留当前列表状态
        // The request utility reports errors while the page keeps its current data
      }
    },
    [loadMenuTree]
  );

  const handleCancel = useCallback((): void => {
    setRoleModalVisible(false);
  }, []);

  /**
   * 保存角色。
   * 新增和编辑走同一个弹窗，所以这里根据 editing role ID 分发到不同接口。
   * @param value - 当前表单值。
   *
   * Save a role.
   * Create and edit share the same modal, so the page dispatches to different APIs based on the editing role ID here.
   * @param value - Current form value.
   */
  const handleSave = useCallback(
    async (value: SysRoleSaveRequest): Promise<void> => {
      setConfirmLoading(true);

      try {
        // 新建与编辑共用表单，但调用不同的写接口
        // Creation and editing share a form but use different write endpoints
        if (editingRoleId === null) {
          await createRoleApi(value);
        } else {
          await updateRoleApi(editingRoleId, value);
        }
        await loadRoleList(pagination.current, pagination.pageSize, appliedFilters);
        setRoleModalVisible(false);
        toast.success(
          editingRoleId === null ? t(`${ROLE_PAGE_I18N_PREFIX}.toast.createSuccess`) : t(`${ROLE_PAGE_I18N_PREFIX}.toast.updateSuccess`)
        );
      } catch {
        // 统一请求工具已展示错误消息；保留弹窗和表单内容，允许用户修正后重试
        // The request utility has shown the error; keep the dialog and values for a corrected retry.
      } finally {
        setConfirmLoading(false);
      }
    },
    [editingRoleId, appliedFilters, loadRoleList, pagination, t]
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
  const handleDeleteRequest = useCallback((role: SysRoleListItem): void => {
    setDeletingRole(role);
  }, []);

  /**
   * 关闭删除确认弹窗。
   *
   * Close the delete confirmation dialog.
   */
  const handleDeleteCancel = useCallback((): void => {
    // 删除请求完成前保留目标，避免重复操作或切换确认对象
    // Keep the target while deletion is pending to prevent duplicate or conflicting actions
    if (!deleteLoading) setDeletingRole(null);
  }, [deleteLoading]);

  /**
   * 确认删除角色。
   * 列表页不做本地乐观删除，而是始终以接口返回结果刷新，避免顺序和过滤规则在本地与 mock 服务端数据分叉。
   *
   * Confirm role deletion.
   * The page always refreshes from the API response instead of doing local optimistic removal so ordering and filtering rules cannot drift from the server data.
   */
  const handleDeleteConfirm = useCallback(async (): Promise<void> => {
    // 仅处理已确认且尚未开始删除的目标
    // Only delete a confirmed target when no deletion is in progress
    if (!deletingRole || deleteLoading) return;
    setDeleteLoading(true);

    try {
      await deleteRoleApi(deletingRole.id);
      // 删除本页最后一条记录时退回前一页
      // Move back when deleting the last record on the current page
      const current = roleTableData.length === 1 ? Math.max(1, pagination.current - 1) : pagination.current;
      setPagination(previous => ({ ...previous, current }));
      await loadRoleList(current, pagination.pageSize, appliedFilters);
      setDeletingRole(null);
      toast.success(t(`${ROLE_PAGE_I18N_PREFIX}.toast.deleteSuccess`));
    } catch {
      // 统一请求工具已展示错误消息；保留删除确认框，允许用户决定是否重试
      // The request utility has shown the error; keep the confirmation dialog for a possible retry.
    } finally {
      setDeleteLoading(false);
    }
  }, [deletingRole, deleteLoading, roleTableData.length, appliedFilters, loadRoleList, pagination, t]);

  const columns: ColumnsType<SysRoleListItem> = useMemo(
    () => [
      {
        title: t('common.fields.order'),
        dataIndex: 'sort',
        width: 90
      },
      {
        title: t('common.fields.name'),
        dataIndex: 'name',
        width: 220
      },
      {
        title: t('common.fields.code'),
        dataIndex: 'code',
        width: 180
      },
      {
        title: t('common.fields.status'),
        dataIndex: 'status',
        align: 'center',
        width: 120,
        render: (status: SysRoleListItem['status'] = BOOLEAN_VALUE_MAP.TRUE) => (
          <Badge variant={status === BOOLEAN_VALUE_MAP.FALSE ? 'error' : 'success'}>{t(BASIC_STATUS_LABEL_KEY_MAP[status])}</Badge>
        )
      },
      {
        title: t('common.fields.description'),
        dataIndex: 'description'
      },
      {
        title: t('common.fields.action'),
        key: 'operation',
        align: 'center',
        width: 120,
        render: (_, record) => (
          <div className="text-gray flex w-full justify-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label={t(`${ROLE_PAGE_I18N_PREFIX}.actions.edit`)}
              onClick={() => void handleEdit(record)}>
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <Title as="h4">{t(`${ROLE_PAGE_I18N_PREFIX}.title`)}</Title>
            <Text color="secondary">{t(`${ROLE_PAGE_I18N_PREFIX}.description`)}</Text>
          </div>
          <Button onClick={() => void handleCreate()}>{t(`${ROLE_PAGE_I18N_PREFIX}.actions.new`)}</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 rounded-md border border-border bg-muted/30 p-4">
          <div className="grid items-end gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_10rem_auto]">
            <label className="block space-y-2" htmlFor="role-filter-name">
              <span className="text-sm font-medium text-foreground">{t('common.fields.name')}</span>
              <Input
                maxLength={64}
                id="role-filter-name"
                placeholder={t('common.fields.name')}
                value={filters.name ?? ''}
                onChange={event => setFilters(previous => ({ ...previous, name: event.target.value || undefined }))}
              />
            </label>
            <label className="block space-y-2" htmlFor="role-filter-code">
              <span className="text-sm font-medium text-foreground">{t('common.fields.code')}</span>
              <Input
                maxLength={64}
                id="role-filter-code"
                placeholder={t('common.fields.code')}
                value={filters.code ?? ''}
                onChange={event => setFilters(previous => ({ ...previous, code: event.target.value || undefined }))}
              />
            </label>
            <label className="block space-y-2" htmlFor="role-filter-status">
              <span className="text-sm font-medium text-foreground">{t('common.fields.status')}</span>
              <Select
                id="role-filter-status"
                allowClear
                className="w-full"
                placeholder={t('common.fields.status')}
                value={filters.status}
                options={[
                  { label: t(BASIC_STATUS_LABEL_KEY_MAP[BOOLEAN_VALUE_MAP.TRUE]), value: BOOLEAN_VALUE_MAP.TRUE },
                  { label: t(BASIC_STATUS_LABEL_KEY_MAP[BOOLEAN_VALUE_MAP.FALSE]), value: BOOLEAN_VALUE_MAP.FALSE }
                ]}
                onChange={status => setFilters(previous => ({ ...previous, status }))}
              />
            </label>
            <div className="flex items-center gap-2 xl:border-l xl:border-border xl:pl-4">
              <Button onClick={handleSearch}>
                <Icon icon="solar:magnifer-linear" size={14} />
                {t('common.actions.search')}
              </Button>
              <Button variant="ghost" onClick={handleResetFilters}>
                <Icon icon="solar:restart-bold" size={16} />
                {t('common.actions.reset')}
              </Button>
            </div>
          </div>
        </div>
        <Table
          rowKey="id"
          size="small"
          columns={columns}
          dataSource={roleTableData}
          loading={tableLoading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total,
            showSizeChanger: true
          }}
          onChange={page => {
            const current = page.current ?? 1;
            const pageSize = page.pageSize ?? pagination.pageSize;
            setPagination({ current, pageSize });
            void loadRoleList(current, pageSize, appliedFilters);
          }}
        />
      </CardContent>
      <RoleModal
        visible={roleModalVisible}
        isEditing={editingRoleId !== null}
        formValue={roleModalFormValue}
        menuTreeData={menuTreeData}
        confirmLoading={confirmLoading}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <Dialog open={!!deletingRole} onOpenChange={open => !open && handleDeleteCancel()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t(`${ROLE_PAGE_I18N_PREFIX}.deleteDialog.title`)}</DialogTitle>
            <DialogDescription>
              {deletingRole ? t(`${ROLE_PAGE_I18N_PREFIX}.deleteDialog.description`, { name: deletingRole.name }) : ''}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleDeleteCancel}>
              {t('common.actions.cancel')}
            </Button>
            <Button type="button" variant="destructive" disabled={deleteLoading} onClick={() => void handleDeleteConfirm()}>
              {t('common.actions.confirmDelete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
