import { Card, CardHeader, CardContent } from '@/ui/card';
import { Table } from 'antd';
import Button from '@/ui/button';
import { Title } from '@/ui/typography';
import type { ColumnsType } from 'antd/es/table';
import type { SysRoleOption } from '#/system/role';
import type { SysUserListItem, SysUserSaveRequest } from '#/system/user';
import { Badge } from '@/ui/badge';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import { BASIC_STATUS_LABEL_KEY_MAP } from '@/constants';
import { Icon } from '@/components/icon';
import UserModal, { type UserModalProps } from './user-modal';
import { useCallback, useEffect, useState } from 'react';
import { getUserListApi, getUserDetailApi, createUserApi, deleteUserApi, updateUserApi } from '@/api/services/user';
import { getRoleOptionsApi } from '@/api/services/role';
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
const defaultUserValue: SysUserSaveRequest = {
  username: '',
  nickname: undefined,
  email: '',
  phone: undefined,
  status: BOOLEAN_VALUE_MAP.TRUE,
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
  const [dataSource, setDataSource] = useState<SysUserListItem[]>([]);
  const [roleOptions, setRoleOptions] = useState<SysRoleOption[]>([]);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableLoading, setTableLoading] = useState(false);

  /**
   * 获取并替换当前用户列表。
   * 保持读取逻辑集中，新增、编辑和删除完成后都可复用同一刷新入口。
   *
   * Fetches and replaces the current user list.
   * Keeping reads in one place lets create, update, and delete share the same refresh path.
   */
  const fetchDataSource = useCallback(async (nextPageNum = 1, nextPageSize = 10): Promise<void> => {
    setTableLoading(true);
    try {
      const [userPage, roleOptions] = await Promise.all([
        getUserListApi({ pageNum: nextPageNum, pageSize: nextPageSize }),
        getRoleOptionsApi()
      ]);
      setDataSource(userPage.records);
      setTotal(userPage.total);
      setRoleOptions(roleOptions);
    } finally {
      setTableLoading(false);
    }
  }, []);

  useEffect(() => {
    // 首次进入页面时加载列表；void 明确表示 effect 不等待 Promise 返回值。
    // Load the list on page entry; void makes it explicit that an effect does not await the Promise.
    void fetchDataSource(1, 10).catch(() => undefined);
  }, [fetchDataSource]);

  /**
   * 用户弹窗的页面级状态。
   * 表单值与提交状态必须作为一个整体切换，避免切换新增和编辑目标时出现旧状态残留。
   *
   * Page-level state for the user dialog.
   * Form values and submission state change together so switching between create and edit targets cannot retain stale state.
   */
  type UserModalStateProps = Pick<UserModalProps, 'visible' | 'formValue'> & {
    /**
     * 保存请求是否进行中，用于防止重复提交。
     *
     * Whether a save request is in flight, used to prevent duplicate submissions.
     */
    loading: boolean;
  };

  const [userModalState, setUserModalState] = useState<UserModalStateProps>({
    visible: false,
    formValue: defaultUserValue,
    loading: false
  });

  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  /**
   * 打开新增用户弹窗。
   * 显式重置 loading 和表单值，确保失败过的提交或之前的编辑不会影响新建流程。
   *
   * Opens the create-user dialog.
   * Loading and form values are reset explicitly so a failed submission or previous edit cannot affect the next creation flow.
   */
  const handleCreate = () => {
    setEditingUserId(null);
    setUserModalState({
      visible: true,
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
  const handleSave = async (value: SysUserSaveRequest) => {
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
      const normalizedRequest = {
        ...value,
        avatar: value.avatar?.trim() || undefined
      };

      if (editingUserId === null) {
        await createUserApi(normalizedRequest);
      } else {
        await updateUserApi(editingUserId, normalizedRequest);
      }

      setPageNum(1);
      await fetchDataSource(1, pageSize);
      setEditingUserId(null);
      setUserModalState(prev => ({
        ...prev,
        visible: false,
        loading: false
      }));
      toast.success(
        editingUserId === null ? t(`${USER_PAGE_I18N_PREFIX}.toast.createSuccess`) : t(`${USER_PAGE_I18N_PREFIX}.toast.updateSuccess`)
      );
    } catch {
      setUserModalState(prev => ({
        ...prev,
        loading: false
      }));
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
    setEditingUserId(null);
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
  const [deletingUser, setDeleteUser] = useState<SysUserListItem | null>(null);

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
      await fetchDataSource(pageNum, pageSize);
      toast.success(t(`${USER_PAGE_I18N_PREFIX}.toast.deleteSuccess`));
    } catch {
      return;
    }
  };

  /**
   * 查询并展示用户详情。
   * 详情始终从服务端读取，避免列表页缓存与角色关联变更后产生过期展示。
   * @param id - 目标用户主键。
   *
   * Fetches and displays a user detail.
   * Details always come from the server so list cache cannot show stale role assignments.
   * @param id - Target user primary key.
   * @returns No return value.
   */
  const handleUserDetail = async (id: number): Promise<void> => {
    setUserDetailState({ visible: true, loading: true, value: null });
    try {
      const value = await getUserDetailApi(id);
      setUserDetailState({ visible: true, loading: false, value });
    } catch {
      setUserDetailState(previousState => ({ ...previousState, loading: false }));
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
  const handleUserEdit = (value: SysUserListItem): void => {
    setEditingUserId(value.id);
    setUserModalState(prev => ({
      ...prev,
      visible: true,
      formValue: {
        username: value.username,
        nickname: value.nickname ?? undefined,
        email: value.email,
        phone: value.phone ?? undefined,
        status: value.status,
        roleIds: value.roleIds,
        password: ''
      }
    }));
  };

  /**
   * 用户详情弹窗状态。
   * null 表示详情尚未加载完成或本次请求失败。
   *
   * User detail dialog state.
   * Null means details are still loading or the current request failed.
   */
  const [userDetailState, setUserDetailState] = useState<{
    visible: boolean;
    loading: boolean;
    value: SysUserListItem | null;
  }>({
    visible: false,
    loading: false,
    value: null
  });

  /**
   * 用户列表列定义。
   * render 函数负责把领域数据转换为展示组件；操作列只发起状态变更，实际 CRUD 逻辑仍集中在上方的处理函数中。
   *
   * User table column definitions.
   * Render functions translate domain data into display components; the action column only initiates state changes, while CRUD logic remains in the handlers above.
   */
  const columns: ColumnsType<SysUserListItem> = [
    {
      title: t('common.fields.username'),
      dataIndex: 'name',
      width: 300,
      render: (_, item) => (
        <div className="flex">
          <img src={item.avatar ?? undefined} className="size-10 rounded-full" />
          <div className="ml-2 flex flex-col">
            <span className="text-sm">{item.username}</span>
            <span className="text-xs text-text-secondary">{item.email}</span>
          </div>
        </div>
      )
    },
    {
      title: t('common.fields.roles'),
      dataIndex: 'roleIds',
      align: 'center',
      width: 220,
      render: (_: number[] | undefined, item) => (
        <div className="flex flex-wrap justify-center gap-1">
          {item.roleIds.map(roleId => {
            const role = roleOptions.find(option => option.id === roleId);
            return role ? (
              <Badge key={role.id} variant="info">
                {role.name}
              </Badge>
            ) : null;
          })}
        </div>
      )
    },
    {
      title: t('common.fields.status'),
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (value: SysUserListItem['status'] = BOOLEAN_VALUE_MAP.TRUE) => (
        <Badge variant={BOOLEAN_VALUE_MAP.FALSE === value ? 'error' : 'success'}>{t(BASIC_STATUS_LABEL_KEY_MAP[value])}</Badge>
      )
    },
    {
      title: t('common.fields.action'),
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, item) => (
        <div className="flex w-full justify-center text-gray-500">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t(`${USER_PAGE_I18N_PREFIX}.actions.detail`)}
            onClick={() => handleUserDetail(item.id)}>
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
        <Table
          rowKey="id"
          size="small"
          loading={tableLoading}
          scroll={{ x: 'max-content' }}
          pagination={{
            current: pageNum,
            pageSize,
            total,
            showSizeChanger: true,
            onChange: (nextPageNum, nextPageSize) => {
              setPageNum(nextPageNum);
              setPageSize(nextPageSize);
              void fetchDataSource(nextPageNum, nextPageSize);
            }
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </CardContent>
      <UserModal
        visible={userModalState.visible}
        isEditing={editingUserId !== null}
        formValue={userModalState.formValue}
        roleOptions={roleOptions}
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
      <Dialog
        open={userDetailState.visible}
        onOpenChange={visible => !visible && setUserDetailState(previousState => ({ ...previousState, visible }))}>
        <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-lg">
          <DialogHeader className="border-b border-border/70 pr-8 pb-4">
            <DialogTitle>{t(`${USER_PAGE_I18N_PREFIX}.detailDialog.title`)}</DialogTitle>
          </DialogHeader>

          {userDetailState.loading ? (
            <div className="space-y-4" aria-live="polite">
              <div className="flex items-center gap-3">
                <div className="size-16 animate-pulse rounded-full bg-muted" />
                <div className="space-y-2">
                  <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-52 animate-pulse rounded bg-muted" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[1, 2, 3, 4].map(item => (
                  <div key={item} className="h-16 animate-pulse rounded-lg bg-muted" />
                ))}
              </div>
              <p className="text-sm text-text-secondary">{t(`${USER_PAGE_I18N_PREFIX}.detailDialog.loading`)}</p>
            </div>
          ) : userDetailState.value ? (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  {userDetailState.value.avatar ? (
                    <img
                      src={userDetailState.value.avatar}
                      alt={userDetailState.value.username}
                      className="size-16 rounded-full border border-border object-cover"
                    />
                  ) : (
                    <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
                      {userDetailState.value.username.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <span
                    className={`absolute right-0 bottom-0 size-3.5 rounded-full border-2 border-background ${
                      userDetailState.value.status === BOOLEAN_VALUE_MAP.TRUE ? 'bg-success' : 'bg-muted-foreground'
                    }`}
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-lg font-semibold">{userDetailState.value.nickname || userDetailState.value.username}</h3>
                    <Badge variant={userDetailState.value.status === BOOLEAN_VALUE_MAP.TRUE ? 'success' : 'default'}>
                      {t(BASIC_STATUS_LABEL_KEY_MAP[userDetailState.value.status])}
                    </Badge>
                  </div>
                  <p className="truncate text-sm text-text-secondary">@{userDetailState.value.username}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border/70 bg-muted/20 px-3 py-3">
                  <p className="text-xs text-text-secondary">{t('common.fields.email')}</p>
                  <p className="mt-1 truncate text-sm" title={userDetailState.value.email}>
                    {userDetailState.value.email}
                  </p>
                </div>
                <div className="rounded-lg border border-border/70 bg-muted/20 px-3 py-3">
                  <p className="text-xs text-text-secondary">{t('common.fields.phone')}</p>
                  <p className="mt-1 text-sm">{userDetailState.value.phone || '—'}</p>
                </div>
                <div className="rounded-lg border border-border/70 bg-muted/20 px-3 py-3">
                  <p className="text-xs text-text-secondary">{t('common.fields.nickname')}</p>
                  <p className="mt-1 truncate text-sm">{userDetailState.value.nickname || '—'}</p>
                </div>
                <div className="rounded-lg border border-border/70 bg-muted/20 px-3 py-3">
                  <p className="text-xs text-text-secondary">{t('common.fields.status')}</p>
                  <p className="mt-1 text-sm">{t(BASIC_STATUS_LABEL_KEY_MAP[userDetailState.value.status])}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{t('common.fields.roles')}</h4>
                  <span className="text-xs text-text-secondary">{userDetailState.value.roleIds.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userDetailState.value.roleIds.map(roleId => {
                    const role = roleOptions.find(option => option.id === roleId);

                    return (
                      <Badge key={roleId} variant="info">
                        {role?.name ?? roleId}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {!userDetailState.loading && userDetailState.value ? (
            <DialogFooter className="border-t border-border/70 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setUserDetailState(previousState => ({ ...previousState, visible: false }))}>
                {t('common.close')}
              </Button>
            </DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
