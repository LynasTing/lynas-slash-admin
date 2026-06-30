import type { MenuTreeNode } from '#/entity';
import { useEffect, useState } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { flattenTree } from '@/utils';
import type { RoleFormValues } from './types';

type UseRoleFormParams = {
  /**
   * 当前弹窗的表单初始值。
   *
   * Initial form values for the current modal session.
   */
  formValue: RoleFormValues;

  /**
   * 菜单树候选项。
   *
   * Menu tree options.
   */
  menuTreeData: MenuTreeNode[];
};

type UseRoleFormResult = {
  /**
   * React Hook Form 实例。
   *
   * React Hook Form instance.
   */
  form: UseFormReturn<RoleFormValues>;

  /**
   * 当前勾选的菜单 ID 列表。
   *
   * Currently checked menu ids.
   */
  checkedMenuIds: string[];

  /**
   * 菜单树选择变更回调。
   * @param value - TreeSelect 返回的选中值。
   *
   * Menu tree selection change handler.
   * @param value - Selected values returned by TreeSelect.
   */
  handleMenuChange: (value: string[]) => void;
};

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

/**
 * 管理角色弹窗表单和菜单勾选状态。
 * 表单值、树选择值和菜单子树结构之间存在双向映射，统一放到 Hook 里可以避免组件层充满同步细节。
 * @param params - Hook 参数。
 * @returns 角色弹窗表单相关状态和操作。
 *
 * Manage role modal form state and checked menu ids.
 * Form values, tree selection values, and menu subtree structures need bidirectional mapping, so the Hook keeps those synchronization details out of the component.
 * @param params - Hook parameters.
 * @returns Role modal form state and actions.
 */
export function useRoleForm({ formValue, menuTreeData }: UseRoleFormParams): UseRoleFormResult {
  const form = useForm<RoleFormValues>({
    defaultValues: formValue
  });
  const { reset, setValue } = form;

  const [checkedMenuIds, setCheckedMenuIds] = useState<string[]>([]);

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

  return {
    form,
    checkedMenuIds,
    handleMenuChange
  };
}
