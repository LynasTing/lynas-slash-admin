import type { MenuTreeNode } from '#/entity';
import { BasicStatusEnum } from '#/enum';
import { TreeSelect } from 'antd';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { Textarea } from '@/ui/textarea';
import Button from '@/ui/button';
import type { RoleFormValues } from './types';
import { useRoleForm } from './use-role-form';

export type RoleModalProps = {
  /**
   * 弹窗是否可见。
   *
   * Whether the modal is visible.
   */
  visible: boolean;

  /**
   * 弹窗标题。
   *
   * Modal title.
   */
  title: string;

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
 * 组件只负责渲染表单字段；表单状态和菜单树同步逻辑都下沉到 Hook，避免 TSX 被状态细节撑爆。
 * @param props - 弹窗属性。
 * @returns 角色编辑弹窗。
 *
 * Role editing modal.
 * The component only renders form fields while form state and menu tree synchronization live in a Hook so TSX stays focused on structure.
 * @param props - Modal props.
 * @returns Role editing modal.
 */
export default function RoleModal({ visible, title, formValue, menuTreeData, confirmLoading = false, onSave, onCancel }: RoleModalProps) {
  const { form, checkedMenuIds, handleMenuChange } = useRoleForm({
    formValue,
    menuTreeData
  });

  return (
    <Dialog open={visible} onOpenChange={open => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSave)}>
            <FormField
              control={form.control}
              name="order"
              rules={{ required: 'Order is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
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
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
              rules={{ required: 'Code is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
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
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={String(field.value ?? BasicStatusEnum.ENABLE)}
                      onValueChange={value => field.onChange(Number(value))}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={String(BasicStatusEnum.ENABLE)} id="role-status-enable" />
                        <Label htmlFor="role-status-enable">Enable</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={String(BasicStatusEnum.DISABLE)} id="role-status-disable" />
                        <Label htmlFor="role-status-disable">Disable</Label>
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
                  <FormLabel>Description</FormLabel>
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
                  <FormLabel>Authorized Menus</FormLabel>
                  <FormControl>
                    <TreeSelect
                      treeData={menuTreeData}
                      treeCheckable
                      allowClear
                      placeholder="Select authorized menus"
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
                Cancel
              </Button>
              <Button type="submit" disabled={confirmLoading}>
                {confirmLoading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
