import { useCallback, useEffect, useMemo, useState } from 'react';
import Table, { type ColumnsType } from 'antd/es/table';
import type { MenuTreeNode } from '#/entity';
import useLocale from '@/locales/use-locale';
import { MenuTypeEnum, BasicStatusEnum } from '#/enum';
import { BASIC_STATUS_LABEL_KEY_MAP } from '@/constants';
import { Badge } from '@/ui/badge';
import { Icon } from '@/components/icon';
import Button from '@/ui/button';
import { Card, CardHeader, CardContent } from '@/ui/card';
import { Title } from '@/ui/typography';
import MenuModal, { type MenuModalProps } from './menu-modal';
import { toast } from 'sonner';
import { createMenuApi, getMenuListApi, updateMenuApi } from '@/api/services/menu';

// 菜单管理页国际化前缀 / Menu management page i18n prefix
const MENU_PAGE_I18N_PREFIX = 'pages.management.system.menu';

// 菜单弹窗操作类型 / Menu modal action type
type MenuModalType = 'create' | 'edit';

// 菜单表单默认值 / Default menu form value
const defaultMenuValue: MenuTreeNode = {
  id: '',
  parentId: '',
  name: '',
  label: '',
  route: '',
  component: '',
  icon: '',
  hide: false,
  status: BasicStatusEnum.ENABLE,
  type: MenuTypeEnum.CATALOGUE
};

/**
 * 菜单管理页面
 * Menu management page
 *
 * @returns 菜单管理表格页面
 * @returns Menu management table page
 */
