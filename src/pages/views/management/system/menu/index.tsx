import { useCallback, useEffect, useMemo, useState } from 'react';
import Table from 'antd/es/table';
import type { ColumnsType } from 'antd/es/table';
import type { TFunction } from 'i18next';
import type { SysMenuSaveRequest, SysMenuTreeNode } from '#/system/menu';
import { SYS_MENU_CATEGORY_MAP } from '#/system/menu';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import { createSysMenuApi, deleteSysMenuApi, getSysMenuListApi, updateSysMenuApi } from '@/api/system/menu';
import { Badge } from '@/ui/badge';
import Button from '@/ui/button';
import { Card, CardContent, CardHeader } from '@/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Title } from '@/ui/typography';
import { Icon } from '@/components/icon';
import useLocale from '@/locales/use-locale';
import { toast } from 'sonner';
import SysMenuModal from './menu-modal';

const MENU_PAGE_I18N_PREFIX = 'pages.management.system.menu';

const defaultMenuValue: SysMenuSaveRequest = {
  parentId: 0,
  name: '',
  i18nKey: '',
  code: '',
  category: SYS_MENU_CATEGORY_MAP.MENU,
  sort: 0,
  status: BOOLEAN_VALUE_MAP.TRUE,
  hidden: BOOLEAN_VALUE_MAP.FALSE,
  description: ''
};

const categoryKeyMap: Record<SysMenuTreeNode['category'], string> = {
  [SYS_MENU_CATEGORY_MAP.GROUP]: `${MENU_PAGE_I18N_PREFIX}.types.GROUP`,
  [SYS_MENU_CATEGORY_MAP.DIRECTORY]: `${MENU_PAGE_I18N_PREFIX}.types.DIRECTORY`,
  [SYS_MENU_CATEGORY_MAP.MENU]: `${MENU_PAGE_I18N_PREFIX}.types.MENU`,
  [SYS_MENU_CATEGORY_MAP.ACTION]: `${MENU_PAGE_I18N_PREFIX}.types.ACTION`
};

/**
 * 获取菜单的当前语言展示名称。
 * 固定菜单优先使用后端提供的国际化键；自定义菜单或未配置翻译时回退名称字段。
 *
 * Get the menu display name for the current language.
 * Fixed menus prefer the backend-provided internationalization key; custom menus or missing translations fall back to the name field.
 *
 * @param menu - 菜单树节点。
 * @param t - 国际化翻译函数。
 * @returns 当前语言下的菜单展示名称。
 *
 * @param menu - Menu tree node.
 * @param t - Internationalization translation function.
 * @returns Menu display name in the current language.
 */
const getMenuDisplayName = (menu: SysMenuTreeNode, t: TFunction): string => {
  // i18nKey 为空时保留服务端名称，兼容可由用户创建的非预置菜单。
  // Preserve the server name when i18nKey is empty to support menus that are not predefined by the application.
  if (!menu.i18nKey) return menu.name;

  return t(menu.i18nKey, { defaultValue: menu.name });
};

/**
 * 清理可选文本字段并生成符合后端 DTO 的载荷。
 * 空白值在请求边界转为 undefined，避免把无意义的空字符串持久化到服务端。
 *
 * Normalize optional text fields into the backend DTO payload.
 * Blank values become undefined at the request boundary, preventing meaningless empty strings from being persisted on the server.
 *
 * @param values - 已通过表单校验的菜单值。
 * @returns 可发送给后端的菜单新增请求。
 *
 * @param values - Validated menu form values.
 * @returns Menu creation request ready for the backend.
 */
const createMenuSaveRequest = (values: SysMenuSaveRequest): SysMenuSaveRequest => {
  const trimOptionalValue = (value: string | undefined): string | undefined => value?.trim() || undefined;

  return {
    ...values,
    name: values.name.trim(),
    i18nKey: trimOptionalValue(values.i18nKey),
    code: values.code.trim(),
    path: trimOptionalValue(values.path),
    component: trimOptionalValue(values.component),
    icon: trimOptionalValue(values.icon),
    description: trimOptionalValue(values.description),
    externalLink: trimOptionalValue(values.externalLink)
  };
};

