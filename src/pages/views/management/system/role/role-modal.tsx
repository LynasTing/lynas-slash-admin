import { TreeSelect } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SysMenuTreeNode } from '#/system/menu';
import type { SysRoleSaveRequest } from '#/system/role';
import { BOOLEAN_VALUE_MAP } from '#/public/common';
import { BASIC_STATUS_LABEL_KEY_MAP } from '@/constants';
import useLocale from '@/locales/use-locale';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { Textarea } from '@/ui/textarea';
import Button from '@/ui/button';
const ROLE_PAGE_I18N_PREFIX = 'pages.management.system.role';

export type RoleModalProps = {
  /**
   * 弹窗是否可见
   * Whether the dialog is open
   */
  visible: boolean;

  /**
   * 是否处于编辑状态
   * Whether an existing role is being edited
   */
  isEditing: boolean;

  /**
   * 表单初始值
   * Initial form values
   */
  formValue: SysRoleSaveRequest;

  /**
   * 授权候选菜单树
   * Available menus for authorization
   */
  menuTreeData: SysMenuTreeNode[];

  /**
   * 确认按钮是否提交中
   * Whether saving is in progress
   */
  confirmLoading?: boolean;

  /**
   * 保存角色
   * Save the role
   */
  onSave(value: SysRoleSaveRequest): void | Promise<void>;

  /**
   * 关闭弹窗
   * Close the dialog
   */
  onCancel: VoidFunction;
};

/**
 * 角色新增和编辑弹窗。
 * 表单直接维护后端需要的 menuIds，避免把菜单树对象序列化到角色请求中。
 *
 * Role creation and editing dialog.
 * The form stores the menuIds required by the backend instead of serializing menu tree objects into the role request.
 */
export default function RoleModal({
  visible,
  isEditing,
  formValue,
  menuTreeData,
  confirmLoading = false,
  onSave,
  onCancel
}: RoleModalProps): React.ReactElement {
  const { t } = useLocale();
  const form = useForm<SysRoleSaveRequest>({ defaultValues: formValue });
  const { reset, setValue } = form;
  const [checkedMenuIds, setCheckedMenuIds] = useState<number[]>([]);
  const localizedMenuTree = useMemo(() => {
    const translateNodes = (nodes: SysMenuTreeNode[]): SysMenuTreeNode[] => {
      // 使用稳定翻译键展示菜单，保留服务端 ID 和授权层级
      // Translate menu labels while preserving server IDs and authorization hierarchy
      return nodes.map(node => ({ ...node, name: t(node.i18nKey), children: translateNodes(node.children ?? []) }));
    };
    return translateNodes(menuTreeData);
  }, [menuTreeData, t]);
  const modalTitle = t(`${ROLE_PAGE_I18N_PREFIX}.modal.${isEditing ? 'editTitle' : 'createTitle'}`);

  useEffect(() => {
    reset(formValue);
    setCheckedMenuIds(formValue.menuIds);
  }, [formValue, reset]);

  /**
   * 同步菜单树勾选结果到后端要求的一维菜单 ID 列表。
   *
   * Sync the tree selection into the flat menu ID list required by the backend.
   */
  const handleMenuChange = (value: number[]): void => {
    setCheckedMenuIds(value);
    setValue('menuIds', value);
  };

  return (
    <Dialog open={visible} onOpenChange={open => !open && onCancel()}>
      <DialogContent className="max-h-[calc(100vh-1rem)] min-h-[75vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSave)}>
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: t(`${ROLE_PAGE_I18N_PREFIX}.validation.nameRequired`),
                validate: value => value.trim().length > 0 || t(`${ROLE_PAGE_I18N_PREFIX}.validation.nameRequired`),
                maxLength: { value: 64, message: t(`${ROLE_PAGE_I18N_PREFIX}.validation.nameMaxLength`) }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.fields.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={64} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              rules={{
                required: t(`${ROLE_PAGE_I18N_PREFIX}.validation.codeRequired`),
                validate: value => value.trim().length > 0 || t(`${ROLE_PAGE_I18N_PREFIX}.validation.codeRequired`),
                maxLength: { value: 64, message: t(`${ROLE_PAGE_I18N_PREFIX}.validation.codeMaxLength`) }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.fields.code')}</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={64} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sort"
              rules={{
                required: t(`${ROLE_PAGE_I18N_PREFIX}.validation.orderRequired`),
                validate: value =>
                  (value !== undefined && Number.isInteger(value) && value >= 0 && value <= 2147483647) ||
                  t(`${ROLE_PAGE_I18N_PREFIX}.validation.orderInvalid`)
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.fields.order')}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={2147483647}
                      step={1}
                      value={field.value ?? ''}
                      onChange={event => {
                        const nextValue = event.target.value;
                        field.onChange(nextValue === '' ? undefined : Number(nextValue));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.fields.status')}</FormLabel>
                  <FormControl>
                    <RadioGroup value={String(field.value)} onValueChange={value => field.onChange(Number(value))}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={String(BOOLEAN_VALUE_MAP.TRUE)} id="role-status-enable" />
                        <Label htmlFor="role-status-enable">{t(BASIC_STATUS_LABEL_KEY_MAP[BOOLEAN_VALUE_MAP.TRUE])}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={String(BOOLEAN_VALUE_MAP.FALSE)} id="role-status-disable" />
                        <Label htmlFor="role-status-disable">{t(BASIC_STATUS_LABEL_KEY_MAP[BOOLEAN_VALUE_MAP.FALSE])}</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.fields.description')}</FormLabel>
                  <FormControl>
                    <Textarea value={field.value ?? ''} maxLength={255} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="menuIds"
              render={() => (
                <FormItem>
                  <FormLabel>{t(`${ROLE_PAGE_I18N_PREFIX}.form.fields.authorizedMenus`)}</FormLabel>
                  <FormControl>
                    <TreeSelect
                      className="w-full [&_.ant-select-selector]:max-h-40 [&_.ant-select-selector]:overflow-y-auto"
                      treeData={localizedMenuTree}
                      treeCheckable
                      allowClear
                      showCheckedStrategy={TreeSelect.SHOW_ALL}
                      placeholder={t(`${ROLE_PAGE_I18N_PREFIX}.form.placeholders.authorizedMenus`)}
                      value={checkedMenuIds}
                      fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                      getPopupContainer={node => node.parentElement ?? document.body}
                      onChange={(value: number[]) => handleMenuChange(value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onCancel}>
                {t('common.actions.cancel')}
              </Button>
              <Button type="submit" disabled={confirmLoading}>
                {confirmLoading ? t('common.actions.saving') : t('common.actions.save')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