export default function PermissionPage() {
  const { t } = useLocale();

  // 菜单表格数据 / Menu table data
  const [menuTableData, setMenuTableData] = useState<MenuTreeNode[]>([]);
  // 表格加载状态 / Table loading state
  const [tableLoading, setTableLoading] = useState(false);
  // 当前弹窗操作类型 / Current modal action type
  const [modalType, setModalType] = useState<MenuModalType>('create');
  // 弹窗确认提交状态 / Modal confirm submit state
  const [confirmLoading, setConfirmLoading] = useState(false);

  // 菜单弹窗基础属性 / Base props for the menu modal
  const [menuModalProps, setMenuModalProps] = useState<MenuModalProps>({
    visible: false,
    title: '',
    formValue: { ...defaultMenuValue },
    menuTreeData: [],
    confirmLoading: false,
    onCancel: () => {
      setMenuModalProps(prev => ({
        ...prev,
        visible: false
      }));
    },
    onSave: () => {
      setMenuModalProps(prev => ({
        ...prev,
        visible: false
      }));
    }
  });

  /**
   * 加载菜单管理列表
   * Load the menu management list
   *
   * @returns 无返回值
   * @returns No return value
   */
  const loadMenuTableData = useCallback(async (): Promise<void> => {
    setTableLoading(true);

    try {
      const data = await getMenuListApi();
      console.log(`data + ::>>`, data);
      setMenuTableData(data);
    } catch {
      toast.error(t(`${MENU_PAGE_I18N_PREFIX}.toast.loadFailed`));
    } finally {
      setTableLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadMenuTableData();
  }, [loadMenuTableData]);

  /**
   * 打开新增弹窗
   * Open the create modal
   *
   * @param parentId 父级菜单 ID / Parent menu ID
   */
  const handleCreate = useCallback(
    (parentId?: string): void => {
      setModalType('create');
      setMenuModalProps(prev => ({
        ...prev,
        visible: true,
        title: t(`${MENU_PAGE_I18N_PREFIX}.modal.createTitle`),
        formValue: {
          ...defaultMenuValue,
          parentId: parentId ?? ''
        }
      }));
    },
    [t]
  );

  /**
   * 打开编辑弹窗
   * Open the edit modal
   *
   * @param value 当前菜单节点
   * @param value Current menu node
   * @returns 无返回值
   * @returns No return value
   */
  const handleEdit = useCallback(
    (value: MenuTreeNode): void => {
      setModalType('edit');
      setMenuModalProps(prev => ({
        ...prev,
        visible: true,
        title: t(`${MENU_PAGE_I18N_PREFIX}.modal.editTitle`),
        formValue: {
          ...value
        }
      }));
    },
    [t]
  );

  /**
   * 取消菜单弹窗
   * Cancel the menu modal
   *
   * @returns 无返回值
   * @returns No return value
   */
  const handleCancel = useCallback((): void => {
    setMenuModalProps(prev => ({
      ...prev,
      visible: false
    }));
  }, []);

  /**
   * 确认菜单弹窗提交
   * Confirm the menu modal submission
   *
   * @param value 表单提交值
   * @param value Submitted form value
   * @returns 无返回值
   * @returns No return value
   */
  const handleConfirm = useCallback(
    async (value: MenuTreeNode): Promise<void> => {
      setConfirmLoading(true);

      try {
        // 根据弹窗类型分发到新增或修改模拟接口 / Dispatch to the matching mock request by modal action type.
        if (modalType === 'create') {
          const data = await createMenuApi(value);
          setMenuTableData(data);
          toast.success(t(`${MENU_PAGE_I18N_PREFIX}.toast.createSuccess`));
        } else {
          const data = await updateMenuApi(value);
          setMenuTableData(data);
          toast.success(t(`${MENU_PAGE_I18N_PREFIX}.toast.updateSuccess`));
        }

        setMenuModalProps(prev => ({
          ...prev,
          visible: false
        }));
      } catch {
        toast.error(t(`${MENU_PAGE_I18N_PREFIX}.toast.saveFailed`));
      } finally {
        setConfirmLoading(false);
      }
    },
    [modalType, t]
  );

  // 表格列配置 / Table column configuration
  const columns: ColumnsType<MenuTreeNode> = useMemo(
    () => [
      {
        title: t('common.fields.name'),
        dataIndex: 'name',
        width: 300,
        render: (_, item) => <div>{t(item.label)}</div>
      },
      {
        title: t(`${MENU_PAGE_I18N_PREFIX}.columns.type`),
        dataIndex: 'type',
        width: 60,
        render: (_, item) => <Badge variant="info">{t(`${MENU_PAGE_I18N_PREFIX}.types.${MenuTypeEnum[item.type]}`)}</Badge>
      },
      {
        title: t(`${MENU_PAGE_I18N_PREFIX}.columns.icon`),
        dataIndex: 'icon',
        width: 60,
        render: (icon: string) => {
          if (!icon) return null;
          return <Icon icon={icon.startsWith('ic') ? `local:${icon}` : icon} size={18} className="ant-menu-item-icon" />;
        }
      },
      {
        title: t(`${MENU_PAGE_I18N_PREFIX}.columns.component`),
        dataIndex: 'component'
      },
      {
        title: t('common.fields.status'),
        dataIndex: 'status',
        align: 'center',
        width: 120,
        render: (status: BasicStatusEnum = BasicStatusEnum.ENABLE) => (
          <Badge variant={status === BasicStatusEnum.DISABLE ? 'error' : 'success'}>{t(BASIC_STATUS_LABEL_KEY_MAP[status])}</Badge>
        )
      },
      {
        title: t('common.fields.action'),
        key: 'operation',
        align: 'center',
        width: 100,
        render: (_, record) => (
          <div className="text-gray flex w-full justify-end">
            {record?.type === MenuTypeEnum.CATALOGUE && (
              <Button
                variant="ghost"
                size="icon"
                aria-label={t(`${MENU_PAGE_I18N_PREFIX}.actions.add`)}
                onClick={() => {
                  handleCreate(record.id);
                }}>
                <Icon icon="gridicons:add-outline" size={18} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label={t(`${MENU_PAGE_I18N_PREFIX}.actions.edit`)}
              onClick={() => {
                handleEdit(record);
              }}>
              <Icon icon="solar:pen-bold-duotone" size={18} />
            </Button>
            <Button variant="ghost" size="icon" aria-label={t(`${MENU_PAGE_I18N_PREFIX}.actions.delete`)}>
              <Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
            </Button>
          </div>
        )
      }
    ],
    [handleCreate, handleEdit, t]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          {/* <Text>{t(`${MENU_PAGE_I18N_PREFIX}.title`)}</Text> */}
          <Title as="h4">{t(`${MENU_PAGE_I18N_PREFIX}.title`)}</Title>
          <Button className="cursor-pointer" onClick={() => handleCreate()}>
            {t(`${MENU_PAGE_I18N_PREFIX}.actions.new`)}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table rowKey="id" columns={columns} dataSource={menuTableData} loading={tableLoading} pagination={false} />
      </CardContent>
      <MenuModal
        {...menuModalProps}
        menuTreeData={menuTableData}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onSave={handleConfirm}
      />
    </Card>
  );
}
