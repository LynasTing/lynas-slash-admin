import type { MenuTreeNode } from '#/entity';
import { BasicStatusEnum } from '#/enum';
import { BASIC_STATUS_LABEL_KEY_MAP } from '@/constants';
import { TreeSelect } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useLocale from '@/locales/use-locale';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { Textarea } from '@/ui/textarea';
import Button from '@/ui/button';
import { flattenTree } from '@/utils';
import type { RoleFormValues, RoleModalType } from './types';

const ROLE_PAGE_I18N_PREFIX = 'pages.management.system.role';

/**
 * 从菜单树里提取已勾选节点 ID。
 * 编辑角色时表单保存的是菜单子树，而 TreeSelect 需要的是一维 ID 列表。
 * @param menus - 已授权的菜单树。
 * @returns 勾选菜单 ID 列表。
 *
 * Extract checked menu ids from a menu tree.
 * The form stores an authorized menu subtree, while TreeSelect expects a flat id list.
 * @param menus - Authorized menu tree.
 * @returns Checked menu id list.
 */
const getCheckedMenuIds = (menus: MenuTreeNode[] = []): string[] => flattenTree(menus).map(item => item.id);

/**
 * 根据选中的菜单 ID 过滤菜单树。
 * 只保留被选中的节点和命中的祖先节点，避免把整棵菜单树写回角色数据。
 * @param data - 原始菜单树。
 * @param selectedIds - 选中的菜单 ID 集合。
 * @returns 过滤后的菜单树。
 *
 * Filter the menu tree by selected ids.
 * Only selected nodes and matched ancestors are kept so the full menu tree is not written back into the role payload.
 * @param data - Source menu tree.
 * @param selectedIds - Selected menu id set.
 * @returns Filtered menu tree.
 */
const buildSelectedMenuTree = (data: MenuTreeNode[], selectedIds: Set<string>): MenuTreeNode[] => {
  const result: MenuTreeNode[] = [];

  for (const item of data) {
    const children = item.children?.length ? buildSelectedMenuTree(item.children, selectedIds) : [];
    const isSelected = selectedIds.has(item.id);

    /*
     * 只有当前节点命中，或者子树里存在命中节点时才保留。
     * 这样角色数据里既不会丢掉祖先链路，也不会把无关节点整棵抄进去。
     *
     * Keep a node only when it is selected itself or when its subtree contains a selected node.
     * This preserves the ancestor chain without copying unrelated branches into the role payload.
     */
    if (!isSelected && children.length === 0) continue;

    result.push({
      ...item,
      children
    });
  }

  return result;
};

export type RoleModalProps = {
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
   * 表单初始值。
   *
   * Initial form value.
   */
  formValue: RoleFormValues;

  /**
   * 菜单树候选项。
   *
   * Menu tree options.
   */
  menuTreeData: MenuTreeNode[];

  /**
   * 确认按钮是否处于提交状态。
   *
   * Whether the confirm button is submitting.
   */
  confirmLoading?: boolean;

  /**
   * 保存角色。
   * @param value - 当前表单值。
   *
   * Save the role.
   * @param value - Current form values.
   */
  onSave(value: RoleFormValues): void | Promise<void>;

  /**
   * 关闭弹窗。
   *
   * Close the modal.
   */
  onCancel: VoidFunction;
};

/**
 * 角色编辑弹窗。
 * 表单状态只服务于当前弹窗，直接放在组件里可以减少无意义的跨文件跳转。
 * @param props - 弹窗属性。
 * @returns 角色编辑弹窗。
 *
 * Role editing modal.
 * The form state only serves this modal, so keeping it in the component avoids unnecessary file hopping.
 * @param props - Modal props.
 * @returns Role editing modal.
 */