/**
 * 将树节点转换为新增或修改接口需要的表单值。
 * Convert a tree node into form values accepted by the create or update API.
 *
 * @param menu - 菜单树节点。
 * @returns 菜单保存请求值。
 *
 * @param menu - Menu tree node.
 * @returns Menu save request values.
 */
const getMenuFormValue = (menu: SysMenuTreeNode): SysMenuSaveRequest => ({
  parentId: menu.parentId,
  name: menu.name,
  i18nKey: menu.i18nKey || undefined,
  code: menu.code,
  category: menu.category,
  sort: menu.sort,
  status: menu.status,
  path: menu.path ?? undefined,
  component: menu.component ?? undefined,
  icon: menu.icon ?? undefined,
  hidden: menu.hidden,
  description: menu.description ?? undefined,
  externalLink: menu.externalLink ?? undefined
});

/**
 * 从父级候选树中移除当前节点及其后代，避免编辑时形成循环层级。
 * Remove the edited node and its descendants from parent candidates to prevent circular hierarchies.
 *
 * @param nodes - 菜单树节点列表。
 * @param excludedId - 需要排除的节点 ID。
 * @returns 可作为父级候选项的菜单树。
 *
 * @param nodes - Menu tree nodes.
 * @param excludedId - ID of the node to exclude.
 * @returns Menu tree usable as parent candidates.
 */
const excludeMenuBranch = (nodes: SysMenuTreeNode[], excludedId: number): SysMenuTreeNode[] => {
  // 过滤当前编辑节点及其整个分支，保留其他节点的原始层级和字段。
  // Filter the edited node and its whole branch while preserving other nodes and their fields.
  return nodes.filter(node => node.id !== excludedId).map(node => ({ ...node, children: excludeMenuBranch(node.children, excludedId) }));
};

/**
 * 菜单管理页面。
 * 后端直接提供完整菜单树，树表格和父级选择共用同一份数据以保持层级关系一致。
 *
 * Menu management page.
 * The backend provides the complete menu tree directly, and the tree table and parent selector share the same data to keep hierarchy consistent.
 *
 * @returns 菜单管理页面。
 *
 * @returns Menu management page.
 */
