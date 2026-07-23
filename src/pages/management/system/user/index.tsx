import { Card, CardHeader, CardContent } from '@/ui/card';
import { Table } from 'antd';
import Button from '@/ui/button';
import { Title } from '@/ui/typography';
import type { ColumnsType } from 'antd/es/table';
import type { Role, User } from '#/entity';
import { Badge } from '@/ui/badge';
import { BasicStatusEnum } from '#/enum';
import { BASIC_STATUS_LABEL_KEY_MAP } from '@/constants';
import { Icon } from '@/components/icon';
import type { UserFormValues } from './types';
import UserModal, { type UserModalProps } from './user-modal';
import { useEffect, useState } from 'react';
import { getUserListApi, createUserApi, deleteUserApi, updateUserApi } from '@/api/services/user';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/ui/dialog';
import useLocale from '@/locales/use-locale';

const USER_PAGE_I18N_PREFIX = 'pages.management.system.user';

/**
 * 新增用户时使用的空表单值。
 * 表单受 React Hook Form 管理；每次打开新增弹窗都复用该对象，避免上一次编辑的数据残留。
 *
 * Empty form values used when creating a user.
 * React Hook Form owns the form state; this value is reused whenever the create dialog opens to prevent values from a prior edit leaking into it.
 */
const defaultUserValue: UserFormValues = {
  id: '',
  username: '',
  email: '',
  status: 1,
  roleIds: [],
  password: ''
};