export default function RoleModal({ visible, type, formValue, menuTreeData, confirmLoading = false, onSave, onCancel }: RoleModalProps) {
  const { t } = useLocale();
  const form = useForm<RoleFormValues>({
    defaultValues: formValue
  });
  const { reset, setValue } = form;
  const [checkedMenuIds, setCheckedMenuIds] = useState<string[]>([]);
  const modalTitle = t(type === 'create' ? `${ROLE_PAGE_I18N_PREFIX}.modal.createTitle` : `${ROLE_PAGE_I18N_PREFIX}.modal.editTitle`);

  useEffect(() => {
    reset(formValue);
    setCheckedMenuIds(getCheckedMenuIds(formValue.menus ?? []));
  }, [formValue, reset]);

  /**
   * 同步 TreeSelect 的一维勾选值到表单里的菜单子树。
   * TreeSelect 只关心 ID 列表，但角色提交需要的是裁剪后的菜单树，因此这里要做一次结构重建。
   * @param value - TreeSelect 返回的选中值。
   *
   * Sync TreeSelect's flat checked values back into the menu subtree stored in the form.
   * TreeSelect only works with ids, but role submission needs a filtered menu tree, so the structure is rebuilt here.
   * @param value - Selected values returned by TreeSelect.
   */
  const handleMenuChange = (value: string[]) => {
    const selectedIds = new Set(value);

    setCheckedMenuIds(value);
    setValue('menus', buildSelectedMenuTree(menuTreeData, selectedIds));
  };

  return (
    <Dialog open={visible} onOpenChange={open => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSave)}>
            <FormField
              control={form.control}
              name="order"
              rules={{ required: t(`${ROLE_PAGE_I18N_PREFIX}.validation.orderRequired`) }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${ROLE_PAGE_I18N_PREFIX}.form.fields.order`)}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value ?? ''}
                      onChange={event => {
                        const value = event.target.value;
                        field.onChange(value ? Number(value) : undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              rules={{ required: t(`${ROLE_PAGE_I18N_PREFIX}.validation.nameRequired`) }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${ROLE_PAGE_I18N_PREFIX}.form.fields.name`)}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              rules={{ required: t(`${ROLE_PAGE_I18N_PREFIX}.validation.codeRequired`) }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${ROLE_PAGE_I18N_PREFIX}.form.fields.code`)}</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>{t(`${ROLE_PAGE_I18N_PREFIX}.form.fields.status`)}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={String(field.value ?? BasicStatusEnum.ENABLE)}
                      onValueChange={value => field.onChange(Number(value))}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={String(BasicStatusEnum.ENABLE)} id="role-status-enable" />
                        <Label htmlFor="role-status-enable">{t(BASIC_STATUS_LABEL_KEY_MAP[BasicStatusEnum.ENABLE])}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={String(BasicStatusEnum.DISABLE)} id="role-status-disable" />
                        <Label htmlFor="role-status-disable">{t(BASIC_STATUS_LABEL_KEY_MAP[BasicStatusEnum.DISABLE])}</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`${ROLE_PAGE_I18N_PREFIX}.form.fields.description`)}</FormLabel>
                  <FormControl>
                    <Textarea value={field.value ?? ''} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="menus"
              render={() => (
                <FormItem>
                  <FormLabel>{t(`${ROLE_PAGE_I18N_PREFIX}.form.fields.authorizedMenus`)}</FormLabel>
                  <FormControl>
                    <TreeSelect
                      treeData={menuTreeData}
                      treeCheckable
                      allowClear
                      placeholder={t(`${ROLE_PAGE_I18N_PREFIX}.form.placeholders.authorizedMenus`)}
                      value={checkedMenuIds}
                      fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                      getPopupContainer={node => node.parentElement ?? document.body}
                      onChange={value => {
                        const normalizedValues = (Array.isArray(value) ? value : []).map(item => String(item));
                        handleMenuChange(normalizedValues);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onCancel}>
                {t(`${ROLE_PAGE_I18N_PREFIX}.actions.cancel`)}
              </Button>
              <Button type="submit" disabled={confirmLoading}>
                {confirmLoading ? t(`${ROLE_PAGE_I18N_PREFIX}.actions.saving`) : t(`${ROLE_PAGE_I18N_PREFIX}.actions.save`)}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