export default function SysMenuPage() {
  const { t } = useLocale();
  const [menuTreeData, setMenuTreeData] = useState<SysMenuTreeNode[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [parentLocked, setParentLocked] = useState<boolean>(false);
  const [editingMenuId, setEditingMenuId] = useState<number | null>(null);
  const [deletingMenu, setDeletingMenu] = useState<SysMenuTreeNode | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [modalFormValue, setModalFormValue] = useState<SysMenuSaveRequest>(defaultMenuValue);

  /**
   * 加载完整菜单树。
   * 列表接口无分页，返回结果同时作为树表格数据和父级菜单候选项。
   *
   * Load the complete menu tree.
   * The list endpoint is unpaginated, and its result serves both the tree table and parent menu candidates.
   *
   * @returns 无返回值。
   *
   * @returns No return value.
   */
  const loadMenuTreeData = useCallback(async () => {
    setTableLoading(true);

    try {
      const result = await getSysMenuListApi();
      setMenuTreeData(result);
    } catch {
      // 请求工具已统一展示错误提示；页面只结束加载状态，避免同一失败重复弹出提示。
      // The request utility already displays the error message; the page only finishes loading to avoid duplicate notifications for one failure.
    } finally {
      setTableLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMenuTreeData();
  }, [loadMenuTreeData]);

  /**
   * 打开新增菜单弹窗。
   * 每次打开都提供新的默认值对象，触发弹窗表单重置，避免未保存输入残留。
   *
   * Open the menu creation dialog.
   * A new default-value object is supplied on every open so the modal resets and cannot retain unsaved input.
   *
   * @returns 无返回值。
   *
   * @returns No return value.
   */
  const handleCreateMenu = useCallback((parentId: number = 0) => {
    const nextFormValue: SysMenuSaveRequest = { ...defaultMenuValue, parentId };

    setEditingMenuId(null);
    setModalFormValue(nextFormValue);
    setParentLocked(parentId !== 0);
    setModalVisible(true);
  }, []);

  /**
   * 打开编辑菜单弹窗并回填当前节点。
   * Open the edit menu dialog and populate it with the selected node.
   *
   * @param menu - 待编辑的菜单节点。
   * @returns 无返回值。
   *
   * @param menu - Menu node to edit.
   * @returns No return value.
   */
  const handleEditMenu = useCallback((menu: SysMenuTreeNode): void => {
    setEditingMenuId(menu.id);
    setModalFormValue(getMenuFormValue(menu));
    setParentLocked(false);
    setModalVisible(true);
  }, []);

  /**
   * 打开菜单删除确认弹窗。
   * 破坏性操作必须等待用户明确确认，避免误触操作按钮直接删除菜单。
   *
   * Open the menu deletion confirmation dialog.
   * Destructive actions must wait for explicit confirmation so an accidental button click cannot delete a menu immediately.
   *
   * @param menu - 待删除的菜单节点。
   * @returns 无返回值。
   *
   * @param menu - Menu node pending deletion.
   * @returns No return value.
   */
  const handleDeleteRequest = useCallback((menu: SysMenuTreeNode): void => {
    setDeletingMenu(menu);
  }, []);

  /**
   * 关闭菜单删除确认弹窗。
   *
   * Close the menu deletion confirmation dialog.
   *
   * @returns 无返回值。
   *
   * @returns No return value.
   */
  const handleDeleteCancel = useCallback((): void => {
    if (!deleteLoading) setDeletingMenu(null);
  }, [deleteLoading]);

  /**
   * 确认删除菜单并重新加载服务端菜单树。
   * 不在本地乐观移除节点，确保后端对父子菜单删除规则的处理结果成为页面最终状态。
   *
   * Confirm menu deletion and reload the server menu tree.
   * The node is not removed optimistically so the backend remains the source of truth for parent-child deletion rules.
   *
   * @returns 无返回值。
   *
   * @returns No return value.
   */
  const handleDeleteConfirm = useCallback(async (): Promise<void> => {
    if (!deletingMenu) return;

    setDeleteLoading(true);

    try {
      await deleteSysMenuApi(deletingMenu.id);
      await loadMenuTreeData();
      setDeletingMenu(null);
      toast.success(t(`${MENU_PAGE_I18N_PREFIX}.toast.deleteSuccess`));
    } finally {
      setDeleteLoading(false);
    }
  }, [deletingMenu, loadMenuTreeData, t]);

  /**
   * 新建菜单后刷新完整树。
   * 创建接口不返回节点，因此重新读取服务端树，避免本地层级与最终持久化结果分叉。
   *
   * Refresh the complete tree after menu creation.
   * The creation endpoint returns no node, so the server tree is reloaded to prevent local hierarchy from diverging from persisted results.
   *
   * @param values - 已通过表单校验的菜单值。
   * @returns 无返回值。
   *
   * @param values - Validated menu form values.
   * @returns No return value.
   */
  const handleSave = useCallback(
    async (values: SysMenuSaveRequest): Promise<void> => {
      setConfirmLoading(true);

      try {
        const request: SysMenuSaveRequest = createMenuSaveRequest(values);
        // 编辑和新增共享同一套表单，但根据是否存在节点 ID 选择对应的后端写操作。
        // Create and edit share one form, while the node ID selects the backend write operation.
        if (editingMenuId === null) {
          await createSysMenuApi(request);
        } else {
          await updateSysMenuApi(editingMenuId, request);
        }
        await loadMenuTreeData();
        setModalVisible(false);
        toast.success(t(`${MENU_PAGE_I18N_PREFIX}.toast.${editingMenuId === null ? 'createSuccess' : 'updateSuccess'}`));
      } finally {
        setConfirmLoading(false);
      }
    },
    [editingMenuId, loadMenuTreeData, t]
  );

  const parentOptions: SysMenuTreeNode[] = useMemo(
    () => (editingMenuId === null ? menuTreeData : excludeMenuBranch(menuTreeData, editingMenuId)),
    [editingMenuId, menuTreeData]
  );

  const columns: ColumnsType<SysMenuTreeNode> = useMemo(
    () => [
      {
        title: t('common.fields.name'),
        dataIndex: 'name',
        width: 220,
        render: (_, record) => getMenuDisplayName(record, t)
      },
      {
        title: t(`${MENU_PAGE_I18N_PREFIX}.form.fields.parent`),
        dataIndex: 'parentName',
        width: 150,
        render: (parentName: string | null) => parentName ?? t(`${MENU_PAGE_I18N_PREFIX}.form.rootMenu`)
      },
      {
        title: t('common.fields.code'),
        dataIndex: 'code',
        width: 180
      },
      {
        title: t(`${MENU_PAGE_I18N_PREFIX}.form.fields.i18nKey`),
        dataIndex: 'i18nKey',
        width: 220,
        render: (i18nKey: string) => i18nKey || '-'
      },
      {
        title: t(`${MENU_PAGE_I18N_PREFIX}.columns.type`),
        dataIndex: 'category',
        align: 'center',
        width: 100,
        render: (category: SysMenuTreeNode['category']) => t(categoryKeyMap[category])
      },
      {
        title: t(`${MENU_PAGE_I18N_PREFIX}.form.fields.path`),
        dataIndex: 'path',
        width: 180,
        render: (path: string | null) => path ?? '-'
      },
      {
        title: t(`${MENU_PAGE_I18N_PREFIX}.columns.component`),
        dataIndex: 'component',
        width: 220,
        render: (component: string | null) => component ?? '-'
      },
      {
        title: t('common.fields.order'),
        dataIndex: 'sort',
        align: 'center',
        width: 90
      },
      {
        title: t('common.fields.status'),
        dataIndex: 'status',
        align: 'center',
        width: 100,
        render: (status: SysMenuTreeNode['status']) => (
          <Badge variant={status === BOOLEAN_VALUE_MAP.TRUE ? 'success' : 'error'}>
            {t(status === BOOLEAN_VALUE_MAP.TRUE ? 'common.status.enable' : 'common.status.disable')}
          </Badge>
        )
      },
      {
        title: t('common.fields.action'),
        key: 'operation',
        align: 'center',
        width: 140,
        fixed: 'right',
        render: (_, record) => (
          <div className="text-gray flex w-full justify-end">
            {record.category !== SYS_MENU_CATEGORY_MAP.ACTION && (
              <Button
                variant="ghost"
                size="icon"
                aria-label={t(`${MENU_PAGE_I18N_PREFIX}.actions.add`)}
                onClick={() => handleCreateMenu(record.id)}>
                <span className="sr-only">{t(`${MENU_PAGE_I18N_PREFIX}.actions.add`)}</span>
                <Icon icon="gridicons:add-outline" size={18} aria-hidden="true" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label={t(`${MENU_PAGE_I18N_PREFIX}.actions.edit`)}
              onClick={() => handleEditMenu(record)}
              title={t(`${MENU_PAGE_I18N_PREFIX}.actions.edit`)}>
              <Icon icon="solar:pen-bold-duotone" size={18} aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t(`${MENU_PAGE_I18N_PREFIX}.actions.delete`)}
              onClick={() => handleDeleteRequest(record)}
              title={t(`${MENU_PAGE_I18N_PREFIX}.actions.delete`)}>
              <Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" aria-hidden="true" />
            </Button>
          </div>
        )
      }
    ],
    [handleCreateMenu, handleDeleteRequest, handleEditMenu, t]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Title as="h4">{t(`${MENU_PAGE_I18N_PREFIX}.title`)}</Title>
          <Button className="cursor-pointer" onClick={() => handleCreateMenu()}>
            {t(`${MENU_PAGE_I18N_PREFIX}.actions.new`)}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table<SysMenuTreeNode>
          rowKey="id"
          loading={tableLoading}
          columns={columns}
          dataSource={menuTreeData}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </CardContent>

      <SysMenuModal
        visible={modalVisible}
        formValue={modalFormValue}
        parentOptions={parentOptions}
        parentLocked={parentLocked}
        isEditing={editingMenuId !== null}
        confirmLoading={confirmLoading}
        onSave={handleSave}
        onCancel={() => setModalVisible(false)}
      />

      <Dialog open={!!deletingMenu} onOpenChange={open => !open && handleDeleteCancel()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t(`${MENU_PAGE_I18N_PREFIX}.deleteDialog.title`)}</DialogTitle>
            <DialogDescription>
              {deletingMenu ? t(`${MENU_PAGE_I18N_PREFIX}.deleteDialog.description`, { name: getMenuDisplayName(deletingMenu, t) }) : ''}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" disabled={deleteLoading} onClick={handleDeleteCancel}>
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