export default function UserPage() {
  const { t } = useLocale();
  /**
   * 表格数据源。
   * 页面不直接修改本地数组，而是在每次写操作后重新请求，以模拟真实接口返回的最终状态。
   *
   * Table data source.
   * The page does not mutate this array directly; it refetches after each write to mirror the final state returned by a real API.
   */
  const [dataSource, setDataSource] = useState<User[]>([]);

  /**
   * 获取并替换当前用户列表。
   * 保持读取逻辑集中，新增、编辑和删除完成后都可复用同一刷新入口。
   *
   * Fetches and replaces the current user list.
   * Keeping reads in one place lets create, update, and delete share the same refresh path.
   */
  const fetchDataSource = async () => {
    const r = await getUserListApi();
    setDataSource(r);
  };

  useEffect(() => {
    // 首次进入页面时加载列表；void 明确表示 effect 不等待 Promise 返回值。
    // Load the list on page entry; void makes it explicit that an effect does not await the Promise.
    void fetchDataSource();
  }, []);

  /**
   * 用户弹窗的页面级状态。
   * 表单值、弹窗模式与提交状态必须作为一个整体切换，避免切换“新增/编辑”时出现旧状态残留。
   *
   * Page-level state for the user dialog.
   * Form values, dialog mode, and submission state change together so switching between create and edit cannot retain stale state.
   */
  type UserModalStateProps = Pick<UserModalProps, 'visible' | 'type' | 'formValue'> & {
    /**
     * 保存请求是否进行中，用于防止重复提交。
     *
     * Whether a save request is in flight, used to prevent duplicate submissions.
     */
    loading: boolean;
  };

  const [userModalState, setUserModalState] = useState<UserModalStateProps>({
    visible: false,
    type: 'create',
    formValue: defaultUserValue,
    loading: false
  });

  /**
   * 打开新增用户弹窗。
   * 显式重置 loading 和表单值，确保失败过的提交或之前的编辑不会影响新建流程。
   *
   * Opens the create-user dialog.
   * Loading and form values are reset explicitly so a failed submission or previous edit cannot affect the next creation flow.
   */
  const handleCreate = () => {
    setUserModalState({
      visible: true,
      type: 'create',
      formValue: defaultUserValue,
      loading: false
    });
  };

  /**
   * 保存用户表单。
   * 先锁定提交按钮，再根据弹窗模式调用新增或更新接口；写操作完成后重新读取列表，确保 UI 与数据源一致。
   * @param value - 已通过表单校验的用户提交值。
   *
   * Saves the user form.
   * It locks submission first, calls the create or update API for the current mode, then reloads the list to keep the UI aligned with the data source.
   * @param value - User payload that has passed form validation.
   */
  const handleSave = async (value: UserFormValues) => {
    setUserModalState(prev => ({
      ...prev,
      loading: true
    }));

    try {
      /*
       * 新增和编辑复用表单，按弹窗模式调用对应接口以保持接口语义清晰。
       *
       * Creation and editing share one form, while the modal mode selects the matching API to keep the request semantics explicit.
       */
      if (userModalState.type === 'create') {
        await createUserApi(value);
      } else {
        await updateUserApi(value);
      }

      await fetchDataSource();
      setUserModalState(prev => ({
        ...prev,
        visible: false,
        loading: false
      }));
      toast.success(
        userModalState.type === 'create'
          ? t(`${USER_PAGE_I18N_PREFIX}.toast.createSuccess`)
          : t(`${USER_PAGE_I18N_PREFIX}.toast.updateSuccess`)
      );
    } catch (error) {
      setUserModalState(prev => ({
        ...prev,
        loading: false
      }));
      toast.error(error instanceof Error ? error.message : t(`${USER_PAGE_I18N_PREFIX}.toast.saveFailed`));
    }
  };

  /**
   * 关闭用户表单弹窗。
   * 这里只关闭弹窗，不立即清空 formValue；下一次打开时由新增或编辑动作提供明确初始值。
   *
   * Closes the user form dialog.
   * It only closes the dialog and does not clear formValue immediately; the next create or edit action supplies explicit initial values.
   */
  const handleCancel = () => {
    setUserModalState(previousState => ({
      ...previousState,
      visible: false
    }));
  };

  /**
   * 当前等待确认删除的用户。
   * 使用完整用户对象能在确认框中展示用户名，同时以 null 表示确认框关闭。
   *
   * User currently awaiting deletion confirmation.
   * Keeping the full user object allows the confirmation dialog to display the username, while null represents a closed dialog.
   */
  const [deletingUser, setDeleteUser] = useState<User | null>(null);

  /**
   * 确认删除当前选中的用户。
   * 删除前再次判空，以处理用户关闭确认框后异步回调仍被触发的边界情况。
   *
   * Confirms deletion of the selected user.
   * It checks the selected user again to handle the edge case where the dialog closes before an asynchronous callback runs.
   */
  const handleDeleteConfirm = async () => {
    // 未选择删除目标时不发送无效请求。
    // Do not send an invalid request when no deletion target is selected.
    if (!deletingUser) return;

    try {
      await deleteUserApi({
        id: deletingUser.id
      });
      setDeleteUser(null);
      await fetchDataSource();
      toast.success(t(`${USER_PAGE_I18N_PREFIX}.toast.deleteSuccess`));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t(`${USER_PAGE_I18N_PREFIX}.toast.deleteFailed`));
    }
  };

  /**
   * 打开编辑弹窗并将用户实体转换为表单值。
   * 用户实体保存完整 roles，表单仅保存 roleIds，避免在表单状态中携带不需要编辑的角色详情。
   * @param value - 表格行对应的用户实体。
   *
   * Opens the edit dialog and converts a user entity to form values.
   * The entity persists full roles, while the form keeps only roleIds so it does not carry role details that are not directly edited.
   * @param value - User entity represented by the selected table row.
   */
  const handleUserEdit = (value: User) => {
    setUserModalState(prev => ({
      ...prev,
      visible: true,
      type: 'edit',
      formValue: {
        id: value.id,
        username: value.username,
        email: value.email,
        status: value.status,
        roleIds: value.roles?.map(i => i.id),
        password: value.password
      }
    }));
  };

  /**
   * 用户列表列定义。
   * render 函数负责把领域数据转换为展示组件；操作列只发起状态变更，实际 CRUD 逻辑仍集中在上方的处理函数中。
   *
   * User table column definitions.
   * Render functions translate domain data into display components; the action column only initiates state changes, while CRUD logic remains in the handlers above.
   */
  const columns: ColumnsType<User> = [
    {
      title: t('common.fields.username'),
      dataIndex: 'name',
      width: 300,
      render: (_, item) => (
        <div className="flex">
          <img src={item.avatar} className="size-10 rounded-full" />
          <div className="ml-2 flex flex-col">
            <span className="text-sm">{item.username}</span>
            <span className="text-xs text-text-secondary">{item.email}</span>
          </div>
        </div>
      )
    },
    {
      title: t('common.fields.roles'),
      dataIndex: 'roles',
      align: 'center',
      width: 220,
      render: (roles: Role[] | undefined) => (
        <div className="flex flex-wrap justify-center gap-1">
          {roles?.map(role => (
            <Badge key={role.id} variant="info">
              {role.name}
            </Badge>
          ))}
        </div>
      )
    },
    {
      title: t('common.fields.status'),
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (value: BasicStatusEnum = BasicStatusEnum.ENABLE) => (
        <Badge variant={BasicStatusEnum.DISABLE === value ? 'error' : 'success'}>{t(BASIC_STATUS_LABEL_KEY_MAP[value])}</Badge>
      )
    },
    {
      title: t('common.fields.action'),
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, item) => (
        <div className="flex w-full justify-center text-gray-500">
          <Button variant="ghost" size="icon">
            <Icon icon="mdi:card-account-details" size={18} />
          </Button>
          <Button variant="ghost" size="icon" aria-label={t(`${USER_PAGE_I18N_PREFIX}.actions.edit`)} onClick={() => handleUserEdit(item)}>
            <Icon icon="solar:pen-bold-duotone" />
          </Button>
          <Button variant="ghost" size="icon" aria-label={t(`${USER_PAGE_I18N_PREFIX}.actions.delete`)} onClick={() => setDeleteUser(item)}>
            <Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Title as="h4">{t(`${USER_PAGE_I18N_PREFIX}.title`)}</Title>
          <Button onClick={handleCreate}>{t(`${USER_PAGE_I18N_PREFIX}.actions.new`)}</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table rowKey="id" size="small" scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={dataSource} />
      </CardContent>
      <UserModal
        visible={userModalState.visible}
        type={userModalState.type}
        formValue={userModalState.formValue}
        confirmLoading={userModalState.loading}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <Dialog open={!!deletingUser} onOpenChange={v => !v && setDeleteUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t(`${USER_PAGE_I18N_PREFIX}.deleteDialog.title`)}</DialogTitle>
            <DialogDescription>
              {deletingUser ? t(`${USER_PAGE_I18N_PREFIX}.deleteDialog.description`, { name: deletingUser.username }) : ''}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteUser(null)}>
              {t('common.actions.cancel')}
            </Button>
            <Button type="button" variant="destructive" onClick={() => handleDeleteConfirm()}>
              {t('common.actions.confirmDelete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
